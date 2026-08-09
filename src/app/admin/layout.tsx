import React from "react";
import { 
  PenSquare, LayoutDashboard, Users, FileText, Folder, Grid, Tag, Trash2, 
  Activity, BarChart2, HardDrive, Settings, CreditCard, Receipt, FileSpreadsheet, 
  Blocks, Terminal, MessageSquare, Search, Bell, Moon, ChevronDown, Menu, LogOut
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { requireAdminUser } from "@/lib/app-auth";

export const metadata = {
  title: "Admin Panel - GemmaNote",
  description: "GemmaNote Admin Dashboard",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let adminUser;
  try {
    adminUser = await requireAdminUser();
  } catch (error: any) {
    if (error?.status === 401) {
      redirect("/login");
    }
    // Non-admin logged in user -> redirect to dashboard
    redirect("/dashboard");
  }

  const displayName = adminUser.email.split("@")[0] || "Admin";

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-sans min-h-screen flex selection:bg-indigo-500/30 w-full">
        
        {/* Sidebar */}
        <aside className="w-[260px] bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
          {/* Logo */}
          <div className="h-20 flex items-center px-8 border-b border-slate-50 mb-4 shrink-0">
            <Logo subtitle="Admin Panel" />
          </div>

          {/* Nav Items */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1 custom-scrollbar">
            
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-[13px] transition-colors">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <Users size={18} /> Users
            </Link>

            <Link href="/admin/notes" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <FileText size={18} /> Notes
            </Link>

            <Link href="/admin/notebooks" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <Folder size={18} /> Notebooks / Cards
            </Link>

            <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <Grid size={18} /> Categories
            </Link>

            <Link href="/admin/tags" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <Tag size={18} /> Tags
            </Link>

            <Link href="/admin/trash" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <Trash2 size={18} /> Trash
            </Link>

            <Link href="/admin/activity" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <Activity size={18} /> Activity Log
            </Link>

            <Link href="/admin/analytics" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <BarChart2 size={18} /> Analytics
            </Link>

            <Link href="/admin/storage" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <HardDrive size={18} /> Storage
            </Link>

            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <Settings size={18} /> Settings
            </Link>

            <Link href="/admin/subscription" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <CreditCard size={18} /> Subscription
            </Link>

            <Link href="/admin/billing" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <Receipt size={18} /> Billing
            </Link>

            <Link href="/admin/reports" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <FileSpreadsheet size={18} /> Reports
            </Link>

            <Link href="/admin/integrations" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <Blocks size={18} /> Integrations
            </Link>

            <Link href="/admin/logs" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <Terminal size={18} /> System Logs
            </Link>

            <Link href="/admin/support" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl font-medium text-[13px] transition-colors">
              <MessageSquare size={18} /> Support / Feedback
            </Link>

          </div>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-slate-100 shrink-0">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-slate-800 truncate capitalize">{displayName}</span>
                  <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">{adminUser.role || "ADMIN"}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          
          {/* Top Header */}
          <header className="h-20 bg-white/50 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
            
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-slate-500 hover:text-slate-800">
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-[20px] font-extrabold text-slate-800 flex items-center gap-2">
                  <Menu size={20} className="hidden lg:block text-slate-400 mr-1" />
                  Dashboard
                </h1>
                <p className="text-[12px] font-medium text-slate-500">Welcome back! Here's what's happening with your GemmaNote app.</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              
              <div className="relative hidden md:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search users, notes, tags..." 
                  className="w-[280px] h-10 pl-10 pr-12 bg-slate-100/50 border border-slate-200/50 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-slate-400">
                  <kbd className="font-sans text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-sm">⌘</kbd>
                  <kbd className="font-sans text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-sm">K</kbd>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                  <Moon size={20} />
                </button>
              </div>

              <div className="w-px h-8 bg-slate-200"></div>

              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm border border-slate-200">
                {displayName.charAt(0).toUpperCase()}
              </div>

            </div>

          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
            {children}
          </div>

        </main>
      </div>
  );
}

