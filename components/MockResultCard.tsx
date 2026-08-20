import { SectionScore } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BookOpen, Headphones, Mic, PenLine } from "lucide-react";

const ICONS = { reading: BookOpen, listening: Headphones, speaking: Mic, writing: PenLine };
const LABELS = { reading: "Reading", listening: "Listening", speaking: "Speaking", writing: "Writing" };

export function MockResultCard({
  section,
  isWeakest,
}: {
  section: SectionScore;
  isWeakest?: boolean;
}) {
  const Icon = ICONS[section.section];
  const pct = Math.round((section.score / section.max) * 100);

  return (
    <div
      className={cn(
        "rounded-card border p-5",
        isWeakest ? "border-weak bg-weak/5" : "border-line bg-white"
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            isWeakest ? "bg-weak/15 text-weak" : "bg-lavender text-purple-600"
          )}
        >
          <Icon size={16} />
        </span>
        {isWeakest && (
          <span className="text-[10px] font-bold uppercase tracking-label text-weak">
            Focus Area
          </span>
        )}
      </div>
      <p className="mt-3 text-xs font-bold uppercase tracking-label text-ink-soft">
        {LABELS[section.section]}
      </p>
      <p className={cn("mt-1 text-3xl font-extrabold tabular", isWeakest ? "text-weak" : "text-ink")}>
        {section.score}
        <span className="text-base font-semibold text-ink-soft"> / {section.max}</span>
      </p>
      <div className="mt-2 h-1.5 w-full rounded-pill bg-purple-100">
        <div
          className={cn("h-1.5 rounded-pill", isWeakest ? "bg-weak" : "bg-purple-600")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
