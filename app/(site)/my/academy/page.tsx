import Link from "next/link";
import { DEMO_USER } from "@/lib/data/user";
import { daysUntil, formatDate } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "My Academy | C-BRIDGE" };

export default function MyAcademyPage() {
  const dDay = daysUntil(DEMO_USER.examDate);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Academy</h1>
      <p className="text-sm text-ink-soft">현재 수강 중인 과정입니다.</p>

      <div className="mt-6 rounded-card border-2 border-purple-600 bg-white p-6">
        <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
          Current Course
        </p>
        <h2 className="mt-1 text-xl font-extrabold text-ink">{DEMO_USER.course}</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Exam Day {formatDate(DEMO_USER.examDate)} · D-{dDay}
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold text-ink-soft">
            <span>Course Progress</span>
            <span className="tabular text-ink">{DEMO_USER.courseProgressPct}%</span>
          </div>
          <ProgressBar value={DEMO_USER.courseProgressPct} className="mt-2" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Dashboard", href: "/academy/dashboard" },
            { label: "Weekly Report", href: "/academy/weekly-report" },
            { label: "Course Summary", href: "/academy/complete" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink hover:border-purple-300"
            >
              {l.label}
              <ArrowRight size={14} className="text-purple-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
