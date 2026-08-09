"use client";

import React, { useState } from "react";
import { 
  Activity, Search, Filter, Download, 
  UserPlus, FileText, Settings, ShieldAlert, LogIn, Trash2
} from "lucide-react";

// Dummy data for activity log
const MOCK_ACTIVITY = [
  { id: "LOG-01", event: "User login from new device", user: "naman@gemmanote.com", type: "auth", ip: "192.168.1.104", location: "San Francisco, CA", time: "2 minutes ago" },
  { id: "LOG-02", event: "Deleted notebook 'Old Marketing'", user: "sarah@example.com", type: "content", ip: "10.0.0.52", location: "New York, NY", time: "15 minutes ago" },
  { id: "LOG-03", event: "Changed global theme settings", user: "naman@gemmanote.com", type: "system", ip: "192.168.1.104", location: "San Francisco, CA", time: "1 hour ago" },
  { id: "LOG-04", event: "Failed login attempt (3x)", user: "unknown", type: "security", ip: "45.22.19.112", location: "Moscow, RU", time: "3 hours ago" },
  { id: "LOG-05", event: "Created new user 'Emma Watson'", user: "naman@gemmanote.com", type: "admin", ip: "192.168.1.104", location: "San Francisco, CA", time: "5 hours ago" },
  { id: "LOG-06", event: "Published note 'Q4 Roadmap'", user: "tony@stark.com", type: "content", ip: "172.16.254.1", location: "Malibu, CA", time: "1 day ago" },
];

export default function AdminActivityPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getEventIcon = (type: string) => {
    switch (type) {
      case "auth": return <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><LogIn size={14} /></div>;
      case "content": return <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><FileText size={14} /></div>;
      case "system": return <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><Settings size={14} /></div>;
      case "security": return <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0"><ShieldAlert size={14} /></div>;
      case "admin": return <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0"><UserPlus size={14} /></div>;
      default: return <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><Activity size={14} /></div>;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Activity className="text-indigo-500" size={24} />
            Activity Log
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Audit trail of all system events, logins, and content changes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download size={16} /> Export CSV
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
              placeholder="Search event, user, or IP..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
        </div>

        {/* Timeline / List */}
        <div className="p-6">
          <div className="space-y-6">
            {MOCK_ACTIVITY.map((log, index) => (
              <div key={log.id} className="flex gap-4 group relative">
                {/* Connecting Line */}
                {index !== MOCK_ACTIVITY.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-slate-100 group-hover:bg-indigo-100 transition-colors z-0"></div>
                )}
                
                <div className="relative z-10">
                  {getEventIcon(log.type)}
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-6 border-b border-slate-50 group-hover:border-slate-100 transition-colors">
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] font-bold text-slate-800">{log.event}</span>
                    <div className="flex items-center gap-3 text-[12px] font-medium text-slate-500">
                      <span className="text-indigo-600 font-bold">{log.user}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>{log.ip}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>{log.location}</span>
                    </div>
                  </div>
                  <div className="text-[12px] font-bold text-slate-400 shrink-0">
                    {log.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <button className="px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50" disabled>
            Newer
          </button>
          <button className="px-4 py-2 text-[12px] font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
            Older Logs
          </button>
        </div>

      </div>
    </div>
  );
}
