"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Globe, Wifi, Cpu, Activity, Lock, Zap } from "lucide-react";

function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Move Effect for Spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. HUD Elements Entrance
    tl.from(".hud-item", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.1
    })
    // 2. Main Title Stagger
    .from(".hero-line", {
      yPercent: 100,
      opacity: 0,
      rotateX: 10,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out",
    }, "-=0.5")
    // 3. Subtext & Button
    .from(".hero-fade-up", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
    }, "-=0.8");

  }, { scope: container });

  const fonts = {
    header: "'Kanit', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    body: "'Inter', sans-serif",
  };

  return (
    <section
      ref={container}
      className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-[#050505] cursor-crosshair"
    >
      {/* =========================================
          1. BACKGROUND LAYERS
      ========================================= */}
      
      {/* A. Video Background */}
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen">
        <video
          className="w-full h-full object-cover  "
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/herovideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* B. Dynamic Grid Spotlight (Follows Mouse) */}
      <div 
        className="absolute inset-0 z-1 pointer-events-none opacity-40"
        style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(185, 147, 91, 0.15), transparent 40%)`
        }}
      ></div>
      
      {/* C. Technical Grid Lines (Revealed by Spotlight) */}
      <div 
        className="absolute inset-0 z-1 pointer-events-none opacity-[0.07]"
        style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, black, transparent)`
        }}
      ></div>

     

     
      
     

      {/* CORNER 3: Bottom Left (Encryption/Ping) */}
      <div className="hud-item absolute bottom-12 left-6 md:bottom-16 md:left-12 hidden md:flex flex-col gap-2 z-30 opacity-80">
         <div className="flex items-center gap-3 text-white" style={{ fontFamily: fonts.mono }}>
             <Zap size={18} className="text-[#B9935B]" />
             <span className="text-xs md:text-sm font-bold tracking-widest">PWR_LEVEL: OPTIMAL</span>
         </div>
         <div className="h-[1px] w-32 bg-white/20"></div>
         <span className="text-xs text-gray-400 font-mono">PING: 14ms // P2P_READY</span>
      </div>

      {/* CORNER 4: Bottom Right (Global Reach) */}
      <div className="hud-item absolute bottom-12 right-6 md:bottom-16 md:right-12 hidden md:flex items-center gap-3 z-30 opacity-80">
         <div className="flex flex-col items-end mr-2">
            <span className="text-xs md:text-sm text-[#B9935B] font-bold tracking-widest font-mono">GLOBAL_REACH</span>
            <span className="text-[10px] text-gray-500 font-mono">NODES_CONNECTED</span>
         </div>
         <Globe size={32} className="text-white animate-[spin_10s_linear_infinite] opacity-50" strokeWidth={1} />
      </div>

      {/* Decorative Corner Brackets (Visual Framing) */}
      <div className="absolute top-12 left-4 md:left-8 w-6 h-6 border-l-2 border-t-2 border-[#B9935B]/40 z-20 hidden md:block"></div>
      <div className="absolute top-12 right-4 md:right-8 w-6 h-6 border-r-2 border-t-2 border-[#B9935B]/40 z-20 hidden md:block"></div>
      <div className="absolute bottom-12 left-4 md:left-8 w-6 h-6 border-l-2 border-b-2 border-[#B9935B]/40 z-20 hidden md:block"></div>
      <div className="absolute bottom-12 right-4 md:right-8 w-6 h-6 border-r-2 border-b-2 border-[#B9935B]/40 z-20 hidden md:block"></div>


      {/* =========================================
          3. MAIN CONTENT LAYER
      ========================================= */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col items-center text-center mt-16">
        
        {/* Badge / Console Text */}
        <div className="hero-badge mb-1 inline-flex items-center gap-3 px-4 py-1.5 bg-black/40 border border-[#B9935B]/30 backdrop-blur-md rounded-full">
             <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B9935B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B9935B]"></span>
             </div>
             <span className="text-[10px] md:text-xs text-white uppercase tracking-[0.2em] font-medium" style={{ fontFamily: fonts.mono }}>
                Agency System Online
             </span>
        </div>

        {/* Cinematic Headline */}
        <div className="max-w-6xl mx-auto w-full ">
            <h1 
              className="flex flex-col items-center justify-center tracking-tighter leading-[0.9]"
              style={{ fontFamily: fonts.header, fontWeight: 900 }}
            >
              {/* LINE 1 */}
              <div className="overflow-hidden">
                <span className="hero-line block text-white text-[11vw] lg:text-[7vw] mix-blend-difference">
                  STOP WASTING
                </span>
              </div>
              
              {/* LINE 2: GOLD & GLOWING */}
              <div className="overflow-hidden relative z-10">
                  <span className="hero-line block text-[#B9935B] text-[11vw] lg:text-[7vw] drop-shadow-[0_0_50px_rgba(185,147,91,0.5)]">
                    MONEY ON
                  </span>
                  {/* Subtle line strike-through effect or underline decoration */}
                  <div className="hero-fade-up h-[2px] w-[60%] bg-[#B9935B] mx-auto mt-2 opacity-50 shadow-[0_0_10px_#B9935B]"></div>
              </div>

              {/* LINE 3 */}
              <div className="overflow-hidden">
                  <span className="hero-line block text-transparent text-[11vw] lg:text-[7vw] text-white hover:text-white transition-colors duration-500">
                    BAD MARKETING
                  </span>
              </div>
            </h1>
        </div>

        {/* Description */}
        <p 
            className="hero-fade-up text-sm md:text-lg text-gray-400 max-w-[90%] md:max-w-2xl leading-relaxed mb-12 border-l-2 border-[#B9935B] pl-6 md:pl-0 md:border-l-0 md:border-t border-white/10 md:pt-8"
            style={{ fontFamily: fonts.body }}
        >
          We combine cinematic visuals with data-driven strategies to convert your ad spend into measurable profit, <span className="text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-white/5 px-1">using state-of-the-art AI tools</span> to enhance every step of the process.
        </p>

        {/* Main CTA - Enhanced Animation */}
        <div className="hero-fade-up flex flex-col items-center gap-4">
            <Link 
              href="/contact"
              className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#B9935B] text-black overflow-hidden hover:scale-105 hover:shadow-[0_0_50px_rgba(185,147,91,0.6)] shadow-[0_0_30px_rgba(185,147,91,0.3)] transition-all duration-300"
            >
               {/* Scanline Effect on Button */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>

               {/* Shimmer Effect */}
               <div className="absolute inset-0 -translate-x-full group-hover:animate-none animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10" />
               
               {/* Hover Fill Effect */}
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />

               <span 
                 className="relative z-20 font-black text-sm md:text-base uppercase tracking-[0.2em] flex items-center gap-4"
                 style={{ fontFamily: fonts.mono }} 
               >
                 Initiate Launch
                 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
               </span>
            </Link>

            {/* Tiny text under button */}
            <div className="flex items-center gap-2 opacity-50 text-[10px] font-mono text-[#B9935B]">
                <Activity size={10} />
                <span>SYSTEM_READY</span>
            </div>
        </div>

      </div>

      {/* Tailwind Custom Keyframes for Shimmer */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          50%, 100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;