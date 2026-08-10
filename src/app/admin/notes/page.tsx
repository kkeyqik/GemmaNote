"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  FileText, Search, Filter, Eye, Trash2, 
  CheckCircle2, Clock, Calendar, AlertCircle, 
  Archive, ChevronLeft, ChevronRight, RefreshCw, 
  Loader2, X, User
} from "lucide-react";

interface NoteItem {
  id: string;
  title: string;
  content: string | null;
  plainText: string;
  wordCount: number;
  isFavorite: boolean;
  isTrash: boolean;
  isArchived: boolean;
  trashedAt: string | null;
  userId: string | null;
  authorEmail: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED" | "TRASH" | string;
  createdAt: string;
  updatedAt: string;
}

interface NotesApiResponse {
  notes: NoteItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function AdminNotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Debounce search term by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (statusFilter && statusFilter !== "ALL") params.set("status", statusFilter);
      params.set("page", page.toString());
      params.set("limit", limit.toString());

      const res = await fetch(`/api/admin/notes?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Failed to load notes (${res.status})`);
      }
      const data: NotesApiResponse = await res.json();
      setNotes(data.notes || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error fetching notes";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, statusFilter, page, limit]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    setPage(1);
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
      return;
    }
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to delete note (${res.status})`);
      }
      setActionSuccess("Note deleted successfully");
      setTimeout(() => setActionSuccess(null), 3000);
      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }
      fetchNotes();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting note";
      setError(message);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PUBLISHED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[11px] font-bold tracking-wide uppercase">
            <CheckCircle2 size={12} /> Published
          </span>
        );
      case "DRAFT":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-[11px] font-bold tracking-wide uppercase">
            <Clock size={12} /> Draft
          </span>
        );
      case "ARCHIVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 text-[11px] font-bold tracking-wide uppercase">
            <Archive size={12} /> Archived
          </span>
        );
      case "TRASH":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60 text-[11px] font-bold tracking-wide uppercase">
            <Trash2 size={12} /> Trash
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold tracking-wide uppercase">
            {status}
          </span>
        );
    }
  };

  // Generate page numbers array for pagination
  const renderPaginationButtons = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          disabled={isLoading}
          className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-[13px] transition-colors ${
            page === i
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <FileText className="text-indigo-500" size={24} />
            Global Notes
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Moderate and manage all notes across the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchNotes} 
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
            onClick={fetchNotes}
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
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search notes by title, content, or plain text..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-10 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 animate-spin" size={16} />
              )}
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative flex items-center shrink-0">
              <Filter className="absolute left-3 text-slate-400 pointer-events-none" size={14} />
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
                className="h-10 pl-9 pr-8 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer shadow-sm appearance-none hover:bg-slate-50 transition-colors"
              >
                <option value="ALL">All Statuses</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
                <option value="TRASH">Trash</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500 shrink-0">
            Showing <span className="font-bold text-slate-700">{notes.length}</span> of <span className="font-bold text-slate-700">{total}</span> notes
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[350px] relative">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Note ID & Title</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Word Count</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && notes.length === 0 ? (
                // Loading Skeletons
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-48 mb-2"></div>
                      <div className="h-3 bg-slate-100 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-36"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-slate-200 rounded-full w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-8 bg-slate-200 rounded w-16 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : notes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium text-[13px]">
                    No notes found matching your filter or query.
                  </td>
                </tr>
              ) : (
                notes.map((note) => {
                  const isDeleting = deletingId === note.id;
                  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  });

                  return (
                    <tr key={note.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col min-w-0 max-w-md">
                          <span className="text-[14px] font-bold text-slate-800 truncate" title={note.title || "Untitled"}>
                            {note.title || "Untitled"}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 font-mono mt-0.5 truncate">
                            {note.id}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                            <User size={12} />
                          </div>
                          <span className="text-[13px] font-bold text-slate-700 truncate max-w-[200px]" title={note.authorEmail}>
                            {note.authorEmail}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/60 font-mono">
                          {(note.wordCount || 0).toLocaleString()} words
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {getStatusBadge(note.status)}
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[13px] font-medium text-slate-600 flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" />
                          {formattedDate}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => setSelectedNote(note)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" 
                            title="View Note"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteNote(note.id)}
                            disabled={isDeleting}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50" 
                            title="Delete Note"
                          >
                            {isDeleting ? <Loader2 size={16} className="animate-spin text-rose-500" /> : <Trash2 size={16} />}
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
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <button 
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isLoading}
            className="px-4 py-2 text-[12px] font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft size={14} /> Previous
          </button>

          <div className="flex items-center gap-1">
            {renderPaginationButtons()}
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

      {/* Note Details View Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(selectedNote.status)}
                  <span className="text-[11px] font-bold font-mono text-slate-400">ID: {selectedNote.id}</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-800 truncate">{selectedNote.title || "Untitled Document"}</h2>
              </div>
              <button 
                onClick={() => setSelectedNote(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-6 text-[13px]">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Author</p>
                  <p className="font-bold text-slate-700 truncate" title={selectedNote.authorEmail}>{selectedNote.authorEmail}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Word Count</p>
                  <p className="font-bold text-slate-700 font-mono">{(selectedNote.wordCount || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Created</p>
                  <p className="font-bold text-slate-700">{new Date(selectedNote.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Last Updated</p>
                  <p className="font-bold text-slate-700">{new Date(selectedNote.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>

              {/* Content Preview */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Content Preview</h3>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 font-mono text-[12px] text-slate-700 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {selectedNote.plainText || selectedNote.content || <span className="italic text-slate-400">No text content available in this note.</span>}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <button
                onClick={() => handleDeleteNote(selectedNote.id)}
                disabled={deletingId === selectedNote.id}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-bold text-[12px] transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {deletingId === selectedNote.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} Delete Note
              </button>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-[12px] hover:bg-slate-900 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
