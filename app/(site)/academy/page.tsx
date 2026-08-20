import Link from "next/link";
import {
  COURSES,
  COURSE_BEST_FOR,
  COURSE_COMPARISON,
  COURSE_COMPARISON_ROWS,
} from "@/lib/data/academy";
import { PricingCard } from "@/components/PricingCard";
import { Faq } from "@/components/Faq";
import { ACADEMY_FAQ } from "@/lib/data/faq";
import { DEMO_TESTIMONIALS } from "@/lib/data/testimonials";
import { formatKRW, cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export const metadata = { title: "AI Academy | C-BRIDGE" };

const TONES: Record<string, "cream" | "lavender" | "white"> = {
  "boost-2wk": "cream",
  "target-4wk": "lavender",
  "mastery-12wk": "white",
};

export default function AcademyPage() {
  return (
    <div>
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <span className="kicker">C-Bridge AI Academy</span>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight text-purple-600 sm:text-5xl">
            YOUR TARGET.
            <br />
            YOUR PLAN.
            <br />
            EVERY DAY.
          </h1>
          <p className="mt-4 max-w-xl text-ink-soft">
            목표점수까지, AI가 매일 관리합니다. 시험일과 목표점수에 맞춰 오늘
            해야 할 학습을 AI가 정확히 지정합니다.
          </p>
          <Link
            href="#pricing"
            className="mt-8 inline-flex rounded-full bg-purple-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-purple-700"
          >
            Find My Course
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="text-center">
          <span className="kicker mx-auto w-fit">Choose Your Course</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink">Every Course, AI-Managed</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {COURSES.map((c) => (
            <div key={c.id} className="flex flex-col">
              <PricingCard
                name={c.name}
                description={c.tagline}
                price={formatKRW(c.launchPrice)}
                listPrice={formatKRW(c.listPrice)}
                badge={c.badge}
                features={c.features}
                href={`/academy/checkout/${c.id}`}
                tone={TONES[c.id]}
                ctaLabel="START MY PLAN"
              />
              <p className="mt-3 text-center text-xs text-ink-soft">
                <span className="font-bold text-purple-600">Best for </span>
                {COURSE_BEST_FOR[c.id]}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-card border border-line bg-white text-sm">
            <thead>
              <tr className="bg-cream-deep text-left">
                <th className="px-5 py-3.5 font-bold text-ink">Included</th>
                {COURSES.map((c) => (
                  <th key={c.id} className="px-5 py-3.5 text-center font-bold text-ink">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COURSE_COMPARISON_ROWS.map((row, i) => (
                <tr key={row} className={cn(i % 2 === 1 && "bg-cream/60")}>
                  <td className="px-5 py-3 font-semibold text-ink-soft">{row}</td>
                  {COURSES.map((c) => (
                    <td key={c.id} className="px-5 py-3 text-center font-bold text-ink">
                      {COURSE_COMPARISON[c.id][row]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t border-line bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">Built For Serious Test Takers</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink">
              강의를 늘리는 곳이 아니라, 점수를 관리하는 곳
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {DEMO_TESTIMONIALS.map((t) => (
              <div key={t.id} className="rounded-card border border-line bg-cream-deep p-6">
                <Quote size={18} className="text-purple-300" />
                <p className="mt-3 text-sm leading-relaxed text-ink">{t.quote}</p>
                <p className="mt-4 text-xs font-semibold text-ink-soft">{t.context}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[11px] text-ink-soft">
            Demo Testimonials — 서비스 개발 단계의 예시 콘텐츠입니다.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">FAQ</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink">자주 묻는 질문</h2>
          </div>
          <div className="mt-8">
            <Faq items={ACADEMY_FAQ} />
          </div>
        </div>
      </section>
    </div>
  );
}
