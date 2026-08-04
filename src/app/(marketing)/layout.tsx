import { ReactNode } from "react";
import Link from "next/link";
import { PenSquare } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const { userId } = await auth();
  
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-800 font-[Inter]">
      <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/70 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 font-[Outfit] text-xl font-bold tracking-tight text-slate-800 transition hover:opacity-80">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
              <PenSquare size={20} strokeWidth={2.5} />
            </span>
            GemmaNote
          </Link>
          
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-500 md:flex">
            <Link href="#features" className="transition-colors hover:text-indigo-600">Features</Link>
            <Link href="#pricing" className="transition-colors hover:text-indigo-600">Plans</Link>
            <Link href="/editor" className="transition-colors hover:text-indigo-600">Workspace</Link>
          </nav>
          
          <div className="flex items-center gap-5">
            {userId ? (
              <>
                <Link href="/settings" className="hidden text-sm font-semibold text-slate-500 transition hover:text-indigo-600 sm:block">Settings</Link>
                <Link href="/editor" className="hidden rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 sm:block">Open workspace</Link>
                <div className="pl-2 border-l border-slate-200"><UserButton /></div>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="hidden text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600 sm:block">Log in</Link>
                <Link href="/sign-up" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25">Get started</Link>
              </>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">{children}</main>
      
      <footer className="border-t border-slate-200/60 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-slate-400 sm:flex-row sm:justify-between">
          <p className="font-medium">© {new Date().getFullYear()} GemmaNote. A focused place to write.</p>
          <div className="flex items-center gap-6">
            <Link href="/editor" className="font-semibold text-slate-500 transition-colors hover:text-indigo-600">Open workspace</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
