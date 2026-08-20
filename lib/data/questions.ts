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
  {
    id: "q-pte-speak-describe-image",
    examId: "pte",
    skill: "speaking",
    part: "PTE Speaking — Describe Image",
    prompt:
      "Look at the graph showing university enrollment by field of study over ten years. In 25 seconds, describe what the image shows.",
    prepSeconds: 25,
    answerSeconds: 40,
  },
  {
    id: "q-pte-write-summarize",
    examId: "pte",
    skill: "writing",
    part: "PTE Writing — Summarize Written Text",
    prompt:
      "Summarize the following passage about renewable energy adoption in a single sentence of no more than 75 words, capturing the main point and key supporting details.",
    answerSeconds: 10 * 60,
    wordLimit: 75,
  },
  {
    id: "q-det-speak-interview",
    examId: "duolingo",
    skill: "speaking",
    part: "Duolingo English Test — Speaking Sample",
    prompt: "Talk about a change you would like to make in your daily routine, and why.",
    prepSeconds: 20,
    answerSeconds: 90,
  },
  {
    id: "q-det-write-photo",
    examId: "duolingo",
    skill: "writing",
    part: "Duolingo English Test — Writing Sample",
    prompt:
      "Look at the photo of a busy city intersection. Write a description of what you see and what might happen next.",
    answerSeconds: 5 * 60,
    wordLimit: 150,
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
