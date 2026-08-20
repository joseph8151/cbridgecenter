"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { MockTestBuilder } from "@/components/admin/MockTestBuilder";
import { ArrowLeft } from "lucide-react";

export default function AdminEditMockTestPage() {
  const params = useParams<{ id: string }>();
  const { mockTests } = useAdminData();
  const test = mockTests.find((t) => t.id === params.id);

  return (
    <div>
      <Link href="/admin/mock-tests" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <ArrowLeft size={13} /> Mock Test Builder
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-ink">Edit Mock Test</h1>
      {test ? (
        <div className="mt-4">
          <MockTestBuilder initial={test} />
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-soft">모의고사를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}
