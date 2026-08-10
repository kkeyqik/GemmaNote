"use client";

import React from "react";
import {
  Terminal,
  ExternalLink,
  ShieldAlert,
  Server,
  Activity,
  Cpu,
  Clock,
  Sparkles,
  Search,
  Filter
} from "lucide-react";

export default function AdminLogsPage() {
  const plannedLogFeatures = [
    {
      title: "Real-Time Log Tail",
      description: "Stream live serverless API and database events directly to the admin console.",
      icon: Activity,
    },
    {
      title: "Severity Level Filtering",
      description: "Filter telemetry logs by DEBUG, INFO, WARN, and FATAL error thresholds.",
      icon: Filter,
    },
    {
      title: "Full-Text Grep Search",
      description: "Perform sub-second regex and text searches across historical system log files.",
      icon: Search,
    },
    {
      title: "Automated Error Alerting",
      description: "Receive instant notifications when error frequency exceeds set thresholds.",
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Terminal className="text-indigo-500" size={24} />
            System Logs
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            System log aggregation is a planned feature. Logs are currently available in Vercel Dashboard and Sentry.
          </p>
        </div>

        {/* External Links Header Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-4 rounded-xl bg-slate-900 text-white font-bold text-[13px] hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Server size={15} className="text-emerald-400" />
            View Vercel Logs &rarr;
          </a>
          <a
            href="https://sentry.io"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-4 rounded-xl bg-indigo-600 text-white font-bold text-[13px] hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-500/20"
          >
            <ShieldAlert size={15} />
            View Sentry Dashboard &rarr;
          </a>
        </div>
      </div>

      {/* Terminal-Style Empty State */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mb-8">
        {/* Terminal Header Bar */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-[12px] font-mono text-slate-400">
              gemma-note@admin: ~/telemetry/logs
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Status: Aggregator Standby
          </div>
        </div>

        {/* Terminal Window Content */}
        <div className="p-6 md:p-8 font-mono text-[13px] text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 text-indigo-400 font-bold mb-3">
            <span>$</span>
            <span>gemmanote-telemetry status --verbose</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mb-6 text-slate-400 text-[12px] leading-6">
            <p className="text-emerald-400 font-semibold">[SYSTEM INFO] Centralized Log Aggregation Pipeline</p>
            <p className="text-slate-300">Status: <span className="text-amber-400 font-bold">Planned Feature</span></p>
            <p className="text-slate-400">Internal log streaming table does not contain raw log entries yet.</p>
            <p className="text-slate-400 mt-2">Active production telemetry is forwarded directly to external partners:</p>
          </div>

          {/* External Links Cards inside Terminal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 font-sans">
            {/* Vercel Link Card */}
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-white font-bold text-[14px]">
                    <Server size={18} className="text-emerald-400" />
                    Vercel Runtime Logs
                  </div>
                  <ExternalLink size={14} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-[12px] text-slate-400 leading-normal">
                  Access live serverless function invocations, API response statuses, build outputs, and request durations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>View Vercel Logs &rarr;</span>
                <span className="text-slate-400">vercel.com</span>
              </div>
            </a>

            {/* Sentry Link Card */}
            <a
              href="https://sentry.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-white font-bold text-[14px]">
                    <ShieldAlert size={18} className="text-rose-400" />
                    Sentry Error Monitoring
                  </div>
                  <ExternalLink size={14} className="text-slate-500 group-hover:text-rose-400 transition-colors" />
                </div>
                <p className="text-[12px] text-slate-400 leading-normal">
                  Track client-side React exceptions, unhandled backend API rejections, stack traces, and release errors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-rose-400">
                <span>View Sentry Dashboard &rarr;</span>
                <span className="text-slate-400">sentry.io</span>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[12px]">
            <span className="text-emerald-400 animate-pulse">●</span>
            <span>Standing by for log pipeline deployment...</span>
          </div>
        </div>
      </div>

      {/* Planned Log Features Grid */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Upcoming Log Aggregation Features</h2>
        <p className="text-[13px] text-slate-500">
          Planned capabilities for the native GemmaNote log monitoring engine:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {plannedLogFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-indigo-600 border border-slate-200/60 flex items-center justify-center mb-3">
                  <Icon size={18} />
                </div>
                <h3 className="text-[13px] font-bold text-slate-800 mb-1">{feature.title}</h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-indigo-600">
                <span className="flex items-center gap-1">
                  <Sparkles size={12} /> Planned
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
