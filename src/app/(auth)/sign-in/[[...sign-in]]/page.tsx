import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn 
      appearance={{
        elements: {
          rootBox: "mx-auto w-full",
          card: "shadow-xl border border-slate-200 rounded-2xl bg-white w-full",
          headerTitle: "text-2xl font-bold text-slate-900",
          headerSubtitle: "text-slate-500",
          formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all rounded-lg py-2.5",
          formFieldInput: "rounded-lg border-slate-200 focus:ring-indigo-600 focus:border-indigo-600",
          formFieldLabel: "text-slate-700 font-medium",
          socialButtonsBlockButton: "border-slate-200 hover:bg-slate-50 rounded-lg transition-colors",
          socialButtonsBlockButtonText: "text-slate-600 font-medium",
          dividerLine: "bg-slate-200",
          dividerText: "text-slate-400",
          footerActionLink: "text-indigo-600 hover:text-indigo-700 font-medium",
        }
      }}
    />
  );
}
