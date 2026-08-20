import Link from "next/link";
import { MISTAKE_LOG } from "@/lib/data/mistakes";
import { getQuestion } from "@/lib/data/questionBank";
import { EmptyState } from "@/components/EmptyState";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, RotateCcw, X, Sparkles } from "lucide-react";

export const metadata = { title: "My Mistakes | C-BRIDGE Practice" };

export default function MyMistakesPage() {
  const sorted = [...MISTAKE_LOG].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-8">
      <Link href="/practice" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <ArrowLeft size={13} /> Practice
      </Link>
      <span className="kicker mt-5 block">Question Bank</span>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">My Mistakes</h1>
      <p className="mt-2 text-ink-soft">틀린 문제는 자동으로 여기에 기록됩니다.</p>

      {sorted.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={Sparkles}
            title="No Mistakes Logged"
            description="Practice에서 문제를 풀면 틀린 문제가 자동으로 여기에 기록됩니다."
            ctaLabel="Go to Practice"
            ctaHref="/practice"
          />
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {sorted.map((m) => {
            const q = getQuestion(m.questionId);
            if (!q) return null;
            return (
              <div key={m.id} className="rounded-card border border-line bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-ink">{q.title}</p>
                  <span className="text-xs text-ink-soft">{formatDate(m.date)}</span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl bg-weak/5 p-3">
                    <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-label text-weak">
                      <X size={11} /> Your Answer
                    </p>
                    <p className="mt-1 text-sm text-ink">{m.selectedAnswer}</p>
                  </div>
                  <div className="rounded-xl bg-success/5 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-label text-success">
                      Correct Answer
                    </p>
                    <p className="mt-1 text-sm text-ink">{m.correctAnswer}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{q.explanation}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {m.skillTags.map((t) => (
                      <span key={t} className="rounded-pill bg-lavender px-2.5 py-1 text-[10px] font-bold text-purple-700">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/practice/${m.questionId}`}
                    className="flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700"
                  >
                    <RotateCcw size={12} /> RETRY QUESTION
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
