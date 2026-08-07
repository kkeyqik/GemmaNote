"use client";

import { useEffect, useState, useRef } from "react";
import { ShieldAlert, ShieldCheck, Users, TrendingUp, CreditCard, Activity } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type User = { id: string; email: string; plan: string; usageCount: number; isSuspended: boolean; createdAt: string };

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const container = useRef<HTMLDivElement>(null);

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
    if (!loading) {
      gsap.from(".dash-anim", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      });
      gsap.from(".row-anim", {
        y: 10,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.3
      });
    }
  }, { scope: container, dependencies: [loading] });

  if (loading) return <div className="grid min-h-48 place-items-center text-sm font-semibold text-text-muted">Loading users…</div>;

  const totalUsers = users.length;
  const activePaid = users.filter(u => u.plan !== "FREE" && !u.isSuspended).length;
  const totalImports = users.reduce((acc, u) => acc + u.usageCount, 0);

  return (
    <div ref={container} className="mx-auto max-w-7xl">
      <header className="dash-anim mb-8 flex items-start gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white shadow-[0_8px_20px_rgba(99,102,241,0.25)]">
          <Users size={26} />
        </span>
        <div>
          <h1 className="font-outfit text-4xl font-bold tracking-tight text-text">People and plans</h1>
          <p className="mt-1.5 text-base font-medium text-text-muted">Manage platform access, billing tiers, and usage.</p>
        </div>
      </header>

      <div className="dash-anim mb-10 grid gap-5 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-panel p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 text-text-muted">
            <Activity size={18} />
            <h3 className="text-sm font-bold uppercase tracking-wider">Total Users</h3>
          </div>
          <p className="mt-4 font-outfit text-5xl font-black tracking-tight text-text">{totalUsers}</p>
        </div>
        <div className="rounded-3xl border border-border bg-panel p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 text-text-muted">
            <CreditCard size={18} />
            <h3 className="text-sm font-bold uppercase tracking-wider">Paid Plans</h3>
          </div>
          <p className="mt-4 font-outfit text-5xl font-black tracking-tight text-text">{activePaid}</p>
        </div>
        <div className="rounded-3xl border border-border bg-panel p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 text-text-muted">
            <TrendingUp size={18} />
            <h3 className="text-sm font-bold uppercase tracking-wider">Total Imports</h3>
          </div>
          <p className="mt-4 font-outfit text-5xl font-black tracking-tight text-text">{totalImports}</p>
        </div>
      </div>

      <div className="dash-anim overflow-x-auto rounded-3xl border border-border bg-panel shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-2">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-border/50 text-xs font-black uppercase tracking-[0.15em] text-text-muted">
              <th className="px-6 py-5">Email</th>
              <th className="px-6 py-5">Plan</th>
              <th className="px-6 py-5">Usage</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Joined</th>
              <th className="px-6 py-5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {users.length === 0 ? (
              <tr><td colSpan={6} className="p-10 text-center font-medium text-text-muted">No users found yet.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="row-anim group text-text transition-colors hover:bg-panel-alt/50">
                  <td className="px-6 py-5 font-semibold">{user.email}</td>
                  <td className="px-6 py-5">
                    <select 
                      value={user.plan} 
                      onChange={(e) => void updateUser(user.id, { plan: e.target.value })} 
                      className="h-10 cursor-pointer rounded-xl border border-border bg-panel px-3 text-xs font-bold uppercase tracking-wider text-text-muted outline-none transition-colors focus:border-accent group-hover:border-border/80"
                    >
                      <option value="FREE">FREE</option>
                      <option value="PRO">PRO</option>
                      <option value="AGENCY">AGENCY</option>
                    </select>
                  </td>
                  <td className="px-6 py-5 font-medium text-text-muted">{user.usageCount} <span className="text-xs">imports</span></td>
                  <td className="px-6 py-5">
                    {user.isSuspended ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50/50 px-3 py-1.5 text-xs font-bold tracking-wide text-red-600 shadow-sm">
                        <ShieldAlert size={14} /> Suspended
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1.5 text-xs font-bold tracking-wide text-emerald-600 shadow-sm">
                        <ShieldCheck size={14} /> Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-text-muted">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-5">
                    <button 
                      onClick={() => void updateUser(user.id, { isSuspended: !user.isSuspended })} 
                      className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                        user.isSuspended 
                          ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" 
                          : "bg-red-50 text-red-600 hover:bg-red-100"
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
  );
}
