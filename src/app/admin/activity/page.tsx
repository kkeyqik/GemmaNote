"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Activity, Search, Filter, UserPlus, FileText, FilePlus, 
  FileEdit, Clock, RefreshCw, AlertCircle, LifeBuoy, Mic 
} from "lucide-react";

interface ActivityItem {
  id?: string;
  type: string;
  title?: string;
  description?: string;
  userEmail?: string;
  createdAt?: string;
  timestamp?: string;
  details?: {
    email?: string;
    title?: string;
    userId?: string;
  };
}

export default function AdminActivityPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/activity");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Server returned status ${res.status}`);
      }
      const data: unknown = await res.json();
      const activityList = data && typeof data === "object" && "activities" in data
        ? (data as { activities?: unknown }).activities
        : data;
      setActivities(Array.isArray(activityList) ? (activityList as ActivityItem[]) : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load activity log";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const formatRelativeTime = (timestamp?: string) => {
    if (!timestamp) return "Just now";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (isNaN(diffInSeconds) || diffInSeconds < 0) return "Just now";
    if (diffInSeconds < 60) return "Just now";
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} mo ago`;
    return `${Math.floor(months / 12)}y ago`;
  };

  const getEventConfig = (item: ActivityItem) => {
    const rawType = (item.type || "").toLowerCase();
    const email = item.userEmail || item.details?.email || "";
    const title = item.title || item.details?.title || "Untitled";

    if (rawType.includes("user") || rawType.includes("signup") || rawType === "user_registered") {
      return {
        icon: <UserPlus size={16} className="text-purple-600" />,
        bgColor: "bg-purple-100",
        badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
        badgeLabel: "User Signup",
        description: item.description || `New user registered: ${email || "New User"}`,
        userEmail: email,
      };
    }

    if (rawType.includes("document_created") || rawType === "document_created") {
      return {
        icon: <FilePlus size={16} className="text-emerald-600" />,
        bgColor: "bg-emerald-100",
        badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        badgeLabel: "Doc Created",
        description: item.description || `New document: ${title}`,
        userEmail: email,
      };
    }

    if (rawType.includes("document_updated") || rawType === "document_updated") {
      return {
        icon: <FileEdit size={16} className="text-blue-600" />,
        bgColor: "bg-blue-100",
        badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
        badgeLabel: "Doc Updated",
        description: item.description || `Document updated: ${title}`,
        userEmail: email,
      };
    }

    if (rawType.includes("support") || rawType === "support_ticket") {
      return {
        icon: <LifeBuoy size={16} className="text-amber-600" />,
        bgColor: "bg-amber-100",
        badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
        badgeLabel: "Support Ticket",
        description: item.description || `Support ticket: ${title}`,
        userEmail: email,
      };
    }

    if (rawType.includes("voice") || rawType === "voice_preset") {
      return {
        icon: <Mic size={16} className="text-indigo-600" />,
        bgColor: "bg-indigo-100",
        badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
        badgeLabel: "Voice Preset",
        description: item.description || `Voice preset: ${title}`,
        userEmail: email,
      };
    }

    return {
      icon: <Activity size={16} className="text-slate-600" />,
      bgColor: "bg-slate-100",
      badgeBg: "bg-slate-50 text-slate-700 border-slate-200",
      badgeLabel: "Activity",
      description: item.description || title || "System event occurred",
      userEmail: email,
    };
  };

  const filteredActivities = activities.filter((item) => {
    const rawType = (item.type || "").toUpperCase();
    const matchesType =
      selectedType === "ALL" ||
      rawType.includes(selectedType) ||
      (selectedType === "USER_SIGNUP" && (rawType.includes("USER") || rawType.includes("SIGNUP"))) ||
      (selectedType === "DOCUMENT_CREATED" && rawType.includes("DOC"));

    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesType;

    const email = (item.userEmail || item.details?.email || "").toLowerCase();
    const title = (item.title || item.details?.title || "").toLowerCase();
    const desc = (item.description || "").toLowerCase();
    const typeStr = (item.type || "").toLowerCase();

    return matchesType && (email.includes(term) || title.includes(term) || desc.includes(term) || typeStr.includes(term));
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Activity className="text-indigo-500" size={24} />
            Activity Log
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Real-time audit log of user signups, documents, and support activity across the platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchActivities}
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
            onClick={fetchActivities}
            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-lg transition-colors text-[12px]"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar & Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search title, email, or type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[12px] font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter size={14} /> Filter:
            </span>
            <button
              onClick={() => setSelectedType("ALL")}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-colors ${
                selectedType === "ALL"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setSelectedType("USER_SIGNUP")}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-colors ${
                selectedType === "USER_SIGNUP"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Signups
            </button>
            <button
              onClick={() => setSelectedType("DOCUMENT_CREATED")}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-colors ${
                selectedType === "DOCUMENT_CREATED"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Documents
            </button>
          </div>

        </div>

        {/* Timeline Log View */}
        <div className="p-6">
          {loading ? (
            /* Loading Skeleton */
            <div className="space-y-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="flex items-center gap-3">
                      <div className="h-4 bg-slate-200 rounded w-20"></div>
                      <div className="h-4 bg-slate-200 rounded w-48"></div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded w-32"></div>
                  </div>
                  <div className="h-4 bg-slate-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          ) : filteredActivities.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <Activity size={24} />
              </div>
              <h3 className="text-[15px] font-bold text-slate-700">No activity recorded</h3>
              <p className="text-[13px] font-medium text-slate-400 mt-1 max-w-sm">
                {searchTerm || selectedType !== "ALL"
                  ? "No activity entries match your filter or search criteria."
                  : "There is no recorded activity yet."}
              </p>
            </div>
          ) : (
            /* Activity Items List */
            <div className="space-y-6">
              {filteredActivities.map((item, index) => {
                const config = getEventConfig(item);
                const isLast = index === filteredActivities.length - 1;
                const timeStr = item.createdAt || item.timestamp;

                return (
                  <div key={item.id || `${item.type}-${timeStr}-${index}`} className="flex gap-4 group relative">
                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-slate-100 group-hover:bg-indigo-100 transition-colors z-0"></div>
                    )}

                    {/* Icon Node */}
                    <div className={`relative z-10 w-8 h-8 rounded-full ${config.bgColor} flex items-center justify-center shrink-0 shadow-sm mt-0.5`}>
                      {config.icon}
                    </div>

                    {/* Event Detail */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-6 border-b border-slate-50 group-hover:border-slate-100 transition-colors">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${config.badgeBg}`}>
                            {config.badgeLabel}
                          </span>
                          <span className="text-[14px] font-bold text-slate-800">
                            {config.description}
                          </span>
                        </div>
                        
                        {config.userEmail && (
                          <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
                            <span>User:</span>
                            <span className="text-indigo-600 font-bold">{config.userEmail}</span>
                          </div>
                        )}
                      </div>

                      {/* Time Badge */}
                      <div className="flex items-center gap-1 text-[12px] font-semibold text-slate-400 shrink-0 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100" title={timeStr ? new Date(timeStr).toLocaleString() : undefined}>
                        <Clock size={12} className="text-slate-400" />
                        <span>{formatRelativeTime(timeStr)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 text-[12px] font-medium text-slate-500">
          <span>
            Showing <strong className="text-slate-700 font-bold">{filteredActivities.length}</strong> of{" "}
            <strong className="text-slate-700 font-bold">{activities.length}</strong> events
          </span>
          {activities.length > 0 && (
            <span className="text-slate-400">
              Latest activity: {formatRelativeTime(activities[0].createdAt || activities[0].timestamp)}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
