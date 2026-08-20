import Link from "next/link";
import { EXAM_LIST } from "@/lib/data/exams";
import { EXAM_EXTRA } from "@/lib/data/exams";

export const metadata = { title: "Exam Guides | C-BRIDGE" };

export default function ExamGuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:px-8">
      <span className="kicker">Resources</span>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">Exam Guides</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        각 시험의 구성과 채점 방식을 간단히 확인하고, 알맞은 모의고사로
        바로 이동하세요.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {EXAM_LIST.map((exam) => {
          const extra = EXAM_EXTRA[exam.id];
          return (
            <Link
              key={exam.id}
              href={`/test-center/${exam.id}`}
              className="rounded-card border border-line bg-white p-5 transition-colors hover:border-purple-300"
            >
              <p className="font-bold text-ink">{exam.name}</p>
              <p className="mt-1 text-xs text-ink-soft">{extra?.format}</p>
              <p className="mt-2 text-sm text-ink-soft">
                {extra?.scaleLabel} · {extra?.skillsLabel}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
