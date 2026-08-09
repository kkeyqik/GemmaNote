"use client";

import React from "react";
import { 
  BarChart2, TrendingUp, Users, FileText, ArrowUpRight, 
  ArrowDownRight, Download, Calendar
} from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <BarChart2 className="text-indigo-500" size={24} />
            Analytics Overview
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Deep dive into user growth, content creation, and platform health.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Calendar size={16} /> Last 30 Days
          </button>
          <button className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col relative overflow-hidden group hover:border-indigo-200 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[13px] font-bold text-slate-500">Total Users</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="flex items-end gap-3 relative z-10">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">24,592</h3>
            <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-500 mb-1.5 bg-emerald-50 px-1.5 py-0.5 rounded">
              <ArrowUpRight size={12} /> 12.5%
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col relative overflow-hidden group hover:border-blue-200 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[13px] font-bold text-slate-500">Active Notes</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
              <FileText size={16} />
            </div>
          </div>
          <div className="flex items-end gap-3 relative z-10">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">142.8k</h3>
            <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-500 mb-1.5 bg-emerald-50 px-1.5 py-0.5 rounded">
              <ArrowUpRight size={12} /> 8.2%
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col relative overflow-hidden group hover:border-emerald-200 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[13px] font-bold text-slate-500">Avg. Session</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="flex items-end gap-3 relative z-10">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">14m 22s</h3>
            <span className="flex items-center gap-1 text-[12px] font-bold text-rose-500 mb-1.5 bg-rose-50 px-1.5 py-0.5 rounded">
              <ArrowDownRight size={12} /> 2.1%
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col relative overflow-hidden group hover:border-purple-200 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[13px] font-bold text-slate-500">Pro Conversion</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
              <BarChart2 size={16} />
            </div>
          </div>
          <div className="flex items-end gap-3 relative z-10">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">4.2%</h3>
            <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-500 mb-1.5 bg-emerald-50 px-1.5 py-0.5 rounded">
              <ArrowUpRight size={12} /> 0.8%
            </span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Main Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
          <h2 className="text-[15px] font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div> User Growth Trend
          </h2>
          <div className="h-[280px] w-full flex items-end justify-between gap-2 px-2 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-slate-100 border-dashed"></div>
              ))}
            </div>
            
            {/* Bars */}
            {[40, 55, 45, 70, 65, 80, 95, 85, 100, 110, 105, 120].map((height, i) => (
              <div key={i} className="relative flex flex-col items-center justify-end h-full group w-full max-w-[40px] z-10">
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded transition-opacity">
                  {height * 120}
                </div>
                <div 
                  className="w-full bg-gradient-to-t from-indigo-500 to-blue-400 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all cursor-pointer" 
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-[10px] font-bold text-slate-400 mt-3 absolute -bottom-6">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
          <h2 className="text-[15px] font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Usage by Device
          </h2>
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-bold text-slate-700">Desktop</span>
                <span className="font-bold text-slate-900">65%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-bold text-slate-700">Mobile App</span>
                <span className="font-bold text-slate-900">25%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-bold text-slate-700">Tablet</span>
                <span className="font-bold text-slate-900">10%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>

          </div>
          
          <div className="mt-10 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[12px] font-medium text-slate-500 leading-relaxed text-center">
              Mobile app usage is up <span className="font-bold text-emerald-600">14%</span> since last month following the iOS 2.0 release.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
