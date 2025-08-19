import { Material, Size, Service, ExtraService } from '../lib/types';
import { gutterMaterials } from '../lib/materials/gutterMaterials';

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

  // Debug log for selectedExtras
  console.log('PriceSummary - selectedExtras:', selectedExtras);
  console.log('PriceSummary - extraServices:', extraServices);
  console.log('PriceSummary - filtered extras:', Object.entries(selectedExtras).filter(([_, optionId]) => optionId));
  console.log('PriceSummary - electricalPoints:', electricalPoints);
  console.log('PriceSummary - pipeLength:', pipeLength);

  return (
    <div className={`bg-white border-t border-slate-200 ${isMobile ? 'p-1.5' : 'p-2'}`}>
      <div className="space-y-1">
        {/* Header */}
        <div className="flex items-center gap-1.5">
          <h3 className={`${isMobile ? 'text-sm' : 'text-sm'} font-medium text-slate-700`}>สรุปราคา</h3>
        </div>
        
        {/* Area and Base Price */}
        <div className="bg-slate-50 rounded p-1">
          <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-slate-600 mb-0.5`}>วัสดุพื้นฐาน</div>
          <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-xs'}`}>
            <span className="text-slate-600">{area.toFixed(2)} ตร.ม. × ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}</span>
            <span className="font-medium text-slate-800">
              ฿{(area * material.pricePerSqm[selectedSize.id]).toLocaleString()}
            </span>
          </div>
        </div>
        
        {/* Services */}
        {selectedServices.length > 0 && (
          <div className="bg-slate-50 rounded p-1">
            <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-slate-600 mb-0.5`}>บริการหลัก</div>
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
                    <div key={service.id} className={`flex justify-between ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      <span className="text-slate-700">
                        {service.name}
                        {service.id === 'poles' && poleCount > 1 && (
                          <span className="text-slate-500 text-xs ml-1">
                            ({poleCount} ต้น)
                          </span>
                        )}
                        {service.pricePerSqm && selectedOption && service.options && (
                          <span className="text-slate-500 text-xs ml-1">
                            ({service.options.find(opt => opt.id === selectedOption)?.name})
                          </span>
                        )}
                      </span>
                      <span className="font-medium text-slate-800">฿{servicePrice.toLocaleString()}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {/* Extra Services */}
        {(() => {
          const hasExtras = Object.keys(selectedExtras).some(key => selectedExtras[key]);
          const hasGutterMaterials = Object.keys(selectedGutterMaterials).some(key => selectedGutterMaterials[key]);
          console.log('Has extras check:', hasExtras, selectedExtras);
          console.log('Has gutter materials check:', hasGutterMaterials, selectedGutterMaterials);
          console.log('All selected gutter materials:', selectedGutterMaterials);
          return hasExtras || hasGutterMaterials;
        })() && (
          <div className="bg-slate-50 rounded p-1">
            <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-slate-600 mb-0.5`}>บริการเสริม</div>
            <div className="space-y-0.5">
              {Object.entries(selectedExtras)
                .filter(([_, optionId]) => {
                  console.log('Filtering extra service:', _, optionId);
                  return optionId;
                })
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
                  
                  console.log('Rendering extra service:', serviceId, service?.name, option?.name, option?.price);
                  if (!service || !option) return null;
                  
                  // คำนวณราคาตามประเภทบริการ
                  let finalPrice = option.price;
                  if (service.pricePerMeter && pipeLength[serviceId]) {
                    finalPrice = option.price * pipeLength[serviceId];
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
                      <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-xs'}`}>
                        <span className="text-slate-700">+ {service.name}</span>
                        <span className="font-medium text-slate-800">
                          ฿{totalServicePrice.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* แสดงรายละเอียดท่อน้ำเมื่อเป็นบริการท่อน้ำ */}
                      {serviceId === 'pipe' && service.pricePerMeter && pipeLength[serviceId] && (
                        <div className={`ml-2 ${isMobile ? 'text-xs' : 'text-xs'} text-slate-500`}>
                          <div className="flex justify-between">
                            <span>• {option.name} ({pipeLength[serviceId]} ม.)</span>
                            <span>฿{(option.price * pipeLength[serviceId]).toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* แสดงรายละเอียดงานไฟฟ้าเมื่อเป็นบริการไฟฟ้า */}
                      {serviceId === 'electrical' && service.pricePerPoint && electricalPoints[serviceId] && (
                        <div className={`ml-2 ${isMobile ? 'text-xs' : 'text-xs'} text-slate-500`}>
                          <div className="flex justify-between">
                            <span>• {option.name} ({electricalPoints[serviceId]} จุด)</span>
                            <span>฿{(option.price * electricalPoints[serviceId]).toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* แสดงวัสดุรางน้ำเมื่อเลือกบริการรางน้ำ */}
                      {serviceId === 'gutter' && selectedGutterMaterials[serviceId] && (
                        <div className={`ml-2 ${isMobile ? 'text-xs' : 'text-xs'} text-slate-500`}>
                          {(() => {
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
                        </div>
                      )}
                      
                      {/* แสดงรายละเอียดงานรากฐานเมื่อเป็นบริการรากฐาน */}
                      {serviceId === 'foundation' && (
                        <div className={`ml-2 ${isMobile ? 'text-xs' : 'text-xs'} text-slate-500`}>
                          <div className="flex justify-between">
                            {optionId.includes('hex-') || optionId === 'footing-only' ? (
                              <span>• {option.name} ({Math.max(2, poleCount)} ชุด ยึดตามเสา {poleCount} ต้น)</span>
                            ) : (
                              <span>• {option.name} ({Math.max(2, poleCount)} ต้น ยึดตามเสา {poleCount} ต้น)</span>
                            )}
                            <span>฿{finalPrice.toLocaleString()}</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 leading-tight">
                            {option.description}
                          </div>
                          {optionId.includes('steel-') && (
                            <div className="text-xs text-slate-400 mt-0.5">
                              รวมค่าเจาะปูน 500 บาท/ต้น
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* แสดงรายละเอียดบริการทั่วไป (ไม่ใช่ท่อน้ำ ไฟฟ้า รางน้ำ หรือรากฐาน) */}
                      {serviceId !== 'pipe' && serviceId !== 'electrical' && serviceId !== 'gutter' && serviceId !== 'foundation' && (
                        <div className={`ml-2 ${isMobile ? 'text-xs' : 'text-xs'} text-slate-500`}>
                          <div className="flex justify-between">
                            <span>• {option.name}</span>
                            <span>฿{option.price.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              
              {/* แสดงรางน้ำที่เลือกแยกต่างหาก (กรณีไม่ได้เลือกผ่าน selectedExtras) */}
              {Object.entries(selectedGutterMaterials)
                .filter(([serviceId, materialId]) => materialId && serviceId === 'gutter')
                .map(([serviceId, materialId]) => {
                  const selectedGutter = gutterMaterials.find(g => g.id === materialId);
                  if (!selectedGutter) return null;
                  const gutterTotalPrice = selectedGutter.price * dimensions.length;
                  
                  return (
                    <div key={`gutter-${serviceId}`} className="space-y-0.5">
                      <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-xs'}`}>
                        <span className="text-slate-700">+ งานรางน้ำ</span>
                        <span className="font-medium text-slate-800">฿0</span>
                      </div>
                      <div className={`ml-2 ${isMobile ? 'text-xs' : 'text-xs'} text-slate-500`}>
                        <div className="flex justify-between">
                          <span>• {selectedGutter.name} ({dimensions.length} ม.)</span>
                          <span>฿{gutterTotalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {/* Total */}
        <div className="border-t border-slate-200 pt-1">
          <div className="flex justify-between items-center">
            <span className={`${isMobile ? 'text-sm' : 'text-sm'} font-medium text-slate-800`}>ราคารวม</span>
            <span className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-slate-900`}>
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
          
          {/* Quote Request Button */}
          <div className="mt-1">
            <button
              onClick={onQuoteRequest}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-lg"
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
