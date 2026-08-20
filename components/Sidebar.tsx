"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  BookMarked,
  GraduationCap,
  BookOpenCheck,
  CreditCard,
  Settings,
} from "lucide-react";

const ITEMS = [
  { href: "/my", label: "Dashboard", icon: LayoutDashboard },
  { href: "/my/tests", label: "My Tests", icon: FileText },
  { href: "/my/score-lab", label: "Score Lab", icon: Sparkles },
  { href: "/practice", label: "Practice", icon: BookMarked },
  { href: "/my/academy", label: "Academy", icon: GraduationCap },
  { href: "/my/passport", label: "Score Passport", icon: BookOpenCheck },
  { href: "/my/payments", label: "Payments", icon: CreditCard },
  { href: "/my/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <nav className="sticky top-24 space-y-1">
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "bg-purple-600 text-white"
                  : "text-ink-soft hover:bg-lavender hover:text-purple-700"
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
