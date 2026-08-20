import { notFound } from "next/navigation";
import { EXAMS, mockProductsForExam } from "@/lib/data/exams";
import { formatKRW } from "@/lib/utils";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Check } from "lucide-react";

export default function TestCenterCheckoutPage({
  params,
}: {
  params: { productId: string };
}) {
  const examId = params.productId.split("-").slice(0, -1).join("-");
  const exam = EXAMS[examId];
  const product = mockProductsForExam(examId).find((p) => p.id === params.productId);
  if (!exam || !product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <span className="kicker">Checkout</span>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">
        {exam.name} — {product.name}
      </h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-6">
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Order Summary
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="font-bold text-ink">{product.name}</p>
            <p className="text-xl font-extrabold text-purple-600">
              {formatKRW(product.price)}
            </p>
          </div>
          <p className="mt-1 text-sm text-ink-soft">{product.duration}</p>
          {product.features && (
            <ul className="mt-5 space-y-2 border-t border-line pt-4">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink">
                  <Check size={15} className="mt-0.5 shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm font-bold">
            <span>Total</span>
            <span className="text-purple-600">{formatKRW(product.price)}</span>
          </div>
        </div>

        <CheckoutForm
          productName={`${exam.name} ${product.name}`}
          priceLabel={formatKRW(product.price)}
          successNext={`/test-center/take/${exam.id}?type=${product.type}`}
          successNextLabel="Start Test Demo"
        />
      </div>
    </div>
  );
}
