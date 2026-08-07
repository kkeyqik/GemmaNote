"use client";

import { useEffect, useState, useRef } from "react";
import { LifeBuoy, Mail, Clock } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type SupportRequest = { id: string; email: string; subject: string; message: string; status: "OPEN" | "IN_PROGRESS" | "CLOSED"; createdAt: string };

export default function AdminSupportPage() { 
  const [requests, setRequests] = useState<SupportRequest[]>([]); 
  const [loading, setLoading] = useState(true); 
  const container = useRef<HTMLDivElement>(null);

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
    if (!loading) {
      gsap.from(".header-anim", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      });
      gsap.from(".ticket-anim", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2
      });
    }
  }, { scope: container, dependencies: [loading] });

  if (loading) return <div className="grid min-h-48 place-items-center text-sm font-semibold text-text-muted">Loading support requests…</div>; 
  
  return (
    <div ref={container} className="mx-auto max-w-5xl">
      <header className="header-anim mb-10 flex items-start gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white shadow-[0_8px_20px_rgba(99,102,241,0.25)]">
          <LifeBuoy size={26} />
        </span>
        <div>
          <h1 className="font-outfit text-4xl font-bold tracking-tight text-text">Support inbox</h1>
          <p className="mt-1.5 text-base font-medium text-text-muted">Manage and reply to user inquiries sent from account settings.</p>
        </div>
      </header>

      <div className="space-y-5">
        {requests.length === 0 && (
          <div className="ticket-anim rounded-3xl border border-border bg-panel p-16 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-panel-alt text-text-muted">
              <Mail size={24} />
            </span>
            <h3 className="font-outfit text-xl font-bold text-text">Inbox Zero</h3>
            <p className="mt-2 text-sm text-text-muted">No support requests yet. You're all caught up!</p>
          </div>
        )}
        
        {requests.map((request) => (
          <article key={request.id} className="ticket-anim rounded-3xl border border-border bg-panel p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <h2 className="font-outfit text-xl font-bold text-text">{request.subject}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-medium text-text-muted">
                  <span className="flex items-center gap-1.5 rounded-lg bg-panel-alt px-2.5 py-1 text-text">
                    <Mail size={14} /> {request.email}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg bg-panel-alt px-2.5 py-1">
                    <Clock size={14} /> {new Date(request.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                <select 
                  value={request.status} 
                  onChange={(event) => void updateStatus(request.id, event.target.value as SupportRequest["status"])} 
                  className={`h-11 cursor-pointer rounded-xl border px-4 text-xs font-bold uppercase tracking-wider outline-none transition-colors focus:border-accent ${
                    request.status === "OPEN" ? "border-amber-200 bg-amber-50 text-amber-700" :
                    request.status === "IN_PROGRESS" ? "border-blue-200 bg-blue-50 text-blue-700" :
                    "border-emerald-200 bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-panel-alt p-5">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-text">{request.message}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  ); 
}
