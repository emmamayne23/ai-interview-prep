"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, TrendingUp, AlertCircle, CalendarClock, User } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

export type CategoryScores = {
  communicationSkills: { score: number; comment: string };
  technicalKnowledge: { score: number; comment: string };
  problemSolving: { score: number; comment: string };
  culturalRoleFit: { score: number; comment: string };
  confidenceClarity: { score: number; comment: string };
};

export type FeedbackRecord = {
  id: string;
  interviewId: string;
  userId: string;
  overallScore: number; // 0-100
  categoryScores: CategoryScores;
  strengths: string[];
  areasForImprovement: string[];
  suggestions: string;
  finalAssessment: string;
  createdAt: string | Date;
};

interface Props {
  feedback: FeedbackRecord;
  candidateName?: string;
}

const scoreTone = (score: number) => {
  if (score >= 85) return { bg: "bg-emerald-100", text: "text-emerald-700", ring: "ring-emerald-500" };
  if (score >= 70) return { bg: "bg-lime-100", text: "text-lime-700", ring: "ring-lime-500" };
  if (score >= 55) return { bg: "bg-amber-100", text: "text-amber-700", ring: "ring-amber-500" };
  if (score >= 40) return { bg: "bg-orange-100", text: "text-orange-700", ring: "ring-orange-500" };
  return { bg: "bg-rose-100", text: "text-rose-700", ring: "ring-rose-500" };
};

function formatDate(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const toRadarData = (c: CategoryScores) => [
  { metric: "Communication", score: c.communicationSkills.score },
  { metric: "Technical", score: c.technicalKnowledge.score },
  { metric: "Problem Solving", score: c.problemSolving.score },
  { metric: "Cultural/Role Fit", score: c.culturalRoleFit.score },
  { metric: "Confidence", score: c.confidenceClarity.score },
];

const LabelRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default function FeedbackReport({ feedback, candidateName }: Props) {
  const { overallScore, categoryScores } = feedback;
  const tone = scoreTone(overallScore);
  const radarData = toRadarData(categoryScores);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-6 print:p-0">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 lg:col-span-2 backdrop-blur-md">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl">Interview Feedback</CardTitle>
              <CardDescription>
                Review summary and detailed assessment for this session.
              </CardDescription>
            </div>
            <Badge variant="outline" className="rounded-full gap-1">
              <CalendarClock className="size-4" /> {formatDate(feedback.createdAt)}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Overall Score Block */}
              <div className="md:col-span-1">
                <div className={`rounded-2xl p-4 ring-1 ${tone.ring} ${tone.bg} ${tone.text} text-center shadow-sm`}>
                  <p className="text-sm opacity-80">Overall Score</p>
                  <p className="text-5xl font-extrabold tracking-tight leading-none mt-1">{overallScore}</p>
                  <p className="text-xs mt-1 opacity-80">out of 100</p>
                </div>
                <div className="mt-4 space-y-2">
                  <LabelRow label="Interview ID" value={feedback.interviewId.slice(0, 8) + "…"} />
                  <LabelRow label="Candidate" value={candidateName || feedback.userId.slice(0, 8) + "…"} />
                </div>
              </div>

              {/* Radar Chart */}
              <div className="md:col-span-2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <RechartsTooltip formatter={(v: any) => `${v}/100`} />
                    <Radar dataKey="score" stroke="#000" fill="#000" fillOpacity={0.1} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="size-5 font-bold" /> Final Assessment
            </CardTitle>
            <CardDescription className="font-bold">Concise summary of the interview outcome.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              {feedback.finalAssessment}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Category Breakdown</CardTitle>
          <CardDescription className="font-bold">Scores and notes per competency.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {(
            [
              { key: "communicationSkills", label: "Communication Skills" },
              { key: "technicalKnowledge", label: "Technical Knowledge" },
              { key: "problemSolving", label: "Problem Solving" },
              { key: "culturalRoleFit", label: "Cultural & Role Fit" },
              { key: "confidenceClarity", label: "Confidence & Clarity" },
            ] as const
          ).map(({ key, label }) => {
            const item = (categoryScores as any)[key] as { score: number; comment: string };
            const t = scoreTone(item.score);
            return (
              <div key={key} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
                <div className="md:col-span-3 flex items-center justify-between md:justify-start gap-3">
                  <Badge className={`rounded-md ${t.bg} ${t.text} ring-1 ${t.ring}`}>{item.score}/100</Badge>
                  <span className="font-medium">{label}</span>
                </div>
                <div className="md:col-span-5">
                  <Progress value={item.score} className="h-2" />
                </div>
                <div className="md:col-span-4 text-sm text-muted-foreground leading-6">
                  {item.comment}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="size-5" /> Strengths
            </CardTitle>
            <CardDescription className="font-bold">What went well during the interview.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              {feedback.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="size-5" /> Areas for Improvement
            </CardTitle>
            <CardDescription className="font-bold">Focus areas for the next attempt.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              {feedback.areasForImprovement.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Actionable Suggestions</CardTitle>
          <CardDescription className="font-bold">Concrete guidance to level up.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-7 text-muted-foreground">{feedback.suggestions}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="size-4" /> Candidate ID: {feedback.userId}
          </div>
          <span>Generated: {formatDate(feedback.createdAt)}</span>
        </CardFooter>
      </Card>

      {/* Print helper */}
      <div className="flex justify-end">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground shadow hover:opacity-90"
        >
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
