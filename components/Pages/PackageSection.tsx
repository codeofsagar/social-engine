"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight, Star, Plus, ShieldCheck, CheckCircle2, FileText, BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DELIVERABLES = [
  { 
    id: "01",
    title: "Funnel Architecture", 
    spec: "Meta / TikTok / Google",
    desc: "Complete campaign setup including pixel tracking, audience segmentation, and retargeting layers." 
  },
  { 
    id: "02",
    title: "Creative Production", 
    spec: "3-5 High-Fidelity Assets",
    desc: "We write, design, and edit high-converting ads. No stock footage fluff. Real direct response creative." 
  },
  { 
    id: "03",
    title: "Algorithmic Opt.", 
    spec: "Daily Bid Management",
    desc: "Manual and AI-assisted bid adjustments to ensure we are buying traffic at the lowest possible CPA." 
  },
  { 
    id: "04",
    title: "Live Reporting", 
    spec: "24/7 Dashboard Access",
    desc: "Total transparency. You see what we see. Ad spend, ROAS, and Lead Cost updated in real-time." 
  }
];

// FONT MAPPING CONSTANTS
const fonts = {
  header: "'Zalando Sans', sans-serif", // Display Headers (Black 900)
  mono: "'IBM Plex Mono', monospace",   // Technical/Console Text
  body: "'Inter', sans-serif",          // Readable Body Text
};

const gold = "#B9935B";

