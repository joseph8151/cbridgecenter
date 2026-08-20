export const metadata = { title: "Privacy | C-BRIDGE" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 md:px-8">
      <span className="kicker">Company</span>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">Privacy Policy</h1>
      <p className="mt-4 leading-relaxed text-ink-soft">
        본 페이지는 데모 환경의 예시 콘텐츠입니다. 실제 서비스에서는 수집
        항목, 이용 목적, 보관 기간을 포함한 정식 개인정보처리방침이
        게시됩니다. 현재 환경에서는 실제 결제 및 개인정보 처리 API가
        연결되어 있지 않습니다.
      </p>
    </div>
  );
}
