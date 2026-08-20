import { EXAM_LIST } from "@/lib/data/exams";
import { ExamCard } from "@/components/ExamCard";

export const metadata = { title: "Test Center | C-BRIDGE" };

export default function TestCenterPage() {
  return (
    <div>
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <span className="kicker">C-Bridge Test Center</span>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight text-purple-600">
            Know Your Score.
          </h1>
          <p className="mt-4 max-w-xl text-ink-soft">
            실전 환경을 반영한 온라인 모의고사. 응시 즉시 예상점수와 영역별 약점을
            확인하고 다음 학습 방향을 받아보세요.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EXAM_LIST.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-3 md:px-8">
          {[
            {
              title: "Mini Mock",
              desc: "15–25분, 빠른 실력 확인",
            },
            {
              title: "Section Mock",
              desc: "30–60분, 한 영역 집중 테스트",
            },
            {
              title: "Full Mock",
              desc: "2–3시간, 실전형 전체 시험 + AI 분석",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-card border border-line p-6">
              <p className="text-[11px] font-bold uppercase tracking-label text-gold-600">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
