// Progress Engine — computes the two numbers C-Bridge shows a student and
// keeps them strictly separate:
//
//   Estimated Exam Score  — from Full Mock / sufficient assessment data.
//   AI Progress Score     — an internal index of daily missions, practice,
//                            RETRY activity, and skill improvement.
//
// These must never be presented as the same thing. estimateExamScore() and
// computeAiProgress() are intentionally two different functions with two
// different inputs so a page can't accidentally conflate them.

import { AiProgressResult, ScoreEstimate, ScoreHistoryEntry, StudentLearningProfile } from "@/lib/types";
import { MOCK_HISTORY, SPEAKING_HISTORY, WRITING_HISTORY } from "@/lib/data/user";

export function estimateExamScore(profile: StudentLearningProfile): ScoreEstimate {
  return profile.estimatedScore;
}

export function computeAiProgress(profile: StudentLearningProfile): AiProgressResult {
  const taskCompletion = profile.totalTasks
    ? (profile.completedTasks / profile.totalTasks) * 100
    : 0;
  const streakScore = Math.min(100, (profile.studyStreak / 14) * 100);
  const retryEngagement = Math.min(100, profile.retryCount * 12);

  const skillCriteria = [...profile.speaking.criteria, ...profile.writing.criteria];
  const skillImprovement = skillCriteria.length
    ? clamp(
        50 + (skillCriteria.reduce((sum, c) => sum + c.recentChange, 0) / skillCriteria.length) * 5,
        0,
        100
      )
    : 50;

  const breakdown = [
    { label: "Daily Mission Completion", contribution: round1(taskCompletion * 0.3) },
    { label: "Study Streak", contribution: round1(streakScore * 0.2) },
    { label: "RETRY Engagement", contribution: round1(retryEngagement * 0.25) },
    { label: "Skill Improvement Trend", contribution: round1(skillImprovement * 0.25) },
  ];

  const value = Math.round(breakdown.reduce((sum, b) => sum + b.contribution, 0));

  return { value: clamp(value, 0, 100), breakdown };
}

export function buildScoreHistory(): ScoreHistoryEntry[] {
  const byDate = new Map<string, ScoreHistoryEntry>();

  const upsert = (date: string, patch: Partial<ScoreHistoryEntry>) => {
    const day = date.slice(0, 10);
    const existing = byDate.get(day) ?? { date: day };
    byDate.set(day, { ...existing, ...patch });
  };

  for (const m of MOCK_HISTORY) upsert(m.date, { mockScore: m.estimatedScore });
  for (const s of SPEAKING_HISTORY) {
    const day = s.date.slice(0, 10);
    const existing = byDate.get(day);
    if (!existing?.speakingScore || s.overallScore > existing.speakingScore) {
      upsert(s.date, { speakingScore: s.overallScore });
    }
  }
  for (const w of WRITING_HISTORY) {
    const day = w.date.slice(0, 10);
    const existing = byDate.get(day);
    if (!existing?.writingScore || w.overallScore > existing.writingScore) {
      upsert(w.date, { writingScore: w.overallScore });
    }
  }

  return [...byDate.values()].sort((a, b) => (a.date < b.date ? -1 : 1));
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}
