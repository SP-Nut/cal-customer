'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  totalPrice: number;
  onQuoteRequest?: () => void;
}

export default function Navbar({ totalPrice, onQuoteRequest }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Left Side - Logo & Brand */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/materials/logo.webp" 
                alt="SP Kansard Logo" 
                className="h-10 lg:h-12 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-base lg:text-lg font-bold text-gray-800 tracking-wide">
                  SP Kansard
                </h1>
                <p className="text-sm text-gray-600 -mt-0.5">
                  กันสาด & หลังคา
                </p>
              </div>
            </div>
          </div>

          {/* Center - Contact Information */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <div>
                  <span className="text-xs text-gray-500">โทรศัพท์</span>
                  <p className="text-sm font-semibold text-gray-700">081-234-5678</p>
                </div>
              </div>
              
              <div className="h-8 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="text-xs text-gray-500">เวลาทำการ</span>
                  <p className="text-sm font-semibold text-gray-700">8:00-18:00</p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <div>
                  <span className="text-xs text-gray-500">รับประกัน</span>
                  <p className="text-sm font-semibold text-gray-700">5 ปี</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Price & Actions */}
          <div className="flex items-center space-x-3">
            {/* Price Display */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-amber-600 font-medium">ราคารวม</span>
              <span className="text-sm lg:text-base font-bold text-gray-800 tracking-wide">
                ฿{totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Action Button - Show when price > 0 */}
            {totalPrice > 0 && (
              <button 
                onClick={onQuoteRequest}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-4 py-2.5 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-sm"
              >
                ขอใบเสนอราคา
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}