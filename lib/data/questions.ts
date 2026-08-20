import { ScoreLabQuestion } from "@/lib/types";

// Rubric criteria differ per exam/skill — swappable per exam so a real
// scoring engine can plug in exam-specific weightings later.
export const RUBRICS: Record<string, { key: string; label: string }[]> = {
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
};

export function rubricFor(examId: string, skill: "speaking" | "writing") {
  return RUBRICS[`${examId}:${skill}`] ?? RUBRICS[`ielts-academic:${skill}`];
}

export const QUESTIONS: ScoreLabQuestion[] = [
  {
    id: "q-ielts-speak-p2-trip",
    examId: "ielts-academic",
    skill: "speaking",
    part: "IELTS Speaking Part 2",
    prompt:
      "Describe a memorable trip you took. You should say: where you went, who you went with, what you did there, and explain why it was memorable.",
    prepSeconds: 60,
    answerSeconds: 120,
  },
  {
    id: "q-ielts-speak-p1-work",
    examId: "ielts-academic",
    skill: "speaking",
    part: "IELTS Speaking Part 1",
    prompt: "Do you work or are you a student? What do you like most about it?",
    prepSeconds: 15,
    answerSeconds: 45,
  },
  {
    id: "q-toefl-speak-t2-campus",
    examId: "toefl",
    skill: "speaking",
    part: "TOEFL Speaking Task 2",
    prompt:
      "Some students prefer to study alone. Others prefer to study with a group. Which do you prefer and why?",
    prepSeconds: 15,
    answerSeconds: 45,
  },
  {
    id: "q-ielts-write-t2-tech",
    examId: "ielts-academic",
    skill: "writing",
    part: "IELTS Writing Task 2",
    prompt:
      "Some people think technology has made our lives more complicated, while others think it has made life easier. Discuss both views and give your own opinion.",
    answerSeconds: 40 * 60,
    wordLimit: 250,
  },
  {
    id: "q-toefl-write-independent",
    examId: "toefl",
    skill: "writing",
    part: "TOEFL Writing — Independent Task",
    prompt:
      "Do you agree or disagree with the following statement? Success in life is mostly determined by luck rather than effort. Use specific reasons and examples to support your answer.",
    answerSeconds: 30 * 60,
    wordLimit: 300,
  },
];

export function questionById(id: string) {
  return QUESTIONS.find((q) => q.id === id);
}

export function questionsBySkill(skill: "speaking" | "writing", examId?: string) {
  return QUESTIONS.filter(
    (q) => q.skill === skill && (!examId || q.examId === examId)
  );
}
