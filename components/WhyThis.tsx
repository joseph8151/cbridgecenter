import { Sparkles } from "lucide-react";

export function WhyThis({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex gap-2.5 rounded-xl bg-white/70 p-4">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
        <Sparkles size={12} />
      </span>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-label text-gold-700">Why This?</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{children}</p>
      </div>
    </div>
  );
}
