'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import FloatingPreview from './components/FloatingPreview';
import { materials, materialCategories, mainServices, extraServices } from './lib/data';
import { Material, Size, Service, ExtraService } from './lib/types';
import { gutterMaterials } from './lib/materials/gutterMaterials';
import { MaterialSelector } from './components/calculator/MaterialSelector';
import { MaterialPreview } from './components/calculator/MaterialPreview';
import { PriceSummary } from './components/PriceSummary';

export default function Home() {
  const [selectionData, setSelectionData] = useState({
    material: null as Material | null,
    size: null as Size | null,
    dimensions: { width: 0, length: 0 },
    hasColumn: null as boolean | null,
    selectedServices: [] as string[],
    selectedServiceOptions: {} as Record<string, string>,
    selectedExtras: {} as Record<string, string>,
    gutterMaterials: {} as Record<string, string>,
  });

  const [showFloatingPreview, setShowFloatingPreview] = useState(false);

  // Validation and calculation
  const isValidDimensions = selectionData.dimensions.width > 0 && selectionData.dimensions.length > 0;
  const area = selectionData.dimensions.width * selectionData.dimensions.length;
  
  const totalPrice = selectionData.material && selectionData.size && isValidDimensions
    ? area * selectionData.material.pricePerSqm[selectionData.size.id] +
      mainServices
        .filter((service: Service) => selectionData.selectedServices.includes(service.id))
        .reduce((sum: number, service: Service) => {
          let servicePrice = service.price;
          const selectedOption = selectionData.selectedServiceOptions[service.id];
          if (selectedOption && service.options) {
            const option = service.options.find((opt: any) => opt.id === selectedOption);
            if (option) servicePrice += option.price;
          }
          return sum + servicePrice;
        }, 0) +
      Object.entries(selectionData.selectedExtras)
        .filter(([_, optionId]) => optionId)
        .reduce((sum: number, [serviceId, optionId]) => {
          const service = extraServices.find((s: ExtraService) => s.id === serviceId);
          const option = service?.options.find((o: any) => o.id === optionId);
          let extraPrice = option?.price || 0;
          
          // เพิ่มราคารางน้ำถ้ามีการเลือกวัสดุรางน้ำ
          if (serviceId === 'gutter' && selectionData.gutterMaterials[serviceId]) {
            const selectedGutter = gutterMaterials.find(g => g.id === selectionData.gutterMaterials[serviceId]);
            if (selectedGutter) {
              extraPrice += selectedGutter.price * selectionData.dimensions.length;
            }
          }
          
          return sum + extraPrice;
        }, 0)
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-8">
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide all scrollbars globally */
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        
        /* Ensure body and html have no scrollbars */
        html, body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <Navbar totalPrice={totalPrice} />
      
      {/* Floating Preview - Test: Show when material and size selected */}
      <FloatingPreview 
        material={selectionData.material}
        selectedSize={selectionData.size}
        dimensions={selectionData.dimensions}
        isVisible={selectionData.material !== null && selectionData.size !== null}
      />
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-[calc(100vh-2rem)] p-8 gap-3 mt-6">
        {/* Left Side - Material Preview (flex-1) */}
        <div id="materials" className="flex-1">
          <div className="h-full rounded-3xl overflow-auto shadow-xl border border-gray-200/50 custom-scrollbar bg-white/95 backdrop-blur-sm">
            <MaterialPreview 
              material={selectionData.material} 
              selectedSize={selectionData.size}
              dimensions={selectionData.dimensions}
              totalPrice={totalPrice}
              selectedServices={selectionData.selectedServices}
              selectedExtras={selectionData.selectedExtras}
              mainServices={mainServices}
              extraServices={extraServices}
              selectedServiceOptions={selectionData.selectedServiceOptions}
              onFloatingPreviewChange={setShowFloatingPreview}
            />
          </div>
        </div>
        
        {/* Right Side - Calculator (Fixed width 400px) */}
        <div className="w-96 bg-white/95 backdrop-blur-sm border border-gray-200/50 h-full relative shadow-xl rounded-3xl overflow-hidden">
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
                    gutterMaterials={gutterMaterials}
                    onSelectionChange={setSelectionData}
                  />
                </div>
              </div>
            </div>
            
            {/* Price Summary - Fixed at bottom */}
            {selectionData.size && selectionData.material && totalPrice > 0 && (
              <PriceSummary 
                material={selectionData.material}
                selectedSize={selectionData.size}
                dimensions={selectionData.dimensions}
                totalPrice={totalPrice}
                selectedServices={selectionData.selectedServices}
                selectedExtras={selectionData.selectedExtras}
                mainServices={mainServices}
                extraServices={extraServices}
                selectedServiceOptions={selectionData.selectedServiceOptions}
                gutterMaterials={selectionData.gutterMaterials}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-[calc(100vh-2rem)] p-4 gap-4 mt-4">
        {/* Top - Material Preview - ซ่อนเมื่อเลือกแล้ว */}
        {!(selectionData.material && selectionData.size) && (
          <div className="flex-1 min-h-[50vh]">
            <div className="h-full rounded-2xl overflow-auto custom-scrollbar shadow-xl border border-gray-200/50 bg-white/95 backdrop-blur-sm">
              <MaterialPreview 
                material={selectionData.material} 
                selectedSize={selectionData.size}
                dimensions={selectionData.dimensions}
                totalPrice={totalPrice}
                selectedServices={selectionData.selectedServices}
                selectedExtras={selectionData.selectedExtras}
                mainServices={mainServices}
                extraServices={extraServices}
                selectedServiceOptions={selectionData.selectedServiceOptions}
                gutterMaterials={selectionData.gutterMaterials}
                onFloatingPreviewChange={setShowFloatingPreview}
              />
            </div>
          </div>
        )}
        
        {/* Bottom - Calculator - ขยายเต็มหน้าจอเมื่อเลือกแล้ว */}
        <div className={`bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl ${
          selectionData.material && selectionData.size ? 'flex-1' : ''
        }`}>
          {/* Material Selector */}
          <div className="p-4">
            <MaterialSelector
              materials={materials}
              categories={materialCategories}
              mainServices={mainServices}
              extraServices={extraServices}
              gutterMaterials={gutterMaterials}
              onSelectionChange={setSelectionData}
            />
          </div>
          
          {/* Price Summary - Mobile */}
          {selectionData.size && selectionData.material && totalPrice > 0 && (
            <PriceSummary 
              material={selectionData.material}
              selectedSize={selectionData.size}
              dimensions={selectionData.dimensions}
              totalPrice={totalPrice}
              selectedServices={selectionData.selectedServices}
              selectedExtras={selectionData.selectedExtras}
              mainServices={mainServices}
              extraServices={extraServices}
              selectedServiceOptions={selectionData.selectedServiceOptions}
              gutterMaterials={selectionData.gutterMaterials}
              isMobile={true}
            />
          )}
        </div>
      </div>
    </main>
  );
}