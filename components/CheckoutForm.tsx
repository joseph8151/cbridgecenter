"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "kakao", label: "KakaoPay", icon: null },
  { id: "naver", label: "NaverPay", icon: null },
] as const;

export function CheckoutForm({
  priceLabel,
  successNext,
  successNextLabel,
  productName,
}: {
  priceLabel: string;
  successNext: string;
  successNextLabel: string;
  productName: string;
}) {
  const router = useRouter();
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"]>("card");
  const [loading, setLoading] = useState(false);

  function handlePay() {
    setLoading(true);
    // Mock payment — no real PG is connected. Swap this handler for a real
    // checkout call (Stripe/Toss/KakaoPay SDK) when a PG is integrated.
    setTimeout(() => {
      const params = new URLSearchParams({
        product: productName,
        price: priceLabel,
        next: successNext,
        nextLabel: successNextLabel,
      });
      router.push(`/payment/success?${params.toString()}`);
    }, 900);
  }

  return (
    <div className="rounded-card border border-line bg-white p-6">
      <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
        Payment Method
      </p>
      <div className="mt-3 space-y-2">
        {METHODS.map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-colors",
              method === m.id
                ? "border-purple-600 bg-lavender text-purple-700"
                : "border-line text-ink hover:border-purple-200"
            )}
          >
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full border-2",
                method === m.id ? "border-purple-600" : "border-line"
              )}
            >
              {method === m.id && <span className="h-2 w-2 rounded-full bg-purple-600" />}
            </span>
            {m.icon && <m.icon size={16} />}
            {m.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-ink-soft">
        데모 환경입니다. 실제 결제 API(PG)가 연결되지 않았으며, 아래 버튼은 결제
        흐름을 시뮬레이션합니다.
      </p>

      <button
        onClick={handlePay}
        disabled={loading}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-purple-700 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Processing...
          </>
        ) : (
          `Pay ${priceLabel}`
        )}
      </button>
    </div>
  );
}
