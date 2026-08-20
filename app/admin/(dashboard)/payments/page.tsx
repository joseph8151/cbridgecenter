"use client";

import { useState } from "react";
import { ADMIN_PAYMENTS, AdminPayment } from "@/lib/data/admin";
import { formatKRW, formatDate, cn } from "@/lib/utils";

const STATUS_TONE: Record<AdminPayment["status"], string> = {
  Paid: "bg-success/10 text-success",
  Refunded: "bg-warn/10 text-warn",
  Failed: "bg-weak/10 text-weak",
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState(ADMIN_PAYMENTS);

  function refund(id: string) {
    setPayments((ps) => ps.map((p) => (p.id === id ? { ...p, status: "Refunded" as const } : p)));
  }

  function cancel(id: string) {
    setPayments((ps) => ps.filter((p) => p.id !== id));
  }

  const total = payments.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Payments</h1>
      <p className="text-sm text-ink-soft">
        총 {formatKRW(total)} (Paid 상태 기준) · Demo Mode — 환불/취소는 이 세션에서만 반영됩니다.
      </p>

      <div className="mt-4 overflow-x-auto rounded-card border border-line bg-white">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-line bg-cream-deep text-left text-[11px] font-bold uppercase tracking-label text-ink-soft">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0 hover:bg-cream-deep/60">
                <td className="px-4 py-3 font-semibold text-ink">{p.userName}</td>
                <td className="px-4 py-3 text-ink-soft">{p.product}</td>
                <td className="px-4 py-3 tabular font-bold text-ink">{formatKRW(p.amount)}</td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(p.date)}</td>
                <td className="px-4 py-3 text-ink-soft">{p.method}</td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-pill px-2.5 py-1 text-[10px] font-bold uppercase", STATUS_TONE[p.status])}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {p.status === "Paid" && (
                      <button onClick={() => refund(p.id)} className="text-xs font-bold text-warn hover:underline">
                        Refund
                      </button>
                    )}
                    <button onClick={() => cancel(p.id)} className="text-xs font-bold text-weak hover:underline">
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
