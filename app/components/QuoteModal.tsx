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
  poleCount?: number;
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
  electricalPoints = {},
  poleCount = 1
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

  const handleSubmit = async () => {
    // Validation
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'กรุณากรอกชื่อ-นามสกุล';
    if (!formData.phone.trim()) newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          material,
          selectedSize,
          dimensions,
          totalPrice,
          selectedServices,
          selectedExtras,
          mainServices,
          extraServices,
          selectedServiceOptions,
          gutterMaterials: selectedGutterMaterials,
          pipeLength,
          electricalPoints,
          poleCount
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
          setFormData({ name: '', phone: '', lineId: '', notes: '' });
        }, 2000);
      } else {
        // Log detailed error information
        console.error('API Error Details:', result);
        throw new Error(result.error || 'เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.error('Error sending quote request:', error);
      console.error('Full error object:', error);
      
      // Show more detailed error message if available
      let errorMessage = 'เกิดข้อผิดพลาดในการส่งคำขอ กรุณาลองใหม่อีกครั้ง';
      
      if (error instanceof Error) {
        errorMessage = `เกิดข้อผิดพลาด: ${error.message}`;
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300"
      />
      
      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden relative flex flex-col transform transition-all duration-300">
          
          {/* Header - Simplified */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">ขอใบเสนอราคา</h2>
              <p className="text-blue-100 text-sm">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content - Simplified */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column - Form */}
              <div className="space-y-4">
                {/* Success Message */}
                {submitSuccess && (
                  <div className="md:col-span-2 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="text-green-600 text-2xl mb-2">✓</div>
                    <p className="text-green-800 font-medium">ส่งคำขอสำเร็จแล้ว!</p>
                    <p className="text-green-600 text-sm">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
                  </div>
                )}

                {/* Form Fields */}
                {!submitSuccess && (
                  <>
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ชื่อ-นามสกุล <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="กรุณาใส่ชื่อ-นามสกุล"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <span className="mr-1">⚠</span> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="08X-XXX-XXXX"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <span className="mr-1">⚠</span> {errors.phone}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - Additional Info */}
              {!submitSuccess && (
                <div className="space-y-4">
                  {/* Line ID - Optional */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Line ID (ไม่บังคับ)
                    </label>
                    <input
                      type="text"
                      value={formData.lineId}
                      onChange={(e) => setFormData(prev => ({ ...prev, lineId: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Line ID ของคุณ"
                    />
                  </div>

                  {/* Notes - Optional */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      หมายเหตุเพิ่มเติม (ไม่บังคับ)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                      placeholder="เวลาที่สะดวกติดต่อ หรือความต้องการพิเศษ"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Info Box & Buttons - Full Width */}
            {!submitSuccess && (
              <div className="mt-6 space-y-4">
                {/* Info Box - Simplified */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">หลังจากส่งข้อมูลแล้ว</p>
                      <p>ทีมงาน SP จะติดต่อเพื่อนัดวันสำรวจพื้นที่ พร้อมส่งใบเสนอราคาที่แม่นยำ</p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                      isSubmitting 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        กำลังส่ง...
                      </span>
                    ) : (
                      'ส่งคำขอใบเสนอราคา'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="py-3 px-6 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
