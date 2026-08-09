import React from "react";
import "../tailwind.css";

export const metadata = {
  title: "Login - GemmaNote",
  description: "Sign in to your GemmaNote account",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-indigo-500/30 min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
