"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";
import { createFeedback } from "@/lib/interview.actions";
import { interviewer } from "@/constants";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export default function InterviewAgent({
  interviewId,
  questions,
  userId,
}: AgentProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const router = useRouter();

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        // console.log(`${message.role}: ${message.transcript}`);
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    if (!interviewId) {
      console.error("No interviewId provided. Cannot generate feedback.");
      return;
    }
    console.log("generating feedback...");
    const createdFeedback = await createFeedback({
      interviewId: interviewId!,
      transcript: messages,
    });
    if (createdFeedback) {
      router.push(`/interview/${interviewId}/feedback`);
    } else {
      console.log("Error saving feedback");
      router.push("/");
    }
  };

  useEffect(() => {
    if(callStatus === CallStatus.FINISHED && messages.some(m => m.role === "user")) {
        handleGenerateFeedback(messages)
    }
  }, [messages, callStatus, userId]);

  const handleCall =  async () => {
    setCallStatus(CallStatus.CONNECTING)
    const formattedQuestions = questions ? JSON.stringify(questions) : []
    // if(questions) {
    //     formattedQuestions = questions.map((question) => `-${question}`).join("\n")
    // }
    await vapi.start(interviewer, {
    variableValues: {
      questions: formattedQuestions,
    },
    clientMessages: ["transcript"], // <--- this is required to capture user speech
    serverMessages: [],
  });
  }

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <main className="text-center">
      <div className="text-center">
      {/* Status indicator */}
      <div className="mb-8">
        {isSpeaking && (
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 text-blue-300 text-sm mb-4">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            AI is speaking...
          </div>
        )}
        
        <h2 className="text-2xl font-semibold mb-2">AI Interviewer</h2>
        <p className="text-slate-400 text-sm">
          {callStatus === "INACTIVE" 
            ? "Ready to begin your interview session" 
            : callStatus === "CONNECTING" 
            ? "Connecting to AI interviewer..." 
            : "Interview in progress"}
        </p>
      </div>

      {/* Connection button */}
      <div className="flex justify-center">
        {callStatus === "ACTIVE" || callStatus === "CONNECTING" ? (
          <button 
            className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/20"
            onClick={handleDisconnect}
            disabled={callStatus === "CONNECTING"}
          >
            {callStatus === "CONNECTING" ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                End Interview
              </>
            )}
          </button>
        ) : (
          <button 
            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/20"
            onClick={handleCall}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.05 5a5 5 0 015 5m0 8a5 5 0 01-5 5m-6-13a5 5 0 00-5 5m0 8a5 5 0 005 5"></path>
            </svg>
            Start Interview
          </button>
        )}
      </div>

      {/* Additional UI elements */}
      {callStatus === "ACTIVE" && (
        <div className="mt-8 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
          <h3 className="font-medium mb-2">Interview Tips</h3>
          <ul className="text-sm text-slate-300 text-left space-y-1">
            <li>• Speak clearly and at a moderate pace</li>
            <li>• Listen carefully to each question</li>
            <li>• Take a moment to think before answering</li>
          </ul>
        </div>
      )}
    </div>
    </main>
  );
}
