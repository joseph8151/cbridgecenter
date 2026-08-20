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

// ---------------------------------------------------------------------------
// Central Question Bank
//
// Exam -> Section -> Question Type -> Question Set -> Question is the shape
// every exam's content follows. Test Center, Score Lab, and Practice all read
// from the same BankQuestion records (lib/data/questionBank.ts) instead of
// keeping their own copies, so editing a question updates every surface that
// uses it.
// ---------------------------------------------------------------------------

export type Difficulty = "easy" | "medium" | "hard";
export type QuestionSourceType = "cbridge-original" | "licensed";
export type QuestionStatus = "published" | "draft";
export type BankSection = ExamSectionId;

export interface ScoringCriterion {
  key: string;
  label: string;
}

export interface BankQuestion {
  id: string;
  examId: ExamId;
  section: BankSection;
  /** Exam- and section-specific type, e.g. "inference" (reading) or "part2" (IELTS speaking). */
  questionType: string;
  title: string;
  passage?: string;
  /** Stand-in for a real audio asset — no audio pipeline exists yet. */
  audioTitle?: string;
  image?: string;
  prompt: string;
  /** Multiple-choice questions only (reading/listening). */
  choices?: string[];
  correctAnswer?: string;
  explanation: string;
  difficulty: Difficulty;
  skillTags: string[];
  estimatedTime: number; // seconds
  sourceType: QuestionSourceType;
  status: QuestionStatus;
  createdAt: string;
  updatedAt: string;
  // Speaking only
  prepTime?: number;
  answerTime?: number;
  // Writing only
  minimumWords?: number;
  recommendedWords?: number;
  timeLimit?: number;
  // Speaking & Writing — the rubric this question is graded against.
  scoringCriteria?: ScoringCriterion[];
}

export interface QuestionSet {
  id: string;
  examId: ExamId;
  section: BankSection;
  questionType: string;
  name: string; // e.g. "Practice Set 01"
  questionIds: string[];
}

export interface MistakeRecord {
  id: string;
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  date: string;
  skillTags: string[];
}

export interface QuestionBankFilter {
  examId?: ExamId;
  section?: BankSection;
  questionType?: string;
  difficulty?: Difficulty;
  skillTag?: string;
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

// ---------------------------------------------------------------------------
// Student Learning Profile
//
// C-Bridge's real asset isn't any single AI call — it's this profile, built
// by aggregating every Mock/Score Lab/Practice result a student produces.
// The weakness engine, recommendation engine, and study planner all read
// from ONE profile instead of each re-deriving their own view of "how is
// this student doing" from scattered history arrays.
// ---------------------------------------------------------------------------

/** Internal — how much to trust a derived number. Not always shown raw to the
 *  user, but every estimate the AI layer produces carries one of these. */
export interface ConfidenceMeta {
  confidence: number; // 0..1
  dataPoints: number;
  lastUpdated: string;
}

export interface ScoreEstimate {
  value: number;
  max: number;
  confidence: ConfidenceMeta;
}

export interface SkillPerformance {
  tag: string;
  section: ExamSectionId;
  level: number; // 0..100
  recentChange: number; // delta vs the previous data point, can be negative
  sampleSize: number; // how many graded answers/questions this is based on
}

export interface StudentLearningProfile {
  examId: ExamId;
  targetScore: number;
  examDate: string;
  dailyMinutes: number;

  estimatedScore: ScoreEstimate;
  sectionScores: SectionScore[];

  speaking: {
    attempts: number;
    latest?: number;
    best?: number;
    max: number;
    criteria: SkillPerformance[];
  };
  writing: {
    attempts: number;
    latest?: number;
    best?: number;
    max: number;
    criteria: SkillPerformance[];
  };

  completedTasks: number;
  totalTasks: number;
  incorrectQuestionIds: string[];
  studyTimeMinutes: number;
  studyStreak: number;
  retryCount: number;
}

export interface WeaknessEntry {
  rank: number;
  skillTag: string;
  section: ExamSectionId;
  level: number; // 0..100, current
  recentChange: number;
  relatedQuestionCount: number;
  recommendation: string;
  actionHref: string;
}

export interface NextBestAction {
  title: string;
  reason: string;
  estimatedMinutes: number;
  href: string;
  ctaLabel: string;
}

export interface ScoreHistoryEntry {
  date: string;
  mockScore?: number;
  speakingScore?: number;
  writingScore?: number;
  aiProgress?: number;
}

export interface AiProgressResult {
  value: number; // 0..100
  breakdown: { label: string; contribution: number }[];
}
