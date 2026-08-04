"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, LayoutGrid, Sparkles, Zap } from "lucide-react";
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
  { name: "Free", price: "$0", description: "For a focused local-first writing practice.", features: ["Local browser storage", "Focused rich-text editor", "Markdown export", "10 imports each month"], action: "Start free", href: "/editor" },
  { name: "Pro", price: "$12", description: "For writers working across more than one device.", features: ["Cloud sync across devices", "200 imports each month", "Priority support", "Everything in Free"], action: "Choose Pro", href: "/sign-up", featured: true },
  { name: "Agency", price: "$49", description: "For teams with repeatable client workflows.", features: ["Unlimited imports", "Shared workspaces", "Custom voice presets", "Everything in Pro"], action: "Choose Agency", href: "/sign-up" },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-elem", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power3.out" });
      gsap.fromTo(".feature-card", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: featuresRef.current, start: "top 82%" } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden">
      <section ref={heroRef} className="relative px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,#e0e7ff_0%,#f3f6fa_42%,#f8fafc_100%)]" />
        <div className="mx-auto max-w-5xl text-center">
          <div className="hero-elem mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3.5 py-2 text-xs font-semibold text-indigo-600 shadow-sm">
            <Sparkles size={14} aria-hidden="true" /> A quieter way to make progress
          </div>
          <h1 className="hero-elem mx-auto max-w-4xl font-[Outfit] text-5xl font-bold leading-[1.04] tracking-[-0.045em] text-slate-800 sm:text-6xl lg:text-7xl">
            A focused home for every <span className="text-indigo-500">good draft.</span>
          </h1>
          <p className="hero-elem mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            GemmaNote combines browser-assisted writing, a distraction-free editor, and a tidy content library so your ideas can move from first line to finished work.
          </p>
          <div className="hero-elem mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/editor" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(99,102,241,0.2)] transition hover:bg-indigo-600">
              Open your workspace <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="#features" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
              Explore the workflow
            </Link>
          </div>
          <div className="hero-elem mx-auto mt-14 grid max-w-3xl grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white/80 px-3 py-4 text-left shadow-[0_8px_30px_rgba(30,41,59,0.04)] backdrop-blur">
            {[['Local-first', 'Your drafts stay yours'], ['Cloud when ready', 'Sync on Pro and Agency'], ['Made for momentum', 'Less UI, more writing']].map(([label, detail]) => <div key={label} className="px-3 sm:px-5"><p className="text-xs font-semibold text-slate-700">{label}</p><p className="mt-1 hidden text-xs text-slate-400 sm:block">{detail}</p></div>)}
          </div>
        </div>
      </section>

      <section id="features" ref={featuresRef} className="border-y border-slate-200 bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500">Built for the writing day</p><h2 className="mt-3 font-[Outfit] text-3xl font-bold tracking-[-0.03em] text-slate-800 sm:text-4xl">A workspace that stays out of your way.</h2></div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => <article key={feature.title} className="feature-card rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-[0_4px_16px_rgba(30,41,59,0.025)] transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-[0_12px_28px_rgba(99,102,241,0.1)]"><div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-500"><feature.icon size={21} aria-hidden="true" /></div><h3 className="mt-6 font-[Outfit] text-xl font-bold text-slate-800">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{feature.desc}</p></article>)}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-slate-50 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500">Simple plans</p><h2 className="mt-3 font-[Outfit] text-3xl font-bold tracking-[-0.03em] text-slate-800 sm:text-4xl">Choose the room you need to grow.</h2></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">{plans.map((plan) => <article key={plan.name} className={`relative flex flex-col rounded-2xl border p-7 ${plan.featured ? "border-indigo-200 bg-indigo-500 text-white shadow-[0_16px_34px_rgba(99,102,241,0.22)]" : "border-slate-200 bg-white text-slate-800 shadow-[0_4px_16px_rgba(30,41,59,0.03)]"}`}>
            {plan.featured && <span className="absolute -top-3 left-6 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-indigo-600 shadow-sm">Most popular</span>}
            <h3 className="font-[Outfit] text-xl font-bold">{plan.name}</h3><p className={`mt-2 min-h-10 text-sm leading-5 ${plan.featured ? "text-indigo-100" : "text-slate-500"}`}>{plan.description}</p><p className="mt-6 font-[Outfit] text-4xl font-bold">{plan.price}<span className={`ml-1 text-sm font-medium ${plan.featured ? "text-indigo-100" : "text-slate-400"}`}>/ month</span></p>
            <ul className="mt-7 flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className={`flex items-center gap-2.5 text-sm ${plan.featured ? "text-white" : "text-slate-600"}`}><CheckCircle2 size={17} className={plan.featured ? "text-white" : "text-indigo-500"} aria-hidden="true" />{feature}</li>)}</ul>
            <Link href={plan.href} className={`mt-8 inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${plan.featured ? "bg-white text-indigo-600 hover:bg-indigo-50" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"}`}>{plan.action}</Link>
          </article>)}</div>
        </div>
      </section>
    </div>
  );
}
