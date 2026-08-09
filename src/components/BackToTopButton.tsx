"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;
    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.7,
        y: 20,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.85 },
        { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" }
      );
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      aria-label="Back to Top"
      className="fixed bottom-8 right-8 z-50 p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/40 border border-white/30 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300 hover:shadow-indigo-500/60 hover:-translate-y-1 group"
    >
      <ArrowUp size={20} className="transform transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
