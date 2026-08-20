"use client";

import { useState } from "react";
import { EXAM_LIST, EXAM_EXTRA } from "@/lib/data/exams";
import { cn } from "@/lib/utils";

export default function AdminExamsPage() {
  const [active, setActive] = useState<Record<string, boolean>>(
    Object.fromEntries(EXAM_LIST.map((e) => [e.id, true]))
  );

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Exams</h1>
      <p className="text-sm text-ink-soft">
        시험 활성화 상태는 이 세션에서만 반영됩니다 (Demo Mode).
      </p>

      <div className="mt-4 space-y-3">
        {EXAM_LIST.map((exam) => {
          const extra = EXAM_EXTRA[exam.id];
          const isActive = active[exam.id];
          return (
            <div key={exam.id} className="rounded-card border border-line bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-ink">{exam.name}</p>
                  <p className="text-xs text-ink-soft">{extra?.format}</p>
                </div>
                <button
                  onClick={() => setActive((a) => ({ ...a, [exam.id]: !a[exam.id] }))}
                  className={cn(
                    "rounded-pill px-4 py-1.5 text-xs font-bold uppercase tracking-label",
                    isActive ? "bg-success/10 text-success" : "bg-weak/10 text-weak"
                  )}
                >
                  {isActive ? "Active" : "Disabled"}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Field label="Sections" value={exam.sections.join(", ")} />
                <Field label="Score Scale" value={extra?.scaleLabel ?? `Max ${exam.scoreMax}`} />
                <Field label="Duration" value={extra?.fullDuration ?? "—"} />
                <Field label="Skills" value={extra?.skillsLabel ?? `${exam.sections.length} Sections`} />
              </div>

              {extra && (
                <div className="mt-3">
                  <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                    Question Types
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {extra.questionTypes.map((q) => (
                      <span key={q} className="rounded-pill bg-lavender px-2.5 py-1 text-[11px] font-semibold text-purple-700">
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
