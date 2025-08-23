import { db } from "@/db/drizzle"
import { interviews } from "@/db/schema"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

interface InterviewPageprop {
    params: Promise<{ id: string }>
}

export default async function InterviewPage({ params }: InterviewPageprop ) {
    const { id } = await params
    const session = await auth()
    const userId = await session?.user?.id

    if(!session) redirect("/")
    return (
        <main className="min-h-screen text-white">
            Interview Page of { id }
        </main>
    )
}