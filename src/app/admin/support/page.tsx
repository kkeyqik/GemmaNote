"use client";

import { useEffect, useState } from "react";

type SupportRequest = { id: string; email: string; subject: string; message: string; status: "OPEN" | "IN_PROGRESS" | "CLOSED"; createdAt: string };

export default function AdminSupportPage() { 
  const [requests, setRequests] = useState<SupportRequest[]>([]); 
  const [loading, setLoading] = useState(true); 

  const load = async () => { 
    try { 
      const response = await fetch("/api/admin/support"); 
      if (!response.ok) throw new Error("Failed to load support requests"); 
      setRequests(await response.json()); 
    } catch (error) { 
      console.error(error); 
    } finally { 
      setLoading(false); 
    } 
  }; 
  
  useEffect(() => { void load(); }, []); 

  const updateStatus = async (id: string, status: SupportRequest["status"]) => { 
    const response = await fetch("/api/admin/support", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) }); 
    if (response.ok) void load(); 
  }; 

  if (loading) return <div>Loading support requests...</div>; 
  
  return (
    <div>
      <h1>Admin - Support inbox</h1>
      <hr />
      <div>
        {requests.length === 0 && <p>No support requests yet.</p>}
        {requests.map((request) => (
          <div key={request.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h2>{request.subject}</h2>
            <p><strong>Email:</strong> {request.email} | <strong>Date:</strong> {new Date(request.createdAt).toLocaleString()}</p>
            <p>
              <strong>Status: </strong>
              <select 
                value={request.status} 
                onChange={(event) => void updateStatus(request.id, event.target.value as SupportRequest["status"])} 
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </p>
            <hr />
            <p>{request.message}</p>
          </div>
        ))}
      </div>
    </div>
  ); 
}
