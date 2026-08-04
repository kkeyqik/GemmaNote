"use client";

import Link from "next/link";
import { ArrowRight, Zap, CheckCircle2, LayoutGrid, FileText } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    // Hero Animation
    gsap.fromTo(
      ".hero-elem",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );

    // Features Scroll Animation
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, 
        duration: 0.6, 
        stagger: 0.15, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white"></div>
        <div className="container mx-auto text-center max-w-4xl">
          <div className="hero-elem inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8 border border-indigo-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            NotePad AI v2.0 is Live
          </div>
          <h1 className="hero-elem text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            Write <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">10x Faster</span> with AI-Powered Intelligence.
          </h1>
          <p className="hero-elem text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            The minimal, distraction-free text editor that understands your intent. Generate high-ranking blogs, humanize content, and organize everything in one place.
          </p>
          <div className="hero-elem flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/editor" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30">
              Start Writing for Free <ArrowRight size={18} />
            </Link>
            <Link href="#features" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-full font-semibold border border-slate-200 hover:bg-slate-50 transition-all">
              View Features
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-24 bg-white px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to scale content</h2>
            <p className="text-slate-600">Built for bloggers, agencies, and marketers who want premium quality without the premium time cost.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Instant Generation", desc: "Generate up to 10 SEO-optimized blog posts simultaneously directly from your browser extension." },
              { icon: LayoutGrid, title: "Intelligent Organization", desc: "Sort by favorites, search by intent, and manage your trash with automatic retention rules." },
              { icon: FileText, title: "Humanized Output", desc: "Bypass AI detectors with our proprietary humanization prompts that ensure natural tone and flow." }
            ].map((feature, i) => (
              <div key={i} className="feature-card p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-600">Start for free, upgrade when you need more power.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Free</h3>
              <p className="text-slate-500 text-sm mb-6">Perfect for trying out NotePad AI.</p>
              <div className="mb-6"><span className="text-4xl font-bold">$0</span><span className="text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Local browser storage", "Basic text editing", "Markdown export", "Standard generation"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm"><CheckCircle2 size={18} className="text-indigo-500 shrink-0" /> {f}</li>
                ))}
              </ul>
              <Link href="/sign-up" className="w-full block text-center py-3 rounded-xl border-2 border-indigo-100 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors">Get Started</Link>
            </div>
            
            {/* Pro */}
            <div className="p-8 rounded-3xl bg-indigo-900 text-white shadow-2xl relative transform md:-translate-y-4 flex flex-col border border-indigo-700">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-indigo-200 text-sm mb-6">For serious bloggers and creators.</p>
              <div className="mb-6"><span className="text-4xl font-bold">$12</span><span className="text-indigo-300">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Cloud Sync across devices", "Advanced SEO Analyzer", "Intent & Style Selection", "Priority Support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-indigo-100 text-sm"><CheckCircle2 size={18} className="text-purple-400 shrink-0" /> {f}</li>
                ))}
              </ul>
              <Link href="/sign-up" className="w-full block text-center py-3 rounded-xl bg-white text-indigo-900 font-semibold hover:bg-indigo-50 transition-colors">Upgrade to Pro</Link>
            </div>

            {/* Agency */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Agency</h3>
              <p className="text-slate-500 text-sm mb-6">For teams generating content at scale.</p>
              <div className="mb-6"><span className="text-4xl font-bold">$49</span><span className="text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Everything in Pro", "Unlimited Generations", "Custom Team Workspaces", "API Access", "Custom Voice Presets"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm"><CheckCircle2 size={18} className="text-indigo-500 shrink-0" /> {f}</li>
                ))}
              </ul>
              <Link href="/sign-up" className="w-full block text-center py-3 rounded-xl border-2 border-indigo-100 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
