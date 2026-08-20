// Recommendation Engine — "Your Next Best Action".
//
// Turns the #1 entry from the Weakness Engine into a single, concrete next
// step: a title, a plain-language reason (the "WHY THIS?" a student always
// gets), an estimated time, and where to go to act on it now.

import { NextBestAction, StudentLearningProfile, WeaknessEntry } from "@/lib/types";
import { computeWeaknesses } from "@/services/weaknessEngine";

const TASK_MINUTES: Record<WeaknessEntry["section"], number> = {
  speaking: 12,
  writing: 20,
  reading: 15,
  listening: 15,
};

export function getNextBestAction(profile: StudentLearningProfile): NextBestAction | null {
  const [top] = computeWeaknesses(profile, 1);
  if (!top) return null;

  const reasonBySection: Record<WeaknessEntry["section"], string> = {
    speaking: `최근 Speaking 답변에서 ${top.skillTag}가(이) 가장 낮았습니다.`,
    writing: `최근 Writing 답변에서 ${top.skillTag}가(이) 가장 낮았습니다.`,
    reading: `최근 연습 데이터에서 ${top.skillTag} 문제 정답률이 가장 낮았습니다 (${top.level}%).`,
    listening: `최근 연습 데이터에서 ${top.skillTag} 문제 정답률이 가장 낮았습니다 (${top.level}%).`,
  };

  return {
    title: top.recommendation,
    reason: reasonBySection[top.section],
    estimatedMinutes: TASK_MINUTES[top.section],
    href: top.actionHref,
    ctaLabel: "START NOW",
  };
}
