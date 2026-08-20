"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";

const NAV = [
  { href: "/test-center", label: "Test" },
  { href: "/score-lab", label: "Score Lab" },
  { href: "/practice", label: "Practice" },
  { href: "/academy", label: "Academy" },
  { href: "/academy#pricing", label: "Pricing" },
];

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[19px] font-extrabold tracking-tight text-purple-600">
            C-BRIDGE
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                isActive(item.href)
                  ? "bg-purple-600 text-white"
                  : "text-ink-soft hover:bg-lavender hover:text-purple-700"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={cn(
              "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft hover:text-purple-700 sm:flex",
              (isActive("/my") || isActive("/login")) && "text-purple-700"
            )}
          >
            <CircleUserRound size={16} />
            Log In
          </Link>
          <Link
            href="/try"
            className="rounded-full bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700 sm:px-5"
          >
            START FREE
          </Link>
        </div>
      </div>
    </header>
  );
}
