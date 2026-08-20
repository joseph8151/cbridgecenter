"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, Sparkles } from "lucide-react";

const QUESTIONS = [
  {
    q: "She ___ to the office every day by bus.",
    choices: ["go", "goes", "going", "gone"],
    correct: "goes",
  },
  {
    q: "\"I wish I ___ more time to prepare.\"",
    choices: ["have", "had", "has", "will have"],
    correct: "had",
  },
  {
    q: "Choose the word closest in meaning to 'reluctant'.",
    choices: ["eager", "unwilling", "certain", "quick"],
    correct: "unwilling",
  },
];

const LEVELS = [
  { min: 0, label: "Beginner–Intermediate", toefl: "40–60", ielts: "4.0–5.0" },
  { min: 2, label: "Intermediate–Upper", toefl: "60–85", ielts: "5.5–6.5" },
  { min: 3, label: "Upper–Advanced", toefl: "85–110", ielts: "7.0–8.5" },
];

export default function QuickCheckPage() {
  const [step, setStep] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  function answer(choice: string) {
    if (choice === QUESTIONS[step].correct) setCorrectCount((c) => c + 1);
    if (step === QUESTIONS.length - 1) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  const level = [...LEVELS].reverse().find((l) => correctCount >= l.min) ?? LEVELS[0];

  return (
    <div className="mx-auto max-w-lg px-5 py-14 md:px-8">
      <Link href="/try" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <ArrowLeft size={13} /> Try C-Bridge Free
      </Link>

      <span className="kicker mt-5 block">Quick Level Check</span>
      <h1 className="mt-2 text-2xl font-extrabold text-ink">3-Question Level Check</h1>

      {!done ? (
        <div className="mt-8">
          <div className="flex gap-1.5">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-pill",
                  i <= step ? "bg-purple-600" : "bg-purple-100"
                )}
              />
            ))}
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-label text-ink-soft">
            Question {step + 1} / {QUESTIONS.length}
          </p>
          <h2 className="mt-2 text-lg font-bold text-ink">{QUESTIONS[step].q}</h2>
          <div className="mt-5 space-y-2.5">
            {QUESTIONS[step].choices.map((c) => (
              <button
                key={c}
                onClick={() => answer(c)}
                className="w-full rounded-xl border border-line px-4 py-3 text-left text-sm font-semibold text-ink transition-colors hover:border-purple-300 hover:bg-lavender/40"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-card border-2 border-purple-600 bg-white p-7 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-100 text-gold-700">
            <Sparkles size={22} />
          </span>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-label text-purple-500">
            Your Result Is Ready
          </p>
          <p className="mt-2 text-2xl font-extrabold text-ink">{level.label}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-cream-deep p-4">
              <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                Approx. TOEFL
              </p>
              <p className="mt-1 text-lg font-extrabold text-ink">{level.toefl}</p>
            </div>
            <div className="rounded-xl bg-cream-deep p-4">
              <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                Approx. IELTS
              </p>
              <p className="mt-1 text-lg font-extrabold text-ink">{level.ielts}</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-ink-soft">
            3문항 기반의 대략적인 추정치이며, 정확한 예상점수는 Full Mock을
            통해 확인할 수 있습니다.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/test-center"
              className="rounded-full bg-purple-600 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700"
            >
              START A MOCK TEST
            </Link>
            <Link
              href="/academy"
              className="rounded-full border border-line px-5 py-3 text-sm font-bold text-ink hover:border-purple-300"
            >
              Explore AI Academy
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
