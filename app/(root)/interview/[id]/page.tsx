import { auth } from "@/auth";
import InterviewAgent from "@/components/InterviewAgent";
import { getInterviewById } from "@/lib/interview.actions";

interface InterviewPageprop {
  params: Promise<{ id: string }>;
}

export default async function InterviewPage({ params }: InterviewPageprop) {
  const { id } = await params;
  const session = await auth();
  const userId = await session?.user?.id;

  const interview = (await getInterviewById(id)) as {
    questions?: string[];
  } | null;

  //   if (!session) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-[90vh] p-3">
  //       <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700 max-w-md w-full">
  //         <svg
  //           className="w-12 h-12 text-gray-400 mx-auto mb-4"
  //           fill="none"
  //           stroke="currentColor"
  //           viewBox="0 0 24 24"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
  //           />
  //         </svg>
  //         <p className="text-xl font-medium text-gray-200">
  //           Please sign in to start the interview
  //         </p>
  //         <p className="mt-2 text-sm text-gray-400">
  //           You need to be authenticated to access this page
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-3 py-8">
        <header className="text-center mb-12 mt-6">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            AI Interview Session
          </h1>
          <p className="text-slate-300 max-w-lg mx-auto">
            Practice your interview skills with our AI interviewer. Get
            real-time feedback and improve your responses.
          </p>
        </header>
        <div className="text-center mx-auto my-3 md:text-3xl font-bold ml-4 capitalize">
          {interview.title}
        </div>

        <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-xl">
          <InterviewAgent
            interviewId={id}
            questions={interview?.questions}
            userId={userId}
          />
        </div>

        {/* <footer className="text-center mt-12 text-slate-400 text-sm">
                    <p>Your interview ID: <span className="font-mono bg-slate-800 px-2 py-1 rounded">{id}</span></p>
                </footer> */}
      </div>
    </main>
  );
}
