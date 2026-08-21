import Link from "next/link";
import { DailyTask } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BookOpen, Mic, PenLine, Headphones, Layers, Check } from "lucide-react";

const ICONS = {
  reading: BookOpen,
  listening: Headphones,
  speaking: Mic,
  writing: PenLine,
  vocabulary: Layers,
};

export function hrefFor(task: DailyTask) {
  if (task.linkedSkill === "speaking" && task.questionId) {
    return `/score-lab/speaking/${task.questionId}?fromAcademy=1`;
  }
  if (task.linkedSkill === "writing" && task.questionId) {
    return `/score-lab/writing/${task.questionId}?fromAcademy=1`;
  }
  return "/academy/dashboard";
}

export function DailyTaskCard({ task }: { task: DailyTask }) {
  const Icon = ICONS[task.type];
  const isCurrent = task.status === "in-progress";
  const isDone = task.status === "done";

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-card border p-4 transition-colors",
        isCurrent
          ? "border-purple-600 bg-white shadow-card"
          : isDone
          ? "border-line bg-cream-deep"
          : "border-line bg-white"
      )}
    >
      <span className="text-sm font-extrabold text-purple-300 w-6 shrink-0">
        {String(task.order).padStart(2, "0")}
      </span>
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          isDone ? "bg-success/10 text-success" : "bg-lavender text-purple-600"
        )}
      >
        {isDone ? <Check size={18} /> : <Icon size={18} />}
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn("truncate font-bold text-ink", isDone && "text-ink-soft line-through")}>
          {task.title}
        </p>
        <p className="text-xs text-ink-soft">
          {task.meta ? `${task.meta} · ` : ""}
          {task.durationMin} MIN
        </p>
      </div>
      {isDone ? (
        <span className="shrink-0 text-xs font-bold uppercase tracking-label text-success">
          Done
        </span>
      ) : (
        <Link
          href={hrefFor(task)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-label transition-colors",
            isCurrent
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-lavender text-purple-700 hover:bg-purple-200"
          )}
        >
          Start
        </Link>
      )}
    </div>
  );
}
