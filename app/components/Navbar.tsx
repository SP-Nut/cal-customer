'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  totalPrice: number;
}

export default function Navbar({ totalPrice }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-soft z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center space-x-10">
            <div className="flex items-center hover:opacity-90 transition-opacity">
              <img 
                src="/materials/logo.webp" 
                alt="SP Kansard Logo" 
                className="h-14 w-auto"
              />
            </div>
            <div className="flex items-center space-x-8">
              <Link href="#materials" className="text-gray-600 hover:text-primary font-medium transition-colors relative group">
                <span>วัสดุ</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link href="#dimensions" className="text-gray-600 hover:text-primary font-medium transition-colors relative group">
                <span>ขนาด</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link href="#services" className="text-gray-600 hover:text-primary font-medium transition-colors relative group">
                <span>บริการ</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link href="#extras" className="text-gray-600 hover:text-primary font-medium transition-colors relative group">
                <span>เพิ่มเติม</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-primary-dark to-primary text-white px-6 py-2.5 rounded-xl shadow-soft hover:shadow-md transition-all">
              <span className="text-base font-medium tracking-wide">
                ราคารวม: ฿{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
