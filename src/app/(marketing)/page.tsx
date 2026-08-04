"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, LayoutGrid, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Zap, title: "Generate in your flow", desc: "Bring browser-assisted drafts straight into your writing space, without breaking focus." },
  { icon: LayoutGrid, title: "A calmer content library", desc: "Keep favorites, archives, search, and drafts in one deliberately simple workspace." },
  { icon: FileText, title: "Edit with a clear signal", desc: "Use word count, reading time, keywords, and an SEO check beside the writing itself." },
];

const plans = [
  { name: "Free", price: "$0", description: "For a focused local-first writing practice.", features: ["Local browser storage", "Focused rich-text editor", "Markdown export", "10 imports each month"], action: "Start free", href: "/editor", featured: false },
  { name: "Pro", price: "$12", description: "For writers working across more than one device.", features: ["Cloud sync across devices", "200 imports each month", "Priority support", "Everything in Free"], action: "Choose Pro", href: "/sign-up", featured: true },
  { name: "Agency", price: "$49", description: "For teams with repeatable client workflows.", features: ["Unlimited imports", "Shared workspaces", "Custom voice presets", "Everything in Pro"], action: "Choose Agency", href: "/sign-up", featured: false },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        ".hero-elem",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
      
      // Features Animation
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.15, 
          ease: "power2.out", 
          scrollTrigger: { trigger: featuresRef.current, start: "top 75%" } 
        }
      );
      
      // Pricing Animation
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.15, 
          ease: "power2.out", 
          scrollTrigger: { trigger: pricingRef.current, start: "top 75%" } 
        }
      );
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative px-6 pb-24 pt-24 sm:pb-32 sm:pt-32 lg:px-8">
        {/* Premium Mesh Gradient Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[600px] bg-purple-400/20 rounded-full blur-[120px] opacity-50 mix-blend-multiply translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute top-0 left-0 -z-10 w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-[100px] opacity-50 mix-blend-multiply -translate-x-1/3 -translate-y-1/4"></div>
        
        <div className="mx-auto max-w-5xl text-center">
          <div className="hero-elem mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-white/60 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-md">
            <Sparkles size={16} aria-hidden="true" className="text-indigo-500" /> A quieter way to make progress
          </div>
          
          <h1 className="hero-elem mx-auto max-w-4xl font-[Outfit] text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            A focused home for every <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">good draft.</span>
          </h1>
          
          <p className="hero-elem mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            GemmaNote combines browser-assisted writing, a distraction-free editor, and a tidy content library so your ideas can move from first line to finished work.
          </p>
          
          <div className="hero-elem mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/editor" className="group inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-3 text-base font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1 hover:bg-indigo-600 hover:shadow-indigo-500/25 sm:w-auto">
              Open your workspace 
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href="#features" className="inline-flex min-h-[56px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-3 text-base font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 sm:w-auto">
              Explore the workflow
            </Link>
          </div>
          
          {/* Stats / Mini Features */}
          <div className="hero-elem mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-px divide-y divide-slate-200/50 overflow-hidden rounded-3xl border border-slate-200/50 bg-white/40 shadow-xl shadow-slate-200/20 backdrop-blur-xl sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { label: 'Local-first', detail: 'Your drafts stay yours', Icon: ShieldCheck }, 
              { label: 'Cloud when ready', detail: 'Sync on Pro and Agency', Icon: Zap }, 
              { label: 'Made for momentum', detail: 'Less UI, more writing', Icon: LayoutGrid }
            ].map(({ label, detail, Icon }) => (
              <div key={label} className="flex flex-col items-center px-6 py-8 text-center transition-colors hover:bg-white/60">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100/50 text-indigo-600">
                  <Icon size={24} />
                </div>
                <p className="text-base font-bold text-slate-900">{label}</p>
                <p className="mt-2 text-sm font-medium text-slate-500">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="relative z-10 border-t border-slate-200/50 bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Built for the writing day</p>
            <h2 className="mt-4 font-[Outfit] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              A workspace that stays out of your way.
            </h2>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card group relative flex flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-indigo-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <feature.icon size={26} aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 font-[Outfit] text-2xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{feature.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="relative z-10 bg-slate-50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Simple plans</p>
            <h2 className="mt-4 font-[Outfit] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Choose the room you need to grow.
            </h2>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3 lg:items-center">
            {plans.map((plan) => (
              <article 
                key={plan.name} 
                className={`pricing-card relative flex flex-col rounded-3xl border p-8 transition-all hover:shadow-2xl ${
                  plan.featured 
                    ? "border-transparent bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-2xl shadow-indigo-600/30 ring-2 ring-indigo-600 ring-offset-2 lg:scale-105" 
                    : "border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-200/50"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    Most popular
                  </div>
                )}
                
                <h3 className="font-[Outfit] text-2xl font-bold">{plan.name}</h3>
                <p className={`mt-3 min-h-[48px] text-sm leading-relaxed ${plan.featured ? "text-indigo-100" : "text-slate-500"}`}>
                  {plan.description}
                </p>
                
                <div className="mt-8 flex items-baseline gap-x-2">
                  <span className="font-[Outfit] text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className={`text-sm font-semibold ${plan.featured ? "text-indigo-200" : "text-slate-500"}`}>/ month</span>
                </div>
                
                <ul className="mt-10 flex flex-1 flex-col gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 
                        size={20} 
                        className={`shrink-0 ${plan.featured ? "text-indigo-300" : "text-indigo-600"}`} 
                        aria-hidden="true" 
                      />
                      <span className={plan.featured ? "text-indigo-50" : "text-slate-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={plan.href} 
                  className={`mt-10 inline-flex min-h-[52px] items-center justify-center rounded-2xl px-6 py-3 text-base font-bold transition-all ${
                    plan.featured 
                      ? "bg-white text-indigo-700 shadow-md hover:bg-indigo-50 hover:shadow-xl" 
                      : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                  }`}
                >
                  {plan.action}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
