"use client";

import React, { useState } from "react";
import { 
  FileSpreadsheet, Search, Filter, Download, 
  Clock, FileText, Calendar, Plus, MoreVertical
} from "lucide-react";

// Dummy data for reports
const MOCK_REPORTS = [
  { id: "REP-001", name: "October 2023 Monthly Summary", type: "Financial", format: "PDF", date: "Nov 01, 2023", size: "2.4 MB", status: "Generated" },
  { id: "REP-002", name: "Q3 Active User Growth", type: "Analytics", format: "CSV", date: "Oct 05, 2023", size: "145 KB", status: "Generated" },
  { id: "REP-003", name: "Security Audit - Failed Logins", type: "Security", format: "CSV", date: "Oct 28, 2023", size: "32 KB", status: "Generated" },
  { id: "REP-004", name: "Storage Utilization Export", type: "Infrastructure", format: "XLSX", date: "Nov 05, 2023", size: "1.1 MB", status: "Processing" },
  { id: "REP-005", name: "Annual Revenue Projection", type: "Financial", format: "PDF", date: "Scheduled", size: "--", status: "Scheduled" },
];

export default function AdminReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Financial": return "bg-emerald-50 text-emerald-600 border-emerald-200/60";
      case "Analytics": return "bg-blue-50 text-blue-600 border-blue-200/60";
      case "Security": return "bg-rose-50 text-rose-600 border-rose-200/60";
      case "Infrastructure": return "bg-purple-50 text-purple-600 border-purple-200/60";
      default: return "bg-slate-50 text-slate-600 border-slate-200/60";
    }
  };

  const getStatusIndicator = (status: string) => {
    switch(status) {
      case "Generated": return <span className="flex items-center gap-1.5 text-[12px] font-bold text-emerald-600"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Ready</span>;
      case "Processing": return <span className="flex items-center gap-1.5 text-[12px] font-bold text-amber-500"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div> Generating...</span>;
      case "Scheduled": return <span className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500"><Clock size={12} /> Scheduled</span>;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <FileSpreadsheet className="text-indigo-500" size={24} />
            Reports & Exports
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Generate, schedule, and download system reports and financial data.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Calendar size={16} /> Scheduled Reports
          </button>
          <button className="h-10 px-4 rounded-xl bg-indigo-600 text-white font-bold text-[13px] hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-500/20">
            <Plus size={16} /> Generate New
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
              placeholder="Search reports..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Format / Size</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REPORTS.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800">{report.name}</span>
                      <span className="text-[11px] font-bold text-slate-400 font-mono mt-0.5">{report.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${getTypeBadge(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-bold text-slate-700 flex items-center gap-1.5">
                        <FileText size={14} className="text-slate-400" /> {report.format}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">{report.size}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-medium text-slate-600">{report.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusIndicator(report.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400" 
                        title="Download"
                        disabled={report.status !== "Generated"}
                      >
                        <Download size={16} />
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
