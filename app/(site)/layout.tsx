import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigation } from "@/components/MobileNavigation";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileNavigation />
    </>
  );
}
