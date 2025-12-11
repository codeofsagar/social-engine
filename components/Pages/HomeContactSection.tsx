"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { IconArrowUpRight, IconBarcode } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

function HomeContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    // 1. Parallax Text Effect
    gsap.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );

    // 2. Ticket Reveal
    gsap.fromTo(
      ticketRef.current,
      { scale: 0.8, opacity: 0, rotate: -5 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="bg-[#FFFBF6] text-black py-24 lg:py-32 px-4 relative overflow-hidden border-t border-black/10"
    >
      {/* --- Background Elements --- */}
      
      {/* 1. Noise Texture (Lowest Layer) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-[0] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. Background Image (Topographic Map) */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.08] mix-blend-multiply pointer-events-none"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) contrast(120%)'
        }}
      ></div>

      {/* 3. Decorative Vertical Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-black/5 z-[1]"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-black/5 z-[1]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Headline Section --- */}
        <div ref={textRef} className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 border border-[#B9935B] rounded-full px-4 py-1 mb-6 bg-[#FFFBF6]/80 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#B9935B] animate-pulse"></span>
            <span 
              className="text-xs uppercase tracking-widest text-[#B9935B]"
              style={{ fontFamily: "Druk Wide Cy Web Bold Regular, sans-serif" }}
            >
              Limited Availability
            </span>
          </div>
          
          <h2 
            className="text-[10vw] lg:text-[8vw] leading-[1] font-black uppercase "
            style={{ fontFamily: "Druk Wide Cy Web Bold Regular, sans-serif" }}
          >
            Next Level <br />
            <span className="text-transparent [-webkit-text-stroke:1px_black] hover:text-[#B9935B] transition-colors duration-500">
              Revenue
            </span>
          </h2>
        </div>

        {/* --- The "Boarding Pass" CTA --- */}
        <div className="flex justify-center pb-8"> {/* Added padding bottom to accommodate hover translate */}
          <a
            ref={ticketRef}
            href="https://calendly.com/apdigitalagency/30-minute-landing-page-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full max-w-2xl bg-white border-2 border-black flex flex-col md:flex-row shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[15px_15px_0px_0px_#B9935B] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          >
            {/* Left Side: Info */}
            <div className="flex-1 p-8 md:p-10 border-b-2 md:border-b-0 md:border-r-2 border-black/10 border-dashed group-hover:border-black/20 relative overflow-hidden">
                
                {/* Holographic Sheen on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-20 pointer-events-none"></div>
                
                <div className="flex justify-between mb-8 relative z-10">
                    <div>
                        <p className="font-mono text-xs uppercase text-gray-400 mb-1">Session Type</p>
                        <p className="font-bold text-base md:text-lg uppercase">Audit & Strategy</p>
                    </div>
                    <div>
                        <p className="font-mono text-xs uppercase text-gray-400 mb-1">Time</p>
                        <p className="font-bold text-base md:text-lg">30 Min</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 bg-[#B9935B] text-white flex items-center justify-center rounded-full shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <IconBarcode />
                      </div>
                      <div>
                        <p 
                          className="font-bold text-lg md:text-xl uppercase leading-tight"
                          style={{ fontFamily: "Druk Wide Cy Web Bold Regular, sans-serif" }}
                        >
                          Free Consultation
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-[#B9935B] transition-colors">Claim your spot now</p>
                      </div>
                </div>
            </div>

            {/* Right Side: Action (Click area) */}
            <div className="w-full md:w-32 bg-black group-hover:bg-[#B9935B] transition-colors duration-300 flex items-center justify-center p-6 cursor-pointer relative overflow-hidden">
                <div 
                  className="flex flex-row md:flex-col items-center gap-3 text-[#FFFBF6] group-hover:text-black z-10"
                >
                    {/* Fixed Hydration Issue: Used Tailwind arbitrary value for writing-mode instead of JS conditional */}
                    <span 
                      className="font-bold uppercase tracking-widest text-sm md:text-xs lg:text-sm md:[writing-mode:vertical-rl] rotate-0"
                      style={{ fontFamily: "Druk Wide Cy Web Bold Regular, sans-serif" }}
                    >
                        Book Now
                    </span>
                    <IconArrowUpRight className="w-6 h-6 transition-transform group-hover:rotate-45" />
                </div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}

export default HomeContactSection;