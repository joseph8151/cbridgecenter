import { DEMO_USER, MOCK_HISTORY, SPEAKING_HISTORY, WRITING_HISTORY } from "@/lib/data/user";
import { ProgressChart } from "@/components/ProgressChart";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Score Passport | C-BRIDGE" };

export default function ScorePassportPage() {
  const sorted = [...MOCK_HISTORY].sort((a, b) => (a.date < b.date ? 1 : -1));
  const chronological = [...MOCK_HISTORY].sort((a, b) => (a.date > b.date ? 1 : -1));

  const start = chronological[0];
  const latest = sorted[0];
  const best = MOCK_HISTORY.reduce((a, b) => (b.estimatedScore > a.estimatedScore ? b : a));
  const improvement = latest.estimatedScore - start.estimatedScore;

  const retryCount =
    SPEAKING_HISTORY.filter((a) => a.attemptNumber > 1).length +
    WRITING_HISTORY.filter((a) => a.attemptNumber > 1).length;

  const midIndex = Math.floor(chronological.length / 2);
  const milestones = [
    { label: "START", attempt: chronological[0] },
    { label: "MID MOCK", attempt: chronological[midIndex] },
    { label: "PERSONAL BEST", attempt: best },
    { label: "FINAL MOCK", attempt: chronological[chronological.length - 1] },
  ];

  const chartData = chronological.map((m, i) => ({
    label: `#${i + 1}`,
    score: m.estimatedScore,
  }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">C-BRIDGE Score Passport</h1>
      <p className="text-sm text-ink-soft">{DEMO_USER.name}님의 성장 기록입니다.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <PassportStat label="Target" value={DEMO_USER.targetScore} />
        <PassportStat label="Latest Mock" value={latest.estimatedScore} accent />
        <PassportStat label="Best Mock" value={best.estimatedScore} gold />
        <PassportStat label="AI Progress" value={`${DEMO_USER.aiProgressScore}/100`} />
      </div>

      <div className="mt-8 rounded-card border border-line bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Score Growth
          </p>
          <p className="text-sm font-bold text-success">
            {start.estimatedScore} → {latest.estimatedScore} ({improvement > 0 ? "+" : ""}
            {improvement})
          </p>
        </div>
        <ProgressChart data={chartData} />
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {milestones.map((m) => (
            <div key={m.label} className="rounded-xl bg-cream-deep p-3 text-center">
              <p className="text-[9px] font-bold uppercase tracking-label text-purple-500">
                {m.label}
              </p>
              <p className="mt-1 text-lg font-extrabold tabular text-ink">
                {m.attempt.estimatedScore}
              </p>
              <p className="text-[10px] text-ink-soft">{formatDate(m.attempt.date)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <PassportStat label="Total Improvement" value={`+${improvement}`} success />
        <PassportStat label="Total Study Time" value={DEMO_USER.totalStudyTime} />
        <PassportStat label="Mock Tests" value={MOCK_HISTORY.length} />
        <PassportStat label="Study Streak" value={`${DEMO_USER.studyStreak} Days`} />
        <PassportStat label="Speaking Attempts" value={SPEAKING_HISTORY.length} />
        <PassportStat label="Writing Attempts" value={WRITING_HISTORY.length} />
        <PassportStat label="RETRY Count" value={retryCount} />
        <PassportStat label="Starting Score" value={start.estimatedScore} />
      </div>
    </div>
  );
}

function PassportStat({
  label,
  value,
  accent,
  gold,
  success,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
  gold?: boolean;
  success?: boolean;
}) {
  const color = accent
    ? "text-purple-600"
    : gold
    ? "text-gold-600"
    : success
    ? "text-success"
    : "text-ink";
  return (
    <div className="rounded-card border border-line bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">{label}</p>
      <p className={`mt-1 text-2xl font-extrabold tabular ${color}`}>{value}</p>
    </div>
  );
}
