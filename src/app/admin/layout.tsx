import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getAdminAccess } from "@/lib/admin-auth";
import { AdminSidebar } from "./admin-sidebar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const access = await getAdminAccess();
  if (access === "unauthenticated") redirect("/sign-in");
  if (access === "forbidden") notFound();
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <AdminSidebar />
      <main className="min-h-screen" style={{ paddingLeft: '16rem' }}>
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
