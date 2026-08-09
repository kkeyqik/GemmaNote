import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Inter, Outfit } from "next/font/google";
import "../tailwind.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GemmaNote",
  description: "AI-powered text editor and blog generator",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider proxyUrl="https://gemma-note.vercel.app/__clerk">
      <html
        lang="en"
        className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
