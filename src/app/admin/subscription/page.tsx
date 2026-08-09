"use client";

import React from "react";
import { 
  CreditCard, CheckCircle2, Zap, Shield, 
  ArrowRight, Crown, Server
} from "lucide-react";

export default function AdminSubscriptionPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <CreditCard className="text-indigo-500" size={24} />
            Subscription & Plans
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Manage your workspace's pricing plan, features, and limits.</p>
        </div>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 rounded-3xl p-8 text-white shadow-xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-indigo-500/30 border border-indigo-400/30 rounded-full text-[12px] font-bold uppercase tracking-wider text-indigo-100 flex items-center gap-1.5">
                <Crown size={14} /> Current Plan
              </span>
            </div>
            <h2 className="text-4xl font-black mb-2">Pro Workspace</h2>
            <p className="text-indigo-200 text-[14px] font-medium max-w-md leading-relaxed">
              You are currently on the Pro plan, billed at $49.00/month. Your next billing date is Nov 12, 2023.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
            <button className="h-12 px-8 rounded-xl bg-white text-indigo-900 font-black text-[14px] hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl w-full md:w-auto">
              Upgrade to Enterprise
            </button>
            <button className="h-12 px-8 rounded-xl bg-indigo-800/50 border border-indigo-700 hover:bg-indigo-700/50 text-indigo-100 font-bold text-[14px] transition-colors w-full md:w-auto">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Usage Limits */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col">
          <h3 className="text-[18px] font-extrabold text-slate-800 mb-6 flex items-center gap-2">
            <Zap className="text-amber-500" size={20} /> Current Usage
          </h3>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-bold text-slate-600">Active Users</span>
                <span className="font-bold text-slate-800">45 / 50</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-[11px] font-medium text-slate-500">You are near your user limit.</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-bold text-slate-600">Storage (GB)</span>
                <span className="font-bold text-slate-800">124 / 500</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-bold text-slate-600">API Requests (Monthly)</span>
                <span className="font-bold text-slate-800">42k / 100k</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Plans */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col">
          <h3 className="text-[18px] font-extrabold text-slate-800 mb-6 flex items-center gap-2">
            <Server className="text-blue-500" size={20} /> Available Plans
          </h3>
          
          <div className="space-y-4">
            
            <div className="border border-indigo-200 bg-indigo-50/30 p-5 rounded-2xl flex items-center justify-between relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
              <div>
                <h4 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">Pro <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-wider">Current</span></h4>
                <p className="text-[13px] font-medium text-slate-500 mt-1">Up to 50 users, 500GB storage.</p>
              </div>
              <span className="text-[18px] font-black text-slate-800">$49<span className="text-[13px] text-slate-400 font-medium">/mo</span></span>
            </div>

            <div className="border border-slate-200 hover:border-blue-300 p-5 rounded-2xl flex items-center justify-between transition-colors group cursor-pointer hover:bg-blue-50/30">
              <div>
                <h4 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">Enterprise</h4>
                <p className="text-[13px] font-medium text-slate-500 mt-1">Unlimited users, custom limits.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[18px] font-black text-slate-800">$299<span className="text-[13px] text-slate-400 font-medium">/mo</span></span>
                <button className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
