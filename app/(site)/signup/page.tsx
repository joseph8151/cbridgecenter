"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, UserPlus } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function createAccount(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Mock signup — no real identity provider is connected yet. New accounts
    // route straight into the free trial hub instead of an empty dashboard.
    setTimeout(() => router.push("/try"), 600);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 md:px-8">
      <span className="kicker mx-auto w-fit">Get Started</span>
      <h1 className="mt-2 text-center text-3xl font-extrabold text-ink">Create Your Account</h1>
      <p className="mt-2 text-center text-sm text-ink-soft">
        가입 후 무료 체험으로 바로 시작할 수 있습니다.
      </p>

      <form onSubmit={createAccount} className="mt-8 space-y-4 rounded-card border border-line bg-white p-6">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-purple-400"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-label text-ink-soft">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
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
          {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="font-semibold text-purple-600">
          Log In
        </Link>
      </p>
    </div>
  );
}
