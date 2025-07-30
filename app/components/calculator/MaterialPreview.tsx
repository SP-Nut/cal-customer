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
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border border-slate-200/50 p-8 h-full overflow-hidden">
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="relative inline-block mt-40 mb-8">
              <img 
                src="/materials/logo.webp" 
                alt="SP Kansard Logo" 
                className="h-20 w-auto mx-auto drop-shadow-sm"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-6">
              SP Kansard Calculator
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              ระบบคำนวณราคากันสาดและหลังคาออนไลน์ที่แม่นยำและใช้งานง่าย
            </p>
          </div>

          {/* Presenter Section */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
              {/* Presenter Image - Left with Animated Background */}
              <div className="flex-shrink-0">
                <div className="relative w-80 h-80 lg:w-[28rem] lg:h-[28rem]">
                  {/* Custom CSS for Smooth Floating Animation */}
                  <style jsx>{`
                    @keyframes float {
                      0%, 100% { transform: translateY(0px) translateX(0px); }
                      25% { transform: translateY(-10px) translateX(5px); }
                      50% { transform: translateY(-20px) translateX(-5px); }
                      75% { transform: translateY(-5px) translateX(10px); }
                    }
                  `}</style>
                  
                  {/* Animated Background - Behind Person Only */}
                  <div className="absolute inset-0">
                    {/* Floating Circles - More Gentle Movement */}
                    <div className="absolute top-16 left-12 w-24 h-24 bg-blue-200/20 rounded-full" 
                         style={{ 
                           animation: 'float 6s ease-in-out infinite',
                           animationDelay: '0s'
                         }}></div>
                    <div className="absolute top-32 right-16 w-20 h-20 bg-purple-200/25 rounded-full" 
                         style={{ 
                           animation: 'float 8s ease-in-out infinite',
                           animationDelay: '2s'
                         }}></div>
                    <div className="absolute bottom-32 left-16 w-16 h-16 bg-indigo-200/20 rounded-full" 
                         style={{ 
                           animation: 'float 7s ease-in-out infinite',
                           animationDelay: '4s'
                         }}></div>
                    <div className="absolute bottom-48 right-12 w-18 h-18 bg-blue-300/25 rounded-full" 
                         style={{ 
                           animation: 'float 9s ease-in-out infinite',
                           animationDelay: '1s'
                         }}></div>
                    
                    {/* Floating Soft Blobs */}
                    <div className="absolute top-24 left-1/3 w-16 h-12 bg-gradient-to-r from-blue-300/15 to-purple-300/15 rounded-full animate-pulse transform" 
                         style={{ animationDuration: '3s', transform: 'rotate(-15deg)' }}></div>
                    <div className="absolute top-1/2 right-1/4 w-12 h-16 bg-gradient-to-r from-indigo-300/15 to-blue-300/15 rounded-full animate-pulse" 
                         style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
                    <div className="absolute bottom-24 left-1/4 w-20 h-8 bg-gradient-to-r from-purple-300/10 to-pink-300/15 rounded-full animate-pulse" 
                         style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
                    
                    {/* Sparkling Dots */}
                    <div className="absolute top-20 left-1/2 w-2 h-2 bg-yellow-300/60 rounded-full animate-ping" 
                         style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-300/60 rounded-full animate-ping" 
                         style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-cyan-300/60 rounded-full animate-ping" 
                         style={{ animationDelay: '1.5s' }}></div>
                  </div>
                  
                  {/* Person Image */}
                  <img 
                    src="/materials/pr.png" 
                    alt="SP Kansard Presenter" 
                    className="relative z-10 w-80 h-80 lg:w-[28rem] lg:h-[28rem] object-contain object-top"
                  />
                  
                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg animate-bounce z-20" 
                       style={{ animationDuration: '2s' }}>
                    <span className="text-2xl">👋</span>
                  </div>
                </div>
              </div>
              
              {/* Message Content - Right */}
              <div className="flex-1 lg:pt-8">
                <h3 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8">
                  ยินดีต้อนรับสู่<br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    SP Kansard!
                  </span>
                </h3>
                
                <div className="space-y-6 text-xl lg:text-2xl text-slate-700 leading-relaxed">
                  <p className="font-medium">
                    "เราเป็น<span className="font-bold text-blue-700">ผู้เชี่ยวชาญด้านกันสาดและหลังคา</span><br />
                    มากกว่า <span className="font-bold text-blue-700">15 ปี</span>"
                  </p>
                  <p>
                    "พร้อมให้คำปรึกษาและติดตั้งด้วย<br />
                    <span className="font-bold text-blue-700">วัสดุคุณภาพสูง</span>"
                  </p>
                  <p className="text-3xl lg:text-4xl font-bold text-blue-700 mt-8">
                    "คำนวณราคาง่ายๆ<br />
                    ได้เลยที่นี่!"
                  </p>
                </div>
                
                <div className="mt-10">
                  <span className="text-lg text-blue-600 font-semibold bg-blue-50 px-4 py-2 rounded-full">
                    - ทีม SP Kansard
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="tel:084-909-7777" className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:border-green-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-green-600 text-xl">084-909-7777</p>
                  <p className="text-sm text-slate-500">โทรปรึกษาทันที</p>
                </div>
              </div>
            </a>
            
            <a href="https://lin.ee/SJ245co" className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:border-green-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white font-bold text-lg">LINE</span>
                </div>
                <div>
                  <p className="font-bold text-green-600 text-xl">Line Chat</p>
                  <p className="text-sm text-slate-500">แชทสอบถาม 24/7</p>
                </div>
              </div>
            </a>
            
            <a href="mailto:spkansards@gmail.com" className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:border-red-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-red-600 text-xl">Email</p>
                  <p className="text-sm text-slate-500">ส่งอีเมลสอบถาม</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden h-full scrollbar-hide">
/* Hide scrollbar utility */
<style jsx global>{`
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`}</style>
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
                className="group p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                    {size.name}
                  </h4>
                  <div className="text-right">
                    {material.pricePerSqm[size.id] > 0 ? (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
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
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">💡</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">ข้อมูลสำคัญ</h4>
              <p className="text-blue-800 leading-relaxed font-medium">
                ราคาที่แสดงเป็นราคาวัสดุเท่านั้น ไม่รวมค่าติดตั้ง ค่าขนส่ง และอุปกรณ์เสริม<br />
                สามารถเลือกบริการติดตั้งเพิ่มเติมได้ในขั้นตอนถัดไป
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}