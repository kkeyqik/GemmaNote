"use client";

import React from "react";
import { 
  Blocks, 
  MessageSquare, 
  Code, 
  FileText, 
  Zap, 
  Sparkles, 
  Clock, 
  Construction 
} from "lucide-react";

export default function AdminIntegrationsPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Blocks size={22} />
            </div>
            Integrations & Apps
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Third-party integrations are coming soon.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Planned Feature
          </span>
        </div>
      </div>

      {/* Main Empty State Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-8 sm:p-12 text-center relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-slate-100/60 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          {/* Illustration Placeholder */}
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm">
              <Blocks size={38} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center border border-amber-200 shadow-xs">
              <Construction size={18} />
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-2">Integrations Ecosystem Coming Soon</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Connect GemmaNote with your favorite productivity tools, developer platforms, and automation workflows.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
            <Clock size={15} className="text-indigo-500" />
            <span>Under Active Design & Development</span>
          </div>
        </div>
      </div>

      {/* Planned Integrations Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-500" />
            Planned Integrations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Integration 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:border-indigo-200 transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <MessageSquare size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-slate-800">Slack notifications</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">Coming Soon</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Real-time activity alerts, note creation events, and workspace updates sent straight to designated Slack channels.
              </p>
            </div>
          </div>

          {/* Integration 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:border-indigo-200 transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Code size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-slate-800">GitHub issue linking</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">Coming Soon</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Seamlessly attach GemmaNote documents to GitHub issues, pull requests, and commit references.
              </p>
            </div>
          </div>

          {/* Integration 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:border-indigo-200 transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <FileText size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-slate-800">Notion sync</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">Coming Soon</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bi-directional database and page synchronization between GemmaNote and Notion workspaces.
              </p>
            </div>
          </div>

          {/* Integration 4 */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:border-indigo-200 transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Zap size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-slate-800">Zapier webhooks</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">Coming Soon</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Custom triggers and actions to connect GemmaNote events with 5,000+ web applications via Zapier.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
