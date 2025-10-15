'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Clock, ShieldCheck } from 'lucide-react';

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
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/40 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Left Side - Logo & Brand */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            <Link 
              href="/" 
              onClick={() => window.location.reload()}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/materials/logo.webp" 
                alt="SP Kansard Logo" 
                className="h-10 lg:h-12 w-auto object-contain"
              />
         
            </Link>
          </div>

          {/* Center - Contact Information */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-6 h-6 text-emerald-600" />
                <div>
                  <span className="text-xs text-gray-500">โทรศัพท์</span>
                  <p className="text-sm font-semibold text-gray-700">084-909-7777</p>
                </div>
              </div>
              
              <div className="h-8 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-slate-600" />
                <div>
                  <span className="text-xs text-gray-500">เวลาทำการ</span>
                  <p className="text-sm font-semibold text-gray-700">8:00-17:00</p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <div>
                  <span className="text-xs text-gray-500">รับประกัน</span>
                  <p className="text-sm font-semibold text-gray-700">สูงสุด 5 ปี</p>
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Navbar button clicked!', { totalPrice, onQuoteRequest });
                  if (onQuoteRequest) {
                    onQuoteRequest();
                  }
                }}
                onMouseDown={(e) => {
                  console.log('Button mousedown detected');
                }}
                className="relative z-[60] pointer-events-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-4 py-2.5 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-sm cursor-pointer"
                style={{ pointerEvents: 'auto' }}
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