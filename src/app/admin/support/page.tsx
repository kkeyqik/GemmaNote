"use client";

import React, { useState } from "react";
import { 
  MessageSquare, Search, Filter, Mail, 
  CheckCircle2, Clock, AlertCircle, MessageCircle, Reply
} from "lucide-react";

// Dummy data for support tickets
const MOCK_TICKETS = [
  { id: "TK-1042", subject: "Cannot access my personal notebook", user: "john.doe@acme.inc", status: "Open", priority: "High", date: "2 hours ago" },
  { id: "TK-1041", subject: "Feature Request: Dark Mode on Mobile", user: "sarah@example.com", status: "Pending", priority: "Low", date: "1 day ago" },
  { id: "TK-1040", subject: "Billing issue with pro plan upgrade", user: "tony@stark.com", status: "Resolved", priority: "Medium", date: "3 days ago" },
  { id: "TK-1039", subject: "How do I export all my notes?", user: "emma@hogwarts.edu", status: "Resolved", priority: "Low", date: "5 days ago" },
];

export default function AdminSupportPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60 text-[11px] font-bold tracking-wide uppercase"><AlertCircle size={12} /> Open</span>;
      case "Pending": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 text-[11px] font-bold tracking-wide uppercase"><Clock size={12} /> Pending</span>;
      case "Resolved": return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[11px] font-bold tracking-wide uppercase"><CheckCircle2 size={12} /> Resolved</span>;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <MessageSquare className="text-indigo-500" size={24} />
            Support & Feedback
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Manage user support tickets, feedback, and feature requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col mb-8">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search tickets by subject, ID, or user..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="font-bold text-slate-700">1</span> Open Ticket
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ticket Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TICKETS.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-bold text-slate-800">{ticket.subject}</span>
                      <span className="text-[11px] font-bold text-slate-400 font-mono flex items-center gap-1.5"><MessageCircle size={12} /> {ticket.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-medium text-slate-600 flex items-center gap-1.5"><Mail size={12} className="text-slate-400" /> {ticket.user}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[12px] font-bold ${
                      ticket.priority === 'High' ? 'text-rose-600' : 
                      ticket.priority === 'Medium' ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(ticket.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-medium text-slate-600">{ticket.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="h-8 px-3 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-[12px] transition-colors flex items-center gap-1.5 ml-auto">
                      <Reply size={14} /> Reply
                    </button>
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
