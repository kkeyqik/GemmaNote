import React from "react";
import "../tailwind.css"; // Using tailwind.css to maintain self-dependent styling isolated from app/admin

import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: "Login - GemmaNote",
  description: "Sign in to your GemmaNote account",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_cmVsaWV2ZWQtamF5YmlyZC0zMy5jbGVyay5hY2NvdW50cy5kZXYk"}>
      <html lang="en">
        <body className="bg-white text-slate-900 font-sans selection:bg-indigo-500/30">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
