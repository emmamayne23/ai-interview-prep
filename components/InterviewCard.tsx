import Link from "next/link"
import { Button } from "@/components/ui/button"

export function InterviewCard({ interview }: { interview: any }) {
  return (
    <article className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm px-5 py-5 gap-5 w-full max-w-sm transition hover:shadow-lg hover:scale-[1.02]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{interview.formData.field}</h2>
        <p className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full cursor-pointer">
          {interview.formData.type}
        </p>
      </div>

      <h3 className="text-base font-medium text-gray-700">
        {interview.formData.role} Interview
      </h3>

      <span className="w-full h-px bg-gray-200" />

      <div className="flex justify-between items-center">
        <p className="text-xs px-3 py-1 rounded-full bg-cyan-600 text-white font-medium">
          {interview.formData.skills}
        </p>
        <p className="text-sm text-gray-600">{interview.formData.level} level</p>
      </div>

      <Link href={`/interview/${interview.id}`} className="w-full">
        <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
          Take Interview
        </Button>
      </Link>
    </article>
  )
}
