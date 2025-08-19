'use client';

import React, { useRef, useEffect } from 'react';
import { Material, Size, Service, ExtraService } from '../../lib/types';
import { gutterMaterials } from '../../lib/materials/gutterMaterials';
import { X, ZoomIn, ChevronLeft, ChevronRight, Phone, MessageCircle, Mail, MapPin, Info, DollarSign, Wrench, CheckCircle } from 'lucide-react';

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
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number | null>(null);

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
                    <p className="text-sm lg:text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-widest">
                      ระบบคำนวณราคากันสาด
                    </p>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight mb-3 lg:mb-5 leading-tight text-slate-800">
                    สร้างโซลูชั่น<br />
                    <span className="font-normal bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      หลังคากันสาด
                    </span>
                    <br />
                    <span className="font-normal bg-gradient-to-r from-purple-600 via-blue-500 to-slate-600 bg-clip-text text-transparent">
                      ที่ดีที่สุด
                    </span>
                  </h2>
                  
                  <div className="bg-transparent p-3 lg:p-5 mb-3 lg:mb-5">
                    <p className="text-base lg:text-lg text-slate-700 leading-relaxed font-normal">
                      ระบบคำนวณราคากันสาดและหลังคาแบบมืออาชีพ คำนวณราคาเบื้องต้นทุกรายการ 
                      ด้วยประสบการณ์มากกว่า 35 ปี พร้อมบริการครบวงจร
                    </p>
                  </div>
                  
                  {/* Professional Image - Mobile Only */}
                  <div className="block lg:hidden relative mb-3 lg:mb-4">
                    <div className="relative w-full max-w-xl mx-auto">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/60 via-white/40 to-slate-50/50 backdrop-blur-sm"></div>
                      
                      {/* Professional Image */}
                      <div className="relative z-10 group">
                        <img 
                          src="/materials/pr.png" 
                          alt="SP Kansard Professional Consultant" 
                          className="w-full h-auto object-contain relative z-10 drop-shadow-lg transition-transform duration-500 group-hover:scale-105 max-h-96"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Feature Cards */}
                  <div className="grid gap-2 lg:gap-2 mb-3 lg:mb-4">
                    {[
                      { icon: '💰', title: 'คำนวณราคาเบื้องต้น', desc: 'ประมาณการราคา โปร่งใสทุกรายการ', bg: 'from-blue-500 via-purple-500 to-pink-500' },
                      { icon: '⚡', title: 'วัสดุคุณภาพสูง', desc: 'มาตรฐานสากล ทนทาน ใช้งานได้ยาวนาน', bg: 'from-purple-500 via-blue-500 to-cyan-500' },
                      { icon: '🏠', title: 'ทีมช่างมืออาชีพ', desc: 'รับประกันงาน บริการหลังการขายครบถ้วน', bg: 'from-pink-500 via-purple-500 to-blue-500' }
                    ].map((item, index) => (
                      <div key={index} className="group bg-transparent p-3 lg:p-4 hover:bg-white/10 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10">
                        {/* Mobile Layout - Icon on top */}
                        <div className="text-center lg:hidden">
                          <div className={`w-10 h-10 bg-gradient-to-br ${item.bg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto mb-2`}>
                            <span className="text-white font-bold text-base">{item.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-base mb-1">{item.title}</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                        
                        {/* Desktop Layout - Icon on left */}
                        <div className="hidden lg:flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${item.bg} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white font-bold text-lg">{item.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg mb-1">{item.title}</h4>
                            <p className="text-slate-600 text-base leading-relaxed">{item.desc}</p>
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
              <div className="flex items-center justify-center space-x-2 lg:space-x-3 mb-3 lg:mb-5">
                <div className="w-8 lg:w-16 h-0.5 lg:h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full"></div>
                <h3 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  ติดต่อเราเพื่อรับคำปรึกษา
                </h3>
                <div className="w-8 lg:w-16 h-0.5 lg:h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-full"></div>
              </div>
              
              {/* Contact Grid - 3 columns top, 3 columns bottom */}
              <div className="space-y-2 lg:space-y-4">
                {/* Top Row - 3 columns */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 w-full">
                  {/* Phone Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-4 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 transform hover:-translate-y-1">
                    <div className="text-center space-y-2 lg:space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-10 h-10 lg:w-12 lg:h-12 text-gray-700 group-hover:text-gray-900 transition-colors duration-300 mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-base lg:text-lg mb-1 lg:mb-2">โทรศัพท์</h4>
                        <p className="text-gray-700 text-sm lg:text-base font-medium">084-909-7777</p>
                        <p className="text-gray-500 text-xs lg:text-sm">ทุกวัน 8:00-17:00</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Line Contact */}
                  <div 
                    className="group bg-white/40 backdrop-blur-sm p-4 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => window.open('https://page.line.me/biv3563x?oat_content=url&openQrModal=true', '_blank')}
                  >
                    <div className="text-center space-y-2 lg:space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <MessageCircle className="w-10 h-10 lg:w-12 lg:h-12 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300 mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-base lg:text-lg mb-1 lg:mb-2">Line ID</h4>
                        <p className="text-gray-700 text-sm lg:text-base font-medium">@spkansard</p>
                        <p className="text-gray-500 text-xs lg:text-sm">ตอบเร็ว 24 ชม.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Email Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-4 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10 transform hover:-translate-y-1">
                    <div className="text-center space-y-2 lg:space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-10 h-10 lg:w-12 lg:h-12 text-slate-600 group-hover:text-slate-700 transition-colors duration-300 mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-base lg:text-lg mb-1 lg:mb-2">อีเมล</h4>
                        <p className="text-gray-700 text-xs lg:text-base font-medium">spkansards@gmail.com</p>
                        <p className="text-gray-500 text-xs lg:text-sm">ตอบภายใน 24 ชม.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Row - 3 columns */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 w-full">
                  {/* TikTok Contact */}
                  <div 
                    className="group bg-white/40 backdrop-blur-sm p-4 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => window.open('https://www.tiktok.com/@spkansard', '_blank')}
                  >
                    <div className="text-center space-y-2 lg:space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-10 h-10 lg:w-12 lg:h-12 text-pink-600 group-hover:text-pink-700 transition-colors duration-300 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.77-4.6V7.5a8.28 8.28 0 0 0 4.88 1.56V5.61a4.84 4.84 0 0 1-1.22-.92z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-base lg:text-lg mb-1 lg:mb-2">TikTok</h4>
                        <p className="text-gray-700 text-sm lg:text-base font-medium">@spkansard</p>
                        <p className="text-gray-500 text-xs lg:text-sm">ติดตามผลงานและเทคนิค</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Facebook Contact */}
                  <div 
                    className="group bg-white/40 backdrop-blur-sm p-4 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => window.open('https://www.messenger.com/t/521641141224767/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0', '_blank')}
                  >
                    <div className="text-center space-y-2 lg:space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-10 h-10 lg:w-12 lg:h-12 text-blue-600 group-hover:text-blue-700 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-base lg:text-lg mb-1 lg:mb-2">Facebook</h4>
                        <p className="text-gray-700 text-sm lg:text-base font-medium">SP Kansard Official</p>
                        <p className="text-gray-500 text-xs lg:text-sm">ติดตามข่าวสารและโปรโมชั่น</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-4 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 transform hover:-translate-y-1 cursor-pointer"
                       onClick={() => window.open('https://spkansard.com', '_blank')}>
                    <div className="text-center space-y-2 lg:space-y-4">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-10 h-10 lg:w-12 lg:h-12 text-gray-700 group-hover:text-gray-900 transition-colors duration-300 mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-base lg:text-lg mb-1 lg:mb-2">สาขาทั้งหมด</h4>
                        <div className="text-gray-700 text-sm lg:text-base font-medium leading-relaxed space-y-1">
                          <p className="font-semibold text-gray-700">สำนักงานใหญ่</p>
                          <p>ปทุมธานี</p>
                          <p>• สาขาบางแวก</p>
                          <p>• สาขาบางพลี</p>
                        </div>
                        <p className="text-gray-500 text-xs lg:text-sm mt-2 flex items-center justify-center space-x-1">
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
          
          {/* Mobile Layout - Updated to match Desktop concept */}
          <div className="lg:hidden">
            {material && (
              <div className="bg-white">
                {selectedSize ? (
                  <>
                    {/* Mobile: Stacked Images */}
                    <div className="space-y-4 p-4">
                      {/* Material Image */}
                      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg cursor-zoom-in"
                           onClick={() => openImageModal(0)}>
                        <div className="h-[40vh] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 relative">
                          <img
                            src={material.image || "/materials/placeholder.jpg"}
                            alt={material.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          {/* Material Label */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h3 className="text-white text-lg font-bold">วัสดุหลัก</h3>
                            <p className="text-white/80 text-sm">{material.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* Size Image */}
                      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg cursor-zoom-in"
                           onClick={() => openImageModal(1)}>
                        <div className="h-[40vh] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 relative">
                          <img
                            src={selectedSize.image || material.image || "/materials/placeholder.jpg"}
                            alt={`ขนาด ${selectedSize.name}`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          {/* Size Label */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h3 className="text-white text-lg font-bold">ขนาดที่เลือก</h3>
                            <p className="text-white/80 text-sm">{selectedSize.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Text Content Below */}
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        {/* Material Information */}
                        <div className="space-y-4">
                          <div className="border-b border-slate-200 pb-4">
                            <h2 className="text-2xl font-bold text-slate-800 mb-3">
                              {material.name}
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {material.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                                <span className="text-blue-700 text-xs font-medium">คุณภาพพรีเมียม</span>
                              </div>
                              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                                <span className="text-emerald-700 text-xs font-medium">รับประกัน 10 ปี</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Size Information */}
                        <div className="space-y-4">
                          <div className="border-b border-slate-200 pb-4">
                            <h3 className="text-xl font-bold text-slate-800 mb-3">
                              ขนาด {selectedSize.name}
                            </h3>
                            
                            {/* Price Display */}
                            <div className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
                              <div className="text-slate-600 text-xs mb-1">ราคาต่อตารางเมตร</div>
                              {material.pricePerSqm[selectedSize.id] > 0 ? (
                                <div className="text-blue-700 text-xl font-bold mb-1">
                                  ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}
                                </div>
                              ) : (
                                <div className="text-slate-400 text-lg">ไม่รองรับ</div>
                              )}
                              <div className="text-slate-500 text-xs">ไม่รวม VAT</div>
                            </div>
                            
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mt-3">
                              <span className="text-blue-700 text-xs font-medium">เหมาะสำหรับโครงการทุกขนาด</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Single Material Image */}
                    <div className="relative overflow-hidden cursor-zoom-in" onClick={() => openImageModal(0)}>
                      <div className="h-[50vh] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 relative">
                        <img
                          src={material.image || "/materials/placeholder.jpg"}
                          alt={material.name}
                          className="w-full h-full object-cover transition-transform duration-700"
                        />
                      </div>
                    </div>

                    {/* Material Information Section */}
                    <div className="p-6 space-y-6">
                      <div className="text-center space-y-4">
                        <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                          {material.name}
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {material.description}
                        </p>
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm">
                          <span className="mr-2 text-base">📏</span>
                          เลือกขนาดจากเมนูด้านบนเพื่อดำเนินการต่อ
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Desktop Content - New Layout: Material Left, Size Right, Text Below */}
          <div className="hidden lg:block p-6">
          
          {/* Hero Section with Side-by-Side Layout */}
          {selectedSize ? (
            <div className="mb-6">
              {/* Header Section */}
              <div className="text-center mb-8" style={{ animation: 'fadeIn 0.6s ease-out' }}>
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-full"></div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    วัสดุและขนาดที่เลือก
                  </h1>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 rounded-full"></div>
                </div>
                <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
                  คุณได้เลือกวัสดุและขนาดที่เหมาะสมแล้ว ตรวจสอบรายละเอียดและดำเนินการต่อได้เลย
                </p>
              </div>

              {/* Side-by-Side Images: Material Left, Size Right */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                
                {/* Material Image - Left Side */}
                <div className="group">
                  <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-700 cursor-zoom-in"
                       style={{ animation: 'slideInFromLeft 0.7s ease-out' }}
                       onClick={() => openImageModal(0)}>
                    <div className="relative h-[50vh] overflow-hidden">
                      <img
                        src={material.image || "/materials/placeholder.jpg"}
                        alt={material.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Zoom Icon Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-4">
                          <ZoomIn className="w-8 h-8 text-slate-700" />
                        </div>
                      </div>
                    </div>
                    {/* Material Label */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="text-white text-xl font-bold">วัสดุหลัก</h3>
                      <p className="text-white/80 text-sm">{material.name}</p>
                    </div>
                  </div>
                </div>

                {/* Size Image - Right Side */}
                <div className="group">
                  <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-700 cursor-zoom-in"
                       style={{ animation: 'slideInFromRight 0.7s ease-out' }}
                       onClick={() => openImageModal(1)}>
                    <div className="relative h-[50vh] overflow-hidden">
                      <img
                        src={selectedSize.image || material.image || "/materials/placeholder.jpg"}
                        alt={`ขนาด ${selectedSize.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Zoom Icon Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-4">
                          <ZoomIn className="w-8 h-8 text-slate-700" />
                        </div>
                      </div>
                    </div>
                    {/* Size Label */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="text-white text-xl font-bold">ขนาดที่เลือก</h3>
                      <p className="text-white/80 text-sm">{selectedSize.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Text Content - Below Images */}
              <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* Material Information - Left Column */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-6">
                      <h2 className="text-3xl font-bold text-slate-800 mb-4">
                        {material.name}
                      </h2>
                      <p className="text-slate-600 text-base leading-relaxed">
                        {material.description}
                      </p>
                      <div className="flex gap-3 mt-4">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                          <span className="text-blue-700 text-sm font-medium">คุณภาพพรีเมียม</span>
                        </div>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                          <span className="text-emerald-700 text-sm font-medium">รับประกัน 10 ปี</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Size Information - Right Column */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-6">
                      <h3 className="text-2xl font-bold text-slate-800 mb-4">
                        ขนาด {selectedSize.name}
                      </h3>
                      
                      {/* Price Display */}
                      <div className="bg-blue-50 rounded-xl px-6 py-4 border border-blue-100">
                        <div className="text-slate-600 text-sm mb-2">ราคาต่อตารางเมตร</div>
                        {material.pricePerSqm[selectedSize.id] > 0 ? (
                          <div className="text-blue-700 text-2xl font-bold mb-1">
                            ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}
                          </div>
                        ) : (
                          <div className="text-slate-400 text-xl">ไม่รองรับ</div>
                        )}
                        <div className="text-slate-500 text-sm">ไม่รวม VAT</div>
                      </div>
                      
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mt-4">
                        <span className="text-blue-700 text-sm font-medium">เหมาะสำหรับโครงการทุกขนาด</span>
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
              <div className="text-center mb-8" style={{ animation: 'fadeIn 0.6s ease-out' }}>
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-full"></div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    วัสดุที่เลือก
                  </h1>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 rounded-full"></div>
                </div>
                <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
                  คุณได้เลือกวัสดุแล้ว กรุณาเลือกขนาดจากเมนูด้านบนเพื่อดูรายละเอียดและราคา
                </p>
              </div>

              {/* Single Material Image */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-zoom-in"
                     style={{ animation: 'scaleIn 0.7s ease-out' }}
                     onClick={() => openImageModal(0)}>
                  <div className="relative h-[50vh] overflow-hidden">
                    <img
                      src={material.image || "/materials/placeholder.jpg"}
                      alt={material.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Zoom Icon Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-4">
                        <ZoomIn className="w-8 h-8 text-slate-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content Below Image */}
              <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
                <div className="text-center space-y-6">
                  <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                    {material.name}
                  </h2>
                  <p className="text-slate-600 text-base leading-relaxed max-w-3xl mx-auto">
                    {material.description}
                  </p>
                  <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium">
                    <span className="mr-3 text-xl">📏</span>
                    เลือกขนาดจากเมนูด้านบนเพื่อดำเนินการต่อ
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Screen Image Modal - Clean Fullscreen View */}
          {selectedImageIndex !== null && (
            <div className="fixed inset-0 bg-black z-50 flex items-center justify-center"
                 onClick={closeImageModal}>
              
              {/* Close Button - Top Right */}
              <button
                onClick={closeImageModal}
                className="absolute top-6 right-6 z-20 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
              >
                <X className="w-8 h-8 text-white" />
              </button>

              {/* Full Screen Image - No Other Elements */}
              <div className="w-full h-full flex items-center justify-center p-4">
                <img
                  src={
                    selectedImageIndex === 0 
                      ? material.image || "/materials/placeholder.jpg"
                      : selectedSize?.image || material.image || "/materials/placeholder.jpg"
                  }
                  alt={
                    selectedImageIndex === 0 
                      ? material.name
                      : `ขนาด ${selectedSize?.name}`
                  }
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Navigation Arrows - Minimal Style, Only when both images available */}
              {selectedSize && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(selectedImageIndex === 0 ? 1 : 0);
                    }}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-4 transition-all duration-300 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-8 h-8 text-white" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(selectedImageIndex === 0 ? 1 : 0);
                    }}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-4 transition-all duration-300 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-8 h-8 text-white" />
                  </button>

                  {/* Simple Image Counter - Bottom Center */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                    <span className="text-white text-lg font-medium">
                      {selectedImageIndex + 1} / 2
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Size Selection Section - Hidden by default, only shown when specifically requested */}

          {/* Simple Price Summary with Subtle Company Colors */}
          {dimensions.width > 0 && dimensions.length > 0 && material && selectedSize && (
            <div className="mb-8">
              <div className="bg-white rounded-lg border border-blue-100 p-6 shadow-sm">
                
                {/* Header */}
                <div className="border-b border-blue-100 pb-4 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">สรุปการคำนวณราคา</h3>
                  <p className="text-gray-600">ราคารวมทั้งหมดสำหรับโครงการของคุณ</p>
                </div>

                {/* Main Price */}
                <div className="text-center mb-6">
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                    <div className="text-gray-600 text-lg mb-2">ราคารวมทั้งหมด</div>
                    <div className="text-4xl font-bold text-blue-700 mb-2">
                      ฿{totalPrice.toLocaleString()}
                    </div>
                    <div className="text-gray-500">บาท (ไม่รวม VAT)</div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="text-xl font-bold text-blue-700">{(dimensions.width * dimensions.length).toFixed(1)}</div>
                      <div className="text-gray-600 text-sm">ตารางเมตร</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="text-xl font-bold text-blue-700">฿{material.pricePerSqm[selectedSize.id].toLocaleString()}</div>
                      <div className="text-gray-600 text-sm">ต่อ ตร.ม.</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="text-xl font-bold text-blue-700">{selectedSize.name}</div>
                      <div className="text-gray-600 text-sm">ขนาดที่เลือก</div>
                    </div>
                  </div>
                </div>

                {/* Services List */}
                {(selectedServices.length > 0 || Object.keys(selectedExtras).some(key => selectedExtras[key]) || Object.keys(selectedGutterMaterials).some(key => selectedGutterMaterials[key])) && (
                  <div className="border-t border-blue-100 pt-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">บริการที่เลือก</h4>
                    
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
                          
                          if (service.pricePerSqm && dimensions.width > 0 && dimensions.length > 0) {
                            servicePrice = servicePrice * dimensions.width * dimensions.length;
                          }
                          
                          return (
                            <div key={service.id} className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-lg border border-blue-100">
                              <span className="text-gray-700 font-medium">{service.name}</span>
                              <span className="text-blue-700 font-bold">฿{servicePrice.toLocaleString()}</span>
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
                          
                          // คำนวณราคาตามประเภทบริการ
                          let finalPrice = option.price;
                          if (service.pricePerSqm && dimensions.width > 0 && dimensions.length > 0) {
                            const area = dimensions.width * dimensions.length;
                            finalPrice = option.price * area;
                          }
                          
                          return (
                            <div key={serviceId} className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-lg border border-blue-100">
                              <span className="text-gray-700 font-medium">
                                {service.name}
                                {service.pricePerSqm && (
                                  <span className="text-gray-500 text-sm ml-1">
                                    ({(dimensions.width * dimensions.length).toFixed(2)} ตร.ม.)
                                  </span>
                                )}
                              </span>
                              <span className="text-blue-700 font-bold">฿{finalPrice.toLocaleString()}</span>
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
                            <div key={`gutter-${serviceId}`} className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-lg border border-blue-100">
                              <span className="text-gray-700 font-medium">รางน้ำ: {selectedGutter.name}</span>
                              <span className="text-blue-700 font-bold">฿{gutterTotalPrice.toLocaleString()}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Contact Note */}
                <div className="border-t border-blue-100 pt-6 mt-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-gray-700 text-center mb-2">ติดต่อเราเพื่อรับใบเสนอราคาที่แม่นยำ</p>
                    <p className="text-gray-500 text-sm text-center">*ราคานี้เป็นการประมาณการเบื้องต้น ไม่รวม VAT 7% และอาจมีการปรับเปลี่ยนตามสภาพพื้นที่จริง</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Simple Professional Notes with Subtle Blue Accent */}
          <div className="bg-white rounded-lg border border-blue-100 p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800 mb-4">ข้อมูลสำคัญ</h4>
                <div className="grid lg:grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="font-bold text-gray-700 text-base">ความโปร่งใส</div>
                      </div>
                      <div className="text-gray-600 leading-relaxed text-sm">ราคารวมวัสดุและบริการที่เลือก ไม่มีค่าใช้จ่ายแอบแฝง</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center">
                          <Wrench className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="font-bold text-gray-700 text-base">ความยืดหยุ่น</div>
                      </div>
                      <div className="text-gray-600 leading-relaxed text-sm">เลือกบริการเพิ่มเติมได้ ปรับแต่งตามความต้องการ</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="font-bold text-gray-700 text-base">การรับประกัน</div>
                      </div>
                      <div className="text-gray-600 leading-relaxed text-sm">รับประกันงานติดตั้ง บริการหลังการขายครบถ้วน</div>
                    </div>
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