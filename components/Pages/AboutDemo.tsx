"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const fonts = {
  header: "'Kanit', sans-serif",
  mono: "'IBM Plex Mono', monospace",
  body: "'Inter', sans-serif"
};

export function AboutDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // Clean reveal for the centered content
    tl.from(".reveal-item", {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power4.out"
    });

    // Subtle particle floating effect
    gsap.to(".particle", {
      y: -100,
      opacity: 0.2,
      duration: "random(3, 6)",
      repeat: -1,
      stagger: 0.2,
      ease: "none"
    });
  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-white overflow-hidden py-24 lg:py-32"
      style={{ fontFamily: fonts.body }}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(185,147,91,0.08)_0%,_transparent_70%)]"></div>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-[#B9935B] rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `110%`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="reveal-item mb-8">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#B9935B] mb-4 block" style={{ fontFamily: fonts.mono }}>
               VANGUARD PROTOCOL
            </span>
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
              style={{ fontFamily: fonts.header }}
            >
              <span className="text-white">SOCIAL MEDIA</span>
              <br />
              <span className="text-[#B9935B]">EXPERTS</span>
            </h2>
          </div>

          {/* Short Paragraph Section */}
          <div className="reveal-item mb-12">
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl font-light">
              AP Agency: Toronto&apos;s vanguard in social warfare. Forged for <span className="text-[#B9935B] font-medium">velocity</span>, <span className="text-white font-medium">precision</span>, and unrelenting digital conquest.
            </p>
          </div>

          {/* Read More Button */}
          <div className="reveal-item">
            <Link 
              href="/about"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#B9935B] text-black overflow-hidden hover:scale-105 hover:shadow-[0_0_50px_rgba(185,147,91,0.4)] transition-all duration-300"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
              
              {/* Interaction Layer */}
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />

              <span 
                className="relative z-20 text-sm uppercase tracking-widest flex items-center gap-3"
                style={{ fontFamily: fonts.body, fontWeight: 700 }} 
              >
                Read more
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </span>
            </Link>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}