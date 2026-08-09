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
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_cmVsaWV2ZWQtamF5YmlyZC0zMy5jbGVyay5hY2NvdW50cy5kZXYk"}>
      <html
        lang="en"
        className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
