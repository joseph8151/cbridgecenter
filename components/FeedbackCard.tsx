import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ThumbsUp, TriangleAlert, Lightbulb } from "lucide-react";

type Kind = "well" | "improve" | "tryThis";

const CONFIG: Record<Kind, { label: string; icon: typeof ThumbsUp; tone: string; iconTone: string }> = {
  well: {
    label: "What You Did Well",
    icon: ThumbsUp,
    tone: "border-success/30 bg-success/5",
    iconTone: "bg-success/15 text-success",
  },
  improve: {
    label: "What to Improve",
    icon: TriangleAlert,
    tone: "border-weak/30 bg-weak/5",
    iconTone: "bg-weak/15 text-weak",
  },
  tryThis: {
    label: "Try This Instead",
    icon: Lightbulb,
    tone: "border-gold-300 bg-gold-50",
    iconTone: "bg-gold-100 text-gold-700",
  },
};

export function FeedbackCard({
  kind,
  children,
}: {
  kind: Kind;
  children: ReactNode;
}) {
  const c = CONFIG[kind];
  const Icon = c.icon;
  return (
    <div className={cn("rounded-card border p-5", c.tone)}>
      <div className="flex items-center gap-2">
        <span className={cn("flex h-7 w-7 items-center justify-center rounded-full", c.iconTone)}>
          <Icon size={14} />
        </span>
        <p className="text-[11px] font-bold uppercase tracking-label text-ink">{c.label}</p>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
