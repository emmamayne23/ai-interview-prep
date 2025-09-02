import { auth } from "@/auth";
import {
  getInterviewById,
  getFeedbackByInterviewId,
} from "@/lib/interview.actions";
import { redirect } from "next/navigation";
import FeedbackReport from "@/components/FeedbackReport";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FeedbackPage({ params }: RouteParams) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  const interview = await getInterviewById(id);
  if (!session) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    userId: userId!,
    interviewId: id,
  });
  return (
    <main className="min-h-screen text-white">
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
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
      <div className="text-2xl md:text-3xl font-bold ml-4 capitalize">{interview.title}</div>
      <FeedbackReport feedback={feedback} candidateName={session?.user?.name} />
    </main>
  );
}
