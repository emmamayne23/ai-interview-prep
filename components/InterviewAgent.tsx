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
      <div>
        { isSpeaking && <span className="animate-pulse">Ai is speaking...</span> }
        <h1>AI Interviewer</h1>
      </div>

      <div className="flex justify-center w-full">
        { callStatus === "ACTIVE" || callStatus === "CONNECTING" ? (
            <button className="border border-red-600 rounded-xl p-2 px-5 bg-red-600" onClick={handleDisconnect}>
                End
            </button>
        ) : (
            <button className="border border-green-600 rounded-xl p-2 px-5 bg-green-600" onClick={handleCall}>
                Start
            </button>
        ) }
      </div>
    </main>
  );
}
