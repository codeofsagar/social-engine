"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Link from "next/link";

// Mock images
const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2340&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2306&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
];

const SERVICES_DATA = [
  { num: "01", title: "Strategy & Setup", desc: "Full funnel approach designed for maximum ROI." },
  { num: "02", title: "Creative Production", desc: "Scroll-stopping video and high-converting graphics." },
  { num: "03", title: "Audience Targeting", desc: "Precision targeting using 1st-party data and AI." },
  { num: "04", title: "Optimization", desc: "Daily adjustments to decrease CPA and scale." },
  { num: "05", title: "Tracking", desc: "Transparent reporting with actionable insights." },
];

const MARQUEE_ITEMS = [
    "Goal-Based Campaigns",
    "Budget Friendly",
    "Platform Expertise",
    "Sales Driven",
    "ROI Focused"
];

function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorImgRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Text Reveal Animation
    const titles = gsap.utils.toArray(".reveal-text") as HTMLElement[];
    titles.forEach((title) => {
      gsap.fromTo(
        title,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
          },
        }
      );
    });

    // 2. Mouse Follower
    const xTo = gsap.quickTo(cursorImgRef.current, "left", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursorImgRef.current, "top", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX + 20);
      yTo(e.clientY - 50);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef });

  const handleMouseEnter = (index: number) => {
    setActiveImage(SERVICE_IMAGES[index % SERVICE_IMAGES.length]);
    gsap.to(cursorImgRef.current, { scale: 1, opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(cursorImgRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <section
      ref={containerRef}
      className="bg-[#FFFBF6] text-black min-h-screen relative overflow-hidden font-sans selection:bg-black selection:text-[#B9935B]"
    >
      {/* Inject CSS Keyframes locally for this component */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-smooth {
          animation: marquee-scroll 20s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Floating Image Cursor */}
      <div
        ref={cursorImgRef}
        className="fixed pointer-events-none z-50 w-[320px] h-[220px] rounded-lg overflow-hidden hidden lg:block opacity-0 scale-0 origin-center border-2 border-black bg-white"
        style={{ top: 0, left: 0 }}
      >
        {activeImage && (
          <img
            src={activeImage}
            alt="Service Preview"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* --- Header Section --- */}
      <div className="pt-24 pb-12 px-6 lg:px-20 border-b border-black/10">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex justify-between text-[10px] uppercase tracking-widest font-mono mb-8 opacity-60">
             <span>Mission Status: Ready</span>
             <span>Initiate Launch</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h2 className="text-[13vw] lg:text-[10vw] leading-[0.8] font-black tracking-tighter uppercase text-black">
                <div className="overflow-hidden"><div className="reveal-text">Scale</div></div>
                <div className="overflow-hidden"><div className="reveal-text text-[#B9935B]">Now</div></div>
              </h2>
            </div>
            <div className="pb-4">
              <p className="text-xl lg:text-2xl font-medium leading-relaxed reveal-text max-w-md ml-auto text-black">
                We build campaigns that convert. <br/>
                <span className="text-gray-500">High-impact creative meets data-driven strategy.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Services List --- */}
      <div className="hidden lg:block">
        {SERVICES_DATA.map((service, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="group relative border-b border-black/10 transition-all duration-300 hover:bg-[#B9935B] cursor-pointer"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 flex items-center justify-between">
              <div className="flex items-baseline gap-12">
                <span className="text-sm font-mono text-[#B9935B] group-hover:text-black transition-colors border border-[#B9935B] group-hover:border-black rounded-full px-3 py-1">
                  {service.num}
                </span>
                <h3 className="text-6xl font-bold uppercase tracking-tight text-black">
                  {service.title}
                </h3>
              </div>
              <p className="text-lg text-gray-500 group-hover:text-black max-w-xs font-medium transition-colors translate-x-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 duration-500">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="block lg:hidden px-4 py-12">
        <div className="grid grid-cols-1 gap-8">
            {SERVICES_DATA.map((service, index) => (
                <div key={index} className="flex flex-col border-t border-black pt-6">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-5xl font-bold text-[#B9935B] opacity-40">{service.num}</span>
                        <div className="w-8 h-8 rounded-full bg-[#B9935B] flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="black" strokeWidth="2"/>
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black uppercase mb-3 leading-none">{service.title}</h3>
                    <p className="text-base font-medium opacity-70 leading-normal">{service.desc}</p>
                </div>
            ))}
        </div>
      </div>

      {/* --- PURE CSS MARQUEE (NO JS) --- */}
      <div className="py-24 overflow-hidden bg-black text-[#FFFBF6]">
        {/* The class 'animate-marquee-smooth' uses the CSS keyframe defined above */}
        <div className="flex w-max animate-marquee-smooth">
            
            {/* Set 1 */}
            <div className="flex items-center gap-12 pr-12">
                {MARQUEE_ITEMS.map((item, i) => (
                    <div key={`a-${i}`} className="flex items-center gap-12">
                        <h2 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter shrink-0">
                            {item}
                        </h2>
                        <span className="w-4 h-4 lg:w-8 lg:h-8 rounded-full bg-[#B9935B] shrink-0 block"></span>
                    </div>
                ))}
            </div>
            
            {/* Set 2 (Duplicate) */}
            <div className="flex items-center gap-12 pr-12">
                {MARQUEE_ITEMS.map((item, i) => (
                    <div key={`b-${i}`} className="flex items-center gap-12">
                        <h2 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter shrink-0">
                            {item}
                        </h2>
                        <span className="w-4 h-4 lg:w-8 lg:h-8 rounded-full bg-[#B9935B] shrink-0 block"></span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* --- Footer / Stats --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-r border-black/10 p-12 lg:p-24 flex flex-col justify-center bg-white">
            <div className="mb-12">
                <span className="block text-7xl lg:text-8xl font-black text-black mb-2">90%</span>
                <span className="text-[#B9935B] font-bold uppercase tracking-widest">Higher Engagement</span>
            </div>
            <div>
                <span className="block text-7xl lg:text-8xl font-black text-black mb-2">3.2x</span>
                <span className="text-[#B9935B] font-bold uppercase tracking-widest">Conversion Rate</span>
            </div>
        </div>
        <div className="p-12 lg:p-24 flex flex-col justify-center items-center lg:items-start relative group bg-[#FFFBF6] overflow-hidden">
            <div className="absolute inset-0 bg-[#B9935B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <h3 className="text-4xl lg:text-6xl font-black uppercase mb-8 relative z-10 transition-colors duration-300 group-hover:text-black">
                Ready to Scale?
            </h3>
            <Link
                href="/contact"
                className="relative z-10 inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest border-2 border-black px-10 py-5 group-hover:bg-black group-hover:text-[#B9935B] transition-colors duration-300"
            >
                Start Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;