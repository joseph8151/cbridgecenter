"use client";

import Link from "next/link";
import { MockTestBuilder } from "@/components/admin/MockTestBuilder";
import { ArrowLeft } from "lucide-react";

export default function AdminNewMockTestPage() {
  return (
    <div>
      <Link href="/admin/mock-tests" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <ArrowLeft size={13} /> Mock Test Builder
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-ink">Create Mock Test</h1>
      <div className="mt-4">
        <MockTestBuilder />
      </div>
    </div>
  );
}
