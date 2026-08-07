"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Users, CreditCard, Activity, MoreVertical } from "lucide-react";

type User = { id: string; email: string; plan: string; usageCount: number; isSuspended: boolean; createdAt: string };

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const fetchUsers = async () => { 
    try { 
      const res = await fetch("/api/admin/users"); 
      if (!res.ok) throw new Error("Unable to load users"); 
      setUsers(await res.json()); 
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    } 
  };
  
  useEffect(() => { void fetchUsers(); }, []);

  const updateUser = async (id: string, updates: Partial<User>) => { 
    try { 
      const res = await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...updates }) }); 
      if (!res.ok) throw new Error("Unable to update user"); 
      void fetchUsers(); 
    } catch (err) { 
      console.error(err); 
    } 
  };

  useGSAP(() => {
    // Header/metrics animation
    gsap.from(".metric-card", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });

    if (tbodyRef.current && !loading && users.length > 0) {
      gsap.from(tbodyRef.current.children, {
        y: 10,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      });
    }
  }, { scope: containerRef, dependencies: [loading, users.length] });

  const totalUsers = users.length;
  const proUsers = users.filter((u) => u.plan === "PRO").length;
  const activeUsers = users.filter((u) => !u.isSuspended).length;

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">People & Plans</h1>
      </div>

      {/* KPI Cards */}
      <div className="gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div className="metric-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <h3 className="text-2xl font-bold text-slate-900">{loading ? "-" : totalUsers}</h3>
          </div>
        </div>
        <div className="metric-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pro Subscribers</p>
            <h3 className="text-2xl font-bold text-slate-900">{loading ? "-" : proUsers}</h3>
          </div>
        </div>
        <div className="metric-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Accounts</p>
            <h3 className="text-2xl font-bold text-slate-900">{loading ? "-" : activeUsers}</h3>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Plan</th>
                <th className="py-4 px-6">Usage</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Joined</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody ref={tbodyRef} className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="inline-block w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="mt-2 text-sm">Loading users...</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No users found yet.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium text-sm">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-900">{user.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <select 
                        value={user.plan} 
                        onChange={(e) => void updateUser(user.id, { plan: e.target.value })}
                        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer"
                      >
                        <option value="FREE">FREE</option>
                        <option value="PRO">PRO</option>
                        <option value="AGENCY">AGENCY</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-sm">
                      {user.usageCount} imports
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isSuspended 
                          ? "bg-red-100 text-red-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {user.isSuspended ? "Suspended" : "Active"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => void updateUser(user.id, { isSuspended: !user.isSuspended })}
                        className={`text-sm font-medium transition-colors ${
                          user.isSuspended
                            ? "text-blue-600 hover:text-blue-700"
                            : "text-red-600 hover:text-red-700"
                        }`}
                      >
                        {user.isSuspended ? "Unsuspend" : "Suspend"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
