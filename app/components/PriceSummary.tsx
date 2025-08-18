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
          <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-slate-700`}>สรุปราคา</h3>
        </div>
        
        {/* Area and Base Price */}
        <div className="bg-slate-50 rounded p-1">
          <div className={`${isMobile ? 'text-sm' : 'text-base'} text-slate-600 mb-0.5`}>วัสดุพื้นฐาน</div>
          <div className={`flex justify-between ${isMobile ? 'text-sm' : 'text-base'}`}>
            <span className="text-slate-600">{area.toFixed(2)} ตร.ม. × ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}</span>
            <span className="font-medium text-slate-800">
              ฿{(area * material.pricePerSqm[selectedSize.id]).toLocaleString()}
            </span>
          </div>
        </div>
        
        {/* Services */}
        {selectedServices.length > 0 && (
          <div className="bg-slate-50 rounded p-1">
            <div className={`${isMobile ? 'text-sm' : 'text-base'} text-slate-600 mb-0.5`}>บริการหลัก</div>
            <div className="space-y-0.5">
              {mainServices
                .filter((service) => selectedServices.includes(service.id))
                .map((service) => {
                  let servicePrice = service.price || 0;
                  const selectedOption = selectedServiceOptions[service.id];
                  if (selectedOption && service.options) {
                    const option = service.options.find(opt => opt.id === selectedOption);
                    if (option) {
                      // ถ้าบริการคิดราคาตามตารางเมตร ให้คูณกับพื้นที่
                      if (service.pricePerSqm) {
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
                    <div key={service.id} className={`flex justify-between ${isMobile ? 'text-sm' : 'text-base'}`}>
                      <span className="text-slate-700">
                        {service.name}
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
          return hasExtras || hasGutterMaterials;
        })() && (
          <div className="bg-slate-50 rounded p-1">
            <div className={`${isMobile ? 'text-sm' : 'text-base'} text-slate-600 mb-0.5`}>บริการเสริม</div>
            <div className="space-y-0.5">
              {Object.entries(selectedExtras)
                .filter(([_, optionId]) => {
                  console.log('Filtering extra service:', _, optionId);
                  return optionId;
                })
                .map(([serviceId, optionId]) => {
                  const service = extraServices.find((s) => s.id === serviceId);
                  const option = service?.options.find((o) => o.id === optionId);
                  console.log('Rendering extra service:', serviceId, service?.name, option?.name, option?.price);
                  if (!service || !option) return null;
                  
                  // คำนวณราคาตามประเภทบริการ
                  let finalPrice = option.price;
                  if (service.pricePerMeter && pipeLength[serviceId]) {
                    finalPrice = option.price * pipeLength[serviceId];
                  } else if (service.pricePerPoint && electricalPoints[serviceId]) {
                    finalPrice = option.price * electricalPoints[serviceId];
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
                      <div className={`flex justify-between ${isMobile ? 'text-sm' : 'text-base'}`}>
                        <span className="text-slate-700">+ {service.name}</span>
                        <span className="font-medium text-slate-800">
                          ฿{totalServicePrice.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* แสดงรายละเอียดท่อน้ำเมื่อเป็นบริการท่อน้ำ */}
                      {serviceId === 'pipe' && service.pricePerMeter && pipeLength[serviceId] && (
                        <div className={`ml-2 ${isMobile ? 'text-sm' : 'text-base'} text-slate-500`}>
                          <div className="flex justify-between">
                            <span>• {option.name} ({pipeLength[serviceId]} ม.)</span>
                            <span>฿{(option.price * pipeLength[serviceId]).toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* แสดงรายละเอียดงานไฟฟ้าเมื่อเป็นบริการไฟฟ้า */}
                      {serviceId === 'electrical' && service.pricePerPoint && electricalPoints[serviceId] && (
                        <div className={`ml-2 ${isMobile ? 'text-sm' : 'text-base'} text-slate-500`}>
                          <div className="flex justify-between">
                            <span>• {option.name} ({electricalPoints[serviceId]} จุด)</span>
                            <span>฿{(option.price * electricalPoints[serviceId]).toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* แสดงวัสดุรางน้ำเมื่อเลือกบริการรางน้ำ */}
                      {serviceId === 'gutter' && selectedGutterMaterials[serviceId] && (
                        <div className={`ml-2 ${isMobile ? 'text-sm' : 'text-base'} text-slate-500`}>
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
                      
                      {/* แสดงรายละเอียดบริการทั่วไป (ไม่ใช่ท่อน้ำ ไฟฟ้า หรือรางน้ำ) */}
                      {serviceId !== 'pipe' && serviceId !== 'electrical' && serviceId !== 'gutter' && (
                        <div className={`ml-2 ${isMobile ? 'text-sm' : 'text-base'} text-slate-500`}>
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
                      <div className={`flex justify-between ${isMobile ? 'text-sm' : 'text-base'}`}>
                        <span className="text-slate-700">+ งานรางน้ำ</span>
                        <span className="font-medium text-slate-800">฿0</span>
                      </div>
                      <div className={`ml-2 ${isMobile ? 'text-sm' : 'text-base'} text-slate-500`}>
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
            <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-slate-800`}>ราคารวม</span>
            <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-slate-900`}>
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
          
          {/* Quote Request Button */}
          <div className="mt-1">
            <button
              onClick={onQuoteRequest}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              ขอใบเสนอราคา
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
