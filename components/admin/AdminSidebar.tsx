"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  Library,
  ClipboardList,
  GraduationCap,
  CalendarRange,
  CreditCard,
  Ticket,
  FileText,
  BarChart3,
  Cpu,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/exams", label: "Exams", icon: FileCheck2 },
  { href: "/admin/questions", label: "Question Bank", icon: Library },
  { href: "/admin/mock-tests", label: "Mock Test Builder", icon: ClipboardList },
  { href: "/admin/courses", label: "Academy Courses", icon: GraduationCap },
  { href: "/admin/plan-templates", label: "Plan Templates", icon: CalendarRange },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/coupons", label: "Coupons", icon: Ticket },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/ai-usage", label: "AI Usage", icon: Cpu },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-56 shrink-0 border-r border-line bg-white md:block">
      <nav className="sticky top-14 space-y-0.5 p-3">
        {NAV.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                active ? "bg-purple-600 text-white" : "text-ink-soft hover:bg-cream-deep hover:text-ink"
              )}
            >
              <Icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
