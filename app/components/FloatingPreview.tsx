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
      {/* Floating Preview with Icon and Text - Smaller size */}
      {show && (
        <div className="lg:hidden fixed bottom-24 right-4 z-50">
          <button
            onClick={() => {
              // ถ้ามีรูปขนาด ให้แสดงรูปขนาดก่อน ถ้าไม่มีให้แสดงรูปวัสดุ
              if (selectedSize?.image) {
                setShowSizeImage(true);
              } else {
                setShowFullImage(true);
              }
            }}
            className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 overflow-hidden"
            style={{
              animation: 'fadeInUp 0.5s ease-out',
            }}
          >
            {/* Icon and Text Content */}
            <div className="flex items-center px-3 py-2 space-x-2">
              <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12z" />
              </svg>
              <div className="text-white">
                <div className="text-xs font-semibold leading-tight truncate max-w-20">
                  {material.name}
                </div>
                {selectedSize && (
                  <div className="text-[10px] text-white/90 leading-tight truncate">
                    ขนาด {selectedSize.name}
                  </div>
                )}
              </div>
            </div>
            
            {/* Badge indicator for multiple images */}
            {selectedSize?.image && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">2</span>
              </div>
            )}
          </button>
          
          {/* CSS Animation */}
          <style jsx>{`
            @keyframes fadeInUp {
              0% {
                opacity: 0;
                transform: translateY(20px) scale(0.9);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
        </div>
      )}

      {/* Modal สำหรับดูรูปเต็มขนาด - Show both images */}
      {(showFullImage || showSizeImage) && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center p-2"
             onClick={() => {
               setShowFullImage(false);
               setShowSizeImage(false);
             }}>
          <div className="relative w-full h-full max-w-lg flex flex-col items-center justify-center space-y-4">
            
            {/* แสดงรูปวัสดุ */}
            {material.image && (
              <div className="w-full max-h-[40vh] flex items-center justify-center">
                <img 
                  src={material.image} 
                  alt={material.name}
                  className="w-full h-auto max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {/* แสดงรูปขนาด */}
            {selectedSize?.image && (
              <div className="w-full max-h-[40vh] flex items-center justify-center">
                <img 
                  src={selectedSize.image} 
                  alt={`ขนาด ${selectedSize.name}`}
                  className="w-full h-auto max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {/* ปุ่มปิด */}
            <button 
              onClick={() => {
                setShowFullImage(false);
                setShowSizeImage(false);
              }}
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
