import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max = 100,
  tone = "purple",
  className,
  trackClassName,
}: {
  value: number;
  max?: number;
  tone?: "purple" | "gold" | "success";
  className?: string;
  trackClassName?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const toneClass =
    tone === "gold" ? "bg-gold-500" : tone === "success" ? "bg-success" : "bg-purple-600";
  return (
    <div className={cn("h-2 w-full rounded-pill bg-purple-100", trackClassName, className)}>
      <div
        className={cn("h-2 rounded-pill transition-all", toneClass)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
