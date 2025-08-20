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
import { QuoteRequestModal } from './components/QuoteModal';

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
    pipeLength: {} as Record<string, number>,
    electricalPoints: {} as Record<string, number>,
    poleCount: 1,
  });

  const [showFloatingPreview, setShowFloatingPreview] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Validation and calculation
  const isValidDimensions = selectionData.dimensions.width > 0 && selectionData.dimensions.length > 0;
  const area = selectionData.dimensions.width * selectionData.dimensions.length;
  
  const totalPrice = selectionData.material && selectionData.size && isValidDimensions
    ? area * selectionData.material.pricePerSqm[selectionData.size.id] +
      mainServices
        .filter((service: Service) => selectionData.selectedServices.includes(service.id))
        .reduce((sum: number, service: Service) => {
          let servicePrice = service.price || 0;
          const selectedOption = selectionData.selectedServiceOptions[service.id];
          if (selectedOption && service.options) {
            const option = service.options.find((opt: any) => opt.id === selectedOption);
            if (option) {
              // ถ้าเป็น poles service ให้คูณกับจำนวนเสา
              if (service.id === 'poles') {
                servicePrice = option.price * selectionData.poleCount;
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
          return sum + servicePrice;
        }, 0) +
      Object.entries(selectionData.selectedExtras)
        .filter(([_, optionId]) => optionId)
        .reduce((sum: number, [serviceId, optionId]) => {
          const service = extraServices.find((s: ExtraService) => s.id === serviceId);
          let option = service?.options.find((o: any) => o.id === optionId);
          
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
          
          let extraPrice = option?.price || 0;
          
          // เพิ่มราคารางน้ำถ้ามีการเลือกวัสดุรางน้ำ
          if (serviceId === 'gutter' && selectionData.gutterMaterials[serviceId]) {
            const selectedGutter = gutterMaterials.find(g => g.id === selectionData.gutterMaterials[serviceId]);
            if (selectedGutter) {
              extraPrice += selectedGutter.price * selectionData.dimensions.length;
            }
          }
          
          // เพิ่มราคาท่อน้ำถ้ามีการระบุความยาว
          if (serviceId === 'pipe' && selectionData.pipeLength[serviceId] && service?.pricePerMeter) {
            const length = selectionData.pipeLength[serviceId];
            const minLength = service.minimumLength || 3;
            const actualLength = Math.max(length, minLength);
            extraPrice = (option?.price || 0) * actualLength;
          }
          
          // เพิ่มราคาไฟฟ้าถ้ามีการระบุจำนวนจุด
          if (serviceId === 'electrical' && selectionData.electricalPoints[serviceId] && service?.pricePerPoint) {
            const points = selectionData.electricalPoints[serviceId];
            extraPrice = (option?.price || 0) * points;
          }
          
          // เพิ่มราคารากฐานตามจำนวนเสา - ยึดตามงานเสา
          if (serviceId === 'foundation') {
            // สำหรับเข็มหกเหลี่ยม ใช้จำนวนชุด = จำนวนเสา (ขั้นต่ำ 2 ชุด)
            if (optionId.includes('hex-') || optionId === 'footing-only') {
              const foundationSets = Math.max(2, selectionData.poleCount);
              extraPrice = (option?.price || 0) * foundationSets;
            }
            // สำหรับเข็มไมโครไพล์และเข็มเหล็ก ใช้จำนวนต้น = จำนวนเสา (ขั้นต่ำ 2 ต้น)
            else if (optionId.includes('micropile-') || optionId.includes('steel-')) {
              const pileCount = Math.max(2, selectionData.poleCount);
              extraPrice = (option?.price || 0) * pileCount;
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

      <Navbar 
        totalPrice={totalPrice} 
        onQuoteRequest={() => setIsQuoteModalOpen(true)}
      />
      
      {/* Floating Preview - ปรากฏเมื่อเลือกวัสดุแล้ว */}
      <FloatingPreview 
        material={selectionData.material}
        selectedSize={selectionData.size}
        dimensions={selectionData.dimensions}
        isVisible={selectionData.material !== null}
        isInputFocused={isInputFocused}
      />
      
      {/* Desktop Layout - 70:30 ratio */}
      <div className="hidden lg:flex h-[calc(100vh-2rem)] p-8 gap-3 mt-6">
        <div id="materials" style={{width: '70%'}}>
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
              gutterMaterials={selectionData.gutterMaterials}
              poleCount={selectionData.poleCount}
              onFloatingPreviewChange={setShowFloatingPreview}
            />
          </div>
        </div>
        
        <div style={{width: '30%'}} className="bg-white/95 backdrop-blur-sm border border-gray-200/50 h-full relative shadow-xl rounded-3xl overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-auto custom-scrollbar">
              <div className="space-y-8">
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
                pipeLength={selectionData.pipeLength}
                electricalPoints={selectionData.electricalPoints}
                poleCount={selectionData.poleCount}
                onQuoteRequest={() => setIsQuoteModalOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout - โครงสร้างใหม่ที่เรียบง่าย */}
      <div className="lg:hidden p-4 mt-4">
        {/* Preview Section - ก่อนเลือกวัสดุ */}
        {!selectionData.material && (
          <div className="mb-4 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl">
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
        )}
        
        {/* Selector Section - แสดงเสมอ */}
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl mb-4">
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
        </div>
        
        {/* Price Summary - เมื่อมีข้อมูลครบ */}
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
            pipeLength={selectionData.pipeLength}
            electricalPoints={selectionData.electricalPoints}
            isMobile={true}
            onQuoteRequest={() => setIsQuoteModalOpen(true)}
          />
        )}
      </div>
      
      {/* Quote Request Modal */}
      {selectionData.material && selectionData.size && totalPrice > 0 && (
        <QuoteRequestModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
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
          pipeLength={selectionData.pipeLength}
          electricalPoints={selectionData.electricalPoints}
          poleCount={selectionData.poleCount}
        />
      )}
    </main>
  );
}