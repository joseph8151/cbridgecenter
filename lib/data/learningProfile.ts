// Builds the Student Learning Profile — the one object the weakness engine,
// recommendation engine, and progress engine all read from, instead of each
// re-deriving "how is this student doing" from scattered history arrays.
//
// Only one demo student exists today (Alex Kim), so this reads straight from
// the static demo data files. A real backend would replace the body of
// `buildLearningProfile` with a database read, but every consumer downstream
// only depends on the StudentLearningProfile shape — nothing else changes.

import { StudentLearningProfile, SkillPerformance } from "@/lib/types";
import { DEMO_USER, MOCK_HISTORY, SPEAKING_HISTORY, WRITING_HISTORY, LATEST_MOCK } from "@/lib/data/user";
import { TODAY_TASKS } from "@/lib/data/academy";
import { rubricFor, skillMaxFor } from "@/lib/data/rubrics";
import { MISTAKE_LOG } from "@/lib/data/mistakes";

function criteriaPerformance(
  examId: string,
  skill: "speaking" | "writing",
  history: typeof SPEAKING_HISTORY
): SkillPerformance[] {
  const rubric = rubricFor(examId, skill);
  const max = skillMaxFor(examId);
  const sorted = [...history].sort((a, b) => (a.date < b.date ? -1 : 1));
  const latest = sorted[sorted.length - 1];
  const prior = sorted[sorted.length - 2];

  return rubric.map((c) => {
    const latestScore = latest?.criteria.find((x) => x.key === c.key)?.score ?? 0;
    const priorScore = prior?.criteria.find((x) => x.key === c.key)?.score ?? latestScore;
    return {
      tag: c.label,
      section: skill,
      level: Math.round((latestScore / max) * 100),
      recentChange: Math.round(((latestScore - priorScore) / max) * 100),
      sampleSize: history.length,
    };
  });
}

export function buildLearningProfile(): StudentLearningProfile {
  const speakingSorted = [...SPEAKING_HISTORY].sort((a, b) => (a.date < b.date ? -1 : 1));
  const writingSorted = [...WRITING_HISTORY].sort((a, b) => (a.date < b.date ? -1 : 1));
  const bestSpeaking = SPEAKING_HISTORY.length
    ? Math.max(...SPEAKING_HISTORY.map((a) => a.overallScore))
    : undefined;
  const bestWriting = WRITING_HISTORY.length
    ? Math.max(...WRITING_HISTORY.map((a) => a.overallScore))
    : undefined;

  const retryCount =
    SPEAKING_HISTORY.filter((a) => a.attemptNumber > 1).length +
    WRITING_HISTORY.filter((a) => a.attemptNumber > 1).length;

  return {
    examId: DEMO_USER.examId,
    targetScore: DEMO_USER.targetScore,
    examDate: DEMO_USER.examDate,
    dailyMinutes: DEMO_USER.dailyStudyTime,

    estimatedScore: {
      value: LATEST_MOCK.estimatedScore,
      max: LATEST_MOCK.scoreMax,
      confidence: {
        // More Full Mocks behind a number = more confidence in it. Capped
        // well under 1.0 — a handful of practice mocks should never read as
        // "certain," and this is a mock estimator to begin with.
        confidence: Math.min(0.9, 0.35 + MOCK_HISTORY.length * 0.08),
        dataPoints: MOCK_HISTORY.length,
        lastUpdated: LATEST_MOCK.date,
      },
    },
    sectionScores: LATEST_MOCK.sections,

    speaking: {
      attempts: SPEAKING_HISTORY.length,
      latest: speakingSorted[speakingSorted.length - 1]?.overallScore,
      best: bestSpeaking,
      max: skillMaxFor(DEMO_USER.examId),
      criteria: criteriaPerformance(DEMO_USER.examId, "speaking", SPEAKING_HISTORY),
    },
    writing: {
      attempts: WRITING_HISTORY.length,
      latest: writingSorted[writingSorted.length - 1]?.overallScore,
      best: bestWriting,
      max: skillMaxFor(DEMO_USER.examId),
      criteria: criteriaPerformance(DEMO_USER.examId, "writing", WRITING_HISTORY),
    },

    completedTasks: TODAY_TASKS.filter((t) => t.status === "done").length,
    totalTasks: TODAY_TASKS.length,
    incorrectQuestionIds: MISTAKE_LOG.map((m) => m.questionId),
    studyTimeMinutes: DEMO_USER.dailyStudyTime,
    studyStreak: DEMO_USER.studyStreak,
    retryCount,
  };
}

export function getMockTrend() {
  const sorted = [...MOCK_HISTORY].sort((a, b) => (a.date < b.date ? -1 : 1));
  return {
    latest: sorted[sorted.length - 1],
    prior: sorted[sorted.length - 2],
    best: MOCK_HISTORY.reduce((a, b) => (b.estimatedScore > a.estimatedScore ? b : a)),
  };
}
