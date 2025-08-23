"use server";

import { db } from "@/db/drizzle";
import { auth } from "@/auth";
import { interviews } from "@/db/schema";
import { z } from "zod";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const formSchema = z.object({
  role: z.string(),
  field: z.string(),
  skills: z.string(),
  level: z.string(),
  type: z.string(),
  number: z.number(),
});

export async function createInterview(values: z.infer<typeof formSchema>) {
  const session = await auth();
  const user = session?.user?.id;

  const { role, field, skills, level, type, number } = values;

  const questionsPrompt = `Generate ${number} ${type} interview questions for a ${level} level ${role} role in the ${field} field/industry.
        Skills to focus on: ${skills}. The questions should be in a JSON array format like this: ["question 1", "question 2", ...].`;

  const { text: aiResponse } = await generateText({
    model: google("gemini-1.5-flash"),
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
