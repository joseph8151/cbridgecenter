import { notFound } from "next/navigation";
import Link from "next/link";
import { EXAMS, EXAM_EXTRA, mockProductsForExam, MOCK_PACKS } from "@/lib/data/exams";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { formatKRW } from "@/lib/utils";
import { Check } from "lucide-react";

export function generateStaticParams() {
  return Object.keys(EXAMS).map((examId) => ({ examId }));
}

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const exam = EXAMS[examId];
  if (!exam) notFound();
  const products = mockProductsForExam(exam.id);
  const extra = EXAM_EXTRA[exam.id];

  return (
    <div>
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Link href="/test-center" className="text-xs font-semibold text-purple-600">
            ← Test Center
          </Link>
          <span className="kicker mt-4 block">Exam-style Mock Test</span>
          <h1 className="mt-3 text-4xl font-extrabold text-purple-600">{exam.name}</h1>
          <p className="mt-3 max-w-xl text-ink-soft">
            {exam.fullName}. C-Bridge가 자체 제작한 Realistic Test Environment로,
            실제 시험기관의 공식 콘텐츠가 아닙니다.
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-soft">
            {extra?.scaleLabel ?? `Max ${exam.scoreMax} ${exam.scoreLabel}`} · {extra?.skillsLabel ?? `${exam.sections.length} Sections`}
          </p>

          {extra && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Format", value: extra.format },
                { label: "Scale", value: extra.scaleLabel },
                { label: "Skills", value: extra.skillsLabel },
                { label: "Full Test Time", value: extra.fullDuration },
              ].map((s) => (
                <div key={s.label} className="rounded-card border border-line bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-ink">{s.value}</p>
                </div>
              ))}
            </div>
          )}

          {extra && (
            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
                Question Styles You&apos;ll Practice
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {extra.questionTypes.map((q) => (
                  <span
                    key={q}
                    className="rounded-pill border border-purple-200 bg-lavender px-3 py-1.5 text-xs font-semibold text-purple-700"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <h2 className="text-xl font-extrabold text-ink">Choose Your Mock Test</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-card border p-6 ${
                p.badge ? "border-2 border-purple-600 bg-white shadow-card" : "border-line bg-white"
              }`}
            >
              {p.badge && (
                <Badge tone="gold" className="absolute -top-3 left-6">
                  {p.badge}
                </Badge>
              )}
              <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
                {p.type}
              </p>
              <h3 className="mt-2 text-lg font-extrabold text-ink">{p.name}</h3>
              <p className="text-sm text-ink-soft">{p.description}</p>
              <p className="mt-4 text-3xl font-extrabold text-purple-600">
                {formatKRW(p.price)}
              </p>
              <p className="text-xs text-ink-soft">{p.duration}</p>
              {p.features && (
                <ul className="mt-4 flex-1 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink">
                      <Check size={15} className="mt-0.5 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <LinkButton
                href={`/test-center/checkout/${p.id}`}
                className="mt-6 w-full"
                variant={p.badge ? "primary" : "outline"}
              >
                Select {p.name}
              </LinkButton>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-card border border-line bg-cream-deep p-6">
          <p className="text-sm font-bold text-ink">Save with a Pack</p>
          {MOCK_PACKS.map((pack) => (
            <span
              key={pack.id}
              className="flex items-center gap-2 rounded-pill bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft"
            >
              {pack.label}
              <Badge tone="gold">{pack.discount}</Badge>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
