"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAdminAuthed } from "@/components/admin/AdminAuthGate";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@cbridgecenter.com");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Demo Admin Authentication — any input is accepted. There is no real
    // backend session; this only sets a localStorage flag so /admin routes
    // aren't casually reachable from the student site.
    setAdminAuthed(true);
    router.push("/admin");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
          <ShieldCheck size={22} />
        </span>
        <p className="mt-4 text-lg font-extrabold text-purple-600">C-BRIDGE Admin</p>
        <p className="mt-1 text-sm text-ink-soft">Demo Admin Authentication</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-card border border-line bg-white p-6">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Admin Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-purple-400"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Demo — any value works"
            className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-purple-400"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-purple-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-purple-700"
        >
          Log In to Admin
        </button>
      </form>
      <p className="mt-4 text-center text-[11px] text-ink-soft">
        데모 환경입니다. 실제 관리자 인증 시스템은 아직 연결되어 있지 않습니다.
      </p>
    </div>
  );
}
