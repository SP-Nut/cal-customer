'use client';

import React from 'react';

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
  onNext?: () => void;
}

export function MaterialPreview({ material, onNext }: MaterialPreviewProps) {
  if (!material) {
    return (
      <div className="h-full relative overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-slate-50" 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
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
          <div className="flex-1 flex flex-col p-8 w-full">
            
            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center py-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto">
                
                {/* Content Section */}
                <div className="text-left space-y-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full"></div>
                    <p className="text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-widest">
                      ระบบคำนวณมืออาชีพ
                    </p>
                  </div>
                  
                  <h2 className="text-5xl lg:text-7xl font-extralight mb-6 leading-tight text-slate-800">
                    สร้างโซลูชั่น<br />
                    <span className="font-normal bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      กันสาดและหลังคา
                    </span>
                    <br />
                    <span className="font-normal bg-gradient-to-r from-purple-600 via-blue-500 to-slate-600 bg-clip-text text-transparent">
                      ที่ดีที่สุด
                    </span>
                  </h2>
                  
                  <div className="bg-transparent p-6 mb-6">
                    <p className="text-lg text-slate-700 leading-relaxed font-normal">
                      ระบบคำนวณราคากันสาดและหลังคาแบบมืออาชีพ คำนวณราคาแม่นยำครบครันทุกรายการ 
                      ด้วยประสบการณ์มากกว่า 15 ปี พร้อมบริการครบวงจร
                    </p>
                  </div>
                  
                  {/* Feature Cards */}
                  <div className="grid gap-3 mb-6">
                    {[
                      { icon: '✓', title: 'คำนวณราคาแม่นยำ', desc: 'ไม่มีค่าใช้จ่ายแอบแฝง โปร่งใสทุกรายการ', bg: 'from-blue-500 via-purple-500 to-pink-500' },
                      { icon: '⚡', title: 'วัสดุคุณภาพสูง', desc: 'มาตรฐานสากล ทนทาน ใช้งานได้ยาวนาน', bg: 'from-purple-500 via-blue-500 to-cyan-500' },
                      { icon: '🏠', title: 'ทีมช่างมืออาชีพ', desc: 'รับประกันงาน บริการหลังการขายครบถ้วน', bg: 'from-pink-500 via-purple-500 to-blue-500' }
                    ].map((item, index) => (
                      <div key={index} className="group bg-transparent p-5 hover:bg-white/10 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10">
                        <div className="flex items-center space-x-5">
                          <div className={`w-12 h-12 bg-gradient-to-br ${item.bg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white font-bold text-lg">{item.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg mb-1">{item.title}</h4>
                            <p className="text-slate-600 text-base">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="flex justify-center lg:justify-start">
                    <button 
                      onClick={onNext || (() => {})}
                      className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-16 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105"
                    >
                      <span className="flex items-center justify-center space-x-3">
                        <span>เริ่มคำนวณราคา</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300 text-2xl">→</span>
                      </span>
                    </button>
                  </div>
                </div>
                
                {/* Image Section */}
                <div className="relative">
                  <div className="relative w-full max-w-lg mx-auto lg:mx-0">
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
                
                {/* Contact Information Section - Full Width */}
                <div className="col-span-full mt-8 pt-8 border-t border-white/20 w-full">
                  <div className="text-center space-y-6 w-full">
                    <div className="flex items-center justify-center space-x-4 mb-6">
                      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full"></div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                        ติดต่อเราเพื่อรับคำปรึกษา
                      </h3>
                      <div className="w-20 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-full"></div>
                    </div>
                    
                    {/* Contact Grid - 3 columns top, 3 columns bottom */}
                    <div className="space-y-6">
                      {/* Top Row - 3 columns */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {/* Phone Contact */}
                        <div className="group bg-white/40 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 transform hover:-translate-y-1">
                          <div className="text-center space-y-4">
                            <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-12 h-12 text-gray-700 group-hover:text-gray-900 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 text-lg mb-2">โทรศัพท์</h4>
                              <p className="text-gray-700 text-base font-medium">02-123-4567</p>
                              <p className="text-gray-500 text-sm">จันทร์-เสาร์ 8:00-18:00</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Line Contact */}
                        <div className="group bg-white/40 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 transform hover:-translate-y-1">
                          <div className="text-center space-y-4">
                            <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-12 h-12 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 text-lg mb-2">Line ID</h4>
                              <p className="text-gray-700 text-base font-medium">@spkansard</p>
                              <p className="text-gray-500 text-sm">ตอบเร็ว 24 ชม.</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Email Contact */}
                        <div className="group bg-white/40 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10 transform hover:-translate-y-1">
                          <div className="text-center space-y-4">
                            <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-12 h-12 text-slate-600 group-hover:text-slate-700 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 text-lg mb-2">อีเมล</h4>
                              <p className="text-gray-700 text-base font-medium">info@spkansard.com</p>
                              <p className="text-gray-500 text-sm">ตอบภายใน 24 ชม.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Row - 3 columns */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {/* WhatsApp Contact */}
                        <div className="group bg-white/40 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 transform hover:-translate-y-1">
                          <div className="text-center space-y-4">
                            <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-12 h-12 text-green-600 group-hover:text-green-700 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 text-lg mb-2">WhatsApp</h4>
                              <p className="text-gray-700 text-base font-medium">085-123-4567</p>
                              <p className="text-gray-500 text-sm">ส่งข้อความได้ตลอด 24 ชม.</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Facebook Contact */}
                        <div className="group bg-white/40 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1">
                          <div className="text-center space-y-4">
                            <div className="mx-auto group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-12 h-12 text-blue-600 group-hover:text-blue-700 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 text-lg mb-2">Facebook</h4>
                              <p className="text-gray-700 text-base font-medium">SP Kansard Official</p>
                              <p className="text-gray-500 text-sm">ติดตามข่าวสารและโปรโมชั่น</p>
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-slate-50"
         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style jsx>{`
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
      
      {/* Background Layer - Full Coverage */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-pink-50/70"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-purple-50/30 to-blue-100/40"></div>
        
        {/* Subtle floating elements */}
        <div className="absolute top-1/5 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-100/25 via-purple-100/20 to-transparent rounded-full" style={{ animation: 'pulse-soft 6s ease-in-out infinite' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-100/20 to-blue-100/25 rounded-full" style={{ animation: 'drift 12s linear infinite' }}></div>
        <div className="absolute top-1/2 left-1/6 w-48 h-48 bg-gradient-to-br from-purple-100/15 to-blue-100/20 rounded-full" style={{ animation: 'float-gentle 8s ease-in-out infinite' }}></div>
        <div className="absolute top-1/4 right-1/6 w-36 h-36 bg-gradient-to-br from-cyan-100/20 to-pink-100/15 rounded-full" style={{ animation: 'drift 14s linear infinite' }}></div>
        <div className="absolute bottom-1/5 right-1/3 w-28 h-28 bg-gradient-to-br from-blue-100/25 to-purple-100/20 rounded-full" style={{ animation: 'pulse-soft 8s ease-in-out infinite' }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Material Image */}
        <div className="relative h-80">
          <img
            src={material.image || "/materials/placeholder.jpg"}
            alt={material.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
          
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-sm font-semibold text-slate-800 shadow-lg border border-blue-100/50">
              <span className="mr-2 text-lg">
                {material.type === 'translucent' ? '🔆' : '🛡️'}
              </span>
              {material.type === 'translucent' ? 'โปร่งแสง' : 'ทึบแสง'}
            </span>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">{material.name}</h2>
            <p className="text-lg text-blue-100 drop-shadow-md font-medium">วัสดุคุณภาพสูง สำหรับงานก่อสร้าง</p>
          </div>
        </div>
        
        {/* Material Details */}
        <div className="p-8 pb-4 relative z-10">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">รายละเอียดสินค้า</h3>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30">
              <p className="text-slate-700 leading-relaxed text-lg font-medium">{material.description}</p>
            </div>
          </div>
          
          {/* Size Options */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">ขนาดที่มีให้เลือก</h3>
            <div className="space-y-4">
              {material.sizes.map((size) => (
                <div
                  key={size.id}
                  className="group p-6 rounded-xl border-2 border-blue-100/50 hover:border-blue-300/70 hover:bg-blue-50/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg bg-white/40 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                      {size.name}
                    </h4>
                    <div className="text-right">
                      {material.pricePerSqm[size.id] > 0 ? (
                        <div className="bg-blue-50/80 backdrop-blur-sm rounded-lg p-3 border border-blue-100/70">
                          <div className="text-2xl font-medium text-blue-600 mb-1">
                            ฿{material.pricePerSqm[size.id].toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-500 font-medium">
                            ต่อ ตร.ม.
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-100/80 backdrop-blur-sm rounded-xl p-3 border border-slate-200/70">
                          <div className="text-lg text-slate-400 font-bold">
                            ไม่รองรับ
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">{size.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white/40 backdrop-blur-sm p-6 rounded-xl border border-white/60">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">💡</span>
              </div>
              <div>
                <h4 className="text-lg font-medium text-slate-700 mb-3">ข้อมูลสำคัญ</h4>
                <p className="text-slate-600 leading-relaxed font-normal">
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