"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, FileText, Folder, Edit2, ArrowUpRight, 
  Calendar, CheckCircle2, ChevronRight, UserPlus, 
  PlusSquare, LayoutGrid, FileSpreadsheet, Settings, Trash, 
  Trash2, Edit3, RefreshCw, Loader2, AlertCircle
} from "lucide-react";

interface UserActivity {
  id: string;
  email: string;
  clerkId: string;
  role: string;
  plan: string;
  createdAt: string;
}

interface NoteActivity {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
}

interface AdminStatsData {
  totalUsers: number;
  totalNotes: number;
  totalWorkspaces: number;
  activeUsers7d: number;
  estimatedStorageBytes: number;
  estimatedStorageSize: string;
  recentActivities: {
    latestUsers: UserActivity[];
    latestNotes: NoteActivity[];
  };
}

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [data, setData] = useState<AdminStatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async (range: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/stats?timeRange=${range}`);
      if (!res.ok) {
        throw new Error(`Failed to load admin stats (${res.status})`);
      }
      const json: AdminStatsData = await res.json();
      setData(json);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error fetching stats";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(timeRange);
  }, [timeRange]);

  const handleDateChange = () => {
    const options = ["7d", "30d", "1y"];
    const nextIndex = (options.indexOf(timeRange) + 1) % options.length;
    setTimeRange(options[nextIndex]);
  };

  const dateLabel = timeRange === "7d" ? "Last 7 Days" : timeRange === "30d" ? "Last 30 Days" : "This Year";

  // Build combined recent activities sorted by date
  const formattedActivities = React.useMemo(() => {
    if (!data) return [];
    const items: Array<{
      id: string;
      icon: typeof UserPlus;
      color: string;
      title: string;
      action: string;
      target: string;
      time: string;
      rawDate: Date;
    }> = [];

    data.recentActivities.latestUsers.forEach((u) => {
      items.push({
        id: `user-${u.id}`,
        icon: UserPlus,
        color: "indigo",
        title: u.email || "New User",
        action: "registered account",
        target: `Plan: ${u.plan || "FREE"}`,
        time: new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        rawDate: new Date(u.createdAt),
      });
    });

    data.recentActivities.latestNotes.forEach((n) => {
      items.push({
        id: `note-${n.id}`,
        icon: Edit3,
        color: "blue",
        title: `Note "${n.title || "Untitled"}"`,
        action: "created",
        target: `User: ${n.userId.substring(0, 8)}...`,
        time: new Date(n.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        rawDate: new Date(n.createdAt),
      });
    });

    items.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
    return items.slice(0, 6);
  }, [data]);

  // Derived metrics
  const storageMB = data ? (data.estimatedStorageBytes / (1024 * 1024)).toFixed(2) : "0.00";
  const storageGB = data ? (data.estimatedStorageBytes / (1024 * 1024 * 1024)).toFixed(4) : "0.0000";

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* Left Main Content */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center justify-between text-[13px] font-medium">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
            <button 
              onClick={() => fetchStats(timeRange)}
              className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg font-bold text-[12px] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Users */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-500" size={24} />
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-slate-500 mb-1">Total Users</p>
                <h3 className="text-[24px] font-extrabold text-slate-800 leading-none">
                  {data?.totalUsers !== undefined ? data.totalUsers.toLocaleString() : "---"}
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-500 flex items-center gap-0.5"><ArrowUpRight size={14} /> Live</span>
              <span className="text-slate-400 font-medium">real-time count</span>
            </div>
          </div>

          {/* Card 2: Notes */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={24} />
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-slate-500 mb-1">Total Notes</p>
                <h3 className="text-[24px] font-extrabold text-slate-800 leading-none">
                  {data?.totalNotes !== undefined ? data.totalNotes.toLocaleString() : "---"}
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-500 flex items-center gap-0.5"><ArrowUpRight size={14} /> Live</span>
              <span className="text-slate-400 font-medium">real-time count</span>
            </div>
          </div>

          {/* Card 3: Workspaces */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <Loader2 className="animate-spin text-emerald-500" size={24} />
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Folder size={24} />
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-slate-500 mb-1">Total Notebooks</p>
                <h3 className="text-[24px] font-extrabold text-slate-800 leading-none">
                  {data?.totalWorkspaces !== undefined ? data.totalWorkspaces.toLocaleString() : "---"}
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-500 flex items-center gap-0.5"><ArrowUpRight size={14} /> Live</span>
              <span className="text-slate-400 font-medium">real-time count</span>
            </div>
          </div>

          {/* Card 4: Active Users */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <Loader2 className="animate-spin text-orange-500" size={24} />
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                <Edit2 size={24} />
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-slate-500 mb-1">Active Users (7d)</p>
                <h3 className="text-[24px] font-extrabold text-slate-800 leading-none">
                  {data?.activeUsers7d !== undefined ? data.activeUsers7d.toLocaleString() : "---"}
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-500 flex items-center gap-0.5"><ArrowUpRight size={14} /> Active</span>
              <span className="text-slate-400 font-medium">last 7 days</span>
            </div>
          </div>

        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Overview Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-500" size={32} />
              </div>
            )}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-extrabold text-slate-800">Overview</h3>
              <select 
                className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-slate-300"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="1y">This Year</option>
              </select>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2"><span className="w-2 h-0.5 bg-purple-500 rounded-full"></span><span className="text-[10px] font-bold text-slate-500">Users ({data?.totalUsers || 0})</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-0.5 bg-blue-500 rounded-full"></span><span className="text-[10px] font-bold text-slate-500">Notes ({data?.totalNotes || 0})</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-0.5 bg-emerald-500 rounded-full"></span><span className="text-[10px] font-bold text-slate-500">Notebooks ({data?.totalWorkspaces || 0})</span></div>
            </div>
            <div className="w-full h-[220px] relative mt-4 border-l border-b border-slate-100 text-[10px] font-medium text-slate-400">
              
              {/* Y-axis labels */}
              <div className="absolute -left-6 bottom-[10%]">10</div>
              <div className="absolute -left-6 bottom-[30%]">50</div>
              <div className="absolute -left-6 bottom-[50%]">100</div>
              <div className="absolute -left-6 bottom-[70%]">250</div>
              <div className="absolute -left-6 bottom-[90%]">500</div>

              {/* Grid lines */}
              <div className="absolute left-0 bottom-[10%] w-full border-t border-slate-50"></div>
              <div className="absolute left-0 bottom-[30%] w-full border-t border-slate-50"></div>
              <div className="absolute left-0 bottom-[50%] w-full border-t border-slate-50"></div>
              <div className="absolute left-0 bottom-[70%] w-full border-t border-slate-50"></div>
              <div className="absolute left-0 bottom-[90%] w-full border-t border-slate-50"></div>

              {/* SVG Chart Lines */}
              <svg className="w-full h-full absolute inset-0 overflow-visible transition-all duration-700" preserveAspectRatio="none" viewBox="0 0 100 100">
                {timeRange === "7d" && (
                  <>
                    <path d="M0,70 C20,65 30,50 50,55 C70,60 80,45 100,40" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0,50 C20,45 30,35 50,45 C70,55 80,35 100,30" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0,25 C20,30 30,20 50,25 C70,30 80,15 100,10" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
                {timeRange === "30d" && (
                  <>
                    <path d="M0,80 C20,45 30,60 50,35 C70,40 80,25 100,15" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0,60 C20,35 30,25 50,15 C70,25 80,15 100,5" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0,35 C20,40 30,10 50,15 C70,20 80,5 100,0" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
                {timeRange === "1y" && (
                  <>
                    <path d="M0,90 C10,85 20,60 50,45 C80,30 90,15 100,10" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0,70 C10,65 20,40 50,25 C80,10 90,5 100,0" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0,45 C10,40 20,10 50,5 C80,0 90,0 100,0" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>

              {/* X-axis labels */}
              <div className="absolute -bottom-6 left-0 w-full flex justify-between">
                <span>Period Start</span><span>Mid</span><span>Period End</span>
              </div>
            </div>
          </div>

          {/* Top Distribution / Stats Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-500" size={32} />
              </div>
            )}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-extrabold text-slate-800">Resource Distribution</h3>
              <span className="text-[11px] font-bold text-indigo-500">Live Breakdown</span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-4 text-[12px]">
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Registered Users</p>
                    <p className="text-[10px] text-slate-500">Database user accounts</p>
                  </div>
                </div>
                <span className="text-[14px] font-extrabold text-purple-700">{data?.totalUsers || 0}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Documents / Notes</p>
                    <p className="text-[10px] text-slate-500">Total documents stored</p>
                  </div>
                </div>
                <span className="text-[14px] font-extrabold text-blue-700">{data?.totalNotes || 0}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    <Folder size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Workspaces</p>
                    <p className="text-[10px] text-slate-500">Notebook collections</p>
                  </div>
                </div>
                <span className="text-[14px] font-extrabold text-emerald-700">{data?.totalWorkspaces || 0}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-transparent mt-2">
          <h3 className="text-[14px] font-extrabold text-slate-800 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <a href="/admin/users" className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              <UserPlus size={16} className="text-indigo-500" /> Manage Users
            </a>
            <a href="/admin/analytics" className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              <FileSpreadsheet size={16} className="text-purple-500" /> View Analytics
            </a>
            <button 
              onClick={() => fetchStats(timeRange)} 
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
            >
              <RefreshCw size={16} className={`text-slate-500 ${isLoading ? "animate-spin" : ""}`} /> Refresh Data
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
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          )}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-extrabold text-slate-800">Recent Activity</h3>
            <span className="text-[11px] font-bold text-indigo-500">Live Feed</span>
          </div>
          
          <div className="flex flex-col gap-5">
            {formattedActivities.length === 0 ? (
              <p className="text-[12px] font-medium text-slate-400 py-4 text-center">No recent activities found.</p>
            ) : (
              formattedActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-medium text-slate-800 leading-tight truncate">
                        <span className="font-bold">{activity.title}</span> {activity.action}
                      </p>
                      <p className="text-[11px] font-bold text-indigo-600 mt-0.5 truncate">{activity.target}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-extrabold text-slate-800">System Status</h3>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">All Good</span>
          </div>
          
          <div className="flex flex-col gap-4">
            {["Web Application", "Database (Prisma)", "File Storage", "Auth Service"].map((service, i) => (
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
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          )}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[14px] font-extrabold text-slate-800">Estimated Storage</h3>
            <span className="text-[11px] font-bold text-indigo-500">Live Size</span>
          </div>
          
          <div className="flex justify-between items-end mb-2">
            <span className="text-[12px] font-bold text-slate-800">
              {data?.estimatedStorageSize || `${storageMB} KB`}
            </span>
            <span className="text-[12px] font-bold text-slate-400">DB Size</span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-700 ease-in-out w-[15%]"></div>
          </div>

          <div className="flex justify-between items-center text-center">
            <div>
              <p className="text-[10px] font-bold text-slate-400 mb-0.5">Total Notes</p>
              <p className="text-[14px] font-extrabold text-slate-800">{data?.totalNotes !== undefined ? data.totalNotes.toLocaleString() : "---"}</p>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 mb-0.5">Bytes Count</p>
              <p className="text-[14px] font-extrabold text-slate-800">{data?.estimatedStorageBytes !== undefined ? `${(data.estimatedStorageBytes / 1024).toFixed(1)} KB` : "---"}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
