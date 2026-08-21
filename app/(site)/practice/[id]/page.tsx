import { notFound, redirect } from "next/navigation";
import { getQuestion } from "@/lib/data/questionBank";
import { PracticeQuestionView } from "./PracticeQuestionView";

export default async function PracticeQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = getQuestion(id);
  if (!question) notFound();

  // Speaking/Writing already have a full practice-and-score loop in Score
  // Lab — reuse it instead of duplicating recording/editor UI here. Practice
  // stays the browsing surface; Score Lab stays the scoring surface.
  if (question.section === "speaking" || question.section === "writing") {
    redirect(`/score-lab/${question.section}/${question.id}`);
  }

  // Keyed by question id so navigating from "Practice This Skill" to a
  // different question id remounts this view instead of reusing state
  // (selected answer, bookmarked) from the previous question.
  return <PracticeQuestionView key={question.id} question={question} />;
}
