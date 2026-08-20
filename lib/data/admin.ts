// Admin/CMS demo data. Every array here is what a real backend query would
// return — Admin pages read this as their initial state and layer local
// React state on top for edits, since no write API exists yet. See each
// admin page for the "Demo Mode" note explaining what does and doesn't
// persist.

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  joined: string;
  examId: string;
  targetScore: number;
  latestScore: number;
  course: string;
  subscription: "None" | "Score Lab Unlimited" | "Academy Active";
  credits: number;
  lastActive: string;
}

export const ADMIN_STATS = {
  todayUsers: 342,
  newSignups: 18,
  mockTestsCompleted: 27,
  scoreLabSubmissions: 64,
  academyActiveStudents: 156,
  revenue: 4820000,
  conversionPct: 8.4,
};

export const ADMIN_USERS: AdminUserRow[] = [
  {
    id: "u1",
    name: "Alex Kim",
    email: "yorkboy@gmail.com",
    joined: "2026-07-01",
    examId: "toefl",
    targetScore: 100,
    latestScore: 88,
    course: "4-Week TARGET",
    subscription: "Academy Active",
    credits: 3,
    lastActive: "2026-08-20",
  },
  {
    id: "u2",
    name: "Jenny Park",
    email: "jenny.park@example.com",
    joined: "2026-06-18",
    examId: "ielts-academic",
    targetScore: 7.5,
    latestScore: 6.5,
    course: "12-WEEK MASTERY",
    subscription: "Academy Active",
    credits: 8,
    lastActive: "2026-08-19",
  },
  {
    id: "u3",
    name: "Daniel Cho",
    email: "daniel.cho@example.com",
    joined: "2026-08-02",
    examId: "pte",
    targetScore: 79,
    latestScore: 62,
    course: "None",
    subscription: "None",
    credits: 1,
    lastActive: "2026-08-15",
  },
  {
    id: "u4",
    name: "Michelle Yoon",
    email: "michelle.yoon@example.com",
    joined: "2026-05-22",
    examId: "duolingo",
    targetScore: 130,
    latestScore: 115,
    course: "2-WEEK BOOST",
    subscription: "Score Lab Unlimited",
    credits: 0,
    lastActive: "2026-08-18",
  },
  {
    id: "u5",
    name: "Ryan Seo",
    email: "ryan.seo@example.com",
    joined: "2026-07-29",
    examId: "toefl",
    targetScore: 105,
    latestScore: 79,
    course: "4-Week TARGET",
    subscription: "Academy Active",
    credits: 5,
    lastActive: "2026-08-20",
  },
  {
    id: "u6",
    name: "Grace Lim",
    email: "grace.lim@example.com",
    joined: "2026-04-11",
    examId: "ielts-general",
    targetScore: 7,
    latestScore: 7,
    course: "None",
    subscription: "None",
    credits: 0,
    lastActive: "2026-07-30",
  },
  {
    id: "u7",
    name: "Tom Baek",
    email: "tom.baek@example.com",
    joined: "2026-08-10",
    examId: "teps",
    targetScore: 450,
    latestScore: 360,
    course: "None",
    subscription: "None",
    credits: 2,
    lastActive: "2026-08-14",
  },
  {
    id: "u8",
    name: "Sarah Moon",
    email: "sarah.moon@example.com",
    joined: "2026-03-05",
    examId: "toeic",
    targetScore: 900,
    latestScore: 845,
    course: "None",
    subscription: "None",
    credits: 0,
    lastActive: "2026-08-05",
  },
];

export interface AdminPayment {
  id: string;
  userId: string;
  userName: string;
  product: string;
  amount: number;
  date: string;
  method: "Card" | "KakaoPay" | "NaverPay";
  status: "Paid" | "Refunded" | "Failed";
}

export const ADMIN_PAYMENTS: AdminPayment[] = [
  { id: "pay-01", userId: "u1", userName: "Alex Kim", product: "4-WEEK TARGET", amount: 249000, date: "2026-08-05", method: "Card", status: "Paid" },
  { id: "pay-02", userId: "u2", userName: "Jenny Park", product: "12-WEEK MASTERY", amount: 599000, date: "2026-07-20", method: "KakaoPay", status: "Paid" },
  { id: "pay-03", userId: "u3", userName: "Daniel Cho", product: "TOEFL Full Mock", amount: 39000, date: "2026-08-14", method: "Card", status: "Paid" },
  { id: "pay-04", userId: "u4", userName: "Michelle Yoon", product: "2-WEEK BOOST", amount: 149000, date: "2026-06-01", method: "NaverPay", status: "Paid" },
  { id: "pay-05", userId: "u5", userName: "Ryan Seo", product: "4-WEEK TARGET", amount: 249000, date: "2026-08-01", method: "Card", status: "Paid" },
  { id: "pay-06", userId: "u4", userName: "Michelle Yoon", product: "Speaking + Writing", amount: 17900, date: "2026-08-11", method: "Card", status: "Refunded" },
  { id: "pay-07", userId: "u7", userName: "Tom Baek", product: "TOEFL Mini Mock", amount: 9900, date: "2026-08-13", method: "KakaoPay", status: "Failed" },
];

export interface Coupon {
  id: string;
  code: string;
  type: "percent" | "amount";
  value: number;
  expiresAt: string;
  usageLimit: number;
  usedCount: number;
}

export const COUPONS: Coupon[] = [
  { id: "c1", code: "CBRIDGE20", type: "percent", value: 20, expiresAt: "2026-09-30", usageLimit: 500, usedCount: 128 },
  { id: "c2", code: "NEWUSER", type: "amount", value: 10000, expiresAt: "2026-12-31", usageLimit: 1000, usedCount: 341 },
];

export const CONVERSION_FUNNEL = [
  { stage: "Visitor", count: 18420 },
  { stage: "Signup", count: 2210 },
  { stage: "Free Test", count: 1340 },
  { stage: "Score Lab Purchase", count: 410 },
  { stage: "Academy Purchase", count: 156 },
  { stage: "Renewal", count: 42 },
];

export const REVENUE_BY_EXAM: { examId: string; revenue: number }[] = [
  { examId: "toefl", revenue: 2140000 },
  { examId: "ielts-academic", revenue: 1580000 },
  { examId: "pte", revenue: 640000 },
  { examId: "duolingo", revenue: 460000 },
];

export const AI_USAGE = {
  speakingAnalysisCalls: 1284,
  writingAnalysisCalls: 968,
  studyPlanCalls: 512,
  estimatedMonthlyCostUSD: 186.4,
  avgCostPerUserUSD: 0.68,
};
