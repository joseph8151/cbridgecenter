export interface ScoreLabProduct {
  id: string;
  name: string;
  price: number;
  period?: string;
  description: string;
  badge?: string;
}

export const SCORE_LAB_PRODUCTS: ScoreLabProduct[] = [
  {
    id: "speaking",
    name: "Speaking Check",
    price: 9900,
    description: "Speaking 답변 1회 AI 채점 + RETRY",
  },
  {
    id: "writing",
    name: "Writing Check",
    price: 9900,
    description: "Writing 답변 1회 AI 채점 + RETRY",
  },
  {
    id: "combo",
    name: "Speaking + Writing",
    price: 17900,
    description: "두 영역을 함께 채점받고 집중 분석",
    badge: "BEST",
  },
  {
    id: "pack10",
    name: "10 Checks",
    price: 79000,
    description: "Speaking / Writing 채점 10회 패키지",
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 49000,
    period: "/ month",
    description: "무제한 AI 채점 + RETRY",
  },
];

export function scoreLabProductById(id: string) {
  return SCORE_LAB_PRODUCTS.find((p) => p.id === id);
}
