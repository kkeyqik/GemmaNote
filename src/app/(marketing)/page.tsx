"use client";

import React from "react";
import Link from "next/link";
import { 
  PenSquare, Sparkles, FileText, Folder, Shield, MonitorSmartphone, 
  ArrowRight, Check, Search, Plus, LayoutGrid, Star, Archive, Trash2,
  Bold, Italic, Underline, Heading2, Heading3, List, ListOrdered, Link as LinkIcon, 
  Image as ImageIcon, Quote, Undo, Redo, CheckCircle2,
  Users, Globe, Zap, TrendingUp, ShieldCheck, Heart,
  Type, CloudUpload, Lock, Infinity, WifiOff, BarChart2, RefreshCw, Layout,
  Edit3, Clock, Cloud, CheckSquare, Share,
  Activity, AlignLeft, Pilcrow, Mic, Calendar, Download, ChevronDown, Flame,
  FolderOpen, User, Briefcase, GraduationCap, Book, Plane, Rocket, BookOpen, Lightbulb, MoreHorizontal, Layers,
  Wand2, Languages, Send, X, ShieldAlert, Smile, Trophy, Target,
  Navigation, Crown, Building2, Unlock, Headset, CircleDollarSign,
  HelpCircle, Minus, Mail, MessageSquare, ChevronRight, Play, Cpu, Sparkles as SparkleIcon, LogIn
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@clerk/nextjs";

export default function MarketingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <div className="w-full bg-[#F4F7FB] text-slate-900 font-sans selection:bg-indigo-500/30 relative">
      
      {/* 
        ========================================================================
        SECTION 1: HERO (Fits perfectly above the fold) 
        ========================================================================
      */}
      <div className="h-screen flex flex-col relative overflow-hidden bg-[#F4F7FB]">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-200/40 blur-[120px] pointer-events-none" />
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-blue-200/40 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-200/30 blur-[120px] pointer-events-none" />
        
        {/* Navbar - flex-none */}
        <nav className="relative z-50 flex-none flex items-center justify-between px-8 h-20 max-w-[1600px] w-full mx-auto">
          {/* Logo */}
          <Logo />

          {/* Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-700">
            <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="#why" className="hover:text-indigo-600 transition-colors">Why GemmaNote?</Link>
            <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
            <Link href="#testimonials" className="hover:text-indigo-600 transition-colors">Testimonials</Link>
            <Link href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</Link>
            <Link href="mailto:support@gemmanote.com" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {isLoaded && isSignedIn ? (
              <Link href="/dashboard" className="h-10 px-6 flex items-center justify-center text-sm font-bold rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 gap-2">
                Go to Dashboard <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link href="/login" className="hidden sm:flex items-center justify-center h-10 px-6 text-sm font-bold rounded-xl bg-white text-slate-700 hover:text-slate-900 shadow-sm border border-slate-100 transition-colors">
                  Sign In
                </Link>
                <Link href="/login" className="h-10 px-6 flex items-center justify-center text-sm font-bold rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25">
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero Content - flex-1 */}
        <main className="relative z-10 flex-1 flex items-center px-8 max-w-[1600px] w-full mx-auto min-h-0">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-4 xl:gap-12 w-full h-full items-center">
            
            {/* Left Column (Content) */}
            <div className="flex flex-col items-start text-left pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-[0.7rem] font-bold text-indigo-500 mb-6 uppercase tracking-wide shadow-sm shadow-indigo-500/5">
                <Sparkles size={14} className="text-yellow-400" fill="currentColor" /> Your thoughts. Beautifully organized.
              </div>
              
              <h1 className="text-[3.5rem] xl:text-[4.5rem] font-extrabold tracking-tight mb-5 leading-[1.05] text-[#0f172a]">
                The GemmaNote<br />
                that <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-400">thinks with you.</span>
              </h1>
              
              <p className="text-[1.1rem] xl:text-xl text-slate-600 max-w-[90%] mb-8 leading-relaxed font-medium">
                Write freely. Stay organized. Find everything instantly.<br/>
                GemmaNote is the simple yet powerful way to capture,<br/>
                organize and bring your ideas to life.
              </p>

              <div className="flex flex-row items-center gap-3 mb-8 w-full max-w-[95%]">
                <div className="flex-1 flex flex-col sm:flex-row items-center gap-2.5 p-2.5 xl:p-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-sm shadow-slate-200/50 border border-white/80">
                  <div className="p-1.5 xl:p-2 bg-indigo-50 text-indigo-500 rounded-xl"><FileText size={18} /></div>
                  <span className="text-[10px] xl:text-xs font-bold text-slate-700 leading-tight text-center sm:text-left">Word & Character<br/>Counter</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row items-center gap-2.5 p-2.5 xl:p-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-sm shadow-slate-200/50 border border-white/80">
                  <div className="p-1.5 xl:p-2 bg-blue-50 text-blue-500 rounded-xl"><Folder size={18} /></div>
                  <span className="text-[10px] xl:text-xs font-bold text-slate-700 leading-tight text-center sm:text-left">Beautiful<br/>Organization</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row items-center gap-2.5 p-2.5 xl:p-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-sm shadow-slate-200/50 border border-white/80">
                  <div className="p-1.5 xl:p-2 bg-green-50 text-green-500 rounded-xl"><Shield size={18} /></div>
                  <span className="text-[10px] xl:text-xs font-bold text-slate-700 leading-tight text-center sm:text-left">Secure &<br/>Private</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row items-center gap-2.5 p-2.5 xl:p-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-sm shadow-slate-200/50 border border-white/80">
                  <div className="p-1.5 xl:p-2 bg-orange-50 text-orange-500 rounded-xl"><MonitorSmartphone size={18} /></div>
                  <span className="text-[10px] xl:text-xs font-bold text-slate-700 leading-tight text-center sm:text-left">Works on all<br/>Devices</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Link href="/login" className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25">
                  Start Writing — It's Free <ArrowRight size={18} />
                </Link>
                <Link href="#features" className="px-8 py-3.5 rounded-2xl bg-white/80 backdrop-blur-md text-indigo-500 font-bold hover:bg-white transition-colors flex items-center justify-center border border-white shadow-sm shadow-slate-200/50">
                  Explore Features
                </Link>
              </div>

              <div className="flex items-center gap-6 text-[0.8rem] font-bold text-slate-500">
                <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Free forever</div>
                <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> No credit card required</div>
                <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Private & Secure</div>
              </div>
            </div>

            {/* Right Column (Mockup Dashboard) */}
            <div className="relative w-full h-full flex items-center justify-center min-h-0 pl-4">
              
              <div className="relative w-[110%] max-w-[850px] aspect-[1.4/1] transform -rotate-1 hover:-translate-y-1 hover:rotate-0 transition-all duration-700">
                {/* Glass Box (Border/Shadow Effect) */}
                <div className="absolute -inset-3 md:-inset-5 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl shadow-indigo-900/10 z-0 translate-x-2 translate-y-3 md:translate-x-4 md:translate-y-6" />
                
                {/* Mockup Dashboard */}
                <div className="relative w-full h-full bg-white rounded-[2rem] border-[4px] md:border-[6px] border-white shadow-xl shadow-indigo-500/10 overflow-hidden flex z-10">
                  {/* Mockup Sidebar */}
                <div className="w-[220px] bg-slate-50/50 border-r border-slate-100/80 flex flex-col p-5">
                  <div className="flex items-center gap-2 font-extrabold text-[0.9rem] mb-8 text-slate-800">
                    <div className="bg-indigo-500 p-1.5 rounded-lg text-white shadow-sm shadow-indigo-500/20 transform -rotate-2">
                      <PenSquare size={14} fill="currentColor" className="text-white/20" />
                    </div>
                    GemmaNote
                  </div>
                  <button className="w-full bg-indigo-500/10 text-indigo-600 rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 mb-6 hover:bg-indigo-500/20 transition-colors">
                    <Plus size={14} /> New Note
                  </button>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white shadow-sm shadow-slate-200/50 border border-slate-100 text-indigo-600 font-bold">
                      <div className="flex items-center gap-2.5"><LayoutGrid size={14} /> All Notes</div>
                      <span className="text-slate-400 font-semibold text-[10px]">24</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-500 font-semibold hover:bg-slate-100/50">
                      <div className="flex items-center gap-2.5"><Star size={14} /> Favorites</div>
                      <span className="text-slate-400 text-[10px]">6</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-500 font-semibold hover:bg-slate-100/50">
                      <div className="flex items-center gap-2.5"><Archive size={14} /> Archived</div>
                      <span className="text-slate-400 text-[10px]">8</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-500 font-semibold hover:bg-slate-100/50">
                      <div className="flex items-center gap-2.5"><Trash2 size={14} /> Trash</div>
                      <span className="text-slate-400 text-[10px]">3</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex-1">
                    <p className="text-[9px] uppercase font-bold text-slate-400/80 mb-3 px-2 tracking-wider">Collections</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs p-2.5 text-slate-500 font-semibold">
                        <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/30" /> Personal</div>
                        <span className="text-slate-400 text-[10px]">12</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2.5 text-slate-500 font-semibold">
                        <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400/30" /> Work</div>
                        <span className="text-slate-400 text-[10px]">6</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2.5 text-slate-500 font-semibold">
                        <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-400/30" /> Ideas</div>
                        <span className="text-slate-400 text-[10px]">4</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2.5 text-slate-500 font-semibold">
                        <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/30" /> Journal</div>
                        <span className="text-slate-400 text-[10px]">2</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="mt-auto w-full text-indigo-500/70 border border-indigo-100 rounded-xl py-2 text-[10px] font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-50 transition-colors">
                    <Star size={12} /> New Collection
                  </button>
                </div>

                {/* Mockup Main Content */}
                <div className="flex-1 flex flex-col bg-white">
                  <div className="h-16 border-b border-slate-100/80 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                      <span className="text-slate-400">&lt;</span> All Notes
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-[11px] text-slate-400 w-56 shadow-inner shadow-slate-100/50">
                        <Search size={14} className="text-slate-300" /> Search anything... <span className="ml-auto text-[9px] font-bold bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm text-slate-400">⌘K</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 border-[2px] border-white shadow-md shadow-orange-500/20" />
                    </div>
                  </div>

                  <div className="flex-1 p-10 flex flex-col relative h-full">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-[1.7rem] font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        Morning Thoughts <span className="text-2xl">☀️</span>
                      </h2>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white shadow-sm shadow-slate-200/50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Star size={12} className="text-slate-400" /> Favorite
                      </div>
                    </div>

                    <div className="space-y-5 text-[13px] text-slate-600 font-medium leading-relaxed max-w-[85%]">
                      <p>Start the day with clarity and purpose.</p>
                      <p>Small consistent steps lead to big changes.</p>
                      <p>Keep learning. Keep growing.</p>
                    </div>

                    {/* Mockup Toolbar */}
                    <div className="mt-12 flex items-center gap-1 bg-white border border-slate-100 shadow-md shadow-slate-200/30 rounded-xl px-3 py-2 w-max">
                      <button className="p-1.5 text-slate-700 font-bold hover:bg-slate-50 rounded-lg"><Bold size={15} /></button>
                      <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg"><Italic size={15} /></button>
                      <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg"><Underline size={15} /></button>
                      <div className="w-[1px] h-4 bg-slate-200 mx-1.5" />
                      <button className="p-1.5 text-slate-500 font-bold hover:bg-slate-50 rounded-lg text-xs">H1</button>
                      <button className="p-1.5 text-slate-500 font-bold hover:bg-slate-50 rounded-lg text-xs">H2</button>
                      <div className="w-[1px] h-4 bg-slate-200 mx-1.5" />
                      <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg"><List size={15} /></button>
                      <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg"><ListOrdered size={15} /></button>
                      <div className="w-[1px] h-4 bg-slate-200 mx-1.5" />
                      <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg"><LinkIcon size={15} /></button>
                      <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg"><ImageIcon size={15} /></button>
                      <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg"><Quote size={15} /></button>
                      <div className="w-[1px] h-4 bg-slate-200 mx-1.5" />
                      <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg"><Undo size={15} /></button>
                      <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg"><Redo size={15} /></button>
                    </div>

                    <div className="absolute bottom-6 left-10 right-10 flex items-center justify-between text-[10px] font-bold text-slate-400 pt-4">
                      <div className="flex gap-6">
                        <span>Words: 45</span>
                        <span>Characters: 238</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-500 font-bold bg-green-50 px-2 py-1 rounded">
                        <Check size={12} /> Saved just now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>

          </div>
        </main>

        {/* Trust Section - flex-none */}
        <section className="relative z-10 flex-none py-6 mb-2">
          <div className="max-w-[1400px] mx-auto px-8 flex flex-col items-center text-center">
            <p className="text-[0.85rem] font-bold text-slate-900 mb-4 tracking-tight">
              Trusted by writers, students, professionals & creators
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F4F7FB] shadow-sm overflow-hidden relative">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i + 20}&backgroundColor=e2e8f0`} alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex text-yellow-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={15} fill="currentColor" className="drop-shadow-sm" />)}
                </div>
                <div className="text-[0.8rem] text-slate-500 font-medium">
                  <span className="text-slate-800 font-extrabold">4.9/5</span> from 2,500+ users
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 
        ========================================================================
        SECTION 2: SOCIAL PROOF & TESTIMONIALS (Scroll down to see)
        ========================================================================
      */}
      <section id="testimonials-preview" className="py-24 bg-[#F8FAFC] relative z-20 border-t border-slate-200/50">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/50 text-[0.7rem] font-bold text-indigo-500 mb-8 uppercase tracking-widest shadow-sm">
            <CheckCircle2 size={14} className="text-indigo-500" fill="currentColor" /> Trusted by thousands
          </div>
          
          {/* Heading */}
          <h2 className="text-[2.75rem] md:text-[3.5rem] font-extrabold tracking-tight text-center mb-4 leading-tight text-slate-800">
            Loved by writers, students &<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-400">professionals worldwide</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 text-center max-w-2xl mb-16 font-medium leading-relaxed">
            Join a growing community that trusts GemmaNote to capture ideas, stay organized and be more productive every day.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 w-full mb-24">
            
            {/* Stat Card 1 */}
            <div className="bg-white rounded-[1.5rem] p-6 flex flex-col items-center text-center shadow-lg shadow-slate-200/40 border border-slate-100/50 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-1">250,000+</h3>
              <p className="text-[13px] text-slate-500 font-semibold mb-5">Notes Created</p>
              <div className="flex items-center gap-1 text-indigo-500 text-[11px] font-bold">
                <TrendingUp size={14} /> 18% this month
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white rounded-[1.5rem] p-6 flex flex-col items-center text-center shadow-lg shadow-slate-200/40 border border-slate-100/50 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-1">25,000+</h3>
              <p className="text-[13px] text-slate-500 font-semibold mb-5">Happy Users</p>
              <div className="flex items-center gap-1 text-blue-500 text-[11px] font-bold">
                <TrendingUp size={14} /> 16% this month
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white rounded-[1.5rem] p-6 flex flex-col items-center text-center shadow-lg shadow-slate-200/40 border border-slate-100/50 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center mb-6">
                <Star size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-1">4.9/5</h3>
              <p className="text-[13px] text-slate-500 font-semibold mb-5">Average Rating</p>
              <div className="flex items-center gap-1 text-yellow-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-white rounded-[1.5rem] p-6 flex flex-col items-center text-center shadow-lg shadow-slate-200/40 border border-slate-100/50 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-1">120+</h3>
              <p className="text-[13px] text-slate-500 font-semibold mb-5">Countries Served</p>
              <div className="flex items-center gap-1 text-orange-500 text-[11px] font-bold">
                <TrendingUp size={14} /> Worldwide
              </div>
            </div>

            {/* Stat Card 5 */}
            <div className="bg-white rounded-[1.5rem] p-6 flex flex-col items-center text-center shadow-lg shadow-slate-200/40 border border-slate-100/50 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-1">99.9%</h3>
              <p className="text-[13px] text-slate-500 font-semibold mb-5">Uptime</p>
              <div className="flex items-center gap-1 text-pink-500 text-[11px] font-bold">
                <ShieldCheck size={14} /> Reliable & Secure
              </div>
            </div>

          </div>

          {/* Trusted By Divider */}
          <div className="w-full flex items-center justify-center gap-4 mb-14">
            <div className="h-[1px] bg-slate-200 flex-1 max-w-[250px]"></div>
            <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest">Trusted by individuals & teams at</span>
            <div className="h-[1px] bg-slate-200 flex-1 max-w-[250px]"></div>
          </div>

          {/* Logos Grid */}
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 mb-24">
            {/* Using styled text placeholders for tech logos to mimic the image */}
            <div className="text-2xl font-sans font-semibold tracking-tighter text-slate-600">Google</div>
            <div className="flex items-center gap-2 text-xl font-sans font-semibold text-slate-600">
              <LayoutGrid size={20} className="text-blue-500"/> Microsoft
            </div>
            <div className="text-xl font-bold font-sans tracking-tight text-slate-600 flex items-center gap-1">
              <Archive size={24} className="text-orange-500"/> CLOUDFLARE
            </div>
            <div className="flex items-center gap-2 text-xl font-sans font-bold text-slate-600 tracking-tight">
              <div className="bg-slate-800 text-white p-1 rounded-md text-[10px] uppercase">N</div> Notion
            </div>
            <div className="text-2xl font-serif italic font-bold text-slate-600">Zapier</div>
            <div className="text-2xl font-serif italic text-slate-600">Canva</div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 w-full">
            
            {/* Testimonial 1 */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/30 border border-slate-100/50 flex flex-col relative">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 shrink-0">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=ffdfbf" alt="Sarah" className="w-full h-full object-cover" />
                </div>
                <Quote className="text-indigo-300 w-10 h-10 transform -scale-x-100 shrink-0 mt-2" fill="currentColor" />
              </div>
              <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-8 flex-1">
                GemmaNote has completely changed the way I write and organize my thoughts. The clean UI and real-time stats keep me focused and productive.
              </p>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Sarah Johnson</h4>
                  <p className="text-xs text-slate-400 font-medium">Student</p>
                </div>
                <div className="flex text-yellow-400 gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/30 border border-slate-100/50 flex flex-col relative">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 shrink-0">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Michael&backgroundColor=c0aede" alt="Michael" className="w-full h-full object-cover" />
                </div>
                <Quote className="text-indigo-300 w-10 h-10 transform -scale-x-100 shrink-0 mt-2" fill="currentColor" />
              </div>
              <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-8 flex-1">
                As a content writer, word count, reading time and auto-save are game changers. I never lose my flow anymore.
              </p>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Michael Chen</h4>
                  <p className="text-xs text-slate-400 font-medium">Content Writer</p>
                </div>
                <div className="flex text-yellow-400 gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/30 border border-slate-100/50 flex flex-col relative">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 shrink-0">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Priya&backgroundColor=b6e3f4" alt="Priya" className="w-full h-full object-cover" />
                </div>
                <Quote className="text-indigo-300 w-10 h-10 transform -scale-x-100 shrink-0 mt-2" fill="currentColor" />
              </div>
              <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-8 flex-1">
                I can access my notes anywhere, anytime. The collections feature helps me keep everything super organized.
              </p>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Priya Sharma</h4>
                  <p className="text-xs text-slate-400 font-medium">Product Manager</p>
                </div>
                <div className="flex text-yellow-400 gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Link href="#testimonials" className="inline-flex items-center gap-2 text-[13px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors">
              <Heart size={16} fill="currentColor" /> Read more reviews on G2 <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 3: FEATURES GRID
        ========================================================================
      */}
      <section id="features" className="py-24 bg-white relative z-20 border-t border-slate-200/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-[0.7rem] font-bold text-indigo-500 mb-8 uppercase tracking-widest shadow-sm">
            <Sparkles size={14} className="text-indigo-500" fill="currentColor" /> Built for Focus. Designed for You.
          </div>
          
          {/* Heading */}
          <h2 className="text-[2.75rem] md:text-[3.5rem] font-extrabold tracking-tight text-center mb-4 leading-tight text-slate-800">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-400">GemmaNote?</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 text-center max-w-2xl mb-16 font-medium leading-relaxed">
            GemmaNote is more than just a notepad. It's your personal writing space designed to help you think, write and achieve more.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
            
            {/* Feature 1 */}
            <div className="bg-[#F8FAFC] rounded-[2rem] p-8 flex flex-col items-center text-center border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100/50 text-indigo-500 flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Lightning Fast</h3>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                Open, write and access your notes in a blink. Optimized for speed and performance.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-500 text-[11px] font-bold mt-auto">
                <Zap size={12} fill="currentColor" /> Instant Access
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F8FAFC] rounded-[2rem] p-8 flex flex-col items-center text-center border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-blue-100/50 text-blue-500 flex items-center justify-center mb-6">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Beautiful & Minimal UI</h3>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                A clean and distraction-free interface that helps you focus on what truly matters - your thoughts.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-500 text-[11px] font-bold mt-auto">
                <Sparkles size={12} fill="currentColor" /> Clean & Focused
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#F8FAFC] rounded-[2rem] p-8 flex flex-col items-center text-center border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100/50 text-emerald-500 flex items-center justify-center mb-6">
                <Type size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Word & Character Counter</h3>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                Track your progress in real-time with detailed statistics to keep your writing on point.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[11px] font-bold mt-auto">
                <BarChart2 size={12} /> Live Statistics
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#F8FAFC] rounded-[2rem] p-8 flex flex-col items-center text-center border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-orange-100/50 text-orange-500 flex items-center justify-center mb-6">
                <CloudUpload size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Auto Save</h3>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                Never lose your work. Notes are automatically saved as you type.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 text-[11px] font-bold mt-auto">
                <ShieldCheck size={12} /> Always Protected
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#F8FAFC] rounded-[2rem] p-8 flex flex-col items-center text-center border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-teal-100/50 text-teal-500 flex items-center justify-center mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Secure & Private</h3>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                Your notes are encrypted and private by default. Only you have access.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-600 text-[11px] font-bold mt-auto">
                <ShieldCheck size={12} /> End-to-End Encrypted
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-[#F8FAFC] rounded-[2rem] p-8 flex flex-col items-center text-center border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-purple-100/50 text-purple-500 flex items-center justify-center mb-6">
                <Infinity size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Unlimited Notes</h3>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                Write as much as you want. Create unlimited notes and organize them your way.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 text-[11px] font-bold mt-auto">
                <Infinity size={12} /> No Limits
              </div>
            </div>

            {/* Feature 7 */}
            <div className="bg-[#F8FAFC] rounded-[2rem] p-8 flex flex-col items-center text-center border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-pink-100/50 text-pink-500 flex items-center justify-center mb-6">
                <WifiOff size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Works Offline</h3>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                No internet? No problem. Access and write your notes anytime, anywhere.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-50 text-pink-600 text-[11px] font-bold mt-auto">
                <WifiOff size={12} /> Offline Ready
              </div>
            </div>

            {/* Feature 8 */}
            <div className="bg-[#F8FAFC] rounded-[2rem] p-8 flex flex-col items-center text-center border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-blue-100/50 text-blue-500 flex items-center justify-center mb-6">
                <MonitorSmartphone size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Sync Everywhere</h3>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                Access your notes seamlessly across all your devices. Your notes, everywhere you are.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[11px] font-bold mt-auto">
                <RefreshCw size={12} /> Across All Devices
              </div>
            </div>

          </div>

          {/* Bottom Banner */}
          <div className="w-full max-w-3xl bg-[#F8FAFC] rounded-full p-2 pr-6 flex items-center justify-between border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm">
                <Heart size={16} fill="currentColor" />
              </div>
              <span className="text-[13px] font-bold text-slate-600">All the tools you need to write better and stay organized.</span>
            </div>
            <Link href="#features" className="text-[13px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              Explore all features <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 4: WORKSPACE SHOWCASE
        ========================================================================
      */}
      <section id="why" className="py-24 bg-[#F8FAFC] relative z-20 border-t border-slate-200/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-indigo-100/50 text-[10px] font-bold text-indigo-500 mb-6 uppercase tracking-widest">
            Powerful Workspace
          </div>
          
          {/* Heading */}
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-extrabold tracking-tight text-center mb-4 leading-tight text-slate-800">
            Everything You Need to Write <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-400">Beautifully</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 text-center max-w-2xl mb-16 font-medium leading-relaxed">
            A powerful writing workspace with rich formatting, real-time stats and smart features to help you focus on what matters.
          </p>

          <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8 w-full">
            
            {/* Left Column - Feature Cards */}
            <div className="flex flex-col gap-4">
              {/* Active Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1.5">Rich Text Editor</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Write and format your content easily with headings, lists, quotes, links, images and more.</p>
                </div>
              </div>

              {/* Inactive Cards */}
              <div className="bg-[#F4F7FB]/50 rounded-2xl p-6 border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-lg transition-all flex gap-4 items-start cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1.5">Live Word & Character Counter</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Track your writing in real-time with detailed statistics that keep you on track.</p>
                </div>
              </div>

              <div className="bg-[#F4F7FB]/50 rounded-2xl p-6 border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-lg transition-all flex gap-4 items-start cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1.5">Reading & Speaking Time</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Instantly see how long it takes to read or speak your content.</p>
                </div>
              </div>

              <div className="bg-[#F4F7FB]/50 rounded-2xl p-6 border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-lg transition-all flex gap-4 items-start cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <Cloud size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1.5">Auto Save</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Your notes are saved automatically as you type. Never lose your important thoughts.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Mockup & Stats */}
            <div className="flex flex-col gap-6">
              
              {/* Editor Mockup */}
              <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 flex overflow-hidden h-[550px]">
                {/* Sidebar */}
                <div className="w-[240px] bg-[#F8FAFC]/50 border-r border-slate-100 p-4 flex flex-col hidden sm:flex">
                   <div className="flex items-center gap-2 font-extrabold text-[0.9rem] mb-6 text-slate-800">
                    <div className="bg-indigo-500 p-1.5 rounded-lg text-white shadow-sm shadow-indigo-500/20 transform -rotate-2">
                      <PenSquare size={14} fill="currentColor" className="text-white/20" />
                    </div>
                    GemmaNote
                  </div>
                  <button className="w-full bg-indigo-500 text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 mb-6 hover:bg-indigo-600 transition-colors shadow-sm shadow-indigo-500/20">
                    <Plus size={14} /> New Note
                  </button>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-xl hover:bg-white hover:shadow-sm hover:border hover:border-slate-100 text-slate-600 font-bold transition-all cursor-pointer">
                      <div className="flex items-center gap-2.5"><LayoutGrid size={14} className="text-indigo-500"/> All Notes</div>
                      <span className="text-slate-400 font-semibold text-[10px]">128</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                      <div className="flex items-center gap-2.5"><Star size={14} className="text-slate-400"/> Favorites</div>
                      <span className="text-slate-400 font-semibold text-[10px]">24</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                      <div className="flex items-center gap-2.5"><Trash2 size={14} className="text-slate-400"/> Recently Deleted</div>
                      <span className="text-slate-400 font-semibold text-[10px]">8</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex-1">
                    <p className="text-[10px] text-slate-400 mb-3 px-2 font-medium">Collections</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                        <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-purple-500" /> Personal</div>
                        <span className="text-slate-400 text-[10px]">18</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                        <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-teal-400" /> Work</div>
                        <span className="text-slate-400 text-[10px]">32</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                        <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-orange-400" /> Study</div>
                        <span className="text-slate-400 text-[10px]">16</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                        <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-yellow-400" /> Ideas</div>
                        <span className="text-slate-400 text-[10px]">12</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                        <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-purple-600" /> Journal</div>
                        <span className="text-slate-400 text-[10px]">10</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full text-indigo-500 border border-indigo-100 rounded-xl py-2 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-50 transition-colors bg-white shadow-sm">
                    <Plus size={14} /> New Collection
                  </button>
                </div>

                {/* Editor Area */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                  {/* Top bar */}
                  <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                      <span className="text-slate-300">&lt;</span> Personal <span className="text-slate-300">/</span> <span className="text-slate-700">Project Ideas</span> <Star size={12} className="text-slate-300 ml-1"/>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded">
                        <Check size={12} /> Saved just now
                      </div>
                      <button className="bg-indigo-500 text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-sm shadow-indigo-500/20">
                        <Share size={12} /> Share
                      </button>
                      <button className="text-slate-400 hover:text-slate-600"><span className="text-lg leading-none pb-1">⋮</span></button>
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="px-8 py-3 border-b border-slate-50 flex items-center gap-1 overflow-x-auto shrink-0 hide-scrollbar">
                    <button className="p-1.5 text-slate-600 font-bold text-[11px] hover:bg-slate-50 rounded">H1</button>
                    <button className="p-1.5 text-slate-500 font-bold text-[11px] hover:bg-slate-50 rounded">H2</button>
                    <button className="p-1.5 text-slate-500 font-bold text-[11px] hover:bg-slate-50 rounded">H3</button>
                    <div className="w-[1px] h-4 bg-slate-200 mx-1.5" />
                    <button className="p-1.5 text-slate-700 font-bold hover:bg-slate-50 rounded"><Bold size={14} /></button>
                    <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><Italic size={14} /></button>
                    <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><Underline size={14} /></button>
                    <div className="w-[1px] h-4 bg-slate-200 mx-1.5" />
                    <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><List size={14} /></button>
                    <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><ListOrdered size={14} /></button>
                    <button className="p-1.5 text-slate-700 hover:bg-slate-50 rounded"><Quote size={14} fill="currentColor" /></button>
                    <div className="w-[1px] h-4 bg-slate-200 mx-1.5" />
                    <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><code className="font-bold text-[10px]">&lt;/&gt;</code></button>
                    <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><LinkIcon size={14} /></button>
                    <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><ImageIcon size={14} /></button>
                    <div className="flex-1" />
                    <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded"><Undo size={14} /></button>
                    <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded"><Redo size={14} /></button>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 p-8 overflow-hidden">
                    <h1 className="text-3xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">Project Ideas <span className="text-2xl">💡</span></h1>
                    <p className="text-[13px] text-slate-600 font-medium mb-6">Here are some project ideas we can explore in the upcoming quarter.</p>
                    
                    <h3 className="text-[13px] font-bold text-indigo-500 mb-3">1. Smart Note Organization</h3>
                    <ul className="list-disc pl-5 space-y-2 text-[12px] text-slate-600 font-medium mb-6">
                      <li>AI-powered tags and smart folders</li>
                      <li>Quick search and filters</li>
                      <li>Beautiful card-based UI</li>
                    </ul>

                    <h3 className="text-[13px] font-bold text-indigo-500 mb-3">2. Collaboration Features</h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-[12px] text-slate-600 font-medium">
                        <CheckSquare size={14} className="text-green-500" fill="currentColor"/> Real-time collaboration
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-slate-600 font-medium">
                        <CheckSquare size={14} className="text-green-500" fill="currentColor"/> Comments and mentions
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-slate-600 font-medium">
                        <CheckSquare size={14} className="text-green-500" fill="currentColor"/> Team workspaces
                      </div>
                    </div>

                    <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100/50 mb-6">
                      <p className="text-[12px] text-indigo-900/80 font-medium italic flex gap-2">
                        <Quote size={16} className="text-indigo-300 shrink-0 transform -scale-x-100" fill="currentColor" />
                        The best way to predict the future is to create it.
                      </p>
                      <p className="text-[10px] text-indigo-400 font-bold mt-2 ml-6">— Peter Drucker</p>
                    </div>

                    {/* Faux Image placeholder */}
                    <div className="w-full h-32 rounded-xl bg-gradient-to-r from-orange-300 via-pink-400 to-indigo-500 overflow-hidden relative mt-auto mb-4">
                       <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar (Full Width) */}
          <div className="w-full mt-6 bg-white rounded-2xl shadow-lg shadow-slate-200/40 border border-slate-100 py-5 px-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Words</span>
              <span className="text-[18px] font-extrabold text-indigo-600 leading-none">1,234</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Characters</span>
              <span className="text-[18px] font-extrabold text-slate-800 leading-none">7,892</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Characters (No Spaces)</span>
              <span className="text-[18px] font-extrabold text-slate-800 leading-none">6,592</span>
            </div>
            <div className="flex flex-col hidden md:flex">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Paragraphs</span>
              <span className="text-[18px] font-extrabold text-slate-800 leading-none">18</span>
            </div>
            <div className="flex flex-col hidden md:flex">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sentences</span>
              <span className="text-[18px] font-extrabold text-slate-800 leading-none">42</span>
            </div>
            <div className="w-[1px] h-8 bg-slate-200 hidden lg:block"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <Clock size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reading Time</span>
                <span className="text-[14px] font-extrabold text-slate-800 leading-none">4 min 32 sec</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                <div className="flex items-end gap-[2px] h-3">
                  <div className="w-[2px] h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-[2px] h-3 bg-blue-500 rounded-full"></div>
                  <div className="w-[2px] h-1.5 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Speaking Time</span>
                <span className="text-[14px] font-extrabold text-slate-800 leading-none">3 min 18 sec</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-slate-500 text-[13px] font-bold flex items-center justify-center gap-2">
            <Heart size={14} className="text-indigo-500" fill="currentColor"/> Focus on your ideas. We'll handle the rest.
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 5: LIVE STATISTICS & INSIGHTS
        ========================================================================
      */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8FAFC] relative z-20 border-t border-slate-200/50 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-blue-200/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/60 text-[10px] font-bold text-indigo-600 mb-6 uppercase tracking-widest">
            <Activity size={12} /> Track. Analyze. Improve.
          </div>
          
          {/* Heading */}
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-extrabold tracking-tight text-center mb-4 leading-tight text-slate-800">
            Live Statistics. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">Real Insights.</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 text-center max-w-2xl mb-16 font-medium leading-relaxed">
            Get real-time insights into your writing. Track words, characters, reading time and more to stay productive and achieve your goals.
          </p>

          {/* Stats Cards Row */}
          <div className="flex flex-nowrap overflow-x-auto w-full gap-4 pb-8 mb-4 hide-scrollbar snap-x">
            {/* Card 1 */}
            <div className="flex-none w-[170px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col snap-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
                <Type size={18} />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mb-1">Words</span>
              <span className="text-2xl font-extrabold text-indigo-600 mb-3">1,234</span>
              <div className="flex items-center text-[10px] font-bold text-green-500 mt-auto">
                +12% <span className="text-slate-400 font-medium ml-1">vs yesterday</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-none w-[170px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col snap-start">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center mb-4">
                <Type size={18} />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mb-1">Characters</span>
              <span className="text-2xl font-extrabold text-pink-500 mb-3">7,892</span>
              <div className="flex items-center text-[10px] font-bold text-green-500 mt-auto">
                +8% <span className="text-slate-400 font-medium ml-1">vs yesterday</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex-none w-[170px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col snap-start">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                <AlignLeft size={18} />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mb-1 leading-tight">Characters<br/><span className="text-[9px] text-slate-400 font-medium">(No Spaces)</span></span>
              <span className="text-2xl font-extrabold text-orange-500 mb-3">6,592</span>
              <div className="flex items-center text-[10px] font-bold text-green-500 mt-auto">
                +10% <span className="text-slate-400 font-medium ml-1">vs yesterday</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex-none w-[170px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col snap-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                <Pilcrow size={18} />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mb-1">Paragraphs</span>
              <span className="text-2xl font-extrabold text-emerald-500 mb-3">18</span>
              <div className="flex items-center text-[10px] font-bold text-green-500 mt-auto">
                +5% <span className="text-slate-400 font-medium ml-1">vs yesterday</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="flex-none w-[170px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col snap-start">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                <List size={18} />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mb-1">Sentences</span>
              <span className="text-2xl font-extrabold text-blue-500 mb-3">42</span>
              <div className="flex items-center text-[10px] font-bold text-green-500 mt-auto">
                +7% <span className="text-slate-400 font-medium ml-1">vs yesterday</span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="flex-none w-[170px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col snap-start">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
                <Clock size={18} />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mb-1">Reading Time</span>
              <span className="text-[1.35rem] font-extrabold text-purple-600 mb-3">4 <span className="text-sm font-bold">min</span> 32 <span className="text-sm font-bold">sec</span></span>
              <div className="flex items-center text-[10px] font-bold text-green-500 mt-auto">
                +9% <span className="text-slate-400 font-medium ml-1">vs yesterday</span>
              </div>
            </div>

            {/* Card 7 */}
            <div className="flex-none w-[170px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col snap-start">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center mb-4">
                <Mic size={18} />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mb-1">Speaking Time</span>
              <span className="text-[1.35rem] font-extrabold text-pink-500 mb-3">3 <span className="text-sm font-bold">min</span> 18 <span className="text-sm font-bold">sec</span></span>
              <div className="flex items-center text-[10px] font-bold text-green-500 mt-auto">
                +11% <span className="text-slate-400 font-medium ml-1">vs yesterday</span>
              </div>
            </div>
          </div>

          {/* Large Dashboard Mockup */}
          <div className="w-full max-w-[1200px] bg-white rounded-[2rem] border-[6px] border-white/80 shadow-2xl shadow-indigo-500/10 overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px] mt-8 relative z-10">
            {/* Sidebar */}
            <div className="w-full md:w-[220px] bg-slate-50/50 border-r border-slate-100/80 flex flex-col p-5 hidden md:flex shrink-0">
               <div className="flex items-center gap-2 font-extrabold text-[0.9rem] mb-6 text-slate-800">
                <div className="bg-indigo-500 p-1.5 rounded-lg text-white shadow-sm shadow-indigo-500/20 transform -rotate-2">
                  <PenSquare size={14} fill="currentColor" className="text-white/20" />
                </div>
                GemmaNote
              </div>
              <button className="w-full bg-indigo-500 text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 mb-6 hover:bg-indigo-600 transition-colors shadow-sm shadow-indigo-500/20">
                <Plus size={14} /> New Note
              </button>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl hover:bg-white hover:shadow-sm hover:border hover:border-slate-100 text-slate-600 font-bold transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5"><LayoutGrid size={14} className="text-indigo-500"/> All Notes</div>
                  <span className="text-slate-400 font-semibold text-[10px]">128</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5"><Star size={14} className="text-slate-400"/> Favorites</div>
                  <span className="text-slate-400 font-semibold text-[10px]">24</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5"><Clock size={14} className="text-slate-400"/> Recent</div>
                  <span className="text-slate-400 font-semibold text-[10px]">12</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5"><Trash2 size={14} className="text-slate-400"/> Trash</div>
                  <span className="text-slate-400 font-semibold text-[10px]">8</span>
                </div>
              </div>
              
              <div className="mt-8 flex-1">
                <p className="text-[10px] text-slate-400 mb-3 px-2 font-medium">Collections</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-purple-500" /> Personal</div>
                    <span className="text-slate-400 text-[10px]">18</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-blue-400" /> Work</div>
                    <span className="text-slate-400 text-[10px]">32</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-orange-400" /> Study</div>
                    <span className="text-slate-400 text-[10px]">16</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-green-400" /> Ideas</div>
                    <span className="text-slate-400 text-[10px]">12</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-pink-500" /> Journal</div>
                    <span className="text-slate-400 text-[10px]">10</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full text-indigo-500 border border-indigo-100 rounded-xl py-2 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-50 transition-colors bg-white shadow-sm">
                <Plus size={14} /> New Collection
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-[#F8FAFC]/30 p-6 overflow-hidden">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Statistics Overview</h3>
                  <div className="flex items-center gap-1 text-[13px] text-slate-500 font-medium">
                    Today, 20 May 2024 <ChevronDown size={14} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="bg-white border border-slate-200 text-slate-600 font-bold text-[12px] px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-sm">
                    <Calendar size={14} /> Today <ChevronDown size={14} />
                  </button>
                  <button className="bg-white border border-slate-200 text-slate-600 font-bold text-[12px] px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-sm">
                    <Download size={14} /> Export
                  </button>
                </div>
              </div>

              {/* Chart Area */}
              <div className="w-full min-h-[220px] bg-white rounded-2xl border border-slate-100 shadow-sm mb-6 p-6 flex flex-col relative overflow-hidden shrink-0">
                <div className="flex justify-between items-center mb-2 h-full">
                  <div className="flex flex-col justify-between h-full text-[10px] font-bold text-slate-400 w-8 z-10">
                    <span>1.5K</span>
                    <span>1K</span>
                    <span>500</span>
                    <span>0</span>
                  </div>
                  
                  {/* Faux Area Chart SVG */}
                  <div className="absolute left-16 right-6 top-6 bottom-10">
                    <svg viewBox="0 0 800 150" className="w-full h-full overflow-visible preserve-3d" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(99, 102, 241, 0.2)" />
                          <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                        </linearGradient>
                      </defs>
                      <path d="M0,150 L0,120 C50,100 100,60 150,50 C200,40 250,60 300,50 C350,40 400,20 450,25 C500,30 550,60 600,50 C650,40 700,20 750,50 L800,40 L800,150 Z" fill="url(#chartGradient)" />
                      <path d="M0,120 C50,100 100,60 150,50 C200,40 250,60 300,50 C350,40 400,20 450,25 C500,30 550,60 600,50 C650,40 700,20 750,50 L800,40" fill="none" stroke="#6366f1" strokeWidth="2.5" />
                      {/* Dots */}
                      <circle cx="50" cy="100" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="100" cy="60" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="150" cy="50" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="200" cy="40" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="250" cy="60" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="300" cy="50" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="350" cy="40" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="400" cy="20" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="450" cy="25" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="500" cy="30" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="550" cy="60" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="600" cy="50" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="650" cy="40" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="700" cy="20" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="750" cy="50" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="800" cy="40" r="4" fill="white" stroke="#6366f1" strokeWidth="2" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-white border border-slate-100 rounded-lg px-2 py-1 text-[10px] font-bold text-slate-600 absolute top-4 right-4 z-10 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Words <ChevronDown size={12}/>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mt-2 ml-[3.2rem] mr-2">
                  <span>12 AM</span>
                  <span className="hidden sm:inline">4 AM</span>
                  <span>8 AM</span>
                  <span>12 PM</span>
                  <span className="hidden sm:inline">4 PM</span>
                  <span>8 PM</span>
                  <span>12 AM</span>
                </div>
              </div>

              {/* Bottom Cards Row */}
              <div className="grid lg:grid-cols-2 gap-6 h-auto shrink-0">
                {/* Writing Activity */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <h4 className="text-[13px] font-bold text-slate-800 mb-6 self-start">Writing Activity</h4>
                  <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6">
                    {/* Donut Chart Faux */}
                    <div className="w-32 h-32 relative flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366f1" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="75" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="200" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#34d399" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="225" strokeLinecap="round" />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-xl font-extrabold text-slate-800 leading-none">1,234</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Words Today</span>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex flex-col gap-4 text-[12px] font-bold w-full sm:w-1/2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div> <span className="text-slate-600">Writing</span></div>
                        <span className="text-slate-800">1,234 <span className="text-slate-400 font-medium">(70%)</span></span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> <span className="text-slate-600">Editing</span></div>
                        <span className="text-slate-800">432 <span className="text-slate-400 font-medium">(20%)</span></span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div> <span className="text-slate-600">Planning</span></div>
                        <span className="text-slate-800">203 <span className="text-slate-400 font-medium">(10%)</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Productivity Streak */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center sm:items-start">
                  <h4 className="text-[13px] font-bold text-slate-800 mb-6 self-start">Productivity Streak</h4>
                  <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6">
                    
                    {/* Streak indicator */}
                    <div className="flex flex-col items-center relative shrink-0">
                      <div className="w-20 h-20 relative flex items-center justify-center mb-2">
                         <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-180">
                          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
                          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#34d399" strokeWidth="10" strokeDasharray="282.7" strokeDashoffset="50" strokeLinecap="round" />
                        </svg>
                        <div className="absolute w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                          <Flame size={20} className="text-emerald-500" fill="currentColor" />
                        </div>
                      </div>
                      <span className="text-[15px] font-extrabold text-slate-800">12 Days</span>
                      <span className="text-[10px] font-bold text-slate-500">Keep it up! 🔥</span>
                    </div>

                    {/* Days Checklist */}
                    <div className="flex items-center gap-2 sm:gap-3 w-full justify-around sm:justify-start">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Check size={14}/></div>
                        <span className="text-[9px] font-bold text-slate-400">Mon</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Check size={14}/></div>
                        <span className="text-[9px] font-bold text-slate-400">Tue</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Check size={14}/></div>
                        <span className="text-[9px] font-bold text-slate-400">Wed</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Check size={14}/></div>
                        <span className="text-[9px] font-bold text-slate-400">Thu</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Check size={14}/></div>
                        <span className="text-[9px] font-bold text-slate-400">Fri</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Check size={14}/></div>
                        <span className="text-[9px] font-bold text-slate-400">Sat</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 rounded-full border-[1.5px] border-slate-200 bg-white"></div>
                        <span className="text-[9px] font-bold text-slate-400">Sun</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-8 text-center text-slate-500 text-[11px] font-bold flex items-center justify-center gap-1.5">
            <Lock size={12} className="text-slate-400" /> Your data is private and secure. We never share your information.
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 6: ORGANIZE (CATEGORIES & CARDS)
        ========================================================================
      */}
      <section className="py-24 bg-gradient-to-b from-[#F8FAFC] to-white relative z-20 border-t border-slate-200/50 overflow-hidden">
        {/* Abstract Fluid Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-purple-200/30 rounded-[100%] blur-[120px] mix-blend-multiply" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-indigo-200/30 rounded-[100%] blur-[100px] mix-blend-multiply" />
          <svg className="absolute w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="rgba(255,255,255,0.5)" />
            <path d="M0,70 Q25,90 50,70 T100,70 L100,100 L0,100 Z" fill="rgba(248,250,252,0.8)" />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/60 text-[10px] font-bold text-purple-600 mb-6 uppercase tracking-widest shadow-sm shadow-purple-500/10 border border-purple-200/50">
            <FolderOpen size={12} /> Organize. Categorize. Find Instantly.
          </div>
          
          {/* Heading */}
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-extrabold tracking-tight text-center mb-4 leading-tight text-slate-800">
            Organize Your Thoughts <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Beautifully</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 text-center max-w-2xl mb-12 font-medium leading-relaxed">
            Keep your notes perfectly organized with collections, smart cards and powerful search — so you can find what you need, when you need it.
          </p>

          {/* Categories Pill Row */}
          <div className="flex flex-nowrap overflow-x-auto w-full gap-3 pb-8 mb-6 hide-scrollbar justify-start md:justify-center px-4">
            <button className="flex-none px-5 py-2.5 rounded-xl bg-indigo-100 text-indigo-600 font-bold text-[13px] flex items-center gap-2 shadow-sm border border-indigo-200/50 transition-all">
              <Layers size={16} /> All Notes
            </button>
            <button className="flex-none px-5 py-2.5 rounded-xl bg-white text-slate-600 font-bold text-[13px] flex items-center gap-2 shadow-sm border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all">
              <User size={16} className="text-indigo-500" /> Personal
            </button>
            <button className="flex-none px-5 py-2.5 rounded-xl bg-white text-slate-600 font-bold text-[13px] flex items-center gap-2 shadow-sm border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all">
              <Briefcase size={16} className="text-blue-500" /> Business
            </button>
            <button className="flex-none px-5 py-2.5 rounded-xl bg-white text-slate-600 font-bold text-[13px] flex items-center gap-2 shadow-sm border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all">
              <GraduationCap size={16} className="text-indigo-500" /> Study
            </button>
            <button className="flex-none px-5 py-2.5 rounded-xl bg-white text-slate-600 font-bold text-[13px] flex items-center gap-2 shadow-sm border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all">
              <Book size={16} className="text-blue-500" /> Journal
            </button>
            <button className="flex-none px-5 py-2.5 rounded-xl bg-white text-slate-600 font-bold text-[13px] flex items-center gap-2 shadow-sm border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all">
              <Plane size={16} className="text-indigo-500" /> Travel
            </button>
            <button className="flex-none px-5 py-2.5 rounded-xl bg-white text-slate-600 font-bold text-[13px] flex items-center gap-2 shadow-sm border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all">
              <Rocket size={16} className="text-indigo-500" /> Startup Ideas
            </button>
            <button className="flex-none px-5 py-2.5 rounded-xl bg-white text-slate-600 font-bold text-[13px] flex items-center gap-2 shadow-sm border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all">
              <BookOpen size={16} className="text-blue-500" /> Books
            </button>
          </div>

          {/* Large Dashboard Mockup */}
          <div className="w-full max-w-[1200px] h-auto md:h-[650px] relative z-10 mx-auto">
            <div className="absolute inset-0 bg-white rounded-[2rem] border-[6px] border-white/80 shadow-2xl shadow-indigo-900/10 overflow-hidden hidden md:flex flex-col md:flex-row">
              {/* Sidebar */}
              <div className="w-full md:w-[220px] bg-slate-50/50 border-r border-slate-100/80 flex flex-col p-5 hidden md:flex shrink-0">
                <div className="flex items-center gap-2 font-extrabold text-[0.9rem] mb-6 text-slate-800">
                  <div className="bg-indigo-500 p-1.5 rounded-lg text-white shadow-sm shadow-indigo-500/20 transform -rotate-2">
                    <PenSquare size={14} fill="currentColor" className="text-white/20" />
                  </div>
                  GemmaNote
                </div>
                <button className="w-full bg-indigo-500 text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 mb-6 hover:bg-indigo-600 transition-colors shadow-sm shadow-indigo-500/20">
                  <Plus size={14} /> New Note
                </button>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5"><LayoutGrid size={14} className="text-slate-400"/> All Notes</div>
                    <span className="text-slate-400 font-semibold text-[10px]">128</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5"><Star size={14} className="text-slate-400"/> Favorites</div>
                    <span className="text-slate-400 font-semibold text-[10px]">24</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5"><Trash2 size={14} className="text-slate-400"/> Recently Deleted</div>
                    <span className="text-slate-400 font-semibold text-[10px]">8</span>
                  </div>
                </div>
                
                <div className="mt-8 flex-1">
                  <p className="text-[10px] text-slate-400 mb-3 px-2 font-medium">Collections</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs p-2 text-indigo-700 font-bold bg-indigo-50 rounded-lg shadow-sm border border-indigo-100 cursor-pointer">
                      <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/40" /> Personal</div>
                      <span className="text-indigo-400 text-[10px]">18</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                      <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-blue-400" /> Work</div>
                      <span className="text-slate-400 text-[10px]">32</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                      <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-orange-400" /> Study</div>
                      <span className="text-slate-400 text-[10px]">16</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                      <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-green-400" /> Ideas</div>
                      <span className="text-slate-400 text-[10px]">12</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                      <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-pink-500" /> Journal</div>
                      <span className="text-slate-400 text-[10px]">10</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full text-indigo-500 border border-indigo-100 rounded-xl py-2 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-50 transition-colors bg-white shadow-sm">
                  <Plus size={14} /> New Collection
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col bg-[#F4F7FB]/50 p-8 overflow-hidden relative">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-sm border border-emerald-100">
                      <FolderOpen size={24} fill="currentColor" className="text-emerald-500/20"/>
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Personal Notes</h3>
                      <p className="text-[13px] text-slate-500 font-medium">18 notes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" placeholder="Search notes..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-[12px] font-medium outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm bg-white" />
                    </div>
                    <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm shrink-0">
                      <button className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><LayoutGrid size={16}/></button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"><List size={16}/></button>
                    </div>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden pb-20 pr-4 -mr-4 hide-scrollbar">
                  {/* Card 1 */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col h-[220px]">
                    <div className="h-[110px] w-full relative overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=600" alt="Laptop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-600 shadow-sm">Work</div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="text-[13px] font-bold text-slate-800 mb-1">Project Ideas</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">Brainstorming ideas for upcoming digital products and services...</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><Calendar size={12}/> May 18, 2024</div>
                        <Star size={14} className="text-amber-400" fill="currentColor"/>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col h-[220px]">
                    <div className="h-[110px] w-full relative overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600" alt="Notes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-600 shadow-sm">Study</div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="text-[13px] font-bold text-slate-800 mb-1">Learning Plan</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">My roadmap to learn WordPress and SEO strategies for this year.</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><Calendar size={12}/> May 17, 2024</div>
                        <Star size={14} className="text-slate-300"/>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col h-[220px]">
                    <div className="h-[110px] w-full relative overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600" alt="Coffee" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-purple-600 shadow-sm">Journal</div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="text-[13px] font-bold text-slate-800 mb-1">Daily Journal</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">Thoughts, gratitude and things I am learning everyday to grow.</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><Calendar size={12}/> May 16, 2024</div>
                        <Star size={14} className="text-amber-400" fill="currentColor"/>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col h-[220px]">
                    <div className="h-[110px] w-full relative overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600" alt="Airplane" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-cyan-600 shadow-sm">Travel</div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="text-[13px] font-bold text-slate-800 mb-1">Travel Bucket List</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">Places I want to visit this year and beyond. Japan, Switzerland...</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><Calendar size={12}/> May 14, 2024</div>
                        <Star size={14} className="text-slate-300"/>
                      </div>
                    </div>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col h-[220px]">
                    <div className="h-[110px] w-full relative overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600" alt="Salad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-orange-500 shadow-sm">Recipes</div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="text-[13px] font-bold text-slate-800 mb-1">Healthy Recipes</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">Quick and nutritious recipes for everyday cooking.</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><Calendar size={12}/> May 12, 2024</div>
                        <Star size={14} className="text-slate-300"/>
                      </div>
                    </div>
                  </div>

                  {/* Card 6 */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col h-[220px]">
                    <div className="h-[110px] w-full relative overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=600" alt="Desk" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-teal-600 shadow-sm">Personal</div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="text-[13px] font-bold text-slate-800 mb-1">Life Goals</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">Short and long term goals for a better future and career.</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><Calendar size={12}/> May 10, 2024</div>
                        <Star size={14} className="text-slate-300"/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAB */}
                <button className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-colors z-20">
                  <Plus size={24} />
                </button>
              </div>
            </div>

            {/* Floating Popover Card (Overlapping right edge) */}
            <div className="absolute top-24 -right-16 md:-right-24 w-[280px] bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-300/50 p-6 z-30 hidden lg:flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[15px] font-extrabold text-slate-800">Project Ideas</h4>
                <MoreHorizontal size={18} className="text-slate-400" />
              </div>
              <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-bold w-max mb-4">Work</div>
              
              <p className="text-[12px] text-slate-600 font-medium leading-relaxed mb-5">
                Brainstorming ideas for upcoming digital products and services. Key areas:
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-[4px] bg-indigo-600 text-white flex items-center justify-center shrink-0"><Check size={10} strokeWidth={4}/></div>
                  <span className="text-[12px] font-bold text-slate-700">SaaS Product</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-[4px] border-2 border-slate-200 shrink-0"></div>
                  <span className="text-[12px] font-bold text-slate-600">Mobile App</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-[4px] border-2 border-slate-200 shrink-0"></div>
                  <span className="text-[12px] font-bold text-slate-600">AI Integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-[4px] border-2 border-slate-200 shrink-0"></div>
                  <span className="text-[12px] font-bold text-slate-600">Productivity Tools</span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 flex gap-3 border border-purple-100">
                <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" fill="currentColor"/>
                <p className="text-[11px] font-bold text-slate-700 leading-relaxed">
                  Tip: Turn ideas into actionable plans!
                </p>
              </div>
            </div>
            
            {/* Mobile Fallback View (Shown only on small screens) */}
            <div className="md:hidden flex flex-col bg-white rounded-3xl border border-slate-200 shadow-lg p-6">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-sm border border-emerald-100">
                    <FolderOpen size={24} fill="currentColor" className="text-emerald-500/20"/>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Personal Notes</h3>
                    <p className="text-[12px] text-slate-500 font-medium">18 notes</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=200" alt="Work" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[13px] font-bold text-slate-800">Project Ideas</h4>
                        <div className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[9px] font-bold">Work</div>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-2">Brainstorming ideas for upcoming digital products...</p>
                      <div className="mt-auto flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <Calendar size={10}/> May 18
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=200" alt="Study" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[13px] font-bold text-slate-800">Learning Plan</h4>
                        <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[9px] font-bold">Study</div>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-2">My roadmap to learn WordPress and SEO strategies...</p>
                      <div className="mt-auto flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <Calendar size={10}/> May 17
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 7: AI ASSISTANT
        ========================================================================
      */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8FAFC] relative z-20 border-t border-slate-200/50 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
           <div className="absolute top-[10%] left-[20%] w-[30%] h-[40%] bg-purple-200/20 rounded-full blur-[100px]" />
           <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[120px]" />
           
           {/* Small sparkles around */}
           <Sparkles className="absolute top-[15%] left-[10%] text-purple-300 opacity-50" size={24} />
           <Sparkles className="absolute top-[30%] right-[5%] text-indigo-300 opacity-40" size={20} />
           <Sparkles className="absolute bottom-[40%] left-[5%] text-purple-200 opacity-60" size={16} />
           <Sparkles className="absolute bottom-[20%] right-[20%] text-indigo-200 opacity-50" size={24} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/60 text-[10px] font-bold text-purple-600 mb-6 uppercase tracking-widest shadow-sm border border-purple-200/50">
            <Sparkles size={12} /> AI-POWERED
          </div>
          
          {/* Heading */}
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-extrabold tracking-tight text-center mb-4 leading-tight text-slate-800">
            AI Writing Assistant That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">Elevates Your Ideas</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 text-center max-w-2xl mb-14 font-medium leading-relaxed">
            From generating ideas to perfecting your content, our AI assistant helps you write faster, overcome writer's block, and communicate with clarity.
          </p>

          {/* Feature Cards Row */}
          <div className="flex flex-nowrap overflow-x-auto w-full gap-4 pb-8 mb-4 hide-scrollbar justify-start xl:justify-center px-4 snap-x">
            {/* Card 1 */}
            <div className="flex-none w-[220px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex items-start gap-4 snap-start">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Wand2 size={18} />
              </div>
              <div>
                <h4 className="text-[12px] font-bold text-slate-800 mb-1.5">Smart Suggestions</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Get intelligent suggestions as you write in real-time.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-none w-[220px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex items-start gap-4 snap-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Edit3 size={18} />
              </div>
              <div>
                <h4 className="text-[12px] font-bold text-slate-800 mb-1.5">Rewrite & Improve</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Enhance your content for clarity, tone & readability.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex-none w-[220px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex items-start gap-4 snap-start">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <List size={18} />
              </div>
              <div>
                <h4 className="text-[12px] font-bold text-slate-800 mb-1.5">Summarize Instantly</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Condense long content into clear, concise summaries.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex-none w-[220px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex items-start gap-4 snap-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Languages size={18} />
              </div>
              <div>
                <h4 className="text-[12px] font-bold text-slate-800 mb-1.5">Translate Content</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Translate your notes into multiple languages.</p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="flex-none w-[220px] bg-white rounded-[1.5rem] p-5 shadow-lg shadow-slate-200/40 border border-slate-100 flex items-start gap-4 snap-start">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Lightbulb size={18} />
              </div>
              <div>
                <h4 className="text-[12px] font-bold text-slate-800 mb-1.5">Beat Writer's Block</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Get ideas and inspiration whenever you need it.</p>
              </div>
            </div>
          </div>

          {/* Large Dashboard Mockup with AI Sidebar */}
          <div className="w-full max-w-[1200px] h-auto md:h-[600px] bg-white rounded-[2rem] border-[6px] border-white/80 shadow-2xl shadow-purple-900/10 overflow-hidden flex flex-col md:flex-row relative z-10 mx-auto mt-4">
            
            {/* Left Sidebar */}
            <div className="w-full md:w-[220px] bg-slate-50/50 border-r border-slate-100/80 flex flex-col p-5 hidden md:flex shrink-0">
              <div className="flex items-center gap-2 font-extrabold text-[0.9rem] mb-6 text-slate-800">
                <div className="bg-indigo-500 p-1.5 rounded-lg text-white shadow-sm shadow-indigo-500/20 transform -rotate-2">
                  <PenSquare size={14} fill="currentColor" className="text-white/20" />
                </div>
                GemmaNote
              </div>
              <button className="w-full bg-indigo-500 text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 mb-6 hover:bg-indigo-600 transition-colors shadow-sm shadow-indigo-500/20">
                <Plus size={14} /> New Note
              </button>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-indigo-700 font-bold bg-indigo-50 shadow-sm border border-indigo-100 cursor-pointer">
                  <div className="flex items-center gap-2.5"><LayoutGrid size={14} className="text-indigo-500"/> All Notes</div>
                  <span className="text-indigo-400 font-semibold text-[10px]">128</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5"><Star size={14} className="text-slate-400"/> Favorites</div>
                  <span className="text-slate-400 font-semibold text-[10px]">24</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5"><Trash2 size={14} className="text-slate-400"/> Recently Deleted</div>
                  <span className="text-slate-400 font-semibold text-[10px]">8</span>
                </div>
              </div>
              
              <div className="mt-8 flex-1">
                <p className="text-[10px] text-slate-400 mb-3 px-2 font-medium">Collections</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-purple-500" /> Personal</div>
                    <span className="text-slate-400 text-[10px]">18</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-blue-400" /> Work</div>
                    <span className="text-slate-400 text-[10px]">32</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-orange-400" /> Study</div>
                    <span className="text-slate-400 text-[10px]">16</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-green-400" /> Ideas</div>
                    <span className="text-slate-400 text-[10px]">12</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 text-slate-600 font-bold cursor-pointer hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-pink-500" /> Journal</div>
                    <span className="text-slate-400 text-[10px]">10</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full text-indigo-500 border border-indigo-100 rounded-xl py-2 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-50 transition-colors bg-white shadow-sm">
                <Plus size={14} /> New Collection
              </button>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden relative border-r border-slate-100">
              {/* Top bar */}
              <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                  <span className="text-slate-500">All Notes</span> <span className="text-slate-300">/</span> <span className="text-slate-800">Content Strategy</span> <Star size={12} className="text-slate-300 ml-1"/>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded">
                    <Check size={12} /> Saved just now
                  </div>
                  <button className="text-slate-400 hover:text-slate-600"><Undo size={14} /></button>
                  <button className="text-slate-400 hover:text-slate-600"><Redo size={14} /></button>
                  <button className="text-slate-400 hover:text-slate-600"><span className="text-lg leading-none pb-1">⋮</span></button>
                </div>
              </div>

              {/* Toolbar */}
              <div className="px-6 py-3 border-b border-slate-50 flex items-center gap-2 overflow-x-auto shrink-0 hide-scrollbar">
                <button className="px-2 py-1 text-slate-600 font-bold text-[11px] hover:bg-slate-50 rounded flex items-center gap-1">Paragraph <ChevronDown size={12}/></button>
                <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                <button className="p-1.5 text-slate-700 font-bold hover:bg-slate-50 rounded"><Bold size={14} /></button>
                <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><Italic size={14} /></button>
                <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><Underline size={14} /></button>
                <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded line-through text-[12px] font-medium">S</button>
                <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><List size={14} /></button>
                <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><ListOrdered size={14} /></button>
                <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><AlignLeft size={14} /></button>
                <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                <button className="p-1.5 text-slate-700 hover:bg-slate-50 rounded"><Quote size={14} fill="currentColor" /></button>
                <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><code className="font-bold text-[10px]">&lt;/&gt;</code></button>
                <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><LinkIcon size={14} /></button>
                <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded"><ImageIcon size={14} /></button>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-8 overflow-hidden flex flex-col">
                <h1 className="text-2xl font-extrabold text-slate-800 mb-6">Content Strategy for Growth</h1>
                
                {/* Highlighted Paragraph */}
                <div className="relative">
                  <span className="bg-purple-100 text-slate-800 text-[13px] font-medium leading-relaxed rounded box-decoration-clone px-1 py-0.5">
                    A strong content strategy is the backbone of any successful digital presence. 
                    It helps you attract the right audience, build trust, and achieve your 
                    business goals.
                  </span>
                </div>
                
                <h3 className="text-[15px] font-bold text-slate-800 mt-8 mb-4">Key Pillars of a Good Strategy</h3>
                <ul className="list-disc pl-5 space-y-2 text-[13px] text-slate-700 font-medium mb-6 marker:text-purple-500">
                  <li>Understand your audience deeply</li>
                  <li>Create valuable and relevant content</li>
                  <li>Stay consistent and data-driven</li>
                  <li>Optimize, analyze and repeat</li>
                </ul>

                <p className="text-[13px] text-slate-700 font-medium leading-relaxed">
                  When done right, content becomes more than just words on a page—<br/>
                  it becomes your most powerful growth engine.
                </p>

                {/* Editor Footer Status */}
                <div className="mt-auto flex items-center justify-between text-[10px] font-bold text-slate-400 pt-4 border-t border-slate-50">
                  <div className="flex gap-4">
                    <span>Words: 1,246</span>
                    <span>Characters: 8,592</span>
                    <span>Reading time: 4 min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    100% <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant Right Sidebar */}
            <div className="w-full md:w-[320px] bg-slate-50/30 flex flex-col h-full shrink-0 border-l border-slate-100">
              {/* Header */}
              <div className="h-14 border-b border-slate-100 flex items-center justify-between px-5 shrink-0 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 font-bold text-[13px] text-slate-800">
                  <Sparkles size={16} className="text-purple-500" /> AI Assistant
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-[8px] font-bold tracking-wider">BETA</div>
                  <button className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-5 hide-scrollbar">
                <p className="text-[12px] font-bold text-slate-800 mb-4">How can I help you today?</p>
                
                {/* 2x2 Action Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2 hover:border-purple-300 hover:shadow-sm transition-all text-left">
                    <Sparkles size={14} className="text-purple-500 shrink-0" />
                    <span className="text-[11px] font-bold text-slate-700">Improve</span>
                  </button>
                  <button className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2 hover:border-purple-300 hover:shadow-sm transition-all text-left">
                    <List size={14} className="text-indigo-500 shrink-0" />
                    <span className="text-[11px] font-bold text-slate-700">Summarize</span>
                  </button>
                  <button className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2 hover:border-purple-300 hover:shadow-sm transition-all text-left">
                    <Edit3 size={14} className="text-emerald-500 shrink-0" />
                    <span className="text-[11px] font-bold text-slate-700 leading-tight">Continue Writing</span>
                  </button>
                  <button className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2 hover:border-purple-300 hover:shadow-sm transition-all text-left">
                    <Languages size={14} className="text-blue-500 shrink-0" />
                    <span className="text-[11px] font-bold text-slate-700">Translate</span>
                  </button>
                </div>

                <p className="text-[10px] font-bold text-slate-400 mb-3">Suggested for you</p>
                
                {/* Suggested Actions */}
                <div className="space-y-3">
                  <button className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 hover:border-purple-300 hover:shadow-sm transition-all text-left group">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 text-purple-600">
                      <Wand2 size={14} />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-[11px] font-bold text-slate-800">Improve this paragraph</h5>
                      <p className="text-[9px] font-medium text-slate-500">Make it clearer and more impactful.</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-purple-500 transition-colors" />
                  </button>

                  <button className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 hover:border-purple-300 hover:shadow-sm transition-all text-left group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600">
                      <List size={14} />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-[11px] font-bold text-slate-800">Summarize this note</h5>
                      <p className="text-[9px] font-medium text-slate-500">Get key points in a short summary.</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </button>

                  <button className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 hover:border-purple-300 hover:shadow-sm transition-all text-left group">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                      <Lightbulb size={14} />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-[11px] font-bold text-slate-800">Generate ideas</h5>
                      <p className="text-[9px] font-medium text-slate-500">Get fresh ideas on this topic.</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 shrink-0">
                <div className="relative flex items-center">
                  <input type="text" placeholder="Ask anything..." className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-4 pr-12 text-[11px] font-medium text-slate-700 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 shadow-sm" />
                  <button className="absolute right-2 w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-700 transition-colors shadow-sm">
                    <Send size={12} className="ml-0.5" />
                  </button>
                </div>
                <p className="text-[8px] font-medium text-slate-400 text-center mt-3">
                  AI can make mistakes. Please review responses.
                </p>
              </div>
            </div>
            
          </div>

          {/* Privacy Card */}
          <div className="w-full max-w-[900px] mt-8 bg-white rounded-2xl shadow-lg shadow-slate-200/40 border border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mx-auto">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/30">
                <ShieldCheck size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-[15px] font-extrabold text-slate-800 mb-1">Your Data. Your Privacy.</h4>
                <p className="text-[12px] font-medium text-slate-500">Your content is 100% private and never used to train our AI models.</p>
              </div>
            </div>
            <a href="#" className="text-[12px] font-bold text-indigo-600 flex items-center gap-1.5 hover:text-indigo-700 transition-colors shrink-0">
              Learn more about our privacy <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 8: TESTIMONIALS & SUCCESS STORIES
        ========================================================================
      */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-[#F8FAFC] to-white relative z-20 border-t border-slate-200/50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/60 text-[10px] font-bold text-purple-600 mb-6 uppercase tracking-widest shadow-sm border border-purple-200/50">
            <Sparkles size={12} /> SUCCESS STORIES
          </div>
          
          {/* Heading */}
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-extrabold tracking-tight text-center mb-4 leading-tight text-slate-800">
            Real Results. <span className="text-purple-600">Real Impact.</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 text-center max-w-2xl mb-16 font-medium leading-relaxed">
            See how individuals, teams, and businesses are writing better, saving time, and achieving more with GemmaNote.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Smile size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-indigo-700 mb-1">25,000+</h4>
                <p className="text-[13px] font-bold text-slate-800 mb-0.5">Happy Users</p>
                <p className="text-[11px] text-slate-500">Across the globe</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-indigo-700 mb-1">2.5M+</h4>
                <p className="text-[13px] font-bold text-slate-800 mb-0.5">Documents Created</p>
                <p className="text-[11px] text-slate-500">Ideas turned into content</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-indigo-700 mb-1">1.2M+</h4>
                <p className="text-[13px] font-bold text-slate-800 mb-0.5">Hours Saved</p>
                <p className="text-[11px] text-slate-500">Through smarter writing</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Trophy size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-indigo-700 mb-1">98%</h4>
                <p className="text-[13px] font-bold text-slate-800 mb-0.5">Satisfaction Rate</p>
                <p className="text-[11px] text-slate-500">Users love GemmaNote</p>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-3 text-purple-600 font-bold text-sm mb-12">
            <Sparkles size={16} />
            Loved by writers, professionals, and teams worldwide
            <Sparkles size={16} />
          </div>

          {/* Testimonials Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mb-16">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative overflow-hidden group">
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Priya Sharma" className="w-14 h-14 rounded-full object-cover border-2 border-purple-100" />
                  <Quote size={40} className="text-indigo-100 transform -scale-x-100 absolute left-10 -top-2 opacity-50 z-[-1]"/>
                </div>
                <div className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-[10px] font-bold">Content Creator</div>
              </div>
              
              <h3 className="text-[17px] font-extrabold text-slate-800 mb-3 relative z-10">Writes 3x Faster Now</h3>
              <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-8 flex-1 relative z-10">
                GemmaNote's AI assistant helps me brainstorm ideas, write blog drafts, and polish my content in minutes. It's like having a co-writer that never gets tired!
              </p>
              
              <div className="mb-8 relative z-10">
                <p className="text-[12px] font-extrabold text-slate-800">Priya Sharma</p>
                <p className="text-[11px] font-medium text-slate-500">Blogger & Content Creator</p>
              </div>

              <div className="flex gap-4 relative z-10">
                <div className="bg-indigo-50/50 rounded-2xl p-4 flex-1 flex flex-col justify-center gap-1">
                  <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <Zap size={16} />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Time Saved Daily</span>
                  </div>
                  <p className="text-[15px] font-extrabold text-indigo-600 ml-6">2+ Hours</p>
                </div>
                <div className="bg-indigo-50/50 rounded-2xl p-4 flex-1 flex flex-col justify-center gap-1">
                  <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <TrendingUp size={16} />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Content Output</span>
                  </div>
                  <p className="text-[15px] font-extrabold text-indigo-600 ml-6">3X More</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative overflow-hidden group">
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" alt="Rohan Mehta" className="w-14 h-14 rounded-full object-cover border-2 border-purple-100" />
                  <Quote size={40} className="text-indigo-100 transform -scale-x-100 absolute left-10 -top-2 opacity-50 z-[-1]"/>
                </div>
                <div className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full text-[10px] font-bold">Marketing Manager</div>
              </div>
              
              <h3 className="text-[17px] font-extrabold text-slate-800 mb-3 relative z-10">Better Content, Higher Engagement</h3>
              <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-8 flex-1 relative z-10">
                Our team creates content 60% faster with GemmaNote. The quality is consistently better, and engagement has increased across all channels.
              </p>
              
              <div className="mb-8 relative z-10">
                <p className="text-[12px] font-extrabold text-slate-800">Rohan Mehta</p>
                <p className="text-[11px] font-medium text-slate-500">Marketing Manager, TechFlow</p>
              </div>

              <div className="flex gap-4 relative z-10">
                <div className="bg-purple-50/50 rounded-2xl p-4 flex-1 flex flex-col justify-center gap-1">
                  <div className="flex items-center gap-2 text-purple-600 mb-1">
                    <Clock size={16} />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Time Saved Weekly</span>
                  </div>
                  <p className="text-[15px] font-extrabold text-purple-600 ml-6">10+ Hours</p>
                </div>
                <div className="bg-purple-50/50 rounded-2xl p-4 flex-1 flex flex-col justify-center gap-1">
                  <div className="flex items-center gap-2 text-purple-600 mb-1">
                    <BarChart2 size={16} />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Engagement Increase</span>
                  </div>
                  <p className="text-[15px] font-extrabold text-purple-600 ml-6">60%</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative overflow-hidden group">
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150" alt="Ananya Verma" className="w-14 h-14 rounded-full object-cover border-2 border-purple-100" />
                  <Quote size={40} className="text-indigo-100 transform -scale-x-100 absolute left-10 -top-2 opacity-50 z-[-1]"/>
                </div>
                <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-[10px] font-bold">Entrepreneur</div>
              </div>
              
              <h3 className="text-[17px] font-extrabold text-slate-800 mb-3 relative z-10">From Ideas to Impact</h3>
              <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-8 flex-1 relative z-10">
                GemmaNote turns my scattered ideas into clear, powerful content. It's simple, smart, and absolutely game-changing.
              </p>
              
              <div className="mb-8 relative z-10">
                <p className="text-[12px] font-extrabold text-slate-800">Ananya Verma</p>
                <p className="text-[11px] font-medium text-slate-500">Founder, Mindful Growth</p>
              </div>

              <div className="flex gap-4 relative z-10">
                <div className="bg-blue-50/50 rounded-2xl p-4 flex-1 flex flex-col justify-center gap-1">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Target size={16} />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Goals Achieved</span>
                  </div>
                  <p className="text-[15px] font-extrabold text-blue-600 ml-6">2X Faster</p>
                </div>
                <div className="bg-blue-50/50 rounded-2xl p-4 flex-1 flex flex-col justify-center gap-1">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Star size={16} />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Productivity Boost</span>
                  </div>
                  <p className="text-[15px] font-extrabold text-blue-600 ml-6">80%</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 9: PRICING (FLEXIBLE PLANS)
        ========================================================================
      */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-white to-[#F8FAFC] relative z-20 border-t border-slate-200/50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/60 text-[10px] font-bold text-purple-600 mb-6 uppercase tracking-widest shadow-sm border border-purple-200/50">
            <Sparkles size={12} /> FLEXIBLE PLANS
          </div>
          
          {/* Heading */}
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-extrabold tracking-tight text-center mb-4 leading-tight text-slate-800">
            Plans That <span className="text-purple-600">Grow With You</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 text-center max-w-2xl mb-16 font-medium leading-relaxed">
            Choose the perfect plan for your needs and upgrade anytime.<br/>
            All plans include core features to supercharge your writing.
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1100px] mb-12">
            
            {/* Starter Plan */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                <Navigation size={20} className="transform rotate-45 -ml-1 mt-1" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-1">Starter</h3>
              <p className="text-[13px] text-slate-500 font-medium mb-6">Perfect for getting started</p>
              
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-indigo-600">$0</span>
              </div>
              <p className="text-[11px] font-bold text-indigo-500 mb-8 pb-8 border-b border-slate-100">Forever Free</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> 5,000 words per month</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> AI Writing Assistant</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> Smart Suggestions</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> Basic Templates</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> Community Support</li>
              </ul>
              
              <Link href="/login" className="flex items-center justify-center w-full py-3.5 bg-white text-indigo-600 font-bold text-[13px] rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm">
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-purple-900/10 border-2 border-purple-500 flex flex-col relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
                <Star size={12} fill="currentColor" /> MOST POPULAR
              </div>
              
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 mt-2">
                <Crown size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-1">Pro</h3>
              <p className="text-[13px] text-slate-500 font-medium mb-6">For individuals & professionals</p>
              
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-indigo-600">$9.99</span>
              </div>
              <p className="text-[11px] font-bold text-indigo-500 mb-8 pb-8 border-b border-slate-100">Per month, billed monthly</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5"/> Unlimited words</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5"/> Advanced AI Writing Assistant</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5"/> Smart Suggestions & Rewrites</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5"/> Premium Templates</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5"/> AI Content Summarizer</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5"/> Priority Support</li>
              </ul>
              
              <Link href="/login" className="w-full py-3.5 bg-purple-600 text-white font-bold text-[13px] rounded-xl hover:bg-purple-700 transition-colors shadow-md shadow-purple-500/30 flex items-center justify-center gap-2">
                Start Pro Plan <ArrowRight size={16} />
              </Link>
            </div>

            {/* Team Plan */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-1">Team</h3>
              <p className="text-[13px] text-slate-500 font-medium mb-6">For teams & businesses</p>
              
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-indigo-600">$24.99</span>
              </div>
              <p className="text-[11px] font-bold text-indigo-500 mb-8 pb-8 border-b border-slate-100">Per user / month, billed monthly</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> Everything in Pro</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> Team Collaboration</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> Shared Templates & Folders</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> Brand Voice & Style Guide</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> Analytics & Insights</li>
                <li className="flex items-start gap-3 text-[13px] text-slate-600 font-medium"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5"/> Priority Support</li>
              </ul>
              
              <Link href="/login" className="w-full py-3.5 bg-white text-indigo-600 font-bold text-[13px] rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                Start Team Plan <ArrowRight size={16} />
              </Link>
            </div>

          </div>

          {/* Trust Signals Row */}
          <div className="w-full max-w-[1100px] bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-6 mb-12">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h5 className="text-[11px] font-bold text-slate-800 leading-tight mb-0.5">No Credit Card<br/>Required</h5>
                <p className="text-[9px] text-slate-500 font-medium">Start for free</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-100" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <RefreshCw size={18} />
              </div>
              <div>
                <h5 className="text-[11px] font-bold text-slate-800 leading-tight mb-0.5">Upgrade or Downgrade<br/>Anytime</h5>
                <p className="text-[9px] text-slate-500 font-medium">Flexible & easy</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-100" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Unlock size={18} />
              </div>
              <div>
                <h5 className="text-[11px] font-bold text-slate-800 leading-tight mb-0.5">Cancel Anytime</h5>
                <p className="text-[9px] text-slate-500 font-medium">No hidden fees</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-100" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Headset size={18} />
              </div>
              <div>
                <h5 className="text-[11px] font-bold text-slate-800 leading-tight mb-0.5">24/7 Support</h5>
                <p className="text-[9px] text-slate-500 font-medium">We're here to help</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-100" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <CircleDollarSign size={18} />
              </div>
              <div>
                <h5 className="text-[11px] font-bold text-slate-800 leading-tight mb-0.5">Money Back<br/>Guarantee</h5>
                <p className="text-[9px] text-slate-500 font-medium">7-day guarantee</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-100" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Users size={18} />
              </div>
              <div>
                <h5 className="text-[11px] font-bold text-slate-800 leading-tight mb-0.5">Trusted by 25,000+<br/>Users Worldwide</h5>
                <p className="text-[9px] text-slate-500 font-medium">And growing</p>
              </div>
            </div>

          </div>

          {/* Security Note */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-700">Your data is 100% secure and always private.</p>
              <p className="text-[10px] font-medium text-slate-500">We never share your information with anyone.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 10: FAQ
        ========================================================================
      */}
      <section id="faq" className="py-24 bg-[#F8FAFC] relative z-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/60 text-[10px] font-bold text-purple-600 mb-6 uppercase tracking-widest shadow-sm border border-purple-200/50">
            <HelpCircle size={12} /> FAQ
          </div>
          
          {/* Heading */}
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-extrabold tracking-tight text-center mb-4 leading-tight text-slate-800">
            Frequently Asked <span className="text-purple-600">Questions</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 text-center max-w-2xl mb-16 font-medium leading-relaxed">
            Everything you need to know about GemmaNote.<br/>
            Can't find the answer you're looking for? <span className="text-purple-600 font-bold">We're here to help!</span>
          </p>

          <div className="flex flex-col lg:flex-row gap-8 w-full mb-8">
            
            {/* Left Column: Contact Card */}
            <div className="w-full lg:w-[350px] shrink-0 bg-white/50 rounded-3xl p-8 flex flex-col items-center text-center border border-slate-200/60 shadow-sm">
              <div className="w-24 h-24 mb-6 relative">
                <div className="absolute inset-0 bg-purple-100 rounded-full animate-pulse opacity-50" />
                <div className="absolute top-0 right-2 w-16 h-16 bg-purple-500 rounded-2xl rounded-tr-sm rotate-12 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                  ?
                </div>
                <div className="absolute bottom-0 left-0 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-[20px] font-extrabold text-slate-800 mb-3">Still have questions?</h3>
              <p className="text-[13px] text-slate-500 font-medium mb-8 leading-relaxed">
                Our support team is ready to help you 24/7. Get in touch and we'll get back to you as soon as possible.
              </p>
              
              <button className="w-full py-3.5 bg-purple-500 text-white font-bold text-[13px] rounded-xl hover:bg-purple-600 transition-colors shadow-md shadow-purple-500/30 flex items-center justify-center gap-2 mb-8">
                <Mail size={16} /> Contact Support
              </button>

              <div className="w-full flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Other ways to reach us</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-purple-600 shrink-0 group-hover:bg-purple-50 transition-colors">
                      <Mail size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-[12px] font-bold text-slate-800">Email Us</p>
                      <p className="text-[11px] text-slate-500">support@gemmanote.ai</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-purple-400 group-hover:text-purple-600 transition-colors" />
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-purple-600 shrink-0 group-hover:bg-purple-50 transition-colors">
                      <MessageSquare size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-[12px] font-bold text-slate-800">Live Chat</p>
                      <p className="text-[11px] text-slate-500">Available 24/7</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-purple-400 group-hover:text-purple-600 transition-colors" />
                </div>
              </div>
            </div>

            {/* Right Column: FAQ Accordion */}
            <div className="flex-1 flex flex-col gap-3">
              
              {/* Active FAQ Item */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-3">
                <div className="flex justify-between items-center cursor-pointer">
                  <h4 className="text-[14px] font-extrabold text-purple-600">What is GemmaNote?</h4>
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Minus size={14} />
                  </div>
                </div>
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed pr-8">
                  GemmaNote is an AI-powered writing assistant that helps you write, improve, and organize content faster. It offers smart suggestions, rephrasing, summarization, and more to boost your productivity.
                </p>
              </div>

              {/* Inactive FAQ Items */}
              {[
                "Is GemmaNote free to use?",
                "Can I upgrade or downgrade my plan anytime?",
                "Is my data safe with GemmaNote?",
                "Can I cancel my subscription anytime?",
                "Do you offer refunds?",
                "Can I collaborate with my team?",
                "What payment methods do you accept?"
              ].map((q, i) => (
                <div key={i} className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-slate-100 flex justify-between items-center cursor-pointer hover:border-slate-200 transition-colors">
                  <h4 className="text-[14px] font-bold text-slate-700">{q}</h4>
                  <div className="text-purple-400 shrink-0">
                    <Plus size={16} />
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Privacy Banner */}
          <div className="w-full bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div className="text-center sm:text-left">
                <h5 className="text-[13px] font-bold text-slate-800 mb-1">Your privacy is our priority.</h5>
                <p className="text-[11px] text-slate-500 font-medium">We use industry-standard encryption to keep your data<br className="hidden sm:block" />100% secure and private.</p>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-white text-indigo-600 font-bold text-[11px] rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm flex items-center gap-2 shrink-0">
              Learn More About Privacy <Lock size={12} />
            </button>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 11: FINAL CTA
        ========================================================================
      */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8FAFC] relative z-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 mb-20">
            {/* Left side text & buttons */}
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/60 text-[10px] font-bold text-purple-600 mb-6 uppercase tracking-widest shadow-sm border border-purple-200/50">
                <Rocket size={12} /> FINAL CTA
              </div>
              
              <h2 className="text-[3rem] md:text-[4rem] font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-800">
                Ready to Write<br/>
                <span className="text-purple-600">Smarter and Faster?</span>
              </h2>
              
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                Join thousands of writers, marketers, and teams who are creating better content in less time with GemmaNote.
              </p>

              <div className="flex flex-col gap-4 mb-10 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[14px] font-bold text-slate-600">AI-powered writing that understands you</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[14px] font-bold text-slate-600">Save hours and boost your productivity</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[14px] font-bold text-slate-600">Start free. Upgrade anytime. Cancel anytime.</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-purple-600 text-white font-bold text-[14px] rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2">
                  Get Started for Free <ArrowRight size={16} />
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-purple-600 font-bold text-[14px] rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                  <Play size={16} className="fill-current" /> Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-2 justify-center lg:justify-start mt-6 text-[12px] font-medium text-slate-500">
                <Sparkles size={14} className="text-purple-400" /> No credit card required &nbsp;&bull;&nbsp; Free forever plan available
              </div>

            </div>

            {/* Right side illustration / mockup */}
            <div className="flex-1 relative w-full max-w-[600px] flex items-center justify-center">
              {/* Background Circle */}
              <div className="absolute w-[90%] pb-[90%] bg-purple-100 rounded-full right-0 top-1/2 -translate-y-1/2" />
              
              {/* Editor Mockup */}
              <div className="relative w-full sm:w-[110%] bg-white rounded-2xl shadow-2xl shadow-purple-900/10 border border-slate-100 p-6 z-10 sm:mr-[-5%] sm:ml-[-5%]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                      <PenSquare size={16} />
                    </div>
                    <span className="font-extrabold text-[14px] text-slate-800">GemmaNote</span>
                  </div>
                  <div className="px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <Sparkles size={10} /> AI Assistant
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-[22px] font-extrabold text-slate-800 leading-tight">
                    Create content that connects <br/>
                    and <span className="text-purple-600">converts.</span>
                  </h3>
                  <div className="w-[90%] h-3 bg-slate-100 rounded-full" />
                  <div className="w-full h-3 bg-slate-100 rounded-full" />
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-4 text-slate-400 mb-6 pb-4 border-b border-slate-100">
                  <Bold size={14} />
                  <Italic size={14} />
                  <Underline size={14} />
                  <List size={14} />
                  <ListOrdered size={14} />
                  <Quote size={14} />
                  <LinkIcon size={14} />
                  <div className="flex-1" />
                  <div className="flex gap-1 text-slate-300">
                    <Undo size={14} />
                    <Redo size={14} />
                  </div>
                </div>

                {/* AI Suggestion Popup */}
                <div className="relative w-full sm:w-[90%] bg-white rounded-xl shadow-lg border border-purple-100 p-4">
                  <div className="flex justify-between items-center mb-2 text-[10px] font-bold text-slate-800">
                    <div className="flex items-center gap-1">
                      <Sparkles size={12} className="text-purple-600" /> AI Suggestion
                    </div>
                    <Sparkles size={12} className="text-purple-200" />
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed border-r-2 border-slate-900 pr-1 inline-block">
                      A compelling headline that captures attention and drives engagement
                    </p>
                    <button className="px-4 py-1.5 bg-purple-50 text-purple-600 font-bold text-[10px] rounded-lg border border-purple-200 shrink-0">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Arrow */}
                <div className="absolute right-4 bottom-14 z-20 hidden sm:block">
                  <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500 transform -rotate-12">
                    <path d="M58 2C45 20 20 25 10 40M10 40C15 35 20 30 25 25M10 40C15 45 20 50 25 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Purple Banner */}
          <div className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 rounded-3xl p-8 md:p-10 flex flex-col xl:flex-row items-center justify-between gap-10 shadow-2xl shadow-indigo-600/20 text-white mb-10">
            
            <div className="flex items-center gap-5 xl:border-r border-white/20 xl:pr-10 shrink-0 text-center xl:text-left flex-col sm:flex-row">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 className="text-[15px] font-extrabold mb-1">Your Data. Your Privacy.</h4>
                <p className="text-[12px] text-purple-100 font-medium">We never share your data with anyone.<br/>100% secure and private.</p>
              </div>
            </div>

            <div className="flex-1 flex flex-wrap lg:flex-nowrap items-center justify-center xl:justify-between gap-8 w-full">
              <div className="flex items-center gap-4">
                <Users size={24} className="text-purple-200" />
                <div>
                  <h5 className="text-[20px] font-extrabold leading-tight">25,000+</h5>
                  <p className="text-[11px] font-medium text-purple-200">Happy Users</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FileText size={24} className="text-purple-200" />
                <div>
                  <h5 className="text-[20px] font-extrabold leading-tight">2.5M+</h5>
                  <p className="text-[11px] font-medium text-purple-200">Documents Created</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Star size={24} className="text-purple-200" />
                <div>
                  <h5 className="text-[20px] font-extrabold leading-tight">4.9/5</h5>
                  <p className="text-[11px] font-medium text-purple-200">User Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck size={24} className="text-purple-200" />
                <div>
                  <h5 className="text-[20px] font-extrabold leading-tight">98%</h5>
                  <p className="text-[11px] font-medium text-purple-200">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center flex justify-center items-center gap-2 text-[14px] font-medium text-slate-500 pb-8">
            Start writing better today. Your best content is just a click away. <Heart size={16} className="text-purple-400" />
          </div>

        </div>
      </section>

    </div>
  );
}
