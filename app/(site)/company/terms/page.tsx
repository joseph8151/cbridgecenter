export const metadata = { title: "Terms | C-BRIDGE" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 md:px-8">
      <span className="kicker">Company</span>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">Terms of Service</h1>
      <p className="mt-4 leading-relaxed text-ink-soft">
        본 페이지는 데모 환경의 예시 콘텐츠입니다. 실제 서비스 출시 전
        정식 이용약관으로 교체됩니다. C-Bridge가 제공하는 모의고사 및 AI
        채점 결과는 실제 시험 결과를 보장하지 않으며, 학습 참고 자료로
        제공됩니다.
      </p>
    </div>
  );
}
