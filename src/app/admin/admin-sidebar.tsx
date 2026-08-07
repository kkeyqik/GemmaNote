"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Users, LifeBuoy, LogOut } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function AdminSidebar() {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Sidebar entrance animation
    gsap.from(sidebarRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Links staggered entrance
    if (linksRef.current) {
      gsap.from(linksRef.current.children, {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, { scope: sidebarRef });

  const navItems = [
    { name: "Users", href: "/admin", icon: Users },
    { name: "Support", href: "/admin/support", icon: LifeBuoy },
  ];

  return (
    <div
      ref={sidebarRef}
      className="flex flex-col bg-white/80 backdrop-blur-xl border-r border-slate-200 p-6 z-50 shadow-sm"
      style={{ width: '16rem', height: '100vh', position: 'fixed', left: 0, top: 0 }}
    >
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
          G
        </div>
        <h2 className="text-xl font-semibold text-slate-800 tracking-tight">Gemma Admin</h2>
      </div>

      <nav ref={linksRef} className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              <Icon
                size={20}
                className={`transition-colors duration-300 ${
                  isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-100">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 group"
        >
          <LogOut size={20} className="text-slate-400 group-hover:text-slate-600" />
          Exit Admin
        </Link>
      </div>
    </div>
  );
}
