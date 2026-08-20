import { ExamId, ScoringCriterion } from "@/lib/types";

// Rubric criteria differ per exam/skill — swappable per exam so a real
// scoring engine can plug in exam-specific weightings later. Lives in its
// own module (rather than questions.ts) so both questionBank.ts (which
// attaches a rubric to every Speaking/Writing question) and the scoring
// service can depend on it without a circular import.
export const RUBRICS: Record<string, ScoringCriterion[]> = {
  "ielts-academic:speaking": [
    { key: "fluency", label: "Fluency & Coherence" },
    { key: "lexical", label: "Lexical Resource" },
    { key: "grammar", label: "Grammatical Range & Accuracy" },
    { key: "pronunciation", label: "Pronunciation" },
  ],
  "ielts-academic:writing": [
    { key: "task", label: "Task Achievement" },
    { key: "coherence", label: "Coherence & Cohesion" },
    { key: "lexical", label: "Lexical Resource" },
    { key: "grammar", label: "Grammatical Range & Accuracy" },
  ],
  "toefl:speaking": [
    { key: "delivery", label: "Delivery" },
    { key: "language-use", label: "Language Use" },
    { key: "topic-dev", label: "Topic Development" },
  ],
  "toefl:writing": [
    { key: "development", label: "Development" },
    { key: "organization", label: "Organization" },
    { key: "language-use", label: "Language Use" },
  ],
  "pte:speaking": [
    { key: "content", label: "Content" },
    { key: "pronunciation", label: "Pronunciation" },
    { key: "fluency", label: "Oral Fluency" },
  ],
  "pte:writing": [
    { key: "content", label: "Content" },
    { key: "grammar", label: "Grammar" },
    { key: "vocabulary", label: "Vocabulary Range" },
    { key: "form", label: "Form & Spelling" },
  ],
  "duolingo:speaking": [
    { key: "fluency", label: "Fluency" },
    { key: "pronunciation", label: "Pronunciation" },
    { key: "grammar", label: "Grammar" },
    { key: "vocabulary", label: "Vocabulary" },
  ],
  "duolingo:writing": [
    { key: "coherence", label: "Coherence" },
    { key: "grammar", label: "Grammar" },
    { key: "vocabulary", label: "Vocabulary" },
    { key: "task", label: "Task Completion" },
  ],
};

// Each exam scores Speaking/Writing on its own scale — not the exam's overall
// score max. Keeping this as a lookup (rather than inline per-exam ifs in the
// scoring service) makes it a single place to extend when a new exam is added.
export const SKILL_SCORE_MAX: Record<string, number> = {
  "ielts-academic": 9,
  "ielts-general": 9,
  toefl: 30,
  pte: 90,
  duolingo: 25,
};

export function skillMaxFor(examId: string) {
  return SKILL_SCORE_MAX[examId] ?? 9;
}

export function rubricFor(examId: ExamId | string, skill: "speaking" | "writing"): ScoringCriterion[] {
  return RUBRICS[`${examId}:${skill}`] ?? RUBRICS[`ielts-academic:${skill}`];
}
