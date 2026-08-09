import React from "react";
import Link from "next/link";
import { PenSquare } from "lucide-react";

interface LogoProps {
  href?: string;
  subtitle?: string;
  className?: string;
  iconSize?: number;
  textSize?: string;
  onClick?: () => void;
}

export function Logo({
  href = "/",
  subtitle,
  className = "",
  iconSize = 20,
  textSize = "text-[22px]",
  onClick,
}: LogoProps) {
  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/25 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
        <PenSquare size={iconSize} fill="currentColor" className="text-white/20" />
      </div>
      <div className="flex flex-col">
        <span className={`font-extrabold ${textSize} text-slate-900 tracking-tight leading-none`}>
          Gemma<span className="text-indigo-600">Note</span>
        </span>
        {subtitle && (
          <span className="text-[10px] font-bold text-indigo-500 mt-1 uppercase tracking-wider">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer group">
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className="group transition-opacity hover:opacity-95">
      {content}
    </Link>
  );
}

