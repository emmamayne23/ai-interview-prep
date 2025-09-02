import { getUserInterviews, getUserFeedbacks } from "@/lib/interview.actions";
import { auth } from "@/auth";
import InterviewAccordion from "@/components/InterviewAccordion";
import Image from "next/image";
import { Check, CheckCheck } from "lucide-react";
import FeedbackAccordion from "@/components/FeedbackAccordion";

export default async function MyInterviewsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh] p-8">
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
            Please sign in to view your interviews
          </p>
          <p className="mt-2 text-sm text-gray-400">
            You need to be authenticated to access this page
          </p>
        </div>
      </div>
    );
  }

  const myInterviews = await getUserInterviews(userId!);
  const myFeedbacks = await getUserFeedbacks(userId!);
  return (
    <main className="min-h-screen text-white p-5 md:px-20 lg:px-40">
      <div className="sm:flex items-center mb-5">
        <div className="flex m-10 items-center gap-5">
          <Image
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? ""}
            width={80}
            height={80}
          />
          <div>
            <p>{session?.user?.name}</p>
            <p className="text-gray-500">{session?.user?.email}</p>
          </div>
        </div>

        <div className="flex justify-evenly items-center sm:gap-3">
          <div className="border p-3 space-y-1">
            <p className="flex items-center ">
              <Check className="border border-green-600 rounded-full p-0.5 mr-3 text-green-600" />
              <span className="text-xl">{myInterviews.length}</span>
            </p>
            <h1>Interviews created</h1>
          </div>
          <div className="border p-3 space-y-1">
            <p className="flex items-center ">
              <CheckCheck className="border border-green-600 rounded-full p-0.5 mr-3 text-green-600" />
              <span className="text-xl">{myFeedbacks.length}</span>
            </p>
            <h1>Interviews completed</h1>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h2 className="font-bold text-2xl my-6">
          My Feedbacks ({myFeedbacks.length})
        </h2>

        {myFeedbacks.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-300">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <p className="text-gray-500">
              No feedback yet. Complete an interview to get your first feedback
              report.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {myFeedbacks.map((feedback, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <FeedbackAccordion feedback={feedback} />
              </div>
            ))}
          </div>
        )}
      </div>

      <hr className="my-5" />
      <div>
        <h2 className="font-bold text-2xl my-6">
          My Interviews ({myInterviews.length})
        </h2>

        {myInterviews.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-300">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500">
              No interviews yet. Create your first interview to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {myInterviews.map((interview, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <InterviewAccordion interview={interview} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
