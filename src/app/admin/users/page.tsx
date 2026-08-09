"use client";

import React, { useState } from "react";
import { 
  Users, Search, Filter, Plus, MoreVertical, Shield, 
  CheckCircle2, XCircle, Mail, Clock, ChevronDown, Key
} from "lucide-react";

// Dummy data for users
const MOCK_USERS = [
  { id: 1, name: "Naman Agarwal", email: "naman@gemmanote.com", role: "Super Admin", status: "Active", joined: "Oct 12, 2023", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" },
  { id: 2, name: "Sarah Connor", email: "sarah@example.com", role: "Editor", status: "Active", joined: "Nov 04, 2023", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
  { id: 3, name: "John Doe", email: "john.doe@acme.inc", role: "User", status: "Inactive", joined: "Dec 15, 2023", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
  { id: 4, name: "Emma Watson", email: "emma@hogwarts.edu", role: "User", status: "Active", joined: "Jan 02, 2024", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" },
  { id: 5, name: "Miles Morales", email: "miles@spiderverse.com", role: "Admin", status: "Banned", joined: "Jan 18, 2024", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
  { id: 6, name: "Tony Stark", email: "tony@stark.com", role: "Editor", status: "Active", joined: "Feb 09, 2024", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150" },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Super Admin": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Admin": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "Editor": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[11px] font-bold tracking-wide uppercase"><CheckCircle2 size={12} /> Active</span>;
      case "Inactive": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200/60 text-[11px] font-bold tracking-wide uppercase"><Clock size={12} /> Inactive</span>;
      case "Banned": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60 text-[11px] font-bold tracking-wide uppercase"><XCircle size={12} /> Banned</span>;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Users className="text-indigo-500" size={24} />
            User Management
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Manage platform access, roles, and user accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="h-10 px-4 rounded-xl bg-indigo-600 text-white font-bold text-[13px] hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-500/20">
            <Plus size={16} /> Invite User
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">6</span> users
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" />
                        {user.status === "Active" && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>}
                        {user.status === "Inactive" && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-slate-400 border-2 border-white rounded-full"></span>}
                        {user.status === "Banned" && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-slate-800">{user.name}</span>
                        <span className="text-[12px] font-medium text-slate-500 flex items-center gap-1"><Mail size={10} /> {user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-medium text-slate-600">{user.joined}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Permissions">
                        <Shield size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Reset Password">
                        <Key size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <button className="px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50" disabled>
            Previous
          </button>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-[13px]">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 font-medium text-[13px] hover:bg-slate-100 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 font-medium text-[13px] hover:bg-slate-100 transition-colors">3</button>
          </div>
          <button className="px-4 py-2 text-[12px] font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
            Next
          </button>
        </div>

      </div>
    </div>
  );
}
