'use client';

import { useState } from 'react';
import { Material, Size, Service, ExtraService } from '../lib/types';
import { X, Info, User } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  lineId: string;
  notes: string;
}

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: Material;
  selectedSize: Size;
  dimensions: { width: number; length: number };
  totalPrice: number;
  selectedServices: string[];
  selectedExtras: Record<string, string>;
  mainServices: Service[];
  extraServices: ExtraService[];
  selectedServiceOptions: Record<string, string>;
  gutterMaterials?: Record<string, string>;
  pipeLength?: Record<string, number>;
  electricalPoints?: Record<string, number>;
}

export function QuoteRequestModal({
  isOpen,
  onClose,
  material,
  selectedSize,
  dimensions,
  totalPrice,
  selectedServices,
  selectedExtras,
  mainServices,
  extraServices,
  selectedServiceOptions,
  gutterMaterials: selectedGutterMaterials = {},
  pipeLength = {},
  electricalPoints = {}
}: QuoteRequestModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    lineId: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const area = dimensions.width * dimensions.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md transition-all duration-300"
      />
      
      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-1 sm:p-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-lg sm:rounded-2xl shadow-2xl border border-white/20 w-full max-w-sm sm:max-w-2xl mx-2 sm:mx-4 overflow-hidden relative flex flex-col transform transition-all duration-300 hover:shadow-3xl"
             style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)' }}>
          {/* Header - Compact */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white p-3 sm:p-5 flex-shrink-0 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h2 className="text-base sm:text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-sm">ขอใบเสนอราคา</h2>
                <p className="text-blue-100/90 text-xs sm:text-base font-medium drop-shadow-sm">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
              </div>
              <button
                onClick={onClose}
                aria-label="ปิดแบบฟอร์ม"
                className="text-white/90 hover:text-white hover:bg-white/20 rounded-full p-2 sm:p-2.5 transition-all duration-200 flex-shrink-0 backdrop-blur-sm border border-white/20 hover:border-white/30"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Content - Full height */}
          <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-50/50 to-white">
            <div className="p-3 sm:p-6">
              {/* Contact Form - Center and Full Width */}
              <div className="w-full space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 sm:mb-3 text-center flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-10 sm:h-10 mr-2 sm:mr-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                    </div>
                    ข้อมูลการติดต่อ
                  </h3>
                  
                  {/* Info Box */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-5 mb-3 sm:mb-5 border border-blue-100/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/20 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="flex items-start space-x-2 sm:space-x-3 relative z-10">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Info className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="text-xs sm:text-sm text-blue-900">
                        <p className="font-semibold mb-1 sm:mb-1.5 text-sm sm:text-base">หลังจากส่งข้อมูลแล้ว</p>
                        <p className="leading-relaxed">ทีมงานจะติดต่อกลับเพื่อสำรวจพื้นที่และให้ใบเสนอราคาที่แม่นยำภายใน 24 ชั่วโมง</p>
                      </div>
                    </div>
                  </div>
                  
                  <form className="space-y-3 sm:space-y-4">
                    {/* Name */}
                    <div className="group">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 group-focus-within:text-blue-600 transition-colors">
                        ชื่อ-นามสกุล <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-xs sm:text-sm bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md"
                        placeholder="กรุณาระบุชื่อ-นามสกุล"
                      />
                    </div>

                    {/* Phone */}
                    <div className="group">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 group-focus-within:text-blue-600 transition-colors">
                        เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-xs sm:text-sm bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md"
                        placeholder="08X-XXX-XXXX"
                      />
                    </div>

                    {/* Line ID */}
                    <div className="group">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 group-focus-within:text-blue-600 transition-colors">
                        Line ID
                      </label>
                      <input
                        type="text"
                        value={formData.lineId}
                        onChange={(e) => setFormData(prev => ({ ...prev, lineId: e.target.value }))}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-xs sm:text-sm bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md"
                        placeholder="Line ID (ถ้ามี)"
                      />
                    </div>

                    {/* Notes */}
                    <div className="group">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 group-focus-within:text-blue-600 transition-colors">
                        หมายเหตุเพิ่มเติม
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        rows={2}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none text-xs sm:text-sm bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md"
                        placeholder="เวลาที่สะดวกติดต่อ หรือความต้องการพิเศษ"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1 sm:pt-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10">ส่งคำขอใบเสนอราคา</span>
                      </button>
                      <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 font-medium">
                        กดส่งเพื่อให้ทีมงานติดต่อกลับภายใน 24 ชั่วโมง
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
