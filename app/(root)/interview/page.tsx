import { auth } from "@/auth";
import { redirect } from "next/navigation";
import InterviewForm from "@/components/InterviewForm";

export default async function Interview() {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/");
  return (
    <main className="min-h-screen text-white">
      Interview Form
      
      <div className="p-5">
        <InterviewForm />
      </div>
    </main>
  );
}
