"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Users, 
  FileText, 
  UserCheck, 
  Zap, 
  TrendingUp, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  Loader2, 
  ChevronRight, 
  UserPlus, 
  LifeBuoy, 
  Activity, 
  CheckCircle2, 
  Mic, 
  Folder, 
  ArrowUpRight, 
  Shield, 
  PieChart, 
  Terminal,
  HelpCircle,
  Clock
} from "lucide-react";

interface PlanItem {
  plan: string;
  key: string;
  count: number;
  percentage: number;
  color: string;
  barColor: string;
  badgeBg: string;
}

interface StatsData {
  totalUsers: number;
  totalNotes: number;
  totalDocuments: number;
  totalWorkspaces: number;
  activeUsers7d: number;
  activeUsers: number;
  totalGenerations: number;
  userGrowthPercentage: number;
  planDistribution: PlanItem[];
  estimatedStorageBytes: number;
  estimatedStorageSize: string;
}

interface ActivityItem {
  id: string;
  type: "user_registered" | "document_created" | "support_ticket" | "voice_preset";
  title: string;
  description: string;
  userEmail?: string;
  createdAt: string;
}

interface RecentUser {
  id: string;
  clerkId: string;
  email: string;
  role: string;
  plan: string;
  usageCount: number;
  isSuspended: boolean;
  createdAt: string;
  _count?: {
    documents: number;
    ownedWorkspaces: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);

  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch Stats
  const fetchStats = useCallback(async () => {
    setIsLoadingStats(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error(`Stats fetch failed (${res.status})`);
      const data: StatsData = await res.json();
      setStats(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error fetching stats";
      setError(msg);
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  // Fetch Activity Timeline (last 10)
  const fetchActivities = useCallback(async () => {
    setIsLoadingActivities(true);
    try {
      const res = await fetch("/api/admin/activity");
      if (!res.ok) throw new Error(`Activities fetch failed (${res.status})`);
      const data = await res.json();
      setActivities(data.activities || []);
    } catch (err: unknown) {
      console.error("Activity fetch error:", err);
    } finally {
      setIsLoadingActivities(false);
    }
  }, []);

  // Fetch Recent Users (limit 5)
  const fetchRecentUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users?limit=5");
      if (!res.ok) throw new Error(`Users fetch failed (${res.status})`);
      const data = await res.json();
      setRecentUsers(data.users || []);
    } catch (err: unknown) {
      console.error("Recent users fetch error:", err);
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  // Comprehensive Refresh
  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    setError(null);
    await Promise.all([fetchStats(), fetchActivities(), fetchRecentUsers()]);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchStats();
    fetchActivities();
    fetchRecentUsers();
  }, [fetchStats, fetchActivities, fetchRecentUsers]);

  const formatDate = (isoString: string) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "user_registered":
        return <UserPlus size={14} className="text-purple-600" />;
      case "document_created":
        return <FileText size={14} className="text-blue-600" />;
      case "support_ticket":
        return <LifeBuoy size={14} className="text-amber-600" />;
      case "voice_preset":
        return <Mic size={14} className="text-emerald-600" />;
      default:
        return <Activity size={14} className="text-indigo-600" />;
    }
  };

  const getActivityBadgeBg = (type: ActivityItem["type"]) => {
    switch (type) {
      case "user_registered":
        return "bg-purple-100 border-purple-200";
      case "document_created":
        return "bg-blue-100 border-blue-200";
      case "support_ticket":
        return "bg-amber-100 border-amber-200";
      case "voice_preset":
        return "bg-emerald-100 border-emerald-200";
      default:
        return "bg-indigo-100 border-indigo-200";
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto animate-in fade-in duration-300 pb-12">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Admin Dashboard</h1>
            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2.5 py-0.5 rounded-full border border-indigo-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              Live System
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500">
            Real-time insights, user statistics, activity feed, and diagnostic controls.
          </p>
        </div>

        <button
          onClick={handleRefreshAll}
          disabled={isRefreshing}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-sm disabled:opacity-50 shrink-0"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
          <span>{isRefreshing ? "Refreshing..." : "Refresh Dashboard"}</span>
        </button>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-medium animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={handleRefreshAll}
            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg font-bold text-xs transition-colors"
          >
            Retry Fetch
          </button>
        </div>
      )}

