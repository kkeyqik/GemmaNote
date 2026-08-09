"use client";

import React, { useState } from "react";
import { 
  Grid, Search, Filter, Plus, MoreVertical, Edit3, Trash2, 
  Briefcase, Heart, Cpu, Palette, Book, Code
} from "lucide-react";

// Dummy data for categories
const MOCK_CATEGORIES = [
  { id: "CAT-01", name: "Work & Business", icon: <Briefcase size={16} />, color: "bg-blue-100 text-blue-600", notesCount: 12450, status: "Active" },
  { id: "CAT-02", name: "Personal Health", icon: <Heart size={16} />, color: "bg-rose-100 text-rose-600", notesCount: 8430, status: "Active" },
  { id: "CAT-03", name: "Engineering", icon: <Cpu size={16} />, color: "bg-indigo-100 text-indigo-600", notesCount: 15200, status: "Active" },
  { id: "CAT-04", name: "Design & UX", icon: <Palette size={16} />, color: "bg-fuchsia-100 text-fuchsia-600", notesCount: 4120, status: "Active" },
  { id: "CAT-05", name: "Education", icon: <Book size={16} />, color: "bg-emerald-100 text-emerald-600", notesCount: 6780, status: "Active" },
  { id: "CAT-06", name: "Legacy Code", icon: <Code size={16} />, color: "bg-slate-100 text-slate-500", notesCount: 120, status: "Archived" },
];

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Grid className="text-indigo-500" size={24} />
            Categories
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Manage global platform categories used for organizing notes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="h-10 px-4 rounded-xl bg-indigo-600 text-white font-bold text-[13px] hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-500/20">
            <Plus size={16} /> Add Category
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
              placeholder="Search categories by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">{MOCK_CATEGORIES.length}</span> categories
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Theme / Icon</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Notes Count</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_CATEGORIES.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800">{cat.name}</span>
                      <span className="text-[11px] font-bold text-slate-400 font-mono mt-0.5">{cat.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color}`}>
                      {cat.icon}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-bold text-slate-700 flex items-center gap-1.5">
                      {cat.notesCount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {cat.status === "Active" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">Active</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200/60">Archived</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Category">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Category">
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
      </div>
    </div>
  );
}