function PackageSection() {
  const container = useRef(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
  useGSAP(() => {
    // 1. Line Separator Animation
    gsap.utils.toArray(".divider-line").forEach((line: any) => {
        gsap.fromTo(line, 
            { scaleX: 0, transformOrigin: "left" },
            { 
                scaleX: 1, 
                duration: 1.5, 
                ease: "expo.out",
                scrollTrigger: {
                    trigger: line,
                    start: "top 85%"
                }
            }
        );
    });

    // 2. Text Reveal
    const items = gsap.utils.toArray(".spec-item");
    gsap.fromTo(items, 
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".specs-container",
                start: "top 80%"
            }
        }
    );

    // 3. Guarantee Seal Rotation
    gsap.to(".seal-text", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear"
    });

  }, { scope: container });

  return (
    <section
      ref={container}
      id="packages"
      className="relative min-h-screen bg-[#FFFBF6] text-black py-24 lg:py-32 px-4 lg:px-12 overflow-hidden selection:bg-black selection:text-[#B9935B]"
      style={{ fontFamily: fonts.body }} 
    >
      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[0] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-24 relative">
            <div className="flex items-center gap-3 mb-6">
                <span 
                  className="text-xs uppercase font-bold tracking-widest bg-black text-[#B9935B] px-3 py-1 border border-black shadow-[4px_4px_0px_#B9935B]" 
                  style={{ fontFamily: fonts.mono }}
                >
                    Commercial_Offer_2025
                </span>
                <span 
                  className="text-xs uppercase tracking-widest text-[#B9935B] border border-[#B9935B] px-2 py-1 flex items-center gap-2"
                  style={{ fontFamily: fonts.mono }}
                >
                    <BadgeCheck size={12} /> Verified
                </span>
            </div>
            
            <h2 
                className="text-[10vw] lg:text-[7vw] font-black uppercase mb-12 mix-blend-darken leading-[0.9]"
                style={{ fontFamily: fonts.header }}
            >
                The <span className="text-transparent [-webkit-text-stroke:2px_black] hover:text-[#B9935B] hover:[-webkit-text-stroke:0px] transition-all duration-500">Growth</span><br/>
                Protocol
            </h2>
            
            {/* Gold Divider */}
            <div className="w-full h-[4px] bg-black divider-line origin-left relative">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-[#B9935B]"></div>
            </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* LEFT: THE SPECS (Interactive List) */}
            <div className="lg:col-span-8 specs-container z-20">
                {DELIVERABLES.map((item, index) => (
                    <div 
                        key={index}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className="spec-item group relative border-b border-black/10 py-10 px-4 transition-all duration-300 hover:pl-6 md:hover:pl-10 cursor-default"
                    >
                        {/* Hover Background (Solid Gold Strip) */}
                        <div className={`absolute inset-0 bg-[#B9935B]/10 transition-opacity duration-300 pointer-events-none ${hoveredRow === index ? 'opacity-100' : 'opacity-0'}`}></div>
                        
                        {/* Interactive Left Border */}
                        <div className={`absolute top-0 left-0 h-full w-[6px] bg-[#B9935B] transition-transform duration-300 origin-top ${hoveredRow === index ? 'scale-y-100' : 'scale-y-0'}`}></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                            {/* ID -> MONO */}
                            <span 
                                className={`text-sm transition-colors duration-300 mt-2 ${hoveredRow === index ? 'text-[#B9935B] font-bold' : 'text-gray-400'}`}
                                style={{ fontFamily: fonts.mono }}
                            >
                                / {item.id}
                            </span>
                            
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                    {/* TITLE -> ZALANDO */}
                                    <h3 
                                        className="text-3xl md:text-4xl font-black uppercase transition-colors leading-none duration-300 group-hover:text-[#B9935B]"
                                        style={{ fontFamily: fonts.header }}
                                    >
                                        {item.title}
                                    </h3>
                                    
                                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                                        <Plus size={12} className={`text-[#B9935B] transition-opacity ${hoveredRow === index ? 'opacity-100' : 'opacity-0'}`} />
                                        {/* SPEC TAG -> MONO */}
                                        <span 
                                            className="text-[10px] md:text-xs uppercase bg-black text-[#FFFBF6] px-3 py-1 tracking-wider"
                                            style={{ fontFamily: fonts.mono }}
                                        >
                                            {item.spec}
                                        </span>
                                    </div>
                                </div>
                                {/* DESC -> INTER */}
                                <p 
                                    className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed font-medium group-hover:text-black transition-colors"
                                    style={{ fontFamily: fonts.body }}
                                >
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT: THE INVESTMENT (Sticky Black Card) */}
            <div className="lg:col-span-4 mt-8 lg:mt-0 z-30">
                <div className="sticky top-12">
                    
                    {/* BLACK OPS CARD */}
                    <div className="bg-[#050505] text-[#FFFBF6] relative group shadow-[20px_20px_0px_0px_#B9935B] transition-transform duration-300 hover:-translate-y-2 border border-black">
                        
                        {/* Decorative Screws */}
                        <div className="absolute top-3 left-3 w-2 h-2 rounded-full border border-white/20 flex items-center justify-center"><div className="w-1 h-[1px] bg-white/20 rotate-45"></div></div>
                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full border-white/20 flex items-center justify-center"><div className="w-1 h-[1px] bg-white/20 rotate-45"></div></div>
                        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full border-white/20 flex items-center justify-center"><div className="w-1 h-[1px] bg-white/20 rotate-45"></div></div>
                        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full border-white/20 flex items-center justify-center"><div className="w-1 h-[1px] bg-white/20 rotate-45"></div></div>

                        {/* Inner Content */}
                        <div className="p-8 lg:p-10 relative z-20">
                            
                            {/* Header */}
                            <div className="flex justify-between items-start mb-12 relative z-30 border-b border-white/10 pb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <FileText size={14} className="text-[#B9935B]" />
                                        {/* LABEL -> MONO */}
                                        <p className="text-xs text-[#B9935B] uppercase tracking-widest" style={{ fontFamily: fonts.mono }}>
                                            Monthly Retainer
                                        </p>
                                    </div>
                                    {/* TITLE -> ZALANDO */}
                                    <h4 
                                        className="text-xl md:text-2xl font-black uppercase text-white"
                                        style={{ fontFamily: fonts.header }}
                                    >
                                        Standard Access
                                    </h4>
                                </div>
                                <Star className="text-[#B9935B] fill-[#B9935B] animate-pulse" />
                            </div>

                            {/* Price Section */}
                            <div className="mb-12 relative z-30">
                                <div className="flex items-baseline gap-2 flex-wrap">
                                    {/* PRICE -> ZALANDO */}
                                    <span 
                                        className="text-6xl lg:text-7xl font-black text-white leading-none"
                                        style={{ fontFamily: fonts.header }}
                                    >
                                        $1,500
                                    </span>
                                    {/* UNIT -> MONO */}
                                    <span className="text-gray-400 text-sm" style={{ fontFamily: fonts.mono }}>/mo</span>
                                </div>
                                {/* DISCLAIMER -> MONO */}
                                <p className="text-sm text-gray-300 mt-6 pl-4 border-l-2 border-[#B9935B] leading-relaxed" style={{ fontFamily: fonts.mono }}>
                                    + Ad Spend (Paid to Platform)
                                    <br/><span className="text-[#B9935B]">Zero Hidden Fees.</span>
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="relative z-30">
                                <Link 
                                    href="/contact" 
                                    className="w-full bg-[#B9935B] text-black h-16 flex items-center justify-center gap-4 font-black uppercase tracking-widest hover:bg-white transition-all duration-300 group/btn border-2 border-[#B9935B] hover:border-white"
                                    style={{ fontFamily: fonts.header }}
                                >
                                    Start Protocol
                                    <ArrowRight className="group-hover/btn:translate-x-1 transition-transform"/>
                                </Link>
                                <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
                                    <CheckCircle2 size={12} />
                                    {/* POLICY -> MONO */}
                                    <p className="text-[10px] text-center uppercase tracking-widest" style={{ fontFamily: fonts.mono }}>
                                        30-Day Cancellation Policy
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Guarantee Section (Stamped Look) */}
                    <div className="mt-8 flex flex-col md:flex-row items-center gap-6 border-l-4 border-[#B9935B] pl-6 py-4 bg-[#B9935B]/10 backdrop-blur-sm">
                        
                        {/* THE SEAL */}
                        <div className="relative w-20 h-20 flex-shrink-0 hidden md:block">
                             <div className="seal-text w-full h-full absolute inset-0">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent"/>
                                    {/* SEAL TEXT -> MONO */}
                                    <text className="text-[14px] font-bold uppercase fill-[#B9935B]" style={{ fontFamily: fonts.mono }}>
                                        <textPath href="#curve">
                                            • Guarantee • Verified •
                                        </textPath>
                                    </text>
                                </svg>
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <ShieldCheck size={24} className="text-[#B9935B]" />
                             </div>
                        </div>

                        <div>
                            {/* TITLE -> ZALANDO */}
                            <h5 
                                className="font-black uppercase mb-2 text-sm text-[#B9935B]"
                                style={{ fontFamily: fonts.header }}
                            >
                                The 30-Day Promise
                            </h5>
                            {/* DESC -> INTER */}
                            <p className="text-sm text-black leading-relaxed font-medium" style={{ fontFamily: fonts.body }}>
                                If we don&apos;t generate at least <strong>10 Qualified Leads</strong> in the first 30 days, we work for free until we do.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </section>
  );
}

export default PackageSection;