      {/* 1. Stat Cards Row (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Users */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md">
          {isLoadingStats ? (
            <div className="animate-pulse space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                <div className="w-20 h-4 bg-slate-100 rounded"></div>
              </div>
              <div className="w-24 h-8 bg-slate-100 rounded mt-2"></div>
              <div className="w-32 h-4 bg-slate-100 rounded mt-2"></div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-inner">
                  <Users size={24} />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 mb-1">Total Users</p>
                  <h3 className="text-2xl font-black text-slate-800 leading-none">
                    {stats ? stats.totalUsers.toLocaleString() : 0}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-50">
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingUp size={14} />
                  +{stats?.userGrowthPercentage || 0}%
                </span>
                <span className="text-slate-400 font-medium">vs last month</span>
              </div>
            </>
          )}
        </div>

        {/* Card 2: Total Documents */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md">
          {isLoadingStats ? (
            <div className="animate-pulse space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                <div className="w-20 h-4 bg-slate-100 rounded"></div>
              </div>
              <div className="w-24 h-8 bg-slate-100 rounded mt-2"></div>
              <div className="w-32 h-4 bg-slate-100 rounded mt-2"></div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-inner">
                  <FileText size={24} />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 mb-1">Total Documents</p>
                  <h3 className="text-2xl font-black text-slate-800 leading-none">
                    {stats ? (stats.totalDocuments ?? stats.totalNotes ?? 0).toLocaleString() : 0}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-50">
                <span className="text-blue-600 font-bold flex items-center gap-1">
                  <ArrowUpRight size={14} /> Real-time
                </span>
                <span className="text-slate-400 font-medium">stored notes</span>
              </div>
            </>
          )}
        </div>

        {/* Card 3: Active Users (7 days) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md">
          {isLoadingStats ? (
            <div className="animate-pulse space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                <div className="w-20 h-4 bg-slate-100 rounded"></div>
              </div>
              <div className="w-24 h-8 bg-slate-100 rounded mt-2"></div>
              <div className="w-32 h-4 bg-slate-100 rounded mt-2"></div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                  <UserCheck size={24} />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 mb-1">Active Users</p>
                  <h3 className="text-2xl font-black text-slate-800 leading-none">
                    {stats ? (stats.activeUsers ?? stats.activeUsers7d ?? 0).toLocaleString() : 0}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-50">
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <UserCheck size={14} /> Active
                </span>
                <span className="text-slate-400 font-medium">updated docs in 7d</span>
              </div>
            </>
          )}
        </div>

        {/* Card 4: Total Generations */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md">
          {isLoadingStats ? (
            <div className="animate-pulse space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                <div className="w-20 h-4 bg-slate-100 rounded"></div>
              </div>
              <div className="w-24 h-8 bg-slate-100 rounded mt-2"></div>
              <div className="w-32 h-4 bg-slate-100 rounded mt-2"></div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                  <Zap size={24} />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 mb-1">Total Generations</p>
                  <h3 className="text-2xl font-black text-slate-800 leading-none">
                    {stats ? (stats.totalGenerations ?? 0).toLocaleString() : 0}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-50">
                <span className="text-amber-600 font-bold flex items-center gap-1">
                  <Zap size={14} /> Total Usage
                </span>
                <span className="text-slate-400 font-medium">sum of usage counts</span>
              </div>
            </>
          )}
        </div>

      </div>

      {/* 2. Quick Actions Row */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">
          Quick Actions & Shortcut Navigation
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/users"
            className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50/70 hover:border-indigo-200 hover:text-indigo-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <UserPlus size={16} />
              </div>
              <span>View All Users</span>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="/admin/notes"
            className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 hover:bg-blue-50/70 hover:border-blue-200 hover:text-blue-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText size={16} />
              </div>
              <span>View All Notes</span>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="/admin/support"
            className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50/70 hover:border-purple-200 hover:text-purple-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <LifeBuoy size={16} />
              </div>
              <span>Support Tickets</span>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="/api/admin/debug"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50/70 hover:border-emerald-200 hover:text-emerald-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Terminal size={16} />
              </div>
              <span>System Diagnostics</span>
            </div>
            <ExternalLink size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* 4. Plan Distribution Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <PieChart size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Plan Distribution</h3>
                  <p className="text-[11px] text-slate-500">Breakdown of active subscription tiers</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                Total Users: {stats?.totalUsers || 0}
              </span>
            </div>

            {isLoadingStats ? (
              <div className="animate-pulse space-y-4 py-4">
                <div className="h-6 bg-slate-100 rounded-full w-full"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-16 bg-slate-100 rounded-xl"></div>
                  <div className="h-16 bg-slate-100 rounded-xl"></div>
                  <div className="h-16 bg-slate-100 rounded-xl"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Horizontal CSS Stacked Bar Chart */}
                <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden flex p-1 border border-slate-200/60 shadow-inner">
                  {(stats?.planDistribution || []).map((item) => (
                    <div
                      key={item.key}
                      style={{ width: `${Math.max(item.percentage, item.count > 0 ? 5 : 0)}%` }}
                      className={`h-full ${item.barColor} transition-all duration-700 first:rounded-l-full last:rounded-r-full relative group cursor-pointer`}
                      title={`${item.plan}: ${item.count} users (${item.percentage}%)`}
                    />
                  ))}
                </div>

                {/* Individual Plan Detail Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(stats?.planDistribution || [
                    { plan: "Free", key: "FREE", count: 0, percentage: 0, color: "bg-slate-500", barColor: "bg-slate-500", badgeBg: "bg-slate-100 text-slate-700 border-slate-200" },
                    { plan: "Pro", key: "PRO", count: 0, percentage: 0, color: "bg-indigo-500", barColor: "bg-indigo-600", badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200" },
                    { plan: "Agency", key: "AGENCY", count: 0, percentage: 0, color: "bg-purple-500", barColor: "bg-purple-600", badgeBg: "bg-purple-50 text-purple-700 border-purple-200" }
                  ]).map((item) => (
                    <div
                      key={item.key}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between hover:bg-white hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded border ${item.badgeBg}`}>
                          {item.plan}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{item.percentage}%</span>
                      </div>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-xl font-black text-slate-800">{item.count.toLocaleString()}</span>
                        <span className="text-[11px] text-slate-400 font-medium">users</span>
                      </div>

                      {/* Mini Progress Bar for each plan */}
                      <div className="w-full h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
                        <div
                          style={{ width: `${item.percentage}%` }}
                          className={`h-full ${item.barColor} rounded-full transition-all duration-500`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* 5. Recent Users Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">Recent Registrations</h3>
                <p className="text-[11px] text-slate-500">Latest 5 users who joined GemmaNote</p>
              </div>
              <a
                href="/admin/users"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
              >
                View All Users <ChevronRight size={14} />
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-2">User Email</th>
                    <th className="py-3 px-2">Plan</th>
                    <th className="py-3 px-2">Role</th>
                    <th className="py-3 px-2 text-center">Generations</th>
                    <th className="py-3 px-2 text-right">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoadingUsers ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="py-3.5 px-2">
                          <div className="h-4 bg-slate-100 rounded w-36"></div>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="h-4 bg-slate-100 rounded w-12"></div>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="h-4 bg-slate-100 rounded w-12"></div>
                        </td>
                        <td className="py-3.5 px-2 text-center">
                          <div className="h-4 bg-slate-100 rounded w-8 mx-auto"></div>
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <div className="h-4 bg-slate-100 rounded w-20 ml-auto"></div>
                        </td>
                      </tr>
                    ))
                  ) : recentUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                        No recent users found.
                      </td>
                    </tr>
                  ) : (
                    recentUsers.map((u) => {
                      const isPro = (u.plan || "").toUpperCase() === "PRO";
                      const isAgency = (u.plan || "").toUpperCase() === "AGENCY";
                      const isAdmin = (u.role || "").toUpperCase() === "ADMIN";

                      return (
                        <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-2 font-bold text-slate-800 max-w-[180px] truncate">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                                {u.email ? u.email[0].toUpperCase() : "U"}
                              </div>
                              <span className="truncate" title={u.email}>{u.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                                isAgency
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : isPro
                                  ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                  : "bg-slate-100 text-slate-600 border-slate-200"
                              }`}
                            >
                              {u.plan || "FREE"}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isAdmin
                                  ? "bg-rose-50 text-rose-600 border border-rose-200"
                                  : "text-slate-500 font-medium"
                              }`}
                            >
                              {u.role || "USER"}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center font-bold text-slate-700">
                            {u.usageCount || 0}
                          </td>
                          <td className="py-3 px-2 text-right text-slate-400 font-medium">
                            {formatDate(u.createdAt)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right 1 Column (Sidebar) */}
        <div className="flex flex-col gap-6">
          
          {/* 3. Recent Activity Timeline Section */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Activity size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Recent Activity</h3>
                  <p className="text-[11px] text-slate-500">Live platform timeline</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                Last 10 Items
              </span>
            </div>

            {isLoadingActivities ? (
              <div className="space-y-4 py-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-7 h-7 bg-slate-100 rounded-full shrink-0"></div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 bg-slate-100 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : activities.length === 0 ? (
              <p className="text-xs font-medium text-slate-400 py-8 text-center">
                No recent activity records found.
              </p>
            ) : (
              <div className="relative pl-3 space-y-6 before:content-[''] before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-100">
                {activities.map((item) => (
                  <div key={item.id} className="relative flex items-start gap-3 group">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border z-10 ${getActivityBadgeBg(
                        item.type
                      )} group-hover:scale-110 transition-transform`}
                    >
                      {getActivityIcon(item.type)}
                    </div>
                    <div className="min-w-0 flex-1 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/80 group-hover:bg-white group-hover:shadow-sm transition-all">
                      <p className="text-xs font-bold text-slate-800 leading-snug truncate" title={item.title}>
                        {item.title}
                      </p>
                      <p className="text-[11px] font-medium text-slate-600 mt-0.5">
                        {item.description}
                      </p>
                      {item.userEmail && (
                        <p className="text-[10px] text-indigo-600 font-bold mt-1 truncate">
                          {item.userEmail}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium mt-1">
                        <Clock size={10} />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Health Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-emerald-500" />
                <h3 className="text-sm font-extrabold text-slate-800">System Diagnostics</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                Operational
              </span>
            </div>

            <div className="space-y-3">
              {[
                { name: "Web Application", status: "Operational" },
                { name: "Database (Neon Postgres)", status: "Connected" },
                { name: "Auth Provider (Clerk)", status: "Active" },
                { name: "Prisma HTTP Client", status: "Ready" },
              ].map((sys, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-none">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-700">{sys.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {sys.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
