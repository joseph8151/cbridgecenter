"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { QuestionEditor } from "@/components/admin/QuestionEditor";
import { ArrowLeft } from "lucide-react";

export default function AdminEditQuestionPage() {
  const params = useParams<{ id: string }>();
  const { questions } = useAdminData();
  const question = questions.find((q) => q.id === params.id);

  return (
    <div>
      <Link href="/admin/questions" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <ArrowLeft size={13} /> Question Bank
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-ink">Edit Question</h1>

      {question ? (
        <div className="mt-4">
          <QuestionEditor initial={question} />
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-soft">문제를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}
