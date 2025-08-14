'use client';

import React, { useState, useEffect } from 'react';
import { Material, Size } from '../lib/types';

interface FloatingPreviewProps {
  material: Material | null;
  selectedSize: Size | null;
  dimensions?: { width: number; length: number };
  isVisible: boolean;
}

export default function FloatingPreview({ 
  material, 
  selectedSize, 
  dimensions = { width: 0, length: 0 },
  isVisible 
}: FloatingPreviewProps) {
  const [show, setShow] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    console.log('FloatingPreview debug:', { 
      isVisible, 
      material: material?.name, 
      selectedSize: selectedSize?.name 
    });
    // แสดงเมื่อมีการเลือกวัสดุและขนาดแล้ว และ isVisible เป็น true
    if (material && selectedSize && isVisible) {
      console.log('FloatingPreview: Setting show to TRUE');
      setShow(true);
    } else {
      console.log('FloatingPreview: Setting show to FALSE');
      setShow(false);
    }
  }, [isVisible, material, selectedSize]);

  if (!material || !selectedSize) {
    console.log('FloatingPreview: No material or size - returning null');
    return null;
  }

  console.log('FloatingPreview: Rendering with show =', show);

  const totalPrice = dimensions.width > 0 && dimensions.length > 0 
    ? material.pricePerSqm[selectedSize.id] * dimensions.width * dimensions.length 
    : 0;

  return (
    <>
      <div className={`lg:hidden fixed top-14 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        {/* Header with Toggle Button */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">ข้อมูลวัสดุ</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="p-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            <svg 
              className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${
                isCollapsed ? 'rotate-180' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Content - Collapsible */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isCollapsed ? 'max-h-0' : 'max-h-96'
        }`}>
          <div className="px-4 py-3">
            {/* Material Image - อยู่ด้านบน */}
            <div className="w-full mb-3">
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                   onClick={(e) => {
                     e.stopPropagation();
                     setShowFullImage(true);
                   }}>
                <img 
                  src={material.image || "/materials/placeholder.jpg"} 
                  alt={material.name}
                  className="w-full h-full object-cover"
                />
                {/* ไอคอนขยาย */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center pointer-events-none">
                  <svg className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Material Info - อยู่ด้านล่างรูป */}
            <div className="w-full">
              <h4 className="text-sm font-bold text-slate-800 truncate">{material.name}</h4>
              <p className="text-xs text-slate-500 mb-2">{material.description}</p>
              
              <div className="space-y-1 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {material.type === 'translucent' ? 'โปร่งแสง' : 'ทึบแสง'}
                  </span>
                  <span className="text-xs text-slate-600">{selectedSize.name}</span>
                </div>
                
                {/* เพิ่มคำอธิบายคุณสมบัติ */}
                <div className="text-xs text-slate-600">
                  {material.type === 'translucent' 
                    ? '• ให้แสงธรรมชาติผ่าน ประหยัดค่าไฟ' 
                    : '• กันแสง กันความร้อน เหมาะสำหรับงานโครงสร้าง'
                  }
                </div>
                
                {/* ข้อมูลขนาด */}
                {dimensions.width > 0 && dimensions.length > 0 && (
                  <div className="text-xs text-slate-600">
                    • พื้นที่: {dimensions.width} × {dimensions.length} = {(dimensions.width * dimensions.length).toFixed(2)} ตร.ม.
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-600 font-semibold">
                  ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}/ตร.ม.
                </span>
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
    </>
  );
}
