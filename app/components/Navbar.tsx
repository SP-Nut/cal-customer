'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  totalPrice: number;
}

export default function Navbar({ totalPrice }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { href: '#materials', label: 'วัสดุ', icon: '🧱' },
    { href: '#dimensions', label: 'ขนาด', icon: '📏' },
    { href: '#services', label: 'บริการ', icon: '🛠️' },
    { href: '#summary', label: 'สรุป', icon: '📝' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 backdrop-blur-lg shadow-lg border-b border-blue-500/50' 
          : 'bg-gradient-to-r from-blue-500 to-indigo-500 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Left Side - Logo & Navigation */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <img 
                  src="/materials/logo.webp" 
                  alt="SP Kansard Logo" 
                  className="h-10 lg:h-12 w-auto transition-transform group-hover:scale-105 drop-shadow-sm"
                />
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-blue-100 rounded-full transition-all group-hover:w-full"></div>
              </div>
            </Link>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navigationItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="group relative py-2 text-white/90 hover:text-white font-medium transition-all duration-200"
                >
                  <span className="text-sm lg:text-base">{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-blue-100 rounded-full transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Price Display */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Price Display */}
            <div className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
              totalPrice > 0 
                ? 'bg-white/95 backdrop-blur-sm shadow-lg shadow-black/10 scale-100 border border-white/50' 
                : 'bg-white/20 backdrop-blur-sm scale-95'
            }`}>
              <div className="px-4 lg:px-6 py-2 lg:py-2.5">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs lg:text-sm font-medium ${
                    totalPrice > 0 ? 'text-blue-600' : 'text-white/70'
                  }`}>
                    ราคารวม
                  </span>
                  <div className={`h-3 w-px ${totalPrice > 0 ? 'bg-blue-300' : 'bg-white/30'}`}></div>
                  <span className={`text-sm lg:text-base font-bold tracking-wide ${
                    totalPrice > 0 ? 'text-blue-700' : 'text-white/90'
                  }`}>
                    ฿{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
              
              {/* Animated background for active state */}
              {totalPrice > 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 hover:opacity-50 transition-opacity"></div>
              )}
            </div>

            {/* Action Button - Show when price > 0 */}
            {totalPrice > 0 && (
              <button className="hidden sm:flex items-center space-x-2 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 shadow-lg border border-white/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm">ขอใบเสนอราคา</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Slide down panel */}
      <div className="md:hidden border-t border-white/20 bg-white/10 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-2">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="flex flex-col items-center space-y-1 p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}