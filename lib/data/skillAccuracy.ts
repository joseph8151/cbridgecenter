// Demo Reading/Listening skill-tag accuracy for Alex Kim, aggregated from
// Practice + Test Center attempts. A real backend would compute this by
// grouping every graded MCQ answer by skillTags and dividing correct/total —
// this file stands in for that aggregation until answer logging exists.
export const SKILL_ACCURACY: Record<string, { correct: number; total: number; recentChange: number }> = {
  Inference: { correct: 5, total: 12, recentChange: 4 },
  "Main Idea": { correct: 9, total: 11, recentChange: 2 },
  Detail: { correct: 8, total: 10, recentChange: 6 },
  Vocabulary: { correct: 7, total: 8, recentChange: 0 },
  "Author Purpose": { correct: 4, total: 5, recentChange: -5 },
  Organization: { correct: 5, total: 6, recentChange: 3 },
  "Note-taking": { correct: 3, total: 5, recentChange: -2 },
};

export function skillAccuracyLevel(tag: string) {
  const entry = SKILL_ACCURACY[tag];
  if (!entry) return undefined;
  return Math.round((entry.correct / entry.total) * 100);
}
