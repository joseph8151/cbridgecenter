// Dashboard engagement data — notifications, streak, achievements.
// Demo data for the MVP; a real deployment would derive these from actual
// study events instead of a static list.

export interface Notification {
  id: string;
  text: string;
  time: string;
}

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", text: "Today's plan is ready.", time: "7:02 AM" },
  { id: "n2", text: "Your Speaking score improved (+0.5).", time: "Yesterday" },
  { id: "n3", text: "Mid Mock available on Day 14.", time: "2 days ago" },
  { id: "n4", text: "7-day study streak achieved.", time: "3 days ago" },
  { id: "n5", text: "Your exam is 37 days away.", time: "This week" },
];

// Mon–Sun completion state for the current week.
export const WEEK_STREAK = [
  { day: "M", done: true },
  { day: "T", done: true },
  { day: "W", done: true },
  { day: "T", done: true },
  { day: "F", done: true },
  { day: "S", done: false },
  { day: "S", done: false },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", title: "First Mock", description: "첫 모의고사를 완료했습니다.", unlocked: true },
  { id: "a2", title: "7 Day Streak", description: "7일 연속 학습했습니다.", unlocked: true },
  { id: "a3", title: "10 Retries", description: "10개의 답변을 다시 연습했습니다.", unlocked: true },
  { id: "a4", title: "Personal Best", description: "최고 점수를 경신했습니다.", unlocked: false },
];
