import { auth } from "@/auth"
import { redirect } from "next/navigation"
import InterviewAgent from "@/components/InterviewAgent"
import { getInterviewById } from "@/lib/interview.actions"

interface InterviewPageprop {
    params: Promise<{ id: string }>
}

export default async function InterviewPage({ params }: InterviewPageprop ) {
    const { id } = await params
    const session = await auth()
    const userId = await session?.user?.id

    const interview = await getInterviewById(id) as { questions?: string[] } | null

    if(!session) redirect("/")
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                        AI Interview Session
                    </h1>
                    <p className="text-slate-300 max-w-lg mx-auto">
                        Practice your interview skills with our AI interviewer. Get real-time feedback and improve your responses.
                    </p>
                </header>

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
    )
}