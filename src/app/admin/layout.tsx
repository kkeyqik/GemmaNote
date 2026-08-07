import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getAdminAccess } from "@/lib/admin-auth";
import { AdminSidebar } from "./admin-sidebar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const access = await getAdminAccess();
  if (access === "unauthenticated") redirect("/sign-in");
  if (access === "forbidden") notFound();
  
  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
