import { AI_USAGE, ADMIN_STATS } from "@/lib/data/admin";
import { StatCard } from "@/components/admin/StatCard";

export const metadata = { title: "AI Usage | C-BRIDGE Admin" };

export default function AdminAiUsagePage() {
  const avgPerUser = AI_USAGE.avgCostPerUserUSD;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">AI Cost Monitoring</h1>
      <p className="text-sm text-ink-soft">
        실제 AI API가 연결되면 이 화면이 실제 사용량/비용을 표시합니다. 현재는 Demo Data입니다.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Speaking Analysis Calls" value={AI_USAGE.speakingAnalysisCalls.toLocaleString()} />
        <StatCard label="Writing Analysis Calls" value={AI_USAGE.writingAnalysisCalls.toLocaleString()} />
        <StatCard label="Study Plan Calls" value={AI_USAGE.studyPlanCalls.toLocaleString()} />
        <StatCard label="Academy Active Students" value={ADMIN_STATS.academyActiveStudents} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
            Estimated Monthly AI Cost
          </p>
          <p className="mt-1 text-3xl font-extrabold tabular text-purple-600">
            ${AI_USAGE.estimatedMonthlyCostUSD.toFixed(2)}
          </p>
        </div>
        <div className="rounded-card border border-line bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
            Avg. Cost Per User
          </p>
          <p className="mt-1 text-3xl font-extrabold tabular text-ink">${avgPerUser.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6 rounded-card border border-dashed border-line bg-cream-deep p-5 text-sm text-ink-soft">
        Speaking/Writing 채점, Study Plan 생성 등 각 AI 기능이 실제 모델(예: Claude, STT API)에 연결되면
        호출량과 비용이 여기에 실시간으로 집계되도록 설계되어 있습니다. 현재 services/scoring,
        services/studyPlanner는 mock 응답을 반환하므로 비용이 발생하지 않습니다.
      </div>
    </div>
  );
}
