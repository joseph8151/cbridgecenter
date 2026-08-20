import Link from "next/link";
import { Gauge, FileCheck2, Mic } from "lucide-react";

export const metadata = { title: "Try C-BRIDGE Free" };

const OPTIONS = [
  {
    icon: Gauge,
    title: "Quick Level Check",
    time: "3 min · Free",
    desc: "3개의 짧은 문제로 대략적인 영어 레벨을 즉시 확인합니다.",
    href: "/try/quick-check",
    cta: "START FREE CHECK",
  },
  {
    icon: Mic,
    title: "Speaking Sample Check",
    time: "2 min · Free",
    desc: "짧은 Speaking 답변을 AI가 즉시 채점하고 피드백을 보여줍니다.",
    href: "/score-lab/speaking/q-ielts-speak-p1-work?trial=1",
    cta: "TRY SPEAKING SAMPLE",
  },
  {
    icon: FileCheck2,
    title: "Mini Mock",
    time: "15–25 min · ₩9,900",
    desc: "가장 낮은 비용으로 실제 예상점수를 받아보는 가장 빠른 방법입니다.",
    href: "/test-center",
    cta: "VIEW MINI MOCK",
  },
];

export default function TryFreePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:px-8">
      <span className="kicker">Try C-Bridge Free</span>
      <h1 className="mt-3 max-w-xl text-4xl font-extrabold leading-tight text-purple-600">
        결제 전에, 먼저 체험해보세요.
      </h1>
      <p className="mt-3 max-w-lg text-ink-soft">
        아래 세 가지 중 하나를 무료로 시작할 수 있습니다. 결과를 받은 후
        자연스럽게 다음 단계를 안내해드립니다.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {OPTIONS.map((o) => (
          <div key={o.title} className="flex flex-col rounded-card border border-line bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lavender text-purple-600">
              <o.icon size={20} />
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-label text-gold-600">
              {o.time}
            </p>
            <p className="mt-2 flex-1 text-sm text-ink-soft">{o.desc}</p>
            <Link
              href={o.href}
              className="mt-6 rounded-full bg-purple-600 px-5 py-3 text-center text-sm font-bold text-white hover:bg-purple-700"
            >
              {o.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
