import Link from "next/link";
import { ExamDefinition } from "@/lib/types";
import { EXAM_EXTRA } from "@/lib/data/exams";
import { ArrowRight } from "lucide-react";

export function ExamCard({ exam }: { exam: ExamDefinition }) {
  const extra = EXAM_EXTRA[exam.id];
  return (
    <Link
      href={`/test-center/${exam.id}`}
      className="group flex flex-col justify-between rounded-card border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-card"
    >
      <div>
        <p className="text-[11px] font-bold uppercase tracking-label text-gold-600">
          Exam-style Mock
        </p>
        <h3 className="mt-2 text-lg font-extrabold text-ink">{exam.name}</h3>
        {extra && <p className="mt-1 text-xs text-ink-soft">{extra.format}</p>}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-pill bg-lavender px-2.5 py-1 text-[11px] font-bold text-purple-700">
            {extra?.skillsLabel ?? `${exam.sections.length} Sections`}
          </span>
          <span className="rounded-pill bg-cream-deep px-2.5 py-1 text-[11px] font-bold text-ink-soft">
            {extra?.scaleLabel ?? `Max ${exam.scoreMax}`}
          </span>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-purple-600">
        Start {exam.name}
        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
