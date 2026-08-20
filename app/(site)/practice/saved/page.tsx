import Link from "next/link";
import { bookmarkedQuestions } from "@/lib/data/mistakes";
import { EXAMS } from "@/lib/data/exams";
import { EmptyState } from "@/components/EmptyState";
import { ArrowLeft, BookMarked } from "lucide-react";

export const metadata = { title: "Saved Questions | C-BRIDGE Practice" };

export default function SavedQuestionsPage() {
  const saved = bookmarkedQuestions();

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-8">
      <Link href="/practice" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <ArrowLeft size={13} /> Practice
      </Link>
      <span className="kicker mt-5 block">Question Bank</span>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Saved Questions</h1>
      <p className="mt-2 text-ink-soft">나중에 다시 풀어볼 어려운 문제를 저장해두었습니다.</p>

      {saved.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={BookMarked}
            title="No Saved Questions"
            description="Practice에서 문제 옆의 Save 버튼을 눌러 어려운 문제를 저장해보세요."
            ctaLabel="Go to Practice"
            ctaHref="/practice"
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {saved.map((q) => (
            <Link
              key={q.id}
              href={q.section === "speaking" || q.section === "writing" ? `/score-lab/${q.section}/${q.id}` : `/practice/${q.id}`}
              className="rounded-card border border-line bg-white p-4 transition-colors hover:border-purple-300"
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-pill bg-lavender px-2 py-0.5 text-[10px] font-bold text-purple-700">
                  {EXAMS[q.examId]?.name ?? q.examId}
                </span>
                <span className="rounded-pill bg-cream-deep px-2 py-0.5 text-[10px] font-bold uppercase text-ink-soft">
                  {q.difficulty}
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-ink">{q.title}</p>
              <p className="mt-1 text-[11px] text-ink-soft">{q.skillTags.join(" · ")}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
