export const metadata = { title: "Support | C-BRIDGE" };

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 md:px-8">
      <span className="kicker">Resources</span>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">Support</h1>
      <p className="mt-4 text-ink-soft leading-relaxed">
        결제, 학습 계획, 채점 결과와 관련해 궁금한 점이 있다면 아래 채널로
        문의해주세요.
      </p>
      <div className="mt-8 space-y-3">
        <div className="rounded-card border border-line bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">Email</p>
          <p className="mt-1 font-semibold text-ink">support@cbridgecenter.com</p>
        </div>
        <div className="rounded-card border border-line bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Response Time
          </p>
          <p className="mt-1 font-semibold text-ink">영업일 기준 1–2일 이내 답변</p>
        </div>
      </div>
    </div>
  );
}
