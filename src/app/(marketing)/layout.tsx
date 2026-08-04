import { ReactNode } from "react";
import Link from "next/link";
import { PenSquare } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const { userId } = await auth();
  return <div className="flex min-h-screen flex-col bg-[#f3f6fa] text-slate-800">
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f8fafc]/85 backdrop-blur-xl"><div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-6">
      <Link href="/" className="flex items-center gap-2.5 font-[Outfit] text-lg font-bold tracking-tight text-slate-800"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-400 text-white shadow-[0_6px_14px_rgba(129,140,248,0.28)]"><PenSquare size={18} /></span>GemmaNote</Link>
      <nav className="hidden items-center gap-7 text-sm font-medium text-slate-500 md:flex"><Link href="#features" className="transition hover:text-indigo-600">Features</Link><Link href="#pricing" className="transition hover:text-indigo-600">Plans</Link><Link href="/editor" className="transition hover:text-indigo-600">Workspace</Link></nav>
      <div className="flex items-center gap-3">{userId ? <><Link href="/settings" className="hidden text-sm font-semibold text-slate-500 transition hover:text-indigo-600 sm:block">Settings</Link><Link href="/editor" className="hidden rounded-xl bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 sm:block">Open workspace</Link><UserButton /></> : <><Link href="/sign-in" className="hidden text-sm font-semibold text-slate-500 transition hover:text-indigo-600 sm:block">Log in</Link><Link href="/sign-up" className="rounded-xl bg-indigo-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600">Get started</Link></>}</div>
    </div></header>
    <main className="flex-1">{children}</main>
    <footer className="border-t border-slate-200 bg-white py-8"><div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} GemmaNote. A focused place to write.</p><Link href="/editor" className="font-medium text-slate-500 hover:text-indigo-600">Open workspace</Link></div></footer>
  </div>;
}
