import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "C-BRIDGE Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-cream font-sans text-ink">{children}</div>;
}
