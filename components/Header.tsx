"use client"; // Mark as client component

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Packages', href: '/#packages' },
    { name: 'Reviews', href: '/#reviews' },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex fixed top-4 left-1/2 transform -translate-x-1/2 w-[80%] h-16 backdrop-blur-sm  rounded-lg bg-black/30 z-50 items-center px-8">
        {/* Large overlapping logo */}
        <div className="absolute -top-6 left-4">
          <div className="relative h-32 w-32">
            <Image 
              src="/images/logo.png" 
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex flex-1 justify-center ml-24">
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  className="text-white font-medium hover:text-[#B9935B] transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact button */}
        <Link href="/contact" className="bg-[#B9935B] text-black rounded-full px-6 py-2 font-medium hover:bg-amber-700 transition-colors">
          Contact
        </Link>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 w-[80%] h-16 backdrop-blur-sm bg-black/30 rounded-lg z-50 flex items-center px-4">
        {/* Large overlapping logo */}
        <div className="absolute  left-2">
          <div className="relative h-28 w-28">
            <Image 
              src="/images/logo.png" 
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Contact button + hamburger */}
        <div className="ml-auto flex items-center gap-2">
          <Link href="/contact"
            className="bg-[#B9935B] text-black rounded-full px-4 py-2 text-sm font-medium"
          >
            Contact
          </Link>
          <button 
            className="p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-24 left-1/2 transform -translate-x-1/2 w-[80%] backdrop-blur-sm bg-[#B9935B] rounded-lg z-50 p-6">
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  className="block text-center text-white font-extrabold py-2 hover:bg-blue-800/30 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;