// Score Lab reads Speaking/Writing questions through this adapter instead of
// keeping its own copy — the questions themselves live in questionBank.ts
// (the single source of truth also used by Test Center and Practice), this
// file just reshapes BankQuestion into the narrower ScoreLabQuestion view
// Score Lab's pages already expect.

import { ScoreLabQuestion } from "@/lib/types";
import { BANK_QUESTIONS } from "@/lib/data/questionBank";

export { rubricFor, skillMaxFor, RUBRICS, SKILL_SCORE_MAX } from "@/lib/data/rubrics";

function toScoreLabQuestion(q: (typeof BANK_QUESTIONS)[number]): ScoreLabQuestion {
  return {
    id: q.id,
    examId: q.examId,
    skill: q.section as "speaking" | "writing",
    part: q.title,
    prompt: q.prompt,
    prepSeconds: q.prepTime,
    answerSeconds: q.section === "speaking" ? q.answerTime : q.timeLimit,
    wordLimit: q.recommendedWords,
  };
}

export const QUESTIONS: ScoreLabQuestion[] = BANK_QUESTIONS.filter(
  (q) => q.section === "speaking" || q.section === "writing"
).map(toScoreLabQuestion);

export function questionById(id: string) {
  return QUESTIONS.find((q) => q.id === id);
}

export function questionsBySkill(skill: "speaking" | "writing", examId?: string) {
  return QUESTIONS.filter((q) => q.skill === skill && (!examId || q.examId === examId));
}
