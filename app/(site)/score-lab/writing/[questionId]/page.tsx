"use client";

import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { questionById } from "@/lib/data/questions";
import { attemptsForQuestion } from "@/lib/data/user";
import { scoreAttempt } from "@/services/scoring/aiScoring";
import { ScoreLabAttempt } from "@/lib/types";
import { FeedbackCard } from "@/components/FeedbackCard";
import { RetryComparison } from "@/components/RetryComparison";
import { ScoreDisclaimer } from "@/components/ScoreDisclaimer";
import { AiFallback } from "@/components/AiFallback";
import { GraduationCap, ArrowLeft, Loader2, PenLine } from "lucide-react";

type Phase = "intro" | "writing" | "scoring" | "result" | "error";

export default function WritingCheckPage() {
  const params = useParams<{ questionId: string }>();
  const search = useSearchParams();
  const fromAcademy = search.get("fromAcademy") === "1";
  const simulateError = search.get("simulateError") === "1";
  const question = questionById(params.questionId);
  const history = question ? attemptsForQuestion(question.id, "writing") : [];

  const [phase, setPhase] = useState<Phase>("intro");
  const [text, setText] = useState("");
  const [sessionAttempts, setSessionAttempts] = useState<ScoreLabAttempt[]>([]);

  const allAttempts = [...history, ...sessionAttempts];
  const currentAttemptNumber = allAttempts.length + 1;
  const latestResult = sessionAttempts[sessionAttempts.length - 1];
  const previousForCompare = allAttempts[allAttempts.length - 2];

  const wordCount = useMemo(
    () => (text.trim().length ? text.trim().split(/\s+/).length : 0),
    [text]
  );

  async function submitAnswer() {
    if (!question) return;
    setPhase("scoring");
    try {
      if (simulateError) throw new Error("Simulated AI scoring failure");
      const prev = allAttempts[allAttempts.length - 1];
      const result = await scoreAttempt({
        questionId: question.id,
        examId: question.examId,
        skill: "writing",
        attemptNumber: currentAttemptNumber,
        previousScore: prev?.overallScore,
        payload: text,
      });
      setSessionAttempts((s) => [...s, result]);
      setPhase("result");
    } catch {
      setPhase("error");
    }
  }

  if (!question) return null;

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 md:px-8">
      <Link href="/score-lab" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <ArrowLeft size={13} /> Score Lab
      </Link>

      {fromAcademy && (
        <div className="mt-4 flex items-center gap-2 rounded-full bg-gold-100 px-4 py-2 text-xs font-bold uppercase tracking-label text-gold-700 w-fit">
          <GraduationCap size={14} /> Academy Daily Mission
        </div>
      )}

      <p className="mt-5 text-[11px] font-bold uppercase tracking-label text-purple-500">
        {question.part}
      </p>
      <h1 className="mt-2 text-xl font-bold text-ink">{question.prompt}</h1>

      {phase === "intro" && (
        <div className="mt-10 rounded-card border border-line bg-cream-deep p-8 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lavender text-purple-600">
            <PenLine size={26} />
          </span>
          <p className="mt-4 text-sm text-ink-soft">
            Suggested length {question.wordLimit} words
          </p>
          <button
            onClick={() => setPhase("writing")}
            className="mt-6 rounded-full bg-purple-600 px-7 py-3 text-sm font-bold text-white hover:bg-purple-700"
          >
            Start Attempt {currentAttemptNumber}
          </button>
        </div>
      )}

      {phase === "writing" && (
        <div className="mt-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing your response here..."
            className="h-72 w-full resize-none rounded-card border border-line p-5 text-sm leading-relaxed text-ink outline-none focus:border-purple-400"
          />
          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-ink-soft">
            <span>
              Word Count: <span className="tabular text-ink">{wordCount}</span> /{" "}
              {question.wordLimit}
            </span>
          </div>
          <button
            onClick={submitAnswer}
            disabled={wordCount < 10}
            className="mt-6 w-full rounded-full bg-purple-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-40"
          >
            CHECK MY ANSWER
          </button>
        </div>
      )}

      {phase === "scoring" && (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <Loader2 className="animate-spin text-purple-600" size={28} />
          <p className="text-sm font-semibold text-ink-soft">AI가 답변을 분석하고 있습니다...</p>
        </div>
      )}

      {phase === "error" && (
        <div className="mt-10">
          <AiFallback onRetry={submitAnswer} onViewBasic={() => setPhase("writing")} />
        </div>
      )}

      {phase === "result" && latestResult && (
        <div className="mt-8">
          <div className="rounded-card border border-line bg-white p-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
              Estimated {question.examId.startsWith("ielts") ? "Band" : "Score"}
            </p>
            <p className="mt-1 text-5xl font-extrabold text-purple-600 tabular">
              {latestResult.overallScore}
            </p>
            <ScoreDisclaimer className="mt-2" />
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-5 text-left sm:grid-cols-4">
              {latestResult.criteria.map((c) => (
                <div key={c.key}>
                  <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                    {c.label}
                  </p>
                  <p className="mt-1 text-lg font-extrabold tabular text-ink">{c.score}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <FeedbackCard kind="well">
              <ul className="space-y-1.5 text-sm text-ink">
                {latestResult.strengths.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </FeedbackCard>
            <FeedbackCard kind="improve">
              <ul className="space-y-1.5 text-sm text-ink">
                {latestResult.improvements.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </FeedbackCard>
            <FeedbackCard kind="tryThis">
              <p className="text-sm text-ink">{latestResult.tryThis}</p>
            </FeedbackCard>
          </div>

          {previousForCompare && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-bold text-ink">Attempt Comparison</p>
              <RetryComparison
                prevScore={previousForCompare.overallScore}
                nextScore={latestResult.overallScore}
                max={latestResult.overallMax}
                prevCriteria={previousForCompare.criteria}
                nextCriteria={latestResult.criteria}
              />
            </div>
          )}

          <button
            onClick={() => {
              setText("");
              setPhase("writing");
            }}
            className="mt-8 w-full rounded-full bg-purple-600 px-7 py-4 text-base font-extrabold text-white hover:bg-purple-700"
          >
            RETRY THIS QUESTION
          </button>

          {fromAcademy && (
            <Link
              href="/academy/dashboard"
              className="mt-3 block text-center text-xs font-semibold text-purple-600"
            >
              ✓ Reflected in your Academy Dashboard — Back to Dashboard
            </Link>
          )}

          <div className="mt-6 flex items-center justify-center gap-8 text-center text-sm">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Latest</p>
              <p className="font-extrabold text-ink tabular">{latestResult.overallScore}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-label text-gold-600">Best</p>
              <p className="font-extrabold text-gold-600 tabular">
                {Math.max(...allAttempts.map((a) => a.overallScore))}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                Attempts
              </p>
              <p className="font-extrabold text-ink tabular">{allAttempts.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
