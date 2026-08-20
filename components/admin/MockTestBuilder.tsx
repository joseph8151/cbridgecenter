"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { MockTestDefinition, MockTestStatus } from "@/lib/data/mockTests";
import { EXAM_LIST, EXAMS } from "@/lib/data/exams";
import { cn } from "@/lib/utils";

function blank(): MockTestDefinition {
  return {
    id: `mt-${Date.now()}`,
    name: "",
    examId: "toefl",
    status: "draft",
    sections: [
      { section: "reading", count: 20 },
      { section: "listening", count: 18 },
      { section: "speaking", count: 4 },
      { section: "writing", count: 2 },
    ],
    questionIds: [],
  };
}

export function MockTestBuilder({ initial }: { initial?: MockTestDefinition }) {
  const router = useRouter();
  const { questions, addMockTest, updateMockTest } = useAdminData();
  const [t, setT] = useState<MockTestDefinition>(initial ?? blank());
  const isEdit = !!initial;
  const exam = EXAMS[t.examId];

  function setCount(section: string, count: number) {
    setT((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.section === section ? { ...s, count } : s)),
    }));
  }

  function toggleQuestion(id: string) {
    setT((prev) => ({
      ...prev,
      questionIds: prev.questionIds.includes(id)
        ? prev.questionIds.filter((q) => q !== id)
        : [...prev.questionIds, id],
    }));
  }

  function autoSelect() {
    setT((prev) => ({
      ...prev,
      questionIds: questions
        .filter((q) => q.examId === prev.examId && prev.sections.some((s) => s.section === q.section))
        .map((q) => q.id),
    }));
  }

  function handleSave() {
    if (isEdit) updateMockTest(t.id, t);
    else addMockTest(t);
    router.push("/admin/mock-tests");
  }

  return (
    <div className="max-w-3xl">
      <div className="grid gap-4 rounded-card border border-line bg-white p-5 sm:grid-cols-3">
        <label className="block sm:col-span-2">
          <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Name</span>
          <input
            value={t.name}
            onChange={(e) => setT((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. TOEFL Full Mock #07"
            className="admin-input mt-1"
          />
        </label>
        <label className="block">
          <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Exam</span>
          <select
            value={t.examId}
            onChange={(e) => setT((p) => ({ ...p, examId: e.target.value, questionIds: [] }))}
            className="admin-input mt-1"
          >
            {EXAM_LIST.map((ex) => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
          </select>
        </label>
        <label className="block sm:col-span-3">
          <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Status</span>
          <div className="mt-1.5 flex gap-2">
            {(["draft", "published", "archived"] as MockTestStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setT((p) => ({ ...p, status: s }))}
                className={cn(
                  "rounded-pill border px-4 py-1.5 text-xs font-bold uppercase",
                  t.status === s ? "border-purple-600 bg-purple-600 text-white" : "border-line text-ink-soft"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </label>
      </div>

      <div className="mt-4 rounded-card border border-line bg-white p-5">
        <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Sections</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {exam?.sections.map((section) => {
            const spec = t.sections.find((s) => s.section === section);
            return (
              <div key={section} className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                <span className="text-sm font-semibold capitalize text-ink">
                  {section === "speaking" || section === "writing" ? `${section} (tasks)` : `${section} (questions)`}
                </span>
                <input
                  type="number"
                  min={0}
                  value={spec?.count ?? 0}
                  onChange={(e) => setCount(section, Number(e.target.value))}
                  className="w-16 rounded-lg border border-line px-2 py-1 text-sm"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 rounded-card border border-line bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
            Question Bank Selection ({t.questionIds.length} selected)
          </p>
          <button onClick={autoSelect} className="text-xs font-bold text-purple-600">
            Auto-select from bank
          </button>
        </div>
        <div className="mt-2 max-h-72 space-y-1.5 overflow-y-auto">
          {questions
            .filter((q) => q.examId === t.examId)
            .map((q) => (
              <label key={q.id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-cream-deep">
                <input
                  type="checkbox"
                  checked={t.questionIds.includes(q.id)}
                  onChange={() => toggleQuestion(q.id)}
                  className="accent-purple-600"
                />
                <span className="rounded-pill bg-lavender px-2 py-0.5 text-[10px] font-bold capitalize text-purple-700">
                  {q.section}
                </span>
                <span className="truncate text-sm text-ink">{q.title}</span>
              </label>
            ))}
          {questions.filter((q) => q.examId === t.examId).length === 0 && (
            <p className="px-2 py-3 text-sm text-ink-soft">이 시험의 문제은행 항목이 없습니다.</p>
          )}
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          onClick={handleSave}
          className="rounded-full bg-purple-600 px-6 py-3 text-sm font-bold text-white hover:bg-purple-700"
        >
          {isEdit ? "Save Changes" : "Create Mock Test"}
        </button>
        <p className="flex items-center text-[11px] text-ink-soft">
          Demo Mode — 이 세션에서만 반영되며 저장되지 않습니다.
        </p>
      </div>
    </div>
  );
}
