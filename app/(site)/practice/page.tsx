import Link from "next/link";
import { BANK_QUESTIONS, getQuestions } from "@/lib/data/questionBank";
import { EXAMS } from "@/lib/data/exams";
import { allSkillTags } from "@/lib/data/skillTags";
import { isBookmarked, isCompleted, isCorrect, isIncorrect } from "@/lib/data/mistakes";
import { BankSection, Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BookMarked, Check, X, Circle } from "lucide-react";

export const metadata = { title: "Practice | C-BRIDGE" };

const SECTIONS: BankSection[] = ["reading", "listening", "speaking", "writing"];
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const STATUS_OPTIONS = [
  { key: "completed", label: "Completed" },
  { key: "not-completed", label: "Not Completed" },
  { key: "correct", label: "Correct" },
  { key: "incorrect", label: "Incorrect" },
  { key: "bookmarked", label: "Bookmarked" },
] as const;

// Only surface exams that actually have bank content — an "IELTS General"
// filter chip that always returns zero results would be a dead end.
const EXAM_IDS_WITH_QUESTIONS = [...new Set(BANK_QUESTIONS.map((q) => q.examId))];

function hrefFor(
  sp: Record<string, string | undefined>,
  key: string,
  value: string
) {
  const next = new URLSearchParams(
    Object.entries(sp).filter(([, v]) => v !== undefined) as [string, string][]
  );
  if (next.get(key) === value) next.delete(key);
  else next.set(key, value);
  const qs = next.toString();
  return `/practice${qs ? `?${qs}` : ""}`;
}

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ exam?: string; section?: string; type?: string; difficulty?: string; skill?: string; status?: string }>;
}) {
  const sp = await searchParams;

  let questions = getQuestions({
    examId: sp.exam,
    section: sp.section,
    questionType: sp.type,
    difficulty: sp.difficulty,
    skillTag: sp.skill,
  });

  if (sp.status === "completed") questions = questions.filter((q) => isCompleted(q.id));
  if (sp.status === "not-completed") questions = questions.filter((q) => !isCompleted(q.id));
  if (sp.status === "correct") questions = questions.filter((q) => isCorrect(q.id));
  if (sp.status === "incorrect") questions = questions.filter((q) => isIncorrect(q.id));
  if (sp.status === "bookmarked") questions = questions.filter((q) => isBookmarked(q.id));

  const skillOptions = sp.section ? allSkillTags(sp.section as BankSection) : [
    ...new Set(SECTIONS.flatMap((s) => allSkillTags(s))),
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <span className="kicker">Question Bank</span>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Practice</h1>
      <p className="mt-2 text-ink-soft">
        약점 영역을 골라서 연습하거나, 자유롭게 문제은행을 둘러보세요.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/practice/mistakes" className="flex items-center gap-1.5 text-sm font-semibold text-weak">
          <X size={14} /> My Mistakes
        </Link>
        <Link href="/practice/saved" className="flex items-center gap-1.5 text-sm font-semibold text-gold-600">
          <BookMarked size={14} /> Saved Questions
        </Link>
      </div>

      {/* Filters */}
      <div className="mt-8 space-y-4 rounded-card border border-line bg-white p-5">
        <FilterRow label="Exam">
          {EXAM_IDS_WITH_QUESTIONS.map((id) => (
            <Chip key={id} href={hrefFor(sp, "exam", id)} active={sp.exam === id}>
              {EXAMS[id]?.name ?? id}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Section">
          {SECTIONS.map((s) => (
            <Chip key={s} href={hrefFor(sp, "section", s)} active={sp.section === s}>
              {s[0].toUpperCase() + s.slice(1)}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Difficulty">
          {DIFFICULTIES.map((d) => (
            <Chip key={d} href={hrefFor(sp, "difficulty", d)} active={sp.difficulty === d}>
              {d[0].toUpperCase() + d.slice(1)}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Skill">
          {skillOptions.map((s) => (
            <Chip key={s} href={hrefFor(sp, "skill", s)} active={sp.skill === s}>
              {s}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Status">
          {STATUS_OPTIONS.map((s) => (
            <Chip key={s.key} href={hrefFor(sp, "status", s.key)} active={sp.status === s.key}>
              {s.label}
            </Chip>
          ))}
        </FilterRow>
        {(sp.exam || sp.section || sp.type || sp.difficulty || sp.skill || sp.status) && (
          <Link href="/practice" className="inline-block text-xs font-semibold text-purple-600">
            Clear all filters
          </Link>
        )}
      </div>

      {/* Results */}
      <p className="mt-6 text-sm font-semibold text-ink-soft">{questions.length} Questions</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {questions.map((q) => {
          const correct = isCorrect(q.id);
          const incorrect = isIncorrect(q.id);
          return (
            <Link
              key={q.id}
              href={`/practice/${q.id}`}
              className="flex items-start justify-between gap-3 rounded-card border border-line bg-white p-4 transition-colors hover:border-purple-300"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-pill bg-lavender px-2 py-0.5 text-[10px] font-bold text-purple-700">
                    {EXAMS[q.examId]?.name ?? q.examId}
                  </span>
                  <span className="rounded-pill bg-cream-deep px-2 py-0.5 text-[10px] font-bold uppercase text-ink-soft">
                    {q.difficulty}
                  </span>
                  {isBookmarked(q.id) && <BookMarked size={12} className="text-gold-600" />}
                </div>
                <p className="mt-1.5 truncate text-sm font-bold text-ink">{q.title}</p>
                <p className="mt-0.5 flex flex-wrap gap-1 text-[11px] text-ink-soft">
                  {q.skillTags.join(" · ")}
                </p>
              </div>
              <span className="shrink-0">
                {correct ? (
                  <Check size={16} className="text-success" />
                ) : incorrect ? (
                  <X size={16} className="text-weak" />
                ) : (
                  <Circle size={14} className="text-line" />
                )}
              </span>
            </Link>
          );
        })}
      </div>
      {questions.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink-soft">
          조건에 맞는 문제가 없습니다. 필터를 조정해보세요.
        </p>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-pill border px-3 py-1.5 text-xs font-semibold transition-colors",
        active
          ? "border-purple-600 bg-purple-600 text-white"
          : "border-line text-ink-soft hover:border-purple-300"
      )}
    >
      {children}
    </Link>
  );
}
