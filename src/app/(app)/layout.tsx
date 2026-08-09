import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "GemmaNote",
  description: "AI-powered text editor and blog generator",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full flex flex-col">{children}</div>;
}

