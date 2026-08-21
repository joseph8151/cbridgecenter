import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

// `next` comes straight off the URL — only ever follow it if it's a
// same-origin relative path. Anything else (a full URL, `javascript:`, a
// protocol-relative `//host` path) falls back to a safe default instead of
// becoming an open redirect / injected href.
function safeInternalPath(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { product?: string; price?: string; next?: string; nextLabel?: string };
}) {
  const { product = "C-Bridge Product", price = "", nextLabel = "Get Started" } = searchParams;
  const next = safeInternalPath(searchParams.next, "/my");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-5 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 size={32} />
      </span>
      <p className="mt-6 text-[11px] font-bold uppercase tracking-label text-ink-soft">
        Payment Success
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Payment Complete</h1>
      <div className="mt-6 w-full rounded-card border border-line bg-white p-5 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-soft">Product</span>
          <span className="font-semibold text-ink">{product}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-ink-soft">Amount</span>
          <span className="font-bold text-purple-600">{price}</span>
        </div>
      </div>

      <div className="mt-8 flex w-full flex-col gap-3">
        <Link
          href={next}
          className="rounded-full bg-purple-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-purple-700"
        >
          {nextLabel}
        </Link>
        <Link
          href="/my"
          className="rounded-full border border-line px-6 py-3.5 text-sm font-bold text-ink hover:border-purple-300"
        >
          Save for Later
        </Link>
      </div>
    </div>
  );
}
