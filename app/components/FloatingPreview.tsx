'use client';

import React, { useState, useEffect } from 'react';
import { Material, Size } from '../lib/types';

interface FloatingPreviewProps {
  material: Material | null;
  selectedSize: Size | null;
  dimensions?: { width: number; length: number };
  isVisible: boolean;
  isInputFocused?: boolean;
}

export default function FloatingPreview({ 
  material, 
  selectedSize, 
  dimensions = { width: 0, length: 0 },
  isVisible,
  isInputFocused = false
}: FloatingPreviewProps) {
  const [show, setShow] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showSizeImage, setShowSizeImage] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    console.log('FloatingPreview debug:', { 
      isVisible, 
      material: material?.name, 
      selectedSize: selectedSize?.name,
      isInputFocused 
    });
    // แสดงเมื่อมีการเลือกวัสดุแล้ว และ isVisible เป็น true (ไม่ต้องรอขนาด)
    if (material && isVisible) {
      console.log('FloatingPreview: Setting show to TRUE');
      setShow(true);
      // ถ้ากำลังกรอกข้อมูล ให้พับ preview ลง
      if (isInputFocused) {
        setIsCollapsed(true);
      }
    } else {
      console.log('FloatingPreview: Setting show to FALSE');
      setShow(false);
    }
  }, [isVisible, material, selectedSize, isInputFocused]);

  if (!material) {
    console.log('FloatingPreview: No material - returning null');
    return null;
  }

  console.log('FloatingPreview: Rendering with show =', show);

  const totalPrice = dimensions.width > 0 && dimensions.length > 0 && selectedSize
    ? material.pricePerSqm[selectedSize.id] * dimensions.width * dimensions.length 
    : 0;

  return (
    <>
      {/* Floating Icon when collapsed */}
      {show && isCollapsed && (
        <div className="lg:hidden fixed top-20 right-4 z-50">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-14 h-14 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-white/20"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      )}

      {/* Full Panel when expanded */}
      <div className={`lg:hidden fixed top-14 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ${
        show && !isCollapsed ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        {/* Header with Toggle Button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-800">ข้อมูลวัสดุ</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="p-2 rounded-md hover:bg-slate-100 transition-colors"
          >
            <svg 
              className="w-5 h-5 text-slate-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Collapsible */}
        <div className="transition-all duration-300 overflow-hidden">
          <div className="px-4 py-3">
            {/* Hero Image Section - ใหญ่และเด่น */}
            <div className="w-full mb-3">
              <div className="relative w-full h-56 rounded-lg overflow-hidden border border-slate-300 shadow-lg cursor-pointer hover:shadow-xl hover:border-blue-300 transition-all duration-300"
                   onClick={(e) => {
                     e.stopPropagation();
                     setShowFullImage(true);
                   }}>
                <img 
                  src={material.image || "/materials/placeholder.jpg"} 
                  alt={material.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
                
                {/* Material Type Badge - Top Right */}
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-sm font-semibold text-slate-700 shadow-md">
                    <span className="mr-1.5">
                      {material.type === 'translucent' ? '🔆' : '🛡️'}
                    </span>
                    {material.type === 'translucent' ? 'โปร่งแสง' : 'ทึบแสง'}
                  </span>
                </div>

                {/* Material Name Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-lg font-bold text-white drop-shadow-lg mb-1">{material.name}</h4>
                  <p className="text-sm text-white/90 drop-shadow line-clamp-1">{material.description}</p>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white/80 rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Image Section - ด้านนอกแยกต่างหาก */}
            {selectedSize && selectedSize.image && (
              <div className="w-full mb-3">
                <div 
                  className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-300 shadow-md cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSizeImage(true);
                  }}
                >
                  <img
                    src={selectedSize.image}
                    alt={`ขนาด ${selectedSize.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                  
                  {/* Size info overlay - ข้อความทับบนรูป */}
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <div>
                      <div className="text-white font-semibold text-base drop-shadow-lg">
                        ขนาด {selectedSize.name}
                      </div>
                      <div className="text-white/90 text-sm drop-shadow">
                        แตะเพื่อดูรายละเอียด
                      </div>
                    </div>
                    <div className="bg-blue-600/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                      <span className="font-bold text-white text-base">
                        ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}/ม²
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-200"></div>
                </div>
              </div>
            )}

            {/* Compact Info Section */}
            <div className="space-y-3">
              {/* Dimensions and Total Price */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {dimensions.width > 0 && dimensions.length > 0 ? (
                      <div className="text-sm text-slate-600">
                        พื้นที่: {dimensions.width} × {dimensions.length} = {(dimensions.width * dimensions.length).toFixed(2)} ตร.ม.
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500">
                        กรอกความกว้างและความยาวเพื่อคำนวณราคา
                      </span>
                    )}
                  </div>
                  
                  {/* Total Price */}
                  {totalPrice > 0 && (
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">
                        ฿{totalPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-500">รวมทั้งหมด</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Material Description */}
              <div className="text-sm text-slate-600 bg-white rounded-lg p-3 border border-slate-200">
                <span className="font-medium text-slate-700">รายละเอียด: </span>
                {material.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal สำหรับดูรูปเต็มขนาด */}
      {showFullImage && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-75 flex items-center justify-center p-4"
             onClick={() => setShowFullImage(false)}>
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={material.image || "/materials/placeholder.jpg"} 
              alt={material.name}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            {/* ปุ่มปิด */}
            <button 
              onClick={() => setShowFullImage(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Modal สำหรับดูรูปขนาดแบบเต็ม */}
      {showSizeImage && selectedSize?.image && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center p-2"
             onClick={() => setShowSizeImage(false)}>
          <div className="relative w-full h-full max-w-md max-h-[80vh] flex items-center justify-center">
            {/* รูปเต็มจอมือถือ */}
            <img 
              src={selectedSize.image} 
              alt={`ขนาด ${selectedSize.name}`}
              className="w-full h-auto max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* ข้อมูลขนาดทับด้านล่างรูป */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 text-center">
                <h3 className="text-xl font-bold text-white mb-2">ขนาด {selectedSize.name}</h3>
                <p className="text-base text-white/90">แตะที่ไหนก็ได้เพื่อปิด</p>
              </div>
            </div>
            
            {/* ปุ่มปิด */}
            <button 
              onClick={() => setShowSizeImage(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
