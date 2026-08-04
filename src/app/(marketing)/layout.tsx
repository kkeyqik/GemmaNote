import { ReactNode } from "react";
import Link from "next/link";
import { PenSquare } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const { userId } = await auth();
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <PenSquare size={20} />
            </div>
            NotePad AI
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
            <Link href="/editor" className="hover:text-indigo-600 transition-colors">Open Editor</Link>
          </nav>

          <div className="flex items-center gap-4">
            {!userId ? (
              <>
                <Link href="/sign-in" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden md:block">
                  Log in
                </Link>
                <Link href="/sign-up" className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors shadow-md">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link href="/editor" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hidden md:block">
                  Go to Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} NotePad AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
