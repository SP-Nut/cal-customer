'use client';

import React, { useRef, useEffect } from 'react';
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
  onFloatingPreviewChange?: (isVisible: boolean) => void;
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
  onSizeSelect,
  onFloatingPreviewChange
}: MaterialPreviewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('MaterialPreview mounted with callback:', !!onFloatingPreviewChange);
    
    // เรียก onFloatingPreviewChange(true) ทันทีเมื่อมีการเลือกวัสดุ
    if (material && onFloatingPreviewChange) {
      console.log('Material selected, showing floating preview immediately');
      onFloatingPreviewChange(true);
    }
    
    const handleScroll = () => {
      if (scrollContainerRef.current && onFloatingPreviewChange) {
        const scrollContainer = scrollContainerRef.current;
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;
        
        // Show floating preview when scrolled past the hero image section
        // Hero section มีความสูงประมาณ 30% ของ viewport (h-[30vh])
        // ดังนั้นใช้ค่า scroll > 200px เป็นเกณฑ์
        const shouldShow = scrollTop > 200;
        console.log('Scroll detected:', { 
          scrollTop, 
          shouldShow, 
          hasCallback: !!onFloatingPreviewChange,
          scrollHeight,
          clientHeight 
        });
        onFloatingPreviewChange(shouldShow);
      } else {
        console.log('Scroll handler: missing container or callback', {
          hasContainer: !!scrollContainerRef.current,
          hasCallback: !!onFloatingPreviewChange
        });
      }
    };

    const scrollContainer = scrollContainerRef.current;
    console.log('Setting up scroll listener on:', scrollContainer);
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [onFloatingPreviewChange, material]);

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
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-slate-100"
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
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInFromRight {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromLeft {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      
      <div className="h-screen flex flex-col">
        {/* Main Content - Mobile First Design */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          
          {/* Mobile Layout - Simple Image and Description */}
          <div className="lg:hidden">
            {material && (
              <div className="bg-white">
                {/* Material Header with Image */}
                <div className="relative">
                  {/* Material Image */}
                  <div className="h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                    <img
                      src={material.image || "/materials/placeholder.jpg"}
                      alt={material.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Material Type Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="inline-flex items-center px-2 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-medium text-slate-700 shadow-lg">
                        <span className="mr-1">
                          {material.type === 'translucent' ? '🔆' : '🛡️'}
                        </span>
                        {material.type === 'translucent' ? 'โปร่งแสง' : 'ทึบแสง'}
                      </div>
                    </div>
                    
                    {/* Material Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-xl font-bold text-white drop-shadow-lg mb-1">
                        {material.name}
                      </h2>
                      {selectedSize && (
                        <div className="text-white/90 text-sm">
                          ขนาด: {selectedSize.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Material Details */}
                <div className="p-4">
                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">รายละเอียดวัสดุ</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{material.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Desktop Content - New Enhanced Layout */}
          <div className="hidden lg:block p-6">
          
          {/* Hero Section with Material and Size Cards */}
          {selectedSize ? (
            <div className="mb-6">
              {/* Header Section */}
              <div className="text-center mb-6" style={{ animation: 'fadeIn 0.6s ease-out' }}>
                <div className="inline-flex items-center space-x-3 mb-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-full"></div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    วัสดุและขนาดที่เลือก
                  </h1>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 rounded-full"></div>
                </div>
                <p className="text-slate-600 text-base max-w-2xl mx-auto">
                  คุณได้เลือกวัสดุและขนาดที่เหมาะสมแล้ว ตรวจสอบรายละเอียดและดำเนินการต่อได้เลย
                </p>
              </div>

              {/* Main Material & Size Cards */}
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Material Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500"
                     style={{ animation: 'slideInFromLeft 0.7s ease-out' }}>
                  
                  {/* Material Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={material.image || "/materials/placeholder.jpg"}
                      alt={material.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Material Type Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="inline-flex items-center px-3 py-2 rounded-full bg-white/95 backdrop-blur-sm text-sm font-semibold text-slate-700 shadow-lg">
                        <span className="mr-2 text-lg">
                          {material.type === 'translucent' ? '🔆' : '🛡️'}
                        </span>
                        {material.type === 'translucent' ? 'โปร่งแสง' : 'ทึบแสง'}
                      </div>
                    </div>
                    
                    {/* Primary Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="inline-flex items-center px-3 py-2 rounded-full bg-blue-600/90 backdrop-blur-sm text-sm font-semibold text-white shadow-lg">
                        <span className="mr-2">🎯</span>
                        วัสดุหลัก
                      </div>
                    </div>
                    
                    {/* Material Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                          {material.name}
                        </h2>
                        <p className="text-white/90 text-base leading-relaxed">
                          {material.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Size Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500"
                     style={{ animation: 'slideInFromRight 0.7s ease-out' }}>
                  
                  {/* Size Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={selectedSize.image || material.image || "/materials/placeholder.jpg"}
                      alt={`ขนาด ${selectedSize.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Size Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="inline-flex items-center px-3 py-2 rounded-full bg-cyan-600/90 backdrop-blur-sm text-sm font-semibold text-white shadow-lg">
                        <span className="mr-2">📏</span>
                        ขนาดที่เลือก
                      </div>
                    </div>
                    
                    {/* Change Size Button */}
                    <div className="absolute top-4 left-4">
                      <button 
                        onClick={() => onSizeSelect?.('')}
                        className="inline-flex items-center px-3 py-2 rounded-full bg-white/95 backdrop-blur-sm text-sm font-semibold text-slate-700 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"
                      >
                        <span className="mr-2">🔄</span>
                        เปลี่ยนขนาด
                      </button>
                    </div>
                    
                    {/* Size Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                          ขนาด {selectedSize.name}
                        </h2>
                        
                        {/* Price Display */}
                        <div className="flex items-center space-x-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                            <div className="text-white/80 text-sm">ราคาต่อตารางเมตร</div>
                            {material.pricePerSqm[selectedSize.id] > 0 ? (
                              <div className="text-white text-xl font-bold">
                                ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}
                              </div>
                            ) : (
                              <div className="text-white/60 text-base">ไม่รองรับ</div>
                            )}
                          </div>
                          
                          {/* Additional Info */}
                          <div className="text-white/90 text-base">
                            <div className="font-medium">เหมาะสำหรับ:</div>
                            <div className="text-sm opacity-80">โครงการทุกขนาด</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Material Only Display - When no size selected */
            <div className="mb-6">
              {/* Header */}
              <div className="text-center mb-6" style={{ animation: 'fadeIn 0.6s ease-out' }}>
                <div className="inline-flex items-center space-x-3 mb-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-full"></div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    วัสดุที่เลือก
                  </h1>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 rounded-full"></div>
                </div>
                <p className="text-slate-600 text-base max-w-2xl mx-auto">
                  คุณได้เลือกวัสดุแล้ว กรุณาเลือกขนาดจากเมนูด้านบนเพื่อดูรายละเอียดและราคา
                </p>
              </div>

              {/* Single Material Card */}
              <div className="max-w-4xl mx-auto">
                <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500"
                     style={{ animation: 'scaleIn 0.7s ease-out' }}>
                  
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={material.image || "/materials/placeholder.jpg"}
                      alt={material.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Material Type Badge */}
                    <div className="absolute top-6 right-6">
                      <div className="inline-flex items-center px-4 py-3 rounded-full bg-white/95 backdrop-blur-sm text-base font-semibold text-slate-700 shadow-lg">
                        <span className="mr-3 text-xl">
                          {material.type === 'translucent' ? '🔆' : '🛡️'}
                        </span>
                        {material.type === 'translucent' ? 'โปร่งแสง' : 'ทึบแสง'}
                      </div>
                    </div>
                    
                    {/* Primary Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="inline-flex items-center px-4 py-3 rounded-full bg-blue-600/90 backdrop-blur-sm text-base font-semibold text-white shadow-lg">
                        <span className="mr-3">🎯</span>
                        วัสดุหลัก
                      </div>
                    </div>
                    
                    {/* Material Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                          {material.name}
                        </h2>
                        <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
                          {material.description}
                        </p>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/90 backdrop-blur-sm text-white font-semibold shadow-lg">
                          <span className="mr-2">📏</span>
                          เลือกขนาดจากเมนูด้านบนเพื่อดำเนินการต่อ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Size Selection Section - Hidden by default, only shown when specifically requested */}

          {/* Enhanced Price Calculation */}
          {dimensions.width > 0 && dimensions.length > 0 && material && selectedSize && (
            <div className="mb-6" style={{ animation: 'fadeIn 1.2s ease-out' }}>
              <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl border border-slate-200 shadow-lg p-6">
                
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center justify-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    สรุปการคำนวณราคา
                  </h3>
                  <p className="text-slate-600">รายละเอียดการคำนวณและราคารวมทั้งหมด</p>
                </div>

                {/* Main Calculation Grid */}
                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                  
                  {/* Area Calculation */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">พื้นที่รวม</div>
                        <div className="text-2xl font-bold text-slate-800">
                          {(dimensions.width * dimensions.length).toFixed(2)}
                        </div>
                        <div className="text-sm text-slate-500">ตารางเมตร</div>
                      </div>
                    </div>
                  </div>

                  {/* Material Price */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">ราคาต่อ ตร.ม.</div>
                        <div className="text-2xl font-bold text-slate-800">
                          ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-500">{selectedSize.name}</div>
                      </div>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 shadow-lg">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-white/80 mb-1">ราคารวมทั้งหมด</div>
                        <div className="text-3xl font-bold text-white">
                          ฿{totalPrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-white/80">บาท</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Summary */}
                {(selectedServices.length > 0 || Object.keys(selectedExtras).some(key => selectedExtras[key]) || Object.keys(selectedGutterMaterials).some(key => selectedGutterMaterials[key])) && (
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h4 className="text-base font-semibold text-slate-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      บริการที่เลือก
                    </h4>
                    
                    <div className="space-y-2">
                      {/* Main Services */}
                      {mainServices
                        .filter((service) => selectedServices.includes(service.id))
                        .map((service) => {
                          let servicePrice = service.price || 0;
                          const selectedOption = selectedServiceOptions[service.id];
                          if (selectedOption && service.options) {
                            const option = service.options.find(opt => opt.id === selectedOption);
                            if (option) {
                              servicePrice += option.price;
                            }
                          }
                          
                          // For per-sqm services, calculate total price
                          if (service.pricePerSqm && dimensions.width > 0 && dimensions.length > 0) {
                            servicePrice = servicePrice * dimensions.width * dimensions.length;
                          }
                          
                          return (
                            <div key={service.id} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                              <div>
                                <div className="font-medium text-slate-800">{service.name}</div>
                                <div className="text-sm text-slate-600">{service.description}</div>
                              </div>
                              <div className="text-lg font-bold text-blue-600">
                                ฿{servicePrice.toLocaleString()}
                              </div>
                            </div>
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
                            <div key={serviceId} className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                              <div>
                                <div className="font-medium text-slate-800">{service.name}</div>
                                <div className="text-sm text-slate-600">{option.name}</div>
                              </div>
                              <div className="text-lg font-bold text-cyan-600">
                                ฿{option.price.toLocaleString()}
                              </div>
                            </div>
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
                            <div key={`gutter-${serviceId}`} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                              <div>
                                <div className="font-medium text-slate-800">รางน้ำ: {selectedGutter.name}</div>
                                <div className="text-sm text-slate-600">{dimensions.length} เมตร × ฿{selectedGutter.price.toLocaleString()}/ม.</div>
                              </div>
                              <div className="text-lg font-bold text-slate-600">
                                ฿{gutterTotalPrice.toLocaleString()}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Professional Notes */}
          <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 rounded-2xl border border-slate-200 p-6 shadow-sm"
               style={{ animation: 'fadeIn 1.4s ease-out' }}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-slate-800 mb-3">ข้อมูลสำคัญ</h4>
                <div className="grid lg:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-slate-700">💰 ความโปร่งใส</div>
                    <div className="text-slate-600">ราคารวมวัสดุและบริการที่เลือก ไม่มีค่าใช้จ่ายแอบแฝง</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-slate-700">🔧 ความยืดหยุ่น</div>
                    <div className="text-slate-600">สามารถเลือกบริการเพิ่มเติมได้ในขั้นตอนถัดไป</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-slate-700">✅ ความแม่นยำ</div>
                    <div className="text-slate-600">รับประกันความแม่นยำในการคำนวณ 100%</div>
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