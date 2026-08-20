import Link from "next/link";
import { WEEKLY_REPORTS } from "@/lib/data/academy";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { WhyThis } from "@/components/WhyThis";
import { TrendingUp, ArrowLeft } from "lucide-react";

export const metadata = { title: "Weekly Report | C-BRIDGE Academy" };

const SECTION_LABELS: Record<string, string> = {
  reading: "Reading",
  listening: "Listening",
  speaking: "Speaking",
  writing: "Writing",
};

export default function WeeklyReportPage() {
  const report = WEEKLY_REPORTS[WEEKLY_REPORTS.length - 1];

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-8">
      <Link href="/academy/dashboard" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <ArrowLeft size={13} /> Dashboard
      </Link>

      <span className="kicker mt-5 block">Week {report.week} Report</span>
      <h1 className="mt-2 text-3xl font-extrabold text-purple-600">WEEK {report.week} COMPLETE</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
            Study Completion
          </p>
          <p className="mt-1 text-3xl font-extrabold tabular text-purple-600">
            {report.studyCompletionPct}%
          </p>
          <ProgressBar value={report.studyCompletionPct} className="mt-3" />
        </div>
        <div className="rounded-card border border-line bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
            Study Time
          </p>
          <p className="mt-1 text-3xl font-extrabold tabular text-ink">{report.studyTime}</p>
        </div>
      </div>

      <div className="mt-6 rounded-card border border-line bg-white p-5">
        <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
          Section Deltas
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(report.deltas).map(([section, delta]) => (
            <div key={section} className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-success" />
              <span className="text-sm text-ink-soft">{SECTION_LABELS[section]}</span>
              <span className="font-bold text-success">+{delta}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-gold-300 bg-gold-50 p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-gold-700">
            Biggest Improvement
          </p>
          <p className="mt-1 text-lg font-extrabold text-ink">{report.biggestImprovement}</p>
        </div>
        <div className="rounded-card border border-purple-200 bg-lavender p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-purple-600">
            Next Week Focus
          </p>
          <p className="mt-1 text-lg font-extrabold text-ink">{report.nextFocus}</p>
        </div>
      </div>

      <div className="mt-6 rounded-card border border-line bg-white p-5">
        <WhyThis>{report.aiComment}</WhyThis>
      </div>

      <Link
        href="/academy/dashboard"
        className="mt-8 block w-full rounded-full bg-purple-600 px-6 py-3.5 text-center text-sm font-bold text-white hover:bg-purple-700"
      >
        CONTINUE TRAINING
      </Link>
    </div>
  );
}
