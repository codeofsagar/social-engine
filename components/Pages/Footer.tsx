"use client";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowUpRight } from "@tabler/icons-react";

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
    >
      {/* 1. Main Call to Action Area */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 mb-16 md:mb-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-12">
          <div>
            <p 
              className="text-[#B9935B] text-xs md:text-sm uppercase tracking-widest mb-4"
              style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
            >
              Next Steps
            </p>
            {/* UPDATED: Used clamp() to handle the wide font on mobile.
                Scales from 2.5rem (mobile) up to 7rem (desktop).
            */}
            <h2 
              className="text-[clamp(2rem,7vw,5rem)] font-bold uppercase  leading-[0.9]"
              style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
            >
              Have an <br />
              Idea?
            </h2>
          </div>
          
          <div className="group relative mt-4 lg:mt-0">
             <Link 
                href="/contact"
                className="flex items-center gap-4 text-xl md:text-2xl lg:text-3xl font-medium uppercase border-b border-[#B9935B]/50 pb-2 group-hover:border-[#B9935B] group-hover:text-[#B9935B] transition-all duration-300"
                style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
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
      <div className="border-t border-[#B9935B]/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#B9935B]/50">
            
            {/* Col 1: Description */}
            <div className="py-10 lg:pr-12">
                <div className="w-10 h-10 md:w-12 md:h-12 mb-6 bg-[#B9935B] rounded-full flex items-center justify-center text-black font-bold text-lg md:text-xl">
                    AP
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">
                    We create high-performance ad strategies that capture attention, target the right audience, and turn clicks into customers.
                </p>
            </div>

            {/* Col 2: Navigation */}
            <div className="py-10 md:px-12">
                <h4 
                  className="text-xs uppercase text-[#B9935B] mb-6 tracking-widest"
                  style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                >
                  Sitemap
                </h4>
                <ul className="space-y-4">
                    {['Home', 'Services', 'Packages', 'Reviews'].map((item) => (
                        <li key={item}>
                            <Link href={`#${item.toLowerCase()}`} className="text-base md:text-lg hover:text-[#B9935B] transition-colors inline-block">
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Col 3: Contact */}
            <div className="py-10 md:px-12">
                <h4 
                  className="text-xs uppercase text-[#B9935B] mb-6 tracking-widest"
                  style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                >
                  Contact
                </h4>
                <ul className="space-y-6">
                    <li>
                        <p className="text-xs text-gray-500 mb-1">Inquiries</p>
                        <a href="mailto:info@apagency.ca" className="text-base md:text-lg hover:text-[#B9935B] transition-colors break-words">info@apagency.ca</a>
                    </li>
                    <li>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <a href="tel:6474240504" className="text-base md:text-lg hover:text-[#B9935B] transition-colors">(647) 424-0504</a>
                    </li>
                    <li>
                        <p className="text-xs text-gray-500 mb-1">HQ</p>
                        <p className="text-base md:text-lg text-gray-300">Richmond Hill, ON<br/>Canada</p>
                    </li>
                </ul>
            </div>

            {/* Col 4: Legal & Hours */}
            <div className="py-10 md:pl-12 flex flex-col justify-between">
                <div>
                    <h4 
                      className="text-xs uppercase text-[#B9935B] mb-6 tracking-widest"
                      style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                    >
                      Hours
                    </h4>
                    <p className="text-sm text-gray-400 mb-2"><span className="text-white">Mon-Fri:</span> 9am - 7pm</p>
                    <p className="text-sm text-gray-400"><span className="text-white">Sat:</span> 12pm - 4pm</p>
                </div>
                
                <div className="mt-8 lg:mt-0 pt-8 border-t border-[#B9935B]/50 lg:border-0 lg:pt-0">
                    <p className="text-xs text-gray-600">
                        &copy; {currentYear} AP Agency.<br/>All rights reserved.
                    </p>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Massive Brand Watermark */}
      <div className="border-t border-[#B9935B]/50 bg-[#B9935B] overflow-hidden w-full">
        <div className="footer-brand-text flex justify-center w-full pt-4 pb-2">
            {/* UPDATED: Reduced from 16vw to 12vw to account for font width. 
                This prevents it from overflowing or looking too aggressive on smaller screens.
            */}
            <h1 
              className="text-[10vw] font-black uppercase  text-[#050505] mix-blend-multiply leading-none"
              style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
            >
                AP Agency
            </h1>
        </div>
      </div>
    </footer>
  );
}

export default Footer;