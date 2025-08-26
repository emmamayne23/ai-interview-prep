import { pgTable, uuid, varchar, timestamp, integer, json, text } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    profileImage: varchar("profile_image", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow()
})

export const interviews = pgTable("interviews", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id),
    title: varchar("title", { length: 255 }),
    formData: json("form_data").notNull(),
    questions: json("questions").notNull(),
    // feedback: json("feedback"),
    status: varchar("status", { length: 50 }).default("in_progress"),
    createdAt: timestamp("created_at").defaultNow()
})

export const feedbacks = pgTable("feedbacks", {
    id: uuid("id").primaryKey().defaultRandom(),
    interviewId: uuid("interview_id").notNull().references(() => interviews.id),
    userId: uuid("user_id").notNull().references(() => users.id),
    overallScore: integer("overall_score"),
    categoryScores: json("category_scores"),
    strengths: json("strengths"),
    areasForImprovement: json("areas_for_improvement"),
    suggestions: text("suggestions"),
    finalAssessment: text("final_assessment"),
    createdAt: timestamp("created_at").defaultNow()
})