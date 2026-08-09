"use client";

import React, { useState } from "react";
import { 
  Settings, Save, Globe, Shield, Bell, Database, 
  ToggleRight, ToggleLeft
} from "lucide-react";

export default function AdminSettingsPage() {
  const [allowSignups, setAllowSignups] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [force2FA, setForce2FA] = useState(false);

  return (
    <div className="w-full max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Settings className="text-indigo-500" size={24} />
            Global Settings
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Configure platform-wide preferences and security policies.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-6 rounded-xl bg-indigo-600 text-white font-bold text-[13px] hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-500/20">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Navigation Sidebar (Visual only for now) */}
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200/60 shadow-sm text-indigo-600 rounded-xl font-bold text-[13px] transition-colors">
            <Globe size={18} /> General
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white rounded-xl font-medium text-[13px] transition-colors">
            <Shield size={18} /> Security
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white rounded-xl font-medium text-[13px] transition-colors">
            <Database size={18} /> Limits & Quotas
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white rounded-xl font-medium text-[13px] transition-colors">
            <Bell size={18} /> Notifications
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* General Settings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-4">Platform Identity</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-700">Platform Name</label>
              <input type="text" defaultValue="Gemma Note" className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-700">Support Email Address</label>
              <input type="email" defaultValue="support@gemmanote.com" className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              <p className="text-[11px] text-slate-500">This email will be used as the "Reply-To" for all automated system emails.</p>
            </div>
          </div>

          {/* Access Control */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-4">Access Control</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-bold text-slate-700">Allow New Signups</h3>
                <p className="text-[12px] text-slate-500 mt-1">If disabled, new users can only be invited by admins.</p>
              </div>
              <button 
                onClick={() => setAllowSignups(!allowSignups)}
                className={`transition-colors ${allowSignups ? 'text-emerald-500' : 'text-slate-300'}`}
              >
                {allowSignups ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div>
                <h3 className="text-[14px] font-bold text-slate-700">Force Two-Factor Authentication</h3>
                <p className="text-[12px] text-slate-500 mt-1">Require all admins and editors to set up 2FA.</p>
              </div>
              <button 
                onClick={() => setForce2FA(!force2FA)}
                className={`transition-colors ${force2FA ? 'text-emerald-500' : 'text-slate-300'}`}
              >
                {force2FA ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div>
                <h3 className="text-[14px] font-bold text-slate-700">Maintenance Mode</h3>
                <p className="text-[12px] text-slate-500 mt-1">Show a "Under Construction" page to all non-admin users.</p>
              </div>
              <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`transition-colors ${maintenanceMode ? 'text-rose-500' : 'text-slate-300'}`}
              >
                {maintenanceMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
              </button>
            </div>
          </div>

          {/* Limits */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-4">Global Limits</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-700">Maximum Upload Size (MB)</label>
              <input type="number" defaultValue="25" className="h-10 px-3 w-32 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              <p className="text-[11px] text-slate-500">Maximum file size per attachment upload.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
