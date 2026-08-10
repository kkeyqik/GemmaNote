"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Trash2,
  RotateCcw,
  Search,
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  FileText,
  User,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface TrashedDocument {
  id: string;
  title: string;
  wordCount: number;
  isTrash: boolean;
  trashedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email: string;
  } | null;
}

interface TrashApiResponse {
  documents: TrashedDocument[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminTrashPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [documents, setDocuments] = useState<TrashedDocument[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchTrash = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `/api/admin/trash?search=${encodeURIComponent(debouncedSearch)}&page=${page}&limit=20`;
      const res = await fetch(url);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch trashed documents (${res.status})`);
      }
      const data: TrashApiResponse = await res.json();
      setDocuments(data.documents || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error loading trash";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => {
    fetchTrash();
  }, [fetchTrash]);

  // Restore a document (PATCH)
  const handleRestore = async (id: string) => {
    setActionLoadingId(id);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await fetch("/api/admin/trash", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to restore document (${res.status})`);
      }

      setSuccessMessage("Document restored successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchTrash();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error restoring document";
      setError(message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Permanently delete a document (DELETE)
  const handlePermanentDelete = async (id: string) => {
    setActionLoadingId(id);
    setConfirmDeleteId(null);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await fetch("/api/admin/trash", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to delete document (${res.status})`);
      }

      setSuccessMessage("Document permanently deleted");
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchTrash();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting document";
      setError(message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const docToDelete = documents.find((doc) => doc.id === confirmDeleteId);

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Trash2 className="text-rose-500" size={24} />
            Trash Management
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            View, restore, or permanently delete trashed documents across the platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchTrash}
            disabled={isLoading}
            className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center justify-between text-[13px] font-medium">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchTrash}
            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg font-bold text-[12px] transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2 text-[13px] font-medium">
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span>{successMessage}</span>
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
              placeholder="Search by title, content, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-10 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 animate-spin" size={16} />
            )}
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">{documents.length}</span> of{" "}
            <span className="font-bold text-slate-700">{total}</span> trashed items
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px] relative">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Document Title</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Word Count</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Trashed Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && documents.length === 0 ? (
                // Skeleton Loader
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-48 mb-1.5"></div>
                      <div className="h-3 bg-slate-100 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-36"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-28"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-8 bg-slate-200 rounded w-20 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : documents.length === 0 ? (
                // Empty state
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Trash2 size={40} className="mb-3 text-slate-300 stroke-[1.5]" />
                      <p className="text-[15px] font-bold text-slate-700">No trashed documents found</p>
                      <p className="text-[13px] font-medium text-slate-400 mt-1 max-w-sm">
                        {debouncedSearch
                          ? `No items matched "${debouncedSearch}". Try clearing your search query.`
                          : "The trash is currently empty. Deleted documents will appear here."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                documents.map((doc) => {
                  const isActionPending = actionLoadingId === doc.id;
                  const authorEmail = doc.user?.email || "Unassigned";

                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-500 mt-0.5 shrink-0">
                            <FileText size={16} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[14px] font-bold text-slate-800 line-through decoration-slate-300 truncate max-w-xs sm:max-w-md">
                              {doc.title || "Untitled Document"}
                            </span>
                            <span className="text-[11px] font-mono font-medium text-slate-400 mt-0.5">
                              ID: {doc.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <User size={14} className="text-slate-400 shrink-0" />
                          <span className="text-[13px] font-medium truncate max-w-[200px]" title={authorEmail}>
                            {authorEmail}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {doc.wordCount.toLocaleString()} words
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Clock size={14} className="text-slate-400 shrink-0" />
                          <span className="text-[13px] font-medium">{formatDate(doc.trashedAt)}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isActionPending ? (
                            <Loader2 className="animate-spin text-indigo-500" size={18} />
                          ) : (
                            <>
                              <button
                                onClick={() => handleRestore(doc.id)}
                                className="h-8 px-3 rounded-lg text-[12px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                                title="Restore document"
                              >
                                <RotateCcw size={14} />
                                <span>Restore</span>
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(doc.id)}
                                className="h-8 px-3 rounded-lg text-[12px] font-bold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
                                title="Permanently delete"
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </>
                          )}
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

      {/* Confirmation Modal for Permanent Delete */}
      {confirmDeleteId && docToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="p-2.5 rounded-full bg-rose-100 border border-rose-200">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-lg font-extrabold text-slate-800">Permanently Delete Document?</h3>
            </div>
            <p className="text-[13px] font-medium text-slate-600 leading-relaxed mb-4">
              Are you sure you want to permanently delete{" "}
              <span className="font-bold text-slate-800">"{docToDelete.title || "Untitled Document"}"</span>? This
              action cannot be undone and will erase the document from the database forever.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePermanentDelete(docToDelete.id)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-[13px] hover:bg-rose-700 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 size={14} /> Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
