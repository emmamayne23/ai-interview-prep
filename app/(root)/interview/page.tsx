import { auth } from "@/auth";
import { redirect } from "next/navigation";
import InterviewForm from "@/components/InterviewForm";

export default async function Interview() {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/");
  return (
    <main className="min-h-screen text-white">
      <h1 className="text-center text-3xl font-semibold mt-10 mb-3">Interview Builder</h1>
      
      <div className="p-5">
        <InterviewForm />
      </div>
    </main>
  );
}
