"use client";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";

const COLORS = {
  gold: "#B9935B",
  black: "#050505",
  white: "#FFFBF6"
};

function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect for the massive text at the bottom
    gsap.fromTo(
      ".footer-brand-text",
      { y: -20 },
      {
        y: 0,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );
  }, { scope: footerRef });

  return (
    <footer 
      ref={footerRef}
      className="bg-[#050505] text-[#FFFBF6] pt-16 md:pt-24 overflow-hidden relative"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
     
      
     
     

      

      {/* 1. Main Call to Action Area */}
      <div className="container max-w-8xl mx-auto px-4 md:px-6 lg:px-12 mb-8 md:mb-16 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 lg:gap-6">
          <div>
            <p 
              className="text-xs md:text-sm uppercase tracking-widest mb-4"
              style={{ 
                fontFamily: '"IBM Plex Mono", monospace', 
                color: COLORS.gold 
              }}
            >
              Next Steps
            </p>
            <h2 
              className="text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] uppercase"
              style={{ 
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 900 
              }}
            >
              Have an <br />
              Idea?
            </h2>
          </div>
          
          <div className="group relative mt-0 lg:mt-0">
             <Link 
                href="/contact"
                className="flex items-center gap-4 text-xl md:text-2xl lg:text-3xl uppercase border-b border-[#B9935B]/50 pb-2 group-hover:border-[#B9935B] group-hover:text-[#B9935B] transition-all duration-300"
                style={{ 
                  fontFamily: "'Kanit', sans-serif",
                  fontWeight: 900 
                }}
             >
                Start a Project
                <IconArrowUpRight 
                    className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 text-[#B9935B]" 
                />
             </Link>
          </div>
        </div>
      </div>

      {/* 2. Architectural Grid Info */}
      <div className="border-t border-[#B9935B]/50 relative z-10 bg-[#050505]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#B9935B]/50">
            
            {/* Col 1: Description */}
            <div className="py-10 lg:pr-12">
                <div className="mb-6">
                  <div className="relative w-16 h-16 md:w-40 md:h-40">
                    <Image
                      src="/images/foot.png"
                      alt="AP Agency Logo"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 74px, 90px"
                    />
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm font-light">
                    We create high-performance ad strategies that capture attention, target the right audience, and turn clicks into customers.
                </p>
            </div>

            {/* Col 2: Navigation */}
            <div className="py-10 md:px-12">
                <h4 
                  className="text-xs uppercase mb-6 tracking-widest"
                  style={{ 
                    fontFamily: '"IBM Plex Mono", monospace',
                    color: COLORS.gold
                  }}
                >
                  Sitemap
                </h4>
                <ul className="space-y-4">
                    {['Home',"About", 'Services', 'Packages', 'Reviews'].map((item) => (
                        <li key={item}>
                            <Link href={`#${item.toLowerCase()}`} className="text-base md:text-lg hover:text-[#B9935B] transition-colors inline-block font-medium">
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Col 3: Contact */}
            <div className="py-10 md:px-12">
                <h4 
                  className="text-xs uppercase mb-6 tracking-widest"
                  style={{ 
                    fontFamily: '"IBM Plex Mono", monospace',
                    color: COLORS.gold
                  }}
                >
                  Contact
                </h4>
                <ul className="space-y-6">
                    <li>
                        <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>Inquiries</p>
                        <a href="mailto:info@apagency.ca" className="text-base md:text-lg hover:text-[#B9935B] transition-colors break-words font-medium">info@apagency.ca</a>
                    </li>
                    <li>
                        <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>Phone</p>
                        <a href="tel:6474240504" className="text-base md:text-lg hover:text-[#B9935B] transition-colors font-medium">(647) 424-0504</a>
                    </li>
                    <li>
                        <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>HQ</p>
                        <p className="text-base md:text-lg text-gray-300 font-medium">Richmond Hill, ON<br/>Canada</p>
                    </li>
                    <li>
                        <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>Instagram</p>
                       <a 
                      href="https://www.instagram.com/ap.digitalagency/" 
                      target="_blank" 
                      className="group flex items-center gap-2 text-base md:text-lg hover:text-[#B9935B] transition-colors font-semibold uppercase"
                    >
                        Ap Agency<IconArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                    </li>
                </ul>
            </div>

            {/* Col 4: Legal & Hours */}
            <div className="py-10 md:pl-12 flex flex-col justify-between">
                <div>
                    <h4 
                      className="text-xs uppercase mb-6 tracking-widest"
                      style={{ 
                        fontFamily: '"IBM Plex Mono", monospace',
                        color: COLORS.gold
                      }}
                    >
                      Hours
                    </h4>
                    <p className="text-sm text-gray-400 mb-2 font-mono"><span className="text-white">Mon-Fri:</span> 9am - 7pm</p>
                    <p className="text-sm text-gray-400 font-mono"><span className="text-white">Sat:</span> 12pm - 4pm</p>
                </div>
                
                <div className="mt-8 lg:mt-0 pt-8 border-t border-[#B9935B]/50 lg:border-0 lg:pt-0">
                    <p className="text-xs text-gray-600" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                        &copy; {currentYear} AP Agency.<br/>All rights reserved.
                    </p>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Massive Brand Watermark */}
      <div 
        className="border-t border-[#B9935B]/50 overflow-hidden w-full relative z-10"
        style={{ backgroundColor: COLORS.gold }}
      >
        <div className="footer-brand-text flex justify-center w-full pt-4 pb-2">
            <h1 
              className="text-[17vw] uppercase text-[#050505] mix-blend-multiply leading-none"
              style={{ 
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 900 
              }}
            >
                AP Agency
            </h1>
        </div>
      </div>
    </footer>
  );
}

export default Footer;