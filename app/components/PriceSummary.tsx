import { Material, Size, Service, ExtraService } from '../lib/types';

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
  isMobile = false
}: PriceSummaryProps) {
  const area = dimensions.width * dimensions.length;
  const headerClass = isMobile ? "text-base" : "text-lg";
  const textClass = isMobile ? "text-xs" : "text-sm";
  const priceClass = isMobile ? "text-lg" : "text-xl";
  const iconClass = isMobile ? "w-6 h-6" : "w-8 h-8";
  const iconTextClass = isMobile ? "text-xs" : "text-sm";

  return (
    <div className={`bg-gradient-to-t from-white via-white to-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
        {/* Header */}
        <div className={`flex items-center gap-${isMobile ? '2' : '3'} ${isMobile ? 'mb-3' : 'mb-4'}`}>
          <div className={`${iconClass} bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center`}>
            <span className={`text-white ${iconTextClass}`}>💰</span>
          </div>
          <h3 className={`${headerClass} font-bold text-gray-800`}>สรุปราคา</h3>
        </div>
        
        {/* Area and Base Price */}
        <div className={isMobile ? 'space-y-2' : 'space-y-3'}>
          <div className={`flex justify-between items-center ${textClass}`}>
            <span className="text-gray-600">พื้นที่รวม</span>
            <span className="font-semibold text-gray-800">{area.toFixed(2)} ตร.ม.</span>
          </div>
          <div className={`flex justify-between items-center ${textClass}`}>
            <span className="text-gray-600">ราคาต่อ ตร.ม.</span>
            <span className="font-semibold text-gray-800">
              ฿{material.pricePerSqm[selectedSize.id].toLocaleString()}
            </span>
          </div>
        </div>
        
        {/* Services */}
        {selectedServices.length > 0 && (
          <div className={`border-t border-gray-200 ${isMobile ? 'pt-2' : 'pt-3'}`}>
            <div className={`${textClass} font-medium text-gray-500 ${isMobile ? 'mb-1' : 'mb-2'}`}>บริการที่เลือก</div>
            <div className="space-y-1">
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
                    <div key={service.id} className={`flex justify-between ${textClass}`}>
                      <span className="text-gray-600">{service.name}</span>
                      <span className="font-medium text-gray-800">฿{servicePrice.toLocaleString()}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {/* Extra Services */}
        {Object.keys(selectedExtras).some(key => selectedExtras[key]) && (
          <div className={`border-t border-gray-200 ${isMobile ? 'pt-2' : 'pt-3'}`}>
            <div className={`${textClass} font-medium text-gray-500 ${isMobile ? 'mb-1' : 'mb-2'}`}>บริการเสริม</div>
            <div className="space-y-1">
              {Object.entries(selectedExtras)
                .filter(([_, optionId]) => optionId)
                .map(([serviceId, optionId]) => {
                  const service = extraServices.find((s) => s.id === serviceId);
                  const option = service?.options.find((o) => o.id === optionId);
                  if (!service || !option) return null;
                  return (
                    <div key={serviceId} className={`flex justify-between ${textClass}`}>
                      <span className="text-gray-600">{service.name}</span>
                      <span className="font-medium text-gray-800">฿{option.price.toLocaleString()}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {/* Total */}
        <div className={`border-t border-gray-300 ${isMobile ? 'pt-3' : 'pt-4'}`}>
          <div className="flex justify-between items-center">
            <span className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-gray-800`}>ราคารวมทั้งหมด</span>
            <span className={`${priceClass} font-bold text-primary-600`}>
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
