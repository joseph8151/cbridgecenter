import { MistakeRecord } from "@/lib/types";
import { getQuestion } from "@/lib/data/questionBank";

// Demo "My Mistakes" log for Alex Kim. In a real backend this would be
// written automatically whenever a Practice/Test Center MCQ answer doesn't
// match correctAnswer — deliberately clustered on Inference here so the
// weakness engine has a real, visible pattern to surface.
export const MISTAKE_LOG: MistakeRecord[] = [
  {
    id: "mistake-01",
    questionId: "toefl-read-a-q1",
    selectedAnswer: "A method for reducing air pollution in cities",
    correctAnswer: "A rise in property values near green space that can displace residents",
    date: "2026-08-06",
    skillTags: ["Inference"],
  },
  {
    id: "mistake-02",
    questionId: "toefl-read-b-q3",
    selectedAnswer: "improve the appearance of wealthy neighborhoods",
    correctAnswer: "reduce the disproportionate heat burden on lower-income residents",
    date: "2026-08-10",
    skillTags: ["Inference"],
  },
  {
    id: "mistake-03",
    questionId: "ielts-read-a-q3",
    selectedAnswer: "They agree completely with the ritual-listening explanation.",
    correctAnswer: "They are skeptical that vinyl buyers are primarily engaging with the music itself.",
    date: "2026-08-14",
    skillTags: ["Inference"],
  },
  {
    id: "mistake-04",
    questionId: "toefl-listen-a-q2",
    selectedAnswer: "Switch research topics",
    correctAnswer: "Submit the proposal early next week",
    date: "2026-08-16",
    skillTags: ["Inference"],
  },
  {
    id: "mistake-05",
    questionId: "toefl-read-b-q2",
    selectedAnswer: "Cars continue to run all night",
    correctAnswer: "Dark building materials release absorbed heat slowly after sunset",
    date: "2026-08-18",
    skillTags: ["Detail"],
  },
];

// Question IDs Alex Kim has bookmarked for later review.
export const BOOKMARKED_QUESTION_IDS: string[] = [
  "toefl-read-b-q4",
  "ielts-read-a-q2",
  "q-toefl-speak-t2-campus",
];

export function mistakesForQuestion(questionId: string) {
  return MISTAKE_LOG.filter((m) => m.questionId === questionId);
}

export function mistakeSkillCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const m of MISTAKE_LOG) {
    for (const tag of m.skillTags) counts[tag] = (counts[tag] ?? 0) + 1;
  }
  return counts;
}

export function bookmarkedQuestions() {
  return BOOKMARKED_QUESTION_IDS.map(getQuestion).filter((q): q is NonNullable<typeof q> => !!q);
}

export function isBookmarked(questionId: string) {
  return BOOKMARKED_QUESTION_IDS.includes(questionId);
}
