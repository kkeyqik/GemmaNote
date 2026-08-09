import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <AuthenticateWithRedirectCallback 
        signInForceRedirectUrl="/dashboard"
        signUpForceRedirectUrl="/dashboard"
      />
    </div>
  );
}
