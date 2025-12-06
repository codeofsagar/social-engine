"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight, Star, Plus, ShieldCheck } from 'lucide-react';

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
      className="relative min-h-screen bg-[#FFFBF6] text-black py-24 lg:py-32 px-4 lg:px-12 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-24 relative">
            <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-[#B9935B] rounded-full animate-pulse"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#B9935B]">
                    Commercial Offer // 2025
                </span>
            </div>
            
            <h2 
                className="text-[11vw] lg:text-[10vw] leading-[1] font-black uppercase tracking-tighter mb-12 mix-blend-darken"
                style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
            >
                The <span className="text-transparent [-webkit-text-stroke:1px_black] hover:text-[#B9935B] transition-colors duration-500">Growth</span><br/>
                Protocol
            </h2>
            
            {/* Gold Divider */}
            <div className="w-full h-[2px] bg-black divider-line origin-left"></div>
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
                        className="spec-item group relative border-b border-black/10 py-12 px-4 transition-all duration-300 hover:pl-6 md:hover:pl-10 cursor-default bg-transparent"
                    >
                        {/* Hover Background (Subtle Gold) */}
                        <div className={`absolute inset-0 bg-[#B9935B]/5 transition-opacity duration-300 pointer-events-none ${hoveredRow === index ? 'opacity-100' : 'opacity-0'}`}></div>
                        
                        {/* Interactive Left Border */}
                        <div className={`absolute top-0 left-0 h-full w-[4px] bg-[#B9935B] transition-transform duration-300 origin-top ${hoveredRow === index ? 'scale-y-100' : 'scale-y-0'}`}></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12">
                            <span className={`font-mono text-sm transition-colors duration-300 ${hoveredRow === index ? 'text-[#B9935B] font-bold' : 'text-gray-400'}`}>
                                / {item.id}
                            </span>
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                    <h3 
                                        className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-[#B9935B] leading-none"
                                        style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                                        <Plus size={12} className={`text-[#B9935B] transition-opacity ${hoveredRow === index ? 'opacity-100' : 'opacity-0'}`} />
                                        <span className="font-mono text-[10px] md:text-xs uppercase bg-black text-[#FFFBF6] px-2 py-1">
                                            {item.spec}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed">
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
                    
                    {/* BLACK CARD */}
                    <div className="bg-[#050505] text-[#FFFBF6] relative group shadow-[15px_15px_0px_0px_#B9935B] transition-transform duration-300 hover:-translate-y-2">
                        
                        {/* Inner Content */}
                        <div className="p-8 lg:p-10 relative z-20">
                            
                            {/* Header */}
                            <div className="flex justify-between items-start mb-16 relative z-30">
                                <div>
                                    <p className="font-mono text-xs text-[#B9935B] uppercase tracking-widest mb-3">Monthly Retainer</p>
                                    <h4 
                                        className="text-lg md:text-xl font-bold uppercase text-white"
                                        style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                                    >
                                        Standard Access
                                    </h4>
                                </div>
                                <Star className="text-[#B9935B] fill-[#B9935B] animate-pulse" />
                            </div>

                            {/* Price Section */}
                            <div className="mb-12 relative z-30">
                                <div className="flex items-baseline gap-2 flex-wrap">
                                    <span 
                                        className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white"
                                        style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                                    >
                                        $1,500
                                    </span>
                                    <span className="text-gray-400 font-mono">/mo</span>
                                </div>
                                <p className="text-sm text-gray-300 mt-4 pl-4 border-l-2 border-[#B9935B] leading-relaxed">
                                    + Ad Spend (Paid to Platform)
                                    <br/>Zero Hidden Fees.
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="relative z-30">
                                <Link 
                                    href="/contact" 
                                    className="w-full bg-[#FFFBF6] text-black h-16 flex items-center justify-center gap-4 font-bold uppercase tracking-widest hover:bg-[#B9935B] hover:text-white transition-all duration-300 group/btn"
                                    style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                                >
                                    Start Protocol
                                    <ArrowRight className="group-hover/btn:translate-x-1 transition-transform"/>
                                </Link>
                                <p className="text-xs text-gray-400 mt-4 text-center font-mono">
                                    30-Day Cancellation Policy
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Guarantee Section (Moved Outside Card) */}
                    <div className="mt-8 flex flex-col md:flex-row items-start gap-6 border-l-4 border-[#B9935B] pl-6 py-4 bg-[#B9935B]/5">
                        
                        {/* THE SEAL */}
                        <div className="relative w-20 h-20 flex-shrink-0 hidden md:block">
                             <div className="seal-text w-full h-full absolute inset-0">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent"/>
                                    <text className="text-[14px] font-mono font-bold uppercase fill-[#B9935B] tracking-[0.15em]">
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
                            <h5 
                                className="font-bold uppercase mb-2 text-xs md:text-sm text-[#B9935B]"
                                style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                            >
                                The 30-Day Promise
                            </h5>
                            <p className="text-sm text-black leading-relaxed font-medium">
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