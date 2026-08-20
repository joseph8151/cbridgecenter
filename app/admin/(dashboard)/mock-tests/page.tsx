"use client";

import Link from "next/link";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { EXAMS } from "@/lib/data/exams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const STATUS_TONE: Record<string, string> = {
  draft: "bg-warn/10 text-warn",
  published: "bg-success/10 text-success",
  archived: "bg-cream-deep text-ink-soft",
};

export default function AdminMockTestsPage() {
  const { mockTests } = useAdminData();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Mock Test Builder</h1>
          <p className="text-sm text-ink-soft">{mockTests.length} mock tests</p>
        </div>
        <Link
          href="/admin/mock-tests/new"
          className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
        >
          <Plus size={15} /> CREATE MOCK TEST
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {mockTests.map((t) => {
          const totalQuestions = t.sections.reduce((sum, s) => sum + s.count, 0);
          return (
            <Link
              key={t.id}
              href={`/admin/mock-tests/${t.id}`}
              className="block rounded-card border border-line bg-white p-5 hover:border-purple-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-soft">{EXAMS[t.examId]?.name ?? t.examId}</p>
                </div>
                <span className={cn("rounded-pill px-3 py-1 text-[10px] font-bold uppercase", STATUS_TONE[t.status])}>
                  {t.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.sections.map((s) => (
                  <span key={s.section} className="rounded-pill bg-lavender px-2.5 py-1 text-[11px] font-semibold capitalize text-purple-700">
                    {s.section} · {s.count}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-ink-soft">{totalQuestions} total items · {t.questionIds.length} linked from bank</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
