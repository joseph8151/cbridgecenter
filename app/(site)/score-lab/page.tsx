import Link from "next/link";
import { QUESTIONS } from "@/lib/data/questions";
import { latestAndBest } from "@/lib/data/user";
import { SCORE_LAB_PRODUCTS } from "@/lib/data/scoreLabProducts";
import { PricingCard } from "@/components/PricingCard";
import { Faq } from "@/components/Faq";
import { SCORE_LAB_FAQ } from "@/lib/data/faq";
import { formatKRW } from "@/lib/utils";
import { Mic, PenLine, ArrowRight } from "lucide-react";

export const metadata = { title: "AI Score Lab | C-BRIDGE" };

export default function ScoreLabPage() {
  const speaking = latestAndBest("speaking");
  const writing = latestAndBest("writing");

  return (
    <div>
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <span className="kicker">C-Bridge AI Score Lab</span>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight text-purple-600 sm:text-5xl">
            YOUR ANSWER.
            <br />
            YOUR SCORE.
            <br />
            YOUR NEXT LEVEL.
          </h1>
          <p className="mt-4 max-w-xl text-ink-soft">
            AI가 답변을 평가하고, 고쳐야 할 부분을 알려주고, 다시 도전하게
            합니다.
          </p>
        </div>
      </section>

      {/* Latest / Best summary */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <SummaryCard
            icon={Mic}
            skill="Speaking"
            latest={speaking.latest?.overallScore}
            best={speaking.best?.overallScore}
            max={speaking.latest?.overallMax ?? 9}
            attempts={speaking.attempts}
          />
          <SummaryCard
            icon={PenLine}
            skill="Writing"
            latest={writing.latest?.overallScore}
            best={writing.best?.overallScore}
            max={writing.latest?.overallMax ?? 9}
            attempts={writing.attempts}
          />
        </div>
      </section>

      {/* Question bank */}
      <section id="speaking" className="border-t border-line bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-xl font-extrabold text-ink">Speaking Questions</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {QUESTIONS.filter((q) => q.skill === "speaking").map((q) => (
              <QuestionRow key={q.id} id={q.id} part={q.part} prompt={q.prompt} skill="speaking" />
            ))}
          </div>

          <h2 id="writing" className="mt-12 text-xl font-extrabold text-ink">
            Writing Questions
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {QUESTIONS.filter((q) => q.skill === "writing").map((q) => (
              <QuestionRow key={q.id} id={q.id} part={q.part} prompt={q.prompt} skill="writing" />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">Score Lab Pricing</span>
            <h2 className="mt-3 text-3xl font-extrabold text-ink">Pick Your Check</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {SCORE_LAB_PRODUCTS.map((p) => (
              <PricingCard
                key={p.id}
                name={p.name}
                description={p.description}
                price={formatKRW(p.price)}
                period={p.period}
                badge={p.badge}
                href={`/score-lab/checkout/${p.id}`}
                tone={p.badge ? "outline" : "white"}
                ctaLabel="Select"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-line bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">FAQ</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink">자주 묻는 질문</h2>
          </div>
          <div className="mt-8">
            <Faq items={SCORE_LAB_FAQ} />
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  skill,
  latest,
  best,
  max,
  attempts,
}: {
  icon: typeof Mic;
  skill: string;
  latest?: number;
  best?: number;
  max: number;
  attempts: number;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lavender text-purple-600">
          <Icon size={16} />
        </span>
        <p className="font-bold text-ink">{skill}</p>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Latest</p>
          <p className="mt-1 text-2xl font-extrabold tabular text-ink">
            {latest ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-label text-gold-600">Best</p>
          <p className="mt-1 text-2xl font-extrabold tabular text-gold-600">{best ?? "—"}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
            Attempts
          </p>
          <p className="mt-1 text-2xl font-extrabold tabular text-ink">{attempts}</p>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-ink-soft">out of {max}</p>
    </div>
  );
}

function QuestionRow({
  id,
  part,
  prompt,
  skill,
}: {
  id: string;
  part: string;
  prompt: string;
  skill: "speaking" | "writing";
}) {
  return (
    <Link
      href={`/score-lab/${skill}/${id}`}
      className="group flex items-start justify-between gap-4 rounded-card border border-line bg-white p-5 transition-colors hover:border-purple-300"
    >
      <div>
        <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">{part}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink">{prompt}</p>
      </div>
      <ArrowRight
        size={16}
        className="mt-1 shrink-0 text-purple-300 transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}
