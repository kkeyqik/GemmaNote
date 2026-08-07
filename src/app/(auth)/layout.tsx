"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BookOpen } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const leftPanel = useRef<HTMLDivElement>(null);
  const rightPanel = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(leftPanel.current, {
      x: "-100%",
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
    .from(rightPanel.current, {
      x: "100%",
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.8");
    
    gsap.from(".left-panel-content", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.3
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen flex w-full bg-slate-50 overflow-hidden">
      {/* Left Panel - Branding */}
      <div 
        ref={leftPanel}
        className="hidden lg:flex w-1/2 bg-indigo-600 p-12 flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-indigo-900/20 z-0"></div>
        {/* Abstract background shapes */}
        <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 animate-pulse" style={{ animationDuration: '10s' }}></div>

        <div className="relative z-10 left-panel-content flex items-center gap-3">
          <div className="bg-white p-2.5 rounded-xl shadow-lg">
            <BookOpen className="w-8 h-8 text-indigo-600" />
          </div>
          <span className="text-white text-3xl font-bold tracking-tight">Gemma Note</span>
        </div>

        <div className="relative z-10 mb-20 max-w-lg">
          <h1 className="left-panel-content text-5xl font-extrabold text-white mb-6 leading-tight">
            Capture your thoughts, <br/>
            organize your life.
          </h1>
          <p className="left-panel-content text-indigo-100 text-lg leading-relaxed">
            The premium note-taking experience designed for clarity, speed, and beautiful typography. 
            Join thousands of users who have elevated their productivity.
          </p>
        </div>
        
        <div className="relative z-10 left-panel-content text-indigo-200 text-sm font-medium">
          &copy; {new Date().getFullYear()} Gemma Note Inc. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Auth */}
      <div 
        ref={rightPanel}
        className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative bg-slate-50/50 backdrop-blur-sm"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 lg:hidden"></div>
        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-900 text-2xl font-bold tracking-tight">Gemma Note</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
