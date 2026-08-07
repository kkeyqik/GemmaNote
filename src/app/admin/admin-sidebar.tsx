"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LifeBuoy, PenSquare, Users } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function AdminSidebar() {
  const pathname = usePathname();
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".sidebar-anim", {
      x: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <aside ref={container} className="hidden w-[280px] flex-col border-r border-border bg-panel-alt/50 p-6 backdrop-blur-xl md:flex relative z-10">
      <Link href="/" className="sidebar-anim group flex items-center gap-3 font-outfit text-xl font-bold text-text">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-transform group-hover:scale-105">
          <PenSquare size={20} />
        </span>
        GemmaNote
      </Link>
      
      <p className="sidebar-anim mt-10 px-4 text-xs font-bold uppercase tracking-[0.2em] text-text-muted">Administration</p>
      
      <nav className="mt-4 space-y-2">
        <Link href="/admin" className={`sidebar-anim flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-semibold transition-all duration-300 ${pathname === "/admin" ? "bg-panel text-accent shadow-[0_4px_16px_rgba(0,0,0,0.03)]" : "text-text-muted hover:bg-panel/50 hover:text-text"}`}>
          <Users size={18} className={pathname === "/admin" ? "text-accent" : ""} />
          Users
        </Link>
        
        <Link href="/admin/support" className={`sidebar-anim flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-semibold transition-all duration-300 ${pathname === "/admin/support" ? "bg-panel text-accent shadow-[0_4px_16px_rgba(0,0,0,0.03)]" : "text-text-muted hover:bg-panel/50 hover:text-text"}`}>
          <LifeBuoy size={18} className={pathname === "/admin/support" ? "text-accent" : ""} />
          Support inbox
        </Link>
      </nav>

      <div className="sidebar-anim mt-auto flex items-center gap-3 rounded-2xl border border-border/50 bg-panel/50 p-4 backdrop-blur-md">
        <UserButton />
        <div>
          <p className="text-sm font-bold text-text">Administrator</p>
          <p className="text-xs text-text-muted">Full access</p>
        </div>
      </div>
    </aside>
  );
}
