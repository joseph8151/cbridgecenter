import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDataProvider } from "@/components/admin/AdminDataProvider";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGate>
      <AdminDataProvider>
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="min-w-0 flex-1 p-6">{children}</main>
        </div>
      </AdminDataProvider>
    </AdminAuthGate>
  );
}
