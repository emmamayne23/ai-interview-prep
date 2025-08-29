import image1 from "@/public/image-removebg-preview (1).png";
import Link from "next/link";
import Image from "next/image";
import { getAllInterviews } from "@/lib/interview.actions";
import { InterviewCard } from "@/components/InterviewCard";

export default async function Home() {
  const interviews = await getAllInterviews()
  return (
    <main className="min-h-screen text-white">
      <section className="flex items-center gap-3 m-3 md:m-5 lg:m-16 mt-5 p-3 bg-gradient-to-b from-blue-700 to-sky-950 bg-opa rounded-2xl text-white">
        <div className="flex flex-col gap-6 max-w-lg p-3 md:p-5 lg:p-10">
          <h2 className="font-bold text-2xl">Get Interview-Ready with AI-Powered Practice & Feedback</h2>
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
      <div>
        {/* <Image 
          src={"/image2.png"}
          alt="image"
          width={1000}
          height={500}
          className="w-full m-2 rounded-2xl opacity-20 absolute inset-0 h-full object-cover"
        /> */}
      </div>
      <div className="p-5">
        <h1 className="text-3xl font-semibold my-3">Popular Interviews</h1>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 place-items-center">
          { interviews.map((interview) => (
            <InterviewCard 
              key={interview.id} 
              interview={interview} 
            />
          )) }
        </div>
      </div>
    </main>
  );
}
