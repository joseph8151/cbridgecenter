import Link from "next/link";
import { DEMO_USER, LATEST_MOCK } from "@/lib/data/user";
import { EXAMS } from "@/lib/data/exams";
import { Check, Target } from "lucide-react";

export default function BaselineTestPage() {
  const exam = EXAMS[DEMO_USER.examId];
  const hasRecentMock = true; // demo user already has C-Bridge mock history

  return (
    <div className="mx-auto max-w-lg px-5 py-16 text-center md:px-8">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lavender text-purple-600">
        <Target size={26} />
      </span>
      <h1 className="mt-6 text-2xl font-extrabold text-ink">
        We need your starting point.
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        AI가 정확한 학습계획을 만들려면 현재 실력 데이터가 필요합니다.
      </p>

      {hasRecentMock ? (
        <div className="mt-8 rounded-card border border-purple-200 bg-lavender p-6 text-left">
          <div className="flex items-center gap-2 text-sm font-bold text-purple-700">
            <Check size={16} /> Recent C-Bridge Mock Found
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            {exam.name} Full Mock · {new Date(LATEST_MOCK.date).toLocaleDateString()}
          </p>
          <p className="mt-1 text-3xl font-extrabold text-purple-600 tabular">
            {LATEST_MOCK.estimatedScore}
          </p>
          <Link
            href="/academy/dashboard"
            className="mt-5 block w-full rounded-full bg-purple-600 px-6 py-3 text-center text-sm font-bold text-white hover:bg-purple-700"
          >
            Use This Score & Continue
          </Link>
        </div>
      ) : (
        <Link
          href={`/test-center/${exam.id}`}
          className="mt-8 inline-flex rounded-full bg-purple-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-purple-700"
        >
          Start Baseline Test
        </Link>
      )}
    </div>
  );
}
