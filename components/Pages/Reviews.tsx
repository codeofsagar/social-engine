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
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    quote: "28 qualified leads in the first month. We are scaling our budget immediately because the ROI is undeniable.",
    name: "Michael Chen",
    role: "CEO",
    company: "GrowthLabs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    quote: "We're now getting 3x ROI on our ad spend. They didn't just run ads; they fixed our entire funnel.",
    name: "Jessica Williams",
    role: "Founder",
    company: "Bloom Cosmetics",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
];

const STATS = [
  { value: "45%", label: "Conv. Lift" },
  { value: "3.2x", label: "ROI Increase" },
  { value: "500+", label: "Projects" },
  { value: "98%", label: "Retention" },
];

function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-play Logic with Progress Bar
  useEffect(() => {
    if (!autoplay) return;
    
    const duration = 5000; // 5 seconds per slide
    const intervalTime = 50; // Update every 50ms
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

  // Manual Navigation
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

  // GSAP Entrance Animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    tl.from(".stat-entry", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out"
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="reviews"
      className="bg-[#FFFBF6] text-black min-h-screen flex flex-col justify-center relative overflow-hidden py-24"
    >
      {/* --- Background Elements --- */}
      
      {/* 1. Noise Texture (Lowest Layer) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-[0] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. Background Image (Corporate/Abstract Architecture) */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.06] mix-blend-luminosity pointer-events-none"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)' 
        }}
      ></div>

      {/* 3. Typography Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none opacity-[0.05] z-[2]">
        <h1 
          className="text-[20vw] font-black uppercase tracking-tighter leading-none text-black"
          style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
        >
          Trust
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        
        {/* Header Specs */}
        <div className="flex items-center justify-between mb-16 border-b border-black/10 pb-6">
            <div className="flex items-center gap-4">
                <span className="w-3 h-3 bg-[#B9935B] rounded-full animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-widest opacity-60">Live Client Feedback</span>
            </div>
            <div className="hidden md:block text-xs font-mono uppercase tracking-widest opacity-90">
                Data Updated: 2025
            </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center min-h-[500px]">
            
            {/* Left: Image & Controls */}
            <div className="lg:col-span-5 relative">
                {/* Image Container with Border */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-gray-200 border border-black shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={TESTIMONIALS[active].id}
                            src={TESTIMONIALS[active].image}
                            alt={TESTIMONIALS[active].name}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.1, opacity: 0 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
                        />
                    </AnimatePresence>
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Progress Bar (Attached to image) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-20">
                    <motion.div 
                        className="h-full bg-[#B9935B]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Controls */}
                <div className="absolute -bottom-8 right-0 translate-y-full flex gap-4">
                    <button 
                        onClick={handlePrev}
                        className="w-14 h-14 border border-black flex items-center justify-center bg-[#FFFBF6] hover:bg-black hover:text-[#B9935B] transition-colors duration-300"
                    >
                        <IconArrowLeft size={20} />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="w-14 h-14 border border-black flex items-center justify-center bg-[#FFFBF6] hover:bg-black hover:text-[#B9935B] transition-colors duration-300"
                    >
                        <IconArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* Right: Text Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
                <IconQuote className="text-[#B9935B] w-12 h-12 md:w-16 md:h-16 mb-8 opacity-80" />
                
                <div className="h-[320px] lg:h-[350px] flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={TESTIMONIALS[active].id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Adjusted Size for Wide Font */}
                            <h3 
                              className="text-2xl md:text-3xl lg:text-4xl font-medium  mb-8 text-black uppercase "
                              style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                            >
                                &ldquo;{TESTIMONIALS[active].quote}&rdquo;
                            </h3>
                            
                            <div className="flex flex-col border-l-2 border-[#B9935B] pl-6">
                                <span 
                                  className="text-lg md:text-xl font-bold uppercase tracking-wide"
                                  style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                                >
                                    {TESTIMONIALS[active].name}
                                </span>
                                <span className="text-gray-500 font-serif italic mt-1">
                                    {TESTIMONIALS[active].role}, {TESTIMONIALS[active].company}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-32 border-t border-black">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10">
                {STATS.map((stat, i) => (
                    <div key={i} className="stat-entry pt-8 pl-4 lg:pl-8">
                        <div 
                          className="text-3xl lg:text-5xl font-bold mb-2 text-black"
                          style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs font-mono uppercase tracking-widest text-gray-500">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;