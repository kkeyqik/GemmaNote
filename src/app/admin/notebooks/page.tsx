"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Folder, Search, Users, FileText, Loader2, 
  ChevronLeft, ChevronRight, RefreshCw, AlertCircle, 
  Calendar, Eye, Trash2, MoreVertical, FolderKanban
} from "lucide-react";

interface WorkspaceOwner {
  id: string;
  email: string;
  clerkId: string;
}

interface WorkspaceItem {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  owner?: WorkspaceOwner;
  _count?: {
    members: number;
    documents: number;
  };
}

interface WorkspacesApiResponse {
  workspaces: WorkspaceItem[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminNotebooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search term by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchWorkspaces = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `/api/admin/workspaces?search=${encodeURIComponent(debouncedSearch)}&page=${page}&limit=10`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to load workspaces (${res.status})`);
      }
      const data: WorkspacesApiResponse = await res.json();
      setWorkspaces(data.workspaces || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error fetching workspaces";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Folder className="text-indigo-500" size={24} />
            Workspaces & Notebooks
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Manage all workspace collections, members, and document counts across the platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchWorkspaces}
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
            onClick={fetchWorkspaces}
            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg font-bold text-[12px] transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search workspaces by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-10 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 animate-spin" size={16} />
            )}
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">{workspaces.length}</span> of <span className="font-bold text-slate-700">{total}</span> workspaces
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px] relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          )}

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Workspace Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Owner Email</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Member Count</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Document Count</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workspaces.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
                        <FolderKanban size={24} />
                      </div>
                      <h3 className="text-[15px] font-bold text-slate-800 mb-1">No workspaces yet</h3>
                      <p className="text-[13px] text-slate-500 font-medium">
                        {debouncedSearch
                          ? `No workspaces found matching "${debouncedSearch}".`
                          : "When workspaces are created by users, they will appear in this list."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                workspaces.map((workspace) => {
                  const formattedDate = new Date(workspace.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr key={workspace.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                            <Folder size={18} className="text-indigo-500" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[14px] font-bold text-slate-800 truncate">{workspace.name}</span>
                            <span className="text-[11px] font-bold text-slate-400 font-mono mt-0.5">
                              ID: {workspace.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[13px] font-bold text-slate-700">
                          {workspace.owner?.email || "Unknown"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[12px] font-bold border border-slate-200/60">
                          <Users size={14} className="text-indigo-500" />
                          {workspace._count?.members ?? 0}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[12px] font-bold border border-indigo-200/60">
                          <FileText size={14} className="text-indigo-500" />
                          {workspace._count?.documents ?? 0}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[13px] font-medium text-slate-600 flex items-center gap-1.5">
                          <Calendar size={14} className="text-slate-400" />
                          {formattedDate}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Workspace">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Workspace">
                            <Trash2 size={16} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
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
