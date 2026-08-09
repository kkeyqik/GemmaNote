export const metadata = {
  title: "GemmaNote",
  description: "AI-powered text editor and blog generator",
};

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-full flex flex-col">{children}</div>;
}
