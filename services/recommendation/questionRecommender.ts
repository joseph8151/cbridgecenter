// Question Recommendation Engine.
//
// Academy doesn't hand out random practice questions — it weights toward
// whatever skill tags the student is weakest on. Rule-based today (inverse
// of skill level, so a 42%-accuracy tag is picked far more often than a
// 90%-accuracy one); swap the internals for a real recommendation model
// later without touching any call site, since every caller only depends on
// this function's (profile, opts) -> BankQuestion[] signature.

import { BankQuestion, BankSection, StudentLearningProfile } from "@/lib/types";
import { getQuestions } from "@/lib/data/questionBank";
import { SKILL_ACCURACY } from "@/lib/data/skillAccuracy";

export interface RecommendQuestionsOptions {
  examId?: string;
  section?: BankSection;
  count?: number;
}

function weightForTag(tag: string): number {
  const acc = SKILL_ACCURACY[tag];
  if (!acc) return 1;
  const level = acc.correct / acc.total; // 0..1, lower = weaker
  // Inverse-weight: a weak skill (low level) gets a much higher pick weight.
  return Math.max(0.15, 1 - level) * 3 + 0.2;
}

function questionWeight(q: BankQuestion): number {
  if (!q.skillTags.length) return 0.3;
  return q.skillTags.reduce((sum, t) => sum + weightForTag(t), 0) / q.skillTags.length;
}

/**
 * Recommend questions for a student, weighted toward their weakest skill
 * tags rather than picked at random. Defaults to the student's own exam
 * when opts.examId is omitted; the per-tag weighting itself currently comes
 * from the shared SKILL_ACCURACY demo table rather than this specific
 * profile, but the signature takes the full profile (not just an exam id)
 * so a real per-student model can use it without changing every call site.
 */
export function recommendQuestions(
  profile: StudentLearningProfile,
  opts: RecommendQuestionsOptions = {}
): BankQuestion[] {
  const pool = getQuestions({ examId: opts.examId ?? profile.examId, section: opts.section });
  const count = opts.count ?? 5;

  return [...pool]
    .sort((a, b) => questionWeight(b) - questionWeight(a))
    .slice(0, count);
}

/** Questions targeting one specific skill tag — used by "Practice This Skill". */
export function recommendForSkill(skillTag: string, count = 3): BankQuestion[] {
  return getQuestions({ skillTag }).slice(0, count);
}
