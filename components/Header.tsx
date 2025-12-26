// components/Header.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CornerDownRight, X, ExternalLink, Menu } from "lucide-react";
import { useBackgroundTheme } from './BackgroundContext'; // Ensure path is correct

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  
  // 1. IMPORT THEME CONTEXT
  const { theme, updateTheme } = useBackgroundTheme();

  // ==========================================
  //  SCROLL SENSOR LOGIC (The "Laser" System)
  // ==========================================
  useEffect(() => {
    const handleScrollTheme = () => {
      // Check 3 points across the screen (Left, Center, Right)
      // This ensures we catch dark columns even if they aren't in the center
      const pointsToCheck = [
        window.innerWidth * 0.1,
        window.innerWidth * 0.5,
        window.innerWidth * 0.9
      ];
      
      // Check just below the header (e.g., 20px from top)
      const y = 20;
      
      let foundDark = false;

      // Loop through all 3 points
      for (const x of pointsToCheck) {
        const elements = document.elementsFromPoint(x, y);
        
        for (const el of elements) {
          // SKIP the header itself, mobile menu, and generic HTML/BODY tags
          if (
            el.tagName === 'HEADER' || 
            el.tagName === 'BODY' || 
            el.tagName === 'HTML' ||
            el.hasAttribute('data-mobile-menu')
          ) {
            continue;
          }

          // DETECT DARK MARKERS
          // Triggers on: .dark-bg, .bg-dark, .bg-black, or data-nav-theme="dark"
          const isDark = el.closest('.dark-bg, .bg-dark, .bg-black, [data-nav-theme="dark"]');
          const isLight = el.closest('[data-nav-theme="light"]');

          // If we find an explicit LIGHT overrides inside a dark section
          if (isLight && (!isDark || isLight.contains(isDark as Node))) {
            break; // Stop checking this point
          }

          // If we find a DARK marker
          if (isDark) {
            foundDark = true;
            break; // Stop checking, we found a dark element
          }
        }
        if (foundDark) break;
      }

      // Apply result
      if (foundDark) {
        updateTheme('dark');
      } else {
        updateTheme('light');
      }
    };

    window.addEventListener('scroll', handleScrollTheme);
    handleScrollTheme(); // Run on mount

    return () => window.removeEventListener('scroll', handleScrollTheme);
  }, [updateTheme]);

  // ==========================================
  //  DYNAMIC THEME STYLES
  // ==========================================
  const getThemeClasses = () => {
    return {
      desktop: {
        container: theme === 'light' 
          ? 'bg-white/90 border-black/5 shadow-lg backdrop-blur-md' // Light Mode
          : 'bg-black/90 border-white/5 shadow-2xl backdrop-blur-md', // Dark Mode
        text: theme === 'light' ? 'text-black/80 hover:text-[#B9935B]' : 'text-white/90 hover:text-[#B9935B]',
        buttonText: theme === 'light' ? 'text-black' : 'text-white',
        dropdown: theme === 'light' 
          ? 'bg-white border-black/10 text-black shadow-xl' 
          : 'bg-[#0a0a0a] border-[#B9935B]/20 text-white shadow-2xl',
        dropdownHover: theme === 'light' ? 'hover:bg-black/5' : 'hover:bg-white/5'
      },
      mobile: {
        container: theme === 'light'
          ? 'bg-white/90 border-black/10'
          : 'bg-black/60 border-white/10',
        icon: theme === 'light' ? 'text-black' : 'text-white'
      }
    };
  };

  const themeClasses = getThemeClasses();

  const fonts = {
    header: "'Kanit', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    body: "'Inter', sans-serif",
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Packages', href: '/#packages' },
    { name: 'Reviews', href: '/#reviews' },
  ];

  const servicesItems = [
    { 
      name: 'Lead Booster', 
      href: '/', 
      desc: 'Social Lead Engine - High conversion funnels', 
      num: "01",
      external: false 
    },
    { 
      name: 'Landing Page Lead Booster', 
      href: 'https://ap-web-eight.vercel.app/', 
      desc: 'Maximize your lead generation velocity', 
      num: "02",
      external: true 
    },
    { 
      name: 'AdCraft', 
      href: 'https://ap-video.vercel.app/', 
      desc: 'High-velocity video asset production', 
      num: "03",
      external: true 
    },
  ];

  const navTextStyle = "uppercase tracking-widest text-sm font-semibold";
  const buttonTextStyle = "uppercase tracking-widest text-sm font-bold";

  return (
    <div className="relative w-full z-50"> 
      
      {/* ======================= 
          DESKTOP HEADER 
      ======================== */}
      <header className={`hidden md:flex fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1400px] h-16 border z-50 items-center px-8 transition-all duration-300 ${themeClasses.desktop.container}`}>
        
        <div className="flex-shrink-0">
          <Link href="/" className="relative block h-24 w-24 transition-transform hover:scale-105 overflow-hidden" >
            {/* Note: Ensure your logo is visible on both white and black backgrounds */}
            <Image src="/images/logo.png" alt="Logo" fill className="object-contain" priority />
          </Link>
        </div>

        <nav className="flex-1 flex justify-center">
          <ul className="flex space-x-8 lg:space-x-12 items-center">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  style={{ fontFamily: fonts.body }}
                  className={`${themeClasses.desktop.text} transition-all duration-300 ${navTextStyle} hover:tracking-[0.15em]`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            <li className="relative group h-16 flex items-center"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button 
                style={{ fontFamily: fonts.body }}
                className={`${themeClasses.desktop.text} transition-colors flex items-center gap-1 h-full ${navTextStyle}`}
              >
                Services
                <svg className={`h-4 w-4 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180 text-[#B9935B]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`absolute left-1/2 -translate-x-1/2 top-full w-[400px] p-2 transition-all duration-300 origin-top border ${themeClasses.desktop.dropdown} ${servicesDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                <div className="space-y-1 p-2">
                  {servicesItems.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      target={service.external ? "_blank" : "_self"}
                      rel={service.external ? "noopener noreferrer" : ""}
                      className={`block p-4 rounded-lg transition-all group/item border-l-2 border-transparent hover:border-[#B9935B] ${themeClasses.desktop.dropdownHover}`}
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-xl font-black text-[#B9935B]/40 group-hover/item:text-[#B9935B]" style={{ fontFamily: fonts.header }}>
                          {service.num}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-bold text-base group-hover/item:text-[#B9935B] ${theme === 'light' ? 'text-black' : 'text-white'}`} style={{ fontFamily: fonts.header }}>
                              {service.name}
                            </h4>
                            {service.external ? <ExternalLink className="h-3 w-3 text-[#B9935B] opacity-50" /> : <CornerDownRight className="h-4 w-4 text-[#B9935B] opacity-0 group-hover/item:opacity-100 transition-all" />}
                          </div>
                          <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`} style={{ fontFamily: fonts.body }}>
                            {service.desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <div className="flex-shrink-0">
          <Link 
            href="/contact" 
            style={{ fontFamily: fonts.body }}
            className={`bg-[#B9935B] text-black px-6 py-3 hover:bg-[#cfa66b] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg ${buttonTextStyle}`}
          >
            Contact
            <ArrowRight className="h-4 w-4 stroke-[3px]" />
          </Link>
        </div>
      </header>

      {/* ======================= 
          MOBILE HEADER 
      ======================== */}
      <header className={`md:hidden fixed top-3 left-1/2 transform -translate-x-1/2 w-[94%] h-16 backdrop-blur-xl z-50 flex items-center px-4 border shadow-lg transition-colors duration-300 ${themeClasses.mobile.container}`}>
        <div className="relative h-20 w-20">
          <Image src="/images/logo.png" alt="Logo" fill className="object-contain" priority />
        </div>
        
        <div className="ml-auto flex items-center gap-3">
          <Link 
            href="/contact" 
            style={{ fontFamily: fonts.body }}
            className={`bg-[#B9935B] text-black px-6 py-2.5 hover:bg-[#cfa66b] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg ${buttonTextStyle}`}
          >
            Contact
            <ArrowRight className="h-4 w-4 stroke-[3px]" />
          </Link>
          
          <button 
            className={`p-2 -mr-2 transition-colors ${themeClasses.mobile.icon} hover:text-[#B9935B]`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY (Kept Dark as per standard pattern) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-40 flex flex-col p-6 pt-24 overflow-y-auto" style={{ fontFamily: fonts.body }}>
            {/* ... Content of mobile menu kept exactly as provided ... */}
            <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 mb-6 opacity-60">
                    <div className="h-px flex-1 bg-[#B9935B]"></div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B9935B]" style={{ fontFamily: fonts.mono }}>Navigation</span>
                    <div className="h-px flex-1 bg-[#B9935B]"></div>
                </div>
                
                {navItems.map((item, index) => (
                    <Link key={index} href={item.href} className="block w-full text-center py-4 bg-[#B9935B] border border-white/5 text-black font-bold uppercase tracking-widest text-lg" onClick={() => setMobileMenuOpen(false)}>
                        {item.name}
                    </Link>
                ))}

                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-center gap-4 w-full text-center py-4 bg-white/10 border border-[#B9935B]/30 text-[#B9935B] font-bold uppercase tracking-widest text-lg"
                >
                    Services
                    <svg className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {mobileServicesOpen && (
                    <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        {servicesItems.map((service, index) => (
                            <Link 
                                key={index} 
                                href={service.href} 
                                target={service.external ? "_blank" : "_self"}
                                className="block w-full p-4 bg-white/5 border border-white/10 text-left"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[#B9935B] font-mono text-xs">{service.num}</span>
                                    {service.external && <ExternalLink className="h-3 w-3 text-[#B9935B]/50" />}
                                </div>
                                <h4 className="text-white font-bold uppercase tracking-wider text-sm mt-1">{service.name}</h4>
                                <p className="text-[10px] text-gray-500 uppercase mt-1 leading-tight">{service.desc}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-auto">
                <Link href="/contact" className={`flex items-center justify-center gap-3 w-full py-5 bg-[#B9935B] text-black ${buttonTextStyle} text-base`} onClick={() => setMobileMenuOpen(false)}>
                    Start Project
                    <ArrowRight className="h-5 w-5 stroke-[3px]" />
                </Link>
                <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-widest" style={{ fontFamily: fonts.mono }}>
                    AP Agency © {new Date().getFullYear()}
                </p>
            </div>
        </div>
      )}
    </div>
  );
};

export default Header;