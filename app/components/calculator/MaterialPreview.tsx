'use client';

import React from 'react';
import { Material, Size, Service, ExtraService } from '../../lib/types';
import { gutterMaterials } from '../../lib/materials/gutterMaterials';

interface MaterialPreviewProps {
  material: Material | null;
  selectedSize: Size | null;
  dimensions?: { width: number; length: number };
  totalPrice?: number;
  selectedServices?: string[];
  selectedExtras?: Record<string, string>;
  mainServices?: Service[];
  extraServices?: ExtraService[];
  selectedServiceOptions?: Record<string, string>;
  gutterMaterials?: Record<string, string>;
  onNext?: () => void;
  onSizeSelect?: (sizeId: string) => void;
}

export function MaterialPreview({ 
  material, 
  selectedSize, 
  dimensions = { width: 0, length: 0 },
  totalPrice = 0,
  selectedServices = [],
  selectedExtras = {},
  mainServices = [],
  extraServices = [],
  selectedServiceOptions = {},
  gutterMaterials: selectedGutterMaterials = {},
  onNext,
  onSizeSelect 
}: MaterialPreviewProps) {
  if (!material) {
    return (
      <div className="h-full relative overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-slate-50" 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          * {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          *::-webkit-scrollbar {
            display: none;
          }
          div::-webkit-scrollbar {
            display: none;
          }
          @keyframes float-gentle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes pulse-soft {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }
          @keyframes drift {
            0% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(20px) translateY(-20px); }
            100% { transform: translateX(0) translateY(0); }
          }
          @keyframes rotate-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        
        {/* Modern Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-pink-50/70"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-purple-50/30 to-blue-100/40"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-1/5 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/35 via-purple-100/30 to-transparent rounded-full animate-pulse-soft blur-xl"></div>
          <div className="absolute top-1/2 right-1/6 w-48 h-48 bg-gradient-to-r from-pink-100/30 to-blue-100/35 rounded-full" style={{ animation: 'drift 15s linear infinite' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-purple-100/40 to-slate-100/30 rounded-full" style={{ animation: 'float-gentle 4s ease-in-out infinite' }}></div>
          <div className="absolute top-1/3 left-1/5 w-40 h-40 bg-gradient-to-br from-cyan-100/25 to-purple-100/20 rounded-full" style={{ animation: 'pulse-soft 7s ease-in-out infinite' }}></div>
          <div className="absolute bottom-1/5 left-1/3 w-24 h-24 bg-gradient-to-br from-pink-100/30 to-blue-100/25 rounded-full" style={{ animation: 'drift 10s linear infinite' }}></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 flex flex-col p-4 lg:p-8 w-full">
            
            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center py-4 lg:py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full max-w-6xl mx-auto"
                   style={{ transform: 'translateX(0)' }}>
                
                {/* Content Section */}
                <div className="text-center lg:text-left space-y-2 lg:space-y-3 order-2 lg:order-1">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 lg:space-x-3 mb-2 lg:mb-3">
                    <div className="w-6 lg:w-12 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full"></div>
                    <p className="text-xs lg:text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-widest">
                      ระบบคำนวณมืออาชีพ
                    </p>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-extralight mb-2 lg:mb-4 leading-tight text-slate-800">
                    สร้างโซลูชั่น<br />
                    <span className="font-normal bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      กันสาดและหลังคา
                    </span>
                    <br />
                    <span className="font-normal bg-gradient-to-r from-purple-600 via-blue-500 to-slate-600 bg-clip-text text-transparent">
                      ที่ดีที่สุด
                    </span>
                  </h2>
                  
                  <div className="bg-transparent p-2 lg:p-4 mb-2 lg:mb-4">
                    <p className="text-xs lg:text-base text-slate-700 leading-snug font-normal">
                      ระบบคำนวณราคากันสาดและหลังคาแบบมืออาชีพ คำนวณราคาแม่นยำครบครันทุกรายการ 
                      ด้วยประสบการณ์มากกว่า 15 ปี พร้อมบริการครบวงจร
                    </p>
                  </div>
                  
                  {/* Professional Image - Mobile Only */}
                  <div className="block lg:hidden relative mb-2 lg:mb-4">
                    <div className="relative w-full max-w-xs mx-auto">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/60 via-white/40 to-slate-50/50 backdrop-blur-sm"></div>
                      
                      {/* Enhanced Floating Elements - Mobile */}
                      {/* Background floating elements - Large */}
                      <div className="absolute top-1/5 right-1/5 w-20 h-20 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-transparent rounded-full blur-xl" style={{ animation: 'pulse-soft 8s ease-in-out infinite' }}></div>
                      <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-br from-pink-100/35 to-blue-100/40 rounded-full blur-lg" style={{ animation: 'drift 12s linear infinite' }}></div>
                      <div className="absolute bottom-1/4 right-1/3 w-18 h-18 bg-gradient-to-br from-purple-100/30 to-slate-100/35 rounded-full blur-lg" style={{ animation: 'float-gentle 6s ease-in-out infinite' }}></div>
                      <div className="absolute top-1/6 left-1/4 w-14 h-14 bg-gradient-to-br from-cyan-100/25 to-purple-100/30 rounded-full blur-md" style={{ animation: 'pulse-soft 10s ease-in-out infinite' }}></div>
                      <div className="absolute bottom-1/6 left-1/5 w-12 h-12 bg-gradient-to-br from-pink-100/40 to-blue-100/35 rounded-full blur-md" style={{ animation: 'drift 14s linear infinite' }}></div>
                      
                      {/* Main floating circles */}
                      <div className="absolute top-4 right-4 w-14 h-14 bg-gradient-to-br from-blue-200/70 to-purple-200/65 rounded-full" style={{ animation: 'float-gentle 3s ease-in-out infinite' }}></div>
                      <div className="absolute top-1/4 left-3 w-12 h-12 bg-gradient-to-br from-pink-200/75 to-blue-200/70 rounded-full" style={{ animation: 'pulse-soft 4s ease-in-out infinite' }}></div>
                      <div className="absolute bottom-1/3 right-3 w-12 h-12 bg-gradient-to-br from-purple-200/70 to-pink-200/65 rounded-full" style={{ animation: 'drift 8s linear infinite' }}></div>
                      
                      {/* Additional floating circles */}
                      <div className="absolute top-6 left-6 w-8 h-8 bg-gradient-to-br from-cyan-200/60 to-blue-200/55 rounded-full" style={{ animation: 'pulse-soft 5s ease-in-out infinite', animationDelay: '1s' }}></div>
                      <div className="absolute top-1/3 right-6 w-10 h-10 bg-gradient-to-br from-emerald-200/65 to-teal-200/60 rounded-full" style={{ animation: 'float-gentle 6s ease-in-out infinite', animationDelay: '2s' }}></div>
                      <div className="absolute bottom-1/4 left-4 w-10 h-10 bg-gradient-to-br from-rose-200/70 to-pink-200/65 rounded-full" style={{ animation: 'drift 7s linear infinite', animationDelay: '0.5s' }}></div>
                      <div className="absolute top-2/3 right-1/4 w-8 h-8 bg-gradient-to-br from-amber-200/55 to-yellow-200/50 rounded-full" style={{ animation: 'pulse-soft 4.5s ease-in-out infinite', animationDelay: '1.5s' }}></div>
                      <div className="absolute bottom-1/6 right-1/3 w-10 h-10 bg-gradient-to-br from-indigo-200/65 to-purple-200/60 rounded-full" style={{ animation: 'float-gentle 5.5s ease-in-out infinite', animationDelay: '3s' }}></div>
                      
                      {/* Small floating dots */}
                      <div className="absolute top-1/5 left-1/5 w-2 h-2 bg-blue-300/80 rounded-full" style={{ animation: 'pulse-soft 3s ease-in-out infinite', animationDelay: '0.5s' }}></div>
                      <div className="absolute top-1/6 right-1/5 w-1.5 h-1.5 bg-purple-300/75 rounded-full" style={{ animation: 'float-gentle 2.5s ease-in-out infinite', animationDelay: '1.2s' }}></div>
                      <div className="absolute top-3/5 left-1/6 w-3 h-3 bg-pink-300/70 rounded-full" style={{ animation: 'drift 4s linear infinite', animationDelay: '2.1s' }}></div>
                      <div className="absolute bottom-1/5 left-1/3 w-3 h-3 bg-cyan-300/65 rounded-full" style={{ animation: 'pulse-soft 3.5s ease-in-out infinite', animationDelay: '1.8s' }}></div>
                      <div className="absolute top-1/2 right-1/6 w-2 h-2 bg-emerald-300/70 rounded-full" style={{ animation: 'float-gentle 4.2s ease-in-out infinite', animationDelay: '2.5s' }}></div>
                      <div className="absolute bottom-2/5 right-1/5 w-1.5 h-1.5 bg-rose-300/60 rounded-full" style={{ animation: 'drift 3.8s linear infinite', animationDelay: '0.8s' }}></div>
                      
                      {/* Geometric shapes */}
                      <div className="absolute top-1/5 right-1/3 w-4 h-4 bg-gradient-to-br from-blue-300/60 to-purple-300/55 transform rotate-45" style={{ animation: 'rotate-slow 20s linear infinite' }}></div>
                      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-gradient-to-br from-pink-300/65 to-rose-300/60 transform rotate-12" style={{ animation: 'drift 9s linear infinite' }}></div>
                      <div className="absolute top-2/5 left-1/5 w-4 h-4 bg-gradient-to-br from-cyan-300/55 to-teal-300/50 transform rotate-45" style={{ animation: 'pulse-soft 6s ease-in-out infinite' }}></div>
                      
                      {/* Triangle shapes */}
                      <div className="absolute top-1/6 left-1/3 w-4 h-4 bg-gradient-to-br from-violet-200/60 to-purple-200/55" 
                           style={{
                             clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                             animation: 'float-gentle 7s ease-in-out infinite',
                             animationDelay: '1.5s'
                           }}></div>
                      <div className="absolute bottom-1/5 right-1/4 w-3 h-3 bg-gradient-to-br from-orange-200/65 to-amber-200/60" 
                           style={{
                             clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                             animation: 'drift 5.5s linear infinite',
                             animationDelay: '2.8s'
                           }}></div>
                      
                      {/* Ring elements */}
                      <div className="absolute top-1/4 right-1/5 w-6 h-6 border-2 border-blue-200/60 rounded-full" style={{ animation: 'pulse-soft 4.5s ease-in-out infinite', animationDelay: '0.8s' }}></div>
                      <div className="absolute bottom-1/3 left-1/5 w-5 h-5 border border-purple-200/55 rounded-full" style={{ animation: 'float-gentle 3.8s ease-in-out infinite', animationDelay: '2.2s' }}></div>
                      <div className="absolute top-1/2 left-1/4 w-5 h-5 border-2 border-pink-200/50 rounded-full" style={{ animation: 'drift 6.5s linear infinite', animationDelay: '1.7s' }}></div>
                      
                      {/* Professional Image */}
                      <div className="relative z-10 group">
                        <img 
                          src="/materials/pr.png" 
                          alt="SP Kansard Professional Consultant" 
                          className="w-full h-auto object-contain relative z-10 drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
                          <span className="text-xs font-semibold text-blue-600">ผู้เชี่ยวชาญ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Feature Cards */}
                  <div className="grid gap-1.5 lg:gap-2 mb-2 lg:mb-4">
                    {[
                      { icon: '✓', title: 'คำนวณราคาแม่นยำ', desc: 'ไม่มีค่าใช้จ่ายแอบแฝง โปร่งใสทุกรายการ', bg: 'from-blue-500 via-purple-500 to-pink-500' },
                      { icon: '⚡', title: 'วัสดุคุณภาพสูง', desc: 'มาตรฐานสากล ทนทาน ใช้งานได้ยาวนาน', bg: 'from-purple-500 via-blue-500 to-cyan-500' },
                      { icon: '🏠', title: 'ทีมช่างมืออาชีพ', desc: 'รับประกันงาน บริการหลังการขายครบถ้วน', bg: 'from-pink-500 via-purple-500 to-blue-500' }
                    ].map((item, index) => (
                      <div key={index} className="group bg-transparent p-2 lg:p-3 hover:bg-white/10 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10">
                        {/* Mobile Layout - Icon on top */}
                        <div className="text-center lg:hidden">
                          <div className={`w-6 h-6 bg-gradient-to-br ${item.bg} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto mb-1`}>
                            <span className="text-white font-bold text-xs">{item.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-xs mb-0">{item.title}</h4>
                            <p className="text-slate-600 text-xs leading-tight">{item.desc}</p>
                          </div>
                        </div>
                        
                        {/* Desktop Layout - Icon on left */}
                        <div className="hidden lg:flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${item.bg} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white font-bold text-base">{item.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-base mb-0.5">{item.title}</h4>
                            <p className="text-slate-600 text-sm leading-tight">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Image Section - Desktop Only */}
                <div className="relative order-1 lg:order-2 hidden lg:block">
                  <div className="relative w-full max-w-md mx-auto">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/60 via-white/40 to-slate-50/50 backdrop-blur-sm"></div>
                    
                    {/* Enhanced Floating Elements */}
                    {/* Background floating elements - Large */}
                    <div className="absolute top-1/5 right-1/5 w-32 h-32 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-transparent rounded-full blur-2xl" style={{ animation: 'pulse-soft 8s ease-in-out infinite' }}></div>
                    <div className="absolute top-1/2 left-1/6 w-24 h-24 bg-gradient-to-br from-pink-100/35 to-blue-100/40 rounded-full blur-xl" style={{ animation: 'drift 12s linear infinite' }}></div>
                    <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-100/30 to-slate-100/35 rounded-full blur-xl" style={{ animation: 'float-gentle 6s ease-in-out infinite' }}></div>
                    <div className="absolute top-1/6 left-1/4 w-20 h-20 bg-gradient-to-br from-cyan-100/25 to-purple-100/30 rounded-full blur-lg" style={{ animation: 'pulse-soft 10s ease-in-out infinite' }}></div>
                    <div className="absolute bottom-1/6 left-1/5 w-16 h-16 bg-gradient-to-br from-pink-100/40 to-blue-100/35 rounded-full blur-lg" style={{ animation: 'drift 14s linear infinite' }}></div>
                    
                    {/* Main floating circles */}
                    <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-blue-200/70 to-purple-200/65 rounded-full" style={{ animation: 'float-gentle 3s ease-in-out infinite' }}></div>
                    <div className="absolute top-1/4 left-4 w-16 h-16 bg-gradient-to-br from-pink-200/75 to-blue-200/70 rounded-full" style={{ animation: 'pulse-soft 4s ease-in-out infinite' }}></div>
                    <div className="absolute bottom-1/3 right-4 w-18 h-18 bg-gradient-to-br from-purple-200/70 to-pink-200/65 rounded-full" style={{ animation: 'drift 8s linear infinite' }}></div>
                    
                    {/* Additional floating circles */}
                    <div className="absolute top-8 left-8 w-10 h-10 bg-gradient-to-br from-cyan-200/60 to-blue-200/55 rounded-full" style={{ animation: 'pulse-soft 5s ease-in-out infinite', animationDelay: '1s' }}></div>
                    <div className="absolute top-1/3 right-8 w-12 h-12 bg-gradient-to-br from-emerald-200/65 to-teal-200/60 rounded-full" style={{ animation: 'float-gentle 6s ease-in-out infinite', animationDelay: '2s' }}></div>
                    <div className="absolute bottom-1/4 left-6 w-12 h-12 bg-gradient-to-br from-rose-200/70 to-pink-200/65 rounded-full" style={{ animation: 'drift 7s linear infinite', animationDelay: '0.5s' }}></div>
                    <div className="absolute top-2/3 right-1/4 w-10 h-10 bg-gradient-to-br from-amber-200/55 to-yellow-200/50 rounded-full" style={{ animation: 'pulse-soft 4.5s ease-in-out infinite', animationDelay: '1.5s' }}></div>
                    <div className="absolute bottom-1/6 right-1/3 w-14 h-14 bg-gradient-to-br from-indigo-200/65 to-purple-200/60 rounded-full" style={{ animation: 'float-gentle 5.5s ease-in-out infinite', animationDelay: '3s' }}></div>
                    
                    {/* Small floating dots */}
                    <div className="absolute top-1/5 left-1/5 w-3 h-3 bg-blue-300/80 rounded-full" style={{ animation: 'pulse-soft 3s ease-in-out infinite', animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/6 right-1/5 w-2 h-2 bg-purple-300/75 rounded-full" style={{ animation: 'float-gentle 2.5s ease-in-out infinite', animationDelay: '1.2s' }}></div>
                    <div className="absolute top-3/5 left-1/6 w-4 h-4 bg-pink-300/70 rounded-full" style={{ animation: 'drift 4s linear infinite', animationDelay: '2.1s' }}></div>
                    <div className="absolute bottom-1/5 left-1/3 w-4 h-4 bg-cyan-300/65 rounded-full" style={{ animation: 'pulse-soft 3.5s ease-in-out infinite', animationDelay: '1.8s' }}></div>
                    <div className="absolute top-1/2 right-1/6 w-3 h-3 bg-emerald-300/70 rounded-full" style={{ animation: 'float-gentle 4.2s ease-in-out infinite', animationDelay: '2.5s' }}></div>
                    <div className="absolute bottom-2/5 right-1/5 w-2 h-2 bg-rose-300/60 rounded-full" style={{ animation: 'drift 3.8s linear infinite', animationDelay: '0.8s' }}></div>
                    
                    {/* Geometric shapes */}
                    <div className="absolute top-1/5 right-1/3 w-6 h-6 bg-gradient-to-br from-blue-300/60 to-purple-300/55 transform rotate-45" style={{ animation: 'rotate-slow 20s linear infinite' }}></div>
                    <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-gradient-to-br from-pink-300/65 to-rose-300/60 transform rotate-12" style={{ animation: 'drift 9s linear infinite' }}></div>
                    <div className="absolute top-2/5 left-1/5 w-6 h-6 bg-gradient-to-br from-cyan-300/55 to-teal-300/50 transform rotate-45" style={{ animation: 'pulse-soft 6s ease-in-out infinite' }}></div>
                    
                    {/* Triangle shapes */}
                    <div className="absolute top-1/6 left-1/3 w-5 h-5 bg-gradient-to-br from-violet-200/60 to-purple-200/55" 
                         style={{
                           clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                           animation: 'float-gentle 7s ease-in-out infinite',
                           animationDelay: '1.5s'
                         }}></div>
                    <div className="absolute bottom-1/5 right-1/4 w-4 h-4 bg-gradient-to-br from-orange-200/65 to-amber-200/60" 
                         style={{
                           clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                           animation: 'drift 5.5s linear infinite',
                           animationDelay: '2.8s'
                         }}></div>
                    
                    {/* Ring elements */}
                    <div className="absolute top-1/4 right-1/5 w-8 h-8 border-2 border-blue-200/60 rounded-full" style={{ animation: 'pulse-soft 4.5s ease-in-out infinite', animationDelay: '0.8s' }}></div>
                    <div className="absolute bottom-1/3 left-1/5 w-6 h-6 border border-purple-200/55 rounded-full" style={{ animation: 'float-gentle 3.8s ease-in-out infinite', animationDelay: '2.2s' }}></div>
                    <div className="absolute top-1/2 left-1/4 w-6 h-6 border-2 border-pink-200/50 rounded-full" style={{ animation: 'drift 6.5s linear infinite', animationDelay: '1.7s' }}></div>
                    
                    {/* Professional Image */}
                    <div className="relative z-10 group">
                      <img 
                        src="/materials/pr.png" 
                        alt="SP Kansard Professional Consultant" 
                        className="w-full h-auto object-contain relative z-10 drop-shadow-xl transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                        <span className="text-xs font-semibold text-blue-600">ผู้เชี่ยวชาญ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Information Section - Hidden on Mobile, Visible on Desktop */}
          <div className="hidden lg:block mt-2 lg:mt-4 pt-2 lg:pt-4 border-t border-white/20 w-full">
            <div className="text-center space-y-2 lg:space-y-4 w-full max-w-6xl mx-auto"
                 style={{ transform: 'translateX(0)' }}>
              <div className="flex items-center justify-center space-x-2 lg:space-x-3 mb-2 lg:mb-4">
                <div className="w-8 lg:w-16 h-0.5 lg:h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full"></div>
                <h3 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  ติดต่อเราเพื่อรับคำปรึกษา
                </h3>
                <div className="w-8 lg:w-16 h-0.5 lg:h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-full"></div>
              </div>
              
              {/* Contact Grid - 3 columns top, 3 columns bottom */}
              <div className="space-y-2 lg:space-y-4">
                {/* Top Row - 3 columns */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 lg:gap-4 w-full">
                  {/* Phone Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-2 lg:p-6 rounded-lg lg:rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 transform hover:-translate-y-1">
                    <div className="text-center space-y-1 lg:space-y-3">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 lg:w-10 lg:h-10 text-gray-700 group-hover:text-gray-900 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-xs lg:text-base mb-0.5 lg:mb-1">โทรศัพท์</h4>
                        <p className="text-gray-700 text-xs lg:text-sm font-medium">02-123-4567</p>
                        <p className="text-gray-500 text-xs">จันทร์-เสาร์ 8:00-18:00</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Line Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-3 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 transform hover:-translate-y-1">
                    <div className="text-center space-y-2 lg:space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 lg:w-12 lg:h-12 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm lg:text-lg mb-1 lg:mb-2">Line ID</h4>
                        <p className="text-gray-700 text-xs lg:text-base font-medium">@spkansard</p>
                        <p className="text-gray-500 text-xs">ตอบเร็ว 24 ชม.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Email Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-3 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10 transform hover:-translate-y-1">
                    <div className="text-center space-y-2 lg:space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 lg:w-12 lg:h-12 text-slate-600 group-hover:text-slate-700 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm lg:text-lg mb-1 lg:mb-2">อีเมล</h4>
                        <p className="text-gray-700 text-xs lg:text-base font-medium">info@spkansard.com</p>
                        <p className="text-gray-500 text-xs">ตอบภายใน 24 ชม.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Row - 3 columns */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 w-full">
                  {/* WhatsApp Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-3 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 transform hover:-translate-y-1">
                    <div className="text-center space-y-2 lg:space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 lg:w-12 lg:h-12 text-green-600 group-hover:text-green-700 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm lg:text-lg mb-1 lg:mb-2">WhatsApp</h4>
                        <p className="text-gray-700 text-xs lg:text-base font-medium">085-123-4567</p>
                        <p className="text-gray-500 text-xs">ส่งข้อความได้ตลอด 24 ชม.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Facebook Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-3 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1">
                    <div className="text-center space-y-2 lg:space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 lg:w-12 lg:h-12 text-blue-600 group-hover:text-blue-700 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm lg:text-lg mb-1 lg:mb-2">Facebook</h4>
                        <p className="text-gray-700 text-xs lg:text-base font-medium">SP Kansard Official</p>
                        <p className="text-gray-500 text-xs">ติดตามข่าวสารและโปรโมชั่น</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 transform hover:-translate-y-1 cursor-pointer"
                       onClick={() => window.open('https://spkansard.com', '_blank')}>
                    <div className="text-center space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-12 h-12 text-gray-700 group-hover:text-gray-900 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg mb-2">สาขาทั้งหมด</h4>
                        <div className="text-gray-700 text-sm font-medium leading-relaxed space-y-1">
                          <p className="font-semibold text-gray-700">สำนักงานใหญ่</p>
                          <p>ปทุมธานี</p>
                          <p>• สาขาบางแวก</p>
                          <p>• สาขาบางพลี</p>
                        </div>
                        <p className="text-gray-500 text-xs mt-2 flex items-center justify-center space-x-1">
                          <span>คลิกดูรายละเอียด</span>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative overflow-y-auto bg-gradient-to-br from-gray-50 to-slate-100"
         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style jsx>{`
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        div::-webkit-scrollbar {
          display: none;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      {/* Hero Section - Material Image */}
      <div className="relative h-96 lg:h-[28rem] overflow-hidden">
        <img
          src={material.image || "/materials/placeholder.jpg"}
          alt={material.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
        
        {/* Material Type Badge */}
        <div className="absolute top-4 right-4">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-sm font-medium text-slate-700 shadow-md">
            <span className="mr-2">
              {material.type === 'translucent' ? '🔆' : '🛡️'}
            </span>
            {material.type === 'translucent' ? 'โปร่งแสง' : 'ทึบแสง'}
          </div>
        </div>
        
        {/* Material Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-2xl lg:text-3xl font-bold drop-shadow-lg mb-1">{material.name}</h1>
          <p className="text-sm text-slate-200 drop-shadow-md">วัสดุคุณภาพสูง สำหรับงานก่อสร้าง</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-4 lg:p-6">
        
        {/* Simple Material Gallery & Details */}
        <div className="mb-4 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
             style={{ animation: 'fadeIn 0.4s ease-out' }}>
          
          <div className="p-4">
            {/* Compact Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column - Material Image */}
              <div className="order-1 lg:order-1">
                <div className="relative group overflow-hidden rounded-lg">
                  <img
                    src={material.image || "/materials/placeholder.jpg"}
                    alt={`${material.name} - ภาพตัวอย่าง`}
                    className="w-full h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    ภาพตัวอย่างวัสดุ
                  </div>
                </div>
              </div>

              {/* Right Column - Material Details & Size Selection */}
              <div className="order-2 lg:order-2 space-y-2">
                {/* Material Description */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">{material.name}</h4>
                  <p className="text-slate-600 text-sm leading-snug">{material.description}</p>
                </div>

                {/* Size Information */}
                {selectedSize ? (
                  /* Selected Size Display - Without Image */
                  <div className="bg-slate-50 rounded-lg border border-slate-200 p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-semibold text-slate-800">ขนาดที่เลือก</h5>
                        <button 
                          onClick={() => onSizeSelect?.('')}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors duration-200"
                        >
                          เปลี่ยน
                        </button>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div>
                          <div className="text-base font-bold text-slate-800">{selectedSize.name}</div>
                          <div className="text-xs text-slate-500">วัสดุ: {material.name}</div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">ราคาต่อ ตร.ม.</span>
                          {material.pricePerSqm[selectedSize.id] > 0 ? (
                            <span className="text-lg font-bold text-slate-800">
                              ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-sm text-slate-400">ไม่รองรับ</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* All Sizes Display - Compact Grid */
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 mb-1.5">เลือกขนาด</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {material.sizes.map((size, index) => (
                        <div
                          key={size.id}
                          className="bg-slate-50 rounded-md p-2 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                          style={{ animation: `fadeIn ${0.6 + index * 0.1}s ease-out` }}
                          onClick={() => onSizeSelect?.(size.id)}
                        >
                          <div className="text-center">
                            <div className="text-xs font-semibold text-slate-800 mb-0.5">{size.name}</div>
                            {material.pricePerSqm[size.id] > 0 ? (
                              <div className="text-xs text-slate-600">
                                ฿{material.pricePerSqm[size.id].toLocaleString()}/ตร.ม.
                              </div>
                            ) : (
                              <div className="text-xs text-slate-400">ไม่รองรับ</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ultra Compact Price Calculation */}
        {dimensions.width > 0 && dimensions.length > 0 && material && selectedSize && (
          <div className="mb-4 bg-white rounded-lg border border-slate-200 shadow-sm"
               style={{ animation: 'fadeIn 1s ease-out' }}>
            
            <div className="p-3">
              {/* Single Row Layout */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                
                {/* Area */}
                <div className="flex-shrink-0">
                  <span className="text-slate-600">พื้นที่: </span>
                  <span className="font-semibold text-slate-900">
                    {(dimensions.width * dimensions.length).toFixed(2)} ตร.ม.
                  </span>
                </div>

                {/* Material Price */}
                <div className="flex-shrink-0">
                  <span className="text-slate-600">ราคาวัสดุ: </span>
                  <span className="font-semibold text-slate-900">
                    ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}/ตร.ม.
                  </span>
                </div>

                {/* Total Price */}
                <div className="flex-shrink-0 bg-slate-800 text-white rounded-md px-3 py-2">
                  <span className="text-xs opacity-80 mr-2">รวม:</span>
                  <span className="font-bold">฿{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Services - Inline */}
              {(selectedServices.length > 0 || Object.keys(selectedExtras).some(key => selectedExtras[key]) || Object.keys(selectedGutterMaterials).some(key => selectedGutterMaterials[key])) && (
                <div className="mt-2 pt-2 border-t border-slate-200">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-slate-500 mr-2">บริการ:</span>
                    {/* Main Services */}
                    {mainServices
                      .filter((service) => selectedServices.includes(service.id))
                      .map((service) => {
                        let servicePrice = service.price;
                        const selectedOption = selectedServiceOptions[service.id];
                        if (selectedOption && service.options) {
                          const option = service.options.find(opt => opt.id === selectedOption);
                          if (option) {
                            servicePrice += option.price;
                          }
                        }
                        return (
                          <span key={service.id} className="inline-block px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 mr-1 mb-1">
                            {service.name} ฿{servicePrice.toLocaleString()}
                          </span>
                        );
                      })}
                    
                    {/* Extra Services */}
                    {Object.entries(selectedExtras)
                      .filter(([_, optionId]) => optionId)
                      .map(([serviceId, optionId]) => {
                        const service = extraServices.find((s) => s.id === serviceId);
                        const option = service?.options.find((o) => o.id === optionId);
                        if (!service || !option) return null;
                        return (
                          <span key={serviceId} className="inline-block px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 mr-1 mb-1">
                            {service.name} ฿{option.price.toLocaleString()}
                          </span>
                        );
                      })}
                    
                    {/* Gutter Materials */}
                    {Object.entries(selectedGutterMaterials)
                      .filter(([_, materialId]) => materialId)
                      .map(([serviceId, materialId]) => {
                        const selectedGutter = gutterMaterials.find(g => g.id === materialId);
                        if (!selectedGutter) return null;
                        const gutterTotalPrice = selectedGutter.price * dimensions.length;
                        return (
                          <span key={`gutter-${serviceId}`} className="inline-block px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-700 mr-1 mb-1">
                            รางน้ำ: {selectedGutter.name} ฿{gutterTotalPrice.toLocaleString()}
                          </span>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Minimal Important Notes */}
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <div className="w-4 h-4 bg-slate-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-slate-700 text-sm">
                <span className="font-medium">หมายเหตุ:</span> ราคารวมวัสดุและบริการที่เลือก • สามารถเลือกบริการเพิ่มเติมได้ในขั้นตอนถัดไป • รับประกันความแม่นยำ 100%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}