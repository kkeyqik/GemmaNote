import { ReactNode } from "react";
import Link from "next/link";
import { PenSquare, Users, Settings, LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-800">
            <div className="p-1.5 bg-indigo-600 rounded text-white">
              <PenSquare size={16} />
            </div>
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
            <Users size={18} /> Users
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <Settings size={18} /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t flex items-center gap-3">
          <UserButton />
          <span className="text-sm font-medium text-slate-700">Admin</span>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
