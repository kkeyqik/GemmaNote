import { ReactNode } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LifeBuoy, PenSquare, Users } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { getAdminAccess } from "@/lib/admin-auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const access = await getAdminAccess();
  if (access === "unauthenticated") redirect("/sign-in");
  if (access === "forbidden") notFound();
  return <div className="flex min-h-screen bg-surface"><aside className="hidden w-[260px] flex-col border-r border-border bg-panel-alt p-6 md:flex"><Link href="/" className="flex items-center gap-2.5 font-outfit text-lg font-bold text-text"><span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-white"><PenSquare size={18} /></span>GemmaNote</Link><p className="mt-9 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">Administration</p><nav className="mt-3 space-y-1"><Link href="/admin" className="flex min-h-11 items-center gap-3 rounded-xl bg-panel px-3 text-sm font-semibold text-accent shadow-sm"><Users size={18} />Users</Link><Link href="/admin/support" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-text-muted transition hover:bg-panel hover:text-accent"><LifeBuoy size={18} />Support inbox</Link></nav><div className="mt-auto flex items-center gap-3 border-t border-border pt-5"><UserButton /><span className="text-sm font-semibold text-text-muted">Administrator</span></div></aside><main className="min-w-0 flex-1 p-4 sm:p-8">{children}</main></div>;
}
