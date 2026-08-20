export const metadata = { title: "About | C-BRIDGE" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 md:px-8">
      <span className="kicker">Company</span>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">About C-Bridge</h1>
      <p className="mt-4 leading-relaxed text-ink-soft">
        C-Bridge는 인강 사이트도, 강사 중심의 학원도 아닙니다. 모의고사 →
        AI 분석 → 약점 훈련 → Speaking/Writing 채점 → RETRY → 학습계획 조정 →
        다시 모의고사로 이어지는 C-BRIDGE SCORE LOOP™를 통해 목표점수까지
        관리하는 AI 시험 준비 운영 시스템입니다.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        C-Bridge는 시험 기관과 제휴되지 않은 독립적인 준비 플랫폼이며,
        모의고사는 실전 환경을 반영한 C-Bridge 자체 제작 콘텐츠입니다.
      </p>
    </div>
  );
}
