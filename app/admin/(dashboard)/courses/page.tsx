"use client";

import { useState } from "react";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { formatKRW } from "@/lib/utils";
import { Trash2, Plus } from "lucide-react";

export default function AdminCoursesPage() {
  const { courses, updateCourse } = useAdminData();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Academy Courses</h1>
      <p className="text-sm text-ink-soft">
        Duration, 가격, 포함 기능(Mock 횟수 / Score Lab 사용량 / Daily Study / Practice Access / Coach
        Level)을 편집할 수 있습니다. Demo Mode — 저장되지 않습니다.
      </p>

      <div className="mt-4 space-y-4">
        {courses.map((c) => (
          <div key={c.id} className="rounded-card border border-line bg-white p-5">
            <div className="grid gap-4 sm:grid-cols-4">
              <label className="block sm:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Name</span>
                <input
                  value={c.name}
                  onChange={(e) => updateCourse(c.id, { name: e.target.value })}
                  className="admin-input mt-1"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Duration (weeks)</span>
                <input
                  type="number"
                  value={c.lengthWeeks}
                  onChange={(e) => updateCourse(c.id, { lengthWeeks: Number(e.target.value) })}
                  className="admin-input mt-1"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Badge</span>
                <input
                  value={c.badge ?? ""}
                  onChange={(e) => updateCourse(c.id, { badge: e.target.value || undefined })}
                  placeholder="e.g. MOST POPULAR"
                  className="admin-input mt-1"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">List Price (₩)</span>
                <input
                  type="number"
                  value={c.listPrice}
                  onChange={(e) => updateCourse(c.id, { listPrice: Number(e.target.value) })}
                  className="admin-input mt-1"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Launch Price (₩)</span>
                <input
                  type="number"
                  value={c.launchPrice}
                  onChange={(e) => updateCourse(c.id, { launchPrice: Number(e.target.value) })}
                  className="admin-input mt-1"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Tagline</span>
                <input
                  value={c.tagline}
                  onChange={(e) => updateCourse(c.id, { tagline: e.target.value })}
                  className="admin-input mt-1"
                />
              </label>
            </div>

            <FeatureList
              features={c.features}
              onChange={(features) => updateCourse(c.id, { features })}
            />

            <p className="mt-3 text-xs text-ink-soft">
              Preview: <span className="font-bold text-purple-600">{formatKRW(c.launchPrice)}</span>
              <span className="line-through"> {formatKRW(c.listPrice)}</span> · {c.lengthWeeks} weeks
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureList({
  features,
  onChange,
}: {
  features: string[];
  onChange: (f: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  return (
    <div className="mt-4">
      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
        Included (Mock Tests / Score Lab / Daily Study / Practice Access / Coach Level)
      </p>
      <div className="mt-2 space-y-1.5">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={f}
              onChange={(e) => {
                const next = [...features];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="admin-input"
            />
            <button
              onClick={() => onChange(features.filter((_, idx) => idx !== i))}
              className="shrink-0 text-weak hover:text-weak/70"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a feature line..."
          className="admin-input"
        />
        <button
          onClick={() => {
            if (!draft.trim()) return;
            onChange([...features, draft.trim()]);
            setDraft("");
          }}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-lavender px-3 py-2 text-xs font-bold text-purple-700"
        >
          <Plus size={13} /> Add
        </button>
      </div>
    </div>
  );
}
