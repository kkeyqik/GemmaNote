import React from 'react';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';

interface LogoProps {
  subtitle?: string;
  className?: string;
}

export function Logo({ subtitle, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 transform -rotate-2">
        <PenSquare size={20} fill="currentColor" className="text-white/20" />
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-[22px] text-slate-800 tracking-tight leading-none mt-1">GemmaNote</span>
        {subtitle && (
          <span className="text-[10px] font-bold text-indigo-500 mt-1 uppercase tracking-wider">{subtitle}</span>
        )}
      </div>
    </Link>
  );
}
