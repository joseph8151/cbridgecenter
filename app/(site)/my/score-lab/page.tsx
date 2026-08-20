import Link from "next/link";
import { SPEAKING_HISTORY, WRITING_HISTORY, latestAndBest } from "@/lib/data/user";
import { questionById } from "@/lib/data/questions";
import { formatDate } from "@/lib/utils";
import { ScoreLabAttempt } from "@/lib/types";
import { GraduationCap } from "lucide-react";

export const metadata = { title: "My Score Lab | C-BRIDGE" };

export default function MyScoreLabPage() {
  const speaking = latestAndBest("speaking");
  const writing = latestAndBest("writing");

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Score Lab History</h1>
      <p className="text-sm text-ink-soft">Speaking / Writing AI 채점 기록입니다.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">Speaking</p>
          <div className="mt-2 flex gap-6">
            <MiniStat label="Latest" value={speaking.latest?.overallScore} />
            <MiniStat label="Best" value={speaking.best?.overallScore} gold />
            <MiniStat label="Attempts" value={speaking.attempts} />
          </div>
        </div>
        <div className="rounded-card border border-line bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">Writing</p>
          <div className="mt-2 flex gap-6">
            <MiniStat label="Latest" value={writing.latest?.overallScore} />
            <MiniStat label="Best" value={writing.best?.overallScore} gold />
            <MiniStat label="Attempts" value={writing.attempts} />
          </div>
        </div>
      </div>

      <AttemptList title="Speaking Attempts" attempts={SPEAKING_HISTORY} skill="speaking" />
      <AttemptList title="Writing Attempts" attempts={WRITING_HISTORY} skill="writing" />
    </div>
  );
}

function MiniStat({ label, value, gold }: { label: string; value?: number; gold?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">{label}</p>
      <p className={`text-xl font-extrabold tabular ${gold ? "text-gold-600" : "text-ink"}`}>
        {value ?? "—"}
      </p>
    </div>
  );
}

function AttemptList({
  title,
  attempts,
  skill,
}: {
  title: string;
  attempts: ScoreLabAttempt[];
  skill: "speaking" | "writing";
}) {
  const sorted = [...attempts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <div className="mt-8">
      <h2 className="text-lg font-extrabold text-ink">{title}</h2>
      <div className="mt-3 space-y-2.5">
        {sorted.map((a) => {
          const q = questionById(a.questionId);
          return (
            <Link
              key={a.id}
              href={`/score-lab/${skill}/${a.questionId}`}
              className="flex items-center justify-between gap-4 rounded-card border border-line bg-white p-4 transition-colors hover:border-purple-300"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink">{q?.part}</p>
                <p className="text-xs text-ink-soft">
                  Attempt {a.attemptNumber} · {formatDate(a.date)}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {a.fromAcademy && (
                  <span className="hidden items-center gap-1 rounded-pill bg-gold-100 px-2.5 py-1 text-[10px] font-bold text-gold-700 sm:flex">
                    <GraduationCap size={11} /> Academy
                  </span>
                )}
                <p className="text-lg font-extrabold tabular text-purple-600">
                  {a.overallScore}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
