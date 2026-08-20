"use client";

import { useState } from "react";
import {
  ANNOUNCEMENTS,
  Announcement,
  CONTENT_FAQ,
  ContentFaqItem,
  EXAM_GUIDES,
  PROMO_BANNER,
  CONTENT_TESTIMONIALS,
  TestimonialItem,
} from "@/lib/data/content";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

const TABS = ["Announcement", "FAQ", "Exam Guide", "Promotion Banner", "Testimonials"] as const;
type Tab = (typeof TABS)[number];

export default function AdminContentPage() {
  const [tab, setTab] = useState<Tab>("Announcement");

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Content</h1>
      <p className="text-sm text-ink-soft">Demo Mode — 변경 사항은 저장되지 않습니다.</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-pill border px-4 py-1.5 text-sm font-semibold",
              tab === t ? "border-purple-600 bg-purple-600 text-white" : "border-line text-ink-soft"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === "Announcement" && <AnnouncementTab />}
        {tab === "FAQ" && <FaqTab />}
        {tab === "Exam Guide" && <ExamGuideTab />}
        {tab === "Promotion Banner" && <PromoBannerTab />}
        {tab === "Testimonials" && <TestimonialsTab />}
      </div>
    </div>
  );
}

function AnnouncementTab() {
  const [items, setItems] = useState<Announcement[]>(ANNOUNCEMENTS);
  return (
    <div className="space-y-2.5">
      {items.map((a) => (
        <div key={a.id} className="flex items-center gap-3 rounded-card border border-line bg-white p-4">
          <input
            value={a.text}
            onChange={(e) =>
              setItems((xs) => xs.map((x) => (x.id === a.id ? { ...x, text: e.target.value } : x)))
            }
            className="admin-input flex-1"
          />
          <button
            onClick={() =>
              setItems((xs) => xs.map((x) => (x.id === a.id ? { ...x, active: !x.active } : x)))
            }
            className={cn(
              "shrink-0 rounded-pill px-3 py-1.5 text-xs font-bold uppercase",
              a.active ? "bg-success/10 text-success" : "bg-cream-deep text-ink-soft"
            )}
          >
            {a.active ? "Live" : "Hidden"}
          </button>
        </div>
      ))}
    </div>
  );
}

function FaqTab() {
  const [items, setItems] = useState<ContentFaqItem[]>(CONTENT_FAQ);
  return (
    <div className="space-y-2.5">
      {items.map((f) => (
        <div key={f.id} className="rounded-card border border-line bg-white p-4">
          <span className="rounded-pill bg-lavender px-2 py-0.5 text-[10px] font-bold uppercase text-purple-700">
            {f.section}
          </span>
          <input
            value={f.q}
            onChange={(e) => setItems((xs) => xs.map((x) => (x.id === f.id ? { ...x, q: e.target.value } : x)))}
            className="admin-input mt-2 font-semibold"
          />
          <textarea
            value={f.a}
            onChange={(e) => setItems((xs) => xs.map((x) => (x.id === f.id ? { ...x, a: e.target.value } : x)))}
            className="admin-input mt-2 h-16"
          />
        </div>
      ))}
    </div>
  );
}

function ExamGuideTab() {
  const [items, setItems] = useState(EXAM_GUIDES);
  return (
    <div className="space-y-2.5">
      {items.map((g) => (
        <div key={g.examId} className="rounded-card border border-line bg-white p-4">
          <input
            value={g.title}
            onChange={(e) =>
              setItems((xs) => xs.map((x) => (x.examId === g.examId ? { ...x, title: e.target.value } : x)))
            }
            className="admin-input font-semibold"
          />
          <textarea
            value={g.body}
            onChange={(e) =>
              setItems((xs) => xs.map((x) => (x.examId === g.examId ? { ...x, body: e.target.value } : x)))
            }
            className="admin-input mt-2 h-16"
          />
        </div>
      ))}
    </div>
  );
}

function PromoBannerTab() {
  const [banner, setBanner] = useState(PROMO_BANNER);
  return (
    <div className="max-w-xl rounded-card border border-line bg-white p-5">
      <label className="flex items-center gap-2 text-sm font-semibold text-ink">
        <input
          type="checkbox"
          checked={banner.enabled}
          onChange={(e) => setBanner((b) => ({ ...b, enabled: e.target.checked }))}
          className="accent-purple-600"
        />
        Banner Enabled
      </label>
      <label className="mt-3 block">
        <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Text</span>
        <input
          value={banner.text}
          onChange={(e) => setBanner((b) => ({ ...b, text: e.target.value }))}
          className="admin-input mt-1"
        />
      </label>
      <label className="mt-3 block">
        <span className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Link</span>
        <input
          value={banner.href}
          onChange={(e) => setBanner((b) => ({ ...b, href: e.target.value }))}
          className="admin-input mt-1"
        />
      </label>
      {banner.enabled && (
        <div className="mt-4 rounded-lg bg-purple-600 px-4 py-2.5 text-center text-sm font-semibold text-white">
          {banner.text}
        </div>
      )}
    </div>
  );
}

function TestimonialsTab() {
  const [items, setItems] = useState<TestimonialItem[]>(CONTENT_TESTIMONIALS);
  return (
    <div className="space-y-2.5">
      {items.map((t) => (
        <div key={t.id} className="rounded-card border border-line bg-white p-4">
          <textarea
            value={t.quote}
            onChange={(e) => setItems((xs) => xs.map((x) => (x.id === t.id ? { ...x, quote: e.target.value } : x)))}
            className="admin-input h-16"
          />
          <div className="mt-2 flex items-center gap-2">
            <input
              value={t.context}
              onChange={(e) =>
                setItems((xs) => xs.map((x) => (x.id === t.id ? { ...x, context: e.target.value } : x)))
              }
              className="admin-input flex-1"
            />
            <button
              onClick={() =>
                setItems((xs) => xs.map((x) => (x.id === t.id ? { ...x, visible: !x.visible } : x)))
              }
              className={cn(
                "shrink-0 rounded-pill px-3 py-1.5 text-xs font-bold uppercase",
                t.visible ? "bg-success/10 text-success" : "bg-cream-deep text-ink-soft"
              )}
            >
              {t.visible ? "Visible" : "Hidden"}
            </button>
            <button
              onClick={() => setItems((xs) => xs.filter((x) => x.id !== t.id))}
              className="shrink-0 text-weak hover:text-weak/70"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
