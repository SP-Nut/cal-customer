import { Material, Size, Service, ExtraService } from '../lib/types';
import { gutterMaterials } from '../lib/materials/gutterMaterials';
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface PriceSummaryProps {
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
  isMobile?: boolean;
  onQuoteRequest?: () => void;
}

export function PriceSummary({
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
  isMobile = false,
  onQuoteRequest
}: PriceSummaryProps) {
  const area = dimensions.width * dimensions.length;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white border-t border-slate-200 ${isMobile ? 'p-1.5' : 'p-2'}`}>
      <div className="space-y-1">
        {/* Header - Always visible with toggle */}
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-slate-50 rounded p-1 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-medium text-slate-700">สรุปราคา</h3>
            <span className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-slate-900`}>
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500">
              {isExpanded ? 'ซ่อน' : 'แสดง'}รายละเอียด
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </div>
        </div>
        
        {/* Collapsible Content */}
        {isExpanded && (
          <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
        
        {/* Area and Base Price */}
        <div className="bg-slate-50 rounded p-1">
          <div className="text-xs text-slate-600 mb-0.5">วัสดุพื้นฐาน</div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-700">{material.name} ({area.toFixed(2)} ตร.ม.)</span>
            <span className="font-medium text-slate-800">
              ฿{(area * material.pricePerSqm[selectedSize.id]).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-xs mt-0.5">
            <span className="text-slate-500 ml-2">• ขนาด {selectedSize.name} - ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}/ตร.ม.</span>
          </div>
        </div>
        
        {/* Services */}
        {selectedServices.length > 0 && (
          <div className="bg-slate-50 rounded p-1">
            <div className="text-xs text-slate-600 mb-0.5">บริการหลัก</div>
            <div className="space-y-0.5">
              {mainServices
                .filter((service) => selectedServices.includes(service.id))
                .map((service) => {
                  let servicePrice = service.price || 0;
                  const selectedOption = selectedServiceOptions[service.id];
                  if (selectedOption && service.options) {
                    const option = service.options.find(opt => opt.id === selectedOption);
                    if (option) {
                      // ถ้าเป็น poles service ให้คูณกับจำนวนเสา
                      if (service.id === 'poles') {
                        servicePrice = option.price * poleCount;
                      } else if (service.pricePerSqm) {
                        // ถ้าบริการคิดราคาตามตารางเมตร ให้คูณกับพื้นที่
                        servicePrice = option.price * area;
                      } else {
                        servicePrice += option.price;
                      }
                    }
                  } else if (service.pricePerSqm && service.price) {
                    // ถ้าไม่มี option แต่บริการคิดตามตารางเมตร
                    servicePrice = service.price * area;
                  }
                  
                  return (
                    <div key={service.id} className="flex justify-between text-xs">
                      <span className="text-slate-700">{service.name}</span>
                      <span className="font-medium text-slate-800">฿{servicePrice.toLocaleString()}</span>
                    </div>
                  );
                })}
              
              {/* แสดงรายละเอียดย่อยของบริการหลัก */}
              {mainServices
                .filter((service) => selectedServices.includes(service.id))
                .map((service) => {
                  const selectedOption = selectedServiceOptions[service.id];
                  let details = [];
                  
                  if (selectedOption && service.options) {
                    const option = service.options.find(opt => opt.id === selectedOption);
                    if (option) {
                      if (service.id === 'poles' && poleCount > 1) {
                        details.push(`• ${option.name} (${poleCount} ต้น)`);
                      } else if (service.pricePerSqm) {
                        details.push(`• ${option.name} (${area.toFixed(2)} ตร.ม.)`);
                      } else if (option.name !== service.name) {
                        details.push(`• ${option.name}`);
                      }
                    }
                  }
                  
                  return details.length > 0 ? (
                    <div key={`${service.id}-details`} className="space-y-0.5">
                      {details.map((detail, index) => (
                        <div key={index} className="ml-2 text-xs text-slate-500">
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  ) : null;
                })}
            </div>
          </div>
        )}
        
        {/* Extra Services */}
        {Object.keys(selectedExtras).some(key => selectedExtras[key]) && (
          <div className="bg-slate-50 rounded p-1">
            <div className="text-xs text-slate-600 mb-0.5">บริการเสริม</div>
            <div className="space-y-0.5">
              {Object.entries(selectedExtras)
                .filter(([_, optionId]) => optionId)
                .map(([serviceId, optionId]) => {
                  const service = extraServices.find((s) => s.id === serviceId);
                  let option = service?.options.find((o) => o.id === optionId);
                  
                  // ถ้าไม่พบ option ในระดับแรก ให้หาใน subOptions
                  if (!option && service) {
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
                  
                  if (!service || !option) return null;
                  
                  // คำนวณราคาตามประเภทบริการ
                  let finalPrice = option.price;
                  if (service.pricePerMeter && pipeLength[serviceId]) {
                    // สำหรับท่อน้ำ: pipeLength เก็บจำนวนจุด, แต่ option.price เป็นราคาต่อเมตร
                    // จึงคูณด้วย 3 (เมตรต่อจุด)
                    finalPrice = option.price * pipeLength[serviceId] * 3;
                  } else if (service.pricePerPoint && electricalPoints[serviceId]) {
                    finalPrice = option.price * electricalPoints[serviceId];
                  } else if (serviceId === 'foundation') {
                    // คำนวณรากฐานยึดตามจำนวนเสา
                    if (optionId.includes('hex-') || optionId === 'footing-only') {
                      const foundationSets = Math.max(2, poleCount);
                      finalPrice = option.price * foundationSets;
                    } else if (optionId.includes('micropile-') || optionId.includes('steel-')) {
                      const pileCount = Math.max(2, poleCount);
                      finalPrice = option.price * pileCount;
                    }
                  }
                  
                  // เพิ่มราคารางน้ำถ้ามี
                  let gutterPrice = 0;
                  if (serviceId === 'gutter' && selectedGutterMaterials[serviceId]) {
                    const selectedGutter = gutterMaterials.find(g => g.id === selectedGutterMaterials[serviceId]);
                    if (selectedGutter) {
                      gutterPrice = selectedGutter.price * dimensions.length;
                    }
                  }
                  
                  const totalServicePrice = finalPrice + gutterPrice;
                  
                  return (
                    <div key={serviceId} className="space-y-0.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700">{service.name}</span>
                        <span className="font-medium text-slate-800">
                          ฿{totalServicePrice.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* แสดงรายละเอียดแบบมาตรฐาน */}
                      <div className="ml-2 text-xs text-slate-500 space-y-0.5">
                        {/* รายละเอียดท่อน้ำ */}
                        {serviceId === 'pipe' && service.pricePerMeter && pipeLength[serviceId] && (
                          <div className="flex justify-between">
                            <span>• {option.name} ({pipeLength[serviceId]} จุด = {pipeLength[serviceId] * 3} ม.)</span>
                            <span>฿{(option.price * pipeLength[serviceId] * 3).toLocaleString()}</span>
                          </div>
                        )}
                        
                        {/* รายละเอียดงานไฟฟ้า */}
                        {serviceId === 'electrical' && service.pricePerPoint && electricalPoints[serviceId] && (
                          <div className="flex justify-between">
                            <span>• {option.name} ({electricalPoints[serviceId]} จุด)</span>
                            <span>฿{(option.price * electricalPoints[serviceId]).toLocaleString()}</span>
                          </div>
                        )}
                        
                        {/* รายละเอียดรางน้ำ */}
                        {serviceId === 'gutter' && selectedGutterMaterials[serviceId] && (() => {
                          const selectedGutter = gutterMaterials.find(g => g.id === selectedGutterMaterials[serviceId]);
                          if (!selectedGutter) return null;
                          const gutterTotalPrice = selectedGutter.price * dimensions.length;
                          return (
                            <div className="flex justify-between">
                              <span>• {selectedGutter.name} ({dimensions.length} ม.)</span>
                              <span>฿{gutterTotalPrice.toLocaleString()}</span>
                            </div>
                          );
                        })()}
                        
                        {/* รายละเอียดงานรากฐาน */}
                        {serviceId === 'foundation' && (
                          <>
                            <div className="flex justify-between">
                              {optionId.includes('hex-') || optionId === 'footing-only' ? (
                                <span>• {option.name} ({Math.max(2, poleCount)} ชุด)</span>
                              ) : (
                                <span>• {option.name} ({Math.max(2, poleCount)} ต้น)</span>
                              )}
                              <span>฿{finalPrice.toLocaleString()}</span>
                            </div>
                            <div className="text-xs text-slate-400 leading-tight">
                              {option.description}
                            </div>
                            {optionId.includes('steel-') && (
                              <div className="text-xs text-slate-400">
                                รวมค่าเจาะปูน 500 บาท/ต้น
                              </div>
                            )}
                          </>
                        )}
                        
                        {/* รายละเอียดบริการทั่วไป */}
                        {serviceId !== 'pipe' && serviceId !== 'electrical' && serviceId !== 'gutter' && serviceId !== 'foundation' && (
                          <div className="flex justify-between">
                            <span>• {option.name}</span>
                            <span>฿{option.price.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        </div>
        )}
        
        {/* Total - Always visible */}
        <div className="border-t border-slate-200 pt-1">          
          {/* Quote Request Button */}
          <div className="mt-1">
            <button
              onClick={onQuoteRequest}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-lg"
            >
              ขอใบเสนอราคา
            </button>
            <p className="text-sm text-gray-500 text-center mt-2">
              ส่งข้อมูลเพื่อขอใบเสนอราคา
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              ✓ ราคาอ้างอิงเท่านั้น ✓ ตรวจสอบและแจ้งราคาจริงภายใน 24 ชม. ✓ ปรับปรุงตามงานจริง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
