import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f6fa] dark:bg-[#0d1117]">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-indigo-500 hover:bg-indigo-600 text-sm normal-case',
            card: 'shadow-xl border border-slate-100 rounded-2xl'
          }
        }}
      />
    </div>
  );
}
