"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Mail,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageCircle,
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Inbox,
  User,
  Calendar,
} from "lucide-react";

interface SupportRequestItem {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED" | string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email: string;
    clerkId: string;
  };
}

interface SupportApiResponse {
  requests?: SupportRequestItem[];
  supportRequests?: SupportRequestItem[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminSupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [requests, setRequests] = useState<SupportRequestItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchSupportRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("page", page.toString());
      queryParams.set("limit", "10");
      if (debouncedSearch) queryParams.set("search", debouncedSearch);
      if (statusFilter) queryParams.set("status", statusFilter);

      const res = await fetch(`/api/admin/support?${queryParams.toString()}`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch support requests (${res.status})`);
      }

      const data: SupportApiResponse = await res.json();
      const list = data.requests || data.supportRequests || [];
      setRequests(list);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error fetching support requests";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, statusFilter, page]);

  useEffect(() => {
    fetchSupportRequests();
  }, [fetchSupportRequests]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoadingId(id);
    setError(null);
    setActionSuccess(null);
    try {
      const res = await fetch("/api/admin/support", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to update status (${res.status})`);
      }

      const updated: SupportRequestItem = await res.json();
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: updated.status } : r))
      );
      setActionSuccess("Support request status updated");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error updating status";
      setError(message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "OPEN":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60 text-[11px] font-bold tracking-wide uppercase">
            <AlertCircle size={12} /> Open
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 text-[11px] font-bold tracking-wide uppercase">
            <Clock size={12} /> In Progress
          </span>
        );
      case "CLOSED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[11px] font-bold tracking-wide uppercase">
            <CheckCircle2 size={12} /> Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200/60 text-[11px] font-bold tracking-wide uppercase">
            {status}
          </span>
        );
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
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Manage user support requests, feedback, and issue reports.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSupportRequests}
            className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center justify-between text-[13px] font-medium">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchSupportRequests}
            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg font-bold text-[12px] transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {actionSuccess && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2 text-[13px] font-medium">
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col mb-8">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by subject, message, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter size={16} className="text-slate-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="h-10 px-3 bg-white border border-slate-200 rounded-xl text-[13px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
              >
                <option value="">All Statuses</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">{requests.length}</span> of <span className="font-bold text-slate-700">{total}</span> requests
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px] relative">
          {isLoading && requests.length === 0 && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          )}

          {requests.length === 0 && !isLoading ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <Inbox size={24} />
              </div>
              <h3 className="text-[15px] font-bold text-slate-700">No Support Requests</h3>
              <p className="text-[13px] font-medium text-slate-400 mt-1 max-w-sm">
                There are no support requests matching your criteria.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">User Email</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Created Date</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((req) => {
                  const isActionPending = actionLoadingId === req.id;
                  const formattedDate = new Date(req.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const isExpanded = expandedId === req.id;

                  return (
                    <React.Fragment key={req.id}>
                      <tr className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1 max-w-md">
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : req.id)}
                              className="text-left font-bold text-slate-800 text-[14px] hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                            >
                              <MessageCircle size={14} className="text-indigo-500 shrink-0" />
                              <span className="truncate">{req.subject}</span>
                            </button>
                            <p className="text-[12px] text-slate-500 line-clamp-1">
                              {req.message}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-[13px] font-medium text-slate-700 flex items-center gap-1.5">
                            <Mail size={13} className="text-slate-400 shrink-0" />
                            {req.user?.email || "Unknown User"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {getStatusBadge(req.status)}
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-[12px] font-medium text-slate-600 flex items-center gap-1">
                            <Calendar size={12} className="text-slate-400" />
                            {formattedDate}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {isActionPending ? (
                              <Loader2 className="animate-spin text-indigo-500" size={16} />
                            ) : (
                              <select
                                value={req.status}
                                onChange={(e) => handleStatusChange(req.id, e.target.value)}
                                className="h-8 px-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-[12px] shadow-sm hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                              >
                                <option value="OPEN">OPEN</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="CLOSED">CLOSED</option>
                              </select>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expandable message details */}
                      {isExpanded && (
                        <tr className="bg-indigo-50/30">
                          <td colSpan={5} className="px-6 py-4 border-b border-indigo-100">
                            <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-xs">
                              <h4 className="text-[12px] font-bold text-indigo-900 uppercase tracking-wider mb-2">Message Body</h4>
                              <p className="text-[13px] font-medium text-slate-700 whitespace-pre-wrap leading-relaxed">
                                {req.message}
                              </p>
                              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                                <span>Request ID: {req.id}</span>
                                <span>User ID: {req.userId}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isLoading}
            className="px-4 py-2 text-[12px] font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <div className="flex items-center gap-2 text-[13px] font-bold text-slate-600">
            Page {page} of {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || isLoading}
            className="px-4 py-2 text-[12px] font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 flex items-center gap-1"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
