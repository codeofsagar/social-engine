"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CornerDownRight, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  // Defined font stack
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
    { name: 'Strategy & Setup', href: '/#services', desc: 'Full funnel infrastructure & customer journey mapping', num: "01" },
    { name: 'Creative Production', href: '/#services', desc: 'High-velocity asset generation for impulse triggers', num: "02" },
    { name: 'Audience Targeting', href: '/#services', desc: 'Sniper precision targeting with AI modeling', num: "03" },
    { name: 'Optimization', href: '/#services', desc: 'Algorithmic dominance for decreasing CPA', num: "04" },
    { name: 'Tracking & Intel', href: '/#services', desc: 'Radical transparency with custom dashboards', num: "05" },
    { name: 'View All Services', href: '/#services', desc: 'Complete service breakdown', num: "ALL" },
  ];

  // Shared styles using the body font
  const navTextStyle = "uppercase tracking-widest text-sm font-semibold"; // Body font, 600 weight
  const buttonTextStyle = "uppercase tracking-widest text-sm font-bold";   // Body font, 700 weight

  return (
    <div className="relative w-full z-50"> 
      
      {/* ======================= 
          DESKTOP HEADER 
      ======================== */}
      <header className="hidden md:flex fixed top-3  left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1400px] h-16 backdrop-blur-md  bg-black/90 border border-white/5 z-50 items-center px-8 shadow-2xl shadow-black/20">
        
        {/* Logo Container */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6">
          <div className="relative h-24 w-24  transition-transform hover:scale-105">
            <Image 
              src="/images/logo.png" 
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-1 justify-center pl-20 lg:pl-0">
          <ul className="flex space-x-6 lg:space-x-10 items-center">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  style={{ fontFamily: fonts.body }}
                  className={`text-white/90 hover:text-[#B9935B] transition-all duration-300 ${navTextStyle} hover:tracking-[0.15em]`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            {/* Services Dropdown Trigger */}
            <li className="relative group h-20 flex items-center"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button 
                style={{ fontFamily: fonts.body }}
                className={`text-white/90 group-hover:text-[#B9935B] transition-colors flex items-center gap-1 h-full ${navTextStyle}`}
              >
                Services
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180 text-[#B9935B]' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 top-[85%] mt-0 w-[450px] bg-[#0a0a0a] backdrop-blur-xl  shadow-2xl border border-[#B9935B]/20 p-2 transition-all duration-300 origin-top ${servicesDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}
              >
                <div className="space-y-1 max-h-[70vh] overflow-y-auto custom-scrollbar p-2">
                  {servicesItems.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className="block p-3 hover:bg-white/5 rounded-lg transition-all duration-300 group/item border-l-2 border-transparent hover:border-[#B9935B]"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-xl font-black text-[#B9935B]/40 group-hover/item:text-[#B9935B] transition-colors" 
                              style={{ fontFamily: fonts.header }}>
                          {service.num}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-bold text-base group-hover/item:text-[#B9935B] transition-colors" 
                                style={{ fontFamily: fonts.header }}>
                              {service.name}
                            </h4>
                            <CornerDownRight className="h-4 w-4 text-[#B9935B] opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                          </div>
                          <p className="text-xs text-gray-400 mt-1 font-medium leading-relaxed" 
                             style={{ fontFamily: fonts.body }}>
                            {service.desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Dropdown Stats Footer */}
                <div className="mt-2 pt-3 border-t border-white/10 px-2 pb-1">
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider" style={{ fontFamily: fonts.mono }}>Avg ROI</span>
                      <span className="text-[#B9935B] font-black text-lg" style={{ fontFamily: fonts.header }}>3.2x</span>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider" style={{ fontFamily: fonts.mono }}>Success</span>
                      <span className="text-[#B9935B] font-black text-lg" style={{ fontFamily: fonts.header }}>98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Desktop Contact Button */}
        <div className="absolute right-2 md:right-4">
          <Link 
            href="/contact" 
            style={{ fontFamily: fonts.body }}
            className={`bg-[#B9935B] text-black px-6 py-3  hover:bg-[#cfa66b] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_15px_rgba(185,147,91,0.2)] hover:shadow-[0_0_25px_rgba(185,147,91,0.4)] ${buttonTextStyle}`}
          >
            Contact
            <ArrowRight className="h-4 w-4 stroke-[3px]" />
          </Link>
        </div>
      </header>

      {/* ======================= 
          MOBILE HEADER 
          Optimized for Foldables 
      ======================== */}
      <header className="md:hidden fixed top-3 left-1/2 transform -translate-x-1/2 w-[94%] max-w-[500px] h-16 backdrop-blur-xl bg-black/60  z-50 flex items-center px-4 border border-white/10 shadow-lg">
        {/* Logo */}
        <div className="relative h-14 w-14 shrink-0">
          <Image 
            src="/images/logo.png" 
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-3">
          <Link href="/contact"
            style={{ fontFamily: fonts.body }}
            className={`bg-[#B9935B] text-black px-4 py-2  text-xs flex items-center gap-1 hover:bg-[#cfa66b] transition-colors whitespace-nowrap ${buttonTextStyle}`}
          >
            Contact
            <ArrowRight className="h-3 w-3 stroke-[3px]" />
          </Link>
          
          <button 
            className="p-2 -mr-2 text-white hover:text-[#B9935B] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ======================= 
          MOBILE MENU OVERLAY 
      ======================== */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black z-40 overflow-y-auto"
          style={{ fontFamily: fonts.body }}
        >
          {/* Background Noise Texture */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[0]" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Header Placeholder for spacing */}
            <div className="h-24"></div>

            {/* Menu Content */}
            <div className="px-6 pb-12 flex-1 flex flex-col">
              
              {/* Main Nav Links */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 mb-6 opacity-60">
                  <div className="h-px flex-1 bg-[#B9935B]"></div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B9935B]" style={{ fontFamily: fonts.mono }}>Menu</span>
                  <div className="h-px flex-1 bg-[#B9935B]"></div>
                </div>
                
                {navItems.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href}
                    style={{ fontFamily: fonts.body }}
                    className={`block w-full text-center py-4 bg-[#B9935B]  border border-white/5 hover:border-[#B9935B]/50 hover:bg-white transition-all ${navTextStyle} text-lg md:text-xl text-black`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Services List (Compact for Mobile) */}
              <div className="mb-10">
                 <div className="flex items-center gap-4 mb-6 opacity-60">
                  <div className="h-px flex-1 bg-[#B9935B]"></div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B9935B]" style={{ fontFamily: fonts.mono }}>Services</span>
                  <div className="h-px flex-1 bg-[#B9935B]"></div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {servicesItems.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className="group flex items-center justify-between p-4 bg-black border border-white/10  active:scale-[0.98] transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-[#B9935B] font-black text-sm shrink-0" style={{ fontFamily: fonts.mono }}>
                          {service.num}
                        </span>
                        <span className="text-white font-bold text-sm truncate uppercase tracking-wider" style={{ fontFamily: fonts.body }}>
                          {service.name}
                        </span>
                      </div>
                      <CornerDownRight className="h-4 w-4 text-gray-500 group-hover:text-[#B9935B] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="mt-auto">
                <Link
                  href="/contact"
                  style={{ fontFamily: fonts.body }}
                  className={`flex items-center justify-center gap-3 w-full py-5 bg-[#B9935B] text-black rounded-lg hover:bg-[#cfa66b] transition-all shadow-[0_5px_20px_rgba(185,147,91,0.2)] ${buttonTextStyle} text-base`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Project
                  <ArrowRight className="h-5 w-5 stroke-[3px]" />
                </Link>
                
                <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-widest" style={{ fontFamily: fonts.mono }}>
                  AP Agency © {new Date().getFullYear()}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;