import Link from "next/link";
import { DEMO_USER, LATEST_MOCK, latestAndBest } from "@/lib/data/user";
import { TODAY_TASKS } from "@/lib/data/academy";
import { EXAMS } from "@/lib/data/exams";
import { buildLearningProfile } from "@/lib/data/learningProfile";
import { getNextBestAction } from "@/services/recommendation/nextBestAction";
import { daysUntil, formatDate } from "@/lib/utils";
import { ScoreDisclaimer } from "@/components/ScoreDisclaimer";
import { WhyThis } from "@/components/WhyThis";
import { PlayCircle, Mic, PenLine, FileText, Target } from "lucide-react";

export const metadata = { title: "My C-Bridge | Dashboard" };

export default function MyDashboardPage() {
  const exam = EXAMS[DEMO_USER.examId];
  const dDay = daysUntil(DEMO_USER.examDate);
  const inProgressTask = TODAY_TASKS.find((t) => t.status === "in-progress");
  const doneCount = TODAY_TASKS.filter((t) => t.status === "done").length;
  const speaking = latestAndBest("speaking");
  const writing = latestAndBest("writing");
  const nextAction = getNextBestAction(buildLearningProfile());

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
      <p className="text-sm text-ink-soft">Welcome back, {DEMO_USER.name}.</p>

      {/* Next Action */}
      {inProgressTask && (
        <Link
          href={`/score-lab/writing/${inProgressTask.questionId}?fromAcademy=1`}
          className="mt-6 flex items-center gap-4 rounded-card border-2 border-purple-600 bg-white p-6 hover:bg-lavender/30"
        >
          <PlayCircle className="shrink-0 text-purple-600" size={34} />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-label text-purple-500">
              Next Action
            </p>
            <p className="mt-1 text-lg font-extrabold text-ink">
              Complete {inProgressTask.title}
            </p>
            <p className="text-xs text-ink-soft">~{inProgressTask.durationMin} min</p>
          </div>
          <span className="shrink-0 rounded-full bg-purple-600 px-5 py-2.5 text-xs font-bold text-white">
            CONTINUE
          </span>
        </Link>
      )}

      {nextAction && (
        <div className="mt-4 rounded-card border border-gold-300 bg-gold-50 p-5">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-gold-700" />
            <p className="text-[10px] font-bold uppercase tracking-label text-gold-700">
              Your Next Best Action
            </p>
          </div>
          <p className="mt-1.5 font-bold text-ink">{nextAction.title}</p>
          <WhyThis>{nextAction.reason}</WhyThis>
          <Link
            href={nextAction.href}
            className="mt-4 inline-flex rounded-full bg-purple-600 px-5 py-2 text-xs font-bold text-white hover:bg-purple-700"
          >
            {nextAction.ctaLabel} · {nextAction.estimatedMinutes} min
          </Link>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Current Score" value={DEMO_USER.currentScore} accent />
        <Stat label="Target" value={DEMO_USER.targetScore} />
        <Stat label="D-Day" value={`D-${dDay}`} />
        <Stat label="Today's Progress" value={`${doneCount}/${TODAY_TASKS.length}`} />
      </div>
      <ScoreDisclaimer className="mt-2" />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Link
          href="/my/tests"
          className="rounded-card border border-line bg-white p-5 transition-colors hover:border-purple-300"
        >
          <FileText className="text-purple-500" size={18} />
          <p className="mt-3 text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Recent Mock
          </p>
          <p className="mt-1 text-2xl font-extrabold tabular text-ink">
            {LATEST_MOCK.estimatedScore}
          </p>
          <p className="text-xs text-ink-soft">
            {exam.name} · {formatDate(LATEST_MOCK.date)}
          </p>
        </Link>

        <Link
          href="/my/score-lab"
          className="rounded-card border border-line bg-white p-5 transition-colors hover:border-purple-300"
        >
          <Mic className="text-purple-500" size={18} />
          <p className="mt-3 text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Latest Speaking
          </p>
          <p className="mt-1 text-2xl font-extrabold tabular text-ink">
            {speaking.latest?.overallScore}
          </p>
          <p className="text-xs text-ink-soft">Best {speaking.best?.overallScore}</p>
        </Link>

        <Link
          href="/my/score-lab"
          className="rounded-card border border-line bg-white p-5 transition-colors hover:border-purple-300"
        >
          <PenLine className="text-purple-500" size={18} />
          <p className="mt-3 text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Latest Writing
          </p>
          <p className="mt-1 text-2xl font-extrabold tabular text-ink">
            {writing.latest?.overallScore}
          </p>
          <p className="text-xs text-ink-soft">Best {writing.best?.overallScore}</p>
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="rounded-card border border-line bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">{label}</p>
      <p className={`mt-1 text-2xl font-extrabold tabular ${accent ? "text-purple-600" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}
