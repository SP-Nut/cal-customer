'use client';

import React, { useState, useEffect } from 'react';
import { Material, Size } from '../lib/types';
import { Image as ImageIcon, X } from 'lucide-react';

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
  const [showTooltip, setShowTooltip] = useState(false);

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
      // แสดง tooltip เมื่อปรากฏ
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000); // หายไปหลัง 4 วิ
      // ถ้ากำลังกรอกข้อมูล ให้พับ preview ลง
      if (isInputFocused) {
        setIsCollapsed(true);
      }
    } else {
      console.log('FloatingPreview: Setting show to FALSE');
      setShow(false);
      setShowTooltip(false);
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
        <div className="lg:hidden fixed top-[55%] transform -translate-y-1/2 right-0 z-50">
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-pulse">
              แตะเพื่อดูรูปวัสดุ
            </div>
          )}
          
          <button
            aria-label="ดูรูปตัวอย่าง"
            onClick={() => {
              // ถ้ามีรูปขนาด ให้แสดงรูปขนาดก่อน ถ้าไม่มีให้แสดงรูปวัสดุ
              if (selectedSize?.image) {
                setShowSizeImage(true);
              } else {
                setShowFullImage(true);
              }
            }}
            className="relative group w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-l-lg lg:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            style={{
              animation: 'fadeInUp 0.5s ease-out',
            }}
          >
            {/* Icon Content */}
            <div className="flex items-center justify-center w-full h-full">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            
            {/* Badge indicator for multiple images */}
            {selectedSize?.image && (
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center border border-white shadow-lg z-10">
                <span className="text-[7px] font-bold text-white">2</span>
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
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
            .animate-pulse {
              animation: pulse 1.5s ease-in-out infinite;
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
              aria-label="ปิดรูปตัวอย่าง"
              onClick={() => {
                setShowFullImage(false);
                setShowSizeImage(false);
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
