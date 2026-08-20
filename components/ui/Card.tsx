import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Tone = "white" | "cream" | "lavender" | "outline";

const toneClasses: Record<Tone, string> = {
  white: "bg-white border border-line",
  cream: "bg-cream-deep border border-line",
  lavender: "bg-lavender border border-purple-200",
  outline: "bg-white border-2 border-purple-600",
};

export function Card({
  tone = "white",
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { tone?: Tone }) {
  return (
    <div
      className={cn("rounded-card shadow-card", toneClasses[tone], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
