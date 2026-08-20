import Link from "next/link";
import { DEMO_USER, MOCK_HISTORY, SPEAKING_HISTORY, WRITING_HISTORY } from "@/lib/data/user";
import { COURSES } from "@/lib/data/academy";
import { WhyThis } from "@/components/WhyThis";
import { Trophy } from "lucide-react";

export const metadata = { title: "Course Complete | C-BRIDGE Academy" };

export default function AcademyCompletePage() {
  const start = MOCK_HISTORY[0];
  const final = MOCK_HISTORY[MOCK_HISTORY.length - 1];
  const improvement = final.estimatedScore - start.estimatedScore;
  const gap = DEMO_USER.targetScore - final.estimatedScore;

  const plan =
    gap <= 3
      ? {
          headline: "MAINTAIN YOUR SCORE",
          reason: "목표점수에 도달했습니다. 실력 유지를 위한 Practice를 추천합니다.",
          course: null,
          ctaLabel: "Explore Practice",
          ctaHref: "/score-lab",
        }
      : gap <= 15
      ? {
          headline: "ONE MORE PUSH",
          reason: `목표까지 ${gap}점 남았습니다. 짧고 집중적인 훈련이면 충분합니다.`,
          course: COURSES[0],
          ctaLabel: "Extend My Course",
          ctaHref: `/academy/checkout/${COURSES[0].id}`,
        }
      : {
          headline: "CONTINUE YOUR PLAN",
          reason: `목표까지 ${gap}점 남았습니다. 전 영역을 계속 관리하는 과정을 추천합니다.`,
          course: COURSES[1],
          ctaLabel: "Extend My Course",
          ctaHref: `/academy/checkout/${COURSES[1].id}`,
        };

  const speakingAttempts = SPEAKING_HISTORY.length;
  const writingAttempts = WRITING_HISTORY.length;

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 text-center md:px-8">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-700">
        <Trophy size={28} />
      </span>
      <span className="kicker mx-auto mt-5 w-fit">{DEMO_USER.course}</span>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">28 DAYS COMPLETED</h1>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-card border border-line bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Starting</p>
          <p className="mt-1 text-3xl font-extrabold tabular text-ink-soft">
            {start.estimatedScore}
          </p>
        </div>
        <div className="rounded-card border-2 border-purple-600 bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-purple-500">
            Final Mock
          </p>
          <p className="mt-1 text-3xl font-extrabold tabular text-purple-600">
            {final.estimatedScore}
          </p>
        </div>
        <div className="rounded-card border border-line bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Goal</p>
          <p className="mt-1 text-3xl font-extrabold tabular text-ink">{DEMO_USER.targetScore}</p>
        </div>
      </div>

      <p className="mt-5 text-lg font-extrabold text-success">
        Improvement +{improvement}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4 text-left sm:grid-cols-3">
        <Stat label="Total Study Time" value={DEMO_USER.totalStudyTime} />
        <Stat label="Speaking Attempts" value={String(speakingAttempts)} />
        <Stat label="Writing Attempts" value={String(writingAttempts)} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 text-left sm:grid-cols-1">
        <Stat label="Mock Tests" value={String(MOCK_HISTORY.length)} />
      </div>

      <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
        <div className="rounded-card border border-gold-300 bg-gold-50 p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-gold-700">
            Your Biggest Improvement
          </p>
          <p className="mt-1 text-lg font-extrabold text-ink">Speaking</p>
        </div>
        <div className="rounded-card border border-purple-200 bg-lavender p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-purple-600">
            Your Next Opportunity
          </p>
          <p className="mt-1 text-lg font-extrabold text-ink">Writing</p>
        </div>
      </div>

      <div className="mt-10 rounded-card border-2 border-purple-600 bg-white p-7 text-left">
        <p className="text-2xl font-extrabold text-ink">{gap > 0 ? `${gap} points to your target.` : "Target reached."}</p>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-label text-purple-500">
          {plan.headline}
        </p>
        <WhyThis>{plan.reason}</WhyThis>
        <Link
          href={plan.ctaHref}
          className="mt-6 block w-full rounded-full bg-purple-600 px-6 py-3.5 text-center text-sm font-bold text-white hover:bg-purple-700"
        >
          {plan.ctaLabel}
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-line bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">{label}</p>
      <p className="mt-1 text-xl font-extrabold tabular text-ink">{value}</p>
    </div>
  );
}
