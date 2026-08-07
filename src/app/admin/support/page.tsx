"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";

type SupportRequest = { id: string; email: string; subject: string; message: string; status: "OPEN" | "IN_PROGRESS" | "CLOSED"; createdAt: string };

export default function AdminSupportPage() { 
  const [requests, setRequests] = useState<SupportRequest[]>([]); 
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  useGSAP(() => {
    gsap.from(".support-header", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    if (listRef.current && !loading && requests.length > 0) {
      gsap.from(listRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  }, { scope: containerRef, dependencies: [loading, requests.length] });
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "OPEN": return { color: "text-red-700 bg-red-100", icon: AlertCircle, label: "Open" };
      case "IN_PROGRESS": return { color: "text-yellow-700 bg-yellow-100", icon: Clock, label: "In Progress" };
      case "CLOSED": return { color: "text-green-700 bg-green-100", icon: CheckCircle, label: "Closed" };
      default: return { color: "text-slate-700 bg-slate-100", icon: Mail, label: "Unknown" };
    }
  };

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="support-header flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Support Inbox</h1>
          <p className="text-slate-500">Manage and respond to user inquiries.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <Mail className="text-blue-500" size={20} />
          <span className="font-semibold text-slate-700">
            {loading ? "-" : requests.filter(r => r.status === "OPEN").length} Open
          </span>
        </div>
      </div>

      <div ref={listRef} className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center py-12 text-slate-500">
            <div className="inline-block w-8 h-8 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p>Loading support requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">All caught up!</h3>
            <p className="text-slate-500">There are no support requests at this time.</p>
          </div>
        ) : (
          requests.map((request) => {
            const statusConfig = getStatusConfig(request.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div key={request.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-1">{request.subject}</h2>
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <span className="font-medium text-slate-700">{request.email}</span>
                        <span>•</span>
                        {new Date(request.createdAt).toLocaleString(undefined, {
                          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.color}`}>
                        <StatusIcon size={14} />
                        {statusConfig.label}
                      </div>
                      
                      <select 
                        value={request.status} 
                        onChange={(event) => void updateStatus(request.id, event.target.value as SupportRequest["status"])} 
                        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer"
                      >
                        <option value="OPEN">Mark as Open</option>
                        <option value="IN_PROGRESS">Mark In Progress</option>
                        <option value="CLOSED">Mark as Closed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {request.message}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  ); 
}
