"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  CreditCard,
  Crown,
  Users,
  Shield,
  Zap,
  RefreshCw,
  Loader2,
  AlertCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  UserCheck,
} from "lucide-react";

interface PlanDistribution {
  FREE: number;
  PRO: number;
  AGENCY: number;
}

interface StatsData {
  totalUsers: number;
  planDistribution?: PlanDistribution;
}

interface UserItem {
  id: string;
  clerkId: string;
  email: string;
  role: string;
  plan: string;
  usageCount: number;
  isSuspended: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    documents: number;
    ownedWorkspaces: number;
  };
}

interface UsersApiResponse {
  users: UserItem[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminSubscriptionPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>("ALL");
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoadingStats(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) {
        throw new Error(`Failed to load subscription stats (${res.status})`);
      }
      const data: StatsData = await res.json();
      setStats(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error loading stats";
      setError(message);
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetch(`/api/admin/users?page=${page}&limit=10`);
      if (!res.ok) {
        throw new Error(`Failed to load users (${res.status})`);
      }
      const data: UsersApiResponse = await res.json();
      setUsers(data.users || []);
      setTotalUsers(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error loading users";
      setError(message);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [page]);

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, [fetchStats, fetchUsers]);

  const refreshAll = () => {
    setError(null);
    fetchStats();
    fetchUsers();
  };

  const freeCount = stats?.planDistribution?.FREE ?? 0;
  const proCount = stats?.planDistribution?.PRO ?? 0;
  const agencyCount = stats?.planDistribution?.AGENCY ?? 0;
  const totalCount = stats?.totalUsers || (freeCount + proCount + agencyCount) || 1;

  const freePct = totalCount > 0 ? (freeCount / totalCount) * 100 : 0;
  const proPct = totalCount > 0 ? (proCount / totalCount) * 100 : 0;
  const agencyPct = totalCount > 0 ? (agencyCount / totalCount) * 100 : 0;

  const filteredUsers = selectedPlanFilter === "ALL"
    ? users
    : users.filter((u) => (u.plan || "FREE").toUpperCase() === selectedPlanFilter);

  const getPlanBadge = (planName: string) => {
    const norm = (planName || "FREE").toUpperCase();
    switch (norm) {
      case "AGENCY":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "PRO":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <CreditCard className="text-indigo-500" size={24} />
            Subscription & Plans
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Monitor plan distributions, user subscriptions, and platform tiers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refreshAll}
            className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <RefreshCw size={16} className={isLoadingStats || isLoadingUsers ? "animate-spin" : ""} /> Refresh
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
            onClick={refreshAll}
            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg font-bold text-[12px] transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Plan Distribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* FREE Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-slate-500">
              Free Tier
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[13px]">
              <Users size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800">
              {isLoadingStats ? <Loader2 className="animate-spin text-slate-400" size={24} /> : freeCount}
            </div>
            <p className="text-[12px] font-medium text-slate-400 mt-1">
              {freePct.toFixed(1)}% of total users ({totalCount} total)
            </p>
          </div>
        </div>

        {/* PRO Card */}
        <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-indigo-50/30 to-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-indigo-600">
              Pro Tier
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[13px]">
              <Zap size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-indigo-900">
              {isLoadingStats ? <Loader2 className="animate-spin text-indigo-400" size={24} /> : proCount}
            </div>
            <p className="text-[12px] font-medium text-indigo-500 mt-1">
              {proPct.toFixed(1)}% of total users
            </p>
          </div>
        </div>

        {/* AGENCY Card */}
        <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-sm flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-purple-50/30 to-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-purple-600">
              Agency Tier
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-[13px]">
              <Crown size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-purple-900">
              {isLoadingStats ? <Loader2 className="animate-spin text-purple-400" size={24} /> : agencyCount}
            </div>
            <p className="text-[12px] font-medium text-purple-500 mt-1">
              {agencyPct.toFixed(1)}% of total users
            </p>
          </div>
        </div>

      </div>

      {/* Plan Distribution Visual Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm mb-8">
        <h3 className="text-[15px] font-bold text-slate-800 mb-4 flex items-center justify-between">
          <span>Plan Distribution Breakdown</span>
          <span className="text-[12px] font-medium text-slate-500">{totalCount} Total Users</span>
        </h3>

        {/* CSS Bar */}
        <div className="w-full h-5 bg-slate-100 rounded-full flex overflow-hidden p-0.5 shadow-inner">
          <div
            style={{ width: `${Math.max(freePct, freeCount > 0 ? 3 : 0)}%` }}
            className="bg-slate-400 h-full rounded-l-full transition-all duration-500"
            title={`FREE: ${freeCount} (${freePct.toFixed(1)}%)`}
          />
          <div
            style={{ width: `${Math.max(proPct, proCount > 0 ? 3 : 0)}%` }}
            className="bg-indigo-500 h-full transition-all duration-500"
            title={`PRO: ${proCount} (${proPct.toFixed(1)}%)`}
          />
          <div
            style={{ width: `${Math.max(agencyPct, agencyCount > 0 ? 3 : 0)}%` }}
            className="bg-purple-600 h-full rounded-r-full transition-all duration-500"
            title={`AGENCY: ${agencyCount} (${agencyPct.toFixed(1)}%)`}
          />
        </div>

        {/* Bar Legend */}
        <div className="flex items-center gap-6 mt-4 pt-3 border-t border-slate-100 text-[12px] font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-400 inline-block"></span>
            <span className="text-slate-600 font-bold">Free Plan:</span>
            <span className="text-slate-800">{freeCount} ({freePct.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block"></span>
            <span className="text-indigo-600 font-bold">Pro Plan:</span>
            <span className="text-slate-800">{proCount} ({proPct.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-600 inline-block"></span>
            <span className="text-purple-600 font-bold">Agency Plan:</span>
            <span className="text-slate-800">{agencyCount} ({agencyPct.toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      {/* Users by Plan Table */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col mb-8">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h3 className="text-[15px] font-bold text-slate-800">Users by Subscription Plan</h3>
            <p className="text-[12px] font-medium text-slate-500">Filter and view users registered under each plan level.</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-xl">
            {["ALL", "FREE", "PRO", "AGENCY"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedPlanFilter(filter)}
                className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                  selectedPlanFilter === filter
                    ? "bg-white text-slate-800 shadow-xs"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[250px] relative">
          {isLoadingUsers && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          )}

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Current Plan</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 && !isLoadingUsers ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium text-[13px]">
                    No users found for selected plan filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-slate-800">{user.email}</span>
                          <span className="text-[11px] text-slate-400 font-mono">ID: {user.clerkId || user.id}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-extrabold border ${getPlanBadge(user.plan)}`}>
                          {(user.plan || "FREE").toUpperCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[12px] font-bold text-slate-600">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[13px] font-medium text-slate-600 flex items-center gap-1">
                          <FileText size={13} className="text-slate-400" />
                          {user._count?.documents ?? 0} docs
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[13px] font-medium text-slate-600">{formattedDate}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isLoadingUsers}
            className="px-4 py-2 text-[12px] font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <div className="flex items-center gap-2 text-[13px] font-bold text-slate-600">
            Page {page} of {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || isLoadingUsers}
            className="px-4 py-2 text-[12px] font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 flex items-center gap-1"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
