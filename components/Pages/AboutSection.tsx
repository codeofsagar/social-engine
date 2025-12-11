"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { ArrowRight, Target, Lock, Disc, FastForward, Crosshair, Cpu, Activity, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: "01",
    label: "PHASE ONE",
    sub: "RECONNAISSANCE",
    title: "Diagnostic",
    desc: "We don't guess. We audit your entire funnel, identifying exactly where money is leaking.",
    tags: ["Audit", "Data Analysis", "Recon"],
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "02",
    label: "PHASE TWO",
    sub: "INFRASTRUCTURE",
    title: "Construction",
    desc: "Building the creative assets and landing page architecture required for high-conversion velocity.",
    tags: ["Creative", "Copywriting", "Dev"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "03",
    label: "PHASE THREE",
    sub: "DOMINATION",
    title: "Velocity",
    desc: "Launch and rapid iteration. We scale budgets only when ROAS targets are met and sustained.",
    tags: ["Media Buying", "Scaling", "ROI"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1470&q=80",
  },
];

// Reusable "Corner Bracket" component
const CornerBrackets = ({ color = "#B9935B" }) => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: color }}></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: color }}></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: color }}></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: color }}></div>
  </>
);

function AboutSection() {
  const container = useRef<HTMLElement>(null);
  const scrollSection = useRef<HTMLDivElement>(null);
  const scrollTrack = useRef<HTMLDivElement>(null);

  const handleSkip = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    } else {
       if(scrollSection.current) {
         window.scrollTo({ top: scrollSection.current.offsetTop + scrollSection.current.offsetHeight, behavior: "smooth" });
      }
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: "#about-hero-text", start: "top 80%" },
      });
      tl.from(".about-line", {
        y: 100, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const track = scrollTrack.current;
        const section = scrollSection.current;
        if (track && section) {
          const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              end: () => "+=" + (track.scrollWidth - window.innerWidth),
            },
          });
        }
      });
    },
    { scope: container }
  );

  const fonts = {
    header: "'Zalando Sans', sans-serif", 
    mono: "'IBM Plex Mono', monospace",   
    body: "'Inter', sans-serif",          
  };
  const gold = "#B9935B";

  return (
    <section
      ref={container}
      id="about"
      className="relative text-black min-h-screen overflow-x-hidden selection:bg-[#B9935B] selection:text-black bg-[#050505]"
      style={{ fontFamily: fonts.body }}
    >
      
      {/* GLOBAL BACKGROUND NOISE */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[5] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* --- TOP MARQUEE --- */}
      <div className={`relative bg-[${gold}] text-black overflow-hidden py-3 z-20 border-b-4 border-black`}>
        <div 
          className="flex gap-12 animate-marquee whitespace-nowrap text-lg font-bold uppercase tracking-widest"
          style={{ fontFamily: fonts.mono }}
        >
          {Array(10).fill("SYSTEM ARCHITECTURE // CLASSIFIED // REVENUE PROTOCOLS //").map((text, i) => (<span key={i}>{text}</span>))}
        </div>
      </div>

      {/* --- HERO TEXT SECTION --- */}
      <div className={`relative z-10 min-h-[90vh] flex flex-col justify-center px-6 md:px-16 pt-24 pb-20 border-b-2 border-[${gold}] bg-[#FFFBF6]`}>
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#000 0.5px, transparent 0.5px), linear-gradient(90deg, #000 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }}>
        </div>

        <div className="relative z-20 flex justify-between items-start mb-16">
          <div className={`flex flex-col border-l-2 border-[${gold}] pl-4`}>
             <span className={`text-[${gold}] text-xs font-bold uppercase tracking-widest mb-1`} style={{ fontFamily: fonts.mono }}>
                Current Operations
             </span>
             <span className="text-black font-bold text-sm">ACTIVE MONITORING</span>
          </div>
          <div className="hidden md:flex gap-2">
              {[1,2,3].map(i => (<div key={i} className={`w-2 h-2 bg-[${gold}] ${i === 3 ? 'animate-pulse' : ''}`}></div>))}
          </div>
        </div>

        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8" id="about-hero-text">
            <Crosshair className={`absolute -top-10 -left-10 text-[${gold}] opacity-50`} size={40} strokeWidth={1} />
            
            <h2 className="text-[11vw] lg:text-[7vw] font-black leading-[0.9] mb-8 text-black uppercase tracking-tighter" style={{ fontFamily: fonts.header }}>
              <div className="overflow-hidden"><span className="about-line block">REVENUE</span></div>
              <div className="overflow-hidden"><span className="about-line block text-transparent [-webkit-text-stroke:2px_#000]">ENGINEERING</span></div>
              <div className="overflow-hidden"><span className={`about-line block text-[${gold}]`}>NOT LUCK.</span></div>
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8 mt-12 border-t border-black/10 pt-8">
                <div className="max-w-xl">
                    <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed" style={{ fontFamily: fonts.body }}>
                    We replace &quot;hope marketing&quot; with <span className={`bg-[${gold}] text-black px-1`}>mathematical certainty</span>. 
                    </p>
                </div>
            </div>
          </div>

          {/* --- NEW 45X CARD DESIGN --- */}
          <div className="lg:col-span-4 flex justify-end">
            <div className={`w-full max-w-sm bg-[#0a0a0a] border border-[#B9935B] relative overflow-hidden shadow-[15px_15px_0px_0px_rgba(185,147,91,0.2)]`}>
               
               {/* 1. Card Header */}
               <div className={`flex justify-between items-center p-3 border-b border-[${gold}]/30 bg-[${gold}]/5`}>
                   <div className="flex items-center gap-2">
                       <Activity size={14} className={`text-[${gold}]`} />
                       <span className={`text-[10px] font-bold text-[${gold}] tracking-widest uppercase`} style={{ fontFamily: fonts.mono }}>
                           Live_Metric_Node_01
                       </span>
                   </div>
                   <div className="flex items-center gap-2">
                       <span className="text-[12px] text-gray-500 font-mono">REC</span>
                       <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
                   </div>
               </div>

               {/* 2. Main Display Area */}
               <div className="relative p-8 overflow-hidden h-64 flex flex-col justify-center">
                   
                   {/* Background Scrolling Data Stream */}
                   <div className="absolute right-4 top-0 bottom-0 w-8 overflow-hidden opacity-70 pointer-events-none">
                       <div className={`text-[18px] font-mono text-[${gold}] leading-tight animate-marquee-vertical`}>
                           {Array(20).fill("011001 0xFF").map((t,i) => <div key={i}>{Math.random().toString(16).substring(2,8).toUpperCase()}</div>)}
                       </div>
                   </div>

                   <div className="relative z-10">
                       <div className="flex items-baseline gap-2">
                           <span className={`text-8xl font-black text-white tracking-tighter`} style={{ fontFamily: fonts.header }}>
                               45X
                           </span>
                       </div>
                       <p className={`text-gray-400 text-sm mt-2 border-l-2 border-[${gold}] pl-3`} style={{ fontFamily: fonts.body }}>
                           Average ROAS Uplift<br/>
                           <span className="text-xs text-gray-300">Q1 Verified Data</span>
                       </p>
                   </div>

                   {/* Background Grid inside card */}
                   <div className={`absolute inset-0 bg-[linear-gradient(rgba(185,147,91,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(185,147,91,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none`}></div>
               </div>

               {/* 3. Card Footer Ticker */}
               <div className={`bg-[#050505] border-t border-[${gold}]/30 py-2 overflow-hidden`}>
                   <div className={`flex gap-4 animate-marquee whitespace-nowrap text-[10px] font-bold text-[${gold}] uppercase tracking-widest`} style={{ fontFamily: fonts.mono }}>
                       {Array(10).fill("SCALING // VELOCITY // PROFIT // ").map((t,i) => <span key={i}>{t}</span>)}
                   </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MIDDLE MARQUEE --- */}
      <div className={`relative bg-[${gold}] text-black overflow-hidden py-3 z-20 border-y-2 border-black`}>
        <div 
          className="flex gap-12 animate-marquee whitespace-nowrap text-lg font-bold uppercase tracking-widest"
          style={{ fontFamily: fonts.mono }}
        >
          {Array(10).fill("INITIATE SEQUENCE // DEPLOY ASSETS // SCALE OPERATIONS //").map((text, i) => (<span key={i}>{text}</span>))}
        </div>
      </div>

      {/* --- SCROLL SECTION --- */}
      <div
        ref={scrollSection}
        className="relative w-full h-auto md:h-screen bg-[#050505] overflow-hidden"
      >
        {/* Track */}
        <div ref={scrollTrack} className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-max relative z-10">
          
          {/* 1. INTRO PANEL */}
          <div className={`w-full md:w-[45vw] lg:w-[40vw] h-auto md:h-full flex-shrink-0 flex flex-col justify-center px-8 py-20 md:px-16 border-b-2 md:border-b-0 md:border-r-2 border-[${gold}] bg-[#050505]/95 relative overflow-hidden text-white`}>
             <div className="absolute top-10 right-10 flex flex-col items-end opacity-70 font-mono text-[12px] text-[#B9935B]">
                <span>SYS_CFG: 884.22</span>
                <span>MEM_ALLOC: 99%</span>
             </div>
             <div className="relative z-10">
                <div className={`flex items-center gap-3 mb-6`}>
                    <div className={`h-[1px] w-12 bg-[${gold}]`}></div>
                    <span className={`text-[${gold}] font-bold text-sm tracking-[0.3em] uppercase`} style={{ fontFamily: fonts.mono }}>
                        The Blueprint
                    </span>
                </div>
                <h3 className="text-5xl md:text-7xl font-black mb-8 text-white uppercase leading-[0.9]" style={{ fontFamily: fonts.header }}>
                    System <br />
                    <span className={`text-[${gold}]`}>Protocol</span>
                </h3>
                <p className="text-gray-400 text-lg max-w-sm mb-12 font-light border-l border-white/20 pl-6 leading-relaxed" style={{ fontFamily: fonts.body }}>
                    Combat-tested infrastructure. We don&apos;t just run ads; we deploy a comprehensive assault on your market vertical.
                </p>
                <button 
                  onClick={handleSkip}
                  className={`group flex items-center gap-4 text-white uppercase tracking-widest text-xs font-bold hover:text-[${gold}] transition-all w-max`}
                  style={{ fontFamily: fonts.mono }}
                >
                  <div className={`w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-[${gold}] group-hover:bg-[${gold}] group-hover:text-black transition-all`}>
                      <FastForward size={14} />
                  </div>
                  <span>Bypass Sequence </span>
                </button>
             </div>
          </div>

          {/* 2. PROCESS CARDS */}
          {processSteps.map((step, index) => (
            <div
              key={index}
              className={`w-full md:w-[50vw] lg:w-[45vw] h-auto md:h-full flex-shrink-0 relative flex items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-[${gold}] bg-[#050505]/90 py-12 px-6`}
            >
              <div className={`w-full h-[60vh] md:h-[70vh] bg-[#080808] relative group flex flex-col border border-white/10 hover:border-[${gold}] transition-colors duration-500`}>
                <CornerBrackets color={gold} />
                <div className={`absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[${gold}] text-[10px] font-mono tracking-[0.3em] whitespace-nowrap hidden md:block opacity-50`}>
                    {step.sub} 
                </div>
                <div className={`relative h-[45%] w-full overflow-hidden border-b border-[${gold}]/30`}>
                    <Image
                      src={step.img}
                      alt={step.title}
                      fill
                      className="object-cover  contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                   
                    <div className={`absolute bottom-2 right-2 text-7xl font-black text-transparent text-white opacity-90 z-20 group-hover:text-[${gold}] group-hover:[-webkit-text-stroke:0px] transition-all`} style={{ fontFamily: fonts.header }}>
                        {step.id}
                    </div>
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between relative">
                    <div>
                        <div className={`text-[${gold}] text-xs font-mono mb-2`}>Target: {step.tags[0]}</div>
                        <h4 className="text-4xl md:text-5xl font-black text-white uppercase mb-4" style={{ fontFamily: fonts.header }}>{step.title}</h4>
                        <p className="text-gray-400 text-sm font-light leading-relaxed border-l-2 border-white/20 pl-4 group-hover:border-[${gold}] transition-colors">{step.desc}</p>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex justify-between items-center mt-6">
                        <div className="flex gap-2">
                            {step.tags.map((tag,i) => (<span key={i} className={`text-[9px] uppercase border border-white/20 px-2 py-1 text-gray-400 group-hover:border-[${gold}] group-hover:text-[${gold}] transition-colors`} style={{ fontFamily: fonts.mono }}>{tag}</span>))}
                        </div>
                        <Disc className={`text-[${gold}] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity`} size={18} />
                    </div>
                </div>
              </div>
            </div>
          ))}

          {/* 3. FINALE SECTION (UPDATED - NO ROTATING SHAPES) */}
          <div className={`w-full md:w-[100vw] min-h-[60vh] md:h-screen flex-shrink-0 relative flex flex-col items-center justify-center bg-[#050505] overflow-hidden border-l-2 border-[${gold}] perspective-[1000px]`}>
            
            {/* 3D VELOCITY GRID - Floor and Ceiling */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                 {/* Floor */}
                 <div className="absolute bottom-0 w-full h-[50%] bg-[linear-gradient(transparent_0%,rgba(185,147,91,0.2)_100%)]"></div>
                 <div className={`absolute -bottom-[50%] -left-[50%] w-[200%] h-[100%] animate-grid-forward`} 
                      style={{ 
                          backgroundImage: `linear-gradient(0deg, transparent 24%, ${gold}40 25%, ${gold}40 26%, transparent 27%, transparent 74%, ${gold}40 75%, ${gold}40 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ${gold}40 25%, ${gold}40 26%, transparent 27%, transparent 74%, ${gold}40 75%, ${gold}40 76%, transparent 77%, transparent)`,
                          backgroundSize: '100px 100px',
                          transform: 'rotateX(60deg)'
                      }}>
                 </div>
                 
                 {/* Ceiling (Mirrored) */}
                 <div className="absolute top-0 w-full h-[50%] bg-[linear-gradient(rgba(185,147,91,0.2)_0%,transparent_100%)]"></div>
                 <div className={`absolute -top-[50%] -left-[50%] w-[200%] h-[100%] animate-grid-forward`} 
                      style={{ 
                          backgroundImage: `linear-gradient(0deg, transparent 24%, ${gold}40 25%, ${gold}40 26%, transparent 27%, transparent 74%, ${gold}40 75%, ${gold}40 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ${gold}40 25%, ${gold}40 26%, transparent 27%, transparent 74%, ${gold}40 75%, ${gold}40 76%, transparent 77%, transparent)`,
                          backgroundSize: '100px 100px',
                          transform: 'rotateX(-60deg)'
                      }}>
                 </div>
            </div>

            {/* Content - Sitting in the center of the "Tunnel" */}
            <div className="relative z-10 text-center px-4">
                <div className={`inline-flex items-center gap-4 mb-8 border border-[${gold}] px-8 py-3 bg-black shadow-[0_0_30px_rgba(185,147,91,0.2)]`}>
                    <Lock size={14} className={`text-[${gold}]`} />
                    <span className={`text-[${gold}] font-bold text-xs tracking-[0.3em] uppercase`} style={{ fontFamily: fonts.mono }}>
                        Authorization Granted
                    </span>
                </div>

                <h2 className="text-[9vw] font-black text-white uppercase leading-none mb-12 mix-blend-difference drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ fontFamily: fonts.header }}>
                    Ready to <br />
                    <span className={`text-[${gold}]`}>Dominate?</span>
                </h2>

                <Link
                    href="/contact"
                    className={`group relative inline-flex items-center justify-center px-20 py-8 bg-[${gold}] overflow-hidden transition-transform active:scale-95`}
                >
                    <span className="relative z-10 font-black text-2xl text-black uppercase tracking-widest flex items-center gap-4" style={{ fontFamily: fonts.header }}>
                        Initiate Launch <ArrowRight />
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                </Link>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        
        @keyframes marquee-vertical { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .animate-marquee-vertical { animation: marquee-vertical 10s linear infinite; }

        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 4s linear infinite; }

        @keyframes grid-forward {
            0% { background-position: 0 0; }
            100% { background-position: 0 100px; }
        }
        .animate-grid-forward { animation: grid-forward 2s linear infinite; }
      `}</style>
    </section>
  );
}

export default AboutSection;