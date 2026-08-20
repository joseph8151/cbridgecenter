import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "C-BRIDGE | AI Test Prep Operating System",
  description:
    "시험을 보세요. AI가 분석합니다. 목표점수까지 매일 훈련합니다. TOEFL·IELTS·PTE·Duolingo 모의고사부터 AI 채점, 목표점수 관리까지 하나의 플랫폼에서.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
