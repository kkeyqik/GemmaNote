"use client";

import React, { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  Download,
  Users,
  FileText,
  Activity,
  Zap,
  TrendingUp,
  PieChart,
  RefreshCw,
  AlertCircle,
  BarChart3,
  Calendar,
  CheckCircle2,
  Database
} from "lucide-react";

interface StatsData {
  totalUsers: number;
  totalNotes: number;
  totalDocuments?: number;
  totalWorkspaces: number;
  activeUsers7d: number;
  totalGenerations?: number;
  userGrowthPercentage?: number;
  estimatedStorageSize?: string;
}

interface Cohort {
  month: string;
  yearMonth: string;
  count: number;
  cumulative: number;
  free: number;
  pro: number;
  agency: number;
}

interface AnalyticsData {
  totalUsers: number;
  totalCohorts: number;
  cohorts: Cohort[];
  summary: {
    latestMonth: string | null;
    latestMonthRegistrations: number;
    previousMonthRegistrations: number;
    monthlyGrowthPercentage: number;
  };
}

export default function AdminReportsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, analyticsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/analytics"),
      ]);

      if (!statsRes.ok || !analyticsRes.ok) {
        throw new Error("Failed to load admin report data");
      }

      const statsData = await statsRes.json();
      const analyticsData = await analyticsRes.json();

      setStats(statsData);
      setAnalytics(analyticsData);
    } catch (err: any) {
      setError(err.message || "An error occurred while loading reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute plan breakdown from cohorts if available
  const planTotals = React.useMemo(() => {
    if (!analytics || !analytics.cohorts) {
      return { free: 0, pro: 0, agency: 0, total: 0 };
    }
    const free = analytics.cohorts.reduce((sum, c) => sum + (c.free || 0), 0);
    const pro = analytics.cohorts.reduce((sum, c) => sum + (c.pro || 0), 0);
    const agency = analytics.cohorts.reduce((sum, c) => sum + (c.agency || 0), 0);
    const total = free + pro + agency || analytics.totalUsers || 1;
    return { free, pro, agency, total };
  }, [analytics]);

  const freePct = Math.round((planTotals.free / planTotals.total) * 100) || 0;
  const proPct = Math.round((planTotals.pro / planTotals.total) * 100) || 0;
  const agencyPct = Math.round((planTotals.agency / planTotals.total) * 100) || 0;

  // Pie chart conic gradient calculation
  const conicGradient = `conic-gradient(
    #6366f1 0% ${freePct}%,
    #3b82f6 ${freePct}% ${freePct + proPct}%,
    #a855f7 ${freePct + proPct}% 100%
  `;

  // CSV Export handler
  const handleExportCSV = () => {
    if (!stats || !analytics) return;
    setExporting(true);

    const rows: string[] = [];

    // Header
    rows.push("GEMMANOTE ADMIN PLATFORM REPORT");
    rows.push(`Generated At,${new Date().toLocaleString()}`);
    rows.push("");

    // Section 1: Overview
    rows.push("PLATFORM OVERVIEW METRICS");
    rows.push("Metric,Value");
    rows.push(`Total Users,${stats.totalUsers}`);
    rows.push(`Total Documents,${stats.totalDocuments ?? stats.totalNotes}`);
    rows.push(`Active Users (Last 7 Days),${stats.activeUsers7d}`);
    rows.push(`AI Generations Count,${stats.totalGenerations ?? 0}`);
    rows.push(`Total Workspaces,${stats.totalWorkspaces}`);
    rows.push(`Storage Size,${stats.estimatedStorageSize ?? "N/A"}`);
    rows.push("");

    // Section 2: Plan Distribution
    rows.push("PLAN DISTRIBUTION METRICS");
    rows.push("Plan Tier,User Count,Percentage");
    rows.push(`Free,${planTotals.free},${freePct}%`);
    rows.push(`Pro,${planTotals.pro},${proPct}%`);
    rows.push(`Agency,${planTotals.agency},${agencyPct}%`);
    rows.push("");

    // Section 3: Monthly Cohort Growth
    rows.push("MONTHLY USER GROWTH COHORTS");
    rows.push("Year-Month,Month,New Signups,Cumulative Users,Free Users,Pro Users,Agency Users");
    analytics.cohorts.forEach((c) => {
      rows.push(
        `"${c.yearMonth}","${c.month}",${c.count},${c.cumulative},${c.free},${c.pro},${c.agency}`
      );
    });

    const csvString = rows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `gemmanote-platform-report-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setExporting(false), 500);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <FileSpreadsheet className="text-indigo-500" size={24} />
            Platform Reports & Analytics
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Real-time analytics, user growth cohorts, and system performance export.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-indigo-500" : ""} />
            Refresh
          </button>
          <button
            onClick={handleExportCSV}
            disabled={loading || !stats}
            className="h-10 px-4 rounded-xl bg-indigo-600 text-white font-bold text-[13px] hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-500/20 disabled:opacity-50"
          >
            <Download size={16} />
            {exporting ? "Generating CSV..." : "Export as CSV"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-between gap-3 text-[13px] font-medium">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchData}
            className="px-3 py-1 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 text-[12px] transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeleton State */}
      {loading && !stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white rounded-2xl border border-slate-200/60 p-6 animate-pulse flex flex-col justify-between">
              <div className="w-1/2 h-4 bg-slate-100 rounded" />
              <div className="w-3/4 h-8 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Task 2 Requirement 1: Platform Overview Report Card */}
      {stats && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="text-indigo-500" size={20} />
              Platform Overview Report
            </h2>
            <span className="text-[12px] font-semibold text-slate-400">
              Live database metrics
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Metric 1: Total Users */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-indigo-200 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Total Users</span>
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <Users size={18} />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-800 tracking-tight">
                  {stats.totalUsers.toLocaleString()}
                </div>
                <div className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-500" /> Registered accounts
                </div>
              </div>
            </div>

            {/* Metric 2: Total Documents */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-indigo-200 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Total Documents</span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <FileText size={18} />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-800 tracking-tight">
                  {(stats.totalDocuments ?? stats.totalNotes).toLocaleString()}
                </div>
                <div className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1">
                  <Database size={12} className="text-blue-500" /> Storage: {stats.estimatedStorageSize ?? "N/A"}
                </div>
              </div>
            </div>

            {/* Metric 3: Active Users (7 days) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-indigo-200 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Active Users (7d)</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Activity size={18} />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-800 tracking-tight">
                  {stats.activeUsers7d.toLocaleString()}
                </div>
                <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {stats.totalUsers > 0 ? `${Math.round((stats.activeUsers7d / stats.totalUsers) * 100)}% active rate` : "0% active"}
                </div>
              </div>
            </div>

            {/* Metric 4: Generation Count */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-indigo-200 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Generations Count</span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Zap size={18} />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-800 tracking-tight">
                  {(stats.totalGenerations ?? 0).toLocaleString()}
                </div>
                <div className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1">
                  <Zap size={12} className="text-amber-500" /> AI notes & voice presets
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Plan Distribution & Monthly Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Task 2 Requirement 3: Plan Distribution with Pie-Chart-Like CSS Visualization */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
                <PieChart size={18} className="text-indigo-500" />
                Plan Distribution
              </h3>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {planTotals.total} Users Total
              </span>
            </div>

            {/* Donut / Pie CSS visualization */}
            <div className="flex flex-col items-center justify-center my-4">
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center shadow-inner relative transition-transform hover:scale-105"
                style={{ background: conicGradient }}
              >
                <div className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center shadow-md">
                  <span className="text-2xl font-black text-slate-800">{planTotals.total}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Accounts</span>
                </div>
              </div>
            </div>

            {/* Legend / Breakdown */}
            <div className="space-y-3 mt-6">
              {/* Free Plan */}
              <div className="flex items-center justify-between text-[13px] font-medium p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span className="font-bold text-slate-700">Free Tier</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-600 font-bold">{planTotals.free}</span>
                  <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    {freePct}%
                  </span>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="flex items-center justify-between text-[13px] font-medium p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-bold text-slate-700">Pro Tier</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-600 font-bold">{planTotals.pro}</span>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {proPct}%
                  </span>
                </div>
              </div>

              {/* Agency Plan */}
              <div className="flex items-center justify-between text-[13px] font-medium p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="font-bold text-slate-700">Agency Tier</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-600 font-bold">{planTotals.agency}</span>
                  <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                    {agencyPct}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task 2 Requirement 2: User Growth Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp size={18} className="text-indigo-500" />
                  User Growth & Registration Cohorts
                </h3>
                <p className="text-[12px] text-slate-500 mt-0.5">
                  Monthly user signup breakdown and cumulative totals.
                </p>
              </div>

              {analytics?.summary && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-xl text-[12px] font-bold">
                  <TrendingUp size={14} />
                  {analytics.summary.monthlyGrowthPercentage >= 0 ? "+" : ""}
                  {analytics.summary.monthlyGrowthPercentage}% MoM
                </div>
              )}
            </div>

            {/* Growth Cohorts Table */}
            {analytics && analytics.cohorts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                      <th className="px-4 py-3">Month</th>
                      <th className="px-4 py-3">New Signups</th>
                      <th className="px-4 py-3">Cumulative</th>
                      <th className="px-4 py-3">Free</th>
                      <th className="px-4 py-3">Pro</th>
                      <th className="px-4 py-3">Agency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {analytics.cohorts.map((cohort, idx) => (
                      <tr key={cohort.yearMonth || idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-800 flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400" />
                          {cohort.month}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 text-[12px]">
                            +{cohort.count}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-700">
                          {cohort.cumulative}
                        </td>
                        <td className="px-4 py-3 text-slate-600 font-medium">{cohort.free}</td>
                        <td className="px-4 py-3 text-slate-600 font-medium">{cohort.pro}</td>
                        <td className="px-4 py-3 text-slate-600 font-medium">{cohort.agency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 font-medium text-[13px]">
                No monthly cohort data recorded yet.
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
            <span>Data source: Prisma Postgres DB</span>
            <span>Updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
