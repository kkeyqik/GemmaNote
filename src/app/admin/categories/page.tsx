"use client";

import React from "react";
import { 
  Grid, 
  Sparkles, 
  FolderTree, 
  Layers, 
  Clock, 
  Construction
} from "lucide-react";

export default function AdminCategoriesPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Grid size={22} />
            </div>
            Categories
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Category management is a planned feature. Categories will allow organizing notes into structured taxonomies.
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
              <Grid size={38} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center border border-amber-200 shadow-xs">
              <Construction size={18} />
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-2">Category Management Coming Soon</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            We are building a powerful category system to help you structure, organize, and navigate your platform notes with ease.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
            <Clock size={15} className="text-indigo-500" />
            <span>Under Active Design & Development</span>
          </div>
        </div>
      </div>

      {/* Planned Features Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-500" />
            Planned Category Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:border-indigo-200 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
              <Sparkles size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Auto-categorization with AI</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Intelligent context analysis that automatically assigns incoming notes to relevant categories based on content and semantics.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:border-indigo-200 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
              <FolderTree size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Custom category hierarchies</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nested category trees and parent-child relationships for deep organization across workspaces and team domains.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:border-indigo-200 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
              <Layers size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Bulk category assignment</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Batch actions to quickly categorize, reassign, or reorganize large collections of documents in a single click.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
