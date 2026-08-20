import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatKRW(amount: number) {
  return `₩${amount.toLocaleString("en-US")}`;
}

export function daysUntil(dateISO: string) {
  const diff = new Date(dateISO).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

export function formatDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
