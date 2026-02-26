"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA only after scrolling down 100vh (approx the Hero height)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Check initial position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fonts = {
    mono: "'IBM Plex Mono', monospace",
  };

  return (
    <>
      <Link 
        href="/contact"
        className={`group fixed bottom-6 left-6 z-[60] inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#B9935B] text-black overflow-hidden shadow-[0_0_30px_rgba(185,147,91,0.3)] hover:shadow-[0_0_50px_rgba(185,147,91,0.6)] hover:scale-105 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-12 opacity-0 pointer-events-none'}`}
      >
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
         {/* Using the same shimmer animation class as the Hero button */}
         <div className="absolute inset-0 -translate-x-full group-hover:animate-none animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10" />
         <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />

         <span 
           className="relative z-20 font-[700] text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-2"
           style={{ fontFamily: fonts.mono }} 
         >
           Start Project
           <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
         </span>
      </Link>
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          50%, 100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
    </>
  );
}
