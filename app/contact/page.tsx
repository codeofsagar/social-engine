"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { IconArrowUpRight, IconClock, IconTarget, IconDeviceDesktop } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLAnchorElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text Reveal
    const elements = gsap.utils.toArray(".reveal-text");
    elements.forEach((el: any) => {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });

    // 2. Ticket Entrance
    gsap.fromTo(
        ticketRef.current,
        { y: 100, opacity: 0, rotateX: -10 },
        {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
        }
    );

    // 3. Infinite Marquee
    if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
            xPercent: -50,
            ease: "none",
            duration: 15,
            repeat: -1,
        });
    }

  }, { scope: containerRef });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="bg-[#FFFBF6] text-black min-h-screen relative overflow-hidden flex flex-col pt-32 lg:pt-48"
    >
      {/* --- Background Elements --- */}
      
      {/* 1. Noise Texture (Lowest Layer) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-[0] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. Background Image (Global Network/Map) */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.08] mix-blend-multiply pointer-events-none"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) contrast(120%)' 
        }}
      ></div>

      {/* 3. Decorative Grid Background (Preserved) */}
      <div className="absolute inset-0 w-full h-full z-[1] opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        
        {/* --- Layout: Split Screen (Text Left, Ticket Right) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-24">
            
            {/* LEFT: Massive Typography (Responsive Fixed) */}
            <div className="w-full lg:w-1/2">
                <div className="overflow-hidden mb-4">
                    <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-[#B9935B] reveal-text">
                          Status: Open for Business
                    </p>
                </div>
                
                {/* Responsive Headline */}
                <h2 
                  className="w-full text-[8vw] lg:text-[5vw] leading-[0.9] font-black uppercase mb-8 mix-blend-darken break-words hyphens-auto"
                  style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                >
                    <div className="overflow-hidden"><div className="reveal-text">Ready to</div></div>
                    <div className="overflow-hidden"><div className="reveal-text text-[#B9935B]">Dominate?</div></div>
                </h2>
                
                <div className="overflow-hidden">
                    <p className="reveal-text text-lg md:text-xl lg:text-2xl font-medium max-w-md leading-relaxed border-l-4 border-[#B9935B] pl-6 text-gray-700">
                        Stop guessing. Start scaling. Book your 30-minute Landing Page Consultation and let&apos;s map out your growth.
                    </p>
                </div>
            </div>

            {/* RIGHT: The "Golden Ticket" (Updated Link) */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end perspective-1000">
                <a 
                    ref={ticketRef}
                    href="https://calendly.com/apdigitalagency/30-minute-landing-page-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full max-w-md bg-white border-2 border-black flex flex-col p-6 md:p-10 transition-all duration-500 hover:bg-black hover:text-[#FFFBF6] hover:-translate-y-2 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[15px_15px_0px_0px_#B9935B]"
                >
                    {/* Perforated Edge Effect (Top) */}
                    <div className="absolute -top-[2px] left-0 w-full flex justify-between px-2">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-2 h-4 bg-[#FFFBF6] rounded-b-full"></div>
                        ))}
                    </div>

                    <div className="flex justify-between items-start border-b-2 border-black/10 group-hover:border-white/20 pb-6 mb-6 pt-4 transition-colors">
                        <div>
                            <span className="block text-xs font-mono uppercase tracking-widest text-[#B9935B] mb-2">Priority Access</span>
                            <h3 
                              className="text-3xl md:text-4xl font-bold uppercase leading-none"
                              style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                            >
                                Landing Page<br/>Audit
                            </h3>
                        </div>
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-black group-hover:border-[#B9935B] flex items-center justify-center transition-colors bg-[#B9935B] text-white group-hover:bg-transparent">
                            <IconArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover:text-[#B9935B] transition-transform duration-500 group-hover:rotate-45" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <IconClock className="text-[#B9935B]" size={24}/>
                            <div>
                                <p className="text-xs font-mono uppercase opacity-60">Duration</p>
                                <p className="text-base md:text-lg font-bold">30 Minutes</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <IconDeviceDesktop className="text-[#B9935B]" size={24}/>
                            <div>
                                <p className="text-xs font-mono uppercase opacity-60">Focus</p>
                                <p className="text-base md:text-lg font-bold">CRO & UI/UX Strategy</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <IconTarget className="text-[#B9935B]" size={24}/>
                            <div>
                                <p className="text-xs font-mono uppercase opacity-60">Outcome</p>
                                <p className="text-base md:text-lg font-bold">Actionable Roadmap</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t-2 border-black/10 group-hover:border-white/20 flex justify-between items-center">
                        <span className="font-mono text-xs animate-pulse text-[#B9935B]">● SLOTS AVAILABLE</span>
                        <span className="font-bold underline">BOOK NOW</span>
                    </div>
                </a>
            </div>
        </div>
      </div>

      {/* --- Marquee Separator --- */}
      <div className="relative w-full overflow-hidden bg-black text-[#B9935B] py-4 border-y border-[#B9935B] z-20">
        <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
            <div className="flex gap-8 items-center pr-8">
                {[...Array(2)].map((_, i) => (
                    <span key={i} className="flex gap-8 text-lg font-mono uppercase tracking-widest">
                        <span> High Performance Ads</span>
                        <span> Landing Page Optimization</span>
                        <span> Conversion Rate Experts</span>
                        <span> Scale Your Business</span>
                        <span> High Performance Ads</span>
                        <span> Landing Page Optimization</span>
                        <span> Conversion Rate Experts</span>
                        <span> Scale Your Business</span>
                    </span>
                ))}
            </div>
        </div>
      </div>

      {/* --- Bottom Map Section (Full Width Architectural) --- */}
      <div className="relative w-full h-[400px] lg:h-[500px] grayscale contrast-125 border-t-4 border-black group overflow-hidden z-10">
         {/* Overlay Grid */}
         <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
         
         {/* Overlay Content */}
         <div className="absolute top-8 left-8 z-20 bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_#B9935B]">
             <p className="font-mono text-xs uppercase text-gray-500 mb-1">Headquarters</p>
             <h4 className="text-xl font-bold uppercase">Richmond Hill, ON</h4>
             <p className="text-sm mt-2 font-mono">10330 Yonge St, L4C 5N1</p>
         </div>

         <div className="absolute bottom-8 right-8 z-20 bg-black text-[#FFFBF6] px-4 py-2 font-mono text-xs uppercase tracking-widest">
             Signal: Active
         </div>

         {/* Updated Map Embed URL for Richmond Hill */}
         <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.5369664539665!2d-79.4429949232938!3d43.865444671092824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2bb08a17684d%3A0x63351322005822e8!2s10330%20Yonge%20St%2C%20Richmond%20Hill%2C%20ON%20L4C%205N1!5e0!3m2!1sen!2sca!4v1709230000000!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            title="AP Agency Location"
         ></iframe>
      </div>

    </section>
  );
}

export default ContactSection;