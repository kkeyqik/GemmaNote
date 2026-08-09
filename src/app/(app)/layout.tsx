import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GemmaNote",
  description: "AI-powered text editor and blog generator",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

