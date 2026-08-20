"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EXAM_LIST } from "@/lib/data/exams";
import { DEMO_USER, LATEST_MOCK } from "@/lib/data/user";
import { generatePlan } from "@/services/studyPlanner";
import { cn, daysUntil, formatDate } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";

const STUDY_TIMES = ["30 min", "60 min", "90 min", "120+ min"];
const STEPS = ["Exam", "Current Score", "Target Score", "Exam Date", "Study Time", "AI Plan"];

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingForm />
    </Suspense>
  );
}

function OnboardingForm() {
  const router = useRouter();
  const search = useSearchParams();
  const courseId = search.get("course") ?? "target-4wk";

  const [step, setStep] = useState(1);
  const [examId, setExamId] = useState(DEMO_USER.examId);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [targetScore, setTargetScore] = useState<number | null>(null);
  const [examDate, setExamDate] = useState("");
  const [dailyTime, setDailyTime] = useState(STUDY_TIMES[2]);
  const [building, setBuilding] = useState(false);
  const [done, setDone] = useState(false);

  const hasLatestMock = examId === LATEST_MOCK.examId;

  function next() {
    if (step === 5) {
      setStep(6);
      setBuilding(true);
      setTimeout(() => {
        setBuilding(false);
        setDone(true);
      }, 1800);
      return;
    }
    setStep((s) => Math.min(6, s + 1));
  }

  const plan =
    done && targetScore && examDate
      ? generatePlan({
          examId,
          startScore: currentScore ?? 0,
          targetScore,
          examDateISO: examDate,
          dailyMinutes: parseInt(dailyTime) || 90,
          weakestSection: "speaking",
        })
      : null;

  return (
    <div className="mx-auto max-w-xl px-5 py-14 md:px-8">
      <span className="kicker">Academy Onboarding · {courseId}</span>
      <h1 className="mt-2 text-2xl font-extrabold text-ink">Let&apos;s Build Your AI Plan</h1>

      {/* progress dots */}
      <div className="mt-6 flex items-center gap-1.5">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={cn(
                "h-1.5 rounded-pill",
                i + 1 <= step ? "bg-purple-600" : "bg-purple-100"
              )}
            />
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs font-bold uppercase tracking-label text-ink-soft">
        Step {step} · {STEPS[step - 1]}
      </p>

      <div className="mt-8 rounded-card border border-line bg-white p-7">
        {step === 1 && (
          <div>
            <p className="font-bold text-ink">시험을 선택하세요</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {EXAM_LIST.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setExamId(e.id)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left text-sm font-semibold",
                    examId === e.id
                      ? "border-purple-600 bg-lavender text-purple-700"
                      : "border-line text-ink"
                  )}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="font-bold text-ink">현재 점수를 알려주세요</p>
            {hasLatestMock && (
              <button
                onClick={() => setCurrentScore(LATEST_MOCK.estimatedScore)}
                className={cn(
                  "mt-4 flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-semibold",
                  currentScore === LATEST_MOCK.estimatedScore
                    ? "border-purple-600 bg-lavender text-purple-700"
                    : "border-line text-ink"
                )}
              >
                Use My Latest Mock Score — {LATEST_MOCK.estimatedScore}
                {currentScore === LATEST_MOCK.estimatedScore && <Check size={16} />}
              </button>
            )}
            <input
              type="number"
              placeholder="직접 입력"
              value={currentScore ?? ""}
              onChange={(e) => setCurrentScore(Number(e.target.value))}
              className="mt-3 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-purple-400"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="font-bold text-ink">목표 점수를 입력하세요</p>
            <input
              type="number"
              placeholder="예: 100"
              value={targetScore ?? ""}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="mt-4 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-purple-400"
            />
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="font-bold text-ink">시험 예정일을 선택하세요</p>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="mt-4 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-purple-400"
            />
          </div>
        )}

        {step === 5 && (
          <div>
            <p className="font-bold text-ink">하루 학습 가능 시간은 얼마나 되나요?</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {STUDY_TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setDailyTime(t)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-sm font-semibold",
                    dailyTime === t
                      ? "border-purple-600 bg-lavender text-purple-700"
                      : "border-line text-ink"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="text-center">
            {building ? (
              <div className="py-6">
                <Loader2 className="mx-auto animate-spin text-purple-600" size={28} />
                <p className="mt-4 text-sm font-bold uppercase tracking-label text-purple-600">
                  Building Your Plan
                </p>
              </div>
            ) : (
              plan && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-label text-ink-soft">
                    Your Goal
                  </p>
                  <p className="mt-1 text-2xl font-extrabold tabular text-ink">
                    {currentScore} → <span className="text-purple-600">{targetScore}</span>
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-left">
                    <div className="rounded-xl bg-cream-deep p-4">
                      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                        Duration
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-ink">
                        {plan.durationDays} Days
                      </p>
                    </div>
                    <div className="rounded-xl bg-cream-deep p-4">
                      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                        Daily Study
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-ink">{dailyTime}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-ink-soft">
                    Exam Day: {examDate ? formatDate(examDate) : "TBD"} · D-
                    {examDate ? daysUntil(examDate) : "—"}
                  </p>
                  <button
                    onClick={() => router.push("/academy/dashboard")}
                    className="mt-7 w-full rounded-full bg-purple-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-purple-700"
                  >
                    Go to My Dashboard
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {step < 6 && (
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-40"
          >
            Back
          </button>
          <button
            onClick={next}
            className="rounded-full bg-purple-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
