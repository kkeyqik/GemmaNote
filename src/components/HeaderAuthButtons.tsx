"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

export function HeaderAuthButtons() {
  const { isSignedIn, isLoaded } = useAuth();

  if (isLoaded && isSignedIn) {
    return (
      <Link
        href="/dashboard"
        className="h-10 px-6 flex items-center justify-center text-sm font-bold rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 gap-2"
      >
        Go to Dashboard <ArrowRight size={16} />
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="hidden sm:flex items-center justify-center h-10 px-6 text-sm font-bold rounded-xl bg-white text-slate-700 hover:text-slate-900 shadow-sm border border-slate-100 transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/login"
        className="h-10 px-6 flex items-center justify-center text-sm font-bold rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
      >
        Get Started Free
      </Link>
    </>
  );
}
