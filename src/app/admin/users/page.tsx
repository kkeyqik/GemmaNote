"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Users, Search, Filter, Plus, Shield, 
  CheckCircle2, XCircle, Mail, Clock, MoreVertical, 
  Key, Loader2, UserX, UserCheck, AlertCircle, 
  ChevronLeft, ChevronRight, RefreshCw, FileText
} from "lucide-react";

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

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [users, setUsers] = useState<UserItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Debounce search term by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 on new search
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `/api/admin/users?search=${encodeURIComponent(debouncedSearch)}&page=${page}&limit=10`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to load users (${res.status})`);
      }
      const data: UsersApiResponse = await res.json();
      setUsers(data.users || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error fetching users";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Patch role or suspension
  const handleUpdateUser = async (userId: string, updateData: { role?: string; isSuspended?: boolean }) => {
    setActionLoadingId(userId);
    setError(null);
    setActionSuccess(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to update user (${res.status})`);
      }

      const updatedUser: UserItem = await res.json();

      // Update state locally
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, ...updatedUser } : u))
      );

      setActionSuccess(`User updated successfully`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error updating user";
      setError(message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role?.toUpperCase()) {
      case "SUPER ADMIN":
      case "SUPER_ADMIN":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "ADMIN":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusBadge = (isSuspended: boolean) => {
    if (isSuspended) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60 text-[11px] font-bold tracking-wide uppercase">
          <XCircle size={12} /> Banned
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[11px] font-bold tracking-wide uppercase">
        <CheckCircle2 size={12} /> Active
      </span>
    );
  };

  const getAvatarInitials = (email: string) => {
    if (!email) return "U";
    const parts = email.split("@")[0].split(".");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Users className="text-indigo-500" size={24} />
            User Management
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Manage platform access, roles, and user accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchUsers} 
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
            onClick={fetchUsers}
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
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by email or Clerk ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-10 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 animate-spin" size={16} />
            )}
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">{users.length}</span> of <span className="font-bold text-slate-700">{total}</span> users
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px] relative">
          {isLoading && users.length === 0 && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          )}

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium text-[13px]">
                    No users found matching your query.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isActionPending = actionLoadingId === user.id;
                  const initials = getAvatarInitials(user.email);
                  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  });

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-extrabold flex items-center justify-center text-[13px] border border-slate-200 shadow-sm">
                              {initials}
                            </div>
                            {!user.isSuspended && (
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                            )}
                            {user.isSuspended && (
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[14px] font-bold text-slate-800 truncate">{user.email || "No Email"}</span>
                            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                              ID: {user.clerkId || user.id.substring(0, 12)}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold border ${getRoleBadge(user.role)}`}>
                            {user.role}
                          </span>
                          <button
                            disabled={isActionPending}
                            onClick={() =>
                              handleUpdateUser(user.id, {
                                role: user.role === "ADMIN" ? "USER" : "ADMIN",
                              })
                            }
                            className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:opacity-50"
                            title={`Toggle role to ${user.role === "ADMIN" ? "USER" : "ADMIN"}`}
                          >
                            <Shield size={14} />
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-extrabold bg-blue-50 text-blue-600 border border-blue-200">
                            {user.plan || "FREE"}
                          </span>
                          <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                            <FileText size={12} /> {user._count?.documents || 0} docs
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {getStatusBadge(user.isSuspended)}
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[13px] font-medium text-slate-600">{formattedDate}</span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isActionPending ? (
                            <Loader2 className="animate-spin text-indigo-500" size={16} />
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdateUser(user.id, {
                                    isSuspended: !user.isSuspended,
                                  })
                                }
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors flex items-center gap-1.5 ${
                                  user.isSuspended
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                                    : "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
                                }`}
                                title={user.isSuspended ? "Unsuspend User" : "Suspend User"}
                              >
                                {user.isSuspended ? (
                                  <>
                                    <UserCheck size={14} /> Unsuspend
                                  </>
                                ) : (
                                  <>
                                    <UserX size={14} /> Suspend
                                  </>
                                )}
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
    </div>
  );
}
