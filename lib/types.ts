// Core domain types shared across Test Center, Score Lab, and AI Academy.
// Kept exam-agnostic so scoring rubrics / question banks can be swapped per exam.

export type ExamId =
  | "toefl"
  | "ielts-academic"
  | "ielts-general"
  | "pte"
  | "duolingo"
  | "teps"
  | "toeic"
  | "oet";

export interface ExamDefinition {
  id: ExamId;
  name: string;
  fullName: string;
  scoreMax: number;
  scoreLabel: string; // "Score" | "Band"
  sections: ExamSectionId[];
  color?: string;
}

export type ExamSectionId = "reading" | "listening" | "speaking" | "writing";

export interface SectionScore {
  section: ExamSectionId;
  score: number;
  max: number;
}

export type MockType = "mini" | "section" | "full";

export interface MockProduct {
  id: string;
  examId: ExamId;
  type: MockType;
  name: string;
  price: number;
  duration: string;
  description: string;
  features?: string[];
  badge?: string;
}

export interface MockAttempt {
  id: string;
  examId: ExamId;
  type: MockType;
  date: string; // ISO
  estimatedScore: number;
  scoreMax: number;
  target: number;
  sections: SectionScore[];
  prepWeeks: string;
}

export type ScoreLabSkill = "speaking" | "writing";

export interface RubricCriterion {
  key: string;
  label: string;
  score: number;
  max: number;
}

export interface ScoreLabQuestion {
  id: string;
  examId: ExamId;
  skill: ScoreLabSkill;
  part: string; // e.g. "IELTS Speaking Part 2"
  prompt: string;
  prepSeconds?: number;
  answerSeconds?: number;
  wordLimit?: number;
}

export interface ScoreLabAttempt {
  id: string;
  questionId: string;
  attemptNumber: number;
  date: string;
  overallScore: number;
  overallMax: number;
  criteria: RubricCriterion[];
  strengths: string[];
  improvements: string[];
  tryThis: string;
  fromAcademy?: boolean;
}

export interface DailyTask {
  id: string;
  order: number;
  title: string;
  type: ExamSectionId | "vocabulary";
  durationMin: number;
  status: "pending" | "in-progress" | "done";
  linkedSkill?: ScoreLabSkill;
  questionId?: string;
  meta?: string; // e.g. "15 Questions"
}

export interface CourseProduct {
  id: string;
  name: string;
  lengthWeeks: number;
  listPrice: number;
  launchPrice: number;
  badge?: string;
  tagline: string;
  features: string[];
}

export interface StudyPlan {
  courseId: string;
  examId: ExamId;
  startScore: number;
  targetScore: number;
  examDate: string;
  durationDays: number;
  dailyMinutes: number;
  startedAt: string;
}

export interface ScheduleMilestone {
  day: number;
  label: string;
  type: "baseline" | "section" | "mid" | "weakness" | "final";
  done: boolean;
}

export interface WeeklyReport {
  week: number;
  studyCompletionPct: number;
  studyTime: string;
  deltas: Partial<Record<ExamSectionId, number>>;
  biggestImprovement: string;
  nextFocus: string;
  aiComment: string;
}

export interface UserProfile {
  name: string;
  email: string;
  examId: ExamId;
  currentScore: number;
  targetScore: number;
  examDate: string;
  course: string;
  aiProgressScore: number;
  courseProgressPct: number;
  studyStreak: number;
  dailyStudyTime: number; // minutes today
  totalStudyTime: string; // "46h 21m"
  availableCredits: number;
  subscription: "none" | "score-lab-unlimited" | "academy-active";
}
