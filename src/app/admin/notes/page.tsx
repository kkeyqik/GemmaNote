"use client";

import React, { useState } from "react";
import { 
  FileText, Search, Filter, MoreVertical, Eye, Trash2, 
  Flag, CheckCircle2, Clock, Calendar, AlertTriangle
} from "lucide-react";

// Dummy data for notes
const MOCK_NOTES = [
  { id: "NT-001", title: "Project Q4 Roadmap", author: "Naman Agarwal", category: "Work", status: "Published", views: 1240, date: "Oct 24, 2023" },
  { id: "NT-002", title: "Personal Finances 2024", author: "Sarah Connor", category: "Personal", status: "Private", views: 12, date: "Nov 02, 2023" },
  { id: "NT-003", title: "GraphQL API Design", author: "Tony Stark", category: "Engineering", status: "Draft", views: 0, date: "Dec 10, 2023" },
  { id: "NT-004", title: "Inappropriate Content Draft", author: "John Doe", category: "Misc", status: "Flagged", views: 45, date: "Jan 15, 2024" },
  { id: "NT-005", title: "Meeting Notes: Design Sync", author: "Emma Watson", category: "Work", status: "Published", views: 89, date: "Feb 05, 2024" },
  { id: "NT-006", title: "Spider-Verse Ideas", author: "Miles Morales", category: "Creative", status: "Published", views: 3400, date: "Feb 20, 2024" },
];

export default function AdminNotesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[11px] font-bold tracking-wide uppercase"><CheckCircle2 size={12} /> Published</span>;
      case "Private": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200/60 text-[11px] font-bold tracking-wide uppercase"><Eye size={12} /> Private</span>;
      case "Draft": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-500 border border-blue-200/60 text-[11px] font-bold tracking-wide uppercase"><Clock size={12} /> Draft</span>;
      case "Flagged": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60 text-[11px] font-bold tracking-wide uppercase"><AlertTriangle size={12} /> Flagged</span>;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <FileText className="text-indigo-500" size={24} />
            Global Notes
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Moderate and manage all notes across the platform.</p>
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
              placeholder="Search notes by title, author, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">{MOCK_NOTES.length}</span> notes
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Note ID & Title</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Stats</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_NOTES.map((note) => (
                <tr key={note.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800">{note.title}</span>
                      <span className="text-[11px] font-bold text-slate-400 font-mono mt-0.5">{note.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                        {note.author.charAt(0)}
                      </div>
                      <span className="text-[13px] font-bold text-slate-700">{note.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/60">
                      {note.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(note.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-medium text-slate-500 flex items-center gap-1.5"><Eye size={12} className="text-slate-400" /> {note.views.toLocaleString()}</span>
                      <span className="text-[12px] font-medium text-slate-500 flex items-center gap-1.5"><Calendar size={12} className="text-slate-400" /> {note.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Note">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Flag Content">
                        <Flag size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Note">
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
