import image1 from "@/public/image-removebg-preview (1).png";
import Link from "next/link";
import Image from "next/image";
import { getAllInterviews } from "@/lib/interview.actions";
import { InterviewCard } from "@/components/InterviewCard";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const interviews = await getAllInterviews();
  return (
    <main className="min-h-screen text-white max-w-7xl mx-auto">
      <section className="flex items-center gap-3 m-3 md:m-5 lg:m-16 mt-5 p-3 bg-gradient-to-b from-blue-700 to-sky-950 bg-opa rounded-2xl text-white">
        <div className="flex flex-col gap-6 max-w-lg p-3 md:p-5 lg:p-10">
          <h2 className="font-bold text-2xl">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg text-gray-400">
            Practice real interview questions & get instant feedback
          </p>

          <button className="bg-slate-700 rounded-full font-bold px-5 py-2 cursor-pointer min-h-10">
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
      <div className="p-2.5">
        <div className="flex items-center justify-between md:w-[90%]">
          <h1 className="text-2xl sm:text-4xl font-semibold my-3 mb-5">
            Popular Interviews
          </h1>
          <Link href={"/interviews"} className="underline text-cyan-400 text-sm mb-1 sm:text-base">
            All Interviews
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 place-items-center md:w-[90%]">
          {interviews.slice(0, 3).map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
        <Link
          href={"/interviews"}
          className="flex gap-5 max-w-xl items-center justify-center rounded-xl my-3 mt-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
        >
          <h1>View All Interviews</h1> <ArrowRight />
        </Link>
      </div>
      <footer className="text-center mt-12 text-slate-400 text-sm pb-8">
        <p className="opacity-75 hover:opacity-100 transition-opacity mb-4">
          Developed with ❤️ by Emmanuel Mayne
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/emmamayne23"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="mailto:emmamayne23@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/emmamayne23"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/__imanuelmayne"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
