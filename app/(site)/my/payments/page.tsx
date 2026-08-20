import { formatKRW } from "@/lib/utils";
import { CreditCard } from "lucide-react";

export const metadata = { title: "Payments | C-BRIDGE" };

const PAYMENT_HISTORY = [
  { id: "p1", date: "2026-08-05", item: "4-WEEK TARGET", price: 249000, method: "Card" },
  { id: "p2", date: "2026-08-01", item: "Speaking + Writing", price: 17900, method: "KakaoPay" },
  { id: "p3", date: "2026-07-22", item: "TOEFL Full Mock", price: 39000, method: "Card" },
  { id: "p4", date: "2026-07-15", item: "TOEFL Full Mock", price: 39000, method: "NaverPay" },
  { id: "p5", date: "2026-07-01", item: "TOEFL Full Mock", price: 39000, method: "Card" },
];

export default function MyPaymentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Payments</h1>
      <p className="text-sm text-ink-soft">결제 내역입니다. (데모 데이터)</p>

      <div className="mt-6 space-y-2.5">
        {PAYMENT_HISTORY.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-4 rounded-card border border-line bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lavender text-purple-600">
                <CreditCard size={16} />
              </span>
              <div>
                <p className="font-bold text-ink">{p.item}</p>
                <p className="text-xs text-ink-soft">
                  {p.date} · {p.method}
                </p>
              </div>
            </div>
            <p className="text-lg font-extrabold text-ink">{formatKRW(p.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
