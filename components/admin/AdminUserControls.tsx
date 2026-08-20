"use client";

import { useState } from "react";
import { AdminUserRow } from "@/lib/data/admin";
import { COURSES } from "@/lib/data/academy";

// Demo Mode: every control here mutates local component state only. There is
// no write API yet — a real backend would replace onGrantCredits/
// onChangeCourse/onChangeSubscription with actual mutations, but every other
// admin page in this app already reads from static seed data the same way,
// so this keeps the same "clearly a demo, not silently pretending to
// persist" posture as the rest of the app.
export function AdminUserControls({ user }: { user: AdminUserRow }) {
  const [credits, setCredits] = useState(user.credits);
  const [course, setCourse] = useState(user.course);
  const [subscription, setSubscription] = useState(user.subscription);
  const [grantAmount, setGrantAmount] = useState(1);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function flashSaved() {
    setSavedAt(new Date().toLocaleTimeString());
  }

  return (
    <div className="rounded-card border border-line bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="font-bold text-ink">Admin Controls</p>
        <span className="rounded-pill bg-gold-100 px-2.5 py-1 text-[10px] font-bold uppercase text-gold-700">
          Demo Mode
        </span>
      </div>
      <p className="mt-1 text-[11px] text-ink-soft">
        변경 사항은 이 세션에서만 반영되며 저장되지 않습니다. 실제 backend write는 연결되어 있지 않습니다.
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Credits</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-lg font-extrabold tabular text-ink">{credits}</span>
            <input
              type="number"
              min={1}
              value={grantAmount}
              onChange={(e) => setGrantAmount(Number(e.target.value))}
              className="w-16 rounded-lg border border-line px-2 py-1.5 text-sm"
            />
            <button
              onClick={() => {
                setCredits((c) => c + grantAmount);
                flashSaved();
              }}
              className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-700"
            >
              Grant Credits
            </button>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Course</p>
          <div className="mt-1.5 flex items-center gap-2">
            <select
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                flashSaved();
              }}
              className="flex-1 rounded-lg border border-line px-3 py-1.5 text-sm"
            >
              <option value="None">None</option>
              {COURSES.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">Subscription</p>
          <div className="mt-1.5 flex items-center gap-2">
            <select
              value={subscription}
              onChange={(e) => {
                setSubscription(e.target.value as typeof subscription);
                flashSaved();
              }}
              className="flex-1 rounded-lg border border-line px-3 py-1.5 text-sm"
            >
              <option value="None">None</option>
              <option value="Score Lab Unlimited">Score Lab Unlimited</option>
              <option value="Academy Active">Academy Active</option>
            </select>
          </div>
        </div>
      </div>

      {savedAt && (
        <p className="mt-4 text-[11px] font-semibold text-success">Updated locally at {savedAt}</p>
      )}
    </div>
  );
}
