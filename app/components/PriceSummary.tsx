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
  isMobile?: boolean;
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
  isMobile = false
}: PriceSummaryProps) {
  const area = dimensions.width * dimensions.length;

  // Debug log for selectedExtras
  console.log('PriceSummary - selectedExtras:', selectedExtras);
  console.log('PriceSummary - extraServices:', extraServices);
  console.log('PriceSummary - filtered extras:', Object.entries(selectedExtras).filter(([_, optionId]) => optionId));

  return (
    <div className={`bg-gradient-to-br from-slate-50 via-white to-blue-50/50 backdrop-blur-sm border-t border-slate-200/50 shadow-sm ${isMobile ? 'p-3' : 'p-4'}`}>
      <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-md flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-slate-800`}>สรุปราคา</h3>
        </div>
        
        {/* Area and Base Price */}
        <div className={`${isMobile ? 'space-y-1.5' : 'space-y-2'} bg-slate-50/50 rounded-md p-2`}>
          <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-slate-600 mb-1`}>วัสดุพื้นฐาน</div>
          <div className={`flex justify-between items-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
            <span className="text-slate-600">พื้นที่รวม</span>
            <span className="font-medium text-slate-800">{area.toFixed(2)} ตร.ม.</span>
          </div>
          <div className={`flex justify-between items-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
            <span className="text-slate-600">ราคาต่อ ตร.ม.</span>
            <span className="font-medium text-slate-800">
              ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}
            </span>
          </div>
          <div className={`flex justify-between items-center ${isMobile ? 'text-xs' : 'text-sm'} border-t border-slate-200 pt-1 mt-1`}>
            <span className="text-slate-700 font-medium">รวมค่าวัสดุ</span>
            <span className="font-semibold text-slate-800">
              ฿{(area * material.pricePerSqm[selectedSize.id]).toLocaleString()}
            </span>
          </div>
        </div>
        
        {/* Services */}
        {selectedServices.length > 0 && (
          <div>
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-blue-600 ${isMobile ? 'mb-1' : 'mb-1.5'}`}>บริการหลัก</div>
            <div className="space-y-1 bg-blue-50/30 rounded-md p-2">
              {mainServices
                .filter((service) => selectedServices.includes(service.id))
                .map((service) => {
                  let servicePrice = service.price;
                  const selectedOption = selectedServiceOptions[service.id];
                  if (selectedOption && service.options) {
                    const option = service.options.find(opt => opt.id === selectedOption);
                    if (option) servicePrice += option.price;
                  }
                  return (
                    <div key={service.id} className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      <span className="text-blue-700 font-medium">{service.name}</span>
                      <span className="font-semibold text-blue-800">฿{servicePrice.toLocaleString()}</span>
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
          <div>
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-emerald-600 ${isMobile ? 'mb-1' : 'mb-1.5'}`}>บริการเสริม</div>
            <div className="space-y-1 bg-emerald-50/50 rounded-md p-2 border-2 border-emerald-200">
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
                  
                  return (
                    <div key={serviceId} className="space-y-1">
                      <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        <span className="text-emerald-700 font-medium">+ {service.name}</span>
                        <span className="font-semibold text-emerald-800">฿{option.price.toLocaleString()}</span>
                      </div>
                      
                      {/* แสดงวัสดุรางน้ำเมื่อเลือกบริการรางน้ำ */}
                      {serviceId === 'gutter' && selectedGutterMaterials[serviceId] && (
                        <div className={`ml-4 ${isMobile ? 'text-xs' : 'text-sm'} text-emerald-600`}>
                          {(() => {
                            const selectedGutter = gutterMaterials.find(g => g.id === selectedGutterMaterials[serviceId]);
                            if (!selectedGutter) return null;
                            const gutterTotalPrice = selectedGutter.price * dimensions.length;
                            return (
                              <div className="flex justify-between bg-emerald-100/50 px-2 py-1 rounded">
                                <span>• {selectedGutter.name} ({dimensions.length} ม.)</span>
                                <span className="font-semibold">฿{gutterTotalPrice.toLocaleString()}</span>
                              </div>
                            );
                          })()}
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
                    <div key={`gutter-${serviceId}`} className="space-y-1">
                      <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        <span className="text-emerald-700 font-medium">+ งานรางน้ำ</span>
                        <span className="font-semibold text-emerald-800">฿0</span>
                      </div>
                      <div className={`ml-4 ${isMobile ? 'text-xs' : 'text-sm'} text-emerald-600`}>
                        <div className="flex justify-between bg-emerald-100/50 px-2 py-1 rounded">
                          <span>• {selectedGutter.name} ({dimensions.length} ม.)</span>
                          <span className="font-semibold">฿{gutterTotalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {/* Total */}
        <div className={`border-t-2 border-slate-300/80 ${isMobile ? 'pt-3' : 'pt-4'} ${isMobile ? 'mt-2' : 'mt-3'}`}>
          <div className="flex justify-between items-center">
            <span className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-slate-800`}>ราคารวมทั้งหมด</span>
            <span className={`${isMobile ? 'text-base' : 'text-lg'} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
