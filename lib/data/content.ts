import { ACADEMY_FAQ, SCORE_LAB_FAQ, TEST_CENTER_FAQ } from "@/lib/data/faq";
import { DEMO_TESTIMONIALS } from "@/lib/data/testimonials";
import { EXAM_LIST, EXAM_EXTRA } from "@/lib/data/exams";

export interface Announcement {
  id: string;
  text: string;
  active: boolean;
}

export const ANNOUNCEMENTS: Announcement[] = [
  { id: "a1", text: "8월 신규 가입자 대상 Mini Mock 첫 응시 무료 이벤트 진행 중", active: true },
  { id: "a2", text: "9월 정기 시스템 점검: 9/1(월) 02:00–04:00 (KST)", active: false },
];

export interface ContentFaqItem {
  id: string;
  section: "academy" | "score-lab" | "test-center";
  q: string;
  a: string;
}

export const CONTENT_FAQ: ContentFaqItem[] = [
  ...ACADEMY_FAQ.map((f, i) => ({ id: `academy-${i}`, section: "academy" as const, ...f })),
  ...SCORE_LAB_FAQ.map((f, i) => ({ id: `score-lab-${i}`, section: "score-lab" as const, ...f })),
  ...TEST_CENTER_FAQ.map((f, i) => ({ id: `test-center-${i}`, section: "test-center" as const, ...f })),
];

export interface ExamGuide {
  examId: string;
  title: string;
  body: string;
}

export const EXAM_GUIDES: ExamGuide[] = EXAM_LIST.map((e) => ({
  examId: e.id,
  title: `${e.name} 준비 가이드`,
  body: `${EXAM_EXTRA[e.id]?.format ?? ""} 시험입니다. ${EXAM_EXTRA[e.id]?.skillsLabel ?? ""}, ${EXAM_EXTRA[e.id]?.scaleLabel ?? ""}.`,
}));

export interface PromoBanner {
  enabled: boolean;
  text: string;
  href: string;
}

export const PROMO_BANNER: PromoBanner = {
  enabled: true,
  text: "4-WEEK TARGET 런칭 할인 — 지금 시작하면 ₩99,000 즉시 할인",
  href: "/academy#pricing",
};

export interface TestimonialItem {
  id: string;
  quote: string;
  context: string;
  visible: boolean;
}

export const CONTENT_TESTIMONIALS: TestimonialItem[] = DEMO_TESTIMONIALS.map((t) => ({
  ...t,
  visible: true,
}));
