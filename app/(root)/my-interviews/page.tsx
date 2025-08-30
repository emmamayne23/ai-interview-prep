import { getUserInterviews } from "@/lib/interview.actions";
import { auth } from "@/auth";
import { InterviewCard } from "@/components/InterviewCard";
import Image from "next/image";
import { Check } from "lucide-react";

export default async function MyInterviewsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const myInterviews = await getUserInterviews(userId!);
  return (
    <main className="min-h-screen text-white p-5">
      <div className="flex m-10 items-center gap-5">
        <Image
          src={session?.user?.image ?? ""}
          alt={session?.user?.name ?? ""}
          width={80}
          height={80}
        />
        <div>
          <p>{session?.user?.name}</p>
          <p className="text-gray-500">{session?.user?.email}</p>
        </div>
      </div>

      <div className="flex justify-evenly mb-5">
        <div className="border p-3 space-y-1">
          <p className="flex items-center">
            <Check className="border rounded-full p-0.5 mr-3" />
            <span className="text-xl">{myInterviews.length}</span>
          </p>
          <h1>Interviews created</h1>
        </div>
        <h1 className="border p-3">Interviews completed</h1>
      </div>
        <hr />
      <div>
        <h2 className="font-bold text-2xl my-3">My Feedbacks ()</h2>
      </div>
        <hr />
      <h2 className="font-bold text-2xl my-3">
        My Interviews ({myInterviews.length})
      </h2>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 gap-5 md:w-[90%]">
        {myInterviews.map((interview) => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}
      </div>
    </main>
  );
}
