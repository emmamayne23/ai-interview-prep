import { auth } from "@/auth"
import { getInterviewById, getFeedbackByInterviewId } from "@/lib/interview.actions"
import { redirect } from "next/navigation"

export default async function FeedbackPage({ params }: RouteParams) {
    const { id } = await params
    const session = await auth()
    const userId = session?.user?.id

    const interview = await getInterviewById(id)
    if(!interview) redirect("/")

    const feedback = await getFeedbackByInterviewId({ userId: userId, interviewId:  id})
    return (
        <main className="min-h-screen text-white">
            <div>feedback page, haha</div>

            <h1>Your Score: </h1>
            <div>{feedback.overallScore}</div>
        </main>
    )
}