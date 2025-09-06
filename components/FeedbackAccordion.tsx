"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { deleteFeedback } from "@/lib/interview.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Feedback {
  id: string;
  interviewId: string;
  interviewName: string;
  interviewData: {
    role: string;
    level: string;
    type: string;
    number: number;
    field: string;
    skills: string;
  };
  interviewScore: number;
  interviewAssesment: string;
  feedbackDate: string;
}

export default function FeedbackAccordion({
  feedback,
}: {
  feedback: Feedback;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    await deleteFeedback(feedback.id);
    router.refresh();
    setIsOpen(false);
  };

  return (
    <>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="feedback-item">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    feedback.interviewScore >= 80
                      ? "bg-green-100 text-green-800"
                      : feedback.interviewScore >= 60
                      ? "bg-blue-100 text-blue-800"
                      : feedback.interviewScore >= 40
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <span className="font-bold text-lg">
                    {feedback.interviewScore}
                  </span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 capitalize">
                    {feedback.interviewName}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {feedback.interviewData.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full text-center ${
                    feedback.interviewScore >= 80
                      ? "bg-green-100 text-green-800"
                      : feedback.interviewScore >= 60
                      ? "bg-blue-100 text-blue-800"
                      : feedback.interviewScore >= 40
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {feedback.interviewScore >= 80
                    ? "Excellent"
                    : feedback.interviewScore >= 60
                    ? "Good"
                    : feedback.interviewScore >= 40
                    ? "Fair"
                    : "Needs Work"}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="pt-2">
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Beginner</span>
                  <span>Proficient</span>
                  <span>Expert</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      feedback.interviewScore >= 80
                        ? "bg-green-500"
                        : feedback.interviewScore >= 60
                        ? "bg-blue-500"
                        : feedback.interviewScore >= 40
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${feedback.interviewScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    Level
                  </p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {feedback.interviewData.level}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    Type
                  </p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {feedback.interviewData.type}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    Questions
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {feedback.interviewData.number}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    Field
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {feedback.interviewData.field}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Skills Tested
                </p>
                <div className="flex flex-wrap gap-2">
                  {feedback.interviewData.skills
                    .split(",")
                    .map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    Date Taken
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(feedback.feedbackDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(true);
                    }}
                    className="text-red-500"
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Assessment
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {feedback.interviewAssesment}
                </p>
              </div>
              <Link
                href={`/interview-feedback/${feedback.id}`}
                className="relative z-10"
              >
                <Button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg group-hover:shadow-blue-200 flex items-center justify-center gap-2">
                  Check Full Feedback
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
      {/* pop up box to confirm deletion */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-6 shadow-xl w-full max-w-sm transform scale-100 opacity-100 transition-all duration-300">
            <h3 className="text-lg font-bold text-center mb-4">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
              Are you sure you want to permanently delete this report? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
