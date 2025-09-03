import { getAllInterviews } from "@/lib/interview.actions";
import InterviewsList from "@/components/InterviewsList";

export default async function InterviewsPage() {
  const interviews = await getAllInterviews();
  return (
    <main className="min-h-screen text-white p-3 sm:p-10">
      <InterviewsList intialInterviews={interviews} />
    </main>
  );
}
