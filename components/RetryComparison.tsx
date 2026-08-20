import { RubricCriterion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight, TrendingDown, TrendingUp, Minus } from "lucide-react";

export function RetryComparison({
  prevScore,
  nextScore,
  max,
  prevCriteria,
  nextCriteria,
}: {
  prevScore: number;
  nextScore: number;
  max: number;
  prevCriteria: RubricCriterion[];
  nextCriteria: RubricCriterion[];
}) {
  const delta = Math.round((nextScore - prevScore) * 10) / 10;
  const TrendIcon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
  const trendTone = delta > 0 ? "text-success" : delta < 0 ? "text-weak" : "text-ink-soft";

  return (
    <div className="rounded-card border border-line bg-white p-6">
      <div className="flex items-center justify-center gap-8 sm:gap-14">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Previous Attempt
          </p>
          <p className="mt-1 text-3xl font-extrabold text-ink-soft tabular">
            {prevScore}
            <span className="text-sm font-semibold"> / {max}</span>
          </p>
        </div>
        <ArrowRight className="text-purple-300" size={22} />
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
            This Attempt
          </p>
          <p className="mt-1 text-3xl font-extrabold text-purple-600 tabular">
            {nextScore}
            <span className="text-sm font-semibold"> / {max}</span>
          </p>
        </div>
      </div>

      <div className={cn("mt-4 flex items-center justify-center gap-1.5 text-sm font-bold", trendTone)}>
        <TrendIcon size={16} />
        {delta > 0 ? `+${delta} Improvement` : delta < 0 ? `${delta} Change` : "No Change"}
      </div>

      <div className="mt-6 space-y-3 border-t border-line pt-5">
        {nextCriteria.map((c) => {
          const prev = prevCriteria.find((p) => p.key === c.key);
          const d = prev ? Math.round((c.score - prev.score) * 10) / 10 : 0;
          return (
            <div key={c.key} className="flex items-center justify-between text-sm">
              <span className="text-ink-soft">{c.label}</span>
              <span className="flex items-center gap-2 font-semibold tabular">
                <span className="text-ink-soft">{prev?.score ?? "—"}</span>
                <ArrowRight size={12} className="text-purple-300" />
                <span className="text-ink">{c.score}</span>
                {d !== 0 && (
                  <span className={d > 0 ? "text-success" : "text-weak"}>
                    ({d > 0 ? "+" : ""}
                    {d})
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
