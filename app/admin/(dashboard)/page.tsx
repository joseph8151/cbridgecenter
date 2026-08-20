import Link from "next/link";
import { ADMIN_STATS, ADMIN_USERS, ADMIN_PAYMENTS } from "@/lib/data/admin";
import { StatCard } from "@/components/admin/StatCard";
import { formatKRW, formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Dashboard | C-BRIDGE Admin" };

export default function AdminHomePage() {
  const recentUsers = [...ADMIN_USERS]
    .sort((a, b) => (a.joined < b.joined ? 1 : -1))
    .slice(0, 5);
  const recentPayments = [...ADMIN_PAYMENTS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Admin Dashboard</h1>
      <p className="text-sm text-ink-soft">데모 데이터 기준입니다.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        <StatCard label="Today Users" value={ADMIN_STATS.todayUsers} />
        <StatCard label="New Signups" value={ADMIN_STATS.newSignups} />
        <StatCard label="Mock Tests Completed" value={ADMIN_STATS.mockTestsCompleted} />
        <StatCard label="Score Lab Submissions" value={ADMIN_STATS.scoreLabSubmissions} />
        <StatCard label="Academy Active Students" value={ADMIN_STATS.academyActiveStudents} />
        <StatCard label="Revenue (Today)" value={formatKRW(ADMIN_STATS.revenue)} />
        <StatCard label="Conversion" value={`${ADMIN_STATS.conversionPct}%`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="font-bold text-ink">Recent Signups</p>
            <Link href="/admin/users" className="flex items-center gap-1 text-xs font-semibold text-purple-600">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {recentUsers.map((u) => (
              <Link
                key={u.id}
                href={`/admin/users/${u.id}`}
                className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-cream-deep"
              >
                <span className="font-semibold text-ink">{u.name}</span>
                <span className="text-xs text-ink-soft">{formatDate(u.joined)}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="font-bold text-ink">Recent Payments</p>
            <Link href="/admin/payments" className="flex items-center gap-1 text-xs font-semibold text-purple-600">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {recentPayments.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg px-2 py-2 text-sm">
                <div>
                  <p className="font-semibold text-ink">{p.userName}</p>
                  <p className="text-xs text-ink-soft">{p.product}</p>
                </div>
                <span className="font-bold tabular text-ink">{formatKRW(p.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
