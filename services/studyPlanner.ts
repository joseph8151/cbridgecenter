// AI Academy study planner — turns (current score, target score, exam date,
// daily minutes) into a day-by-day plan and a "why this plan" explanation.
// Mock heuristic today; designed to be swapped for a real planning model
// that reads a user's full mock/Score Lab history.

import { ExamSectionId } from "@/lib/types";

export interface PlanRequest {
  examId: string;
  startScore: number;
  targetScore: number;
  examDateISO: string;
  dailyMinutes: number;
  weakestSection: ExamSectionId;
}

export interface GeneratedPlan {
  durationDays: number;
  dailyMinutes: number;
  focusSection: ExamSectionId;
  rationale: string;
}

export function generatePlan(req: PlanRequest): GeneratedPlan {
  const days = Math.max(
    7,
    Math.min(90, Math.round((new Date(req.examDateISO).getTime() - Date.now()) / 86400000))
  );

  const gap = req.targetScore - req.startScore;
  const rationale =
    gap > 0
      ? `현재 점수와 목표점수 차이가 ${gap}점입니다. ${labelFor(req.weakestSection)} 영역이 가장 낮아 이 영역의 학습 비중을 우선 높입니다.`
      : `목표점수에 근접했습니다. 유지 및 안정화를 위한 균형 학습 계획을 제공합니다.`;

  return {
    durationDays: days,
    dailyMinutes: req.dailyMinutes,
    focusSection: req.weakestSection,
    rationale,
  };
}

export function whyThisPlan(weakestSection: ExamSectionId, recentDelta: number) {
  const label = labelFor(weakestSection);
  const trend = recentDelta >= 0 ? "향상되고 있습니다" : "정체되어 있습니다";
  return `최근 평가에서 ${label}이(가) 가장 낮았습니다. ${label}은(는) 현재 ${trend}. 오늘 ${label} 연습량을 평소보다 높였습니다.`;
}

function labelFor(section: ExamSectionId) {
  const map: Record<ExamSectionId, string> = {
    reading: "Reading",
    listening: "Listening",
    speaking: "Speaking Fluency",
    writing: "Writing",
  };
  return map[section];
}
