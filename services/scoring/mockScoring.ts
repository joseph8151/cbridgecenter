// Test Center scoring service — turns a completed mock test session into an
// estimated score + section breakdown. Mock implementation only; a real
// engine would score raw responses against an IRT-calibrated item bank.

import { EXAMS } from "@/lib/data/exams";
import { MockAttempt, SectionScore } from "@/lib/types";

export interface MockSubmission {
  examId: string;
  type: MockAttempt["type"];
  target: number;
  /** 0..1 correctness ratio the demo test-taking UI produces. */
  performance: number;
}

export function estimateScore(sub: MockSubmission): MockAttempt {
  const exam = EXAMS[sub.examId];
  const estimatedScore = Math.round(exam.scoreMax * clamp(sub.performance, 0.45, 0.92));
  const sectionMax = Math.round(exam.scoreMax / exam.sections.length);

  const sections: SectionScore[] = exam.sections.map((section, i) => {
    const wobble = [0.06, -0.04, -0.14, -0.1][i % 4];
    const score = Math.round(
      sectionMax * clamp(sub.performance + wobble, 0.35, 0.95)
    );
    return { section, score: Math.min(sectionMax, score), max: sectionMax };
  });

  const gap = sub.target - estimatedScore;
  const prepWeeks =
    gap <= 5 ? "2–4 Weeks" : gap <= 12 ? "4–6 Weeks" : gap <= 20 ? "6–8 Weeks" : "10–12 Weeks";

  return {
    id: `mock-${Date.now()}`,
    examId: sub.examId as MockAttempt["examId"],
    type: sub.type,
    date: new Date().toISOString(),
    estimatedScore,
    scoreMax: exam.scoreMax,
    target: sub.target,
    sections,
    prepWeeks,
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
