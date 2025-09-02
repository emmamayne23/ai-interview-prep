import { auth } from "@/auth";
import InterviewForm from "@/components/InterviewForm";

export default async function Interview() {
  const session = await auth();

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
            Please sign in to create an interview
          </p>
          <p className="mt-2 text-sm text-gray-400">
            You need to be authenticated to proceed
          </p>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-screen text-white">
      <h1 className="text-center text-3xl font-semibold mt-10 mb-3">
        Interview Builder
      </h1>

      <div className="p-5">
        <InterviewForm />
      </div>
    </main>
  );
}
