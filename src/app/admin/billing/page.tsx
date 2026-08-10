"use client";

import React from "react";
import {
  Receipt,
  CreditCard,
  TrendingUp,
  RefreshCw,
  Zap,
  Clock,
  Sparkles,
  ShieldCheck,
  FileText
} from "lucide-react";

export default function AdminBillingPage() {
  const plannedFeatures = [
    {
      title: "Invoice History",
      description: "Automated PDF invoice generation, payment receipts, and searchable customer billing logs.",
      icon: FileText,
      color: "text-blue-500 bg-blue-50 border-blue-100",
    },
    {
      title: "Revenue Analytics",
      description: "Track Monthly Recurring Revenue (MRR), subscriber growth metrics, ARPU, and churn rates.",
      icon: TrendingUp,
      color: "text-emerald-500 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Refund Management",
      description: "Process full or partial refund requests with complete audit logs and status tracking.",
      icon: RefreshCw,
      color: "text-amber-500 bg-amber-50 border-amber-100",
    },
    {
      title: "Subscription Upgrades",
      description: "Manage tier migrations, custom enterprise pricing plans, and seat allocation rules.",
      icon: Zap,
      color: "text-purple-500 bg-purple-50 border-purple-100",
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Receipt className="text-indigo-500" size={24} />
            Billing & Invoices
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Billing management will be available once Stripe integration is complete.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-[12px] font-bold">
            <Clock size={13} /> Stripe Integration Pending
          </span>
        </div>
      </div>

      {/* Main Empty State Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-8 md:p-12 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 w-64 h-64 bg-purple-50/50 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-5 shadow-inner">
            <CreditCard size={32} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles size={12} /> Module In Development
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Stripe Billing Module Coming Soon
          </h2>
          <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
            We are actively integrating Stripe Payment Gateways and Webhooks to handle billing, subscription management, auto-renewals, and automated invoice delivery.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[12px] font-semibold text-slate-600">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
              <ShieldCheck size={14} className="text-emerald-500" /> PCI-DSS Compliant
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
              <Receipt size={14} className="text-indigo-500" /> Automated Invoicing
            </span>
          </div>
        </div>
      </div>

      {/* Planned Features Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Planned Billing Capabilities</h2>
        <p className="text-[13px] text-slate-500">
          Features that will become active upon Stripe launch:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plannedFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-4 hover:border-slate-300 transition-all"
            >
              <div className={`p-3 rounded-xl border ${feature.color} shrink-0`}>
                <Icon size={20} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-slate-800 mb-1">{feature.title}</h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
