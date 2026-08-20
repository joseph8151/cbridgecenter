import Link from "next/link";
import { DEMO_USER } from "@/lib/data/user";
import { EXAMS } from "@/lib/data/exams";
import { TODAY_TASKS, SCHEDULE_4WK } from "@/lib/data/academy";
import { NOTIFICATIONS, WEEK_STREAK, ACHIEVEMENTS } from "@/lib/data/engagement";
import { buildLearningProfile } from "@/lib/data/learningProfile";
import { computeWeaknesses } from "@/services/weaknessEngine";
import { getNextBestAction } from "@/services/recommendation/nextBestAction";
import { computeAiProgress } from "@/services/progressEngine";
import { DailyTaskCard } from "@/components/DailyTaskCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { WhyThis } from "@/components/WhyThis";
import { ScoreDisclaimer } from "@/components/ScoreDisclaimer";
import { Badge } from "@/components/ui/Badge";
import { daysUntil, formatDate } from "@/lib/utils";
import {
  Bell,
  Flame,
  CircleCheck,
  Trophy,
  ArrowRight,
  PlayCircle,
  Target,
} from "lucide-react";

export const metadata = { title: "Academy Dashboard | C-BRIDGE" };

export default function AcademyDashboardPage() {
  const exam = EXAMS[DEMO_USER.examId];
  const dDay = daysUntil(DEMO_USER.examDate);
  const doneCount = TODAY_TASKS.filter((t) => t.status === "done").length;
  const totalMin = TODAY_TASKS.reduce((a, t) => a + t.durationMin, 0);
  const inProgressTask = TODAY_TASKS.find((t) => t.status === "in-progress");

  const profile = buildLearningProfile();
  const weaknesses = computeWeaknesses(profile, 3);
  const nextAction = getNextBestAction(profile);
  const aiProgress = computeAiProgress(profile);
  const rationale = nextAction?.reason ?? "오늘 학습은 최근 데이터를 기준으로 조정되었습니다.";

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Good Morning, {DEMO_USER.name.split(" ")[0]}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-ink">{exam.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-card border border-line bg-white px-4 py-2.5 text-right">
            <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
              Exam Day
            </p>
            <p className="text-sm font-extrabold text-ink">{formatDate(DEMO_USER.examDate)}</p>
          </div>
          <Badge tone="gold" className="px-4 py-2.5 text-sm">
            D-{dDay}
          </Badge>
        </div>
      </div>

      {/* Continue Training */}
      {inProgressTask && (
        <Link
          href={`/score-lab/writing/${inProgressTask.questionId}?fromAcademy=1`}
          className="mt-6 flex items-center gap-4 rounded-card border-2 border-purple-600 bg-white p-5 transition-colors hover:bg-lavender/40"
        >
          <PlayCircle className="shrink-0 text-purple-600" size={30} />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-label text-purple-500">
              Pick Up Where You Left Off
            </p>
            <p className="mt-0.5 truncate font-bold text-ink">{inProgressTask.title}</p>
            <p className="text-xs text-ink-soft">~{inProgressTask.durationMin} min remaining</p>
          </div>
          <span className="shrink-0 rounded-full bg-purple-600 px-5 py-2 text-xs font-bold text-white">
            CONTINUE TRAINING
          </span>
        </Link>
      )}

      {/* Next Best Action */}
      {nextAction && (
        <div className="mt-4 flex items-center gap-4 rounded-card border border-line bg-white p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
            <Target size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-label text-gold-700">
              Your Next Best Action
            </p>
            <p className="mt-0.5 font-bold text-ink">{nextAction.title}</p>
            <p className="text-xs text-ink-soft">{nextAction.reason}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="mb-1.5 text-[11px] font-semibold text-ink-soft">
              {nextAction.estimatedMinutes} min
            </p>
            <Link
              href={nextAction.href}
              className="rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700"
            >
              {nextAction.ctaLabel}
            </Link>
          </div>
        </div>
      )}

      {/* Score summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-card border border-line bg-white p-4">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
            Estimated Score
          </p>
          <p className="mt-1 text-2xl font-extrabold tabular text-ink">{DEMO_USER.currentScore}</p>
        </div>
        <div className="rounded-card border border-line bg-white p-4">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Target</p>
          <p className="mt-1 text-2xl font-extrabold tabular text-purple-600">
            {DEMO_USER.targetScore}
          </p>
        </div>
        <div className="rounded-card border border-line bg-white p-4">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
            AI Progress
          </p>
          <p className="mt-1 text-2xl font-extrabold tabular text-gold-600">
            {aiProgress.value}
            <span className="text-sm text-ink-soft"> /100</span>
          </p>
        </div>
        <div className="rounded-card border border-line bg-white p-4">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
            Course Progress
          </p>
          <p className="mt-1 text-2xl font-extrabold tabular text-ink">
            {DEMO_USER.courseProgressPct}%
          </p>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-ink-soft">
        Estimated Score는 Full Mock 기준, AI Progress는 매일 학습 데이터를 기반으로 별도로
        산출됩니다.
      </p>
      <ScoreDisclaimer className="mt-1" />

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          {/* Today's Plan */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-ink">Today&apos;s Plan</h2>
              <span className="text-xs font-bold text-ink-soft">
                {doneCount} / {TODAY_TASKS.length} Complete
              </span>
            </div>
            <ProgressBar
              value={doneCount}
              max={TODAY_TASKS.length}
              tone="success"
              className="mt-2"
            />
            <div className="mt-4 space-y-2.5">
              {TODAY_TASKS.map((t) => (
                <DailyTaskCard key={t.id} task={t} />
              ))}
            </div>
            <p className="mt-3 text-xs font-semibold text-ink-soft">Total {totalMin} min</p>

            <div className="mt-5 rounded-card border border-purple-200 bg-lavender p-5">
              <p className="text-[11px] font-bold uppercase tracking-label text-purple-600">
                Today&apos;s Plan
              </p>
              <WhyThis>{rationale}</WhyThis>
            </div>
          </section>

          {/* Test schedule */}
          <section>
            <h2 className="text-lg font-extrabold text-ink">Test Schedule</h2>
            <div className="mt-4 space-y-0">
              {SCHEDULE_4WK.map((m, i) => (
                <div key={m.day} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        m.done
                          ? "bg-success text-white"
                          : "border-2 border-purple-200 bg-white text-purple-400"
                      }`}
                    >
                      {m.done ? <CircleCheck size={14} /> : i + 1}
                    </span>
                    {i < SCHEDULE_4WK.length - 1 && (
                      <span className="h-8 w-px bg-line" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-xs font-bold uppercase tracking-label text-ink-soft">
                      Day {m.day}
                    </p>
                    <p className="text-sm font-bold text-ink">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/academy/weekly-report"
              className="flex items-center gap-1 text-sm font-semibold text-purple-600"
            >
              View Weekly Report <ArrowRight size={14} />
            </Link>
          </section>
        </div>

        <div className="space-y-6">
          {/* Streak */}
          <div className="rounded-card border border-line bg-white p-5">
            <div className="flex items-center gap-2">
              <Flame className="text-gold-600" size={18} />
              <p className="font-extrabold text-ink">{DEMO_USER.studyStreak} Day Streak</p>
            </div>
            <div className="mt-4 flex justify-between">
              {WEEK_STREAK.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-ink-soft">{d.day}</span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                      d.done ? "bg-success text-white" : "border border-line text-ink-soft"
                    }`}
                  >
                    {d.done ? "✓" : "○"}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              Study Time Today: <span className="font-bold text-ink">{DEMO_USER.dailyStudyTime} min</span>
            </p>
          </div>

          {/* Top Weaknesses */}
          <div className="rounded-card border border-line bg-white p-5">
            <p className="font-bold text-ink">Top Weaknesses</p>
            <div className="mt-3 space-y-3">
              {weaknesses.map((w) => (
                <Link
                  key={`${w.section}-${w.skillTag}`}
                  href={w.actionHref}
                  className="block rounded-xl border border-line p-3 hover:border-purple-300"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-ink">
                      {w.rank}. {w.skillTag}
                    </p>
                    <p className="text-sm font-extrabold tabular text-weak">{w.level}%</p>
                  </div>
                  <p className="mt-0.5 text-[11px] capitalize text-ink-soft">
                    {w.section} · {w.relatedQuestionCount} related questions
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-card border border-line bg-white p-5">
            <div className="flex items-center gap-2">
              <Bell className="text-purple-500" size={16} />
              <p className="font-bold text-ink">Notifications</p>
            </div>
            <ul className="mt-3 space-y-3">
              {NOTIFICATIONS.slice(0, 4).map((n) => (
                <li key={n.id} className="text-xs">
                  <p className="text-ink">{n.text}</p>
                  <p className="text-ink-soft">{n.time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="rounded-card border border-line bg-white p-5">
            <div className="flex items-center gap-2">
              <Trophy className="text-gold-600" size={16} />
              <p className="font-bold text-ink">Achievements</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {ACHIEVEMENTS.map((a) => (
                <div
                  key={a.id}
                  className={`rounded-xl border p-3 text-center ${
                    a.unlocked ? "border-gold-300 bg-gold-50" : "border-line bg-cream-deep opacity-50"
                  }`}
                  title={a.description}
                >
                  <p className="text-[11px] font-bold text-ink">{a.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
