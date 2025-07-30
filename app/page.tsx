'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import { materials, materialCategories, mainServices, extraServices } from './lib/data';
import { Material, Size } from './lib/types';

import { MaterialSelector } from './components/calculator/MaterialSelector';
import { MaterialPreview } from './components/calculator/MaterialPreview';

export default function Home() {
  const [selectionData, setSelectionData] = useState({
    material: null as Material | null,
    size: null as Size | null,
    dimensions: { width: 0, length: 0 },
    hasColumn: null as boolean | null,
    selectedServices: [] as string[],
    selectedServiceOptions: {} as Record<string, string>,
    selectedExtras: {} as Record<string, string>,
  });

  // Validation
  const isValidDimensions = selectionData.dimensions.width > 0 && selectionData.dimensions.length > 0;
  
  // Calculate total price
  const totalPrice = selectionData.material && selectionData.size && isValidDimensions
    ? (selectionData.dimensions.width * selectionData.dimensions.length) * 
      selectionData.material.pricePerSqm[selectionData.size.id] +
      mainServices
        .filter((service) => selectionData.selectedServices.includes(service.id))
        .reduce((sum, service) => {
          let servicePrice = service.price;
          // Add option price if selected
          const selectedOption = selectionData.selectedServiceOptions[service.id];
          if (selectedOption && service.options) {
            const option = service.options.find(opt => opt.id === selectedOption);
            if (option) {
              servicePrice += option.price;
            }
          }
          return sum + servicePrice;
        }, 0) +
      Object.entries(selectionData.selectedExtras)
        .filter(([_, optionId]) => optionId)
        .reduce((sum, [serviceId, optionId]) => {
          const service = extraServices.find((s) => s.id === serviceId);
          const option = service?.options.find((o) => o.id === optionId);
          return sum + (option?.price || 0);
        }, 0)
    : 0;

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Navbar totalPrice={totalPrice} />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Side - Preview (70%) */}
        <div id="materials" className="w-[70%] p-6">
          <MaterialPreview material={selectionData.material} />
        </div>
        {/* Right Side - Calculator (30%) */}
        <div className="w-[30%] bg-white border-l border-gray-200 h-full relative">
          <div className="h-full overflow-auto snap-y snap-mandatory scrollbar-hide">
            <div id="dimensions" className="snap-start">
              {/* ส่วนเลือกขนาด */}
            </div>
            <div id="services" className="snap-start">
              {/* ส่วนเลือกบริการ */}
            </div>
            <div id="summary" className="snap-start">
              <MaterialSelector
                materials={materials}
                categories={materialCategories}
                mainServices={mainServices}
                extraServices={extraServices}
                onSelectionChange={setSelectionData}
              />
              {/* Price Summary - Fixed at bottom */}
              {selectionData.size && selectionData.material && totalPrice > 0 && (
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>พื้นที่รวม</span>
                      <span>{(selectionData.dimensions.width * selectionData.dimensions.length).toFixed(2)} ตร.ม.</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ราคาต่อ ตร.ม.</span>
                      <span>฿{selectionData.material.pricePerSqm[selectionData.size.id].toLocaleString()}</span>
                    </div>
                    {/* Show selected services */}
                    {selectionData.selectedServices.length > 0 && (
                      <div className="border-t pt-2">
                        <div className="text-xs text-gray-600 mb-1">บริการที่เลือก</div>
                        {mainServices
                          .filter((service) => selectionData.selectedServices.includes(service.id))
                          .map((service) => {
                            let servicePrice = service.price;
                            const selectedOption = selectionData.selectedServiceOptions[service.id];
                            if (selectedOption && service.options) {
                              const option = service.options.find(opt => opt.id === selectedOption);
                              if (option) {
                                servicePrice += option.price;
                              }
                            }
                            return (
                              <div key={service.id} className="flex justify-between text-xs">
                                <span>{service.name}</span>
                                <span>฿{servicePrice.toLocaleString()}</span>
                              </div>
                            );
                          })}
                      </div>
                    )}
                    {/* Show selected extras */}
                    {Object.keys(selectionData.selectedExtras).some(key => selectionData.selectedExtras[key]) && (
                      <div className="border-t pt-2">
                        <div className="text-xs text-gray-600 mb-1">บริการเสริม</div>
                        {Object.entries(selectionData.selectedExtras)
                          .filter(([_, optionId]) => optionId)
                          .map(([serviceId, optionId]) => {
                            const service = extraServices.find((s) => s.id === serviceId);
                            const option = service?.options.find((o) => o.id === optionId);
                            if (!service || !option) return null;
                            return (
                              <div key={serviceId} className="flex justify-between text-xs">
                                <span>{service.name}</span>
                                <span>฿{option.price.toLocaleString()}</span>
                              </div>
                            );
                          })}
                      </div>
                    )}
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>ราคารวมทั้งหมด</span>
                        <span className="text-blue-600">฿{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div> {/* close summary */}
          </div> {/* close snap-mandatory */}
        </div> {/* close right side */}
      </div> {/* close flex */}
    </main>
  );
}