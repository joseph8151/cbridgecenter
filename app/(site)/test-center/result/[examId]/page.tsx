import { notFound } from "next/navigation";
import Link from "next/link";
import { EXAMS } from "@/lib/data/exams";
import { DEMO_USER, LATEST_MOCK } from "@/lib/data/user";
import { estimateScore } from "@/services/mockScoring";
import { MockResultCard } from "@/components/MockResultCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { MockType, SectionScore } from "@/lib/types";
import { formatKRW } from "@/lib/utils";
import { COURSES } from "@/lib/data/academy";
import { WhyThis } from "@/components/WhyThis";

const SUBSKILLS: Record<string, { label: string; pct: number }[]> = {
  speaking: [
    { label: "Fluency", pct: 58 },
    { label: "Pronunciation", pct: 64 },
    { label: "Vocabulary", pct: 76 },
    { label: "Grammar", pct: 69 },
  ],
  writing: [
    { label: "Coherence", pct: 61 },
    { label: "Task Achievement", pct: 70 },
    { label: "Vocabulary Range", pct: 66 },
    { label: "Grammar Accuracy", pct: 63 },
  ],
  reading: [
    { label: "Inference", pct: 65 },
    { label: "Detail Recognition", pct: 74 },
    { label: "Vocabulary in Context", pct: 78 },
    { label: "Time Management", pct: 60 },
  ],
  listening: [
    { label: "Main Idea", pct: 72 },
    { label: "Detail Recall", pct: 63 },
    { label: "Inference", pct: 67 },
    { label: "Note-taking", pct: 59 },
  ],
};

const AI_COMMENTS: Record<string, string> = {
  speaking:
    "최근 답변에서는 긴 문장 앞에서 멈춤이 자주 발생하며, 아이디어를 연결하는 표현의 사용이 제한적입니다.",
  writing:
    "문단 간 연결이 다소 약하고, 결론이 본론의 반복에 그치는 경향이 있습니다. 구체적인 예시를 늘려보세요.",
  reading:
    "세부 정보를 찾는 문제는 강하지만, 추론이 필요한 문제에서 시간이 오래 걸리는 경향이 있습니다.",
  listening:
    "전체 주제는 잘 파악하지만, 세부 내용을 놓치는 경우가 있어 노트 필기 전략이 필요합니다.",
};

