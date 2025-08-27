import { db } from "@/db/drizzle";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { interviews } from "@/db/schema";

export async function GET() {
    return Response.json({success: true, message: "Thank you :)" }, { status: 200 })
}

export async function POST(request: Request) {
    const { role, field, skills, level, type, number, userid } = await request.json()
    try {
        // 1. create the questions via google gemini
        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `Prepare questions for a job interview.
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
            `,
        })

        // 2. save the created interview in the database
        const interview = await db
          .insert(interviews)
          .values({
            userId: userid,
            title: `${role} Interview`,
            formData: { role, field, skills, level, type, number },
            questions: JSON.parse(questions),
            status: "in_progress"
          }).returning()

        return Response.json({ success: true , interview: interview }, { status: 200 })
    } catch (error) {
        console.error("Could not create interview", error)
        return Response.json({ success: false, error }, { status: 500 })
    }
}