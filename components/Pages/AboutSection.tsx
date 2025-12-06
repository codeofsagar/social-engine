"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { ArrowRight, Target, Lock, Disc } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: "01",
    label: "PHASE ONE",
    title: "Diagnostic",
    desc: "We don't guess. We audit your entire funnel, identifying exactly where money is leaking.",
    tags: ["Audit", "Data Analysis", "Recon"],
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "02",
    label: "PHASE TWO",
    title: "Construction",
    desc: "Building the creative assets and landing page architecture required for high-conversion velocity.",
    tags: ["Creative", "Copywriting", "Dev"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "03",
    label: "PHASE THREE",
    title: "Velocity",
    desc: "Launch and rapid iteration. We scale budgets only when ROAS targets are met and sustained.",
    tags: ["Media Buying", "Scaling", "ROI"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1470&q=80",
  },
];

function AboutSection() {
  const container = useRef(null);
  const scrollSection = useRef(null);
  const scrollTrack = useRef(null);

  useGSAP(
    () => {
      // 1. Text Reveal
      const tl = gsap.timeline({
        scrollTrigger: { trigger: "#about-hero-text", start: "top 80%" },
      });
      tl.from(".about-line", {
        y: 100, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
      });

      // 2. Horizontal Scroll (DESKTOP ONLY)
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        const track = scrollTrack.current;
        const section = scrollSection.current;
        
        if (track && section) {
            // Force recalculation
            // @ts-ignore
            const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
            
            gsap.to(track, {
              x: getScrollAmount,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                // @ts-ignore
                end: () => "+=" + (track.scrollWidth - window.innerWidth),
              },
            });
        }
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="about"
      className="relative text-black min-h-screen overflow-x-hidden selection:bg-[#B9935B] selection:text-black"
    >

      <div className="relative bg-[#B9935B] text-black overflow-hidden py-4 z-20 border-b border-black">
         <div className="flex gap-12 animate-marquee whitespace-nowrap text-lg font-bold font-mono uppercase tracking-widest">
            {Array(10).fill("STRATEGY // EXECUTION // SCALE //").map((text, i) => <span key={i}>{text}</span>)}
         </div>
      </div>

      {/* --- HERO TEXT SECTION --- */}
      <div className="relative z-10 min-h-[90vh] flex flex-col justify-center px-6 md:px-16 pt-24 pb-20 border-b border-black/10 bg-[#FFFBF6]">
        
        {/* Decorative Static Grid Background for Light Section */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="relative z-20 flex justify-between items-center mb-16 text-xs font-bold font-mono text-gray-500 uppercase tracking-widest">
           <span className="text-[#B9935B] border border-[#B9935B]/30 px-3 py-1 bg-[#B9935B]/10 rounded-full">System Status: Online</span>
           <span className="text-black/50">[ EST. 2025 ]</span>
        </div>

        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8" id="about-hero-text">
            <h2 
                className="text-[12vw] lg:text-[7vw] font-black tracking-tighter leading-[1] mb-8 text-black"
                style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
            >
              <div className="overflow-hidden"><span className="about-line block">REVENUE</span></div>
              <div className="overflow-hidden"><span className="about-line block text-transparent text-[7vw] md:text-[5vw] [-webkit-text-stroke:1px_#000]">ENGINEERING</span></div>
              <div className="overflow-hidden"><span className="about-line block text-[#B9935B]">NOT LUCK.</span></div>
            </h2>
            <p className="text-lg md:text-2xl text-gray-600 max-w-2xl mt-8 font-light leading-relaxed">
              We replace &quot;hope marketing&quot; with <span className="text-black font-bold bg-[#B9935B]/20 px-1">mathematical certainty</span>. 
              Our infrastructure scales brands from 6 to 8 figures using data-driven aggressive acquisition.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex justify-end">
             <div className="w-full max-w-sm bg-[#050505] text-white border border-black/10 p-8 relative overflow-hidden group shadow-[20px_20px_0px_0px_#B9935B]">
                 
                 <div className="flex flex-col gap-2 mb-8">
                    <p className="font-mono text-[10px] text-[#B9935B] uppercase tracking-widest flex items-center gap-2">
                        <Target size={14} /> 
                    </p>
                    <h3 className="text-white text-lg font-bold uppercase tracking-wide">Average Uplift</h3>
                 </div>

                 <div className="flex items-baseline gap-2 mb-6">
                     <span 
                        className="text-8xl font-black text-[#B9935B] tracking-tighter leading-none"
                        style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                     >
                        45X
                     </span>
                 </div>

                 <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l border-[#B9935B] pl-4">
                    Documented return on ad spend (ROAS) across our top 3 verticals in Q1.
                 </p>
             </div>
          </div>
        </div>
      </div>

      {/* --- MARQUEE --- */}
      <div className="relative bg-[#B9935B] text-black overflow-hidden py-4 z-20 border-y border-black">
         <div className="flex gap-12 animate-marquee whitespace-nowrap text-lg font-bold font-mono uppercase tracking-widest">
            {Array(10).fill("STRATEGY // EXECUTION // SCALE //").map((text, i) => <span key={i}>{text}</span>)}
         </div>
      </div>

      {/* --- SCROLL SECTION --- */}
      <div ref={scrollSection} className="relative w-full h-auto md:h-screen bg-[#050505] overflow-hidden">
        
        {/* --- ANIMATED GOLDEN GRID BACKGROUND --- */}
        {/* Only visible in this black section. Moves diagonally. */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-grid-scroll" 
             style={{ 
                 backgroundImage: 'linear-gradient(#B9935B 1px, transparent 1px), linear-gradient(90deg, #B9935B 1px, transparent 1px)', 
                 backgroundSize: '50px 50px' 
             }}>
        </div>
        
        {/* Vignette to fade edges */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none"></div>

        {/* Track - w-max ensures it scrolls fully */}
        <div ref={scrollTrack} className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-max relative z-10">
          
          {/* 1. INTRO PANEL */}
          <div className="w-full md:w-[45vw] h-auto md:h-full flex-shrink-0 flex flex-col justify-center px-8 py-20 md:py-0 md:px-16 border-b md:border-b-0 md:border-r border-white/10 bg-[#050505]/80 backdrop-blur-sm relative overflow-hidden text-white">
             
             {/* Giant Watermark */}
             <div 
                className="absolute -left-10 bottom-0 text-[35vh] text-white/[0.03] font-black pointer-events-none select-none leading-none"
                style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
             >
                PRO
             </div>

             <div className="relative z-10">
                 <div className="inline-block border border-[#B9935B] px-4 py-2 mb-8 bg-[#B9935B]/10">
                     <span 
                        className="text-[#B9935B] font-bold text-xs md:text-sm tracking-[0.2em] uppercase"
                        style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                     >
                        The Blueprint
                     </span>
                 </div>
                 
                 <h3 
                    className="text-4xl md:text-8xl font-black mb-8 text-white leading-none uppercase tracking-tighter"
                    style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                 >
                    System<br/>
                    <span className="text-transparent [-webkit-text-stroke:2px_#555]">Protocol</span>
                 </h3>
                 
                 <div className="w-24 h-1 bg-[#B9935B] mb-8"></div>

                 <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed mb-12 font-medium">
                   We don&apos;t just run ads. We deploy a combat-tested, three-phase infrastructure designed to dominate your market vertical.
                 </p>

                 <div className="flex items-center gap-4 hidden md:block ">
                     <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-[#B9935B] bg-white/5 backdrop-blur-sm  animate-pulse">
                        <ArrowRight size={24} />
                     </div>
                     <div className="text-xs font-mono text-gray-500 uppercase tracking-widest font-bold">
                         Swipe to Inspect <br/> Architecture
                     </div>
                 </div>
             </div>
          </div>

          {/* 2. PROCESS CARDS */}
          {processSteps.map((step, index) => (
            <div key={index} className="w-full md:w-[50vw] lg:w-[45vw] h-auto md:h-full flex-shrink-0 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 bg-[#050505]/50 py-8 md:py-0 px-4 md:px-8">
              
              {/* Card Design */}
              <div className="w-full h-auto md:h-[70vh] bg-[#0a0a0a] text-white group flex flex-col shadow-2xl overflow-hidden relative border border-white/10 hover:border-[#B9935B] hover:-translate-y-4 transition-all duration-500">
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 z-20">
                      <Disc className="text-[#B9935B] animate-spin-slow opacity-50 group-hover:opacity-100" size={24} />
                  </div>
                  
                  {/* Vertical Text Label */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 border-r border-white/10 flex items-center justify-center bg-[#050505]">
                      <span 
                        className="text-gray-600 group-hover:text-[#B9935B] font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase rotate-180 transition-colors"
                        style={{ writingMode: 'vertical-rl' }}
                      >
                          {step.label} 
                      </span>
                  </div>

                  {/* Main Content Area */}
                  <div className="ml-8 md:ml-12 flex flex-col h-full">
                      
                      {/* Image Area - Fixed height on mobile ensures visibility */}
                      <div className="relative h-64 md:h-[40%] w-full overflow-hidden shrink-0">
                         <Image 
                           src={step.img} 
                           alt={step.title} 
                           fill 
                           className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80"></div>
                      </div>

                      {/* Text Content */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-4xl md:text-6xl font-black mb-2 md:mb-4 select-none text-[#B9935B]/20 transition-colors" style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}>
                                {step.id}
                            </div>
                            <h4 
                               className="text-2xl md:text-5xl font-black mb-4 md:mb-6 text-white uppercase leading-none"
                               style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                            >
                                {step.title}
                            </h4>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed border-l-2 border-white/10 group-hover:border-[#B9935B] pl-4 transition-colors">
                              {step.desc}
                            </p>
                          </div>

                          <div className="mt-6 md:mt-8">
                             <div className="flex flex-wrap gap-2">
                                 {step.tags.map((tag, i) => (
                                 <span key={i} className="text-[10px] font-bold text-gray-400 border border-white/10 px-3 py-1 uppercase tracking-wider group-hover:text-[#B9935B] group-hover:border-[#B9935B]">
                                     {tag}
                                 </span>
                                 ))}
                             </div>
                          </div>
                      </div>
                  </div>
              </div>

            </div>
          ))}
          
          {/* 3. FINALE SECTION (Scale Now) */}
           <div className="w-full md:w-[100vw] min-h-[50vh] md:h-screen flex-shrink-0 relative flex flex-col items-center justify-center bg-[#050505]/50 overflow-hidden border-t md:border-t-0 border-l border-white/10 py-12 md:py-0">
              
              {/* Radar Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[60vw] h-[60vw] border border-[#B9935B]/20 rounded-full"></div>
                  <div className="w-[40vw] h-[40vw] border border-[#B9935B]/20 rounded-full absolute"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center px-4 max-w-5xl">
                <div className="inline-flex items-center gap-2 border border-[#B9935B] px-6 py-2 rounded-full bg-[#B9935B]/10 mb-10 backdrop-blur-md">
                    <Lock size={14} className="text-[#B9935B]" />
                    <span className="text-[#B9935B] font-bold font-mono text-xs tracking-widest uppercase">Clearance Level: Granted</span>
                </div>

                <h2 
                    className="text-[10vw] md:text-[8vw] font-black mb-12 text-white tracking-tighter leading-[1] uppercase"
                    style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                >
                  Ready to <br/>
                  <span className="text-[#B9935B]">Dominate?</span>
                </h2>
                
                <Link 
                  href="/contact" 
                  className="group relative inline-flex items-center justify-center gap-4 px-16 py-8 bg-[#B9935B] text-black overflow-hidden hover:bg-white transition-colors duration-300"
                >
                   <span 
                      className="relative z-10 font-black text-xl md:text-3xl uppercase tracking-widest"
                      style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                   >
                       Initiate Launch
                   </span>
                   <ArrowRight className="relative z-10 w-8 h-8 transition-transform duration-300 group-hover:translate-x-2" />
                   
                   {/* Button Scan Effect */}
                   <div className="absolute inset-0 bg-white/40 -translate-x-full group-hover:animate-[shimmer_0.8s_infinite]"></div>
                </Link>
              </div>
           </div>

        </div>
      </div>
      
      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 8s linear infinite; }

        /* GRID ANIMATION: Moves diagonally to create an infinite scroll effect */
        @keyframes grid-scroll { 
            0% { background-position: 0 0; } 
            100% { background-position: 50px 50px; } 
        }
        .animate-grid-scroll { animation: grid-scroll 3s linear infinite; }
      `}</style>
    </section>
  );
}

export default AboutSection;