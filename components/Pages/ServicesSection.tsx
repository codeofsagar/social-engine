"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight, Activity, Zap, BarChart3, CornerDownRight, Plus } from "lucide-react";       

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  { 
    num: "01", 
    title: "Strategy & Setup", 
    desc: "Full funnel infrastructure. We map the customer journey from first touch to lifetime value.",
    tags: ["Funnel Arch", "Pixel Setup", "CRM"]
  },
  { 
    num: "02", 
    title: "Creative Production", 
    desc: "High-velocity asset generation. Scroll-stopping video and copy designed to trigger impulse.",
    tags: ["Direct Response", "UGC", "Ad Copy"]
  },
  { 
    num: "03", 
    title: "Audience Targeting", 
    desc: "Sniper precision. Leveraging 1st-party data and AI modeling to isolate highest-value prospects.",
    tags: ["Lookalikes", "Retention", "LTV"]
  },
  { 
    num: "04", 
    title: "Optimization", 
    desc: "Algorithmic dominance. Daily bid adjustments and creative rotation to decrease CPA.",
    tags: ["A/B Testing", "Bid Mgmt", "Scale"]
  },
  { 
    num: "05", 
    title: "Tracking & Intel", 
    desc: "Radical transparency. Custom dashboards that reveal the truth behind every dollar spent.",
    tags: ["Hyros", "TripleWhale", "GA4"]
  },
];

const MARQUEE_ITEMS = [
    "Goal-Based Campaigns", 
    "Budget Friendly", 
    "Platform Expertise", 
    "Sales Driven", 
    "ROI Focused"
];

const fonts = {
  // Assuming these fonts are loaded in your layout file
  header: "'Zalando Sans', sans-serif", // Replace with a standard font if this isn't loaded, e.g., 'Arial Black'
  mono: "'IBM Plex Mono', monospace",
  body: "'Inter', sans-serif",
};

const gold = "#B9935B";

// Decorative Barcode Component
const Barcode = () => (
  <div className="flex gap-1 h-full items-end opacity-50">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="bg-black w-[2px]" style={{ height: `${Math.random() * 100}%` }}></div>
    ))}
  </div>
);

