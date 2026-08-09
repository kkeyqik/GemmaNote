"use client";

import React, { useState } from "react";
import { 
  Blocks, Search, Plus, 
  MessageSquare, ToggleRight, ToggleLeft
} from "lucide-react";

const GithubIcon = ({size}: {size:number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const SlackIcon = ({size}: {size:number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.08 9C19.81 1.41 16.54-.35 9 1.92S-.35 7.46 1.92 15 7.46 24.35 15 22.08 24.35 16.54 22.08 9z"/><path d="M12.57 5.99a.62.62 0 0 0-.3.44l-.86 3.14a.59.59 0 0 0 .43.74l3.14.86a.59.59 0 0 0 .74-.43l.86-3.14a.59.59 0 0 0-.43-.74l-3.14-.86z"/><path d="M18.3 14.3a.59.59 0 0 0-.74.43l-.86 3.14a.59.59 0 0 0 .43.74l3.14.86a.59.59 0 0 0 .74-.43l.86-3.14a.59.59 0 0 0-.43-.74l-3.14-.86z"/><path d="M11.43 18.01a.59.59 0 0 0 .3-.44l.86-3.14a.59.59 0 0 0-.43-.74l-3.14-.86a.59.59 0 0 0-.74.43l-.86 3.14a.59.59 0 0 0 .43.74l3.14.86z"/><path d="M5.7 9.7a.59.59 0 0 0 .74-.43l.86-3.14a.59.59 0 0 0-.43-.74L3.73 4.53a.59.59 0 0 0-.74.43l-.86 3.14a.59.59 0 0 0 .43.74l3.14.86z"/></svg>;
const TrelloIcon = ({size}: {size:number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><rect width="3" height="9" x="7" y="7"/><rect width="3" height="5" x="14" y="7"/></svg>;

// Dummy data for integrations
const INITIAL_INTEGRATIONS = [
  { id: "INT-01", name: "Slack", description: "Send notifications to Slack channels for new notes and updates.", status: true, icon: <SlackIcon size={24} /> },
  { id: "INT-02", name: "GitHub", description: "Link notes directly to GitHub issues and pull requests.", status: false, icon: <GithubIcon size={24} /> },
  { id: "INT-03", name: "Notion", description: "Sync notes bi-directionally with Notion workspaces.", status: false, icon: <div className="font-serif font-black text-[24px]">N</div> },
  { id: "INT-04", name: "Trello", description: "Create Trello cards from notes or link existing cards.", status: false, icon: <TrelloIcon size={24} /> },
  { id: "INT-05", name: "Discord", description: "Send webhooks to Discord servers on specific events.", status: true, icon: <MessageSquare size={24} /> },
];

export default function AdminIntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(int => 
      int.id === id ? { ...int, status: !int.status } : int
    ));
  };

  const filteredIntegrations = integrations.filter(int => 
    int.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Blocks className="text-indigo-500" size={24} />
            Integrations & Apps
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Connect Gemma Note with your favorite tools and services.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-indigo-600 text-white font-bold text-[13px] hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-500/20">
            <Plus size={16} /> Custom Webhook
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col p-6 mb-8">
        <div className="relative w-full max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search integrations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <div key={integration.id} className="border border-slate-200 rounded-2xl p-6 flex flex-col relative group hover:border-indigo-200 transition-colors bg-slate-50/30">
              
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:shadow-md transition-all">
                  {integration.icon}
                </div>
                <button 
                  onClick={() => toggleIntegration(integration.id)}
                  className={`transition-colors ${integration.status ? 'text-emerald-500' : 'text-slate-300'}`}
                >
                  {integration.status ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>

              <h3 className="text-[16px] font-bold text-slate-800 mb-2">{integration.name}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed mb-6 flex-1">
                {integration.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 mt-auto">
                {integration.status ? (
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Connected</span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Disconnected</span>
                )}
                {integration.status && (
                  <button className="text-[12px] font-bold text-indigo-600 hover:text-indigo-700">Configure</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
