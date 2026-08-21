// Weakness Engine — turns a StudentLearningProfile into a ranked list of
// skill-level weaknesses ("TOP WEAKNESSES"), each with a current level,
// recent change, how many bank questions target it, and a recommendation.
//
// Rule-based today (Speaking/Writing rubric scores + Reading/Listening skill
// accuracy, normalized to 0-100 and sorted ascending). Every consumer only
// depends on WeaknessEntry[], so this can be swapped for a real model later
// without touching the dashboards that render it.

import { StudentLearningProfile, WeaknessEntry } from "@/lib/types";
import { BANK_QUESTIONS } from "@/lib/data/questionBank";
import { SKILL_ACCURACY } from "@/lib/data/skillAccuracy";

function relatedQuestionCount(tag: string) {
  const norm = (s: string) => s.toLowerCase();
  return BANK_QUESTIONS.filter((q) =>
    q.skillTags.some((t) => norm(tag).includes(norm(t)) || norm(t).includes(norm(tag)))
  ).length;
}

function recommendationFor(tag: string, section: WeaknessEntry["section"]) {
  if (section === "speaking") return `${tag} RETRY Training`;
  if (section === "writing") return `${tag} Intensive Practice`;
  return `${tag} Drill`;
}

function actionHrefFor(tag: string, section: WeaknessEntry["section"]) {
  if (section === "speaking") return "/score-lab#speaking";
  if (section === "writing") return "/score-lab#writing";
  return `/practice?skill=${encodeURIComponent(tag)}`;
}

export function computeWeaknesses(profile: StudentLearningProfile, limit = 5): WeaknessEntry[] {
  const entries: WeaknessEntry[] = [];

  for (const c of profile.speaking.criteria) {
    entries.push({
      rank: 0,
      skillTag: c.tag,
      section: "speaking",
      level: c.level,
      recentChange: c.recentChange,
      relatedQuestionCount: relatedQuestionCount(c.tag),
      recommendation: recommendationFor(c.tag, "speaking"),
      actionHref: actionHrefFor(c.tag, "speaking"),
    });
  }

  for (const c of profile.writing.criteria) {
    entries.push({
      rank: 0,
      skillTag: c.tag,
      section: "writing",
      level: c.level,
      recentChange: c.recentChange,
      relatedQuestionCount: relatedQuestionCount(c.tag),
      recommendation: recommendationFor(c.tag, "writing"),
      actionHref: actionHrefFor(c.tag, "writing"),
    });
  }

  for (const [tag, acc] of Object.entries(SKILL_ACCURACY)) {
    const level = Math.round((acc.correct / acc.total) * 100);
    entries.push({
      rank: 0,
      skillTag: tag,
      section: acc.section,
      level,
      recentChange: acc.recentChange,
      relatedQuestionCount: relatedQuestionCount(tag),
      recommendation: recommendationFor(tag, acc.section),
      actionHref: actionHrefFor(tag, acc.section),
    });
  }

  return entries
    .sort((a, b) => a.level - b.level)
    .slice(0, limit)
    .map((e, i) => ({ ...e, rank: i + 1 }));
}

export function topWeakness(profile: StudentLearningProfile): WeaknessEntry | undefined {
  return computeWeaknesses(profile, 1)[0];
}
