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
            <div className="space-y-1">
              {mainServices
                .filter((service) => selectedServices.includes(service.id))
                .map((service) => {
                  let servicePrice = service.price || 0;
                  const selectedOption = selectedServiceOptions[service.id];
                  let optionDetails = '';
                  
                  if (selectedOption && service.options) {
                    const option = service.options.find(opt => opt.id === selectedOption);
                    if (option) {
                      // คำนวณราคา
                      if (service.id === 'poles') {
                        servicePrice = option.price * poleCount;
                        optionDetails = `${option.name} (${poleCount} ต้น)`;
                      } else if (service.pricePerSqm) {
                        servicePrice = option.price * area;
                        optionDetails = service.id === 'steel-painting' 
                          ? `${option.name} (${area.toFixed(2)} ตร.ม. - สีพิเศษคิดเป็นตารางเมตร)`
                          : `${option.name} (${area.toFixed(2)} ตร.ม.)`;
                      } else {
                        servicePrice += option.price;
                        optionDetails = option.name;
                      }
                    }
                  } else if (service.pricePerSqm && service.price) {
                    servicePrice = service.price * area;
                    optionDetails = `(${area.toFixed(2)} ตร.ม.)`;
                  }
                  
                  return (
                    <div key={service.id} className="space-y-0.5">
                      {/* หัวข้อบริการ */}
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">{service.name}</span>
                        <span className="font-medium text-slate-800">฿{servicePrice.toLocaleString()}</span>
                      </div>
                      {/* คำอธิบายที่เลือก */}
                      {optionDetails && (
                        <div className="ml-2 text-xs text-slate-500">
                          • {optionDetails}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {/* Extra Services */}
        {Object.keys(selectedExtras).some(key => selectedExtras[key]) && (
          <div className="bg-slate-50 rounded p-1">
            <div className="text-xs text-slate-600 mb-0.5">บริการเสริม</div>
            <div className="space-y-1">
              {extraServices
                .filter((service) => selectedExtras[service.id])
                .map((service) => {
                  const serviceId = service.id;
                  const optionId = selectedExtras[serviceId];
                  
                  // จัดการรางน้ำพิเศษ
                  if (serviceId === 'gutter' && selectedGutterMaterials['gutter']) {
                    const selectedGutter = gutterMaterials.find(g => g.id === selectedGutterMaterials['gutter']);
                    
                    if (selectedGutter) {
                      const gutterPrice = selectedGutter.price * dimensions.length;
                      const gutterDetails = `${selectedGutter.name} (${dimensions.length} ม.)`;
                      
                      return (
                        <div key="gutter" className="space-y-0.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-700 font-medium">{service.name}</span>
                            <span className="font-medium text-slate-800">
                              ฿{gutterPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="ml-2 text-xs text-slate-500">
                            • {gutterDetails}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }
                  
                  // จัดการบริการเสริมอื่นๆ
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
                  
                  if (!option) return null;
                  
                  // คำนวณราคาและรายละเอียด
                  let finalPrice = option.price;
                  let optionDetails = '';
                  
                  if (service.pricePerMeter && pipeLength[serviceId]) {
                    // ท่อน้ำ: pipeLength เก็บจำนวนจุด
                    finalPrice = option.price * pipeLength[serviceId] * 3;
                    optionDetails = `${option.name} (${pipeLength[serviceId]} จุด = ${pipeLength[serviceId] * 3} ม.)`;
                  } else if (service.pricePerPoint && electricalPoints[serviceId]) {
                    // งานไฟฟ้า
                    finalPrice = option.price * electricalPoints[serviceId];
                    optionDetails = `${option.name} (${electricalPoints[serviceId]} จุด)`;
                  } else if (serviceId === 'foundation') {
                    // งานรากฐาน
                    if (optionId.includes('hex-') || optionId === 'footing-only') {
                      const foundationSets = Math.max(2, poleCount);
                      finalPrice = option.price * foundationSets;
                      optionDetails = `${option.name} (${foundationSets} ชุด)`;
                    } else if (optionId.includes('micropile-') || optionId.includes('steel-')) {
                      const pileCount = Math.max(2, poleCount);
                      finalPrice = option.price * pileCount;
                      optionDetails = `${option.name} (${pileCount} ต้น)`;
                    } else {
                      optionDetails = option.name;
                    }
                  } else if (service.pricePerSqm && dimensions.width > 0 && dimensions.length > 0) {
                    // บริการที่คิดตามตารางเมตร เช่น สีโครงสร้าง
                    const area = dimensions.width * dimensions.length;
                    finalPrice = option.price * area;
                    optionDetails = service.id === 'steel-painting' 
                      ? `${option.name} (${area.toFixed(2)} ตร.ม. - สีพิเศษคิดเป็นตารางเมตร)`
                      : `${option.name} (${area.toFixed(2)} ตร.ม.)`;
                  } else {
                    // บริการทั่วไป
                    optionDetails = option.name;
                  }
                  
                  return (
                    <div key={serviceId} className="space-y-0.5">
                      {/* หัวข้อบริการ */}
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">{service.name}</span>
                        <span className="font-medium text-slate-800">
                          ฿{finalPrice.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* คำอธิบายที่เลือก */}
                      <div className="ml-2 text-xs text-slate-500">
                        {optionDetails && <div>• {optionDetails}</div>}
                        {option.description && serviceId === 'foundation' && (
                          <div className="text-xs text-slate-400 leading-tight mt-0.5">
                            {option.description}
                          </div>
                        )}
                        {optionId.includes('steel-') && (
                          <div className="text-xs text-slate-400">
                            รวมค่าเจาะปูน 500 บาท/ต้น
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }).filter(Boolean)}
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
