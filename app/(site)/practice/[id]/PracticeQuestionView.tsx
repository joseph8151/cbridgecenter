"use client";

import { useState } from "react";
import Link from "next/link";
import { BankQuestion } from "@/lib/types";
import { isBookmarked as seedBookmarked } from "@/lib/data/mistakes";
import { recommendForSkill } from "@/services/recommendation/questionRecommender";
import { cn } from "@/lib/utils";
import { ArrowLeft, BookMarked, Check, X, RotateCcw, Play } from "lucide-react";

const SKILL_INSIGHT: Record<string, string> = {
  Inference:
    "Inference 문제에서는 정답이 Passage에 그대로 적혀 있지 않습니다. 직접적인 표현을 정답으로 고르기보다, 문맥이 암시하는 내용을 찾아야 합니다.",
  Detail:
    "Detail 문제는 Passage에 명시된 문장을 그대로 찾는 문제입니다. 비슷해 보이지만 다른 정보를 담은 선택지에 주의하세요.",
  "Main Idea":
    "Main Idea 문제는 세부 내용이 아니라 전체를 아우르는 문장을 골라야 합니다. 부분적으로만 맞는 선택지를 피하세요.",
  Vocabulary:
    "Vocabulary 문제는 사전적 의미가 아니라 문맥 속 의미를 물어봅니다. 앞뒤 문장을 함께 확인하세요.",
  "Author Purpose":
    "Author Purpose 문제는 '무엇을 말했는가'가 아니라 '왜 그 문장을 썼는가'를 묻습니다.",
  Organization:
    "Organization 문제는 문단/문장 간의 관계(대조, 예시, 인과 등)를 정확히 파악해야 합니다.",
  "Note-taking":
    "Note-taking 문제는 숫자, 날짜, 고유명사처럼 놓치기 쉬운 세부 정보에 집중해야 합니다.",
};

export function PracticeQuestionView({ question: q }: { question: BankQuestion }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(seedBookmarked(q.id));

  const revealed = selected !== null;
  const correct = selected === q.correctAnswer;
  const primaryTag = q.skillTags[0];
  const relatedQuestions = primaryTag
    ? recommendForSkill(primaryTag, 4).filter((r) => r.id !== q.id).slice(0, 3)
    : [];

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 md:px-8">
      <div className="flex items-center justify-between">
        <Link href="/practice" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
          <ArrowLeft size={13} /> Practice
        </Link>
        <button
          onClick={() => setBookmarked((b) => !b)}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold",
            bookmarked ? "bg-gold-100 text-gold-700" : "border border-line text-ink-soft"
          )}
        >
          <BookMarked size={13} />
          {bookmarked ? "Saved" : "Save"}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        <span className="rounded-pill bg-lavender px-2.5 py-1 text-[10px] font-bold uppercase text-purple-700">
          {q.section}
        </span>
        <span className="rounded-pill bg-cream-deep px-2.5 py-1 text-[10px] font-bold uppercase text-ink-soft">
          {q.difficulty}
        </span>
        {q.skillTags.map((t) => (
          <span key={t} className="rounded-pill border border-line px-2.5 py-1 text-[10px] font-semibold text-ink-soft">
            {t}
          </span>
        ))}
      </div>

      <h1 className="mt-3 text-lg font-bold text-ink">{q.title}</h1>

      {q.section === "reading" && q.passage && (
        <div className="mt-5 rounded-card border border-line bg-cream-deep p-5">
          <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">Passage</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{q.passage}</p>
        </div>
      )}

      {q.section === "listening" && (
        <div className="mt-5 rounded-card border border-line bg-cream-deep p-5">
          <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">Audio</p>
          <p className="mt-1 font-bold text-ink">{q.audioTitle}</p>
          <button className="mt-3 flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700">
            <Play size={14} /> Play Audio
          </button>
        </div>
      )}

      <p className="mt-5 font-semibold text-ink">{q.prompt}</p>

      <div className="mt-4 space-y-2.5">
        {(q.choices ?? []).map((c, i) => {
          const isCorrectChoice = c === q.correctAnswer;
          const isSelected = c === selected;
          return (
            <button
              key={c}
              onClick={() => setSelected(c)}
              disabled={revealed}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                !revealed && "hover:border-purple-300",
                revealed && isCorrectChoice && "border-success bg-success/10",
                revealed && isSelected && !isCorrectChoice && "border-weak bg-weak/10",
                !revealed && "border-line text-ink",
                revealed && !isCorrectChoice && !isSelected && "border-line text-ink-soft"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold",
                  revealed && isCorrectChoice
                    ? "border-success bg-success text-white"
                    : revealed && isSelected
                    ? "border-weak bg-weak text-white"
                    : "border-line"
                )}
              >
                {revealed && isCorrectChoice ? <Check size={12} /> : revealed && isSelected ? <X size={12} /> : String.fromCharCode(65 + i)}
              </span>
              {c}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-6 space-y-4">
          <div
            className={cn(
              "rounded-card border p-5",
              correct ? "border-success/30 bg-success/5" : "border-weak/30 bg-weak/5"
            )}
          >
            <p className={cn("text-[11px] font-bold uppercase tracking-label", correct ? "text-success" : "text-weak")}>
              {correct ? "Correct" : "Why You Missed This"}
            </p>
            {!correct && primaryTag && SKILL_INSIGHT[primaryTag] && (
              <p className="mt-2 text-sm text-ink">{SKILL_INSIGHT[primaryTag]}</p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{q.explanation}</p>
          </div>

          {!correct && relatedQuestions.length > 0 && (
            <div className="rounded-card border border-purple-200 bg-lavender p-5">
              <p className="text-[11px] font-bold uppercase tracking-label text-purple-600">
                Practice This Skill
              </p>
              <p className="mt-1 font-bold text-ink">{primaryTag} Drill</p>
              <p className="text-sm text-ink-soft">{relatedQuestions.length} Questions</p>
              <Link
                href={`/practice/${relatedQuestions[0].id}`}
                className="mt-4 inline-flex rounded-full bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
              >
                START PRACTICE
              </Link>
            </div>
          )}

          <button
            onClick={() => setSelected(null)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-bold text-ink hover:border-purple-300"
          >
            <RotateCcw size={14} /> RETRY QUESTION
          </button>
        </div>
      )}
    </div>
  );
}
