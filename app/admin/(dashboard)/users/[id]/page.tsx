import { notFound } from "next/navigation";
import Link from "next/link";
import { ADMIN_USERS, ADMIN_PAYMENTS } from "@/lib/data/admin";
import { EXAMS } from "@/lib/data/exams";
import { DEMO_USER, MOCK_HISTORY, SPEAKING_HISTORY, WRITING_HISTORY } from "@/lib/data/user";
import { AdminUserControls } from "@/components/admin/AdminUserControls";
import { daysUntil, formatDate, formatKRW } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = ADMIN_USERS.find((u) => u.id === id);
  if (!user) notFound();

  const exam = EXAMS[user.examId];
  const payments = ADMIN_PAYMENTS.filter((p) => p.userId === user.id);
  // Alex Kim (u1) is the app's one fully-seeded demo profile — Mock/Score Lab
  // history is real for that user. Other rows are list-view-only demo data,
  // so their detail pages show the fields we have rather than fabricating
  // full histories for eight separate synthetic students.
  const isFullySeeded = user.id === "u1" && user.email === DEMO_USER.email;

  return (
    <div>
      <Link href="/admin/users" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <ArrowLeft size={13} /> Users
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">{user.name}</h1>
          <p className="text-sm text-ink-soft">{user.email}</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-pill bg-lavender px-3 py-1.5 font-bold text-purple-700">{exam?.name}</span>
          <span className="rounded-pill bg-cream-deep px-3 py-1.5 font-bold text-ink-soft">{user.subscription}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-card border border-line bg-white p-5">
            <p className="font-bold text-ink">Profile</p>
            <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Field label="Target Score" value={String(user.targetScore)} />
              <Field label="Latest Score" value={String(user.latestScore)} />
              <Field label="Current Course" value={user.course} />
              <Field label="Credits" value={String(user.credits)} />
              <Field label="Joined" value={formatDate(user.joined)} />
              <Field label="Last Active" value={formatDate(user.lastActive)} />
              {isFullySeeded && (
                <Field label="D-Day" value={`D-${daysUntil(DEMO_USER.examDate)}`} />
              )}
              {isFullySeeded && <Field label="Study Streak" value={`${DEMO_USER.studyStreak} Days`} />}
            </div>
          </div>

          {isFullySeeded ? (
            <>
              <div className="rounded-card border border-line bg-white p-5">
                <p className="font-bold text-ink">Mock History</p>
                <div className="mt-3 space-y-1.5">
                  {[...MOCK_HISTORY].reverse().map((m) => (
                    <div key={m.id} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-cream-deep">
                      <span className="text-ink-soft">{formatDate(m.date)} · {m.type} Mock</span>
                      <span className="font-bold tabular text-ink">{m.estimatedScore} / {m.scoreMax}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-card border border-line bg-white p-5">
                <p className="font-bold text-ink">Score Lab History</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">Speaking</p>
                    {[...SPEAKING_HISTORY].reverse().map((a) => (
                      <div key={a.id} className="flex items-center justify-between px-1 py-1 text-sm">
                        <span className="text-ink-soft">Attempt {a.attemptNumber} · {formatDate(a.date)}</span>
                        <span className="font-bold tabular text-ink">{a.overallScore}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">Writing</p>
                    {[...WRITING_HISTORY].reverse().map((a) => (
                      <div key={a.id} className="flex items-center justify-between px-1 py-1 text-sm">
                        <span className="text-ink-soft">Attempt {a.attemptNumber} · {formatDate(a.date)}</span>
                        <span className="font-bold tabular text-ink">{a.overallScore}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-card border border-dashed border-line bg-cream-deep p-5 text-sm text-ink-soft">
              이 데모 계정은 목록용 요약 데이터만 시딩되어 있습니다. 전체 Mock/Score Lab 기록은 Alex
              Kim 계정에서만 확인할 수 있습니다.
            </div>
          )}

          <div className="rounded-card border border-line bg-white p-5">
            <p className="font-bold text-ink">Payment History</p>
            {payments.length === 0 ? (
              <p className="mt-2 text-sm text-ink-soft">결제 내역이 없습니다.</p>
            ) : (
              <div className="mt-3 space-y-1.5">
                {payments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-cream-deep">
                    <span className="text-ink-soft">{formatDate(p.date)} · {p.product} ({p.method})</span>
                    <span className="flex items-center gap-2">
                      <span className="font-bold tabular text-ink">{formatKRW(p.amount)}</span>
                      <span
                        className={`rounded-pill px-2 py-0.5 text-[10px] font-bold uppercase ${
                          p.status === "Paid"
                            ? "bg-success/10 text-success"
                            : p.status === "Refunded"
                            ? "bg-warn/10 text-warn"
                            : "bg-weak/10 text-weak"
                        }`}
                      >
                        {p.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <AdminUserControls user={user} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
