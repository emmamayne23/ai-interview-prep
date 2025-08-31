"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

interface InterviewCardProps {
  interview: {
    id: string
    formData: {
      field: string
      type: string
      role: string
      skills: string
      level: string
    }
  }
}
const Feedbacks = ({ myFeedbacks, interview }: InterviewCardProps) => {
    const router = useRouter()
  return (
    <div>
        <div>
  <h2 className="font-bold text-2xl my-6">My Feedbacks ({myFeedbacks.length})</h2>
  
  {myFeedbacks.length === 0 ? (
    <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-300">
      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p className="text-gray-500">No feedback yet. Complete an interview to get your first feedback report.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {myFeedbacks.map((feedback) => (
        <div 
          key={feedback.id} 
          className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => router.push(`/interview/${interview.id}/feedback`)}
        >
          {/* Header with score and date */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                feedback.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                feedback.overallScore >= 60 ? 'bg-blue-100 text-blue-800' :
                feedback.overallScore >= 40 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                <span className="font-bold text-xl">{feedback.overallScore}</span>
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900">Overall Score</p>
                <p className="text-sm text-gray-500">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                feedback.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                feedback.overallScore >= 60 ? 'bg-blue-100 text-blue-800' :
                feedback.overallScore >= 40 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {feedback.overallScore >= 80 ? 'Excellent' :
                 feedback.overallScore >= 60 ? 'Good' :
                 feedback.overallScore >= 40 ? 'Fair' : 'Needs Work'}
              </span>
            </div>
          </div>
          
          {/* Strengths preview */}
          {feedback.strengths && feedback.strengths.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-1">Strengths</p>
              <div className="flex flex-wrap gap-1">
                {feedback.strengths.slice(0, 2).map((strength, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    {strength.length > 25 ? `${strength.substring(0, 25)}...` : strength}
                  </span>
                ))}
                {feedback.strengths.length > 2 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    +{feedback.strengths.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Areas for improvement preview */}
          {feedback.areasForImprovement && feedback.areasForImprovement.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Areas to Improve</p>
              <div className="flex flex-wrap gap-1">
                {feedback.areasForImprovement.slice(0, 2).map((area, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                    {area.length > 25 ? `${area.substring(0, 25)}...` : area}
                  </span>
                ))}
                {feedback.areasForImprovement.length > 2 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    +{feedback.areasForImprovement.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Final assessment snippet */}
          {feedback.finalAssessment && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Assessment</p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {feedback.finalAssessment}
              </p>
            </div>
          )}
          
          {/* View more indicator */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-sm text-blue-600 font-medium">View detailed feedback</span>
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  )
}

export default Feedbacks