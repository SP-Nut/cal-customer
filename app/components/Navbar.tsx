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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-3 lg:px-4">
        <div className="flex justify-between items-center h-8 lg:h-10">
          {/* Left Side - Contact Information */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Contact Info */}
            <div className="flex items-center space-x-1.5 lg:space-x-2">
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs font-medium text-white">
                  081-234-5678
                </span>
              </div>
              
              <div className="h-3 w-px bg-slate-500"></div>
              
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs font-medium text-white">
                  กรุงเทพฯ
                </span>
              </div>

              <div className="hidden sm:block h-3 w-px bg-slate-500"></div>
              
              <div className="hidden sm:flex items-center space-x-1">
                <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium text-white">
                  8:00-18:00
                </span>
              </div>

              <div className="hidden md:block h-3 w-px bg-slate-500"></div>
              
              <div className="hidden md:flex items-center space-x-1">
                <svg className="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium text-white">
                  รับประกัน 5 ปี
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Price Display & Actions */}
          <div className="flex items-center space-x-2.5">
            {/* Price Display */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-amber-400">
                ราคารวม
              </span>
              <div className="h-3 w-px bg-amber-400"></div>
              <span className="text-sm lg:text-base font-bold tracking-wide text-white">
                ฿{totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Action Button - Show when price > 0 */}
            {totalPrice > 0 && (
              <button className="hidden sm:flex items-center space-x-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-2 py-1 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md text-xs">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>ขอใบเสนอราคา</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}