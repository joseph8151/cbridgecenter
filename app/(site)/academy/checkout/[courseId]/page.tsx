import { notFound } from "next/navigation";
import { courseById } from "@/lib/data/academy";
import { formatKRW } from "@/lib/utils";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Check } from "lucide-react";

export default function AcademyCheckoutPage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = courseById(params.courseId);
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <span className="kicker">Checkout</span>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">{course.name}</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-6">
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Order Summary
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="font-bold text-ink">{course.name}</p>
            <div className="text-right">
              <p className="text-sm text-ink-soft line-through">{formatKRW(course.listPrice)}</p>
              <p className="text-xl font-extrabold text-purple-600">
                {formatKRW(course.launchPrice)}
              </p>
            </div>
          </div>
          <p className="mt-1 text-sm text-ink-soft">{course.tagline}</p>
          <ul className="mt-5 space-y-2 border-t border-line pt-4">
            {course.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink">
                <Check size={15} className="mt-0.5 shrink-0 text-success" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm font-bold">
            <span>Total</span>
            <span className="text-purple-600">{formatKRW(course.launchPrice)}</span>
          </div>
        </div>

        <CheckoutForm
          productName={course.name}
          priceLabel={formatKRW(course.launchPrice)}
          successNext={`/academy/onboarding?course=${course.id}`}
          successNextLabel="Start Onboarding"
        />
      </div>
    </div>
  );
}
