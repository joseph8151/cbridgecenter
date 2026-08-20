"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setAdminAuthed } from "@/components/admin/AdminAuthGate";
import { LogOut } from "lucide-react";

export function AdminHeader() {
  const router = useRouter();

  function logout() {
    setAdminAuthed(false);
    router.push("/admin/login");
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-white px-5">
      <Link href="/admin" className="flex items-center gap-2">
        <span className="text-sm font-extrabold tracking-tight text-purple-600">C-BRIDGE</span>
        <span className="rounded-pill bg-lavender px-2 py-0.5 text-[10px] font-bold uppercase tracking-label text-purple-700">
          Admin
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xs font-semibold text-ink-soft hover:text-purple-700">
          View Student Site
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-purple-300 hover:text-purple-700"
        >
          <LogOut size={13} /> Log Out
        </button>
      </div>
    </header>
  );
}
