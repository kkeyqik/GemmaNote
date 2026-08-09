"use client";

import React, { useState } from "react";
import { 
  Tag, Search, Filter, Plus, MoreVertical, Edit3, Trash2, 
  TrendingUp, TrendingDown, Minus
} from "lucide-react";

// Dummy data for tags
const MOCK_TAGS = [
  { id: "TAG-01", name: "reactjs", usage: 3450, trend: "up", createdBy: "System" },
  { id: "TAG-02", name: "marketing2024", usage: 1205, trend: "up", createdBy: "Naman Agarwal" },
  { id: "TAG-03", name: "bug-report", usage: 840, trend: "down", createdBy: "Tony Stark" },
  { id: "TAG-04", name: "design-system", usage: 2200, trend: "up", createdBy: "Emma Watson" },
  { id: "TAG-05", name: "drafts", usage: 50, trend: "flat", createdBy: "Sarah Connor" },
  { id: "TAG-06", name: "deprecated", usage: 12, trend: "down", createdBy: "System" },
];

export default function AdminTagsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case "up": return <TrendingUp size={14} className="text-emerald-500" />;
      case "down": return <TrendingDown size={14} className="text-rose-500" />;
      case "flat": return <Minus size={14} className="text-slate-400" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Tag className="text-indigo-500" size={24} />
            Tags
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Manage global tags, view trending topics, and merge duplicates.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="h-10 px-4 rounded-xl bg-indigo-600 text-white font-bold text-[13px] hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-500/20">
            <Plus size={16} /> Add Tag
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
              placeholder="Search tags..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">{MOCK_TAGS.length}</span> tags
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tag Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Usage Count</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Created By</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TAGS.map((tag) => (
                <tr key={tag.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                        #{tag.name}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 font-mono">{tag.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-bold text-slate-700">
                      {tag.usage.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 border border-slate-200">
                      {getTrendIcon(tag.trend)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-medium text-slate-600">{tag.createdBy}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Tag">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Tag">
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
