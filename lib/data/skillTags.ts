import { BankSection, ExamId } from "@/lib/types";

// Default skill-tag taxonomy per section. An exam can override its own list
// below (skillTagsFor) — e.g. a future exam that scores Reading differently
// doesn't have to share TOEFL/IELTS's tags.
const DEFAULT_SKILL_TAGS: Record<BankSection, string[]> = {
  reading: ["Main Idea", "Detail", "Inference", "Vocabulary", "Author Purpose", "Organization"],
  listening: ["Main Idea", "Detail", "Inference", "Note-taking"],
  speaking: ["Fluency", "Pronunciation", "Coherence", "Grammar", "Vocabulary"],
  writing: ["Task Response", "Organization", "Grammar", "Vocabulary", "Coherence"],
};

// Per-exam overrides — only populate an entry when an exam's tags genuinely
// differ from the default set.
const EXAM_SKILL_TAG_OVERRIDES: Partial<Record<ExamId, Partial<Record<BankSection, string[]>>>> = {
  pte: {
    speaking: ["Content", "Pronunciation", "Oral Fluency"],
    writing: ["Content", "Grammar", "Vocabulary", "Form & Spelling"],
  },
  duolingo: {
    speaking: ["Fluency", "Pronunciation", "Grammar", "Vocabulary"],
    writing: ["Coherence", "Grammar", "Vocabulary", "Task Completion"],
  },
};

export function skillTagsFor(examId: ExamId, section: BankSection): string[] {
  return EXAM_SKILL_TAG_OVERRIDES[examId]?.[section] ?? DEFAULT_SKILL_TAGS[section];
}

export function allSkillTags(section: BankSection): string[] {
  const set = new Set(DEFAULT_SKILL_TAGS[section]);
  for (const overrides of Object.values(EXAM_SKILL_TAG_OVERRIDES)) {
    overrides[section]?.forEach((t) => set.add(t));
  }
  return [...set];
}
