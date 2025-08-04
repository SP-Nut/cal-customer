'use client';

import React from 'react';

// This would normally come from your types file
interface Material {
  name: string;
  image?: string;
  type: 'translucent' | 'opaque';
  description: string;
  sizes: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  pricePerSqm: Record<string, number>;
}

interface MaterialPreviewProps {
  material: Material | null;
}

export function MaterialPreview({ material }: MaterialPreviewProps) {
  if (!material) {
    return (
      <div className="h-full relative overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-gray-50" 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* Clean Modern Background Pattern */}
        <div className="absolute inset-0">
          {/* Subtle Clean Gradient Overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/5 via-purple-400/3 to-cyan-400/5"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-emerald-300/4 via-transparent to-blue-300/4"></div>
          
          {/* Modern Floating Geometric Shapes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/8 to-purple-600/5 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/6 to-cyan-600/4 rounded-full blur-lg animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          
          {/* Clean Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(99,102,241,0.2) 1px, transparent 0)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Content Container - Fixed Height Sections */}
          <div className="flex-1 flex flex-col justify-between p-8 py-12 max-w-7xl mx-auto w-full">
            
            {/* Header Section - Compact */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                {/* Clean Glow Effect Behind Logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/6 via-purple-400/4 to-emerald-400/6 rounded-3xl blur-xl scale-120 animate-pulse-soft"></div>
                <div className="relative group">
                  <img 
                    src="/materials/logo.webp" 
                    alt="SP Kansard Logo" 
                    className="h-14 lg:h-18 w-auto mx-auto drop-shadow-md group-hover:scale-105 group-hover:drop-shadow-lg transition-all duration-500"
                  />
                </div>
              </div>
              <div className="relative">
                <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                  <span className="text-gray-800">
                    SP Kansard Calculator
                  </span>
                </h1>
                <div className="absolute -inset-x-6 -inset-y-3 bg-gradient-to-r from-transparent via-gray-100/10 to-transparent rounded-3xl -z-10 blur-sm"></div>
              </div>
              <p className="text-lg lg:text-xl text-blue-700 max-w-3xl mx-auto font-medium leading-relaxed">
                ระบบคำนวณราคากันสาดและหลังคาออนไลน์ที่แม่นยำและใช้งานง่าย
              </p>
            </div>

            {/* Presenter Section - Main Content */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start w-full max-w-5xl">
                {/* Presenter Image - Left with Enhanced Animation */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative w-80 h-80 lg:w-88 lg:h-88 group">
                    {/* Soft Floating Animation Background */}
                    <div className="absolute inset-0">
                      {/* Gentle Soft Glow Effects */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/8 via-slate-200/6 to-cyan-200/8 rounded-full blur-xl group-hover:blur-lg transition-all duration-1000 animate-pulse-soft"></div>
                      
                      {/* Soft Floating Circles */}
                      <div className="absolute top-10 left-6 w-24 h-24 bg-gradient-to-br from-blue-300/12 via-slate-300/10 to-gray-300/8 rounded-full animate-float shadow-sm backdrop-blur-sm border border-blue-200/10" 
                           style={{ animationDelay: '0s', animationDuration: '12s' }}></div>
                      <div className="absolute bottom-16 right-10 w-20 h-20 bg-gradient-to-br from-slate-300/10 via-blue-300/8 to-cyan-300/6 rounded-full animate-float shadow-sm backdrop-blur-sm border border-slate-200/8" 
                           style={{ animationDelay: '4s', animationDuration: '14s' }}></div>
                      <div className="absolute top-1/2 left-2 w-16 h-16 bg-gradient-to-br from-cyan-300/8 via-gray-300/6 to-blue-300/5 rounded-full animate-float shadow-sm backdrop-blur-sm border border-cyan-200/6" 
                           style={{ animationDelay: '8s', animationDuration: '16s' }}></div>
                    </div>
                    
                    {/* Person Image with enhanced styling */}
                    <div className="relative z-10">
                      <img 
                        src="/materials/pr.png" 
                        alt="SP Kansard Presenter" 
                        className="w-full h-full object-contain object-top drop-shadow-xl group-hover:scale-105 transition-all duration-800 filter brightness-108 contrast-103"
                      />
                    </div>
                    
                    {/* Vibrant Modern Badge */}
                    <div className="absolute -bottom-1 -right-4 bg-gradient-to-br from-indigo-600 via-purple-700 to-cyan-800 text-white rounded-2xl w-16 h-16 flex items-center justify-center shadow-xl animate-bounce-subtle z-20 border-2 border-white/40 backdrop-blur-sm group-hover:scale-105 transition-all duration-400">
                      <span className="text-2xl animate-wave drop-shadow-sm">👋</span>
                    </div>
                  </div>
                </div>
                
                {/* Message Content - Right */}
                <div className="flex justify-center lg:justify-start">
                  <div className="text-center lg:text-left max-w-md">
                    <div className="relative mb-6">
                      <h3 className="text-3xl lg:text-5xl font-bold mb-5 leading-tight">
                        <span className="text-gray-800">
                          ยินดีต้อนรับสู่
                        </span>
                        <br />
                        <span className="text-gray-700 font-black">
                          SP Kansard!
                        </span>
                      </h3>
                      {/* Soft decorative underline */}
                      <div className="absolute -bottom-1 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-24 h-1.5 bg-gray-300 rounded-full shadow-lg animate-pulse-soft"></div>
                    </div>
                    
                    <div className="space-y-5 text-lg lg:text-xl text-gray-600 leading-relaxed">
                      <p className="font-medium">
                        "เราเป็น<span className="font-bold text-gray-800">ผู้เชี่ยวชาญด้านกันสาดและหลังคา</span><br />
                        มากกว่า <span className="font-bold text-gray-700">15 ปี</span>"
                      </p>
                      
                      <p>
                        "พร้อมให้คำปรึกษาและติดตั้งด้วย<br />
                        <span className="font-bold text-gray-700">วัสดุคุณภาพสูง</span>"
                      </p>
                      
                      <p className="text-2xl lg:text-3xl font-bold">
                        <span className="text-blue-600">
                          "คำนวณราคาง่ายๆ<br />
                          ได้เลยที่นี่!"
                        </span>
                      </p>
                    </div>
                    
                    <div className="mt-8">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-gray-700">
                          <span className="text-5xl">✨</span> ทีม SP Kansard
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section - Fixed Bottom */}
            <div className="mt-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                <a href="tel:084-909-7777" className="group relative bg-gradient-to-br from-white/95 via-gray-50/80 to-slate-50/60 backdrop-blur-lg p-5 rounded-3xl border border-gray-200/60 hover:border-gray-300/80 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400/0 to-slate-600/0 group-hover:from-gray-400/8 group-hover:to-slate-600/5 rounded-3xl transition-all duration-700"></div>
                  
                  <div className="relative flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl border border-blue-300/40">
                      <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 text-xl mb-1 group-hover:text-gray-800 transition-colors duration-300">084-909-7777</p>
                      <p className="text-sm text-gray-600 font-medium">โทรปรึกษาทันที</p>
                    </div>
                  </div>
                </a>
                
                <a href="https://lin.ee/SJ245co" className="group relative bg-gradient-to-br from-white/95 via-gray-50/80 to-slate-50/60 backdrop-blur-lg p-5 rounded-3xl border border-gray-200/60 hover:border-gray-300/80 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400/0 to-slate-600/0 group-hover:from-gray-400/8 group-hover:to-slate-600/5 rounded-3xl transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400/0 to-slate-500/0 group-hover:from-gray-400/15 group-hover:to-slate-500/10 rounded-3xl transition-all duration-700"></div>
                  
                  <div className="relative flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-400 via-gray-500 to-slate-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl border border-gray-300/40">
                      <span className="text-white font-bold text-base drop-shadow-lg">LINE</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 text-xl mb-1 group-hover:text-gray-800 transition-colors duration-300">Line Chat</p>
                      <p className="text-sm text-gray-600 font-medium">แชทสอบถาม 24/7</p>
                    </div>
                  </div>
                </a>
                
                <a href="mailto:spkansards@gmail.com" className="group relative bg-gradient-to-br from-white/95 via-gray-50/80 to-slate-50/60 backdrop-blur-lg p-5 rounded-3xl border border-gray-200/60 hover:border-gray-300/80 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400/0 to-slate-600/0 group-hover:from-gray-400/8 group-hover:to-slate-600/5 rounded-3xl transition-all duration-700"></div>
                  
                  <div className="relative flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-400 via-gray-500 to-slate-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl border border-gray-300/40">
                      <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 text-xl mb-1 group-hover:text-gray-800 transition-colors duration-300">Email</p>
                      <p className="text-sm text-gray-600 font-medium">ส่งอีเมลสอบถาม</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl h-full overflow-hidden">
      {/* Material Image */}
      <div className="relative h-80">
        <img
          src={material.image || "/materials/placeholder.jpg"}
          alt={material.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute top-6 right-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-sm font-semibold text-slate-800 shadow-lg border border-white/50">
            <span className="mr-2 text-lg">
              {material.type === 'translucent' ? '🔆' : '🛡️'}
            </span>
            {material.type === 'translucent' ? 'โปร่งแสง' : 'ทึบแสง'}
          </span>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">{material.name}</h2>
          <p className="text-lg text-slate-200 drop-shadow-md font-light">วัสดุคุณภาพสูง สำหรับงานก่อสร้าง</p>
        </div>
      </div>
      
      {/* Scrollable Content Container */}
      <div className="h-full overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* Material Details */}
        <div className="p-8">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">รายละเอียดสินค้า</h3>
            <p className="text-slate-600 leading-relaxed text-lg font-light">{material.description}</p>
          </div>
          
          {/* Size Options */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">ขนาดที่มีให้เลือก</h3>
            <div className="space-y-4">
              {material.sizes.map((size) => (
                <div
                  key={size.id}
                  className="group p-6 rounded-2xl border-2 border-slate-200 hover:border-gray-300 hover:bg-gray-50/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-slate-800 group-hover:text-gray-700 transition-colors duration-300">
                      {size.name}
                    </h4>
                    <div className="text-right">
                      {material.pricePerSqm[size.id] > 0 ? (
                        <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-3 border border-gray-200">
                          <div className="text-3xl font-bold text-gray-600 mb-1">
                            ฿{material.pricePerSqm[size.id].toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-500 font-medium">
                            ต่อ ตร.ม.
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-100 rounded-xl p-3 border border-slate-200">
                          <div className="text-lg text-slate-400 font-bold">
                            ไม่รองรับ
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light">{size.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">💡</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">ข้อมูลสำคัญ</h4>
                <p className="text-gray-800 leading-relaxed font-medium">
                  ราคาที่แสดงเป็นราคาวัสดุเท่านั้น ไม่รวมค่าติดตั้ง ค่าขนส่ง และอุปกรณ์เสริม<br />
                  สามารถเลือกบริการติดตั้งเพิ่มเติมได้ในขั้นตอนถัดไป
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}