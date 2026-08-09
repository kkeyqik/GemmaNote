"use client";

import React, { useState } from "react";
import { 
  Folder, Search, Filter, MoreVertical, Eye, Trash2, 
  Lock, Globe, Users, Database
} from "lucide-react";

// Dummy data for notebooks
const MOCK_NOTEBOOKS = [
  { id: "NB-001", name: "Q4 Marketing Campaigns", owner: "Naman Agarwal", count: 24, visibility: "Public", date: "Oct 12, 2023" },
  { id: "NB-002", name: "Engineering Docs", owner: "Tony Stark", count: 145, visibility: "Team", date: "Nov 02, 2023" },
  { id: "NB-003", name: "Personal Journal", owner: "Sarah Connor", count: 8, visibility: "Private", date: "Dec 10, 2023" },
  { id: "NB-004", name: "Design System V2", owner: "Emma Watson", count: 42, visibility: "Public", date: "Jan 15, 2024" },
  { id: "NB-005", name: "Archived Projects 2023", owner: "John Doe", count: 89, visibility: "Team", date: "Jan 30, 2024" },
];

export default function AdminNotebooksPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getVisibilityBadge = (visibility: string) => {
    switch (visibility) {
      case "Public": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[11px] font-bold tracking-wide uppercase"><Globe size={12} /> Public</span>;
      case "Private": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200/60 text-[11px] font-bold tracking-wide uppercase"><Lock size={12} /> Private</span>;
      case "Team": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-500 border border-indigo-200/60 text-[11px] font-bold tracking-wide uppercase"><Users size={12} /> Team</span>;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Folder className="text-indigo-500" size={24} />
            Notebooks & Cards
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Manage all collections, notebooks, and note groups.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={16} /> Filters
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
              placeholder="Search notebooks by name, owner, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">{MOCK_NOTEBOOKS.length}</span> notebooks
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Notebook Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Note Count</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Visibility</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_NOTEBOOKS.map((notebook) => (
                <tr key={notebook.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                        <Folder size={18} fill="currentColor" className="text-slate-300" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-slate-800">{notebook.name}</span>
                        <span className="text-[11px] font-bold text-slate-400 font-mono mt-0.5">{notebook.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-bold text-slate-700">{notebook.owner}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-bold text-slate-600 flex items-center gap-1.5">
                      <Database size={14} className="text-indigo-400" /> {notebook.count}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getVisibilityBadge(notebook.visibility)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-medium text-slate-600">{notebook.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Contents">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Notebook">
                        <Trash2 size={16} />
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
          </div>
          <button className="px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50" disabled>
            Next
          </button>
        </div>

      </div>
    </div>
  );
}
