"use client";

import React, { useState } from "react";
import { 
  Trash2, Search, Filter, RotateCcw, XCircle, AlertCircle,
  FileText, Folder, Grid
} from "lucide-react";

// Dummy data for trash items
const MOCK_TRASH = [
  { id: "TR-01", name: "Old Marketing Draft", type: "Note", deletedBy: "Naman Agarwal", deletedDate: "Oct 24, 2023", purgeIn: "2 days" },
  { id: "TR-02", name: "2022 Financials", type: "Notebook", deletedBy: "Sarah Connor", deletedDate: "Oct 25, 2023", purgeIn: "3 days" },
  { id: "TR-03", name: "Deprecated Components", type: "Note", deletedBy: "Tony Stark", deletedDate: "Nov 01, 2023", purgeIn: "10 days" },
  { id: "TR-04", name: "Unused Tags Collection", type: "Category", deletedBy: "System", deletedDate: "Nov 15, 2023", purgeIn: "24 days" },
];

export default function AdminTrashPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Note": return <FileText size={14} className="text-blue-500" />;
      case "Notebook": return <Folder size={14} className="text-amber-500" />;
      case "Category": return <Grid size={14} className="text-purple-500" />;
      default: return <FileText size={14} className="text-slate-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Note": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Notebook": return "bg-amber-50 text-amber-600 border-amber-100";
      case "Category": return "bg-purple-50 text-purple-600 border-purple-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Trash2 className="text-rose-500" size={24} />
            Trash
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Manage deleted items. Items are permanently removed after 30 days.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="h-10 px-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-bold text-[13px] hover:bg-rose-100 transition-colors flex items-center gap-2 shadow-sm">
            <XCircle size={16} /> Empty Trash
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
              placeholder="Search deleted items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">{MOCK_TRASH.length}</span> items
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Deleted By</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Deleted Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Auto-Purge In</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TRASH.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800 line-through decoration-slate-300 text-opacity-80">{item.name}</span>
                      <span className="text-[11px] font-bold text-slate-400 font-mono mt-0.5">{item.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${getTypeBadge(item.type)}`}>
                      {getTypeIcon(item.type)} {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-medium text-slate-600">{item.deletedBy}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-medium text-slate-600">{item.deletedDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-rose-500">
                      <AlertCircle size={14} /> {item.purgeIn}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Restore Item">
                        <RotateCcw size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Permanently">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {MOCK_TRASH.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Trash2 size={32} className="mb-3 opacity-20" />
                      <p className="text-[14px] font-medium">The trash is empty</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
