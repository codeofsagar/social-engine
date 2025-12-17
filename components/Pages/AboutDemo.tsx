"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight, Target, Brain, Zap, Trophy, TrendingUp, Sparkles } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const fonts = {
  header: "'Kanit', sans-serif", 
  mono: "'IBM Plex Mono', monospace",
  body: "'Inter', sans-serif"
};

export function AboutDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    // Master timeline for orchestrated scroll-based reveals
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      }
    });

    // Parallax for layered backgrounds
    gsap.utils.toArray(".parallax-layer").forEach((layer: any, i) => {
      gsap.to(layer, {
        yPercent: -20 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Dynamic text morphing and reveals for hero
    gsap.utils.toArray(".hero-text").forEach((el: any, i) => {
      gsap.fromTo(el,
        { 
          clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)",
          opacity: 0,
          rotateX: -90
        },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          opacity: 1,
          rotateX: 0,
          duration: 1.8,
          delay: i * 0.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            scrub: false,
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Floating title distortion on scroll
    gsap.to(".distort-title", {
      skewX: 5,
      skewY: 2,
      yPercent: -5,
      ease: "none",
      scrollTrigger: {
        trigger: ".distort-title",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Text animations for paragraphs: word-by-word stagger reveal
    gsap.utils.toArray(".text-paragraph").forEach((para: any) => {
      const words = para.querySelectorAll("word");
      gsap.set(words, { display: "inline-block" });
      gsap.fromTo(words,
        { 
          y: 50, 
          opacity: 0, 
          rotationX: 90 
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: para,
            start: "top 85%"
          }
        }
      );
    });

    // Number counting for missions
    gsap.utils.toArray(".count-missions").forEach((el: any) => {
      gsap.fromTo(el,
        { textContent: 0 },
        {
          textContent: 500,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%"
          },
          snap: { textContent: 1 },
          onUpdate: function() {
            el.textContent = Math.floor(this.targets()[0].textContent);
          }
        }
      );
    });

    // Staggered reveals for execution paragraphs
    gsap.utils.toArray(".execution-paragraph").forEach((para: any, i) => {
      const words = para.querySelectorAll("word");
      gsap.set(words, { display: "inline-block" });
      gsap.fromTo(words,
        { 
          x: 30, 
          opacity: 0, 
          scale: 0.8 
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.03,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: para,
            start: "top 90%"
          }
        }
      );
    });

    // Particle burst on load
    gsap.from(".particle", {
      y: 200,
      opacity: 0,
      scale: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0F0F0F] text-white overflow-hidden py-16 lg:py-24"
      style={{ fontFamily: fonts.body }}
    >
      {/* Immersive Background Layers */}
      <div className="parallax-layer absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(185,147,91,0.1)_0%,_transparent_50%)]"></div>
      </div>
      <div className="parallax-layer absolute inset-0 overflow-hidden z-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBvcGFjaXR5PSIwLjEiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjYwIiB5Mj0iNjAiIHN0cm9rZT0iI0JOTDM1QiIgc3Ryb2tlLXdpZHRoPSIxIi8+PGxpbmUgeDE9IjYwIiB5MT0iMCIgeDI9IjAiIHkyPSI2MCIgc3Ryb2tlPSIjQk5OMzVCIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>
      <div className="parallax-layer absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-[#B9935B] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Content Canvas */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10 h-full">
        
        {/* Hero Block - Overlapping Titles */}
        <div className="hero-block relative mb-20 lg:mb-32 w-full lg:w-3/4 ml-auto">
          <div className="absolute -top-16 -right-16 lg:-right-32 w-48 h-48 bg-[#B9935B]/5 rounded-full blur-3xl"></div>
          <div className="flex flex-col items-end gap-3 mb-6">
            <span className="text-sm uppercase tracking-[0.3em] text-[#B9935B]/70 self-end" style={{ fontFamily: fonts.mono }}>
              Domination Protocol Activated
            </span>
            <div className="distort-title text-right">
              <h1 className="hero-text text-[11vw] lg:text-[7vw]  font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-[#B9935B] to-transparent" style={{ fontFamily: fonts.header }}>
                SOCIAL
             
                MEDIA
              </h1>
              <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-black leading-none -mt-2 text-[#B9935B] relative" style={{ fontFamily: fonts.header }}>
                DOMINATION
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-[#B9935B] to-transparent overflow-hidden">
                  <div className="w-full h-full bg-current animate-pulse"></div>
                </div>
              </h1>
              <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-black leading-none mt-1 text-white opacity-80" style={{ fontFamily: fonts.header }}>
                EXPERTS
              </h1>
            </div>
          </div>
          <p className="hero-text max-w-md text-base md:text-lg leading-relaxed text-white/80 ml-auto text-right">
            AP Agency: Toronto&apos;s vanguard in social warfare. Forged for velocity, precision, and unrelenting digital conquest.
          </p>
        </div>

        {/* Core Directive Section - Redesigned */}
        <div className="relative mb-16 lg:mb-24 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Column - Title and Stats */}
            <div className="lg:w-2/5">
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-0.5 bg-gradient-to-r from-[#B9935B] to-transparent"></div>
                  <span className="text-sm uppercase tracking-widest text-[#B9935B]" style={{ fontFamily: fonts.mono }}>Core Directive</span>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-[7vw] lg:text-[5vw] font-black uppercase mb-4 leading-tight text-white" style={{ fontFamily: fonts.header }}>
                    ATTENTION
                    <br />
                    <span className="text-[#B9935B]">IS CURRENCY</span>
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#B9935B] to-transparent mb-6"></div>
                  <p className="text-base text-white/70 leading-relaxed">
                    Seven cycles of tactical mastery. We architect campaigns that infiltrate feeds, hijack scrolls, and extract value.
                  </p>
                </div>

                {/* Stats in Cards */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#B9935B]/20 rounded-lg p-4">
                    <div className="text-3xl font-black text-[#B9935B] mb-1 flex items-baseline">
                      <span className="count-missions">0</span><span className="text-lg">+</span>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-white/50" style={{ fontFamily: fonts.mono }}>Missions</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#B9935B]/20 rounded-lg p-4">
                    <div className="text-3xl font-black text-[#B9935B] mb-1">3.2<span className="text-sm">x</span></div>
                    <p className="text-xs uppercase tracking-widest text-white/50" style={{ fontFamily: fonts.mono }}>ROI Avg</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Improved Paragraphs */}
            <div className="lg:w-3/5">
              <div className="space-y-6">
                {[
  {
    title: "Tactical Mastery",
    content: "Seven cycles of tactical mastery. We design campaigns that cut through feeds, capture attention, and convert viewers into advocates with precision."
  },
  {
    title: "Engineered Impact",
    content: "Legacy media is obsolete. We create high-impact content—viral, targeted, and measurable—that breaks through noise and delivers ROI."
  },
  {
    title: "Artifacts of Influence",
    content: "Not ads—artifacts of influence. We amplify brands, mobilize audiences, and spark movements that drive real, trackable growth."
  },
  {
    title: "Future-Proof Strategy",
    content: "We stay ahead of platform shifts and trends, delivering campaigns that perform today and position your brand for what’s next."
  }
]
.map((item, index) => (
                  <div 
                    key={index} 
                    className="text-paragraph bg-gradient-to-br from-[#1A1A1A]/50 to-transparent border-l-2 border-[#B9935B]/30 pl-6 py-4"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#B9935B] rounded-full"></span>
                      {item.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-base">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className=" pt-6 relative top-0 md:top-20 border-t border-white/10">
                  <Link 
              href="/about"
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
                 Read more
                 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
               </span>
            </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}