import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getAdminAccess } from "@/lib/admin-auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const access = await getAdminAccess();
  if (access === "unauthenticated") redirect("/sign-in");
  if (access === "forbidden") notFound();
  
  return (
    <div>
      {children}
    </div>
  );
}
