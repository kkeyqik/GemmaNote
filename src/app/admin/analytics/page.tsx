"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  BarChart2, TrendingUp, Users, FileText, ArrowUpRight, 
  ArrowDownRight, Download, Calendar, Loader2, AlertCircle, RefreshCw
} from "lucide-react";

interface AnalyticsCohort {
  month: string;
  yearMonth: string;
  count: number;
  cumulative: number;
  free: number;
  pro: number;
  agency: number;
}

interface AnalyticsSummary {
  latestMonth: string | null;
  latestMonthRegistrations: number;
  previousMonthRegistrations: number;
  monthlyGrowthPercentage: number;
}

interface AnalyticsData {
  totalUsers: number;
  totalCohorts: number;
  cohorts: AnalyticsCohort[];
  summary: AnalyticsSummary;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/analytics");
      if (!res.ok) {
        throw new Error(`Failed to load analytics (${res.status})`);
      }
      const json: AnalyticsData = await res.json();
      setData(json);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error fetching analytics";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Derived metrics
  const totalPro = data
    ? data.cohorts.reduce((acc, c) => acc + c.pro + c.agency, 0)
    : 0;
  const totalFree = data
    ? data.cohorts.reduce((acc, c) => acc + c.free, 0)
    : 0;
  const proConversionRate = data && data.totalUsers > 0
    ? ((totalPro / data.totalUsers) * 100).toFixed(1)
    : "0.0";

  const maxCohortCount = data && data.cohorts.length > 0
    ? Math.max(...data.cohorts.map((c) => c.count), 1)
    : 1;

  const growthIsUp = (data?.summary.monthlyGrowthPercentage || 0) >= 0;

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <BarChart2 className="text-indigo-500" size={24} />
            Analytics Overview
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Deep dive into user growth, content creation, and platform health.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchAnalytics}
            className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin text-indigo-500" : ""} /> Refresh
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
            onClick={fetchAnalytics}
            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg font-bold text-[12px] transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 relative">
        {isLoading && !data && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
            <Loader2 className="animate-spin text-indigo-500" size={32} />
          </div>
        )}

        {/* Card 1: Total Users */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col relative overflow-hidden group hover:border-indigo-200 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[13px] font-bold text-slate-500">Total Users</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="flex items-end gap-3 relative z-10">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {data ? data.totalUsers.toLocaleString() : "---"}
            </h3>
            {data && (
              <span className={`flex items-center gap-1 text-[12px] font-bold mb-1.5 px-1.5 py-0.5 rounded ${growthIsUp ? "text-emerald-500 bg-emerald-50" : "text-rose-500 bg-rose-50"}`}>
                {growthIsUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {Math.abs(data.summary.monthlyGrowthPercentage)}%
              </span>
            )}
          </div>
        </div>

        {/* Card 2: Latest Month Registrations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col relative overflow-hidden group hover:border-blue-200 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[13px] font-bold text-slate-500">New This Month</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
              <FileText size={16} />
            </div>
          </div>
          <div className="flex items-end gap-3 relative z-10">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {data ? data.summary.latestMonthRegistrations.toLocaleString() : "---"}
            </h3>
            {data && (
              <span className="text-[11px] font-bold text-slate-400 mb-1">
                prev: {data.summary.previousMonthRegistrations}
              </span>
            )}
          </div>
        </div>

        {/* Card 3: Pro Conversion */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col relative overflow-hidden group hover:border-purple-200 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[13px] font-bold text-slate-500">Paid Subscribers</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
              <BarChart2 size={16} />
            </div>
          </div>
          <div className="flex items-end gap-3 relative z-10">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{totalPro}</h3>
            <span className="flex items-center gap-1 text-[12px] font-bold text-purple-600 mb-1.5 bg-purple-50 px-1.5 py-0.5 rounded">
              {proConversionRate}% conv.
            </span>
          </div>
        </div>

        {/* Card 4: Cohorts Tracked */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col relative overflow-hidden group hover:border-emerald-200 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[13px] font-bold text-slate-500">Active Cohorts</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="flex items-end gap-3 relative z-10">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {data ? data.totalCohorts : "---"}
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 mb-1">
              months active
            </span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Main Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 relative min-h-[360px] flex flex-col justify-between">
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div> User Growth Trend (Cohorts)
            </h2>
            <span className="text-[11px] font-bold text-slate-400">Monthly User Registrations</span>
          </div>

          {!data || data.cohorts.length === 0 ? (
            <div className="h-[240px] flex items-center justify-center text-slate-400 font-medium text-[13px]">
              No registration cohort data available yet.
            </div>
          ) : (
            <div className="h-[250px] w-full flex items-end justify-around gap-2 px-2 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full border-t border-slate-100 border-dashed"></div>
                ))}
              </div>
              
              {/* Dynamic Bars */}
              {data.cohorts.map((cohort, i) => {
                const heightPercent = Math.max(12, Math.round((cohort.count / maxCohortCount) * 100));

                return (
                  <div key={i} className="relative flex flex-col items-center justify-end h-full group w-full max-w-[50px] z-10">
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] font-bold px-2 py-1.5 rounded-lg transition-opacity shadow-lg z-20 pointer-events-none text-center whitespace-nowrap">
                      <div>{cohort.month}</div>
                      <div className="text-indigo-300 font-extrabold">{cohort.count} new users</div>
                    </div>
                    <div 
                      className="w-full bg-gradient-to-t from-indigo-500 to-blue-400 rounded-t-md opacity-85 group-hover:opacity-100 transition-all cursor-pointer shadow-sm hover:scale-105" 
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                    <span className="text-[10px] font-bold text-slate-500 mt-3 absolute -bottom-6 truncate max-w-full">
                      {cohort.month}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Subscription Plan Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 relative flex flex-col justify-between">
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          )}

          <h2 className="text-[15px] font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> User Plan Breakdown
          </h2>

          <div className="flex flex-col gap-6">
            
            {/* Free Plan */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-bold text-slate-700">Free Tier</span>
                <span className="font-bold text-slate-900">
                  {totalFree} ({data?.totalUsers ? Math.round((totalFree / data.totalUsers) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-400 rounded-full transition-all duration-700" 
                  style={{ width: `${data?.totalUsers ? (totalFree / data.totalUsers) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-bold text-slate-700">Pro Tier</span>
                <span className="font-bold text-indigo-600">
                  {totalPro} ({proConversionRate}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-700" 
                  style={{ width: `${data?.totalUsers ? (totalPro / data.totalUsers) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

          </div>
          
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[12px] font-medium text-slate-500 leading-relaxed text-center">
              Total registered platform users: <span className="font-bold text-indigo-600">{data?.totalUsers || 0}</span> across <span className="font-bold text-slate-700">{data?.totalCohorts || 0}</span> monthly cohorts.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
