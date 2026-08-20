export function ScoreDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[11px] leading-relaxed text-ink-soft ${className}`}>
      C-BRIDGE Estimated Score — C-Bridge의 연습 및 모의평가 데이터를 기반으로 산출한
      예상치이며, 실제 시험 결과와 다를 수 있습니다.
    </p>
  );
}
