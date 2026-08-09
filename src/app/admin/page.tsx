"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, FileText, Folder, Edit2, ArrowUpRight, ArrowDownRight, 
  Calendar, MoreVertical, CheckCircle2, ChevronRight, UserPlus, 
  PlusSquare, LayoutGrid, FileSpreadsheet, Settings, Trash2, 
  Trash, Edit3, RefreshCw, Loader2
} from "lucide-react";

// --- Mock Data Generator ---
const generateDashboardData = (timeRange: string) => {
  // Use pseudo-random logic based on timeRange to generate "real-looking" dynamic data
  const baseMultiplier = timeRange === '30d' ? 4 : timeRange === '1y' ? 12 : 1;
  
  return {
    stats: {
      users: { total: 2453 * baseMultiplier, change: 12.6, isUp: true },
      notes: { total: 18736 * baseMultiplier, change: 18.2, isUp: true },
      notebooks: { total: 3682 * baseMultiplier, change: 10.4, isUp: true },
      active: { total: 1124 * baseMultiplier, change: 14.5, isUp: true },
    },
    topNotebooks: {
      total: 3682 * baseMultiplier,
      personal: { count: 1234 * baseMultiplier, percent: 33 },
      work: { count: 1056 * baseMultiplier, percent: 28 },
      ideas: { count: 784 * baseMultiplier, percent: 21 },
      study: { count: 432 * baseMultiplier, percent: 11 },
      others: { count: 176 * baseMultiplier, percent: 7 },
    },
    userGrowth: Array.from({ length: 20 }).map(() => Math.floor(Math.random() * 80) + 10),
    heatmap: Array.from({ length: 84 }).map(() => {
      const opacities = ['bg-indigo-50', 'bg-indigo-100', 'bg-indigo-200', 'bg-indigo-300', 'bg-indigo-400', 'bg-indigo-500'];
      return opacities[Math.floor(Math.random() * opacities.length)];
    }),
    activities: [
      { id: 1, icon: Folder, color: "blue", title: "User John Doe", action: "created a new notebook", target: "Work Ideas", time: "2m ago" },
      { id: 2, icon: Trash2, color: "rose", title: "User Emily Smith", action: "deleted a note", target: "Meeting Notes.txt", time: "15m ago" },
      { id: 3, icon: Edit3, color: "purple", title: "User Michael Lee", action: "updated a note", target: "Project Roadmap", time: "28m ago" },
      { id: 4, icon: RefreshCw, color: "emerald", title: "User Sarah Wilson", action: "restored a note", target: "Old Ideas", time: "1h ago" },
      { id: 5, icon: UserPlus, color: "indigo", title: "User David Brown", action: "registered", target: "david.brown@example.com", time: "2h ago" }
    ],
    storage: {
      usedGB: (214.6 * baseMultiplier).toFixed(1),
      percent: Math.min(21.4 * baseMultiplier, 100).toFixed(1),
      files: 128743 * baseMultiplier,
      notesSizeGB: (184.2 * baseMultiplier).toFixed(1)
    }
  };
};

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [data, setData] = useState<ReturnType<typeof generateDashboardData> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate network request
    const timer = setTimeout(() => {
      setData(generateDashboardData(timeRange));
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [timeRange]);

  const handleDateChange = () => {
    const options = ['7d', '30d', '1y'];
    const nextIndex = (options.indexOf(timeRange) + 1) % options.length;
    setTimeRange(options[nextIndex]);
  };

  const dateLabel = timeRange === '7d' ? 'Last 7 Days' : timeRange === '30d' ? 'Last 30 Days' : 'This Year';

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* Left Main Content */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={24} /></div>}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-slate-500 mb-1">Total Users</p>
                <h3 className="text-[24px] font-extrabold text-slate-800 leading-none">{data?.stats.users.total.toLocaleString() || '---'}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-500 flex items-center gap-0.5"><ArrowUpRight size={14} /> {data?.stats.users.change}%</span>
              <span className="text-slate-400 font-medium">vs last {dateLabel.toLowerCase()}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={24} /></div>}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-slate-500 mb-1">Total Notes</p>
                <h3 className="text-[24px] font-extrabold text-slate-800 leading-none">{data?.stats.notes.total.toLocaleString() || '---'}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-500 flex items-center gap-0.5"><ArrowUpRight size={14} /> {data?.stats.notes.change}%</span>
              <span className="text-slate-400 font-medium">vs last {dateLabel.toLowerCase()}</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={24} /></div>}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Folder size={24} />
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-slate-500 mb-1">Total Notebooks</p>
                <h3 className="text-[24px] font-extrabold text-slate-800 leading-none">{data?.stats.notebooks.total.toLocaleString() || '---'}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-500 flex items-center gap-0.5"><ArrowUpRight size={14} /> {data?.stats.notebooks.change}%</span>
              <span className="text-slate-400 font-medium">vs last {dateLabel.toLowerCase()}</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={24} /></div>}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                <Edit2 size={24} />
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-slate-500 mb-1">Active Users</p>
                <h3 className="text-[24px] font-extrabold text-slate-800 leading-none">{data?.stats.active.total.toLocaleString() || '---'}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-500 flex items-center gap-0.5"><ArrowUpRight size={14} /> {data?.stats.active.change}%</span>
              <span className="text-slate-400 font-medium">vs last {dateLabel.toLowerCase()}</span>
            </div>
          </div>

        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Overview Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 relative overflow-hidden">
            {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={32} /></div>}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-extrabold text-slate-800">Overview</h3>
              <select 
                className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="1y">This Year</option>
              </select>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2"><span className="w-2 h-0.5 bg-purple-500 rounded-full"></span><span className="text-[10px] font-bold text-slate-500">Users</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-0.5 bg-blue-500 rounded-full"></span><span className="text-[10px] font-bold text-slate-500">Notes</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-0.5 bg-emerald-500 rounded-full"></span><span className="text-[10px] font-bold text-slate-500">Notebooks</span></div>
            </div>
            <div className="w-full h-[220px] relative mt-4 border-l border-b border-slate-100 text-[10px] font-medium text-slate-400">
              
              {/* Y-axis labels */}
              <div className="absolute -left-6 bottom-[10%]">500</div>
              <div className="absolute -left-5 bottom-[30%]">1K</div>
              <div className="absolute -left-6 bottom-[50%]">1.5K</div>
              <div className="absolute -left-5 bottom-[70%]">2K</div>
              <div className="absolute -left-6 bottom-[90%]">2.5K</div>
              <div className="absolute -left-5 bottom-[100%]">3K</div>

              {/* Grid lines */}
              <div className="absolute left-0 bottom-[10%] w-full border-t border-slate-50"></div>
              <div className="absolute left-0 bottom-[30%] w-full border-t border-slate-50"></div>
              <div className="absolute left-0 bottom-[50%] w-full border-t border-slate-50"></div>
              <div className="absolute left-0 bottom-[70%] w-full border-t border-slate-50"></div>
              <div className="absolute left-0 bottom-[90%] w-full border-t border-slate-50"></div>

              {/* SVG Chart Lines - Dynamic path to simulate changes */}
              <svg className="w-full h-full absolute inset-0 overflow-visible transition-all duration-700" preserveAspectRatio="none" viewBox="0 0 100 100">
                {timeRange === '7d' && (
                  <>
                    <path d="M0,70 C20,65 30,50 50,55 C70,60 80,45 100,40" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M0,50 C20,45 30,35 50,45 C70,55 80,35 100,30" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M0,25 C20,30 30,20 50,25 C70,30 80,15 100,10" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
                {timeRange === '30d' && (
                  <>
                    <path d="M0,80 C20,45 30,60 50,35 C70,40 80,25 100,15" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M0,60 C20,35 30,25 50,15 C70,25 80,15 100,5" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M0,35 C20,40 30,10 50,15 C70,20 80,5 100,0" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
                {timeRange === '1y' && (
                  <>
                    <path d="M0,90 C10,85 20,60 50,45 C80,30 90,15 100,10" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M0,70 C10,65 20,40 50,25 C80,10 90,5 100,0" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M0,45 C10,40 20,10 50,5 C80,0 90,0 100,0" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>

              {/* X-axis labels */}
              <div className="absolute -bottom-6 left-0 w-full flex justify-between">
                <span>Day 1</span><span>Day 2</span><span>Day 3</span><span>Day 4</span><span>Day 5</span><span>Day 6</span><span>Day 7</span>
              </div>
            </div>
          </div>

          {/* Top Notebooks Donut Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
            {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={32} /></div>}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-extrabold text-slate-800">Top Notebooks</h3>
              <button className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600">View All</button>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative">
              {/* Fixed Donut Chart SVG (Perfect Circle) */}
              {/* Changed viewBox to 42x42 and cx/cy to 21 to prevent stroke from being clipped by the edges */}
              <div className="relative w-[180px] h-[180px]">
                <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                  {/* Purple (33%) */}
                  <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#a855f7" strokeWidth="6" strokeDasharray={`${data?.topNotebooks.personal.percent || 33} ${100 - (data?.topNotebooks.personal.percent || 33)}`} strokeDashoffset="0" className="transition-all duration-700"></circle>
                  {/* Blue (28%) */}
                  <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray={`${data?.topNotebooks.work.percent || 28} ${100 - (data?.topNotebooks.work.percent || 28)}`} strokeDashoffset={`-${data?.topNotebooks.personal.percent || 33}`} className="transition-all duration-700"></circle>
                  {/* Emerald (21%) */}
                  <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#10b981" strokeWidth="6" strokeDasharray={`${data?.topNotebooks.ideas.percent || 21} ${100 - (data?.topNotebooks.ideas.percent || 21)}`} strokeDashoffset={`-${(data?.topNotebooks.personal.percent || 33) + (data?.topNotebooks.work.percent || 28)}`} className="transition-all duration-700"></circle>
                  {/* Yellow (11%) */}
                  <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#facc15" strokeWidth="6" strokeDasharray={`${data?.topNotebooks.study.percent || 11} ${100 - (data?.topNotebooks.study.percent || 11)}`} strokeDashoffset={`-${(data?.topNotebooks.personal.percent || 33) + (data?.topNotebooks.work.percent || 28) + (data?.topNotebooks.ideas.percent || 21)}`} className="transition-all duration-700"></circle>
                  {/* Gray (7%) */}
                  <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#cbd5e1" strokeWidth="6" strokeDasharray={`${data?.topNotebooks.others.percent || 7} ${100 - (data?.topNotebooks.others.percent || 7)}`} strokeDashoffset={`-${(data?.topNotebooks.personal.percent || 33) + (data?.topNotebooks.work.percent || 28) + (data?.topNotebooks.ideas.percent || 21) + (data?.topNotebooks.study.percent || 11)}`} className="transition-all duration-700"></circle>
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[16px] font-extrabold text-slate-800">{data?.topNotebooks.total.toLocaleString() || '---'}</span>
                  <span className="text-[10px] font-bold text-slate-400">Total</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-3 ml-6 text-[11px]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span className="font-bold text-slate-700">Personal</span></div>
                  <span className="text-slate-400 font-medium">{data?.topNotebooks.personal.count.toLocaleString() || '---'} ({data?.topNotebooks.personal.percent}%)</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="font-bold text-slate-700">Work</span></div>
                  <span className="text-slate-400 font-medium">{data?.topNotebooks.work.count.toLocaleString() || '---'} ({data?.topNotebooks.work.percent}%)</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="font-bold text-slate-700">Ideas</span></div>
                  <span className="text-slate-400 font-medium">{data?.topNotebooks.ideas.count.toLocaleString() || '---'} ({data?.topNotebooks.ideas.percent}%)</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div><span className="font-bold text-slate-700">Study</span></div>
                  <span className="text-slate-400 font-medium">{data?.topNotebooks.study.count.toLocaleString() || '---'} ({data?.topNotebooks.study.percent}%)</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-300"></div><span className="font-bold text-slate-700">Others</span></div>
                  <span className="text-slate-400 font-medium">{data?.topNotebooks.others.count.toLocaleString() || '---'} ({data?.topNotebooks.others.percent}%)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* User Growth Bar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
            {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={32} /></div>}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-extrabold text-slate-800">User Growth</h3>
              <select 
                className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="1y">This Year</option>
              </select>
            </div>
            <div className="flex-1 w-full relative mt-4 border-l border-b border-slate-100 text-[10px] font-medium text-slate-400 min-h-[200px]">
              {/* Y-axis */}
              <div className="absolute -left-5 bottom-[25%]">250</div>
              <div className="absolute -left-5 bottom-[50%]">500</div>
              <div className="absolute -left-5 bottom-[75%]">750</div>
              <div className="absolute -left-4 bottom-[100%]">1K</div>
              
              {/* Bars container */}
              <div className="absolute inset-0 flex items-end justify-between px-2 pt-2">
                {/* Dynamic bars */}
                {(data?.userGrowth || Array.from({ length: 20 }).map(() => 0)).map((h, i) => (
                  <div key={i} className="w-[3%] bg-indigo-300 hover:bg-indigo-500 transition-all duration-700 ease-in-out rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
              
              {/* X-axis */}
              <div className="absolute -bottom-6 left-0 w-full flex justify-between px-2">
                <span>Start</span><span>Q1</span><span>Q2</span><span>Q3</span><span>End</span>
              </div>
            </div>
          </div>

          {/* Note Activity Heatmap */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
            {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={32} /></div>}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-extrabold text-slate-800">Note Activity</h3>
              <select 
                className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="1y">This Year</option>
              </select>
            </div>
            <div className="flex-1 flex items-center">
              <div className="flex gap-2 w-full">
                {/* Days of week */}
                <div className="flex flex-col justify-between text-[9px] font-bold text-slate-400 py-1 pr-2">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
                {/* Heatmap Grid */}
                <div className="flex-1 grid grid-cols-12 gap-1 content-between">
                  {/* Dynamic Heatmap */}
                  {(data?.heatmap || Array.from({ length: 84 }).map(() => 'bg-indigo-50')).map((op, i) => (
                    <div key={i} className={`aspect-square rounded-sm ${op} hover:border hover:border-indigo-600 cursor-pointer transition-colors duration-700`}></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-2 mt-4 text-[10px] font-bold text-slate-400">
              Less
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-indigo-50"></div>
                <div className="w-3 h-3 rounded-sm bg-indigo-200"></div>
                <div className="w-3 h-3 rounded-sm bg-indigo-300"></div>
                <div className="w-3 h-3 rounded-sm bg-indigo-400"></div>
                <div className="w-3 h-3 rounded-sm bg-indigo-500"></div>
              </div>
              More
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-transparent mt-2">
          <h3 className="text-[14px] font-extrabold text-slate-800 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              <UserPlus size={16} className="text-indigo-500" /> Add New User
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              <PlusSquare size={16} className="text-blue-500" /> Create Notebook
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              <LayoutGrid size={16} className="text-emerald-500" /> Manage Categories
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              <FileSpreadsheet size={16} className="text-purple-500" /> View Reports
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              <Settings size={16} className="text-slate-500" /> System Settings
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors shadow-sm">
              <Trash size={16} className="text-rose-500" /> Clear Trash
            </button>
          </div>
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
        
        {/* Date Picker Button */}
        <button 
          onClick={handleDateChange}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between text-[12px] font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors relative overflow-hidden"
        >
          <div className="flex items-center gap-2 relative z-10">
            <Calendar size={16} className="text-indigo-500" />
            {dateLabel}
          </div>
          <ChevronRight size={14} className="text-slate-400 rotate-90 relative z-10" />
        </button>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col relative overflow-hidden">
          {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={32} /></div>}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-extrabold text-slate-800">Recent Activity</h3>
            <button className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600">View All</button>
          </div>
          
          <div className="flex flex-col gap-5">
            {data?.activities.map(activity => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full bg-${activity.color}-50 text-${activity.color}-600 flex items-center justify-center shrink-0`}>
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-slate-800 leading-tight">
                      <span className="font-bold">{activity.title}</span> {activity.action}
                    </p>
                    <p className={`text-[11px] font-bold text-${activity.color}-500 mt-1`}>{activity.target}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-extrabold text-slate-800">System Status</h3>
            <button className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600">View All</button>
          </div>
          
          <div className="flex flex-col gap-4">
            {['Web Application', 'Database', 'File Storage', 'Backup Service'].map((service, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[12px] font-bold text-slate-700">{service}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Operational</span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Usage */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col relative overflow-hidden">
          {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={32} /></div>}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[14px] font-extrabold text-slate-800">Storage Usage</h3>
            <button className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600">View All</button>
          </div>
          
          <div className="flex justify-between items-end mb-2">
            <span className="text-[12px] font-bold text-slate-800">{data?.storage.usedGB || '---'} GB <span className="text-slate-400 font-medium">/ 1 TB Used</span></span>
            <span className="text-[12px] font-bold text-slate-800">{data?.storage.percent || '--'}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full mb-6">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-700 ease-in-out" style={{ width: `${data?.storage.percent || 0}%` }}></div>
          </div>

          <div className="flex justify-between items-center text-center">
            <div>
              <p className="text-[10px] font-bold text-slate-400 mb-0.5">Total Files</p>
              <p className="text-[14px] font-extrabold text-slate-800">{data?.storage.files.toLocaleString() || '---'}</p>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 mb-0.5">Notes Size</p>
              <p className="text-[14px] font-extrabold text-slate-800">{data?.storage.notesSizeGB || '---'} GB</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
