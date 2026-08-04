import { ReactNode } from "react";
import Link from "next/link";
import { PenSquare } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const { userId } = await auth();
  
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#171717] font-['Plus_Jakarta_Sans',sans-serif]">
      <header className="sticky top-0 z-50 border-b-2 border-[#171717] bg-white transition-all duration-300">
        <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-3 text-2xl font-bold tracking-tight text-[#171717]">
            <span className="grid h-10 w-10 place-items-center rounded bg-[#171717] text-white transition-colors group-hover:bg-[#D4AF37]">
              <PenSquare size={20} strokeWidth={2.5} />
            </span>
            GemmaNote
          </Link>
          
          <nav className="hidden items-center gap-10 text-sm font-bold text-[#171717] md:flex">
            <Link href="#features" className="uppercase tracking-widest transition-colors hover:text-[#D4AF37]">Features</Link>
            <Link href="#pricing" className="uppercase tracking-widest transition-colors hover:text-[#D4AF37]">Plans</Link>
            <Link href="/editor" className="uppercase tracking-widest transition-colors hover:text-[#D4AF37]">Workspace</Link>
          </nav>
          
          <div className="flex items-center gap-5">
            {userId ? (
              <>
                <Link href="/settings" className="hidden text-sm font-bold uppercase tracking-widest text-[#404040] transition-colors hover:text-[#171717] sm:block">Settings</Link>
                <Link href="/editor" className="hidden rounded bg-[#171717] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#D4AF37] hover:text-[#171717] sm:block">Open workspace</Link>
                <div className="pl-4 border-l-2 border-[#171717]"><UserButton /></div>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="hidden text-sm font-bold uppercase tracking-widest text-[#171717] transition-colors hover:text-[#D4AF37] sm:block">Log in</Link>
                <Link href="/sign-up" className="rounded bg-[#171717] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#D4AF37] hover:text-[#171717]">Get started</Link>
              </>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">{children}</main>
      
      <footer className="border-t-2 border-[#171717] bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-sm text-[#404040] sm:flex-row sm:justify-between">
          <p className="font-bold uppercase tracking-widest">© {new Date().getFullYear()} GemmaNote.</p>
          <div className="flex items-center gap-8 font-bold uppercase tracking-widest">
            <Link href="/editor" className="transition-colors hover:text-[#D4AF37]">Open workspace</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
