"use client";

import { useState } from "react";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { PlanTemplateWeek } from "@/lib/data/planTemplates";
import { Trash2, Plus } from "lucide-react";

export default function AdminPlanTemplatesPage() {
  const { planTemplates, updatePlanTemplate } = useAdminData();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Daily Plan Templates</h1>
      <p className="text-sm text-ink-soft">
        과정별 기본 커리큘럼입니다. AI Study Plan은 이 템플릿을 기준으로 학생의 약점·점수·D-Day에 맞춰
        개인화합니다. Demo Mode — 저장되지 않습니다.
      </p>

      <div className="mt-4 space-y-4">
        {planTemplates.map((tpl) => (
          <div key={tpl.id} className="rounded-card border border-line bg-white p-5">
            <p className="font-bold text-ink">{tpl.name}</p>
            <div className="mt-3 space-y-2.5">
              {tpl.weeks.map((w) => (
                <WeekRow
                  key={w.week}
                  week={w}
                  onChange={(next) =>
                    updatePlanTemplate(tpl.id, {
                      weeks: tpl.weeks.map((x) => (x.week === w.week ? next : x)),
                    })
                  }
                  onRemove={() =>
                    updatePlanTemplate(tpl.id, { weeks: tpl.weeks.filter((x) => x.week !== w.week) })
                  }
                />
              ))}
            </div>
            <button
              onClick={() => {
                const nextWeek = Math.max(0, ...tpl.weeks.map((w) => w.week)) + 1;
                updatePlanTemplate(tpl.id, { weeks: [...tpl.weeks, { week: nextWeek, focuses: [] }] });
              }}
              className="mt-3 flex items-center gap-1.5 text-xs font-bold text-purple-600"
            >
              <Plus size={13} /> Add Week
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeekRow({
  week,
  onChange,
  onRemove,
}: {
  week: PlanTemplateWeek;
  onChange: (w: PlanTemplateWeek) => void;
  onRemove: () => void;
}) {
  const [draft, setDraft] = useState("");

  return (
    <div className="rounded-xl border border-line p-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-label text-purple-600">Week {week.week}</p>
        <button onClick={onRemove} className="text-weak hover:text-weak/70">
          <Trash2 size={13} />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {week.focuses.map((f, i) => (
          <span key={i} className="flex items-center gap-1 rounded-pill bg-lavender px-2.5 py-1 text-xs font-semibold text-purple-700">
            {f}
            <button
              onClick={() => onChange({ ...week, focuses: week.focuses.filter((_, idx) => idx !== i) })}
              className="text-purple-400 hover:text-purple-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add focus, e.g. Weakness Training"
          className="admin-input"
        />
        <button
          onClick={() => {
            if (!draft.trim()) return;
            onChange({ ...week, focuses: [...week.focuses, draft.trim()] });
            setDraft("");
          }}
          className="shrink-0 rounded-lg bg-purple-600 px-3 py-2 text-xs font-bold text-white hover:bg-purple-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}
