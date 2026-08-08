"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Pen,
  LayoutDashboard,
  Users,
  FileText,
  Library,
  Layers,
  Tag,
  Trash2,
  Activity,
  BarChart3,
  HardDrive,
  Settings,
  CreditCard,
  Receipt,
  FileBarChart,
  Blocks,
  Terminal,
  LifeBuoy,
  ChevronDown,
  User
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Notes", href: "/admin/notes", icon: FileText },
    { name: "Notebooks / Cards", href: "/admin/notebooks", icon: Library },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Tags", href: "/admin/tags", icon: Tag },
    { name: "Trash", href: "/admin/trash", icon: Trash2 },
    { name: "Activity Log", href: "/admin/activity", icon: Activity },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Storage", href: "/admin/storage", icon: HardDrive },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Subscription", href: "/admin/subscription", icon: CreditCard },
    { name: "Billing", href: "/admin/billing", icon: Receipt },
    { name: "Reports", href: "/admin/reports", icon: FileBarChart },
    { name: "Integrations", href: "/admin/integrations", icon: Blocks },
    { name: "System Logs", href: "/admin/logs", icon: Terminal },
    { name: "Support / Feedback", href: "/admin/support", icon: LifeBuoy },
  ];

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 flex flex-col bg-white border-r border-slate-100 z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-50 flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
          <Pen size={20} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 leading-tight tracking-tight">NotePad</h2>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin Panel</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                }
              `}
            >
              <Icon
                size={18}
                className={`transition-colors duration-200 ${
                  isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                }`}
              />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-slate-100 flex-shrink-0 bg-white">
        <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            <User size={20} className="text-slate-400" />
          </div>
          <div className="flex-1 flex flex-col items-start min-w-0">
            <span className="text-sm font-semibold text-slate-800 truncate w-full text-left">Naman Agarwal</span>
            <span className="text-xs text-slate-500 truncate w-full text-left">Super Admin</span>
          </div>
          <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 flex-shrink-0" />
        </button>
      </div>
    </aside>
  );
}
