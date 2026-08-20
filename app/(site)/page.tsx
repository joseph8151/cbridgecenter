import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  ArrowRight,
  FileCheck2,
  Sparkles,
  GraduationCap,
  SearchCheck,
  Repeat,
  TrendingUp,
} from "lucide-react";

const LOOP_STEPS = [
  { step: "TEST", label: "모의고사 응시", icon: FileCheck2 },
  { step: "FIND", label: "AI 약점 분석", icon: SearchCheck },
  { step: "TRAIN", label: "AI Academy 훈련", icon: GraduationCap },
  { step: "RETRY", label: "다시 도전", icon: Repeat },
  { step: "IMPROVE", label: "점수 성장 확인", icon: TrendingUp },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:items-center md:px-8 md:py-24">
          <div>
            <span className="kicker">AI Test Prep Operating System</span>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-purple-600 sm:text-6xl">
              TEST.
              <br />
              ANALYZE.
              <br />
              IMPROVE.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink">
              시험을 보세요. AI가 분석합니다.
              <br />
              <span className="hl-gold font-semibold">목표점수까지</span> 매일
              훈련합니다.
            </p>
            <p className="mt-3 max-w-md text-sm text-ink-soft">
              TOEFL · IELTS · PTE · Duolingo English Test 등 모의고사부터 AI 채점,
              목표점수 관리까지 하나의 플랫폼에서.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/test-center" size="lg">
                START A MOCK TEST
              </LinkButton>
              <LinkButton href="/try" variant="secondary" size="lg">
                TRY C-BRIDGE FREE
              </LinkButton>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="relative">
            <div className="rounded-card border border-line bg-white p-6 shadow-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
                    TOEFL iBT
                  </p>
                  <p className="text-sm font-bold text-ink">Alex Kim&apos;s Dashboard</p>
                </div>
                <Badge tone="gold">D-37</Badge>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-lavender p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-label text-purple-500">
                    Current
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-purple-600 tabular">82</p>
                </div>
                <div className="rounded-xl bg-cream-deep p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">
                    Target
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-ink tabular">100</p>
                </div>
                <div className="rounded-xl bg-gold-50 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-label text-gold-700">
                    To Go
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-gold-600 tabular">+18</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-ink-soft">
                  <span>AI Progress</span>
                  <span className="tabular text-ink">87 / 100</span>
                </div>
                <ProgressBar value={87} className="mt-2" tone="gold" />
              </div>

              <div className="mt-5 space-y-2 border-t border-line pt-4">
                {[
                  { label: "Speaking", value: 18, flag: true },
                  { label: "Writing", value: 20 },
                  { label: "Reading", value: 24 },
                  { label: "Listening", value: 22 },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">{s.label}</span>
                    <span
                      className={`font-bold tabular ${s.flag ? "text-weak" : "text-ink"}`}
                    >
                      {s.value}
                      {s.flag && " ↓"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-purple-600 px-4 py-3 text-xs font-bold text-white shadow-lift sm:block">
              AI Recommends: Speaking RETRY Today
            </div>
          </div>
        </div>
      </section>

      {/* 5-SECOND UNDERSTANDING */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { n: "01", label: "TEST", desc: "현재 점수를 확인하세요." },
              { n: "02", label: "FIND", desc: "AI가 약점을 분석합니다." },
              { n: "03", label: "TRAIN", desc: "목표점수까지 매일 훈련합니다." },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-4">
                <span className="text-3xl font-extrabold text-purple-200">{s.n}</span>
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-label text-purple-600">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCORE LOOP */}
      <section className="border-y border-line bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">Inside C-Bridge</span>
            <h2 className="mt-3 text-3xl font-extrabold text-ink">
              C-BRIDGE <span className="text-purple-600">SCORE LOOP</span>
              <sup className="ml-0.5 text-sm">™</sup>
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              인강도, 학원도 아닙니다. 목표점수까지 관리하는 AI 시험 준비 운영
              시스템입니다.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {LOOP_STEPS.map((s, i) => (
              <div key={s.step} className="relative flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender text-purple-600">
                  <s.icon size={22} />
                </span>
                <p className="mt-3 text-xs font-extrabold uppercase tracking-label text-purple-600">
                  {s.step}
                </p>
                <p className="mt-1 text-xs text-ink-soft">{s.label}</p>
                {i < LOOP_STEPS.length - 1 && (
                  <ArrowRight
                    size={16}
                    className="absolute -right-2 top-5 hidden text-purple-200 sm:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE SERVICES */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {/* TEST */}
            <div className="flex flex-col rounded-card border border-line bg-white p-7">
              <span className="kicker">Test · Know Your Score</span>
              <h3 className="mt-3 text-xl font-extrabold text-ink">
                C-Bridge Test Center
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                실전 환경을 반영한 온라인 모의고사. Full / Section / Mini Mock으로
                즉시 예상점수와 영역별 약점을 확인하세요.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink">
                <li>· Full Mock · Section Mock · Mini Mock</li>
                <li>· 즉시 예상점수 & 영역별 약점</li>
                <li>· 목표점수 분석</li>
              </ul>
              <LinkButton href="/test-center" variant="outline" className="mt-6">
                START A MOCK TEST
              </LinkButton>
            </div>

            {/* SCORE */}
            <div className="flex flex-col rounded-card border border-purple-200 bg-lavender p-7">
              <span className="kicker">Score · Improve Every Answer</span>
              <h3 className="mt-3 text-xl font-extrabold text-ink">AI Score Lab</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Speaking & Writing 답변을 AI가 분석하고 다시 도전하게 합니다.
              </p>
              <div className="mt-5 rounded-xl border border-purple-200 bg-white p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">Attempt 1</span>
                  <span className="font-bold text-ink-soft">6.0</span>
                </div>
                <div className="my-1 text-center text-purple-300">↓</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">Attempt 2</span>
                  <span className="font-bold text-ink">6.5</span>
                </div>
                <div className="my-1 text-center text-purple-300">↓</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-purple-600">Best</span>
                  <span className="font-extrabold text-gold-600">7.0</span>
                </div>
              </div>
              <LinkButton href="/score-lab" className="mt-6">
                Try Score Lab
              </LinkButton>
            </div>

            {/* TRAIN */}
            <div className="flex flex-col rounded-card border-2 border-purple-600 bg-white p-7">
              <span className="kicker">Train · Your Daily AI Academy</span>
              <h3 className="mt-3 text-xl font-extrabold text-ink">
                C-Bridge AI Academy
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                목표점수와 시험일까지 AI가 매일 공부를 지정합니다.
              </p>
              <div className="mt-5 space-y-2">
                {[
                  ["Reading", "20 min"],
                  ["Speaking", "15 min"],
                  ["Writing", "30 min"],
                  ["Vocabulary", "15 min"],
                ].map(([label, time]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-lg bg-cream-deep px-3 py-2 text-sm"
                  >
                    <span className="text-ink">{label}</span>
                    <span className="font-semibold text-ink-soft">{time}</span>
                  </div>
                ))}
              </div>
              <LinkButton href="/academy" className="mt-6">
                START MY PLAN
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* FREE TRIAL TEASER */}
      <section className="border-t border-line bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="kicker">Before You Commit</span>
              <h2 className="mt-2 text-2xl font-extrabold text-ink">Try C-Bridge Free</h2>
            </div>
            <Link href="/try" className="text-sm font-semibold text-purple-600">
              See all free options →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Link
              href="/try/quick-check"
              className="rounded-card border border-line bg-cream-deep p-5 hover:border-purple-300"
            >
              <p className="font-bold text-ink">Quick Level Check</p>
              <p className="mt-1 text-xs text-ink-soft">3분 · 무료</p>
            </Link>
            <Link
              href="/score-lab/speaking/q-ielts-speak-p1-work?trial=1"
              className="rounded-card border border-line bg-cream-deep p-5 hover:border-purple-300"
            >
              <p className="font-bold text-ink">Speaking Sample Check</p>
              <p className="mt-1 text-xs text-ink-soft">2분 · 무료</p>
            </Link>
            <Link
              href="/test-center"
              className="rounded-card border border-line bg-cream-deep p-5 hover:border-purple-300"
            >
              <p className="font-bold text-ink">Mini Mock</p>
              <p className="mt-1 text-xs text-ink-soft">15–25분 · ₩9,900</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-purple-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <h2 className="text-3xl font-extrabold">
            여기는 강의를 파는 곳이 아니라,
            <br />
            내 시험점수를 관리하는 곳입니다.
          </h2>
          <p className="mt-4 text-sm text-purple-100">
            지금 바로 첫 모의고사를 응시하고 AI 분석 리포트를 받아보세요.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/test-center"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-purple-700 hover:bg-cream"
            >
              START A MOCK TEST
            </Link>
            <Link
              href="/my"
              className="rounded-full border border-purple-300 px-7 py-3.5 text-sm font-bold text-white hover:bg-purple-500"
            >
              My C-Bridge 둘러보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
