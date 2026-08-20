import { MockAttempt, ScoreLabAttempt, UserProfile } from "@/lib/types";

export const DEMO_USER: UserProfile = {
  name: "Alex Kim",
  email: "yorkboy@gmail.com",
  examId: "toefl",
  currentScore: 82,
  targetScore: 100,
  examDate: "2026-09-26",
  course: "4-Week TARGET",
  aiProgressScore: 87,
  courseProgressPct: 34,
  studyStreak: 7,
  dailyStudyTime: 62,
  totalStudyTime: "46h 21m",
  availableCredits: 3,
  subscription: "academy-active",
};

// Oldest → newest, mirrors the Score Passport growth chart (72 → 91).
export const MOCK_HISTORY: MockAttempt[] = [
  {
    id: "mock-01",
    examId: "toefl",
    type: "full",
    date: "2026-07-01",
    estimatedScore: 72,
    scoreMax: 120,
    target: 100,
    sections: [
      { section: "reading", score: 19, max: 30 },
      { section: "listening", score: 18, max: 30 },
      { section: "speaking", score: 16, max: 30 },
      { section: "writing", score: 19, max: 30 },
    ],
    prepWeeks: "10–12 Weeks",
  },
  {
    id: "mock-02",
    examId: "toefl",
    type: "section",
    date: "2026-07-08",
    estimatedScore: 75,
    scoreMax: 120,
    target: 100,
    sections: [{ section: "speaking", score: 17, max: 30 }],
    prepWeeks: "9–11 Weeks",
  },
  {
    id: "mock-03",
    examId: "toefl",
    type: "full",
    date: "2026-07-15",
    estimatedScore: 78,
    scoreMax: 120,
    target: 100,
    sections: [
      { section: "reading", score: 21, max: 30 },
      { section: "listening", score: 20, max: 30 },
      { section: "speaking", score: 17, max: 30 },
      { section: "writing", score: 20, max: 30 },
    ],
    prepWeeks: "8–10 Weeks",
  },
  {
    id: "mock-04",
    examId: "toefl",
    type: "mini",
    date: "2026-07-22",
    estimatedScore: 80,
    scoreMax: 120,
    target: 100,
    sections: [{ section: "writing", score: 20, max: 30 }],
    prepWeeks: "8 Weeks",
  },
  {
    id: "mock-05",
    examId: "toefl",
    type: "full",
    date: "2026-08-05",
    estimatedScore: 82,
    scoreMax: 120,
    target: 100,
    sections: [
      { section: "reading", score: 24, max: 30 },
      { section: "listening", score: 22, max: 30 },
      { section: "speaking", score: 18, max: 30 },
      { section: "writing", score: 18, max: 30 },
    ],
    prepWeeks: "6–8 Weeks",
  },
  {
    id: "mock-06",
    examId: "toefl",
    type: "section",
    date: "2026-08-12",
    estimatedScore: 85,
    scoreMax: 120,
    target: 100,
    sections: [{ section: "speaking", score: 20, max: 30 }],
    prepWeeks: "6 Weeks",
  },
  {
    id: "mock-07",
    examId: "toefl",
    type: "full",
    date: "2026-08-19",
    estimatedScore: 88,
    scoreMax: 120,
    target: 100,
    sections: [
      { section: "reading", score: 25, max: 30 },
      { section: "listening", score: 23, max: 30 },
      { section: "speaking", score: 20, max: 30 },
      { section: "writing", score: 20, max: 30 },
    ],
    prepWeeks: "4–6 Weeks",
  },
];

export const LATEST_MOCK = MOCK_HISTORY[MOCK_HISTORY.length - 1];
export const BEST_MOCK = MOCK_HISTORY.reduce((a, b) =>
  b.estimatedScore > a.estimatedScore ? b : a
);

