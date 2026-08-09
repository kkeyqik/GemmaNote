"use client";

import React from "react";
import { 
  HardDrive, Server, Database, Cloud, AlertCircle, 
  Image as ImageIcon, FileText, FolderArchive, ArrowUpCircle
} from "lucide-react";

export default function AdminStoragePage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <HardDrive className="text-indigo-500" size={24} />
            Storage & Infrastructure
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Monitor server storage limits, databases, and media assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-indigo-600 text-white font-bold text-[13px] hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-500/20">
            <ArrowUpCircle size={16} /> Upgrade Capacity
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Usage Overview */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Main Storage Bar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
                <Cloud className="text-indigo-500" size={18} /> Global Storage Usage
              </h2>
              <span className="text-[13px] font-bold text-slate-500">74% Capacity</span>
            </div>
            
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-black text-slate-800">3.7 <span className="text-xl font-bold text-slate-400">TB</span></span>
              <span className="text-[13px] font-bold text-slate-500">of 5.0 TB Total</span>
            </div>
            
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex mb-6">
              <div className="h-full bg-indigo-500" style={{ width: '45%' }} title="Images (1.66 TB)"></div>
              <div className="h-full bg-blue-400" style={{ width: '20%' }} title="Documents (740 GB)"></div>
              <div className="h-full bg-emerald-400" style={{ width: '9%' }} title="Text Notes (330 GB)"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <span className="flex items-center gap-1.5 text-[12px] font-bold text-indigo-700">
                  <ImageIcon size={14} /> Images
                </span>
                <span className="text-[16px] font-black text-slate-800">1.66 TB</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <span className="flex items-center gap-1.5 text-[12px] font-bold text-blue-700">
                  <FileText size={14} /> Documents
                </span>
                <span className="text-[16px] font-black text-slate-800">740 GB</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="flex items-center gap-1.5 text-[12px] font-bold text-emerald-700">
                  <FolderArchive size={14} /> Text Notes
                </span>
                <span className="text-[16px] font-black text-slate-800">330 GB</span>
              </div>
            </div>
          </div>

          {/* Infrastructure Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Database size={24} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-slate-800">Database Size (RDS)</h3>
                <p className="text-[12px] font-medium text-slate-500 mt-1 mb-3">Primary Postgres cluster across 2 zones.</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-800">142 GB</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">Healthy</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Server size={24} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-slate-800">Bandwidth Usage</h3>
                <p className="text-[12px] font-medium text-slate-500 mt-1 mb-3">Total egress traffic this billing cycle.</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-800">8.4 TB</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">Warning (85%)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Status & Alerts */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
            <h2 className="text-[15px] font-bold text-white mb-6 flex items-center gap-2 relative z-10">
              <Server className="text-indigo-400" size={18} /> System Status
            </h2>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[13px] font-bold text-slate-300">API Servers</span>
                </div>
                <span className="text-[12px] font-mono text-emerald-400">99.99%</span>
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[13px] font-bold text-slate-300">File Storage (S3)</span>
                </div>
                <span className="text-[12px] font-mono text-emerald-400">100.0%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                  <span className="text-[13px] font-bold text-slate-300">Search Cluster</span>
                </div>
                <span className="text-[12px] font-mono text-amber-400">High Load</span>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl flex gap-4">
            <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-[13px] font-bold text-rose-800">Storage Warning</h3>
              <p className="text-[12px] font-medium text-rose-600 mt-1 leading-relaxed">
                You are approaching your 5TB global storage limit. Once exceeded, uploads may be restricted until capacity is expanded.
              </p>
              <button className="mt-3 text-[12px] font-bold text-rose-700 hover:text-rose-800 underline underline-offset-2">
                Review storage plans
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
