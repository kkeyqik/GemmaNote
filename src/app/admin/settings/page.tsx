"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Settings,
  Server,
  Database,
  Shield,
  Activity,
  Layers,
  Cpu,
  RefreshCw,
  Loader2,
  AlertCircle,
  HardDrive,
  Users,
  FileText,
  Key,
  Globe,
  Info,
  Sliders,
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalNotes: number;
  totalWorkspaces: number;
  activeUsers7d: number;
  estimatedStorageBytes: number;
  estimatedStorageSize: string;
  planDistribution?: Record<string, number>;
}

export default function AdminSettingsPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) {
        throw new Error(`Failed to load system stats (${res.status})`);
      }
      const data: AdminStats = await res.json();
      setStats(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error fetching stats";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const currentEnv = process.env.NODE_ENV || "development";

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Settings className="text-indigo-500" size={24} />
            Platform Configuration
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            System overview, runtime environment, database configuration, and live statistics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} /> Refresh Stats
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center justify-between text-[13px] font-medium">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchStats}
            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg font-bold text-[12px] transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Live System Metrics Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Activity size={13} /> Live System Status
            </span>
            <span className="text-[12px] font-mono text-slate-400">
              Env: <strong className="text-emerald-400 capitalize">{currentEnv}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-[12px] font-medium mb-1">
                <Users size={14} className="text-indigo-400" /> Total Users
              </div>
              <div className="text-2xl font-black text-white">
                {isLoading ? <Loader2 className="animate-spin text-indigo-400" size={20} /> : (stats?.totalUsers ?? 0)}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-[12px] font-medium mb-1">
                <FileText size={14} className="text-blue-400" /> Total Documents
              </div>
              <div className="text-2xl font-black text-white">
                {isLoading ? <Loader2 className="animate-spin text-blue-400" size={20} /> : (stats?.totalNotes ?? 0)}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-[12px] font-medium mb-1">
                <Layers size={14} className="text-purple-400" /> Workspaces
              </div>
              <div className="text-2xl font-black text-white">
                {isLoading ? <Loader2 className="animate-spin text-purple-400" size={20} /> : (stats?.totalWorkspaces ?? 0)}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-[12px] font-medium mb-1">
                <HardDrive size={14} className="text-emerald-400" /> Storage Used
              </div>
              <div className="text-2xl font-black text-white">
                {isLoading ? <Loader2 className="animate-spin text-emerald-400" size={20} /> : (stats?.estimatedStorageSize ?? "0 KB")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* System Info Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Cpu size={20} />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-slate-800">System Architecture</h2>
              <p className="text-[12px] text-slate-500">Core framework and engine details</p>
            </div>
          </div>

          <div className="space-y-3.5 text-[13px]">
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="font-bold text-slate-600 flex items-center gap-2">
                <Server size={14} className="text-slate-400" /> Next.js Version
              </span>
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                16.0.0 (App Router)
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="font-bold text-slate-600 flex items-center gap-2">
                <Layers size={14} className="text-slate-400" /> React Framework
              </span>
              <span className="font-bold text-slate-800">
                React 19
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="font-bold text-slate-600 flex items-center gap-2">
                <Database size={14} className="text-slate-400" /> Database Provider
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                Neon PostgreSQL (HTTP Serverless)
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="font-bold text-slate-600 flex items-center gap-2">
                <Shield size={14} className="text-slate-400" /> Auth Provider
              </span>
              <span className="font-bold text-slate-800">
                Clerk (@clerk/nextjs)
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="font-bold text-slate-600 flex items-center gap-2">
                <Sliders size={14} className="text-slate-400" /> ORM Library
              </span>
              <span className="font-bold text-slate-800">
                Prisma ORM 7.9
              </span>
            </div>
          </div>
        </div>

        {/* Environment & Policy Info Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-slate-800">Environment & Security</h2>
              <p className="text-[12px] text-slate-500">Deployment and access parameters</p>
            </div>
          </div>

          <div className="space-y-3.5 text-[13px]">
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="font-bold text-slate-600 flex items-center gap-2">
                <Globe size={14} className="text-slate-400" /> Deployment Environment
              </span>
              <span className={`font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${
                currentEnv === "production"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                {currentEnv}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="font-bold text-slate-600 flex items-center gap-2">
                <Shield size={14} className="text-slate-400" /> Admin Guard Helper
              </span>
              <span className="font-bold text-slate-800 font-mono text-[12px]">
                requireAdminUser()
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="font-bold text-slate-600 flex items-center gap-2">
                <Key size={14} className="text-slate-400" /> API Route Strategy
              </span>
              <span className="font-bold text-slate-800 font-mono text-[12px]">
                force-dynamic
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="font-bold text-slate-600 flex items-center gap-2">
                <Activity size={14} className="text-slate-400" /> Active 7-Day Users
              </span>
              <span className="font-bold text-slate-800">
                {stats?.activeUsers7d ?? 0}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Read-Only Configuration Reference */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Info size={18} className="text-indigo-500" />
          <h3 className="text-[15px] font-bold text-slate-800">Platform Limits & Quotas Reference</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
            <h4 className="text-[12px] font-bold text-slate-700 uppercase tracking-wider mb-1">FREE Plan Limit</h4>
            <p className="text-[18px] font-black text-slate-800">10 <span className="text-[12px] font-medium text-slate-500">generations/mo</span></p>
          </div>
          <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
            <h4 className="text-[12px] font-bold text-indigo-800 uppercase tracking-wider mb-1">PRO Plan Limit</h4>
            <p className="text-[18px] font-black text-indigo-900">200 <span className="text-[12px] font-medium text-indigo-600">generations/mo</span></p>
          </div>
          <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl">
            <h4 className="text-[12px] font-bold text-purple-800 uppercase tracking-wider mb-1">AGENCY Plan Limit</h4>
            <p className="text-[18px] font-black text-purple-900">Unlimited <span className="text-[12px] font-medium text-purple-600">generations/mo</span></p>
          </div>
        </div>
      </div>

    </div>
  );
}
