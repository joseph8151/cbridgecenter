import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Faq } from "@/components/Faq";
import { HOME_FAQ } from "@/lib/data/faq";
import { DEMO_TESTIMONIALS } from "@/lib/data/testimonials";
import {
  ArrowRight,
  FileCheck2,
  Sparkles,
  GraduationCap,
  SearchCheck,
  Repeat,
  TrendingUp,
  Quote,
  Check,
} from "lucide-react";

const COMPARISON_ROWS = [
  { label: "중심", generic: "강의 수강", cbridge: "점수 관리" },
  { label: "학습 계획", generic: "내가 직접 짜거나 일괄 커리큘럼", cbridge: "AI가 매일 개인화" },
  { label: "Speaking/Writing", generic: "사람 첨삭 or 없음", cbridge: "AI 채점 + 즉시 RETRY" },
  { label: "약점 파악", generic: "모호", cbridge: "수치화 + 다음 액션까지" },
];

const NOT_A_TOOL = [
  { who: "강의", does: "지식을 전달합니다" },
  { who: "학원", does: "커리큘럼을 제공합니다" },
  { who: "C-Bridge", does: "점수 그 자체를 운영합니다" },
];

const SYSTEM_VS_CONTENT = [
  "모의고사 결과를 즉시 진단 데이터로 전환",
  "Speaking·Writing 답변을 AI가 채점하고 개선 지점을 특정",
  "목표 점수와 남은 기간을 기준으로 매일의 학습량을 자동 배정",
  "재도전(RETRY)을 통해 실제 점수 상승을 검증",
];

const SCORE_LAB_METHOD = [
  "현재 답변의 강점과 약점을 영역별로 분리",
  "개선이 필요한 지점을 구체적으로 제시",
  "동일 문항에 대한 재도전을 통해 점수 변화를 실시간 추적",
];

const LOOP_STEPS = [
  { step: "TEST", label: "실제 시험 환경에서 현재 위치 확인", icon: FileCheck2 },
  { step: "FIND", label: "영역별·문항별 약점을 수치로 분석", icon: SearchCheck },
  { step: "TRAIN", label: "약점에 맞는 매일 미션 자동 배정", icon: GraduationCap },
  { step: "RETRY", label: "Speaking/Writing 재도전으로 개선 확인", icon: Repeat },
  { step: "IMPROVE", label: "점수 변화와 성장 리포트 확인", icon: TrendingUp },
];

