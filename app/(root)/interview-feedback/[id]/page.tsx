import { getFeedbackById, getInterviewById } from "@/lib/interview.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import FeedbackReport from "@/components/FeedbackReport";

interface InterviewFeedbackPageProps {
  params: { id: string };
}

export default async function InterviewFeedbackPage({
  params,
}: InterviewFeedbackPageProps) {
  const { id } = await params;
  const session = await auth();
  const feedback = await getFeedbackById(id);
  const interview = await getInterviewById(feedback.interviewId);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh] p-3">
        <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700 max-w-md w-full">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
          <p className="text-xl font-medium text-gray-200">
            Please sign in to view the feedback
          </p>
          <p className="mt-2 text-sm text-gray-400">
            You need to be authenticated to access this page
          </p>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-screen text-white max-w-7xl mx-auto">
      <div className="flex w-full justify-evenly gap-4 max-sm:items-center p-3">
        <Button className="w-fit rounded-2xl px-5 cursor-pointer min-h-10 flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to Homepage
            </p>
          </Link>
        </Button>

        <Button className="w-fit rounded-2xl px-5 bg-cyan-800 cursor-pointer min-h-10 flex-1">
          <Link
            href={`/interview/${interview.id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
      <div className="text-2xl md:text-3xl font-bold ml-4 capitalize">
        {interview.title}
      </div>
      <FeedbackReport feedback={feedback} candidateName={session?.user?.name} />
    </main>
  );
}
