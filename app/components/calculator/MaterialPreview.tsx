'use client';

import { Material } from '@/app/lib/types';

interface MaterialPreviewProps {
  material: Material | null;
}

export function MaterialPreview({ material }: MaterialPreviewProps) {
  if (!material) {
    return (
      <div className="bg-gradient-to-br from-blue-50/40 to-white rounded-xl shadow-sm border border-gray-100 p-6 h-full overflow-hidden">
        <div className="max-w-2xl mx-auto text-center h-full flex flex-col justify-between">
          {/* Logo Hero Section */}
          <div className="mb-6">
            <div className="relative inline-block">
              <img 
                src="/materials/logo.webp" 
                alt="SP Kansard Logo" 
                className="h-16 w-auto mx-auto drop-shadow-lg"
              />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
              SP Kansard Calculator
            </h1>
            <p className="text-base text-gray-600">
              ระบบคำนวณราคากันสาดและหลังคาออนไลน์ที่<strong>แม่นยำ</strong>และ<strong>ใช้งานง่าย</strong>
            </p>
          </div>
          
          {/* Company Highlights - Compact */}
          <div className="bg-white/80 rounded-xl p-5 mb-5 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-semibold text-sm">
                🏢 เกี่ยวกับ SP Kansard
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm">⭐</span>
                </div>
                <h3 className="font-bold text-blue-800 text-xs mb-1">ประสบการณ์ 15+ ปี</h3>
                <p className="text-xs text-gray-600">ผู้เชี่ยวชาญกันสาดและหลังคา</p>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm">🎯</span>
                </div>
                <h3 className="font-bold text-indigo-800 text-xs mb-1">วัสดุคุณภาพสูง</h3>
                <p className="text-xs text-gray-600">แบรนด์ชั้นนำระดับโลก</p>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm">👷</span>
                </div>
                <h3 className="font-bold text-green-800 text-xs mb-1">ทีมมืออาชีพ</h3>
                <p className="text-xs text-gray-600">คำปรึกษาและติดตั้ง</p>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm">✅</span>
                </div>
                <h3 className="font-bold text-purple-800 text-xs mb-1">รับประกันครบครัน</h3>
                <p className="text-xs text-gray-600">งานและวัสดุ</p>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm">💎</span>
                </div>
                <h3 className="font-bold text-orange-800 text-xs mb-1">ราคาโปร่งใส</h3>
                <p className="text-xs text-gray-600">ไม่มีค่าซ่อนเร้น</p>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm">🚀</span>
                </div>
                <h3 className="font-bold text-pink-800 text-xs mb-1">เทคโนโลยีใหม่</h3>
                <p className="text-xs text-gray-600">ระบบแม่นยำ</p>
              </div>
            </div>
          </div>
          
          {/* How to Use - Compact */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 mb-5">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-indigo-500 text-white px-4 py-1.5 rounded-full font-semibold text-sm">
                📋 วิธีการใช้งาน
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-800">เลือกประเภทวัสดุ</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-800">เลือกชนิดและขนาด</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-800">ระบุขนาดพื้นที่</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-800">เลือกบริการเสริม</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mb-4">
            <div className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="font-semibold text-sm">เริ่มต้นโดยเลือกประเภทวัสดุด้านซ้าย</span>
            </div>
          </div>
          
          {/* Contact Section - Compact */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="text-center mb-3">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">💬 ต้องการคำปรึกษา?</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {/* Phone */}
              <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-blue-600 text-xs">084-909-7777</p>
                </div>
              </div>
              
              {/* Line */}
              <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0.349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-blue-600 text-xs truncate">lin.ee/SJ245co</p>
                </div>
              </div>
              
              {/* Facebook Messenger */}
              <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4h3V9h2v4h3l-4 4z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-blue-600 text-xs truncate">m.me/spkansard</p>
                </div>
              </div>
              
              {/* TikTok */}
              <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-blue-600 text-xs">@spkansard</p>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 md:col-span-2 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-blue-600 text-xs truncate">spkansards@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-80">
        <img
          src={material.image}
          alt={material.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold">{material.name}</h2>
          <div className="mt-2 flex items-center text-sm">
            <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              {material.type === 'translucent' ? 'วัสดุโปร่งแสง' : 'วัสดุทึบแสง'}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 leading-relaxed">{material.description}</p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {material.sizes.map((size) => (
            <div
              key={size.id}
              className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="font-medium">{size.name}</div>
              <p className="mt-1 text-sm text-gray-600">{size.description}</p>
              <div className="mt-2 text-blue-600 font-medium">
                ฿{material.pricePerSqm[size.id].toLocaleString()}/ตร.ม.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}