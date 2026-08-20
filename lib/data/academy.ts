import { CourseProduct, DailyTask, ScheduleMilestone, WeeklyReport } from "@/lib/types";

export const COURSES: CourseProduct[] = [
  {
    id: "boost-2wk",
    name: "2-WEEK BOOST",
    lengthWeeks: 2,
    listPrice: 198000,
    launchPrice: 149000,
    tagline: "시험 직전 집중훈련",
    features: ["Daily AI Plan", "Score Lab", "Full Mock × 1"],
  },
  {
    id: "target-4wk",
    name: "4-WEEK TARGET",
    lengthWeeks: 4,
    listPrice: 348000,
    launchPrice: 249000,
    badge: "MOST POPULAR",
    tagline: "목표점수 집중과정",
    features: [
      "Daily AI Plan",
      "Score Lab",
      "Full Mock × 2",
      "Weekly Report",
      "AI Study Coach",
    ],
  },
  {
    id: "mastery-12wk",
    name: "12-WEEK MASTERY",
    lengthWeeks: 12,
    listPrice: 798000,
    launchPrice: 599000,
    tagline: "장기 완전관리 과정",
    features: [
      "Full Program",
      "Full Mock × 4",
      "Score Lab",
      "Practice",
      "Premium Coach",
      "Growth Report",
    ],
  },
];

export const COURSE_BEST_FOR: Record<string, string> = {
  "boost-2wk": "시험이 2~3주 앞으로 다가온 수험생",
  "target-4wk": "한 달 동안 집중적으로 목표점수를 만들고 싶은 수험생",
  "mastery-12wk": "현재 점수와 목표 점수 차이가 큰 수험생",
};

// Comparison matrix shown under Academy pricing.
export const COURSE_COMPARISON_ROWS = [
  "Daily AI Plan",
  "Score Lab",
  "Full Mock",
  "Weekly Report",
  "AI Study Coach",
  "Practice",
  "Score Passport",
  "Support",
] as const;

export const COURSE_COMPARISON: Record<string, Record<string, string>> = {
  "boost-2wk": {
    "Daily AI Plan": "✓",
    "Score Lab": "✓",
    "Full Mock": "× 1",
    "Weekly Report": "—",
    "AI Study Coach": "—",
    Practice: "—",
    "Score Passport": "✓",
    Support: "Email",
  },
  "target-4wk": {
    "Daily AI Plan": "✓",
    "Score Lab": "✓",
    "Full Mock": "× 2",
    "Weekly Report": "✓",
    "AI Study Coach": "✓",
    Practice: "—",
    "Score Passport": "✓",
    Support: "Priority Email",
  },
  "mastery-12wk": {
    "Daily AI Plan": "✓",
    "Score Lab": "✓",
    "Full Mock": "× 4",
    "Weekly Report": "✓",
    "AI Study Coach": "✓ Premium",
    Practice: "✓",
    "Score Passport": "✓",
    Support: "Priority + Coach Chat",
  },
};

export function courseById(id: string) {
  return COURSES.find((c) => c.id === id);
}

export const TODAY_TASKS: DailyTask[] = [
  {
    id: "t1",
    order: 1,
    title: "Speaking Fluency Drill",
    type: "speaking",
    durationMin: 20,
    status: "done",
    linkedSkill: "speaking",
    questionId: "q-ielts-speak-p2-trip",
  },
  {
    id: "t2",
    order: 2,
    title: "Reading Inference",
    type: "reading",
    durationMin: 25,
    status: "done",
    meta: "15 Questions",
  },
  {
    id: "t3",
    order: 3,
    title: "Writing Task 2",
    type: "writing",
    durationMin: 30,
    status: "in-progress",
    linkedSkill: "writing",
    questionId: "q-ielts-write-t2-tech",
  },
  {
    id: "t4",
    order: 4,
    title: "Vocabulary Review",
    type: "vocabulary",
    durationMin: 15,
    status: "pending",
  },
];

export const SCHEDULE_4WK: ScheduleMilestone[] = [
  { day: 1, label: "Baseline Test", type: "baseline", done: true },
  { day: 7, label: "Section Check", type: "section", done: true },
  { day: 14, label: "Mid Mock", type: "mid", done: false },
  { day: 21, label: "Weakness Test", type: "weakness", done: false },
  { day: 28, label: "Final Full Mock", type: "final", done: false },
];

export const WEEKLY_REPORTS: WeeklyReport[] = [
  {
    week: 1,
    studyCompletionPct: 81,
    studyTime: "7h 58m",
    deltas: { speaking: 0.5, reading: 2 },
    biggestImprovement: "Speaking Fluency",
    nextFocus: "Writing Coherence",
    aiComment:
      "Speaking은 안정적으로 향상되고 있습니다. 다음 주부터 Writing 비중을 15% 늘립니다.",
  },
  {
    week: 2,
    studyCompletionPct: 87,
    studyTime: "8h 42m",
    deltas: { speaking: 0.5, writing: 0.5, reading: 3 },
    biggestImprovement: "Speaking Fluency",
    nextFocus: "Writing Coherence",
    aiComment:
      "Speaking은 안정적으로 향상되고 있습니다. 다음 주부터 Writing 비중을 15% 늘립니다.",
  },
];
