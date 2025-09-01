import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "./ui/button";

interface InterviewAccordionProps {
  interview: {
    id: string;
    formData: {
      field: string;
      type: string;
      role: string;
      skills: string;
      level: string;
      number: number;
    };
    createdAt: string;
  };
}

export default function InterviewAccordion({
  interview
}: InterviewAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="interview-item">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center justify-between w-full pr-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-800">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">
                  {interview.formData.role} Interview
                </h3>
                <p className="text-sm text-gray-500">
                  {interview.formData.field}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-medium px-2 py-1 text-center rounded-full ${
                  interview.formData.level === "senior"
                    ? "bg-purple-100 text-purple-800"
                    : interview.formData.level === "mid"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {interview.formData.level} level
              </span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  interview.formData.type === "technical"
                    ? "bg-orange-100 text-orange-800"
                    : interview.formData.type === "behavioral"
                    ? "bg-teal-100 text-teal-800"
                    : "bg-indigo-100 text-indigo-800"
                }`}
              >
                {interview.formData.type}
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="pt-2 space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Skills Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {interview.formData.skills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Questions
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {interview.formData.number}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Created
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(interview.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <Link href={`/interview/${interview.id}`} className="relative z-10">
              <Button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg group-hover:shadow-blue-200 flex items-center justify-center gap-2">
                Take Interview
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
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
