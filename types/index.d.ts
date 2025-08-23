interface InterviewForm {
    id: string,
    role: string,
    field: string,
    skills: string[],
    level: string,
    type: string,
    number: number,
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