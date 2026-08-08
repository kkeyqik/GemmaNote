"use client";

import { useRef } from "react";
import Link from "next/link";
import { PenSquare, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".nav-anim", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    })
    .from(".hero-text", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.2")
    .from(".feature-card", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4");
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-[#09090b] text-[#fafafa] overflow-x-hidden selection:bg-pink-500/30">
      
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md border-b border-white/10 bg-[#09090b]/50">
        <div className="nav-anim flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-gradient-to-tr from-pink-500 to-violet-500 p-1.5 rounded-lg text-white">
            <PenSquare size={20} />
          </div>
          GemmaNote
        </div>
        <div className="nav-anim">
          <Link href="/dashboard" className="px-5 py-2.5 text-sm font-medium rounded-full bg-white text-black hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2">
            Open App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-16 px-6 md:pt-48 md:pb-24 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="hero-text inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-pink-400 mb-8">
          <Sparkles size={16} /> AI-Powered Note Taking
        </div>
        
        <h1 className="hero-text text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-[1.1]">
          Write faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Intelligent Workspaces</span>
        </h1>
        
        <p className="hero-text text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          GemmaNote connects your thoughts with AI directly from your browser. Save content instantly, generate articles, and organize your ideas seamlessly.
        </p>

        <div className="hero-text flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard" className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 text-white font-medium hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(236,72,153,0.5)]">
            Start Writing Free <ArrowRight size={18} />
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="feature-card p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Generation</h3>
            <p className="text-gray-400 leading-relaxed">Instantly transform short notes into full-length articles, blogs, or summaries with built-in AI assistance.</p>
          </div>

          <div className="feature-card p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <PenSquare size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Rich Text Editor</h3>
            <p className="text-gray-400 leading-relaxed">A beautifully minimal, block-based editor designed for maximum focus and zero distractions.</p>
          </div>

          <div className="feature-card p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Browser Extension</h3>
            <p className="text-gray-400 leading-relaxed">Clip content directly from any website with our companion Chrome extension, instantly saved to your workspace.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <PenSquare size={16} /> GemmaNote &copy; {new Date().getFullYear()}
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
