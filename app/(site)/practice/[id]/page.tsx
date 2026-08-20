import { notFound, redirect } from "next/navigation";
import { getQuestion } from "@/lib/data/questionBank";
import { PracticeQuestionView } from "./PracticeQuestionView";

export default function PracticeQuestionPage({ params }: { params: { id: string } }) {
  const question = getQuestion(params.id);
  if (!question) notFound();

  // Speaking/Writing already have a full practice-and-score loop in Score
  // Lab — reuse it instead of duplicating recording/editor UI here. Practice
  // stays the browsing surface; Score Lab stays the scoring surface.
  if (question.section === "speaking" || question.section === "writing") {
    redirect(`/score-lab/${question.section}/${question.id}`);
  }

  return <PracticeQuestionView question={question} />;
}
