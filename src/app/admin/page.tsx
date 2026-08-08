"use client";

import { 
  Users, BookOpen, Notebook, Activity, 
  ArrowUp, ArrowDown, UserPlus, FolderPlus, 
  Settings, Trash2, Calendar, FileText,
  BarChart3, CheckCircle2, Server, Database,
  MoreVertical, Clock
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from "recharts";

const lineData = [
  { name: 'Mon', Users: 4000, Notes: 2400, Notebooks: 1400 },
  { name: 'Tue', Users: 3000, Notes: 1398, Notebooks: 2210 },
  { name: 'Wed', Users: 2000, Notes: 9800, Notebooks: 2290 },
  { name: 'Thu', Users: 2780, Notes: 3908, Notebooks: 2000 },
  { name: 'Fri', Users: 1890, Notes: 4800, Notebooks: 2181 },
  { name: 'Sat', Users: 2390, Notes: 3800, Notebooks: 2500 },
  { name: 'Sun', Users: 3490, Notes: 4300, Notebooks: 2100 },
];

const pieData = [
  { name: 'Personal', value: 450 },
  { name: 'Work', value: 300 },
  { name: 'Ideas', value: 200 },
  { name: 'Study', value: 150 },
  { name: 'Others', value: 80 },
];
const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const barData = [
  { name: '1', growth: 12 }, { name: '2', growth: 19 }, { name: '3', growth: 3 },
  { name: '4', growth: 5 }, { name: '5', growth: 2 }, { name: '6', growth: 23 },
  { name: '7', growth: 15 }, { name: '8', growth: 9 }, { name: '9', growth: 11 },
  { name: '10', growth: 18 }, { name: '11', growth: 7 }, { name: '12', growth: 14 },
  { name: '13', growth: 16 }, { name: '14', growth: 20 }, { name: '15', growth: 10 },
];

// 7 rows x 20 cols = 140 squares
const heatmapData = Array.from({ length: 140 }).map((_, i) => {
  const val = Math.random();
  if (val > 0.9) return 4;
  if (val > 0.7) return 3;
  if (val > 0.4) return 2;
  if (val > 0.2) return 1;
  return 0;
});
const getHeatmapColor = (value: number) => {
  switch(value) {
    case 1: return 'bg-purple-200';
    case 2: return 'bg-purple-300';
    case 3: return 'bg-purple-500';
    case 4: return 'bg-purple-700';
    default: return 'bg-slate-100';
  }
}

const recentActivity = [
  { id: 1, user: "Alex M.", action: "created a new notebook", time: "10 mins ago", icon: <FolderPlus className="w-4 h-4 text-blue-500" /> },
  { id: 2, user: "Sarah K.", action: "upgraded to Pro plan", time: "25 mins ago", icon: <ArrowUp className="w-4 h-4 text-green-500" /> },
  { id: 3, user: "System", action: "automated backup completed", time: "1 hour ago", icon: <Server className="w-4 h-4 text-slate-500" /> },
  { id: 4, user: "John D.", action: "deleted 50 notes", time: "3 hours ago", icon: <Trash2 className="w-4 h-4 text-red-500" /> },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Monitor system performance and user metrics.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Calendar className="w-4 h-4 text-slate-500" />
          May 27 - Jun 03, 2025
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Main Content Area */}
        <div className="xl:col-span-9 space-y-6">
          
          {/* Row 1: KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1 duration-300">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold">
                  <ArrowUp className="w-3 h-3" />
                  <span>12.6%</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900">24,592</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Total Users</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1 duration-300">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold">
                  <ArrowUp className="w-3 h-3" />
                  <span>8.2%</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900">142,384</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Total Notes</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1 duration-300">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Notebook className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-semibold">
                  <ArrowDown className="w-3 h-3" />
                  <span>2.1%</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900">18,290</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Total Notebooks</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1 duration-300">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold">
                  <ArrowUp className="w-3 h-3" />
                  <span>15.4%</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900">8,432</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Active Users</p>
              </div>
            </div>
          </div>

          {/* Row 2: Charts (Line + Donut) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Overview</h3>
                  <p className="text-sm text-slate-500">Users, Notes, and Notebooks over time</p>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="Users" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="Notes" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="Notebooks" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900">Top Notebooks</h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 min-h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#1e293b' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Custom Legend */}
              <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-2">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-xs font-medium text-slate-600 truncate">{entry.name}</span>
                    <span className="text-xs text-slate-400 ml-auto">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: More Charts (Bar + Heatmap) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">User Growth</h3>
                  <p className="text-sm text-slate-500">Daily new signups</p>
                </div>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={5} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="growth" fill="#d8b4fe" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Note Activity</h3>
                  <p className="text-sm text-slate-500">Contributions over the last 140 days</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
                  <div className="grid grid-rows-7 grid-flow-col gap-1 mx-auto">
                    {heatmapData.map((val, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-[2px] sm:rounded-sm ${getHeatmapColor(val)} hover:ring-2 hover:ring-slate-300 transition-all cursor-pointer`}
                        title={`Activity level: ${val}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4 text-xs text-slate-500">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-[2px] bg-slate-100"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-purple-200"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-purple-300"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-purple-500"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-purple-700"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Quick Actions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-slate-700 text-center">Add New User</span>
              </button>
              
              <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-slate-700 text-center">Create Notebook</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-slate-700 text-center">Manage Categories</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-slate-700 text-center">View Reports</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-slate-700 text-center">System Settings</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trash2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-slate-700 text-center">Clear Trash</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Storage Usage Widget */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Storage Usage</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">Database</span>
                  <span className="text-slate-500">64%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '64%' }}></div>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 text-right">32 GB / 50 GB</p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">Media Assets</span>
                  <span className="text-slate-500">82%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 text-right">410 GB / 500 GB</p>
              </div>
            </div>
          </div>

          {/* System Status Widget */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Server className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Main API</span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Database</span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Workers</span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              View Detailed Logs
            </button>
          </div>

          {/* Recent Activity Widget */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="relative pl-6">
                  <span className="absolute -left-[11px] bg-white p-1 rounded-full border border-slate-100">
                    {activity.icon}
                  </span>
                  <div className="flex flex-col">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">{activity.user}</span> {activity.action}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl transition-colors border border-slate-200">
              View All Activity
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
