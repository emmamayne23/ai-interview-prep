"use server";

import { db } from "@/db/drizzle";
import { auth } from "@/auth";
import { interviews, feedbacks } from "@/db/schema";
import { z } from "zod";

import { google } from "@ai-sdk/google";
import { generateText, generateObject } from "ai";
import { eq, and, desc } from "drizzle-orm";

const formSchema = z.object({
  role: z.string(),
  field: z.string(),
  skills: z.string(),
  level: z.string(),
  type: z.string(),
  number: z.number(),
});

const feedbackSchema = z.object({
  totalScore: z.number().int().min(0).max(100),
  categoryScores: z.object({
    communicationSkills: z.object({
      score: z.number().int().min(0).max(100),
      comment: z.string(),
    }),
    technicalKnowledge: z.object({
      score: z.number().int().min(0).max(100),
      comment: z.string(),
    }),
    problemSolving: z.object({
      score: z.number().int().min(0).max(100),
      comment: z.string(),
    }),
    culturalRoleFit: z.object({
      score: z.number().int().min(0).max(100),
      comment: z.string(),
    }),
    confidenceClarity: z.object({
      score: z.number().int().min(0).max(100),
      comment: z.string(),
    }),
  }),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  suggestions: z.string(),
  finalAssessment: z.string(),
});

export async function createInterview(values: z.infer<typeof formSchema>) {
  const session = await auth();
  const userid = session?.user?.id;

  if(!userid) {
    throw new Error("User not authenticated!")
  }

  const { role, field, skills, level, type, number } = values;

  const questionsPrompt = `Prepare questions for a job interview.
                The job role is ${role} in the ${field} field/industry.
                The job experience level is ${level}.
                The tech stack or skills used in the job is/are: ${skills}.
                The focus between behavioural and technical questions should lean towards: ${type}.
                The amount of questions required is: ${number}.
                Please return only the questions, without any additional text.
                The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
                Return the questions formatted like this:
                ["Question 1", "Question 2", "Question 3"]
                
                Thank you! <3
            `
  const { text: questions } = await generateText({
    model: google("gemini-2.0-flash-001"),
    prompt: questionsPrompt,
  });
    // console.log("Form data:", values, "Questions:", aiResponse);

  const createdInterview = await db.insert(interviews).values({
      userId: userid,
      title: `${role} Interview`,
      formData: values,
      questions: JSON.parse(questions),
      status: "in_progress"
  }).returning()

  return createdInterview[0]
}

export async function createFeedback(params: CreateFeedbackParams) {
  const session = await auth()
  const userId = session?.user?.id
  const { interviewId, transcript } = params
  if (!userId) {
    throw new Error("User not authenticated.");
  }
  try {
    const formattedTranscript = transcript.map((sentence) => `- ${sentence.role}: ${sentence.content}`)
      .join("")
    
    const [interview] = await db.select().from(interviews).where(eq(interviews.id, interviewId)).limit(1)
    if (!interview) {
      throw new Error("Interview not found.");
    }

    const { object: feedbackObject } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      schema: feedbackSchema,
      prompt: `
        You are an expert career coach providing personalized feedback for a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. If there are mistakes or areas for improvement, point them out.

        Transcript:
        ${formattedTranscript}
        
        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    })

    
    const [newFeedback] = await db
      .insert(feedbacks)
      .values({
        interviewId: interviewId,
        userId: userId,
        overallScore: feedbackObject.totalScore,
        categoryScores: feedbackObject.categoryScores,
        strengths: feedbackObject.strengths,
        areasForImprovement: feedbackObject.areasForImprovement,
        suggestions: feedbackObject.suggestions,
        finalAssessment: feedbackObject.finalAssessment
      }).returning()
      // console.log(newFeedback)
      return { success: true, feedback: newFeedback }
  } catch (error) {
    console.error(error);
    return { success: false, feedback: null }
  }
}

export async function getInterviewById(id: string) {
  const [interview] = await db
    .select()
    .from(interviews)
    .where(eq(interviews.id, id))
    .execute()

    return interview
}

export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams) {
  const { userId, interviewId } = params
  
  const [feedback] = await db
    .select()
    .from(feedbacks)
    .where(and
      (eq(feedbacks.interviewId, interviewId), 
      eq(feedbacks.userId, userId))
    )

    return feedback
}

export async function getFeedbackById(id: string) {
  const [feedback] = await db
    .select()
    .from(feedbacks)
    .where(eq(feedbacks.id, id))
    .limit(1)

    if(!feedback) throw new Error("Feedback not found")

    return feedback
}

export async function getAllInterviews() {
  const allInterviews = await db
    .select()
    .from(interviews)
    .orderBy(desc(interviews.createdAt))

  return allInterviews
}

export async function getUserFeedbacks(userId: string) {
  const userFeedbacks = await db
   .select({
    id: feedbacks.id,
    interviewId: interviews.id,
    interviewName: interviews.title,
    interviewData: interviews.formData,
    interviewScore: feedbacks.overallScore,
    interviewAssesment: feedbacks.finalAssessment,
    feedbackDate: feedbacks.createdAt,
   })
   .from(feedbacks)
   .where(eq(feedbacks.userId, userId))
   .leftJoin(interviews, eq(feedbacks.interviewId, interviews.id))
   .orderBy(desc(feedbacks.createdAt))

   return userFeedbacks
}

export async function deleteFeedback(feedbackId: string) {
  try {
    await db
      .delete(feedbacks)
      .where(eq(feedbacks.id, feedbackId))
  } catch (error) {
    console.error("Failed to delete feedback", error)
    return { success: false, error: "Could not delete feedback" }
  }
}

export async function getUserInterviews(userId: string) {
  const userInterviews = await db
    .select()
    .from(interviews)
    .where(eq(interviews.userId, userId))
    .orderBy(desc(interviews.createdAt))

  return userInterviews
}
