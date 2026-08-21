import { notFound } from "next/navigation";
import Link from "next/link";
import { EXAMS, EXAM_EXTRA, EXAM_SLUGS } from "@/lib/data/exams";
import { LinkButton } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return Object.keys(EXAM_SLUGS).map((examSlug) => ({ examSlug }));
}

export default async function ExamLandingPage({
  params,
}: {
  params: Promise<{ examSlug: string }>;
}) {
  const { examSlug } = await params;
  const examId = EXAM_SLUGS[examSlug];
  const exam = examId ? EXAMS[examId] : undefined;
  if (!exam) notFound();
  const extra = EXAM_EXTRA[exam.id];

  return (
    <div>
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <span className="kicker">C-Bridge for {exam.name}</span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-purple-600 sm:text-5xl">
            {exam.name} 준비,
            <br />
            AI가 관리합니다.
          </h1>
          <p className="mt-4 max-w-xl text-ink-soft">
            {extra?.format} · {extra?.scaleLabel} · {extra?.skillsLabel}. 모의고사부터
            AI 채점, 목표점수 관리까지 하나의 플랫폼에서.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={`/test-center/${exam.id}`} size="lg">
              START A MOCK TEST
            </LinkButton>
            <LinkButton href="/academy" variant="secondary" size="lg">
              Explore AI Academy
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 md:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Mock Test",
              desc: `실전 환경을 반영한 ${exam.name} Exam-style Mock으로 예상점수를 확인하세요.`,
              href: `/test-center/${exam.id}`,
            },
            {
              title: "Score Lab",
              desc: "Speaking / Writing 답변을 AI가 채점하고 RETRY하게 합니다.",
              href: "/score-lab",
            },
            {
              title: "AI Academy",
              desc: "목표점수와 시험일까지 AI가 매일 학습을 관리합니다.",
              href: "/academy",
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex flex-col justify-between rounded-card border border-line bg-white p-6 hover:border-purple-300"
            >
              <div>
                <p className="font-extrabold text-ink">{c.title}</p>
                <p className="mt-2 text-sm text-ink-soft">{c.desc}</p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-purple-600">
                Learn More
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {extra && (
          <div className="mt-10 rounded-card border border-line bg-cream-deep p-6">
            <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
              What You&apos;ll Practice
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {extra.questionTypes.map((q) => (
                <span
                  key={q}
                  className="rounded-pill border border-purple-200 bg-white px-3 py-1.5 text-xs font-semibold text-purple-700"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
