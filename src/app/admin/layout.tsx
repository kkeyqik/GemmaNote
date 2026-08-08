import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getAdminAccess } from "@/lib/admin-auth";
import { AdminSidebar } from "./admin-sidebar";
import { Menu, Search, Bell, Moon, User } from "lucide-react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const access = await getAdminAccess();
  if (access === "unauthenticated") redirect("/sign-in");
  if (access === "forbidden") notFound();
  
  return (
    <div className="min-h-screen font-sans text-slate-900 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50">
      <AdminSidebar />
      <main className="min-h-screen relative" style={{ paddingLeft: '18rem' }}>
        
        {/* Sticky Topbar */}
        <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-white/20 bg-white/40 px-8 backdrop-blur-md">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <button className="rounded-xl p-2 text-slate-500 hover:bg-white/60 hover:text-slate-900 transition-colors lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500 hidden sm:block">
                Welcome back! Here's what's happening with your NotePad app.
              </p>
            </div>
          </div>

          {/* Middle: Search bar */}
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200/60 bg-white/60 py-2.5 pl-10 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                placeholder="Search users, notes, tags..."
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-500">
                  ⌘ K
                </span>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="relative rounded-xl p-2 text-slate-500 hover:bg-white/60 hover:text-slate-900 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[9px] font-bold text-white ring-2 ring-white">
                8
              </span>
            </button>
            <button className="rounded-xl p-2 text-slate-500 hover:bg-white/60 hover:text-slate-900 transition-colors">
              <Moon className="h-5 w-5" />
            </button>
            <div className="ml-2 h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-sm">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-indigo-600">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
