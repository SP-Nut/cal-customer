'use client';

import { useState } from 'react';
import { Material, Size, Service, ExtraService } from '../lib/types';
import { gutterMaterials } from '../lib/materials/gutterMaterials';
import { X, Info, User, FileText, Phone, MessageCircle, Zap } from 'lucide-react';

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
  installationType?: string | null;
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
  poleCount = 1,
  installationType = null
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
  const [showDetails, setShowDetails] = useState(false);

  const area = dimensions.width * dimensions.length;

  // ฟังก์ชันแปลงชื่อประเภทการติดตั้ง
  const getInstallationTypeText = (type: string | null) => {
    if (!type) return 'ไม่ระบุ';
    
    const typeMapping: Record<string, string> = {
      'with-column': 'แบบมีเสา',
      'no-column': 'แบบไร้เสา',
      'single-support': 'แบบไร้เสา - ขาค้ำเดี่ยว',
      'beam-support': 'แบบไร้เสา - ขาค้ำระแนง',
      'tension-arm': 'แบบไร้เสา - แขนดึง',
      'flat-bar': 'แบบไร้เสา - แฟลตบาร์'
    };
    
    return typeMapping[type] || type;
  };

  // ฟังก์ชันสร้างรายละเอียดบริการ
  const getServiceDetails = () => {
    const details: Array<{
      category: string;
      name: string;
      description: string;
      price: number;
    }> = [];

    // แสดงข้อมูลการติดตั้ง
    if (installationType) {
      if (installationType === 'with-column') {
        // แบบมีเสา - แสดงข้อมูลงานเสา
        const poleService = mainServices.find(s => s.id === 'poles');
        if (poleService && selectedServices.includes('poles')) {
          const selectedOption = selectedServiceOptions['poles'];
          if (selectedOption && poleService.options) {
            const option = poleService.options.find(opt => opt.id === selectedOption);
            if (option) {
              const price = option.price * poleCount;
              const description = `${option.name} (${poleCount} ต้น)`;
              
              details.push({
                category: 'การติดตั้ง',
                name: 'งานเสา',
                description,
                price
              });
            }
          }
        }
      } else if (installationType.startsWith('no-column') || ['single-support', 'beam-support', 'tension-arm', 'flat-bar'].includes(installationType)) {
        // แบบไร้เสา - แสดงประเภทการติดตั้ง
        details.push({
          category: 'การติดตั้ง',
          name: getInstallationTypeText(installationType),
          description: 'งานติดตั้งแบบไร้เสา',
          price: 0
        });
      }
    }

    // บริการหลักอื่นๆ (ไม่รวมงานเสา เพราะแสดงในส่วนการติดตั้งแล้ว)
    mainServices
      .filter(service => selectedServices.includes(service.id) && service.id !== 'poles')
      .forEach(service => {
        const selectedOption = selectedServiceOptions[service.id];
        if (selectedOption && service.options) {
          const option = service.options.find(opt => opt.id === selectedOption);
          if (option) {
            let price = option.price;
            let description = option.name;
            
            if (service.pricePerSqm) {
              price = option.price * area;
              description = `${option.name} (${area.toFixed(2)} ตร.ม.)`;
            }
            
            details.push({
              category: 'บริการหลัก',
              name: service.name,
              description,
              price
            });
          }
        }
      });

    // บริการเสริม
    extraServices
      .filter(service => selectedExtras[service.id])
      .forEach(service => {
        const optionId = selectedExtras[service.id];
        
        // รางน้ำ
        if (service.id === 'gutter' && selectedGutterMaterials['gutter']) {
          const selectedGutter = gutterMaterials.find(g => g.id === selectedGutterMaterials['gutter']);
          if (selectedGutter) {
            details.push({
              category: 'บริการเสริม',
              name: service.name,
              description: `${selectedGutter.name} (${dimensions.length} ม.)`,
              price: selectedGutter.price * dimensions.length
            });
          }
        } else {
          // บริการเสริมอื่นๆ
          let option = service.options?.find(o => o.id === optionId);
          
          if (!option && service.options) {
            for (const mainOption of service.options) {
              if (mainOption.subOptions) {
                const subOption = mainOption.subOptions.find(sub => sub.id === optionId);
                if (subOption) {
                  option = subOption;
                  break;
                }
              }
            }
          }
          
          if (option) {
            let price = option.price;
            let description = option.name;
            
            if (service.pricePerMeter && pipeLength[service.id]) {
              price = option.price * pipeLength[service.id] * 3;
              description = `${option.name} (${pipeLength[service.id]} จุด = ${pipeLength[service.id] * 3} ม.)`;
            } else if (service.pricePerPoint && electricalPoints[service.id]) {
              price = option.price * electricalPoints[service.id];
              description = `${option.name} (${electricalPoints[service.id]} จุด)`;
            } else if (service.id === 'foundation') {
              if (optionId.includes('hex-') || optionId === 'footing-only') {
                const foundationSets = Math.max(2, poleCount);
                price = option.price * foundationSets;
                description = `${option.name} (${foundationSets} ชุด)`;
              } else if (optionId.includes('micropile-') || optionId.includes('steel-')) {
                const pileCount = Math.max(2, poleCount);
                price = option.price * pileCount;
                description = `${option.name} (${pileCount} ต้น)`;
              }
            }
            
            details.push({
              category: 'บริการเสริม',
              name: service.name,
              description,
              price
            });
          }
        }
      });

    return details;
  };

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
          poleCount,
          installationType
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

  const serviceDetails = getServiceDetails();

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
      />
      
      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 overflow-hidden relative transform transition-all duration-300 max-h-[90vh] flex flex-col">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-700/90"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">📋 ขอใบเสนอราคา</h2>
                <p className="text-blue-100 text-base">ส่งข้อมูลเพื่อรับใบเสนอราคาที่แม่นยำภายใน 24 ชั่วโมง</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 ml-4 flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">ส่งคำขอสำเร็จ!</h3>
                <p className="text-gray-600 mb-4">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    📞 เบอร์ติดต่อ: {formData.phone}<br/>
                    👤 ชื่อ: {formData.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          {!submitSuccess && (
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                
                {/* Left Column - Form */}
                <div className="p-6 border-r border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">ข้อมูลการติดต่อ</h3>
                      <p className="text-sm text-gray-600">กรุณากรอกข้อมูลเพื่อให้ทีมงานติดต่อกลับ</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <User className="w-4 h-4" />
                        ชื่อ-นามสกุล <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="กรุณาใส่ชื่อ-นามสกุล"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <Zap className="w-4 h-4" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <Phone className="w-4 h-4" />
                        เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="08X-XXX-XXXX"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <Zap className="w-4 h-4" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Line ID */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <MessageCircle className="w-4 h-4" />
                        Line ID <span className="text-gray-400 text-xs">(ไม่บังคับ)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.lineId}
                        onChange={(e) => setFormData(prev => ({ ...prev, lineId: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200"
                        placeholder="Line ID ของคุณ (เช่น @sp-kansard)"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <FileText className="w-4 h-4" />
                        หมายเหตุเพิ่มเติม <span className="text-gray-400 text-xs">(ไม่บังคับ)</span>
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 resize-none"
                        placeholder="เวลาที่สะดวกติดต่อ หรือความต้องการพิเศษ..."
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="p-6 bg-gray-50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">สรุปรายการ</h3>
                      <p className="text-sm text-gray-600">ตรวจสอบข้อมูลก่อนส่งคำขอ</p>
                    </div>
                  </div>

                  {/* Quick Summary */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">ประเภทการติดตั้ง</span>
                        <p className="font-semibold text-gray-800">{getInstallationTypeText(installationType)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">วัสดุ</span>
                        <p className="font-semibold text-gray-800">{material.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">ขนาด</span>
                        <p className="font-semibold text-gray-800">{selectedSize.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">พื้นที่</span>
                        <p className="font-semibold text-gray-800">{area.toFixed(2)} ตร.ม.</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-800">ราคาอ้างอิง</span>
                        <span className="text-2xl font-bold text-gray-800">฿{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Details Toggle */}
                  <div className="mb-6">
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center justify-between w-full p-4 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    >
                      <span className="font-semibold text-gray-800">รายละเอียดบริการ ({serviceDetails.length} รายการ)</span>
                      <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showDetails && (
                      <div className="mt-3 bg-white rounded-xl border border-gray-200 max-h-64 overflow-y-auto">
                        {serviceDetails.map((detail, index) => (
                          <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{detail.category}</span>
                                <p className="font-semibold text-gray-800 mt-1">{detail.name}</p>
                                <p className="text-sm text-gray-600">{detail.description}</p>
                              </div>
                              <span className="font-bold text-gray-800 ml-4">฿{detail.price.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold mb-2">ขั้นตอนต่อไป:</p>
                        <ul className="space-y-1">
                          <li>✅ ทีมงานติดต่อเพื่อนัดสำรวจพื้นที่</li>
                          <li>✅ วัดและประเมินสภาพพื้นที่จริง</li>
                          <li>✅ ส่งใบเสนอราคาที่แม่นยำ</li>
                          <li>✅ นัดหมายวันติดตั้งที่สะดวก</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    *ราคาอาจปรับเปลี่ยนตามการสำรวจพื้นที่และสภาพงานจริง
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          {!submitSuccess && (
            <div className="border-t border-gray-200 p-6 bg-white">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-gray-800 hover:bg-gray-900 text-white transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      กำลังส่งคำขอ...
                    </span>
                  ) : (
                    '🚀 ส่งคำขอใบเสนอราคา'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
