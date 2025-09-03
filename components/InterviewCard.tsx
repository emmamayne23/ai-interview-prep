import Link from "next/link";
import { Button } from "@/components/ui/button";

interface InterviewCardProps {
  interview: {
    id: string;
    formData: {
      field: string;
      type: string;
      role: string;
      skills: string;
      level: string;
    };
  };
}

export function InterviewCard({ interview }: InterviewCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "junior":
        return "bg-green-100 text-green-800";
      case "mid":
        return "bg-yellow-100 text-yellow-800";
      case "senior":
        return "bg-red-100 text-red-800";
      case "senior":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "technical":
        return "bg-blue-600";
      case "behavioral":
        return "bg-purple-600";
      case "system design":
        return "bg-orange-600";
      case "management":
        return "bg-teal-600";
      default:
        return "bg-gray-900";
    }
  };

  return (
    <article className="relative flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm p-5 gap-5 w-full max-w-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden group">
      <div className="flex justify-between items-center relative z-10">
        <h2
          title={`${interview.formData.field}`}
          className="text-lg font-bold text-gray-900 capitalize truncate"
        >
          {interview.formData.field}
        </h2>
        <p
          className={`px-3 py-1 text-white text-xs font-semibold rounded-full cursor-pointer transition-transform duration-300 ${getTypeColor(
            interview.formData.type
          )} hover:scale-105`}
        >
          {interview.formData.type}
        </p>
      </div>

      <h3
        title={`${interview.formData.role} Interview`}
        className="text-base font-semibold text-gray-700 relative z-10 capitalize truncate"
      >
        {interview.formData.role} Interview
      </h3>

      <p className="text-sm text-gray-600">
        Take this {interview.formData.role} interview to master essential skills
        and advance your career
      </p>

      <div className="relative z-10">
        <span className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></span>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10">
        {interview.formData.skills.split(",").map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 text-xs lowercase font-medium transition-all duration-300 hover:bg-blue-200"
          >
            {skill.trim()}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center relative z-10">
        <span
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${getLevelColor(
            interview.formData.level
          )}`}
        >
          {interview.formData.level} level
        </span>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-yellow-400 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs text-gray-600">Recommended</span>
        </div>
      </div>

      <Link href={`/interview/${interview.id}`} className="relative z-10">
        <Button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg group-hover:shadow-blue-200 flex items-center justify-center gap-2">
          Start Interview
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </Button>
      </Link>
    </article>
  );
}
