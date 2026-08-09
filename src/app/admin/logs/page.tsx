"use client";

import React, { useState } from "react";
import { 
  Terminal, Search, Filter, Download, 
  AlertTriangle, Info, XCircle, Play, Pause
} from "lucide-react";

// Dummy data for system logs
const MOCK_LOGS = [
  { id: "10492", timestamp: "2023-10-24T14:32:01.421Z", level: "ERROR", source: "API/Gateway", message: "Connection timeout while fetching user profile from external provider." },
  { id: "10493", timestamp: "2023-10-24T14:32:05.111Z", level: "INFO", source: "AuthService", message: "Successful login for user naman@gemmanote.com (IP: 192.168.1.104)" },
  { id: "10494", timestamp: "2023-10-24T14:35:12.890Z", level: "WARN", source: "Database", message: "Query execution time exceeded 500ms on table 'notes_metadata'" },
  { id: "10495", timestamp: "2023-10-24T14:40:00.001Z", level: "INFO", source: "CronJob", message: "Successfully executed daily storage cleanup job." },
  { id: "10496", timestamp: "2023-10-24T14:41:22.334Z", level: "ERROR", source: "Webhook", message: "Failed to deliver payload to Discord webhook (HTTP 429 Too Many Requests)" },
  { id: "10497", timestamp: "2023-10-24T14:45:10.999Z", level: "INFO", source: "StorageService", message: "Uploaded new attachment 'design_v2.png' to S3 bucket." },
];

export default function AdminLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLive, setIsLive] = useState(false);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "INFO": return <span className="inline-flex w-16 items-center justify-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-50 text-blue-600 border border-blue-200 uppercase tracking-wider"><Info size={10} /> INFO</span>;
      case "WARN": return <span className="inline-flex w-16 items-center justify-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-50 text-amber-600 border border-amber-200 uppercase tracking-wider"><AlertTriangle size={10} /> WARN</span>;
      case "ERROR": return <span className="inline-flex w-16 items-center justify-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-200 uppercase tracking-wider"><XCircle size={10} /> ERR</span>;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Terminal className="text-indigo-500" size={24} />
            System Logs
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Raw server and infrastructure logs for debugging.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`h-10 px-4 rounded-xl font-bold text-[13px] transition-colors flex items-center gap-2 shadow-sm border ${isLive ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            {isLive ? <><Pause size={16} /> Pause Live Tail</> : <><Play size={16} /> Live Tail</>}
          </button>
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Main Content Area - Log Terminal */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col flex-1">
        
        {/* Toolbar */}
        <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input 
              type="text" 
              placeholder="Grep logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 pl-9 pr-4 bg-slate-800 border border-slate-700 rounded-lg text-[12px] font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-300 placeholder:text-slate-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="text-[12px] font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <Filter size={14} /> Filter Levels
            </button>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed bg-[#0F172A] selection:bg-indigo-500/30">
          {MOCK_LOGS.map((log) => (
            <div key={log.id} className="flex items-start gap-4 py-1.5 hover:bg-slate-800/50 rounded px-2 group transition-colors">
              <div className="text-slate-500 shrink-0 w-[180px]">
                {log.timestamp}
              </div>
              <div className="shrink-0 w-16">
                {getLevelBadge(log.level)}
              </div>
              <div className="text-slate-400 shrink-0 w-[120px] truncate" title={log.source}>
                [{log.source}]
              </div>
              <div className={`flex-1 break-words ${log.level === 'ERROR' ? 'text-rose-400 font-medium' : log.level === 'WARN' ? 'text-amber-300' : 'text-slate-300'}`}>
                {log.message}
              </div>
            </div>
          ))}
          {isLive && (
            <div className="flex items-center gap-2 py-2 px-2 text-emerald-400 animate-pulse">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Waiting for new logs...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
