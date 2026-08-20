import { cn, formatKRW } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { ReactNode } from "react";

export function PricingCard({
  eyebrow,
  name,
  price,
  listPrice,
  period,
  description,
  features,
  badge,
  href,
  ctaLabel = "Get Started",
  tone = "white",
  footnote,
}: {
  eyebrow?: string;
  name: string;
  price: string;
  listPrice?: string;
  period?: string;
  description?: string;
  features?: string[];
  badge?: string;
  href: string;
  ctaLabel?: string;
  tone?: "white" | "cream" | "lavender" | "outline";
  footnote?: ReactNode;
}) {
  const toneClass =
    tone === "cream"
      ? "bg-cream-deep border-line"
      : tone === "lavender"
      ? "bg-lavender border-purple-200"
      : tone === "outline"
      ? "bg-white border-2 border-purple-600"
      : "bg-white border-line";

  return (
    <div
      className={cn(
        "flex flex-col rounded-card border p-7 shadow-card",
        toneClass,
        badge && "relative"
      )}
    >
      {badge && (
        <Badge tone="gold" className="absolute -top-3 left-7">
          {badge}
        </Badge>
      )}
      {eyebrow && (
        <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
          {eyebrow}
        </p>
      )}
      <h3 className="mt-2 text-xl font-extrabold text-ink">{name}</h3>
      {description && <p className="mt-1 text-sm text-ink-soft">{description}</p>}

      <div className="mt-5 flex items-baseline gap-2">
        {listPrice && (
          <span className="text-sm text-ink-soft line-through">{listPrice}</span>
        )}
        <span className="text-3xl font-extrabold text-purple-600">{price}</span>
        {period && <span className="text-sm text-ink-soft">{period}</span>}
      </div>

      {features && (
        <ul className="mt-6 flex-1 space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-ink">
              <Check size={16} className="mt-0.5 shrink-0 text-success" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <LinkButton href={href} className="mt-7 w-full" variant={tone === "outline" ? "outline" : "primary"}>
        {ctaLabel}
      </LinkButton>
      {footnote}
    </div>
  );
}

export function priceFmt(n: number) {
  return formatKRW(n);
}