export const SPEAKING_HISTORY: ScoreLabAttempt[] = [
  {
    id: "sp-01",
    questionId: "q-ielts-speak-p2-trip",
    attemptNumber: 1,
    date: "2026-08-01",
    overallScore: 6.0,
    overallMax: 9,
    criteria: [
      { key: "fluency", label: "Fluency & Coherence", score: 5.5, max: 9 },
      { key: "lexical", label: "Lexical Resource", score: 6.5, max: 9 },
      { key: "grammar", label: "Grammatical Range & Accuracy", score: 5.5, max: 9 },
      { key: "pronunciation", label: "Pronunciation", score: 6.0, max: 9 },
    ],
    strengths: [
      "적절한 어휘를 사용해 여행 경험을 구체적으로 설명함",
      "질문에서 요구한 모든 항목(어디서, 누구와, 무엇을)에 답변함",
    ],
    improvements: [
      "긴 문장 앞에서 멈춤이 자주 발생함",
      "아이디어를 연결하는 표현(however, in addition 등)의 사용이 제한적임",
      "관사와 시제 오류가 반복됨",
    ],
    tryThis:
      "\"It was fun\" 대신 \"It turned out to be one of the most rewarding trips I've taken because...\" 처럼 연결어와 구체적 이유를 함께 제시해보세요.",
  },
  {
    id: "sp-02",
    questionId: "q-ielts-speak-p2-trip",
    attemptNumber: 2,
    date: "2026-08-03",
    overallScore: 6.5,
    overallMax: 9,
    criteria: [
      { key: "fluency", label: "Fluency & Coherence", score: 6.0, max: 9 },
      { key: "lexical", label: "Lexical Resource", score: 6.5, max: 9 },
      { key: "grammar", label: "Grammatical Range & Accuracy", score: 6.0, max: 9 },
      { key: "pronunciation", label: "Pronunciation", score: 6.5, max: 9 },
    ],
    strengths: [
      "연결어 사용이 개선되어 답변 흐름이 자연스러워짐",
      "발음 명료도가 향상됨",
    ],
    improvements: ["복문 사용 시 문법 오류가 여전히 발생함", "일부 어휘 반복 사용"],
    tryThis: "같은 단어(good, nice)를 반복하지 말고 유의어를 미리 3개 정도 준비해두세요.",
  },
  {
    id: "sp-03",
    questionId: "q-toefl-speak-t2-campus",
    attemptNumber: 1,
    date: "2026-08-06",
    overallScore: 18,
    overallMax: 30,
    criteria: [
      { key: "delivery", label: "Delivery", score: 17, max: 30 },
      { key: "language-use", label: "Language Use", score: 18, max: 30 },
      { key: "topic-dev", label: "Topic Development", score: 19, max: 30 },
    ],
    strengths: ["명확한 입장 제시", "논리적인 답변 구조"],
    improvements: ["답변 속도가 다소 느림", "예시가 다소 추상적임"],
    tryThis: "일반적인 진술 뒤에 구체적인 개인 경험 한 가지를 반드시 덧붙여보세요.",
  },
  {
    id: "sp-04",
    questionId: "q-toefl-speak-t2-campus",
    attemptNumber: 2,
    date: "2026-08-09",
    overallScore: 20,
    overallMax: 30,
    criteria: [
      { key: "delivery", label: "Delivery", score: 19, max: 30 },
      { key: "language-use", label: "Language Use", score: 20, max: 30 },
      { key: "topic-dev", label: "Topic Development", score: 21, max: 30 },
    ],
    strengths: ["답변 속도 개선", "구체적인 예시 추가"],
    improvements: ["결론 문장이 다소 급하게 마무리됨"],
    tryThis: "마지막 문장에서 자신의 입장을 한 번 더 요약해 답변을 닫아보세요.",
    fromAcademy: true,
  },
  {
    id: "sp-05",
    questionId: "q-ielts-speak-p1-work",
    attemptNumber: 1,
    date: "2026-08-14",
    overallScore: 6.0,
    overallMax: 9,
    criteria: [
      { key: "fluency", label: "Fluency & Coherence", score: 6.0, max: 9 },
      { key: "lexical", label: "Lexical Resource", score: 6.0, max: 9 },
      { key: "grammar", label: "Grammatical Range & Accuracy", score: 5.5, max: 9 },
      { key: "pronunciation", label: "Pronunciation", score: 6.5, max: 9 },
    ],
    strengths: ["짧은 질문에 자연스럽게 응답함"],
    improvements: ["세부 이유 설명이 짧음", "현재완료 시제 오류"],
    tryThis: "이유를 하나 더 추가해 답변 길이를 30초 이상으로 늘려보세요.",
    fromAcademy: true,
  },
  {
    id: "sp-06",
    questionId: "q-ielts-speak-p2-trip",
    attemptNumber: 3,
    date: "2026-08-18",
    overallScore: 6.5,
    overallMax: 9,
    criteria: [
      { key: "fluency", label: "Fluency & Coherence", score: 6.5, max: 9 },
      { key: "lexical", label: "Lexical Resource", score: 6.5, max: 9 },
      { key: "grammar", label: "Grammatical Range & Accuracy", score: 6.0, max: 9 },
      { key: "pronunciation", label: "Pronunciation", score: 7.0, max: 9 },
    ],
    strengths: ["발음이 눈에 띄게 명확해짐", "답변 구조가 안정적임"],
    improvements: ["복문에서의 문법 정확도"],
    tryThis: "관계대명사(which, that)를 활용해 문장을 자연스럽게 확장해보세요.",
  },
];

