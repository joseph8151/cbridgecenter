import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Tone = "gold" | "purple" | "lavender" | "success" | "warn" | "weak" | "outline";

const toneClasses: Record<Tone, string> = {
  gold: "bg-gold-100 text-gold-700",
  purple: "bg-purple-600 text-white",
  lavender: "bg-lavender text-purple-700",
  success: "bg-success/10 text-success",
  warn: "bg-warn/10 text-warn",
  weak: "bg-weak/10 text-weak",
  outline: "border border-line text-ink-soft",
};

export function Badge({
  tone = "lavender",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-[11px] font-bold uppercase tracking-label",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
