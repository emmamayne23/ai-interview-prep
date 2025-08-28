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

    if(!interview && session) redirect("/")
    return (
        <main className="min-h-screen text-white">
            Interview Page of { id }

            <div>
                <InterviewAgent 
                  interviewId={id}
                  questions={interview?.questions}
                  userId={userId}
                />
            </div>
        </main>
    )
}