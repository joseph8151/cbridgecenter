import { AlertTriangle } from "lucide-react";

export function AiFallback({
  onRetry,
  onViewBasic,
}: {
  onRetry: () => void;
  onViewBasic?: () => void;
}) {
  return (
    <div className="rounded-card border border-weak/30 bg-weak/5 p-6 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-weak/15 text-weak">
        <AlertTriangle size={22} />
      </span>
      <p className="mt-3 font-bold text-ink">분석 결과를 불러오지 못했습니다.</p>
      <p className="mt-1 text-sm text-ink-soft">
        네트워크 문제이거나 일시적인 오류일 수 있습니다. 다시 시도해주세요.
      </p>
      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
        <button
          onClick={onRetry}
          className="rounded-full bg-purple-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
        >
          TRY AGAIN
        </button>
        {onViewBasic && (
          <button
            onClick={onViewBasic}
            className="rounded-full border border-line px-6 py-2.5 text-sm font-bold text-ink hover:border-purple-300"
          >
            VIEW BASIC RESULT
          </button>
        )}
      </div>
    </div>
  );
}
