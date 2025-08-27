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
  questions
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
    console.log("generate feedback here.");
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
    if(callStatus === CallStatus.FINISHED) {
        handleGenerateFeedback(messages)
    }
  }, [messages, callStatus]);

  const handleCall =  async () => {
    setCallStatus(CallStatus.CONNECTING)
    let formattedQuestions = ""
    if(questions) {
        formattedQuestions = questions.map((question) => `-${question}`).join("\n")
    }
    await vapi.start(interviewer, {
        variableValues: {
            questions: formattedQuestions
        }
    })
  }

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <main>
      <div>
        <h1>Click to Start!</h1>
      </div>
    </main>
  );
}
