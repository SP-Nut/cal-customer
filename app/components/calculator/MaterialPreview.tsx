'use client';

import React, { useRef, useEffect } from 'react';
import { Material, Size, Service, ExtraService } from '../../lib/types';
import { gutterMaterials } from '../../lib/materials/gutterMaterials';
import { X, ZoomIn, ChevronLeft, ChevronRight, Phone, MessageCircle, Mail, MapPin, Info, DollarSign, Wrench, CheckCircle, PlayCircle, MessageSquare } from 'lucide-react';

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
  poleCount?: number;
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
  poleCount = 1,
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
          @keyframes floating-3d {
            0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
            33% { transform: translateY(-15px) rotateX(5deg) rotateY(10deg); }
            66% { transform: translateY(-8px) rotateX(-3deg) rotateY(-8deg); }
          }
          @keyframes orbit-slow {
            0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; transform: scale(1); box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
            50% { opacity: 0.6; transform: scale(1.1); box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
          }
          @keyframes wave-motion {
            0% { transform: translateY(0px) scaleY(1); }
            50% { transform: translateY(-10px) scaleY(1.1); }
            100% { transform: translateY(0px) scaleY(1); }
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
          <div className="flex-1 flex flex-col p-1 lg:p-6 w-full">
            
            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center py-1 lg:py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 items-center w-full max-w-5xl mx-auto">
                
                {/* Content Section */}
                <div className="text-center lg:text-left space-y-2 lg:space-y-2 order-2 lg:order-1">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2 lg:mb-2">
                    <div className="w-8 lg:w-8 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full"></div>
                    <p className="text-base lg:text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-wide">
                      ระบบคำนวณราคากันสาด
                    </p>
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-extralight mb-4 lg:mb-3 leading-tight text-slate-800">
                    สร้างโซลูชั่น<br />
                    <span className="font-normal bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      หลังคากันสาด
                    </span>
                    <br />
                    <span className="font-normal bg-gradient-to-r from-purple-600 via-blue-500 to-slate-600 bg-clip-text text-transparent">
                      ที่ดีที่สุด
                    </span>
                  </h2>
                  
                  <div className="bg-transparent p-3 lg:p-3 mb-3 lg:mb-3">
                    <p className="text-base lg:text-base text-slate-700 leading-relaxed font-normal">
                      ระบบคำนวณราคากันสาดและหลังคาแบบมืออาชีพ คำนวณราคาเบื้องต้นทุกรายการ 
                      ด้วยประสบการณ์มากกว่า 35 ปี พร้อมบริการครบวงจร
                    </p>
                  </div>
                  
                  {/* Professional Image - Mobile Only */}
                  <div className="block lg:hidden relative mb-4 lg:mb-3">
                    <div className="relative w-full max-w-md mx-auto">
                      {/* 3D Background Elements */}
                      <div className="absolute inset-0 -z-10">
                        {/* Floating Orbs */}
                        <div className="absolute top-4 right-8 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-sm" 
                             style={{ animation: 'floating-3d 4s ease-in-out infinite' }}></div>
                        <div className="absolute bottom-6 left-4 w-12 h-12 bg-gradient-to-br from-purple-400/25 to-pink-500/25 rounded-full blur-sm" 
                             style={{ animation: 'floating-3d 3s ease-in-out infinite reverse' }}></div>
                        <div className="absolute top-1/2 left-2 w-8 h-8 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full" 
                             style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}></div>
                        
                        {/* Orbiting Elements */}
                        <div className="absolute top-1/3 right-1/4">
                          <div className="relative">
                            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400/40 to-orange-500/40 rounded-full" 
                                 style={{ animation: 'orbit-slow 8s linear infinite' }}></div>
                          </div>
                        </div>
                        
                        {/* Wave Elements */}
                        <div className="absolute bottom-1/4 right-6 flex space-x-1">
                          <div className="w-2 h-8 bg-gradient-to-t from-blue-400/20 to-purple-400/30 rounded-full" 
                               style={{ animation: 'wave-motion 2s ease-in-out infinite' }}></div>
                          <div className="w-2 h-6 bg-gradient-to-t from-purple-400/25 to-pink-400/35 rounded-full" 
                               style={{ animation: 'wave-motion 2.2s ease-in-out infinite' }}></div>
                          <div className="w-2 h-10 bg-gradient-to-t from-pink-400/20 to-red-400/30 rounded-full" 
                               style={{ animation: 'wave-motion 1.8s ease-in-out infinite' }}></div>
                        </div>
                      </div>
                      
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
                  <div className="grid gap-2 lg:gap-2 mb-3 lg:mb-3 pl-1 lg:pl-4">
                    {[
                      { icon: DollarSign, title: 'คำนวณราคาเบื้องต้น', desc: 'ประมาณการราคา โปร่งใสทุกรายการ', bg: 'from-blue-500 via-purple-500 to-pink-500' },
                      { icon: CheckCircle, title: 'วัสดุคุณภาพสูง', desc: 'มาตรฐานสากล ทนทาน ใช้งานได้ยาวนาน', bg: 'from-purple-500 via-blue-500 to-cyan-500' },
                      { icon: Wrench, title: 'ทีมช่างมืออาชีพ', desc: 'รับประกันงาน บริการหลังการขายครบถ้วน', bg: 'from-pink-500 via-purple-500 to-blue-500' }
                    ].map((item, index) => (
                      <div key={index} className="group bg-transparent p-3 lg:p-3 hover:bg-white/10 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10 min-h-[85px] lg:min-h-[80px]">
                        {/* Mobile Layout - Icon on top */}
                        <div className="text-center lg:hidden flex flex-col justify-center h-full">
                          <div className={`w-10 h-10 bg-gradient-to-br ${item.bg} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto mb-2`}>
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-base mb-1">{item.title}</h4>
                            <p className="text-slate-600 text-sm leading-tight">{item.desc}</p>
                          </div>
                        </div>
                        
                        {/* Desktop Layout - Icon on left */}
                        <div className="hidden lg:flex items-center space-x-3 h-full">
                          <div className={`w-10 h-10 bg-gradient-to-br ${item.bg} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-base mb-0">{item.title}</h4>
                            <p className="text-slate-600 text-xs leading-none">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Image Section - Desktop Only */}
                <div className="relative order-1 lg:order-2 hidden lg:block">
                  <div className="relative w-full max-w-sm mx-auto">
                    {/* 3D Background Elements - Desktop */}
                    <div className="absolute inset-0 -z-10">
                      {/* Large Floating Orbs */}
                      <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/25 rounded-full blur-md" 
                           style={{ animation: 'floating-3d 5s ease-in-out infinite' }}></div>
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400/25 to-pink-500/30 rounded-full blur-md" 
                           style={{ animation: 'floating-3d 4s ease-in-out infinite reverse' }}></div>
                      <div className="absolute top-1/3 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-blue-500/35 rounded-full blur-sm" 
                           style={{ animation: 'pulse-glow 4s ease-in-out infinite' }}></div>
                      <div className="absolute bottom-1/4 -right-2 w-10 h-10 bg-gradient-to-br from-pink-400/25 to-red-500/30 rounded-full" 
                           style={{ animation: 'pulse-glow 3.5s ease-in-out infinite' }}></div>
                      
                      {/* Orbiting Elements */}
                      <div className="absolute top-1/4 right-1/3">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400/40 to-orange-500/40 rounded-full blur-sm" 
                               style={{ animation: 'orbit-slow 10s linear infinite' }}></div>
                        </div>
                      </div>
                      <div className="absolute bottom-1/3 left-1/4">
                        <div className="relative">
                          <div className="w-6 h-6 bg-gradient-to-br from-green-400/35 to-emerald-500/40 rounded-full" 
                               style={{ animation: 'orbit-slow 12s linear infinite reverse' }}></div>
                        </div>
                      </div>
                      
                      {/* Wave Elements */}
                      <div className="absolute top-1/2 -right-4 flex space-x-1">
                        <div className="w-3 h-12 bg-gradient-to-t from-blue-400/20 to-purple-400/30 rounded-full" 
                             style={{ animation: 'wave-motion 2.5s ease-in-out infinite' }}></div>
                        <div className="w-3 h-8 bg-gradient-to-t from-purple-400/25 to-pink-400/35 rounded-full" 
                             style={{ animation: 'wave-motion 2.7s ease-in-out infinite' }}></div>
                        <div className="w-3 h-14 bg-gradient-to-t from-pink-400/20 to-red-400/30 rounded-full" 
                             style={{ animation: 'wave-motion 2.3s ease-in-out infinite' }}></div>
                      </div>
                      <div className="absolute bottom-1/5 -left-2 flex space-x-1">
                        <div className="w-2 h-6 bg-gradient-to-t from-cyan-400/25 to-blue-400/35 rounded-full" 
                             style={{ animation: 'wave-motion 2s ease-in-out infinite' }}></div>
                        <div className="w-2 h-8 bg-gradient-to-t from-blue-400/30 to-indigo-400/40 rounded-full" 
                             style={{ animation: 'wave-motion 2.4s ease-in-out infinite' }}></div>
                      </div>
                      
                      {/* Geometric Shapes */}
                      <div className="absolute top-1/6 left-1/6 w-4 h-4 bg-gradient-to-br from-violet-400/30 to-purple-500/35 rotate-45" 
                           style={{ animation: 'floating-3d 6s ease-in-out infinite' }}></div>
                      <div className="absolute bottom-1/6 right-1/5 w-6 h-6 border-2 border-pink-400/40 rounded-full" 
                           style={{ animation: 'pulse-glow 5s ease-in-out infinite' }}></div>
                    </div>
                    
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
          <div className="hidden lg:block mt-1 lg:mt-2 pt-1 lg:pt-2 border-t border-white/20 w-full">
            <div className="text-center space-y-1 lg:space-y-2 w-full max-w-5xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-2 lg:mb-3">
                <div className="w-6 lg:w-12 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full"></div>
                <h3 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  ติดต่อเราเพื่อรับคำปรึกษา
                </h3>
                <div className="w-6 lg:w-12 h-0.5 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-full"></div>
              </div>
              
              {/* Contact Grid - Compact Layout */}
              <div className="space-y-1 lg:space-y-2">
                {/* Top Row - 3 columns */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-2 w-full">
                  {/* Phone Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-2 lg:p-4 rounded-lg lg:rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 transform hover:-translate-y-1">
                    <div className="text-center space-y-1 lg:space-y-2">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-6 h-6 lg:w-8 lg:h-8 text-gray-700 group-hover:text-gray-900 transition-colors duration-300 mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm lg:text-base mb-0">โทรศัพท์</h4>
                        <p className="text-gray-700 text-xs lg:text-sm font-medium">084-909-7777</p>
                        <p className="text-gray-500 text-xs">ทุกวัน 8:00-17:00</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Line Contact */}
                  <div 
                    className="group bg-white/40 backdrop-blur-sm p-2 lg:p-4 rounded-lg lg:rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => window.open('https://page.line.me/biv3563x?oat_content=url&openQrModal=true', '_blank')}
                  >
                    <div className="text-center space-y-1 lg:space-y-2">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300 mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm lg:text-base mb-0">Line ID</h4>
                        <p className="text-gray-700 text-xs lg:text-sm font-medium">@spkansard</p>
                        <p className="text-gray-500 text-xs">ตอบเร็ว 24 ชม.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Email Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-2 lg:p-4 rounded-lg lg:rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10 transform hover:-translate-y-1">
                    <div className="text-center space-y-1 lg:space-y-2">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6 lg:w-8 lg:h-8 text-slate-600 group-hover:text-slate-700 transition-colors duration-300 mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm lg:text-base mb-0">อีเมล</h4>
                        <p className="text-gray-700 text-xs lg:text-sm font-medium">spkansards@gmail.com</p>
                        <p className="text-gray-500 text-xs">ตอบภายใน 24 ชม.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Row - 3 columns */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-2 w-full">
                  {/* TikTok Contact */}
                  <div 
                    className="group bg-white/40 backdrop-blur-sm p-2 lg:p-4 rounded-lg lg:rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => window.open('https://www.tiktok.com/@spkansard', '_blank')}
                  >
                    <div className="text-center space-y-1 lg:space-y-2">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <PlayCircle className="w-6 h-6 lg:w-8 lg:h-8 text-pink-600 group-hover:text-pink-700 transition-colors duration-300 mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm lg:text-base mb-0">TikTok</h4>
                        <p className="text-gray-700 text-xs lg:text-sm font-medium">@spkansard</p>
                        <p className="text-gray-500 text-xs">ติดตามผลงานและเทคนิค</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Facebook Contact */}
                  <div 
                    className="group bg-white/40 backdrop-blur-sm p-2 lg:p-4 rounded-lg lg:rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => window.open('https://www.messenger.com/t/521641141224767/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0', '_blank')}
                  >
                    <div className="text-center space-y-1 lg:space-y-2">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <MessageSquare className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300 mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm lg:text-base mb-0">Facebook</h4>
                        <p className="text-gray-700 text-xs lg:text-sm font-medium">SP Kansard Official</p>
                        <p className="text-gray-500 text-xs">ติดตามข่าวสารและโปรโมชั่น</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address Contact */}
                  <div className="group bg-white/40 backdrop-blur-sm p-2 lg:p-4 rounded-lg lg:rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 transform hover:-translate-y-1 cursor-pointer"
                       onClick={() => window.open('https://spkansard.com', '_blank')}>
                    <div className="text-center space-y-1 lg:space-y-2">
                      <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-gray-700 group-hover:text-gray-900 transition-colors duration-300 mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm lg:text-base mb-0">สาขาทั้งหมด</h4>
                        <div className="text-gray-700 text-xs lg:text-sm font-medium leading-relaxed space-y-0">
                          <p className="font-semibold text-gray-700">สำนักงานใหญ่</p>
                       
                          <p>• สาขาบางแวก</p> 
                          <p>• สาขาปทุมธานี</p>
                             <p>• สาขาราชพฤกษ์</p>
                         
                        </div>
                        <p className="text-gray-500 text-xs mt-1 flex items-center justify-center space-x-1">
                          <span>คลิกดูรายละเอียด</span>
                          <ChevronRight className="w-3 h-3" />
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
              <div className="bg-white min-h-screen">
                {selectedSize ? (
                  <>
                    {/* Mobile: Stacked Images - Larger */}
                    <div className="space-y-2 p-2">
                      {/* Material Image */}
                      <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-lg cursor-zoom-in"
                           onClick={() => openImageModal(0)}>
                        <div className="h-[45vh] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 relative">
                          <img
                            src={material.image || "/materials/placeholder.jpg"}
                            alt={material.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          {/* Material Label */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h3 className="text-white text-xl font-bold">วัสดุหลัก</h3>
                            <p className="text-white/90 text-base">{material.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* Size Image */}
                      <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-lg cursor-zoom-in"
                           onClick={() => openImageModal(1)}>
                        <div className="h-[45vh] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 relative">
                          <img
                            src={selectedSize.image || material.image || "/materials/placeholder.jpg"}
                            alt={`ขนาด ${selectedSize.name}`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          {/* Size Label */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h3 className="text-white text-xl font-bold">ขนาดที่เลือก</h3>
                            <p className="text-white/90 text-base">{selectedSize.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Text Content Below - Larger text */}
                    <div className="p-4 space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        {/* Material Information */}
                        <div className="space-y-4">
                          <div className="border-b border-slate-200 pb-6">
                            <h2 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
                              {material.name}
                            </h2>
                            <p className="text-slate-600 text-base leading-relaxed">
                              {material.description}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-4">
                              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                                <span className="text-blue-700 text-sm font-medium">คุณภาพพรีเมียม</span>
                              </div>
                              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                                <span className="text-emerald-700 text-sm font-medium">รับประกัน 10 ปี</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Size Information */}
                        <div className="space-y-4">
                          <div className="border-b border-slate-200 pb-6">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">
                              ขนาด {selectedSize.name}
                            </h3>
                            
                            {/* Price Display */}
                            <div className="bg-blue-50 rounded-xl px-6 py-4 border border-blue-100">
                              <div className="text-slate-600 text-sm mb-2">ราคาต่อตารางเมตร</div>
                              {material.pricePerSqm[selectedSize.id] > 0 ? (
                                <div className="text-blue-700 text-2xl font-bold mb-2">
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
                  </>
                ) : (
                  <>
                    {/* Single Material Image - Larger */}
                    <div className="relative overflow-hidden cursor-zoom-in" onClick={() => openImageModal(0)}>
                      <div className="h-[65vh] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 relative">
                        <img
                          src={material.image || "/materials/placeholder.jpg"}
                          alt={material.name}
                          className="w-full h-full object-cover transition-transform duration-700"
                        />
                        {/* Overlay Label */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                          <h2 className="text-white text-2xl font-bold leading-tight">
                            {material.name}
                          </h2>
                          <p className="text-white/90 text-base mt-2">
                            {material.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Material Information Section - Larger text */}
                    <div className="p-6 space-y-6">
                      <div className="text-center space-y-6">
                        <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                          {material.name}
                        </h2>
                        <p className="text-slate-600 text-base leading-relaxed">
                          {material.description}
                        </p>
                        <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-base">
                          <span className="mr-3 text-xl">📏</span>
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

                {/* Project Details */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="text-xl font-bold text-blue-700">{dimensions.width} × {dimensions.length}</div>
                      <div className="text-gray-600 text-sm">กว้าง × ยาว (ม.)</div>
                    </div>
                  </div>
                </div>

                {/* Material & Size Information */}
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold text-gray-800 text-lg mb-3">วัสดุที่เลือก</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ชื่อวัสดุ:</span>
                        <span className="font-medium text-gray-800">{material.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ประเภท:</span>
                        <span className="font-medium text-gray-800">วัสดุคุณภาพสูง</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ขนาด:</span>
                        <span className="font-medium text-gray-800">{selectedSize.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ราคาต่อ ตร.ม.:</span>
                        <span className="font-medium text-blue-700">฿{material.pricePerSqm[selectedSize.id].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold text-gray-800 text-lg mb-3">ขนาดโครงการ</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ความกว้าง:</span>
                        <span className="font-medium text-gray-800">{dimensions.width} เมตร</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ความยาว:</span>
                        <span className="font-medium text-gray-800">{dimensions.length} เมตร</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">พื้นที่รวม:</span>
                        <span className="font-medium text-gray-800">{(dimensions.width * dimensions.length).toFixed(1)} ตร.ม.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ราคาวัสดุ:</span>
                        <span className="font-medium text-blue-700">฿{(material.pricePerSqm[selectedSize.id] * dimensions.width * dimensions.length).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services List */}
                {(selectedServices.length > 0 || Object.keys(selectedExtras).some(key => selectedExtras[key]) || Object.keys(selectedGutterMaterials).some(key => selectedGutterMaterials[key])) && (
                  <div className="border-t border-blue-100 pt-4">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">บริการที่เลือก</h4>
                    
                    <div className="space-y-2">
                      {/* Main Services */}
                      {mainServices
                        .filter((service) => selectedServices.includes(service.id))
                        .map((service) => {
                          let servicePrice = service.price || 0;
                          const selectedOption = selectedServiceOptions[service.id];
                          let optionInfo = '';
                          
                          if (selectedOption && service.options) {
                            const option = service.options.find(opt => opt.id === selectedOption);
                            if (option) {
                              // ถ้าเป็น poles service ให้คูณกับจำนวนเสา
                              if (service.id === 'poles') {
                                servicePrice = option.price * poleCount;
                                optionInfo = `${option.name} (${poleCount} ต้น)`;
                              } else {
                                servicePrice += option.price;
                                optionInfo = option.name;
                              }
                            }
                          }
                          
                          if (service.pricePerSqm && dimensions.width > 0 && dimensions.length > 0) {
                            servicePrice = servicePrice * dimensions.width * dimensions.length;
                            if (optionInfo) optionInfo += ` (${(dimensions.width * dimensions.length).toFixed(1)} ตร.ม.)`;
                          }
                          
                          return (
                            <div key={service.id} className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded border border-blue-100">
                              <div className="flex-1">
                                <span className="font-medium text-gray-800">{service.name}</span>
                                {optionInfo && (
                                  <span className="text-gray-600 text-sm ml-2">• {optionInfo}</span>
                                )}
                              </div>
                              <span className="font-bold text-blue-700 ml-3">฿{servicePrice.toLocaleString()}</span>
                            </div>
                          );
                        })}
                      
                      {/* Extra Services */}
                      {Object.entries(selectedExtras)
                        .filter(([_, optionId]) => optionId)
                        .map(([serviceId, optionId]) => {
                          const service = extraServices.find((s) => s.id === serviceId);
                          if (!service) return null;
                          
                          // หาตัวเลือกหลักและตัวเลือกย่อย
                          let option = service.options.find((o) => o.id === optionId);
                          let subOption = null;
                          
                          if (!option) {
                            // หากไม่พบ option หลัก ให้หาใน subOptions
                            for (const mainOption of service.options) {
                              if (mainOption.subOptions) {
                                subOption = mainOption.subOptions.find(sub => sub.id === optionId);
                                if (subOption) {
                                  option = mainOption;
                                  break;
                                }
                              }
                            }
                          }
                          
                          if (!option) return null;
                          
                          // ใช้ราคาจาก subOption หรือ option หลัก
                          const priceSource = subOption || option;
                          let finalPrice = priceSource.price;
                          let displayName = subOption ? subOption.name : option.name;
                          let extraInfo = '';
                          
                          // คำนวณราคาตามประเภทบริการ
                          if (service.id === 'foundation') {
                            const foundationUnits = Math.max(poleCount, 2);
                            finalPrice = priceSource.price * foundationUnits;
                            extraInfo = `${foundationUnits} ชุด`;
                          } else if (service.pricePerSqm && dimensions.width > 0 && dimensions.length > 0) {
                            const area = dimensions.width * dimensions.length;
                            finalPrice = priceSource.price * area;
                            extraInfo = `${area.toFixed(1)} ตร.ม.`;
                          } else if (service.requiresLength) {
                            const length = Math.max(dimensions.length, service.minimumLength || 3);
                            finalPrice = priceSource.price * length;
                            extraInfo = `${length} ม.`;
                          }
                          
                          return (
                            <div key={serviceId} className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded border border-blue-100">
                              <div className="flex-1">
                                <span className="font-medium text-gray-800">{service.name}</span>
                                <span className="text-gray-600 text-sm ml-2">• {displayName}</span>
                                {extraInfo && (
                                  <span className="text-gray-500 text-sm ml-1">({extraInfo})</span>
                                )}
                              </div>
                              <span className="font-bold text-blue-700 ml-3">฿{finalPrice.toLocaleString()}</span>
                            </div>
                          );
                        })}
                      
                      {/* Gutter Materials */}
                      {Object.entries(selectedGutterMaterials)
                        .filter(([_, materialId]) => materialId)
                        .map(([serviceId, materialId]) => {
                          const selectedGutter = gutterMaterials.find(g => g.id === materialId);
                          if (!selectedGutter) return null;
                          const gutterLength = dimensions.length;
                          const gutterTotalPrice = selectedGutter.price * gutterLength;
                          
                          return (
                            <div key={`gutter-${serviceId}`} className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded border border-blue-100">
                              <div className="flex-1">
                                <span className="font-medium text-gray-800">งานรางน้ำ</span>
                                <span className="text-gray-600 text-sm ml-2">• {selectedGutter.name} ({gutterLength} ม.)</span>
                              </div>
                              <span className="font-bold text-blue-700 ml-3">฿{gutterTotalPrice.toLocaleString()}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                <div className="border-t border-blue-100 pt-6 mt-6">
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <h5 className="font-bold text-yellow-800 text-base mb-2">หมายเหตุสำคัญ</h5>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• ราคานี้เป็นการประมาณการเบื้องต้น</li>
                        <li>• ไม่รวม VAT 7%</li>
                        <li>• อาจมีการปรับเปลี่ยนตามสภาพพื้นที่จริง</li>
                        <li>• ราคาขั้นสุดท้ายขึ้นอยู่กับการสำรวจหน้างาน</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h5 className="font-bold text-green-800 text-base mb-2">ติดต่อเราเพื่อรับใบเสนอราคา</h5>
                      <div className="text-green-700 text-sm space-y-1">
                        <p>📞 โทรศัพท์: 084-909-7777</p>
                        <p>💬 Line: @spkansard</p>
                        <p>📧 อีเมล: spkansards@gmail.com</p>
                        <p className="font-medium mt-2">พร้อมให้คำปรึกษาฟรี!</p>
                      </div>
                    </div>
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