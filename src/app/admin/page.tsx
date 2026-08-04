"use client";

import { useEffect, useState } from "react";
import { MoreVertical, ShieldAlert, ShieldCheck } from "lucide-react";

type User = {
  id: string;
  clerkId: string;
  email: string;
  plan: string;
  usageCount: number;
  isSuspended: boolean;
  createdAt: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">User Management</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
              <th className="p-4">Email</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Usage</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">No users found. (Sign up first!)</td>
              </tr>
            ) : null}
            {users.map((user) => (
              <tr key={user.id} className="text-sm text-slate-700 hover:bg-slate-50">
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select 
                    value={user.plan} 
                    onChange={(e) => updateUser(user.id, { plan: e.target.value })}
                    className="border border-slate-300 rounded px-2 py-1 bg-white text-xs font-semibold"
                  >
                    <option value="FREE">FREE</option>
                    <option value="PRO">PRO</option>
                    <option value="AGENCY">AGENCY</option>
                  </select>
                </td>
                <td className="p-4">{user.usageCount} generations</td>
                <td className="p-4">
                  {user.isSuspended ? (
                    <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold"><ShieldAlert size={14}/> Suspended</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold"><ShieldCheck size={14}/> Active</span>
                  )}
                </td>
                <td className="p-4 text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <button 
                    onClick={() => updateUser(user.id, { isSuspended: !user.isSuspended })}
                    className="text-xs font-medium text-slate-600 hover:text-indigo-600 underline"
                  >
                    {user.isSuspended ? "Unsuspend" : "Suspend"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
