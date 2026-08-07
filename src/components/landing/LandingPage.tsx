"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles, Zap, Shield, FileText, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Hero Animations
    tl.fromTo(".hero-badge", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
      .fromTo(".hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.2")
      .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.3")
      .fromTo(".hero-image", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.2");
      
    // Feature Animations with ScrollTrigger
    gsap.fromTo(".feature-card", 
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Bot size={20} />
            </div>
            Gemma Note
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Log in
            </Link>
            <Link href="/sign-up" className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-slate-50 -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            <Sparkles size={14} />
            <span>Meet your new AI-powered workspace</span>
          </div>
          
          <h1 className="hero-title text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Write better notes,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              think at the speed of AI.
            </span>
          </h1>
          
          <p className="hero-subtitle text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Gemma Note is the modern, intelligent workspace that helps you capture ideas, generate content, and organize your thoughts without breaking a sweat.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/sign-up" className="hero-cta w-full sm:w-auto px-8 py-3.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              Start writing for free
              <ArrowRight size={18} />
            </Link>
            <Link href="#features" className="hero-cta w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-700 font-medium border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Explore features
            </Link>
          </div>
          
          {/* Mockup Image */}
          <div className="hero-image relative mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl p-2 md:p-4 transform-gpu overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none z-10" />
            <div className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden aspect-[16/10] flex flex-col">
              {/* Mockup Header */}
              <div className="h-12 border-b border-slate-200 bg-white flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="mx-auto bg-slate-100 px-12 md:px-24 py-1.5 rounded-md text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <FileText size={12} />
                  Product_Strategy.md
                </div>
              </div>
              {/* Mockup Body */}
              <div className="flex-1 p-6 text-left flex gap-6 overflow-hidden">
                <div className="w-48 hidden md:flex flex-col gap-3">
                  <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-slate-200 rounded animate-pulse opacity-70" />
                  <div className="h-4 w-20 bg-slate-200 rounded animate-pulse opacity-50" />
                </div>
                <div className="flex-1 flex flex-col gap-5">
                  <div className="h-8 w-3/4 bg-slate-200 rounded-lg" />
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-slate-200 rounded" />
                    <div className="h-4 w-full bg-slate-200 rounded" />
                    <div className="h-4 w-5/6 bg-slate-200 rounded" />
                  </div>
                  <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-100 flex gap-4 mt-2">
                    <Sparkles className="text-indigo-500 shrink-0 mt-0.5" size={20} />
                    <div className="space-y-3 flex-1">
                      <div className="h-4 w-full bg-indigo-200/80 rounded" />
                      <div className="h-4 w-4/5 bg-indigo-200/80 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to create faster</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Gemma Note combines the simplicity of markdown with the power of generative AI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Bot size={24} className="text-indigo-600" />}
              title="AI Co-pilot"
              description="Stuck on a blank page? Let our AI write drafts, summarize long texts, or brainstorm ideas with you."
            />
            <FeatureCard 
              icon={<Zap size={24} className="text-blue-500" />}
              title="Lightning Fast"
              description="Built for speed. Navigate, edit, and organize your workspace instantly with keyboard shortcuts."
            />
            <FeatureCard 
              icon={<Shield size={24} className="text-emerald-500" />}
              title="Secure & Private"
              description="Your data is encrypted and securely stored. We never use your private notes to train our models."
            />
          </div>
        </div>
      </section>
      
      {/* Testimonial / Social Proof */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 mb-8 leading-relaxed">
            "Gemma Note completely changed how I manage my projects and write content. The AI feels like a natural extension of my thought process."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold">
              S
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-900">Sarah Jenkins</div>
              <div className="text-sm text-slate-500">Product Manager</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 text-white p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500 blur-3xl opacity-30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500 blur-3xl opacity-30 pointer-events-none" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to transform your workflow?</h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg relative z-10">
            Join thousands of professionals who are writing faster and thinking clearer with Gemma Note.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link href="/sign-up" className="px-8 py-3.5 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition-all shadow-lg flex items-center justify-center gap-2">
              Get Started for Free
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-400 relative z-10">
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-400" /> No credit card required</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-400" /> Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <Bot size={14} />
            </div>
            Gemma Note
          </div>
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Gemma Note. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="feature-card p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all group">
      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
