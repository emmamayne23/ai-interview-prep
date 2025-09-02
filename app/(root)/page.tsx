import image1 from "@/public/image-removebg-preview (1).png";
import Link from "next/link";
import Image from "next/image";
import { getAllInterviews } from "@/lib/interview.actions";
import { InterviewCard } from "@/components/InterviewCard";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const interviews = await getAllInterviews();
  return (
    <main className="min-h-screen text-white">
      <section className="flex items-center gap-3 m-3 md:m-5 lg:m-16 mt-5 p-3 bg-gradient-to-b from-blue-700 to-sky-950 bg-opa rounded-2xl text-white">
        <div className="flex flex-col gap-6 max-w-lg p-3 md:p-5 lg:p-10">
          <h2 className="font-bold text-2xl">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg text-gray-400">
            Practice real interview questions & get instant feedback
          </p>

          <button className="bg-slate-700 rounded-full font-bold px-5 py-2 cursor-pointer min-h-10 max-sm:w-1/2">
            <Link href="/interview">Start an Interview</Link>
          </button>
        </div>
        <div>
          <Image
            src={image1}
            alt="robo-dude"
            width={700}
            height={700}
            className="max-sm:hidden"
          />
        </div>
      </section>
      <div className="p-5">
        <div className="flex items-center justify-between md:w-[90%]">
          <h1 className="text-3xl sm:text-4xl font-semibold my-3 mb-5">
            Popular Interviews
          </h1>
          <Link href={"/interviews"} className="underline text-cyan-400">
            All Interviews
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 place-items-center md:w-[90%]">
          {interviews.slice(0, 3).map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
        <Link href={"/interviews"}
          className="flex gap-5 max-w-xl items-center justify-center rounded-xl my-3 mt-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
        >
          <h1>View All Interviews</h1> <ArrowRight />
        </Link>
      </div>
    </main>
  );
}
