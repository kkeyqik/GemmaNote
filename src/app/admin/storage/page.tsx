"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  HardDrive, FileText, Trash2, BarChart2, RefreshCw, 
  AlertCircle, Users, Database, ArrowUpRight
} from "lucide-react";

interface TopUser {
  id: string;
  email: string;
  count: number;
}

interface StorageMetrics {
  totalDocuments: number;
  totalStorageBytes: number;
  totalStorageMB: number;
  trashedCount: number;
  trashedStorageBytes: number;
  trashedStorageMB: number;
  avgDocSizeBytes: number;
  avgDocSizeKB: number;
  topUsers: TopUser[];
}

export default function AdminStoragePage() {
  const [metrics, setMetrics] = useState<StorageMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStorageStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/storage");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Server returned status ${res.status}`);
      }
      const data: StorageMetrics = await res.json();
      setMetrics(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load storage metrics";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStorageStats();
  }, [fetchStorageStats]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const maxUserDocs = metrics?.topUsers && metrics.topUsers.length > 0 
    ? Math.max(...metrics.topUsers.map(u => u.count), 1) 
    : 1;

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <HardDrive className="text-indigo-500" size={24} />
            Storage & Infrastructure
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Real-time breakdown of document payload sizes, trash retention, and top user storage allocation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStorageStats}
            disabled={loading}
            className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin text-indigo-500" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-between gap-3 text-[13px] font-medium">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
          <button 
            onClick={fetchStorageStats}
            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-lg transition-colors text-[12px]"
          >
            Retry
          </button>
        </div>
      )}

      {/* Big Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* Total Documents */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-bold text-slate-500">Total Documents</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText size={18} />
            </div>
          </div>
          {loading ? (
            <div className="h-8 bg-slate-200 rounded w-24 animate-pulse my-1"></div>
          ) : (
            <div>
              <span className="text-2xl font-black text-slate-800">
                {metrics?.totalDocuments.toLocaleString() ?? 0}
              </span>
              <p className="text-[11px] font-medium text-slate-400 mt-1">
                Active & trashed notes combined
              </p>
            </div>
          )}
        </div>

        {/* Total Storage */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-bold text-slate-500">Total Storage</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HardDrive size={18} />
            </div>
          </div>
          {loading ? (
            <div className="h-8 bg-slate-200 rounded w-28 animate-pulse my-1"></div>
          ) : (
            <div>
              <span className="text-2xl font-black text-slate-800">
                {formatBytes(metrics?.totalStorageBytes ?? 0)}
              </span>
              <p className="text-[11px] font-medium text-slate-400 mt-1">
                Estimated payload size
              </p>
            </div>
          )}
        </div>

        {/* Trashed Docs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-bold text-slate-500">Trashed Docs</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trash2 size={18} />
            </div>
          </div>
          {loading ? (
            <div className="h-8 bg-slate-200 rounded w-20 animate-pulse my-1"></div>
          ) : (
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-800">
                  {metrics?.trashedCount.toLocaleString() ?? 0}
                </span>
                <span className="text-[12px] font-bold text-slate-400">
                  ({formatBytes(metrics?.trashedStorageBytes ?? 0)})
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 mt-1">
                Pending permanent deletion
              </p>
            </div>
          )}
        </div>

        {/* Avg Doc Size */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-bold text-slate-500">Avg Doc Size</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BarChart2 size={18} />
            </div>
          </div>
          {loading ? (
            <div className="h-8 bg-slate-200 rounded w-24 animate-pulse my-1"></div>
          ) : (
            <div>
              <span className="text-2xl font-black text-slate-800">
                {formatBytes(metrics?.avgDocSizeBytes ?? 0)}
              </span>
              <p className="text-[11px] font-medium text-slate-400 mt-1">
                Average payload per document
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Top 10 Users Pure CSS Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 flex flex-col justify-between">
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-[16px] font-extrabold text-slate-800 flex items-center gap-2">
                <Users size={18} className="text-indigo-500" />
                Top 10 Users by Document Count
              </h2>
              <p className="text-[12px] font-medium text-slate-500 mt-0.5">
                Users generating the highest volume of content on GemmaNote.
              </p>
            </div>
          </div>

          {loading ? (
            /* Loading Bar Chart Skeleton */
            <div className="space-y-4 animate-pulse my-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-slate-200 rounded w-40"></div>
                    <div className="h-4 bg-slate-200 rounded w-12"></div>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : !metrics?.topUsers || metrics.topUsers.length === 0 ? (
            /* Empty State */
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <Users size={24} />
              </div>
              <h3 className="text-[14px] font-bold text-slate-700">No user data available</h3>
              <p className="text-[12px] font-medium text-slate-400 mt-1">
                There are no user documents created yet.
              </p>
            </div>
          ) : (
            /* Pure CSS Bar Chart */
            <div className="space-y-5">
              {metrics.topUsers.map((user, idx) => {
                const percentage = Math.round((user.count / maxUserDocs) * 100);

                return (
                  <div key={user.id} className="group flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[13px]">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          idx === 0 ? "bg-indigo-600 text-white" :
                          idx === 1 ? "bg-indigo-100 text-indigo-700" :
                          idx === 2 ? "bg-purple-100 text-purple-700" :
                          "bg-slate-100 text-slate-600"
                        }`}>
                          #{idx + 1}
                        </span>
                        <span className="font-bold text-slate-800 truncate" title={user.email}>
                          {user.email}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-extrabold text-slate-800 text-[13px]">
                          {user.count.toLocaleString()}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {user.count === 1 ? "doc" : "docs"}
                        </span>
                      </div>
                    </div>

                    {/* Bar visualization */}
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex p-0.5">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-out group-hover:from-indigo-600 group-hover:to-purple-600"
                        style={{ width: `${Math.max(percentage, 3)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-400 font-medium">
            <span>Bar lengths relative to top contributor</span>
            <span className="font-bold text-slate-600">Top 10 ranking</span>
          </div>

        </div>

        {/* Right Column: Database & Storage Health Overview */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg relative overflow-hidden text-white flex flex-col justify-between">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
            
            <div>
              <h2 className="text-[15px] font-bold mb-4 flex items-center gap-2 text-indigo-300">
                <Database size={18} /> Engine & Storage Status
              </h2>
              
              <div className="space-y-4 text-[13px]">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400 font-medium">Prisma Database</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    HTTP Connected
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400 font-medium">Active Documents Ratio</span>
                  <span className="font-bold font-mono text-slate-200">
                    {metrics && metrics.totalDocuments > 0
                      ? `${Math.round(((metrics.totalDocuments - metrics.trashedCount) / metrics.totalDocuments) * 100)}%`
                      : "100%"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Trash Retention</span>
                  <span className="font-bold font-mono text-slate-200">
                    {metrics ? `${formatBytes(metrics.trashedStorageBytes)}` : "0 B"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-start gap-2.5">
              <ArrowUpRight size={16} className="text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                Document contents are stored as HTML/plainText in PostgreSQL. Average size reflects payload length.
              </p>
            </div>
          </div>

          <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-[13px] font-extrabold text-indigo-900 flex items-center gap-2">
                <HardDrive size={16} className="text-indigo-600" /> Storage Capacity Note
              </h3>
              <p className="text-[12px] font-medium text-indigo-700 mt-2 leading-relaxed">
                Document storage is calculated dynamically from content strings in PostgreSQL. No cloud object storage quota is currently impacted.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
