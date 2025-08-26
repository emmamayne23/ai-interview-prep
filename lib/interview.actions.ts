"use server";

import { db } from "@/db/drizzle";
import { auth } from "@/auth";
import { interviews, feedbacks } from "@/db/schema";
import { success, z } from "zod";

import { google } from "@ai-sdk/google";
import { generateText, generateObject } from "ai";
import { eq } from "drizzle-orm";

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
  const user = session?.user?.id;

  if(!user) {
    throw new Error("User not authenticated!")
  }

  const { role, field, skills, level, type, number } = values;

  const questionsPrompt = `Generate ${number} ${type} interview questions for a ${level} level ${role} role in the ${field} field/industry.
        Skills to focus on: ${skills}. The questions should be in a JSON array format like this: ["question 1", "question 2", ...].`;

  const { text: aiResponse } = await generateText({
    model: google("gemini-2.0-flash-001"),
    prompt: questionsPrompt,
  });
    // console.log("Form data:", values, "Questions:", aiResponse);

  const createdInterview = await db.insert(interviews).values({
      userId: user,
      title: `${role} Interview`,
      formData: values,
      questions: aiResponse,
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

      return { success: true, feedback: newFeedback }
  } catch (error) {
    console.error(error);
    return { success: false, feedback: null }
  }
}
