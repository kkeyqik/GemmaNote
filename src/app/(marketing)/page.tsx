"use client";

import Link from "next/link";
import { ArrowRight, Check, FileText, LayoutGrid, Zap } from "lucide-react";
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
  { name: "Free", price: "$0", description: "For a focused local-first writing practice.", features: ["Local browser storage", "Focused rich-text editor", "Markdown export", "10 imports/month"], action: "Start Free", href: "/editor", featured: false },
  { name: "Pro", price: "$12", description: "For writers working across more than one device.", features: ["Cloud sync", "200 imports/month", "Priority support", "Everything in Free"], action: "Choose Pro", href: "/sign-up", featured: true },
  { name: "Agency", price: "$49", description: "For teams with repeatable client workflows.", features: ["Unlimited imports", "Shared workspaces", "Custom voice presets", "Everything in Pro"], action: "Choose Agency", href: "/sign-up", featured: false },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          allowMotion: "(prefers-reduced-motion: no-preference)"
        },
        (context) => {
          const { allowMotion } = context.conditions as { allowMotion: boolean };
          
          if (allowMotion) {
            // Hero Intro
            gsap.from(".hero-text", {
              y: 40,
              opacity: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              delay: 0.1
            });
            
            // Features Trigger
            gsap.from(".feature-card", {
              y: 50,
              opacity: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#features",
                start: "top 80%"
              }
            });
            
            // Pricing Trigger
            gsap.from(".pricing-card", {
              y: 50,
              opacity: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#pricing",
                start: "top 80%"
              }
            });
          } else {
            // Ensure visibility for reduced motion
            gsap.set([".hero-text", ".feature-card", ".pricing-card"], { opacity: 1, y: 0 });
          }
          return () => {};
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="hero-text text-sm font-bold uppercase tracking-widest text-[#404040]">
            Distraction-free Writing
          </p>
          <h1 className="hero-text mt-6 text-6xl font-extrabold tracking-tight text-[#171717] sm:text-7xl lg:text-8xl">
            A focused home <br className="hidden sm:block" />
            for every good draft.
          </h1>
          <p className="hero-text mx-auto mt-8 max-w-2xl text-lg font-medium text-[#404040] sm:text-xl">
            GemmaNote combines browser-assisted writing, a minimalist editor, and a tidy content library. Move your ideas from the first line to finished work.
          </p>
          
          <div className="hero-text mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/editor" className="group flex h-14 w-full items-center justify-center gap-2 rounded bg-[#171717] px-8 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#D4AF37] hover:text-[#171717] sm:w-auto">
              Open Workspace
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#features" className="flex h-14 w-full items-center justify-center rounded border-2 border-[#171717] bg-white px-8 text-sm font-bold uppercase tracking-widest text-[#171717] transition-colors hover:bg-[#171717] hover:text-white sm:w-auto">
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Editor Preview / Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-0.5 w-full bg-[#171717]"></div>
      </div>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-[#171717] sm:text-5xl">
              Built for the writing day.
            </h2>
            <p className="mt-4 text-lg font-medium text-[#404040]">
              A workspace that stays out of your way.
            </p>
          </div>
          
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card group flex flex-col rounded border-2 border-[#171717] bg-white p-8 transition-colors hover:bg-[#171717] hover:text-white">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded bg-[#171717] text-white transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#171717]">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
                <p className="mt-4 text-base font-medium text-[#404040] group-hover:text-[#A3A3A3]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t-2 border-[#171717] bg-[#FAFAFA] px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-[#171717] sm:text-5xl">
              Simple Plans.
            </h2>
            <p className="mt-4 text-lg font-medium text-[#404040]">
              Choose the room you need to grow.
            </p>
          </div>
          
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {plans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`pricing-card relative flex flex-col rounded border-2 bg-white p-8 ${
                  plan.featured ? "border-[#D4AF37] shadow-[8px_8px_0_0_#D4AF37]" : "border-[#171717] shadow-[8px_8px_0_0_#171717]"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-8 rounded bg-[#D4AF37] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#171717]">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold tracking-tight text-[#171717]">{plan.name}</h3>
                <p className="mt-4 min-h-[48px] text-sm font-medium text-[#404040]">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tight text-[#171717]">{plan.price}</span>
                  <span className="text-sm font-bold text-[#404040]">/ month</span>
                </div>
                
                <div className="mt-8 mb-8 h-0.5 w-full bg-[#171717]/10"></div>
                
                <ul className="flex flex-1 flex-col gap-4">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#171717]">
                      <Check size={18} className={plan.featured ? "text-[#D4AF37]" : "text-[#171717]"} />
                      {feat}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={plan.href}
                  className={`mt-10 flex h-12 items-center justify-center rounded border-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                    plan.featured
                      ? "border-[#D4AF37] bg-[#D4AF37] text-[#171717] hover:bg-[#171717] hover:border-[#171717] hover:text-[#D4AF37]"
                      : "border-[#171717] bg-white text-[#171717] hover:bg-[#171717] hover:text-white"
                  }`}
                >
                  {plan.action}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
