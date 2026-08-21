import Link from "next/link";
import { ADMIN_USERS } from "@/lib/data/admin";
import { EXAMS } from "@/lib/data/exams";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Users | C-BRIDGE Admin" };

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; exam?: string; subscription?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").toLowerCase();
  const users = ADMIN_USERS.filter((u) => {
    const matchesQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesExam = !sp.exam || u.examId === sp.exam;
    const matchesSub = !sp.subscription || u.subscription === sp.subscription;
    return matchesQuery && matchesExam && matchesSub;
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Users</h1>
          <p className="text-sm text-ink-soft">{users.length} of {ADMIN_USERS.length} members</p>
        </div>
      </div>

      <form className="mt-4 flex flex-wrap gap-2" action="/admin/users">
        <input
          type="text"
          name="q"
          defaultValue={sp.q}
          placeholder="Search name or email..."
          className="w-64 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-purple-400"
        />
        <select
          name="exam"
          defaultValue={sp.exam ?? ""}
          className="rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:border-purple-400"
        >
          <option value="">All Exams</option>
          {Object.values(EXAMS).map((e) => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
        <select
          name="subscription"
          defaultValue={sp.subscription ?? ""}
          className="rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:border-purple-400"
        >
          <option value="">All Subscriptions</option>
          <option value="None">None</option>
          <option value="Score Lab Unlimited">Score Lab Unlimited</option>
          <option value="Academy Active">Academy Active</option>
        </select>
        <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700">
          Filter
        </button>
        {(sp.q || sp.exam || sp.subscription) && (
          <Link href="/admin/users" className="flex items-center px-2 text-xs font-semibold text-purple-600">
            Clear
          </Link>
        )}
      </form>

      <div className="mt-4 overflow-x-auto rounded-card border border-line bg-white">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-line bg-cream-deep text-left text-[11px] font-bold uppercase tracking-label text-ink-soft">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Exam</th>
              <th className="px-4 py-3">Target</th>
              <th className="px-4 py-3">Latest</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Subscription</th>
              <th className="px-4 py-3">Credits</th>
              <th className="px-4 py-3">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-line last:border-0 hover:bg-cream-deep/60">
                <td className="px-4 py-3">
                  <Link href={`/admin/users/${u.id}`} className="font-semibold text-purple-600 hover:underline">
                    {u.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{u.email}</td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(u.joined)}</td>
                <td className="px-4 py-3 text-ink">{EXAMS[u.examId]?.name ?? u.examId}</td>
                <td className="px-4 py-3 tabular text-ink">{u.targetScore}</td>
                <td className="px-4 py-3 tabular font-semibold text-ink">{u.latestScore}</td>
                <td className="px-4 py-3 text-ink-soft">{u.course}</td>
                <td className="px-4 py-3 text-ink-soft">{u.subscription}</td>
                <td className="px-4 py-3 tabular text-ink">{u.credits}</td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(u.lastActive)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="p-8 text-center text-sm text-ink-soft">조건에 맞는 회원이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
