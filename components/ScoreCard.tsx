import { cn } from "@/lib/utils";

export function ScoreCard({
  label,
  value,
  suffix,
  tone = "default",
  emphasis = false,
  className,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  tone?: "default" | "gold" | "weak" | "success";
  emphasis?: boolean;
  className?: string;
}) {
  const valueTone =
    tone === "gold"
      ? "text-gold-600"
      : tone === "weak"
      ? "text-weak"
      : tone === "success"
      ? "text-success"
      : "text-purple-600";

  return (
    <div
      className={cn(
        "rounded-card border border-line bg-white p-5",
        emphasis && "border-purple-600 shadow-card",
        className
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
        {label}
      </p>
      <p className={cn("mt-2 font-extrabold tabular leading-none", "text-4xl", valueTone)}>
        {value}
        {suffix && <span className="ml-1 text-lg font-bold text-ink-soft">{suffix}</span>}
      </p>
    </div>
  );
}
