"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { mockExamItemsFor } from "@/lib/data/mockExam";
import { EXAMS } from "@/lib/data/exams";
import { Modal } from "@/components/ui/Modal";
import { formatMMSS, cn } from "@/lib/utils";
import { Flag, Mic, Play, RotateCcw, Square } from "lucide-react";

const TOTAL_SECONDS = 20 * 60;

export default function TakeTestPage() {
  const params = useParams<{ examId: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const exam = EXAMS[params.examId];
  const type = search.get("type") ?? "full";

  const items = useMemo(() => (exam ? mockExamItemsFor(exam.id) : []), [exam]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [recorded, setRecorded] = useState<Record<string, boolean>>({});
  const [recording, setRecording] = useState(false);

  const item = items[index];
  const answeredCount =
    Object.keys(answers).length + Object.values(recorded).filter(Boolean).length;

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining((r) => {
        const next = Math.max(0, r - 1);
        if (next === 0) setConfirmOpen(true);
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  function selectChoice(choice: string) {
    setAnswers((a) => ({ ...a, [item.id]: choice }));
  }

  function toggleFlag() {
    setFlagged((f) => {
      const next = new Set(f);
      next.has(item.id) ? next.delete(item.id) : next.add(item.id);
      return next;
    });
  }

  function submitTest() {
    const performance = Math.min(0.95, 0.5 + (answeredCount / items.length) * 0.4);
    const p = new URLSearchParams({
      type,
      performance: performance.toFixed(2),
    });
    router.push(`/test-center/result/${exam?.id}?${p.toString()}`);
  }

  if (!exam) return null;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar
        index={index}
        total={items.length}
        remaining={remaining}
        onSubmit={() => setConfirmOpen(true)}
      />

      <div className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 md:px-8">
        {item.section === "reading" && (
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-card border border-line bg-cream p-6">
              <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
                Passage
              </p>
              <h2 className="mt-2 font-bold text-ink">{item.passageTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.passage}</p>
            </div>
            <QuestionPanel
              question={item.question}
              choices={item.choices}
              selected={answers[item.id]}
              onSelect={selectChoice}
            />
          </div>
        )}

        {item.section === "listening" && (
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-card border border-line bg-cream p-6">
              <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">
                Audio
              </p>
              <h2 className="mt-2 font-bold text-ink">{item.audioTitle}</h2>
              <button className="mt-4 flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700">
                <Play size={14} /> Play Audio
              </button>
              <p className="mt-4 text-xs text-ink-soft">
                (Demo audio player — {item.transcriptHint})
              </p>
            </div>
            <QuestionPanel
              question={item.question}
              choices={item.choices}
              selected={answers[item.id]}
              onSelect={selectChoice}
            />
          </div>
        )}

        {item.section === "speaking" && (
          <SpeakingStep
            prompt={item.prompt}
            prepSeconds={item.prepSeconds}
            answerSeconds={item.answerSeconds}
            recording={recording}
            setRecording={setRecording}
            recorded={!!recorded[item.id]}
            onRecorded={() => setRecorded((r) => ({ ...r, [item.id]: true }))}
            onReset={() => setRecorded((r) => ({ ...r, [item.id]: false }))}
          />
        )}

        {item.section === "writing" && (
          <WritingStep
            prompt={item.prompt}
            seconds={item.seconds}
            wordLimit={item.wordLimit}
            value={answers[item.id] ?? ""}
            onChange={(v) => setAnswers((a) => ({ ...a, [item.id]: v }))}
          />
        )}
      </div>

      <BottomBar
        index={index}
        total={items.length}
        flagged={flagged.has(item.id)}
        onFlag={toggleFlag}
        onPrev={() => setIndex((i) => Math.max(0, i - 1))}
        onNext={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
        onSubmit={() => setConfirmOpen(true)}
      />

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Submit Test?">
        <p className="text-sm text-ink-soft">
          {answeredCount} / {items.length} questions answered. Once submitted, you
          cannot return to this test session.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setConfirmOpen(false)}
            className="flex-1 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink"
          >
            Continue Test
          </button>
          <button
            onClick={submitTest}
            className="flex-1 rounded-full bg-purple-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
          >
            Submit Test
          </button>
        </div>
      </Modal>
    </div>
  );
}

function TopBar({
  index,
  total,
  remaining,
  onSubmit,
}: {
  index: number;
  total: number;
  remaining: number;
  onSubmit: () => void;
}) {
  return (
    <div className="border-b border-line bg-purple-600 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 md:px-8">
        <p className="text-xs font-bold uppercase tracking-label">C-Bridge Test Center</p>
        <div className="flex items-center gap-5 text-sm font-semibold">
          <span className="tabular">
            Question {index + 1} / {total}
          </span>
          <span className="tabular">Remaining {formatMMSS(remaining)}</span>
          <button
            onClick={onSubmit}
            className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-purple-700 hover:bg-cream"
          >
            Submit Test
          </button>
        </div>
      </div>
      <div className="h-1 w-full bg-purple-500">
        <div
          className="h-1 bg-gold-500 transition-all"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function BottomBar({
  index,
  total,
  flagged,
  onFlag,
  onPrev,
  onNext,
  onSubmit,
}: {
  index: number;
  total: number;
  flagged: boolean;
  onFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="sticky bottom-0 border-t border-line bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-8">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-40"
        >
          Previous
        </button>
        <button
          onClick={onFlag}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold",
            flagged ? "bg-gold-100 text-gold-700" : "text-ink-soft hover:bg-cream-deep"
          )}
        >
          <Flag size={14} /> Review
        </button>
        {index === total - 1 ? (
          <button
            onClick={onSubmit}
            className="rounded-full bg-purple-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={onNext}
            className="rounded-full bg-purple-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

function QuestionPanel({
  question,
  choices,
  selected,
  onSelect,
}: {
  question: string;
  choices: string[];
  selected?: string;
  onSelect: (c: string) => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">Question</p>
      <h2 className="mt-2 font-bold text-ink">{question}</h2>
      <div className="mt-4 space-y-2.5">
        {choices.map((c, i) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
              selected === c
                ? "border-purple-600 bg-lavender text-purple-700 font-semibold"
                : "border-line text-ink hover:border-purple-200"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold",
                selected === c ? "border-purple-600 bg-purple-600 text-white" : "border-line"
              )}
            >
              {String.fromCharCode(65 + i)}
            </span>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function SpeakingStep({
  prompt,
  prepSeconds,
  answerSeconds,
  recording,
  setRecording,
  recorded,
  onRecorded,
  onReset,
}: {
  prompt: string;
  prepSeconds: number;
  answerSeconds: number;
  recording: boolean;
  setRecording: (v: boolean) => void;
  recorded: boolean;
  onRecorded: () => void;
  onReset: () => void;
}) {
  const [phase, setPhase] = useState<"prep" | "answer" | "done">(recorded ? "done" : "prep");
  const [time, setTime] = useState(prepSeconds);

  useEffect(() => {
    if (phase === "done") return;
    const t = setInterval(() => {
      setTime((s) => {
        if (s <= 1) {
          if (phase === "prep") {
            setPhase("answer");
            setRecording(true);
            return answerSeconds;
          }
          setPhase("done");
          setRecording(false);
          onRecorded();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">Speaking</p>
      <h2 className="mt-2 text-lg font-bold text-ink">{prompt}</h2>

      <div className="mt-8 flex flex-col items-center">
        <span
          className={cn(
            "flex h-24 w-24 items-center justify-center rounded-full transition-colors",
            phase === "answer" ? "bg-weak text-white" : "bg-lavender text-purple-600"
          )}
        >
          <Mic size={32} />
        </span>

        {phase !== "done" && (
          <div className="mt-4 flex items-end gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "wave-bar w-1.5 rounded-full bg-purple-300",
                  phase === "answer" ? "h-8" : "h-3"
                )}
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
        )}

        <p className="mt-5 text-sm font-bold uppercase tracking-label text-ink-soft">
          {phase === "prep" && "Preparation Time"}
          {phase === "answer" && "Answer Time"}
          {phase === "done" && "Recording Complete"}
        </p>
        {phase !== "done" ? (
          <p className="mt-1 text-3xl font-extrabold tabular text-purple-600">
            {formatMMSS(time)}
          </p>
        ) : (
          <div className="mt-4 flex gap-3">
            <button className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink">
              <Play size={14} /> Play Recording
            </button>
            <button
              onClick={() => {
                onReset();
                setPhase("prep");
                setTime(prepSeconds);
              }}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink"
            >
              <RotateCcw size={14} /> Re-record
            </button>
          </div>
        )}
      </div>
      {phase === "answer" && (
        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs font-semibold text-weak">
          <Square size={10} className="fill-weak" /> Recording in progress
        </p>
      )}
    </div>
  );
}

function WritingStep({
  prompt,
  seconds,
  wordLimit,
  value,
  onChange,
}: {
  prompt: string;
  seconds: number;
  wordLimit: number;
  value: string;
  onChange: (v: string) => void;
}) {
  const wordCount = useMemo(
    () => (value.trim().length ? value.trim().split(/\s+/).length : 0),
    [value]
  );

  return (
    <div>
      <div className="rounded-card border border-line bg-cream p-5">
        <p className="text-[11px] font-bold uppercase tracking-label text-purple-500">Prompt</p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{prompt}</p>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing your response here..."
        className="mt-5 h-64 w-full resize-none rounded-card border border-line p-5 text-sm leading-relaxed text-ink outline-none focus:border-purple-400"
      />
      <div className="mt-3 flex items-center justify-between text-xs font-semibold text-ink-soft">
        <span>
          Word Count: <span className="tabular text-ink">{wordCount}</span> / {wordLimit}
        </span>
        <span>Suggested Time: {formatMMSS(seconds)}</span>
      </div>
    </div>
  );
}
