"use client";

import React from "react";
import { 
  Receipt, CreditCard, Download, Plus, 
  CheckCircle2, AlertCircle
} from "lucide-react";

// Dummy billing history
const MOCK_INVOICES = [
  { id: "INV-2023-010", date: "Oct 12, 2023", amount: "$49.00", status: "Paid", pdf: "#" },
  { id: "INV-2023-009", date: "Sep 12, 2023", amount: "$49.00", status: "Paid", pdf: "#" },
  { id: "INV-2023-008", date: "Aug 12, 2023", amount: "$49.00", status: "Paid", pdf: "#" },
  { id: "INV-2023-007", date: "Jul 12, 2023", amount: "$49.00", status: "Paid", pdf: "#" },
];

export default function AdminBillingPage() {
  return (
    <div className="w-full max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Receipt className="text-indigo-500" size={24} />
            Billing & Invoices
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1">Manage payment methods and download past invoices.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Payment Methods */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col">
            <h2 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4 flex items-center justify-between">
              Payment Method
              <button className="text-indigo-600 hover:text-indigo-700 transition-colors">
                <Plus size={16} />
              </button>
            </h2>
            
            <div className="border border-indigo-200 bg-indigo-50/50 p-4 rounded-xl flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-100 px-2 py-0.5 rounded">Edit</button>
              </div>
              <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white text-[10px] font-black italic">VISA</span>
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800 flex items-center gap-2">
                  •••• •••• •••• 4242
                </p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Expires 12/25</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <h3 className="text-[12px] font-bold text-slate-700 mb-2">Billing Address</h3>
              <p className="text-[12px] text-slate-500 leading-relaxed">
                Gemma Note Inc.<br/>
                123 Start Up Way, Suite 100<br/>
                San Francisco, CA 94107
              </p>
              <button className="mt-2 text-[12px] font-bold text-indigo-600">Update Address</button>
            </div>
          </div>
        </div>

        {/* Invoice History */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-[15px] font-bold text-slate-800">Billing History</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_INVOICES.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">{inv.date}</td>
                    <td className="px-6 py-4 text-[12px] font-bold text-slate-800 font-mono">{inv.id}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-slate-800">{inv.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                        <CheckCircle2 size={12} /> {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-indigo-50 rounded-lg">
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
