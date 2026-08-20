"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DEMO_USER } from "@/lib/data/user";
import { Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function continueAsDemo(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Mock auth — no real identity provider is connected yet. Swap this
    // handler for a real sign-in call when auth is wired up.
    setTimeout(() => router.push("/my"), 600);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 md:px-8">
      <span className="kicker mx-auto w-fit">Welcome Back</span>
      <h1 className="mt-2 text-center text-3xl font-extrabold text-ink">Log In</h1>
      <p className="mt-2 text-center text-sm text-ink-soft">
        데모 환경에서는 실제 인증 없이 Alex Kim 계정으로 바로 진입합니다.
      </p>

      <form onSubmit={continueAsDemo} className="mt-8 space-y-4 rounded-card border border-line bg-white p-6">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Email
          </label>
          <input
            type="email"
            defaultValue={DEMO_USER.email}
            className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-purple-400"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-purple-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-70"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
          Continue as {DEMO_USER.name} (Demo)
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        아직 계정이 없나요?{" "}
        <Link href="/signup" className="font-semibold text-purple-600">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
