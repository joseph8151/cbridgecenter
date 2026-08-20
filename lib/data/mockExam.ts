// Test Center's full-screen take-flow reads from the central question bank
// (questionBank.ts) instead of keeping its own copy — this file just
// reshapes BankQuestion records into the ExamItem shape the take-flow UI
// expects, and picks a fallback exam's content when the requested exam
// doesn't have its own Reading/Listening/Speaking/Writing bank questions yet.

import { BankQuestion, ExamId, ExamSectionId } from "@/lib/types";
import { EXAMS } from "@/lib/data/exams";
import { getQuestions } from "@/lib/data/questionBank";

export type ExamItem =
  | {
      id: string;
      section: "reading";
      passageTitle: string;
      passage: string;
      question: string;
      choices: string[];
    }
  | {
      id: string;
      section: "listening";
      audioTitle: string;
      transcriptHint: string;
      question: string;
      choices: string[];
    }
  | {
      id: string;
      section: "speaking";
      prompt: string;
      prepSeconds: number;
      answerSeconds: number;
    }
  | {
      id: string;
      section: "writing";
      prompt: string;
      seconds: number;
      wordLimit: number;
    };

// Exams without their own bank Reading/Listening content yet borrow TOEFL's —
// keeps the take-flow demoable for every exam while content is filled in.
const CONTENT_FALLBACK: ExamId = "toefl";

function questionsForExam(examId: ExamId, section: ExamSectionId): BankQuestion[] {
  const own = getQuestions({ examId, section });
  if (own.length) return own;
  const sameFamily = examId.startsWith("ielts")
    ? getQuestions({ examId: "ielts-academic", section })
    : [];
  if (sameFamily.length) return sameFamily;
  return getQuestions({ examId: CONTENT_FALLBACK, section });
}

function toReadingItem(q: BankQuestion): ExamItem {
  return {
    id: q.id,
    section: "reading",
    passageTitle: q.title,
    passage: q.passage ?? "",
    question: q.prompt,
    choices: q.choices ?? [],
  };
}

function toListeningItem(q: BankQuestion): ExamItem {
  return {
    id: q.id,
    section: "listening",
    audioTitle: q.audioTitle ?? q.title,
    transcriptHint: q.explanation.split(". ")[0] + ".",
    question: q.prompt,
    choices: q.choices ?? [],
  };
}

function toSpeakingItem(q: BankQuestion): ExamItem {
  return {
    id: q.id,
    section: "speaking",
    prompt: q.prompt,
    prepSeconds: q.prepTime ?? 15,
    answerSeconds: q.answerTime ?? 45,
  };
}

function toWritingItem(q: BankQuestion): ExamItem {
  return {
    id: q.id,
    section: "writing",
    prompt: q.prompt,
    seconds: q.timeLimit ?? 1200,
    wordLimit: q.recommendedWords ?? 250,
  };
}

/** Builds a short demo take-flow item set for one exam, limited to that
 *  exam's real sections (e.g. TOEIC has no Speaking/Writing). */
export function mockExamItemsFor(examId: ExamId): ExamItem[] {
  const exam = EXAMS[examId];
  const items: ExamItem[] = [];

  if (exam.sections.includes("reading")) {
    items.push(...questionsForExam(examId, "reading").slice(0, 2).map(toReadingItem));
  }
  if (exam.sections.includes("listening")) {
    items.push(...questionsForExam(examId, "listening").slice(0, 2).map(toListeningItem));
  }
  if (exam.sections.includes("speaking")) {
    const [q] = questionsForExam(examId, "speaking");
    if (q) items.push(toSpeakingItem(q));
  }
  if (exam.sections.includes("writing")) {
    const [q] = questionsForExam(examId, "writing");
    if (q) items.push(toWritingItem(q));
  }

  return items;
}

// Backward-compatible default set (TOEFL) for any caller that hasn't been
// updated to pass an examId yet.
export const MOCK_EXAM_ITEMS: ExamItem[] = mockExamItemsFor("toefl");
