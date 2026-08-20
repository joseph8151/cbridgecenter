"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { questionById } from "@/lib/data/questions";
import { attemptsForQuestion } from "@/lib/data/user";
import { scoreAttempt } from "@/services/scoring/aiScoring";
import { ScoreLabAttempt } from "@/lib/types";
import { FeedbackCard } from "@/components/FeedbackCard";
import { RetryComparison } from "@/components/RetryComparison";
import { formatMMSS, cn } from "@/lib/utils";
import { ScoreDisclaimer } from "@/components/ScoreDisclaimer";
import { Mic, Play, RotateCcw, Loader2, GraduationCap, ArrowLeft, MicOff } from "lucide-react";

type Phase = "intro" | "prep" | "answer" | "review" | "scoring" | "result";

export default function SpeakingCheckPage() {
  const params = useParams<{ questionId: string }>();
  const search = useSearchParams();
  const fromAcademy = search.get("fromAcademy") === "1";
  const isTrial = search.get("trial") === "1";
  const question = questionById(params.questionId);
  const history = question && !isTrial ? attemptsForQuestion(question.id, "speaking") : [];

  const [phase, setPhase] = useState<Phase>("intro");
  const [time, setTime] = useState(question?.prepSeconds ?? 15);
  const [sessionAttempts, setSessionAttempts] = useState<ScoreLabAttempt[]>([]);
  const [micError, setMicError] = useState(false);
  const [checkingMic, setCheckingMic] = useState(false);

  const allAttempts = [...history, ...sessionAttempts];
  const currentAttemptNumber = allAttempts.length + 1;
  const latestResult = sessionAttempts[sessionAttempts.length - 1];
  const previousForCompare = allAttempts[allAttempts.length - 2];

  useEffect(() => {
    if (phase !== "prep" && phase !== "answer") return;
    const t = setInterval(() => {
      setTime((s) => {
        if (s <= 1) {
          if (phase === "prep") {
            setPhase("answer");
            return question?.answerSeconds ?? 45;
          }
          setPhase("review");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  async function startAttempt() {
    setMicError(false);
    if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      setCheckingMic(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((t) => t.stop());
      } catch {
        setCheckingMic(false);
        setMicError(true);
        return;
      }
      setCheckingMic(false);
    }
    setPhase("prep");
    setTime(question?.prepSeconds ?? 15);
  }

  async function submitAnswer() {
    if (!question) return;
    setPhase("scoring");
    const prev = allAttempts[allAttempts.length - 1];
    const result = await scoreAttempt({
      questionId: question.id,
      examId: question.examId,
      skill: "speaking",
      attemptNumber: currentAttemptNumber,
      previousScore: prev?.overallScore,
      payload: "mock-audio",
    });
    setSessionAttempts((s) => [...s, result]);
    setPhase("result");
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
      {isTrial && (
        <div className="mt-4 flex items-center gap-2 rounded-full bg-lavender px-4 py-2 text-xs font-bold uppercase tracking-label text-purple-700 w-fit">
          Free Sample Check
        </div>
      )}

      <p className="mt-5 text-[11px] font-bold uppercase tracking-label text-purple-500">
        {question.part}
      </p>
      <h1 className="mt-2 text-xl font-bold text-ink">{question.prompt}</h1>

      {phase === "intro" && (
        <div className="mt-10 rounded-card border border-line bg-cream-deep p-8 text-center">
          {micError ? (
            <>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-weak/10 text-weak">
                <MicOff size={26} />
              </span>
              <p className="mt-4 text-sm font-bold text-weak">Microphone Access Denied</p>
              <p className="mt-1 text-sm text-ink-soft">
                브라우저 설정에서 마이크 권한을 허용한 후 다시 시도해주세요.
              </p>
              <button
                onClick={startAttempt}
                className="mt-6 rounded-full bg-purple-600 px-7 py-3 text-sm font-bold text-white hover:bg-purple-700"
              >
                Try Again
              </button>
            </>
          ) : (
            <>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lavender text-purple-600">
                <Mic size={26} />
              </span>
              <p className="mt-4 text-sm text-ink-soft">
                Preparation {question.prepSeconds}s · Answer {question.answerSeconds}s
              </p>
              <button
                onClick={startAttempt}
                disabled={checkingMic}
                className="mt-6 flex items-center gap-2 rounded-full bg-purple-600 px-7 py-3 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-60 mx-auto"
              >
                {checkingMic && <Loader2 size={14} className="animate-spin" />}
                Start Attempt {currentAttemptNumber}
              </button>
            </>
          )}
        </div>
      )}

      {(phase === "prep" || phase === "answer") && (
        <div className="mt-10 flex flex-col items-center text-center">
          <span
            className={cn(
              "flex h-24 w-24 items-center justify-center rounded-full transition-colors",
              phase === "answer" ? "bg-weak text-white" : "bg-lavender text-purple-600"
            )}
          >
            <Mic size={32} />
          </span>
          <div className="mt-4 flex items-end gap-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "wave-bar w-1.5 rounded-full bg-purple-300",
                  phase === "answer" ? "h-9" : "h-3"
                )}
                style={{ animationDelay: `${i * 0.07}s` }}
              />
            ))}
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-label text-ink-soft">
            {phase === "prep" ? "Preparation Time" : "Answer Time"}
          </p>
          <p className="mt-1 text-4xl font-extrabold tabular text-purple-600">
            {formatMMSS(time)}
          </p>
        </div>
      )}

      {phase === "review" && (
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-sm font-bold uppercase tracking-label text-success">
            Recording Complete
          </p>
          <div className="mt-6 flex gap-3">
            <button className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink">
              <Play size={14} /> Play Recording
            </button>
            <button
              onClick={startAttempt}
              className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink"
            >
              <RotateCcw size={14} /> Re-record
            </button>
          </div>
          <button
            onClick={submitAnswer}
            className="mt-8 w-full rounded-full bg-purple-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-purple-700"
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

          {isTrial ? (
            <div className="mt-8 rounded-card border-2 border-purple-600 bg-lavender p-6 text-center">
              <p className="text-[11px] font-bold uppercase tracking-label text-purple-600">
                Your Result Is Ready
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                무료 샘플 채점은 여기까지입니다. 전체 RETRY 기능과 채점 기록은
                Score Lab에서 계속 이용할 수 있습니다.
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/score-lab"
                  className="flex-1 rounded-full bg-purple-600 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700"
                >
                  CHECK MY ANSWER — Full Score Lab
                </Link>
                <Link
                  href="/test-center"
                  className="flex-1 rounded-full border border-purple-300 bg-white px-5 py-3 text-sm font-bold text-purple-700 hover:bg-lavender"
                >
                  START A MOCK TEST
                </Link>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={startAttempt}
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
                  <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                    Latest
                  </p>
                  <p className="font-extrabold text-ink tabular">{latestResult.overallScore}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-label text-gold-600">
                    Best
                  </p>
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
