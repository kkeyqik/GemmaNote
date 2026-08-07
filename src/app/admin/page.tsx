"use client";

import { useEffect, useState } from "react";

type User = { id: string; email: string; plan: string; usageCount: number; isSuspended: boolean; createdAt: string };

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h1>Admin - People and plans</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Plan</th>
            <th>Usage</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={6}>No users found yet.</td></tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <select 
                    value={user.plan} 
                    onChange={(e) => void updateUser(user.id, { plan: e.target.value })} 
                  >
                    <option value="FREE">FREE</option>
                    <option value="PRO">PRO</option>
                    <option value="AGENCY">AGENCY</option>
                  </select>
                </td>
                <td>{user.usageCount} imports</td>
                <td>{user.isSuspended ? "Suspended" : "Active"}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => void updateUser(user.id, { isSuspended: !user.isSuspended })}>
                    {user.isSuspended ? "Unsuspend" : "Suspend"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
