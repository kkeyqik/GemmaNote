import { ReactNode } from "react";
import Link from "next/link";
import { PenSquare } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const { userId } = await auth();
  
  return (
    <div className="flex min-h-screen flex-col bg-[#f3f6fa] text-slate-800 font-sans">
      <header className="sticky top-0 z-50 border-b border-[#eef2f6] bg-white/90 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-3 text-2xl font-bold text-[#1e293b] font-outfit">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-400 text-white transition-colors group-hover:bg-indigo-500">
              <PenSquare size={20} strokeWidth={2.5} />
            </span>
            GemmaNote
          </Link>
          
          <nav className="hidden items-center gap-10 text-sm font-medium text-slate-500 md:flex">
            <Link href="#features" className="transition-colors hover:text-indigo-500">Features</Link>
            <Link href="#pricing" className="transition-colors hover:text-indigo-500">Plans</Link>
            <Link href="/editor" className="transition-colors hover:text-indigo-500">Workspace</Link>
          </nav>
          
          <div className="flex items-center gap-5">
            {userId ? (
              <>
                <Link href="/settings" className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-indigo-500 sm:block">Settings</Link>
                <Link href="/editor" className="hidden rounded-xl bg-indigo-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-600 sm:block">Open workspace</Link>
                <div className="pl-4 border-l border-[#eef2f6]"><UserButton /></div>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-indigo-500 sm:block">Log in</Link>
                <Link href="/sign-up" className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-600">Get started</Link>
              </>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1">{children}</main>
      
      <footer className="border-t border-[#eef2f6] bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p className="font-medium">© {new Date().getFullYear()} GemmaNote.</p>
          <div className="flex items-center gap-8 font-medium">
            <Link href="/editor" className="transition-colors hover:text-indigo-500">Open workspace</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
