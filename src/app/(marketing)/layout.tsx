import type { Metadata } from "next";
import "../tailwind.css";

export const metadata: Metadata = {
  title: "GemmaNote",
  description: "AI-powered text editor and blog generator",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full flex flex-col">{children}</div>;
}
