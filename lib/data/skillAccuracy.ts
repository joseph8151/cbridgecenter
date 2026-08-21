import { ExamSectionId } from "@/lib/types";

// Demo Reading/Listening skill-tag accuracy for Alex Kim, aggregated from
// Practice + Test Center attempts. A real backend would compute this by
// grouping every graded MCQ answer by skillTags and dividing correct/total —
// this file stands in for that aggregation until answer logging exists.
//
// `section` is stored explicitly per tag rather than inferred from the tag
// name — several tags (Main Idea, Detail, Inference) are shared between the
// Reading and Listening taxonomies (see skillTags.ts), so the tag alone
// can't tell you which section a given accuracy figure came from.
export const SKILL_ACCURACY: Record<
  string,
  { correct: number; total: number; recentChange: number; section: ExamSectionId }
> = {
  Inference: { correct: 5, total: 12, recentChange: 4, section: "reading" },
  "Main Idea": { correct: 9, total: 11, recentChange: 2, section: "reading" },
  Detail: { correct: 8, total: 10, recentChange: 6, section: "reading" },
  Vocabulary: { correct: 7, total: 8, recentChange: 0, section: "reading" },
  "Author Purpose": { correct: 4, total: 5, recentChange: -5, section: "reading" },
  Organization: { correct: 5, total: 6, recentChange: 3, section: "reading" },
  "Note-taking": { correct: 3, total: 5, recentChange: -2, section: "listening" },
};

export function skillAccuracyLevel(tag: string) {
  const entry = SKILL_ACCURACY[tag];
  if (!entry) return undefined;
  return Math.round((entry.correct / entry.total) * 100);
}
