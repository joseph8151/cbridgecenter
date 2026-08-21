"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AUTH_KEY = "cbridge_admin_auth";

export function isAdminAuthed() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}

export function setAdminAuthed(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) window.localStorage.setItem(AUTH_KEY, "1");
  else window.localStorage.removeItem(AUTH_KEY);
}

// Demo-only gate: no server session, no real credential check — just keeps
// /admin from being reachable by casually clicking around the student site.
// A real deployment would replace this with actual admin auth (session
// cookie checked in middleware, SSO, etc.) before launch.
export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAdminAuthed()) {
      router.replace("/admin/login");
      return;
    }
    // localStorage is only readable client-side, so this can't be computed
    // during render without risking a server/client hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [router]);

  if (!ready) return null;
  return <>{children}</>;
}
