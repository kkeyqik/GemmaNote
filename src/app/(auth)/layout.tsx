export const metadata = {
  title: "Login - GemmaNote",
  description: "Sign in to your GemmaNote account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-indigo-500/30 min-h-full">
      {children}
    </div>
  );
}
