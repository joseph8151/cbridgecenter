import { notFound } from "next/navigation";
import { scoreLabProductById } from "@/lib/data/scoreLabProducts";
import { formatKRW } from "@/lib/utils";
import { CheckoutForm } from "@/components/CheckoutForm";

export default function ScoreLabCheckoutPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = scoreLabProductById(params.productId);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <span className="kicker">Checkout</span>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">{product.name}</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-6">
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Order Summary
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="font-bold text-ink">{product.name}</p>
            <p className="text-xl font-extrabold text-purple-600">
              {formatKRW(product.price)}
              {product.period && (
                <span className="text-sm text-ink-soft">{product.period}</span>
              )}
            </p>
          </div>
          <p className="mt-2 text-sm text-ink-soft">{product.description}</p>
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm font-bold">
            <span>Total</span>
            <span className="text-purple-600">{formatKRW(product.price)}</span>
          </div>
        </div>

        <CheckoutForm
          productName={product.name}
          priceLabel={formatKRW(product.price)}
          successNext="/score-lab"
          successNextLabel="Try Score Lab"
        />
      </div>
    </div>
  );
}
