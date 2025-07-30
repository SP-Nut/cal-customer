'use client';

import { Material, Size, Service, ExtraService } from '@/app/lib/types';

interface PriceSummaryProps {
  area: number;
  material: Material;
  size: Size;
  mainServices: Service[];
  selectedServices: string[];
  selectedServiceOptions: Record<string, string>;
  extraServices: ExtraService[];
  selectedExtras: Record<string, string>;
}

export function PriceSummary({
  area,
  material,
  size,
  mainServices,
  selectedServices,
  selectedServiceOptions,
  extraServices,
  selectedExtras,
}: PriceSummaryProps) {
  const basePrice = area * material.pricePerSqm[size.id];
  
  const servicesPrice = mainServices
    .filter((service) => selectedServices.includes(service.id))
    .reduce((sum, service) => {
      let servicePrice = service.price;
      // Add option price if selected
      const selectedOption = selectedServiceOptions[service.id];
      if (selectedOption && service.options) {
        const option = service.options.find(opt => opt.id === selectedOption);
        if (option) {
          servicePrice += option.price;
        }
      }
      return sum + servicePrice;
    }, 0);
    
  const extrasPrice = Object.entries(selectedExtras)
    .filter(([_, optionId]) => optionId)
    .reduce((sum, [serviceId, optionId]) => {
      const service = extraServices.find((s) => s.id === serviceId);
      const option = service?.options.find((o) => o.id === optionId);
      return sum + (option?.price || 0);
    }, 0);

  const totalPrice = basePrice + servicesPrice + extrasPrice;

  return (
    <section id="summary" className="space-y-4 mt-8">
      <h2 className="text-xl font-semibold">สรุปรายการ</h2>
      <div className="overflow-hidden bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">พื้นที่รวม</span>
            <span className="font-medium">{area.toFixed(2)} ตารางเมตร</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">ราคาต่อตารางเมตร</span>
            <span className="font-medium">฿{material.pricePerSqm[size.id].toLocaleString()}</span>
          </div>
          
          {selectedServices.length > 0 && (
            <>
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm text-gray-600 mb-2">บริการที่เลือก</div>
                {mainServices
                  .filter((service) => selectedServices.includes(service.id))
                  .map((service) => {
                    let servicePrice = service.price;
                    const selectedOption = selectedServiceOptions[service.id];
                    let optionName = '';
                    
                    if (selectedOption && service.options) {
                      const option = service.options.find(opt => opt.id === selectedOption);
                      if (option) {
                        servicePrice += option.price;
                        optionName = ` (${option.name})`;
                      }
                    }
                    
                    return (
                      <div key={service.id} className="flex justify-between items-center py-1">
                        <span className="text-gray-800">{service.name}{optionName}</span>
                        <span className="font-medium">฿{servicePrice.toLocaleString()}</span>
                      </div>
                    );
                  })}
              </div>
            </>
          )}

          {Object.keys(selectedExtras).some(key => selectedExtras[key]) && (
            <>
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm text-gray-600 mb-2">บริการเสริม</div>
                {Object.entries(selectedExtras)
                  .filter(([_, optionId]) => optionId)
                  .map(([serviceId, optionId]) => {
                    const service = extraServices.find((s) => s.id === serviceId);
                    const option = service?.options.find((o) => o.id === optionId);
                    if (!service || !option) return null;
                    return (
                      <div key={serviceId} className="flex justify-between items-center py-1">
                        <span className="text-gray-800">{service.name} - {option.name}</span>
                        <span className="font-medium">฿{option.price.toLocaleString()}</span>
                      </div>
                    );
                  })}
              </div>
            </>
          )}

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">ราคารวมทั้งหมด</span>
              <span className="text-2xl font-bold text-blue-600">฿{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}