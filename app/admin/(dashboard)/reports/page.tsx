import { CONVERSION_FUNNEL, REVENUE_BY_EXAM } from "@/lib/data/admin";
import { EXAMS } from "@/lib/data/exams";
import { formatKRW } from "@/lib/utils";

export const metadata = { title: "Reports | C-BRIDGE Admin" };

export default function AdminReportsPage() {
  const maxCount = CONVERSION_FUNNEL[0].count;
  const maxRevenue = Math.max(...REVENUE_BY_EXAM.map((r) => r.revenue));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Reports & Analytics</h1>
      <p className="text-sm text-ink-soft">데모 데이터 기준입니다.</p>

      <div className="mt-6 rounded-card border border-line bg-white p-5">
        <p className="font-bold text-ink">Conversion Funnel</p>
        <div className="mt-4 space-y-2.5">
          {CONVERSION_FUNNEL.map((s, i) => {
            const pct = Math.round((s.count / maxCount) * 100);
            const prevPct =
              i === 0 ? 100 : Math.round((s.count / CONVERSION_FUNNEL[i - 1].count) * 100);
            return (
              <div key={s.stage}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink">{s.stage}</span>
                  <span className="tabular text-ink-soft">
                    {s.count.toLocaleString()} {i > 0 && <span className="text-purple-600">({prevPct}%)</span>}
                  </span>
                </div>
                <div className="mt-1 h-2.5 w-full rounded-pill bg-purple-100">
                  <div className="h-2.5 rounded-pill bg-purple-600" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-card border border-line bg-white p-5">
        <p className="font-bold text-ink">Revenue by Exam</p>
        <div className="mt-4 space-y-2.5">
          {REVENUE_BY_EXAM.map((r) => (
            <div key={r.examId}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-ink">{EXAMS[r.examId]?.name ?? r.examId}</span>
                <span className="tabular font-bold text-ink">{formatKRW(r.revenue)}</span>
              </div>
              <div className="mt-1 h-2.5 w-full rounded-pill bg-gold-100">
                <div
                  className="h-2.5 rounded-pill bg-gold-500"
                  style={{ width: `${Math.round((r.revenue / maxRevenue) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
