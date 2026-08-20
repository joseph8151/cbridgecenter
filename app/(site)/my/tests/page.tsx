import Link from "next/link";
import { MOCK_HISTORY } from "@/lib/data/user";
import { EXAMS } from "@/lib/data/exams";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "My Tests | C-BRIDGE" };

export default function MyTestsPage() {
  const sorted = [...MOCK_HISTORY].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">My Tests</h1>
      <p className="text-sm text-ink-soft">모의고사 응시 기록입니다.</p>

      <div className="mt-6 space-y-3">
        {sorted.map((m) => {
          const exam = EXAMS[m.examId];
          return (
            <Link
              key={m.id}
              href={`/test-center/result/${m.examId}`}
              className="flex items-center justify-between gap-4 rounded-card border border-line bg-white p-5 transition-colors hover:border-purple-300"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
                  {m.type} Mock
                </p>
                <p className="mt-1 font-bold text-ink">{exam.name}</p>
                <p className="text-xs text-ink-soft">{formatDate(m.date)}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-extrabold tabular text-purple-600">
                  {m.estimatedScore}
                  <span className="text-sm text-ink-soft"> / {m.scoreMax}</span>
                </p>
                <ArrowRight size={16} className="text-purple-300" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
