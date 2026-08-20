import { DEMO_USER } from "@/lib/data/user";
import { EXAMS } from "@/lib/data/exams";

export const metadata = { title: "Settings | C-BRIDGE" };

export default function MySettingsPage() {
  const exam = EXAMS[DEMO_USER.examId];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Settings</h1>
      <p className="text-sm text-ink-soft">계정 정보입니다.</p>

      <div className="mt-6 max-w-md space-y-4 rounded-card border border-line bg-white p-6">
        <Field label="Name" value={DEMO_USER.name} />
        <Field label="Email" value={DEMO_USER.email} />
        <Field label="Target Exam" value={exam.name} />
        <Field label="Target Score" value={String(DEMO_USER.targetScore)} />
        <Field label="Current Course" value={DEMO_USER.course} />
        <button
          disabled
          className="mt-2 w-full cursor-not-allowed rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink-soft"
        >
          Edit Profile (Demo)
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
