// AI scoring service — Speaking & Writing.
//
// Currently returns deterministic mock responses so the product experience
// (RETRY loop, rubric breakdown, feedback cards) can be fully built and
// demoed without a live model. Swap `scoreSpeaking` / `scoreWriting` for
// real calls to a speech-to-text + LLM grading pipeline (or Claude) later —
// callers only depend on the ScoreLabAttempt shape below, not on how the
// score was produced.

import { RubricCriterion, ScoreLabAttempt } from "@/lib/types";
import { rubricFor, skillMaxFor } from "@/lib/data/questions";

export interface ScoreRequest {
  questionId: string;
  examId: string;
  skill: "speaking" | "writing";
  attemptNumber: number;
  previousScore?: number;
  /** Recording (speaking) or text (writing) payload — unused by the mock. */
  payload: Blob | string;
}

const STRENGTH_BANK = [
  "질문에서 요구한 모든 항목에 답변함",
  "적절한 어휘를 사용해 아이디어를 구체적으로 전달함",
  "답변 구조가 명확하고 논리적임",
  "발음 및 억양이 이해하기 쉬움",
];

const IMPROVEMENT_BANK = [
  "긴 문장 앞에서 멈춤이 자주 발생함",
  "아이디어를 연결하는 표현의 사용이 제한적임",
  "관사·시제 오류가 반복됨",
  "예시가 다소 추상적이며 구체성이 부족함",
];

const TRY_THIS_BANK = [
  "결론 문장에서 자신의 입장을 한 번 더 요약해 답변을 닫아보세요.",
  "일반적인 진술 뒤에 구체적인 개인 경험을 덧붙여보세요.",
  "같은 단어를 반복하지 말고 유의어를 미리 준비해두세요.",
  "긴 문장은 두 문장으로 나눠 가독성을 높여보세요.",
];

function pick<T>(arr: T[], seed: number, n: number): T[] {
  const start = seed % arr.length;
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(arr[(start + i) % arr.length]);
  return out;
}

// Deterministic pseudo-random delta so RETRY can go up, flat, or down —
// mirrors real variance instead of always improving.
function deltaForAttempt(attemptNumber: number, questionId: string) {
  const seed = [...questionId].reduce((a, c) => a + c.charCodeAt(0), 0) + attemptNumber;
  const options = [0.5, 0.5, 0, -0.5, 1];
  return options[seed % options.length];
}

export async function scoreAttempt(req: ScoreRequest): Promise<ScoreLabAttempt> {
  const rubric = rubricFor(req.examId, req.skill);
  const max = skillMaxFor(req.examId);
  const base = req.previousScore ?? roundToStep(max * 0.55, max);
  const delta = deltaForAttempt(req.attemptNumber, req.questionId) * (max / 9);
  const overall = Math.max(0, Math.min(max, roundToStep(base + delta, max)));

  const criteria: RubricCriterion[] = rubric.map((c, i) => ({
    key: c.key,
    label: c.label,
    score: Math.max(0, Math.min(max, roundToStep(overall + variance(i) * (max / 9), max))),
    max,
  }));

  const seed = req.attemptNumber + req.questionId.length;

  return {
    id: `attempt-${Date.now()}-${req.questionId}`,
    questionId: req.questionId,
    attemptNumber: req.attemptNumber,
    date: new Date().toISOString(),
    overallScore: overall,
    overallMax: max,
    criteria,
    strengths: pick(STRENGTH_BANK, seed, 2),
    improvements: pick(IMPROVEMENT_BANK, seed + 1, 3),
    tryThis: pick(TRY_THIS_BANK, seed + 2, 1)[0],
  };
}

function roundToStep(n: number, max: number) {
  const step = max === 9 ? 0.5 : 1;
  return Math.round(n / step) * step;
}

function variance(i: number) {
  const table = [0, 0.5, -0.5, 0.5];
  return table[i % table.length];
}
