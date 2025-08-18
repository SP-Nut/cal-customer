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
  privacyScreenArea?: Record<string, number>; // เพิ่มสำหรับระแนงบังตา
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
  privacyScreenArea = {},
  isMobile = false,
  onQuoteRequest
}: PriceSummaryProps) {
  const area = dimensions.width * dimensions.length;

  // ฟังก์ชันคำนวณราคาบริการ
  const calculateServicePrice = (service: Service, selectedOption: string) => {
    let servicePrice = service.price || 0;
    if (selectedOption && service.options) {
      const option = service.options.find(opt => opt.id === selectedOption);
      if (option) {
        if (service.pricePerSqm) {
          servicePrice = option.price * area;
        } else {
          servicePrice += option.price;
        }
      }
    } else if (service.pricePerSqm && service.price) {
      servicePrice = service.price * area;
    }
    return servicePrice;
  };

  // ฟังก์ชันคำนวณราคาบริการเสริม
  const calculateExtraServicePrice = (service: ExtraService, option: any, serviceId: string) => {
    let finalPrice = option.price;
    
    if (service.pricePerMeter && pipeLength[serviceId]) {
      finalPrice = option.price * pipeLength[serviceId];
    } else if (service.pricePerPoint && electricalPoints[serviceId]) {
      finalPrice = option.price * electricalPoints[serviceId];
    } else if (service.pricePerSqm) {
      finalPrice = option.price * area;
    }
    
    return finalPrice;
  };

  return (
    <div className={`bg-white border-t border-slate-200 ${isMobile ? 'p-1' : 'p-1.5'}`}>
      <div className="space-y-0.5">
        {/* Header with improved styling */}
        <div className="flex items-center justify-between mb-1">
          <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-slate-800`}>สรุปราคา</h3>
          <div className="text-xs text-slate-500">
            {area.toFixed(2)} ตร.ม.
          </div>
        </div>
        
        {/* Material and Base Price */}
        <div className="bg-blue-50 rounded-md p-1.5 border border-blue-100">
          <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-700 font-semibold mb-0.5`}>
            วัสดุหลัก - {material.name}
          </div>
          <div className="space-y-0.5">
            <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
              <span className="text-slate-600">ขนาด: {selectedSize.name}</span>
              <span className="text-slate-600">฿{material.pricePerSqm[selectedSize.id].toLocaleString()}/ตร.ม.</span>
            </div>
            <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'} font-semibold`}>
              <span className="text-slate-700">{area.toFixed(2)} ตร.ม.</span>
              <span className="text-blue-700">
                ฿{(area * material.pricePerSqm[selectedSize.id]).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        {/* Main Services */}
        {selectedServices.length > 0 && (
          <div className="bg-slate-50 rounded-md p-1.5 border border-slate-200">
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-700 font-semibold mb-0.5`}>บริการหลัก</div>
            <div className="space-y-0.5">
              {mainServices
                .filter((service) => selectedServices.includes(service.id))
                .map((service) => {
                  const selectedOption = selectedServiceOptions[service.id];
                  const servicePrice = calculateServicePrice(service, selectedOption);
                  const optionName = selectedOption && service.options 
                    ? service.options.find(opt => opt.id === selectedOption)?.name 
                    : '';
                  
                  return (
                    <div key={service.id} className="space-y-0">
                      <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        <span className="text-slate-700 font-medium">{service.name}</span>
                        <span className="font-semibold text-slate-800">฿{servicePrice.toLocaleString()}</span>
                      </div>
                      {optionName && (
                        <div className="text-xs text-slate-500 ml-1">
                          • {optionName}
                          {service.pricePerSqm && ` (${area.toFixed(2)} ตร.ม.)`}
                        </div>
                      )}
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
          return hasExtras || hasGutterMaterials;
        })() && (
          <div className="bg-orange-50 rounded-md p-1.5 border border-orange-100">
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-700 font-semibold mb-0.5`}>บริการเสริม</div>
            <div className="space-y-0.5">
              {Object.entries(selectedExtras)
                .filter(([_, optionId]) => optionId)
                .map(([serviceId, optionId]) => {
                  const service = extraServices.find((s) => s.id === serviceId);
                  const option = service?.options.find((o) => o.id === optionId);
                  if (!service || !option) return null;
                  
                  const finalPrice = calculateExtraServicePrice(service, option, serviceId);
                  
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
                    <div key={serviceId} className="space-y-0">
                      <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        <span className="text-slate-700 font-medium">{service.name}</span>
                        <span className="font-semibold text-orange-700">
                          ฿{totalServicePrice.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* รายละเอียดบริการต่างๆ */}
                      <div className="text-xs text-slate-500 ml-1 space-y-0">
                        {/* ท่อน้ำ */}
                        {serviceId === 'pipe' && service.pricePerMeter && pipeLength[serviceId] && (
                          <div className="flex justify-between">
                            <span>• {option.name} ({pipeLength[serviceId]} ม.)</span>
                            <span>฿{(option.price * pipeLength[serviceId]).toLocaleString()}</span>
                          </div>
                        )}
                        
                        {/* ไฟฟ้า */}
                        {serviceId === 'electrical' && service.pricePerPoint && electricalPoints[serviceId] && (
                          <div className="flex justify-between">
                            <span>• {option.name} ({electricalPoints[serviceId]} จุด)</span>
                            <span>฿{(option.price * electricalPoints[serviceId]).toLocaleString()}</span>
                          </div>
                        )}
                        
                        {/* บริการคิดตามตารางเมตร */}
                        {service.pricePerSqm && (
                          <div className="flex justify-between">
                            <span>• {option.name} ({area.toFixed(2)} ตร.ม.)</span>
                            <span>฿{(option.price * area).toLocaleString()}</span>
                          </div>
                        )}
                        
                        {/* รางน้ำ */}
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
                        
                        {/* บริการทั่วไป */}
                        {serviceId !== 'pipe' && serviceId !== 'electrical' && serviceId !== 'gutter' && !service.pricePerSqm && (
                          <div className="flex justify-between">
                            <span>• {option.name}</span>
                            <span>฿{option.price.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              
              {/* รางน้ำแยกต่างหาก */}
              {Object.entries(selectedGutterMaterials)
                .filter(([serviceId, materialId]) => materialId && serviceId === 'gutter' && !selectedExtras[serviceId])
                .map(([serviceId, materialId]) => {
                  const selectedGutter = gutterMaterials.find(g => g.id === materialId);
                  if (!selectedGutter) return null;
                  const gutterTotalPrice = selectedGutter.price * dimensions.length;
                  
                  return (
                    <div key={`gutter-${serviceId}`} className="space-y-0">
                      <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        <span className="text-slate-700 font-medium">งานรางน้ำ</span>
                        <span className="font-semibold text-orange-700">฿{gutterTotalPrice.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-slate-500 ml-1">
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
        
        {/* Total with enhanced styling */}
        <div className="border-t-2 border-slate-300 pt-1 bg-slate-100 rounded-md p-1.5">
          <div className="flex justify-between items-center mb-1">
            <span className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-slate-800`}>ราคารวมทั้งหมด</span>
            <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-blue-700`}>
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-slate-500 text-center mb-1">
            *ราคานี้เป็นการประมาณการเบื้องต้น ไม่รวม VAT 7%
          </div>
          
          {/* Quote Request Button */}
          <button
            onClick={onQuoteRequest}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-4 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm"
          >
            ขอใบเสนอราคาที่แม่นยำ
          </button>
        </div>
      </div>
    </div>
  );
}
