"use client";

import Link from "next/link";
import { QuestionEditor } from "@/components/admin/QuestionEditor";
import { ArrowLeft } from "lucide-react";

export default function AdminNewQuestionPage() {
  return (
    <div>
      <Link href="/admin/questions" className="flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <ArrowLeft size={13} /> Question Bank
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-ink">Add Question</h1>
      <div className="mt-4">
        <QuestionEditor />
      </div>
    </div>
  );
}
