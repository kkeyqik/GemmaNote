"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp, useAuth, useClerk } from "@clerk/nextjs";
import { 
  PenSquare, Sparkles, Zap, Shield, Users, Quote, 
  Mail, Lock, Eye, ArrowRight, ShieldCheck, Check,
  CheckCircle2, Italic, Bold, Underline, Link as LinkIcon, Quote as QuoteIcon, List, ListOrdered
} from "lucide-react";
import { Logo } from "@/components/Logo";

type Mode = "login" | "signup" | "verify" | "forgot" | "reset";

export default function AuthPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const { isLoaded: isLoadedSignIn, signIn, setActive: setActiveSignIn } = useSignIn();
  const { isLoaded: isLoadedSignUp, signUp, setActive: setActiveSignUp } = useSignUp();
  
  React.useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  // If the user gets stuck in an incomplete OAuth flow (e.g., choose-organization hash)
  // because of a leftover session or Clerk setting, we should clear it so they can try again.
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("tasks")) {
      clerk.signOut().then(() => {
        router.push("/login");
      });
    }
  }, [clerk, router]);

  const [mode, setMode] = React.useState<Mode>("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // Switch mode helper
  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setError("");
    setPassword("");
    setCode("");
  };

  const handleOAuth = async (strategy: 'oauth_google' | 'oauth_github' | 'oauth_microsoft') => {
    if (!signIn) {
      setError("Auth service is initializing, please try again in a moment.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: any) {
      setIsSubmitting(false);
      const msg = err.errors?.[0]?.longMessage || err.message || "OAuth failed";
      if (msg.includes("already signed in")) {
        // The user's client thinks they are signed in, but the server doesn't. 
        // Force sign out to clear the stuck client state.
        await clerk.signOut();
        window.location.reload();
      } else {
        setError(msg);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn || !signUp) {
      setError("Auth service is initializing, please try again in a moment.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (mode === "login") {
        const result = await signIn.create({
          identifier: email,
          password,
        });
        if (result.status === "complete") {
          await setActiveSignIn({ session: result.createdSessionId });
          router.push("/dashboard");
        } else {
          console.log(result);
        }
      } 
      else if (mode === "signup") {
        const result = await signUp.create({
          emailAddress: email,
          password,
        });
        // Start verification
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        setMode("verify");
      }
      else if (mode === "verify") {
        const result = await signUp.attemptEmailAddressVerification({ code });
        if (result.status === "complete") {
          await setActiveSignUp({ session: result.createdSessionId });
          router.push("/dashboard");
        } else {
          console.log(result);
        }
      }
      else if (mode === "forgot") {
        const result = await signIn.create({
          strategy: "reset_password_email_code",
          identifier: email,
        });
        setMode("reset");
      }
      else if (mode === "reset") {
        const result = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
          password,
        });
        if (result.status === "complete") {
          await setActiveSignIn({ session: result.createdSessionId });
          router.push("/dashboard");
        } else {
          console.log(result);
        }
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white selection:bg-purple-500/30 overflow-hidden">
      
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-full lg:w-[42%] xl:w-[38%] bg-gradient-to-br from-[#F5F3FF] to-[#FDFBFF] relative overflow-hidden flex-col p-6 lg:p-10 shrink-0 border-r border-purple-100/50">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-[80px]" />
        <Sparkles size={24} className="absolute top-32 right-16 text-purple-300" />
        <Sparkles size={16} className="absolute bottom-1/3 left-12 text-purple-200" />

        <div className="mb-8 relative z-10 w-fit">
          <Logo />
        </div>

        <div className="relative z-10 mb-6">
          <h1 className="text-[2.2rem] lg:text-[2.6rem] font-extrabold text-slate-800 leading-[1.1] mb-4 tracking-tight">
            Smarter <span className="text-[#8B5CF6]">Writing</span>.<br/>
            Better <span className="text-[#8B5CF6]">Results</span>.
          </h1>
          <p className="text-[13px] font-medium text-slate-600 leading-relaxed max-w-sm">
            Join thousands of writers, marketers, and teams who create amazing content with AI.
          </p>
        </div>

        <div className="space-y-4 relative z-10 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#8B5CF6] flex items-center justify-center shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-slate-800 mb-0.5">AI-Powered Writing</h4>
              <p className="text-[12px] text-slate-500 font-medium">Write, improve, and polish content in seconds.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-400 flex items-center justify-center shrink-0">
              <Zap size={16} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-slate-800 mb-0.5">Save Time</h4>
              <p className="text-[12px] text-slate-500 font-medium">Create 10x faster with smart templates and tools.</p>
            </div>
          </div>
        </div>

        {/* Floating Dashboard Preview Image */}
        <div className="relative z-10 w-full mt-auto rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-white/50 max-h-[30vh]">
          <img 
            src="/dashboard-preview.jpg" 
            alt="GemmaNote Dashboard Preview" 
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col relative bg-white overflow-y-auto">
        
        {/* Top Right Header */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 text-[13px] font-medium text-slate-500">
          {(mode === "login" || mode === "forgot") && (
            <>Don't have an account? <button onClick={() => switchMode("signup")} className="font-bold text-[#8B5CF6] hover:text-purple-700 transition-colors">Sign up</button></>
          )}
          {(mode === "signup" || mode === "verify") && (
            <>Already have an account? <button onClick={() => switchMode("login")} className="font-bold text-[#8B5CF6] hover:text-purple-700 transition-colors">Log in</button></>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-8 py-8 w-full max-w-[500px] mx-auto">
          
          {/* Header */}
          <div className="text-center mb-6 w-full">
            <h2 className="text-[28px] font-extrabold text-slate-800 mb-2 flex items-center justify-center gap-2">
              {mode === "login" && <>Welcome back <span className="animate-wave origin-bottom-right">👋</span></>}
              {mode === "signup" && <>Create an account ✨</>}
              {mode === "verify" && <>Check your email 📧</>}
              {mode === "forgot" && <>Reset password 🔒</>}
              {mode === "reset" && <>Set new password 🔑</>}
            </h2>
            <p className="text-[14px] font-medium text-slate-500">
              {mode === "login" && "Login to continue to GemmaNote"}
              {mode === "signup" && "Sign up to start creating amazing content"}
              {mode === "verify" && "We sent a 6-digit code to your email"}
              {mode === "forgot" && "Enter your email to receive a reset code"}
              {mode === "reset" && "Enter the code and your new password"}
            </p>
          </div>

          {/* Tabs */}
          {(mode === "login" || mode === "signup") && (
            <div className="flex w-full mb-8 border-b border-slate-200">
              <button 
                onClick={() => switchMode("login")}
                className={`flex-1 pb-3 text-[14px] font-bold border-b-2 transition-colors ${mode === "login" ? "text-[#8B5CF6] border-[#8B5CF6]" : "text-slate-400 hover:text-slate-600 border-transparent"}`}
              >
                Log in
              </button>
              <button 
                onClick={() => switchMode("signup")}
                className={`flex-1 pb-3 text-[14px] font-bold border-b-2 transition-colors ${mode === "signup" ? "text-[#8B5CF6] border-[#8B5CF6]" : "text-slate-400 hover:text-slate-600 border-transparent"}`}
              >
                Sign up
              </button>
            </div>
          )}

          {/* OAuth Buttons */}
          {(mode === "login" || mode === "signup") && (
            <div className="flex flex-col gap-3 w-full mb-8">
              <button onClick={() => handleOAuth('oauth_google')} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-200 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button onClick={() => handleOAuth('oauth_github')} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-200 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>
              <button onClick={() => handleOAuth('oauth_microsoft')} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-200 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" fill="#00A4EF"/>
                  <path d="M11.4 11.4H0V0h11.4v11.4z" fill="#F25022"/>
                  <path d="M24 11.4H12.6V0H24v11.4z" fill="#7FBA00"/>
                  <path d="M11.4 24H0V12.6h11.4V24z" fill="#00A4EF"/>
                  <path d="M24 24H12.6V12.6H24V24z" fill="#FFB900"/>
                </svg>
                Continue with Microsoft
              </button>
            </div>
          )}

          {/* Divider */}
          {(mode === "login" || mode === "signup") && (
            <div className="flex items-center w-full gap-4 mb-8">
              <div className="flex-1 h-px bg-slate-100"></div>
              <span className="text-[12px] font-medium text-slate-400">or</span>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>
          )}

          {/* Form */}
          <form className="w-full space-y-5 mb-6" onSubmit={handleSubmit}>
            
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-[13px] font-bold">
                {error}
              </div>
            )}

            {/* Email (Hidden in Verify mode, shown in Login/Signup/Forgot) */}
            {mode !== "verify" && mode !== "reset" && (
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-slate-700">Email address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6] transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            )}

            {/* Password (Hidden in Forgot, Verify modes. Shown in Reset, Login, Signup) */}
            {(mode === "login" || mode === "signup" || mode === "reset") && (
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-slate-700">{mode === "reset" ? "New Password" : "Password"}</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "reset" ? "Enter new password" : "Enter your password"}
                    className="w-full h-12 pl-11 pr-11 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6] transition-all placeholder:text-slate-400"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Code (Shown in Verify and Reset modes) */}
            {(mode === "verify" || mode === "reset") && (
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-slate-700">Verification Code</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6] transition-all placeholder:text-slate-400 text-center tracking-widest text-lg"
                    maxLength={6}
                  />
                </div>
              </div>
            )}

            {/* Options */}
            {mode === "login" && (
              <div className="flex items-center justify-between w-full pt-1">
                <label className="flex items-center gap-2 cursor-pointer group" onClick={() => setRememberMe(!rememberMe)}>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${rememberMe ? 'bg-[#8B5CF6] border-[#8B5CF6]' : 'border-slate-300 group-hover:border-[#8B5CF6]'}`}>
                    {rememberMe && <Check size={10} className="text-white" />}
                  </div>
                  <span className="text-[12px] font-medium text-slate-600 select-none">Remember me</span>
                </label>
                <button type="button" onClick={() => switchMode("forgot")} className="text-[12px] font-bold text-[#8B5CF6] hover:text-purple-700 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-bold text-[14px] rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Please wait..." : (
                <>
                  {mode === "login" && "Log in"}
                  {mode === "signup" && "Create account"}
                  {mode === "verify" && "Verify email"}
                  {mode === "forgot" && "Send reset code"}
                  {mode === "reset" && "Reset password"}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
            
            {/* Back to login */}
            {(mode === "forgot" || mode === "verify" || mode === "reset") && (
              <button 
                type="button" 
                onClick={() => switchMode("login")}
                className="w-full text-center text-[13px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Back to login
              </button>
            )}

          </form>

          {/* Terms */}
          {(mode === "login" || mode === "signup") && (
            <p className="text-[11px] font-medium text-slate-500 text-center mb-10 max-w-[300px]">
              By continuing, you agree to our <Link href="#" className="font-bold text-[#8B5CF6]">Terms of Service</Link> and <Link href="#" className="font-bold text-[#8B5CF6]">Privacy Policy</Link>.
            </p>
          )}

          {/* Security Banner */}
          <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4 mt-auto">
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h5 className="text-[13px] font-extrabold text-slate-800 mb-0.5">Your data is safe with us</h5>
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                We use industry-standard encryption to keep your data 100% secure and private.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
