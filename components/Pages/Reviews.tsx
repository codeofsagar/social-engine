"use client";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight, IconQuote } from "@tabler/icons-react";

// Register GSAP
gsap.registerPlugin(useGSAP, ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The Ad they created increased our leads by 45% in just 30 days. It completely transformed our pipeline.",
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc.",
  },
  {
    id: 2,
    quote: "28 qualified leads in the first month. We are scaling our budget immediately because the ROI is undeniable.",
    name: "Michael Chen",
    role: "CEO",
    company: "GrowthLabs",
  },
  {
    id: 3,
    quote: "We're now getting 3x ROI on our ad spend. They didn't just run ads; they fixed our entire funnel.",
    name: "Jessica Williams",
    role: "Founder",
    company: "Bloom Cosmetics",
  },
];

const STATS = [
  { value: "45%", label: "Conv. Lift" },
  { value: "3.2x", label: "ROI Increase" },
  { value: "500+", label: "Projects" },
  { value: "98%", label: "Retention" },
];

const COLORS = {
  gold: "#B9935B",
  bg: "#FFFBF6",
  black: "#000000"
};

function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-play Logic
  useEffect(() => {
    if (!autoplay) return;
    
    const duration = 5000; 
    const intervalTime = 50; 
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActive((a) => (a + 1) % TESTIMONIALS.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [autoplay, active]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    resetTimer();
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    resetTimer();
  };

  const resetTimer = () => {
    setAutoplay(false);
    setProgress(0);
  };

  useGSAP(() => {
    gsap.from(".stat-entry", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="reviews"
      className="bg-[#FFFBF6] text-black min-h-screen flex flex-col justify-center relative overflow-hidden py-12 lg:py-24"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      {/* Background Big Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none opacity-[0.03] z-[1]">
        <h1 
          className="text-[25vw] leading-none text-black font-black uppercase"
          style={{ fontFamily: "'Kanit', sans-serif" }}
        >
          Results
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full relative z-10">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12 border-b border-black/10 pb-6">
            <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: COLORS.gold }}></span>
                <span 
                  className="text-sm uppercase tracking-widest font-mono"
                  style={{ color: COLORS.gold }}
                >
                  Client Testimonials
                </span>
            </div>
            <div className="hidden md:block text-sm uppercase tracking-widest opacity-60 font-mono">
                Updated: 2026
            </div>
        </div>

        {/* Testimonial Content - Now Full Width */}
        <div className="relative">
            <IconQuote 
              className="w-12 h-12 md:w-20 md:h-20 mb-6 opacity-20" 
              style={{ color: COLORS.gold }}
            />
            
            <div className="min-h-[300px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={TESTIMONIALS[active].id}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <h3 
                          className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight mb-10 text-black tracking-tight"
                        >
                            &ldquo;{TESTIMONIALS[active].quote}&rdquo;
                        </h3>
                        
                        <div className="flex flex-col border-l-4 pl-8" style={{ borderColor: COLORS.gold }}>
                            <span 
                              className="text-2xl md:text-4xl uppercase font-black"
                              style={{ fontFamily: "'Kanit', sans-serif" }}
                            >
                                {TESTIMONIALS[active].name}
                            </span>
                            <span className="text-lg font-mono mt-2" style={{ color: COLORS.gold }}>
                                {TESTIMONIALS[active].role}  {TESTIMONIALS[active].company}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation & Progress Bar UI */}
            <div className="mt-16 flex flex-col md:flex-row items-center gap-8">
                <div className="flex gap-2">
                    <button 
                        onClick={handlePrev}
                        className="w-16 h-16 border border-black flex items-center justify-center hover:bg-black hover:text-[#B9935B] transition-all duration-300"
                    >
                        <IconArrowLeft size={24} />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="w-16 h-16 border border-black flex items-center justify-center hover:bg-black hover:text-[#B9935B] transition-all duration-300"
                    >
                        <IconArrowRight size={24} />
                    </button>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="flex-1 w-full h-[2px] bg-black/10 relative">
                    <motion.div 
                        className="absolute top-0 left-0 h-full"
                        style={{ width: `${progress}%`, backgroundColor: COLORS.gold }}
                    />
                </div>
                
                <div className="font-mono text-sm opacity-60">
                    0{active + 1} / 0{TESTIMONIALS.length}
                </div>
            </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-20 lg:mt-32 pt-10 border-t border-black">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {STATS.map((stat, i) => (
                    <div key={i} className="stat-entry">
                        <div 
                          className="text-4xl lg:text-6xl font-black mb-1"
                          style={{ fontFamily: "'Kanit', sans-serif", color: COLORS.gold }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs uppercase tracking-widest font-mono opacity-60">
                          {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;