function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text Reveal Animation
    const titles = gsap.utils.toArray(".reveal-text") as HTMLElement[];
    titles.forEach((title) => {
      gsap.fromTo(
        title,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="services"
      className="bg-[#FFFBF6] text-black min-h-screen relative overflow-hidden selection:bg-black selection:text-[#B9935B]"
      style={{ fontFamily: fonts.body }}
    >
      {/* Background Noise Texture (Paper feel) - Lowest Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[0] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Decorative Blueprint Lines */}
      <div className="absolute left-6 lg:left-20 top-0 bottom-0 w-[1px] bg-black/10 z-0"></div>
      <div className="absolute right-6 lg:right-20 top-0 bottom-0 w-[1px] bg-black/10 z-0"></div>

      {/* --- Header Section --- */}
      {/* ADDED: relative and overflow-hidden here to contain the new background image */}
      <div className="relative border-b-2 border-black z-10 overflow-hidden">
         
         {/* === NEW HEADER BACKGROUND IMAGE START === */}
         {/* Using an abstract data/network image. Grayscale filter added to match style. */}
         <div 
            className="absolute inset-0 z-0 opacity-95 pointer-events-none backdrop-blur-md"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                filter: 'brightness(0.4) blur(2px)' 
            }}
         ></div>
         {/* === NEW HEADER BACKGROUND IMAGE END === */}

        <div className="pt-24 pb-16 px-6 lg:px-20 relative z-10">
            <div className="max-w-7xl mx-auto relative">
            
            {/* Top Info Bar */}
            <div className="flex justify-between items-end mb-12">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-black text-white px-2 py-1 w-max" style={{ fontFamily: fonts.mono }}>
                    Service_Manifest_V.2.0
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B9935B]" style={{ fontFamily: fonts.mono }}>
                    Status: Online
                    </span>
                </div>
                <div className="hidden md:block h-8">
                    <Barcode />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-7">
                <h2 className="text-[13vw] lg:text-[10vw] leading-[0.85] font-black uppercase text-white " style={{ fontFamily: fonts.header }}>
                    <div className="overflow-hidden"><div className="reveal-text">Scale</div></div>
                    <div className="overflow-hidden flex items-center gap-4">
                        <div className="reveal-text  text-[#B9935B]">Now</div>
                        <ArrowRight className="w-[8vw] h-[8vw] text-black -rotate-45 hidden lg:block" strokeWidth={3} />
                    </div>
                </h2>
                </div>
                <div className="lg:col-span-5 pb-4">
                <div className="bg-white/90 backdrop-blur-sm border border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
                    <Plus className="absolute -top-3 -left-3 bg-[#B9935B] text-black border border-black p-1 box-content" size={16} />
                    <p className="text-xl font-medium leading-tight mb-4">
                        High-impact creative meets <span className="underline decoration-[#B9935B] decoration-4 underline-offset-4">data-driven strategy.</span>
                    </p>
                    <p className="text-sm text-gray-500 font-mono">
                         We build campaigns that convert cold traffic into loyal brand evangelists.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>

      {/* --- Services List (Interactive Folder System) --- */}
      <div className="relative z-10 border-b-2 border-black bg-white">
        {SERVICES_DATA.map((service, index) => (
          <div
            key={index}
            // === FIX APPLIED HERE === 
            // Added 'overflow-hidden' to prevent the absolute hover background from bleeding out
            className="group relative border-t border-black/10 hover:border-black transition-colors duration-0 cursor-pointer overflow-hidden"
          >
            {/* INVERTED HOVER BACKGROUND */}
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-10 lg:py-16 flex flex-col md:flex-row gap-8 relative z-10 group-hover:text-white transition-colors duration-300">
              
              {/* Left: Number & Icon */}
              <div className="w-full md:w-1/4 flex items-start justify-between md:justify-start gap-4">
                  <span className="text-5xl lg:text-7xl font-black text-transparent [-webkit-text-stroke:1px_#ccc] group-hover:[-webkit-text-stroke:1px_#B9935B] group-hover:text-[#B9935B] transition-all duration-300" style={{ fontFamily: fonts.header }}>
                    {service.num}
                  </span>
                  <CornerDownRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#B9935B] mt-4" />
              </div>

              {/* Center: Content */}
              <div className="w-full md:w-1/2">
                  <h3 className="text-4xl lg:text-5xl font-black uppercase mb-4 leading-none" style={{ fontFamily: fonts.header }}>
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-600 group-hover:text-gray-300 font-medium max-w-sm transition-colors duration-300" style={{ fontFamily: fonts.body }}>
                    {service.desc}
                  </p>
              </div>

              {/* Right: Technical Tags (Barcode style) */}
              <div className="w-full md:w-1/4 flex flex-wrap content-start gap-2 md:justify-end">
                  {service.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase font-bold tracking-widest border border-black/20 group-hover:border-white/30 px-3 py-2 bg-[#FFFBF6] group-hover:bg-white/10 group-hover:text-white transition-colors" style={{ fontFamily: fonts.mono }}>
                          {tag}
                      </span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MARQUEE --- */}
      <div className="py-6 overflow-hidden bg-black text-[#FFFBF6] z-20 relative border-b-2 border-black">
        <style jsx>{`
          @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee-smooth { animation: marquee-scroll 20s linear infinite; will-change: transform; }
        `}</style>
        <div className="flex w-max animate-marquee-smooth">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <div key={i} className="flex items-center gap-8 pr-8">
                    <h2 className="text-2xl font-black uppercase tracking-wider" style={{ fontFamily: fonts.header }}>{item}</h2>
                    <div className="w-2 h-2 bg-[#B9935B] rotate-45"></div>
                </div>
            ))}
        </div>
      </div>

      {/* --- Footer / Dashboard --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel: Stats */}
        <div className="border-r border-black p-12 lg:p-24 flex flex-col justify-center bg-[#FFFBF6] relative">
              {/* Background decorative grid */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 flex flex-col gap-16">
                <div className="group cursor-default">
                    <div className="flex items-center gap-2 mb-2 text-black/50 group-hover:text-[#B9935B] transition-colors" style={{ fontFamily: fonts.mono }}>
                        <Zap size={14} /> <span className="text-xs uppercase tracking-widest">Efficiency Rating</span>
                    </div>
                    <span className="block text-8xl font-black text-black leading-none" style={{ fontFamily: fonts.header }}>90%</span>
                    <div className="h-2 w-full bg-black/5 mt-4 overflow-hidden">
                        <div className="h-full bg-[#B9935B] w-[90%]"></div>
                    </div>
                </div>
                <div className="group cursor-default">
                    <div className="flex items-center gap-2 mb-2 text-black/50 group-hover:text-[#B9935B] transition-colors" style={{ fontFamily: fonts.mono }}>
                        <BarChart3 size={14} /> <span className="text-xs uppercase tracking-widest">Conversion Delta</span>
                    </div>
                    <span className="block text-8xl font-black text-black leading-none" style={{ fontFamily: fonts.header }}>3.2x</span>
                      <div className="h-2 w-full bg-black/5 mt-4 overflow-hidden">
                        <div className="h-full bg-[#B9935B] w-[75%]"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Panel: CTA */}
        <div className="p-12 lg:p-24 flex flex-col justify-center items-center lg:items-start relative group bg-white overflow-hidden">
            {/* Hover Reveal Background - GOLD */}
            <div className="absolute inset-0 bg-[#B9935B] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
            
            <div className="absolute top-0 left-0 p-4 opacity-50 font-mono text-xs hidden lg:block group-hover:text-black transition-colors">
                   START_PROJECT_SEQUENCE
            </div>

            <div className="relative z-10">
                <h3 className="text-6xl lg:text-7xl font-black uppercase mb-8 transition-colors duration-300 group-hover:text-black leading-[0.9]" style={{ fontFamily: fonts.header }}>
                    Ready to <br/>Scale?
                </h3>
                
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-between w-full max-w-sm gap-6 px-8 py-6 border-2 border-black bg-white group-hover:bg-black transition-all duration-300 shadow-[8px_8px_0px_#000] group-hover:shadow-[4px_4px_0px_#fff] group-hover:translate-x-1 group-hover:translate-y-1"
                >
                    <span className="text-xl font-bold uppercase tracking-widest text-black group-hover:text-white" style={{ fontFamily: fonts.header }}>
                        Initiate Launch
                    </span>
                    <ArrowRight className="text-black group-hover:text-[#B9935B]" size={24} />
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;