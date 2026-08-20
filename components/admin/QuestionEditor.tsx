"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BankQuestion, BankSection, Difficulty } from "@/lib/types";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { EXAM_LIST } from "@/lib/data/exams";
import { allSkillTags } from "@/lib/data/skillTags";
import { cn } from "@/lib/utils";

const SECTIONS: BankSection[] = ["reading", "listening", "speaking", "writing"];
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

function blankQuestion(): BankQuestion {
  const now = new Date().toISOString();
  return {
    id: `q-${Date.now()}`,
    examId: "toefl",
    section: "reading",
    questionType: "main-idea",
    title: "",
    prompt: "",
    explanation: "",
    difficulty: "medium",
    skillTags: [],
    estimatedTime: 60,
    sourceType: "cbridge-original",
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
}

export function QuestionEditor({ initial }: { initial?: BankQuestion }) {
  const router = useRouter();
  const { addQuestion, updateQuestion } = useAdminData();
  const [q, setQ] = useState<BankQuestion>(initial ?? blankQuestion());
  const [choicesText, setChoicesText] = useState((initial?.choices ?? []).join("\n"));
  const isEdit = !!initial;

  function set<K extends keyof BankQuestion>(key: K, value: BankQuestion[K]) {
    setQ((prev) => ({ ...prev, [key]: value }));
  }

  function toggleSkill(tag: string) {
    setQ((prev) => ({
      ...prev,
      skillTags: prev.skillTags.includes(tag)
        ? prev.skillTags.filter((t) => t !== tag)
        : [...prev.skillTags, tag],
    }));
  }

  function handleSave() {
    const choices = choicesText.split("\n").map((c) => c.trim()).filter(Boolean);
    const payload: BankQuestion = { ...q, choices: choices.length ? choices : undefined };
    if (isEdit) updateQuestion(q.id, payload);
    else addQuestion(payload);
    router.push("/admin/questions");
  }

  const isMcq = q.section === "reading" || q.section === "listening";
  const skillOptions = allSkillTags(q.section);

  return (
    <div className="max-w-3xl">
      <div className="grid gap-4 rounded-card border border-line bg-white p-5 sm:grid-cols-2">
        <Field label="Title">
          <input
            value={q.title}
            onChange={(e) => set("title", e.target.value)}
            className="admin-input"
            placeholder="Short internal label"
          />
        </Field>
        <Field label="Exam">
          <select value={q.examId} onChange={(e) => set("examId", e.target.value as BankQuestion["examId"])} className="admin-input">
            {EXAM_LIST.map((ex) => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
          </select>
        </Field>
        <Field label="Section">
          <select
            value={q.section}
            onChange={(e) => set("section", e.target.value as BankSection)}
            className="admin-input"
          >
            {SECTIONS.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
          </select>
        </Field>
        <Field label="Question Type">
          <input
            value={q.questionType}
            onChange={(e) => set("questionType", e.target.value)}
            className="admin-input"
            placeholder="e.g. inference, part2, task2"
          />
        </Field>
        <Field label="Difficulty">
          <select value={q.difficulty} onChange={(e) => set("difficulty", e.target.value as Difficulty)} className="admin-input">
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d[0].toUpperCase() + d.slice(1)}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select
            value={q.status}
            onChange={(e) => set("status", e.target.value as BankQuestion["status"])}
            className="admin-input"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>
        <Field label="Estimated Time (sec)">
          <input
            type="number"
            value={q.estimatedTime}
            onChange={(e) => set("estimatedTime", Number(e.target.value))}
            className="admin-input"
          />
        </Field>
        <Field label="Media (image/audio ref)">
          <input
            value={q.image ?? q.audioTitle ?? ""}
            onChange={(e) => (q.section === "listening" ? set("audioTitle", e.target.value) : set("image", e.target.value))}
            className="admin-input"
            placeholder="Optional asset reference"
          />
        </Field>
      </div>

      {q.section === "reading" && (
        <div className="mt-4 rounded-card border border-line bg-white p-5">
          <Field label="Passage">
            <textarea
              value={q.passage ?? ""}
              onChange={(e) => set("passage", e.target.value)}
              className="admin-input h-28"
            />
          </Field>
        </div>
      )}

      <div className="mt-4 rounded-card border border-line bg-white p-5">
        <Field label="Prompt">
          <textarea value={q.prompt} onChange={(e) => set("prompt", e.target.value)} className="admin-input h-20" />
        </Field>

        {isMcq && (
          <>
            <Field label="Choices (one per line)">
              <textarea
                value={choicesText}
                onChange={(e) => setChoicesText(e.target.value)}
                className="admin-input h-24"
              />
            </Field>
            <Field label="Correct Answer">
              <select
                value={q.correctAnswer ?? ""}
                onChange={(e) => set("correctAnswer", e.target.value)}
                className="admin-input"
              >
                <option value="">Select correct choice</option>
                {choicesText.split("\n").map((c) => c.trim()).filter(Boolean).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </>
        )}

        <Field label="Explanation">
          <textarea
            value={q.explanation}
            onChange={(e) => set("explanation", e.target.value)}
            className="admin-input h-20"
          />
        </Field>
      </div>

      {q.section === "speaking" && (
        <div className="mt-4 grid gap-4 rounded-card border border-line bg-white p-5 sm:grid-cols-2">
          <Field label="Prep Time (sec)">
            <input type="number" value={q.prepTime ?? 15} onChange={(e) => set("prepTime", Number(e.target.value))} className="admin-input" />
          </Field>
          <Field label="Answer Time (sec)">
            <input type="number" value={q.answerTime ?? 45} onChange={(e) => set("answerTime", Number(e.target.value))} className="admin-input" />
          </Field>
        </div>
      )}

      {q.section === "writing" && (
        <div className="mt-4 grid gap-4 rounded-card border border-line bg-white p-5 sm:grid-cols-3">
          <Field label="Minimum Words">
            <input type="number" value={q.minimumWords ?? 0} onChange={(e) => set("minimumWords", Number(e.target.value))} className="admin-input" />
          </Field>
          <Field label="Recommended Words">
            <input type="number" value={q.recommendedWords ?? 0} onChange={(e) => set("recommendedWords", Number(e.target.value))} className="admin-input" />
          </Field>
          <Field label="Time Limit (sec)">
            <input type="number" value={q.timeLimit ?? 0} onChange={(e) => set("timeLimit", Number(e.target.value))} className="admin-input" />
          </Field>
        </div>
      )}

      <div className="mt-4 rounded-card border border-line bg-white p-5">
        <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Skill Tags</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {skillOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleSkill(tag)}
              className={cn(
                "rounded-pill border px-3 py-1.5 text-xs font-semibold",
                q.skillTags.includes(tag)
                  ? "border-purple-600 bg-purple-600 text-white"
                  : "border-line text-ink-soft hover:border-purple-300"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          onClick={handleSave}
          className="rounded-full bg-purple-600 px-6 py-3 text-sm font-bold text-white hover:bg-purple-700"
        >
          {isEdit ? "Save Changes" : "Add Question"}
        </button>
        <p className="flex items-center text-[11px] text-ink-soft">
          Demo Mode — 이 세션에서만 반영되며 저장되지 않습니다.
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
