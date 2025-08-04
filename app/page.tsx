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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-8">
      <Navbar totalPrice={totalPrice} />
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-[calc(100vh-2rem)] p-8 gap-3 mt-6">
        {/* Left Side - Material Preview (80%) */}
        <div id="materials" className="w-[80%]">
          <div className="h-full rounded-3xl overflow-auto shadow-xl border border-gray-200/50 custom-scrollbar bg-white/95 backdrop-blur-sm">
            <MaterialPreview material={selectionData.material} />
          </div>
        </div>
        
        {/* Right Side - Calculator (20%) */}
        <div className="w-[20%] bg-white/95 backdrop-blur-sm border border-gray-200/50 h-full relative shadow-xl rounded-3xl overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-auto custom-scrollbar p-6">
              <div className="space-y-8">
                {/* Material Selector */}
                <div className="space-y-6">
                  <MaterialSelector
                    materials={materials}
                    categories={materialCategories}
                    mainServices={mainServices}
                    extraServices={extraServices}
                    onSelectionChange={setSelectionData}
                  />
                </div>
              </div>
            </div>
            
            {/* Price Summary - Fixed at bottom */}
            {selectionData.size && selectionData.material && totalPrice > 0 && (
              <div className="bg-gradient-to-t from-white via-white to-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">💰</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">สรุปราคา</h3>
                  </div>
                  
                  {/* Area and Base Price */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">พื้นที่รวม</span>
                      <span className="font-semibold text-gray-800">
                        {(selectionData.dimensions.width * selectionData.dimensions.length).toFixed(2)} ตร.ม.
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">ราคาต่อ ตร.ม.</span>
                      <span className="font-semibold text-gray-800">
                        ฿{selectionData.material.pricePerSqm[selectionData.size.id].toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Services */}
                  {selectionData.selectedServices.length > 0 && (
                    <div className="border-t border-gray-200 pt-3">
                      <div className="text-xs font-medium text-gray-500 mb-2">บริการที่เลือก</div>
                      <div className="space-y-1">
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
                                <span className="text-gray-600">{service.name}</span>
                                <span className="font-medium text-gray-800">฿{servicePrice.toLocaleString()}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                  
                  {/* Extra Services */}
                  {Object.keys(selectionData.selectedExtras).some(key => selectionData.selectedExtras[key]) && (
                    <div className="border-t border-gray-200 pt-3">
                      <div className="text-xs font-medium text-gray-500 mb-2">บริการเสริม</div>
                      <div className="space-y-1">
                        {Object.entries(selectionData.selectedExtras)
                          .filter(([_, optionId]) => optionId)
                          .map(([serviceId, optionId]) => {
                            const service = extraServices.find((s) => s.id === serviceId);
                            const option = service?.options.find((o) => o.id === optionId);
                            if (!service || !option) return null;
                            return (
                              <div key={serviceId} className="flex justify-between text-xs">
                                <span className="text-gray-600">{service.name}</span>
                                <span className="font-medium text-gray-800">฿{option.price.toLocaleString()}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                  
                  {/* Total */}
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-800">ราคารวมทั้งหมด</span>
                      <span className="text-xl font-bold text-primary-600">
                        ฿{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-[calc(100vh-2rem)] p-4 gap-4 mt-4">
        {/* Top - Material Preview */}
        <div className="flex-1 min-h-[50vh]">
          <div className="h-full rounded-2xl overflow-auto shadow-xl border border-gray-200/50 bg-white/95 backdrop-blur-sm">
            <MaterialPreview material={selectionData.material} />
          </div>
        </div>
        
        {/* Bottom - Calculator */}
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl">
          {/* Material Selector */}
          <div className="p-4">
            <MaterialSelector
              materials={materials}
              categories={materialCategories}
              mainServices={mainServices}
              extraServices={extraServices}
              onSelectionChange={setSelectionData}
            />
          </div>
          
          {/* Price Summary - Mobile */}
          {selectionData.size && selectionData.material && totalPrice > 0 && (
            <div className="bg-gradient-to-t from-white via-white to-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">💰</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-800">สรุปราคา</h3>
                </div>
                
                {/* Area and Base Price */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">พื้นที่รวม</span>
                    <span className="font-semibold text-gray-800">
                      {(selectionData.dimensions.width * selectionData.dimensions.length).toFixed(2)} ตร.ม.
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">ราคาต่อ ตร.ม.</span>
                    <span className="font-semibold text-gray-800">
                      ฿{selectionData.material.pricePerSqm[selectionData.size.id].toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {/* Services */}
                {selectionData.selectedServices.length > 0 && (
                  <div className="border-t border-gray-200 pt-2">
                    <div className="text-xs font-medium text-gray-500 mb-1">บริการที่เลือก</div>
                    <div className="space-y-1">
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
                              <span className="text-gray-600">{service.name}</span>
                              <span className="font-medium text-gray-800">฿{servicePrice.toLocaleString()}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
                
                {/* Extra Services */}
                {Object.keys(selectionData.selectedExtras).some(key => selectionData.selectedExtras[key]) && (
                  <div className="border-t border-gray-200 pt-2">
                    <div className="text-xs font-medium text-gray-500 mb-1">บริการเสริม</div>
                    <div className="space-y-1">
                      {Object.entries(selectionData.selectedExtras)
                        .filter(([_, optionId]) => optionId)
                        .map(([serviceId, optionId]) => {
                          const service = extraServices.find((s) => s.id === serviceId);
                          const option = service?.options.find((o) => o.id === optionId);
                          if (!service || !option) return null;
                          return (
                            <div key={serviceId} className="flex justify-between text-xs">
                              <span className="text-gray-600">{service.name}</span>
                              <span className="font-medium text-gray-800">฿{option.price.toLocaleString()}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
                
                {/* Total */}
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-800">ราคารวมทั้งหมด</span>
                    <span className="text-lg font-bold text-primary-600">
                      ฿{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