const AUDIENCE_FIT = [
  "시험까지 2~12주 남았는데 점수가 정체된 분",
  "학원/인강은 들었는데 실제 점수로 연결이 안 되는 분",
  "Speaking·Writing에서 계속 같은 실수를 반복하는 분",
  "“오늘 뭐 공부하지?” 고민하는 시간이 아까운 분",
  "혼자 공부하지만 방향이 없는 분",
  "목표 점수와 현재 점수 차이가 큰 분 (특히 +15점 이상)",
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
            <p className="mt-6 max-w-md text-lg font-semibold leading-relaxed text-ink">
              인강은 &lsquo;강의&rsquo;를 팔고, 학원은 &lsquo;자리&rsquo;를 팝니다.
              <br />
              <span className="hl-gold">C-Bridge는 &lsquo;점수&rsquo;를 관리합니다.</span>
            </p>
            <p className="mt-3 max-w-md text-sm text-ink-soft">
              매일 무엇을 공부할지 고민하지 마세요. AI가 당신의 현재 점수, 목표
              점수, 남은 기간을 기준으로 오늘 해야 할 훈련만 정확히
              지정합니다.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-ink">
              <li>모의고사 → 즉시 약점 분석</li>
              <li>Speaking/Writing → AI 채점 + 재도전</li>
              <li>매일 학습 플랜 → 목표점수까지 자동 관리</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/test-center" size="lg">
                START A MOCK TEST
              </LinkButton>
              <LinkButton href="/try" variant="secondary" size="lg">
                TRY C-BRIDGE FREE
              </LinkButton>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-label text-purple-500">
              강의 듣는 시간이 아니라, 점수가 오르는 시간만 남기세요.
            </p>
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

      {/* NOT A STUDY TOOL */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <span className="kicker mx-auto w-fit">Not a Study Tool</span>
          <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
            학습 도구가 아니라, 점수를 운영하는 시스템입니다.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {NOT_A_TOOL.map((row) => (
              <div key={row.who} className="rounded-card border border-line bg-cream-deep p-4">
                <p className="text-sm font-extrabold text-purple-600">{row.who}</p>
                <p className="mt-1 text-sm text-ink-soft">{row.does}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink-soft">
            현재 점수에서 목표 점수까지의 간극을 데이터로 측정하고, 약점을
            수치화하며, 매일의 학습을 목표에 최적화합니다.
          </p>
          <p className="mt-4 text-sm font-bold text-purple-600">
            C-Bridge는 &lsquo;공부하는 도구&rsquo;가 아닙니다. 시험 준비의 전
            과정을 관리하는 AI Operating System입니다.
          </p>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="border-y border-line bg-lavender/40 py-14">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">Is This You?</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
              C-Bridge는 &lsquo;열심히&rsquo;가 아니라 &lsquo;정확히&rsquo; 공부하게
              만듭니다.
            </h2>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {AUDIENCE_FIT.map((item) => (
              <li
                key={item}
                className="rounded-card border border-purple-200 bg-white p-4 text-sm font-semibold text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-ink-soft">
            감정이나 동기부여가 아닌, 데이터와 시스템으로 점수를 관리하고자
            하는 분에게 적합합니다.
          </p>
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
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink">
              단순 반복이 아닙니다. 매 사이클마다 데이터가 쌓이고, AI가 학습
              방향을 미세 조정합니다.
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
          <p className="mx-auto mt-10 max-w-xl text-center text-sm font-semibold text-purple-600">
            이 루프가 반복될수록, 당신의 학습은 점점 더 &lsquo;개인화&rsquo;됩니다.
          </p>
        </div>
      </section>

      {/* WHY THE LOOP WORKS */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <span className="kicker mx-auto w-fit">Why It Works</span>
          <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
            영어 시험 점수는 단순히 &lsquo;더 많이 공부한다&rsquo;고 오르지
            않습니다.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
            현재 위치를 정확히 측정하고, 약점을 우선순위에 따라 공략하며,
            개선 여부를 검증하는 과정이 반복될 때 점수는 상승합니다.
            <br />
            C-Bridge는 이 과정을 수험생이 직접 설계하지 않아도 되도록
            설계되었습니다. AI가 진단하고, 배정하고, 검증합니다.
          </p>
          <p className="mt-4 text-sm font-bold text-purple-600">
            결과적으로 수험생은 &lsquo;무엇을 공부할지&rsquo;가 아니라
            &lsquo;오늘 배정된 훈련을 수행하는 것&rsquo;에만 집중할 수
            있습니다.
          </p>
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
                Speaking과 Writing은 &lsquo;감&rsquo;으로 오르지 않습니다. AI가
                채점하고, 틀린 이유를 알려주고, 다시 도전하게 만듭니다.
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
              <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                &ldquo;어느 부분이 약했는지&rdquo;를 정확히 알고 나서 고치는 것과
                그냥 다시 말하는 것은 완전히 다릅니다.
              </p>
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

      {/* SCORE LAB METHODOLOGY */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">Score Lab Methodology</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
              Speaking과 Writing은 주관적 영역이 아닙니다.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
              명확한 채점 기준이 존재하며, 그 기준을 정확히 이해하고 반복
              적용하는 사람이 점수를 올립니다.
            </p>
          </div>
          <div className="mt-8 rounded-card border border-line bg-cream-deep p-6">
            <p className="text-sm font-bold text-ink">
              C-Bridge AI Score Lab은 답변을 단순히 평가하지 않습니다.
            </p>
            <ul className="mt-4 space-y-2.5">
              {SCORE_LAB_METHOD.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check size={16} className="mt-0.5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-center text-sm font-semibold text-purple-600">
            한 번의 첨삭이 아닌, 반복 가능한 개선 시스템을 제공합니다.
          </p>
        </div>
      </section>

      {/* SYSTEM VS CONTENT */}
      <section className="border-y border-line bg-cream py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">Content vs. System</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
              대부분의 영어 시험 준비는 콘텐츠 중심입니다.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
              더 많은 강의, 더 많은 문제, 더 많은 시간을 투입합니다.{" "}
              <span className="font-bold text-purple-600">
                C-Bridge는 시스템 중심입니다.
              </span>
            </p>
          </div>
          <div className="mt-8 rounded-card border border-purple-200 bg-white p-6">
            <ul className="space-y-2.5">
              {SYSTEM_VS_CONTENT.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check size={16} className="mt-0.5 shrink-0 text-purple-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-ink-soft">
            학습의 효율은 노력의 양이 아니라, 피드백 루프의 정밀도에서
            결정됩니다.{" "}
            <span className="font-bold text-purple-600">
              C-Bridge는 그 루프를 자동화합니다.
            </span>
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">Why C-Bridge</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink">
              일반 학원/인강과 무엇이 다른가요?
            </h2>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-card border border-line text-sm">
              <thead>
                <tr className="bg-cream-deep text-left">
                  <th className="px-5 py-3.5 font-bold text-ink">구분</th>
                  <th className="px-5 py-3.5 text-center font-bold text-ink-soft">
                    일반 학원/인강
                  </th>
                  <th className="px-5 py-3.5 text-center font-bold text-purple-600">
                    C-Bridge
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-t border-line bg-white ${i % 2 === 1 ? "bg-cream/60" : ""}`}
                  >
                    <td className="px-5 py-3.5 font-semibold text-ink-soft">{row.label}</td>
                    <td className="px-5 py-3.5 text-center text-ink-soft">{row.generic}</td>
                    <td className="px-5 py-3.5 text-center font-bold text-purple-700">
                      {row.cbridge}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-y border-line bg-cream py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">From C-Bridge Users</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink">
              강의 듣는 시간이 아니라, 점수가 움직이는 시간이 늘어납니다.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {DEMO_TESTIMONIALS.map((t) => (
              <div key={t.id} className="rounded-card border border-line bg-white p-6">
                <Quote size={18} className="text-purple-300" />
                <p className="mt-3 text-sm leading-relaxed text-ink">{t.quote}</p>
                <p className="mt-4 text-xs font-semibold text-ink-soft">{t.context}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[11px] text-ink-soft">
            Demo Testimonials — 서비스 개발 단계의 예시 콘텐츠입니다.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center">
            <span className="kicker mx-auto w-fit">FAQ</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink">자주 묻는 질문</h2>
          </div>
          <div className="mt-8">
            <Faq items={HOME_FAQ} />
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
            <br />
            강의 목록을 뒤적이는 대신, 당신의 점수부터 확인하는 게 가장 빠른
            시작입니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/try"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-purple-700 hover:bg-cream"
            >
              무료로 시작하기
            </Link>
            <Link
              href="/test-center"
              className="rounded-full border border-purple-300 px-7 py-3.5 text-sm font-bold text-white hover:bg-purple-500"
            >
              첫 모의고사 응시하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
