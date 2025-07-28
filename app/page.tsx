'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import { materials, materialCategories, mainServices, extraServices } from './lib/data';
import { Material, Size } from './lib/types';

import { MaterialSelector } from './components/calculator/MaterialSelector';
import { DimensionsInput } from './components/calculator/DimensionsInput';
import { SizeSelector } from './components/calculator/SizeSelector';
import { ServicesSelector } from './components/calculator/ServicesSelector';
import { ExtraServices } from './components/calculator/ExtraServices';
import { PriceSummary } from './components/calculator/PriceSummary';
import { MaterialPreview } from './components/calculator/MaterialPreview';

export default function Home() {
  const [hasColumn, setHasColumn] = useState<boolean | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, length: 0 });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedServiceOptions, setSelectedServiceOptions] = useState<Record<string, string>>({});
  const [selectedExtras, setSelectedExtras] = useState<Record<string, string>>({});

  const area = dimensions.width * dimensions.length;

  const totalPrice = selectedMaterial && selectedSize
    ? area * selectedMaterial.pricePerSqm[selectedSize.id] +
      mainServices
        .filter((service) => selectedServices.includes(service.id))
        .reduce((sum, service) => sum + service.price, 0) +
      Object.entries(selectedExtras)
        .filter(([_, optionId]) => optionId)
        .reduce((sum, [serviceId, optionId]) => {
          const service = extraServices.find((s) => s.id === serviceId);
          const option = service?.options.find((o) => o.id === optionId);
          return sum + (option?.price || 0);
        }, 0)
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-16">
      <Navbar totalPrice={totalPrice} />
      
      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Left Side - Calculator (35%) */}
        <div className="w-[35%] bg-white p-6 rounded-2xl shadow-soft hover:shadow-hover transition-shadow h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto custom-scrollbar">
          <div className="space-y-8">
            <div id="materials" className="scroll-mt-20">
              <MaterialSelector
                materials={materials}
                categories={materialCategories}
                selectedMaterial={selectedMaterial}
                onSelect={(material) => {
                  setSelectedMaterial(material);
                  setSelectedSize(null);
                  setHasColumn(null);
                }}
              />
            </div>

            {selectedMaterial && (
              <div id="dimensions" className="scroll-mt-20">
                <SizeSelector
                  material={selectedMaterial}
                  selectedSize={selectedSize}
                  onSelect={(size) => {
                    setSelectedSize(size);
                    setHasColumn(null);
                  }}
                />
              </div>
            )}

            {selectedMaterial && selectedSize && (
              <DimensionsInput
                width={dimensions.width}
                length={dimensions.length}
                onChange={setDimensions}
              />
            )}

            {selectedSize && selectedMaterial && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">รูปแบบการติดตั้ง</h2>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={`p-3 rounded-lg border ${
                      hasColumn === true
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setHasColumn(true)}
                  >
                    แบบมีเสา
                  </button>
                  <button
                    className={`p-3 rounded-lg border ${
                      hasColumn === false
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setHasColumn(false)}
                  >
                    แบบไร้เสา
                  </button>
                </div>
              </div>
            )}
            {selectedSize && (
              <div className="space-y-6">
                <div id="services" className="scroll-mt-20">
                  <ServicesSelector
                    services={mainServices.filter(service => 
                      hasColumn === false 
                        ? service.id !== 'poles'
                        : true
                    )}
                    selectedSize={selectedSize}
                    selectedServices={selectedServices}
                    selectedOptions={selectedServiceOptions}
                    onToggle={(serviceId, optionId) => {
                    if (optionId) {
                      // ถ้ามี optionId แสดงว่าเป็นการเลือกสี
                      setSelectedServiceOptions(prev => {
                        const newOptions = { ...prev };
                        if (prev[serviceId] === optionId) {
                          delete newOptions[serviceId];
                          // ถ้ายกเลิกการเลือกสี ให้ยกเลิกบริการด้วย
                          setSelectedServices(prev => prev.filter(id => id !== serviceId));
                        } else {
                          newOptions[serviceId] = optionId;
                          // ถ้าเลือกสี ให้เพิ่มบริการด้วย
                          if (!selectedServices.includes(serviceId)) {
                            setSelectedServices(prev => [...prev, serviceId]);
                          }
                        }
                        return newOptions;
                      });
                    } else {
                      // ถ้าไม่มี optionId แสดงว่าเป็นการเลือกบริการปกติ
                      setSelectedServices((prev) =>
                        prev.includes(serviceId)
                          ? prev.filter((id) => id !== serviceId)
                          : [...prev, serviceId]
                      );
                    }
                  }}
                  />
                </div>

                <div id="extras" className="scroll-mt-20">
                  <ExtraServices
                    services={extraServices.filter(service =>
                      hasColumn === false
                        ? !service.id.includes('column')
                        : true
                    )}
                    selectedExtras={selectedExtras}
                    onSelect={(serviceId, optionId) =>
                      setSelectedExtras((prev) => ({
                        ...prev,
                        [serviceId]: optionId,
                      }))
                    }
                  />
                </div>
              </div>
            )}

            {selectedSize && selectedMaterial && (
              <PriceSummary
                area={area}
                material={selectedMaterial}
                size={selectedSize}
                mainServices={mainServices}
                selectedServices={selectedServices}
                extraServices={extraServices}
                selectedExtras={selectedExtras}
              />
            )}
          </div>
        </div>

        {/* Right Side - Details & Preview (70%) */}
        <div className="w-[70%] p-4">
          <MaterialPreview material={selectedMaterial} />
        </div>
      </div>
    </main>
  );
}