export const WRITING_HISTORY: ScoreLabAttempt[] = [
  {
    id: "wr-01",
    questionId: "q-ielts-write-t2-tech",
    attemptNumber: 1,
    date: "2026-08-02",
    overallScore: 6.0,
    overallMax: 9,
    criteria: [
      { key: "task", label: "Task Achievement", score: 6.0, max: 9 },
      { key: "coherence", label: "Coherence & Cohesion", score: 5.5, max: 9 },
      { key: "lexical", label: "Lexical Resource", score: 6.0, max: 9 },
      { key: "grammar", label: "Grammatical Range & Accuracy", score: 6.0, max: 9 },
    ],
    strengths: ["양쪽 관점을 모두 다룸", "명확한 자신의 의견 제시"],
    improvements: ["문단 간 연결이 다소 약함", "결론이 본론 반복에 그침"],
    tryThis: "각 문단 시작에 주제문을 명확히 배치하고, 결론에서는 새로운 통찰을 한 줄 추가하세요.",
  },
  {
    id: "wr-02",
    questionId: "q-ielts-write-t2-tech",
    attemptNumber: 2,
    date: "2026-08-10",
    overallScore: 6.5,
    overallMax: 9,
    criteria: [
      { key: "task", label: "Task Achievement", score: 6.5, max: 9 },
      { key: "coherence", label: "Coherence & Cohesion", score: 6.5, max: 9 },
      { key: "lexical", label: "Lexical Resource", score: 6.5, max: 9 },
      { key: "grammar", label: "Grammatical Range & Accuracy", score: 6.0, max: 9 },
    ],
    strengths: ["문단 연결이 개선됨", "다양한 접속 표현 사용"],
    improvements: ["일부 복문에서 문법 오류 지속"],
    tryThis: "제출 전 시제 일치만 별도로 한 번 더 검토해보세요.",
    fromAcademy: true,
  },
  {
    id: "wr-03",
    questionId: "q-toefl-write-independent",
    attemptNumber: 1,
    date: "2026-08-13",
    overallScore: 18,
    overallMax: 30,
    criteria: [
      { key: "development", label: "Development", score: 18, max: 30 },
      { key: "organization", label: "Organization", score: 19, max: 30 },
      { key: "language-use", label: "Language Use", score: 17, max: 30 },
    ],
    strengths: ["명확한 구조(서론-본론-결론)"],
    improvements: ["예시가 일반적임", "어휘 다양성 부족"],
    tryThis: "추상적 진술 대신 실제 인물이나 사건을 예시로 들어보세요.",
  },
  {
    id: "wr-04",
    questionId: "q-toefl-write-independent",
    attemptNumber: 2,
    date: "2026-08-17",
    overallScore: 20,
    overallMax: 30,
    criteria: [
      { key: "development", label: "Development", score: 21, max: 30 },
      { key: "organization", label: "Organization", score: 20, max: 30 },
      { key: "language-use", label: "Language Use", score: 19, max: 30 },
    ],
    strengths: ["구체적인 예시 추가로 설득력 상승", "어휘 다양성 개선"],
    improvements: ["일부 문장이 지나치게 김"],
    tryThis: "긴 문장은 두 문장으로 나눠 가독성을 높여보세요.",
    fromAcademy: true,
  },
];

export function attemptsForQuestion(questionId: string, skill: "speaking" | "writing") {
  const list = skill === "speaking" ? SPEAKING_HISTORY : WRITING_HISTORY;
  return list
    .filter((a) => a.questionId === questionId)
    .sort((a, b) => a.attemptNumber - b.attemptNumber);
}

export function latestAndBest(skill: "speaking" | "writing") {
  const list = skill === "speaking" ? SPEAKING_HISTORY : WRITING_HISTORY;
  const sorted = [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  const latest = sorted[0];
  const best = [...list].reduce((a, b) => (b.overallScore > a.overallScore ? b : a));
  return { latest, best, attempts: list.length };
}