export default function TestResultPage({
  params,
  searchParams,
}: {
  params: { examId: string };
  searchParams: { type?: string; performance?: string };
}) {
  const exam = EXAMS[params.examId];
  if (!exam) notFound();

  const isDemoUserExam = exam.id === DEMO_USER.examId;
  const attempt =
    isDemoUserExam && !searchParams.performance
      ? LATEST_MOCK
      : estimateScore({
          examId: exam.id,
          type: (searchParams.type as MockType) ?? "full",
          target: isDemoUserExam ? DEMO_USER.targetScore : Math.round(exam.scoreMax * 0.85),
          performance: searchParams.performance ? parseFloat(searchParams.performance) : 0.68,
        });

  const weakest: SectionScore = attempt.sections.reduce((a, b) =>
    b.score / b.max < a.score / a.max ? b : a
  );
  const need = attempt.target - attempt.estimatedScore;
  const subskills = SUBSKILLS[weakest.section];
  const comment = AI_COMMENTS[weakest.section];

  const gapPct = need / exam.scoreMax;
  const recommendedCourse =
    gapPct <= 0.06 ? COURSES[0] : gapPct <= 0.16 ? COURSES[1] : COURSES[2];
  const recommendReason =
    gapPct <= 0.06
      ? "시험일이 가깝고 목표까지 남은 차이가 크지 않아 짧고 집중적인 훈련이 가장 효율적입니다."
      : gapPct <= 0.16
      ? "현재 점수와 목표점수 차이, 그리고 남은 시험 준비 기간을 기준으로 가장 적합한 과정입니다."
      : "현재 점수와 목표점수 차이가 커서 충분한 기간의 전 영역 관리 과정이 필요합니다.";

  return (
    <div>
      <section className="bg-purple-700 py-14 text-white">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <span className="text-[11px] font-bold uppercase tracking-label text-gold-300">
            Your Score Report
          </span>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{exam.fullName}</h1>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-label text-purple-200">
                Estimated Score
              </p>
              <p className="mt-1 text-4xl font-extrabold tabular">{attempt.estimatedScore}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-label text-purple-200">Target</p>
              <p className="mt-1 text-4xl font-extrabold tabular text-purple-200">
                {attempt.target}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-label text-purple-200">Need</p>
              <p className="mt-1 text-4xl font-extrabold tabular text-gold-300">
                {need > 0 ? `+${need}` : "Reached"}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-label text-purple-200">
                Est. Preparation
              </p>
              <p className="mt-1 text-2xl font-extrabold">{attempt.prepWeeks}</p>
            </div>
          </div>
          <p className="mt-6 text-[11px] leading-relaxed text-purple-200">
            C-BRIDGE Estimated Score — C-Bridge의 연습 및 모의평가 데이터를 기반으로 산출한
            예상치이며, 실제 시험 결과와 다를 수 있습니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <h2 className="text-lg font-extrabold text-ink">Section Breakdown</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {attempt.sections.map((s) => (
            <MockResultCard key={s.section} section={s} isWeakest={s.section === weakest.section} />
          ))}
        </div>

        {/* AI Weakness Analysis */}
        <div className="mt-12 rounded-card border border-purple-200 bg-lavender p-7">
          <span className="kicker">AI Weakness Analysis</span>
          <h3 className="mt-2 text-2xl font-extrabold text-ink">
            Your Biggest Opportunity
          </h3>
          <p className="mt-1 text-xl font-bold text-purple-600 capitalize">
            {weakest.section}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {subskills.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink">{s.label}</span>
                  <span className="font-bold tabular text-ink-soft">{s.pct}%</span>
                </div>
                <ProgressBar value={s.pct} className="mt-1.5" />
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-white p-4">
            <p className="text-sm italic leading-relaxed text-ink-soft">“{comment}”</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/score-lab" size="sm">
              {weakest.section === "writing" ? "Writing" : "Speaking"} RETRY Training
            </LinkButton>
            <LinkButton href="/academy" variant="outline" size="sm">
              {weakest.section} Intensive Practice
            </LinkButton>
          </div>
        </div>
      </section>

      {/* UPSELL */}
      <section className="border-t border-line bg-white py-14">
        <div className="mx-auto grid max-w-5xl gap-6 px-5 md:grid-cols-2 md:px-8">
          <div className="rounded-card border border-line bg-cream-deep p-7">
            <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
              Ready to Improve?
            </p>
            <h3 className="mt-2 text-xl font-extrabold text-ink">
              Speaking + Writing 집중 분석
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              AI Score Lab에서 약점 영역을 집중적으로 채점받고 RETRY하세요.
            </p>
            <p className="mt-4 text-2xl font-extrabold text-purple-600">
              {formatKRW(17900)}
            </p>
            <LinkButton href="/score-lab/checkout/combo" className="mt-5 w-full">
              Go to Score Lab
            </LinkButton>
          </div>

          <div className="rounded-card border-2 border-purple-600 bg-white p-7">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
                Recommended For You
              </p>
              <Badge tone="gold">AI Pick</Badge>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                  Current
                </p>
                <p className="text-xl font-extrabold text-ink tabular">{attempt.estimatedScore}</p>
              </div>
              <span className="text-purple-300">→</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                  Goal
                </p>
                <p className="text-xl font-extrabold text-purple-600 tabular">{attempt.target}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                  Main Weakness
                </p>
                <p className="text-sm font-extrabold capitalize text-weak">{weakest.section}</p>
              </div>
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-ink">{recommendedCourse.name}</h3>
            <WhyThis>{recommendReason}</WhyThis>
            <LinkButton href={`/academy/checkout/${recommendedCourse.id}`} className="mt-5 w-full">
              START MY PLAN
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
