interface InterviewForm {
    id: string,
    role: string,
    field: string,
    skills: string[],
    level: string,
    type: string,
    number: number,
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface Feedback {
      id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}

interface CreateFeedbackParams {
  interviewId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface AgentProps {
  userName?: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  questions?: string[];
}

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  skills: string[];
  userId: string;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}
