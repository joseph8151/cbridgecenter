"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { EXAMS } from "@/lib/data/exams";
import { cn } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";

const SECTIONS = ["reading", "listening", "speaking", "writing"];
const DIFFICULTIES = ["easy", "medium", "hard"];
const STATUSES = ["published", "draft"];

export default function AdminQuestionsPage() {
  const { questions, deleteQuestion } = useAdminData();
  const [exam, setExam] = useState("");
  const [section, setSection] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(
    () =>
      questions.filter(
        (q) =>
          (!exam || q.examId === exam) &&
          (!section || q.section === section) &&
          (!difficulty || q.difficulty === difficulty) &&
          (!status || q.status === status)
      ),
    [questions, exam, section, difficulty, status]
  );

  const examIds = [...new Set(questions.map((q) => q.examId))];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Question Bank</h1>
          <p className="text-sm text-ink-soft">{filtered.length} of {questions.length} questions</p>
        </div>
        <Link
          href="/admin/questions/new"
          className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
        >
          <Plus size={15} /> ADD QUESTION
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Select value={exam} onChange={setExam} placeholder="All Exams">
          {examIds.map((id) => (
            <option key={id} value={id}>{EXAMS[id]?.name ?? id}</option>
          ))}
        </Select>
        <Select value={section} onChange={setSection} placeholder="All Sections">
          {SECTIONS.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
        </Select>
        <Select value={difficulty} onChange={setDifficulty} placeholder="All Difficulty">
          {DIFFICULTIES.map((d) => <option key={d} value={d}>{d[0].toUpperCase() + d.slice(1)}</option>)}
        </Select>
        <Select value={status} onChange={setStatus} placeholder="All Status">
          {STATUSES.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
        </Select>
      </div>

      <div className="mt-4 overflow-x-auto rounded-card border border-line bg-white">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-line bg-cream-deep text-left text-[11px] font-bold uppercase tracking-label text-ink-soft">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Exam</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Difficulty</th>
              <th className="px-4 py-3">Skills</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q.id} className="border-b border-line last:border-0 hover:bg-cream-deep/60">
                <td className="max-w-[220px] truncate px-4 py-3 font-semibold text-ink">{q.title}</td>
                <td className="px-4 py-3 text-ink-soft">{EXAMS[q.examId]?.name ?? q.examId}</td>
                <td className="px-4 py-3 capitalize text-ink-soft">{q.section}</td>
                <td className="px-4 py-3 text-ink-soft">{q.questionType}</td>
                <td className="px-4 py-3 capitalize text-ink-soft">{q.difficulty}</td>
                <td className="max-w-[180px] truncate px-4 py-3 text-ink-soft">{q.skillTags.join(", ")}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-pill px-2 py-0.5 text-[10px] font-bold uppercase",
                      q.status === "published" ? "bg-success/10 text-success" : "bg-warn/10 text-warn"
                    )}
                  >
                    {q.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/questions/${q.id}`} className="text-purple-600 hover:text-purple-800">
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => deleteQuestion(q.id)} className="text-weak hover:text-weak/70">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-ink-soft">조건에 맞는 문제가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  placeholder,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:border-purple-400"
    >
      <option value="">{placeholder}</option>
      {children}
    </select>
  );
}
