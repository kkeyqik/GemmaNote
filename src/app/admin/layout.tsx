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
  return <div className="flex min-h-screen bg-[#f3f6fa]"><aside className="hidden w-[260px] flex-col border-r border-slate-200 bg-[#f8fafc] p-6 md:flex"><Link href="/" className="flex items-center gap-2.5 font-outfit text-lg font-bold text-slate-800"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-400 text-white"><PenSquare size={18} /></span>GemmaNote</Link><p className="mt-9 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Administration</p><nav className="mt-3 space-y-1"><Link href="/admin" className="flex min-h-11 items-center gap-3 rounded-xl bg-white px-3 text-sm font-semibold text-indigo-600 shadow-sm"><Users size={18} />Users</Link><Link href="/admin/support" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-indigo-600"><LifeBuoy size={18} />Support inbox</Link></nav><div className="mt-auto flex items-center gap-3 border-t border-slate-200 pt-5"><UserButton /><span className="text-sm font-semibold text-slate-600">Administrator</span></div></aside><main className="min-w-0 flex-1 p-4 sm:p-8">{children}</main></div>;
}
