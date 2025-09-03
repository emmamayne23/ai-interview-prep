"use client";

import { useState, useMemo } from "react";
import { InterviewCard } from "./InterviewCard";
import { Search } from "lucide-react";

export default function InterviewsList({ intialInterviews }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInterviews = useMemo(() => {
    if (!searchQuery) return intialInterviews;

    return intialInterviews.filter(
      (interview) =>
        interview.formData.role
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        interview.formData.field
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        interview.formData.skills
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, intialInterviews]);
  return (
    <main>
      <div className="my-5 mb-10 lg:w-[80%] sm:flex justify-between items-center">
        <h1 className="text-3xl font-bold my-3">Interview Library</h1>
        <div className="relative border border-white rounded-lg items-center flex gap-2 px-2 py-1 h-fit max-w-80">
          <Search />
          <input
            type="search"
            placeholder="search interviews..."
            className="outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div>
        {filteredInterviews.length === 0 ? (
          <div className=" py-12">
            <p className="text-gray-400 text-lg">
              {searchQuery
                ? `No interviews found for "${searchQuery}"`
                : "No interviews yet"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 place-items-center md:w-[90%] lg:w-[80%]">
            {filteredInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
