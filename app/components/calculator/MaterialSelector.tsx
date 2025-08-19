"use client";

import { useState, useEffect } from "react";
import { gutterMaterials, GutterMaterial } from "../../lib/materials/gutterMaterials";
import { Calculator, Zap, Shield, DollarSign, FileText, Check, Square, Lightbulb, Info } from 'lucide-react';

import type {
  Material,
  MaterialCategory,
  Size,
  Service,
  ServiceOption,
  ExtraService,
} from "../../lib/types";

interface MaterialSelectorProps {
  materials: Material[];
  categories: MaterialCategory[];
  mainServices: Service[];
  extraServices: ExtraService[];
  gutterMaterials: GutterMaterial[];
  onSelectionChange: (data: {
    material: Material | null;
    size: Size | null;
    dimensions: { width: number; length: number };
    hasColumn: boolean | null;
    selectedServices: string[];
    selectedServiceOptions: Record<string, string>;
    selectedExtras: Record<string, string>;
    gutterMaterials: Record<string, string>;
    pipeLength: Record<string, number>;
    electricalPoints: Record<string, number>;
    poleCount: number;
  }) => void;
}

/** Header step indicator — enhanced for better clarity */
const StepIndicator = ({
  currentStep,
  totalSteps,
  stepName,
}: {
  currentStep: number;
  totalSteps: number;
  stepName: string;
}) => (
  <div className="sticky top-0 inset-x-0 z-20">
    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-xl shadow-lg">
      <div className="px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-blue-600 font-bold text-xs sm:text-sm">
              {currentStep}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-white text-xs sm:text-sm leading-tight">
              {stepName}
            </h3>
            <p className="text-xs text-blue-100 mt-0.5 leading-tight">
              ขั้นตอนที่ {currentStep}/{totalSteps} ({Math.round((currentStep / totalSteps) * 100)}%)
            </p>
          </div>
        </div>
        <div className="mt-1.5 sm:mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

// Utility
const buttonClass = (isSelected: boolean, disabled?: boolean) =>
  `w-full p-2 rounded-lg border transition-all duration-150 text-left hover:translate-y-[-1px] ${
    disabled
      ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
      : isSelected
      ? "border-blue-500 bg-blue-50 shadow"
      : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/40"
  }`;

/** Enhanced empty state with clear call-to-action */
const EmptyState = () => (
  <div className="px-3 sm:px-4 py-3 sm:py-4">
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-3 sm:p-4 shadow-sm">
      <div className="text-center mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
          <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1.5 leading-tight">
          คำนวณราคากันสาด
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-2 sm:mb-3 px-2">
          6 ขั้นตอน คำนวณง่าย ราคาชัดเจน
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 sm:p-3 mb-2 sm:mb-3">
          <p className="text-blue-800 text-xs text-center font-medium leading-relaxed">
            💡 เลื่อนลงเพื่อเริ่มเลือกวัสดุ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 sm:p-3 bg-white rounded-xl border border-gray-200 text-center">
          <div className="flex justify-center mb-1">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
          </div>
          <div className="text-xs text-gray-600 mb-0.5">ติดตั้งไว</div>
          <div className="text-xs font-semibold text-gray-800 leading-tight">เสร็จใน 1 วัน</div>
        </div>
        <div className="p-2 sm:p-3 bg-white rounded-xl border border-gray-200 text-center">
          <div className="flex justify-center mb-1">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
          </div>
          <div className="text-xs text-gray-600 mb-0.5">รับประกัน</div>
          <div className="text-xs font-semibold text-gray-800 leading-tight">สูงสุด 5 ปี</div>
        </div>
        <div className="p-2 sm:p-3 bg-white rounded-xl border border-gray-200 text-center">
          <div className="flex justify-center mb-1">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
          </div>
          <div className="text-xs text-gray-600 mb-0.5">ราคาเบื้องต้น</div>
          <div className="text-xs font-semibold text-gray-800 leading-tight">คำนวณได้</div>
        </div>
      </div>
    </div>
  </div>
);

export function MaterialSelector({
  materials,
  categories,
  mainServices,
  extraServices,
  gutterMaterials: gutterMaterialsProps,
  onSelectionChange,
}: MaterialSelectorProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, length: 0 });
  const [hasColumn, setHasColumn] = useState<boolean | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedServiceOptions, setSelectedServiceOptions] = useState<
    Record<string, string>
  >({});
  const [selectedExtras, setSelectedExtras] = useState<Record<string, string>>(
    {}
  );
  const [selectedGutterMaterials, setSelectedGutterMaterials] = useState<Record<string, string>>(
    {}
  );
  const [pipeLength, setPipeLength] = useState<Record<string, number>>({});
  const [electricalPoints, setElectricalPoints] = useState<Record<string, number>>({});
  const [poleCount, setPoleCount] = useState<number>(1); // เพิ่ม state สำหรับจำนวนเสา

  const filteredMaterials = selectedType
    ? materials.filter((m) => m.type === selectedType)
    : [];
  const area = dimensions.width * dimensions.length;

  // Enhanced scroll function for both mobile and desktop
  const scrollToNextStep = (targetId: string, delay = 200) => {
    console.log(`scrollToNextStep called with targetId: ${targetId}, delay: ${delay}`);
    
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      console.log(`Target element found:`, targetElement);
      
      if (targetElement) {
        // For mobile devices, use more reliable scrolling
        const isMobile = window.innerWidth < 1024; // Changed from 768 to 1024
        console.log(`Device is mobile: ${isMobile}, window width: ${window.innerWidth}`);
        
        if (isMobile) {
          // Mobile scroll with enhanced behavior
          console.log(`Scrolling to ${targetId} on mobile`);
          
          // First attempt - native scrollIntoView
          targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          
          // Second attempt with manual calculation
          setTimeout(() => {
            const rect = targetElement.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetTop = rect.top + scrollTop - 80; // Increased padding to 80px
            
            window.scrollTo({
              top: targetTop,
              behavior: 'smooth'
            });
            
            console.log(`Manual scroll to position: ${targetTop}`);
          }, 150);
          
          // Third attempt for stubborn mobile browsers
          setTimeout(() => {
            const finalRect = targetElement.getBoundingClientRect();
            console.log(`Final position check - top: ${finalRect.top}`);
            if (finalRect.top > 100) { // If still not in good position
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const finalTop = finalRect.top + scrollTop - 60;
              window.scrollTo({
                top: finalTop,
                behavior: 'smooth'
              });
              console.log(`Final adjustment scroll to: ${finalTop}`);
            }
          }, 300);
        } else {
          // Desktop scroll
          targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          console.log(`Desktop scroll completed for ${targetId}`);
        }
      } else {
        console.error(`Element with ID '${targetId}' not found!`);
      }
    }, delay);
  };

  // defaults when material changes
  useEffect(() => {
    if (selectedMaterial) {
      const defaultServices = mainServices
        // @ts-ignore optional in your data
        .filter((s) => s.isSelectedByDefault)
        .map((s) => s.id);
      setSelectedServices(defaultServices);

      const defaultOptions: Record<string, string> = {};
      mainServices.forEach((service) => {
        // @ts-ignore options optional
        const opts = service.options as ServiceOption[] | undefined;
        const def = opts?.find((o) => (o as any).isDefault);
        if (def) defaultOptions[service.id] = def.id;
      });
      setSelectedServiceOptions(defaultOptions);
    }
  }, [selectedMaterial, mainServices]);

  // bubble up
  useEffect(() => {
    onSelectionChange({
      material: selectedMaterial,
      size: selectedSize,
      dimensions,
      hasColumn,
      selectedServices,
      selectedServiceOptions,
      selectedExtras,
      gutterMaterials: selectedGutterMaterials,
      pipeLength,
      electricalPoints,
      poleCount,
    });
  }, [
    selectedMaterial,
    selectedSize,
    dimensions,
    hasColumn,
    selectedServices,
    selectedServiceOptions,
    selectedExtras,
    selectedGutterMaterials,
    pipeLength,
    electricalPoints,
    poleCount,
    onSelectionChange,
  ]);

  // Debug gutterMaterials
  useEffect(() => {
    console.log('=== DEBUG GUTTER MATERIALS ===');
    console.log('All gutterMaterials (imported):', gutterMaterials);
    console.log('Props gutterMaterials:', gutterMaterialsProps);
    console.log('Length (imported):', gutterMaterials.length);
    console.log('Length (props):', gutterMaterialsProps?.length || 'undefined');
    console.log('Categories (imported):', gutterMaterials.map(g => g.category));
    console.log('Special category items (imported):', gutterMaterials.filter(g => g.category === 'special'));
    console.log('Standard category items (imported):', gutterMaterials.filter(g => g.category === 'standard'));
    console.log('Vinyl category items (imported):', gutterMaterials.filter(g => g.category === 'vinyl'));
    console.log('==============================');
  }, []); // ลบ dependency ออกเพื่อรันครั้งเดียว

  const getCurrentStep = () => {
    if (!selectedType) return 1;
    if (!selectedMaterial) return 2;
    if (!selectedSize) return 3;
    if (!dimensions.width || !dimensions.length) return 4;
    if (hasColumn === null) return 5;
    return 6;
  };

  const getStepName = () => {
    const step = getCurrentStep();
    switch (step) {
      case 1:
        return "🏗️ เลือกวัสดุ";
      case 2:
        return "🎯 เลือกชนิด";
      case 3:
        return "📏 เลือกขนาด";
      case 4:
        return "📐 ระบุขนาดพื้นที่";
      case 5:
        return "⚙️ รูปแบบการติดตั้ง";
      case 6:
        return "🛠️ บริการเสริม";
      default:
        return "✅ คำนวณราคา";
    }
  };

  const handleMaterialSelect = (material: Material | null) => {
    setSelectedMaterial(material);
    setSelectedSize(null);
    setDimensions({ width: 0, length: 0 });
    setHasColumn(null);
    setSelectedServices([]);
    setSelectedServiceOptions({});
    setSelectedExtras({});
    setSelectedGutterMaterials({});
    setPipeLength({}); // รีเซ็ตความยาวท่อน้ำ
    
    // Auto scroll to size selection step
    if (material) {
      scrollToNextStep('step-size');
    }
  };

  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
    setDimensions({ width: 0, length: 0 });
    setHasColumn(null);
    setSelectedServices([]);
    setSelectedServiceOptions({});
    setSelectedExtras({});
    setSelectedGutterMaterials({});
    setPipeLength({}); // รีเซ็ตความยาวท่อน้ำ
    
    // Auto scroll to dimensions step
    scrollToNextStep('step-dimensions');
  };

  const handleTypeSelect = (categoryId: string) => {
    console.log(`Type selected: ${categoryId}`);
    setSelectedType(categoryId);
    if (selectedMaterial?.type !== categoryId) {
      handleMaterialSelect(null);
    }
    
    // Auto scroll to material selection step with proper timing
    console.log('Triggering scroll to step-material');
    
    // Wait for the step-material element to be rendered, then scroll
    setTimeout(() => {
      const checkAndScroll = (attempts = 0) => {
        const element = document.getElementById('step-material');
        if (element && attempts < 10) {
          console.log(`step-material element found after ${attempts} attempts`);
          scrollToNextStep('step-material', 0); // Immediate scroll once found
        } else if (attempts < 10) {
          console.log(`step-material not found, attempt ${attempts + 1}`);
          setTimeout(() => checkAndScroll(attempts + 1), 100);
        } else {
          console.error('step-material element not found after 10 attempts');
        }
      };
      checkAndScroll();
    }, 100); // Small delay to allow React to render the conditional element
  };

  const handleColumnSelect = (hasColumnValue: boolean) => {
    setHasColumn(hasColumnValue);
    
    // Auto scroll to services step
    scrollToNextStep('step-services');
  };

  return (
    <div
      id="material-selector"
      className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white"
    >
      <style jsx>{`
        .scrollbar-hide {
          -webkit-scrollbar: none;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Header full-bleed */}
      <div className="">
        <StepIndicator
          currentStep={getCurrentStep()}
          totalSteps={6}
          stepName={getStepName()}
        />
      </div>

      <div
        className="flex-1 overflow-y-auto px-0 py-0 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Empty state — full-bleed */}
        {!selectedType && <EmptyState />}

        {/* Step 1 — Enhanced material type selection */}
        <div id="step-type" className="px-3 sm:px-4 bg-white border-b border-gray-100 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-2 sm:w-3 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">
                ขั้นตอนที่ 1: เลือกวัสดุ
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 leading-tight">เลือกประเภทวัสดุ</p>
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`w-full p-2 sm:p-3 rounded-xl border-2 transition-all duration-200 text-left hover:translate-y-[-2px] hover:shadow-lg ${
                  selectedType === category.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50"
                }`}
                onClick={() => {
                  handleTypeSelect(category.id);
                }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                    selectedType === category.id 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    <span className="text-sm sm:text-base font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm sm:text-base leading-tight mb-1">
                      {category.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-200 flex-shrink-0 ${
                    selectedType === category.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 bg-white"
                  }`}>
                    {selectedType === category.id && (
                      <Check className="w-full h-full text-white p-0.5" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Next step hint */}
          {selectedType && (
            <div className="mt-3 sm:mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-green-800 font-semibold text-xs sm:text-sm">เยี่ยม! ขั้นตอนถัดไป</p>
                  <p className="text-green-700 text-xs sm:text-sm leading-tight">เลือกชนิดวัสดุ</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 2 — Enhanced material selection */}
        {selectedType && (
          <div id="step-material" className="px-3 sm:px-4 bg-white border-b border-gray-100 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-2 sm:w-3 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">
                  ขั้นตอนที่ 2: เลือกชนิด
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 leading-tight">เลือกวัสดุที่เหมาะสม</p>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3 max-h-80 sm:max-h-96 overflow-y-auto scrollbar-hide">
              {filteredMaterials.map((material, index) => (
                <button
                  key={material.id}
                  className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left hover:translate-y-[-2px] hover:shadow-lg ${
                    selectedMaterial?.id === material.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50"
                  }`}
                  onClick={() => handleMaterialSelect(material)}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      selectedMaterial?.id === material.id 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      <span className="text-base sm:text-xl font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base leading-tight truncate">
                        {material.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 leading-tight">คุณภาพสูง ทนทาน</p>
                    </div>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-200 flex-shrink-0 ${
                      selectedMaterial?.id === material.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 bg-white"
                    }`}>
                      {selectedMaterial?.id === material.id && (
                        <Check className="w-full h-full text-white p-0.5" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Next step hint */}
            {selectedMaterial && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-green-800 font-semibold text-xs sm:text-sm">เลือกแล้ว! ขั้นตอนถัดไป</p>
                    <p className="text-green-700 text-xs sm:text-sm leading-tight">เลือกขนาด</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3 — Enhanced size selection */}
        {selectedMaterial && (
          <div id="step-size" className="px-3 sm:px-4 bg-white border-b border-gray-100 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-2 sm:w-3 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">
                  ขั้นตอนที่ 3: เลือกขนาด
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 leading-tight">เลือกขนาดที่เหมาะสม</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {["M", "M+", "L", "L+", "Stainless S", "Stainless M"].map((sizeName) => {
                const size = selectedMaterial.sizes.find((s) => s.name === sizeName);
                const price = size ? selectedMaterial.pricePerSqm[size.id] : 0;
                const isAvailable = !!(size && price && price > 0);

                return (
                  <button
                    key={sizeName}
                    className={`p-2 sm:p-3 rounded-xl border-2 text-center transition-all duration-200 hover:translate-y-[-2px] ${
                      selectedSize?.name === sizeName
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : isAvailable
                        ? "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50 hover:shadow-lg"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                    }`}
                    onClick={() => {
                      if (isAvailable && size) handleSizeSelect(size);
                    }}
                    disabled={!isAvailable}
                  >
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      selectedSize?.name === sizeName
                        ? "bg-blue-500 text-white"
                        : isAvailable
                        ? "bg-gray-100 text-gray-600"
                        : "bg-gray-200 text-gray-400"
                    }`}>
                      <FileText className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="font-bold text-gray-800 text-xs sm:text-base mb-1 sm:mb-2 leading-tight">{sizeName}</div>
                    {isAvailable ? (
                      <>
                        <div className="text-sm sm:text-lg font-bold text-blue-600 mb-0.5 sm:mb-1">฿{price.toLocaleString()}</div>
                        <div className="text-xs sm:text-sm text-gray-500">ต่อ ตร.ม.</div>
                      </>
                    ) : (
                      <div className="text-xs sm:text-sm text-gray-400 font-medium leading-tight">ไม่มีขาย<br className="sm:hidden"/>ในขนาดนี้</div>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Next step hint */}
            {selectedSize && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-green-800 font-semibold text-xs sm:text-sm">ดีมาก! ขั้นตอนถัดไป</p>
                    <p className="text-green-700 text-xs sm:text-sm leading-tight">กรอกขนาดพื้นที่ที่ต้องการติดตั้ง</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4 — Enhanced dimensions input */}
        {selectedSize && (
          <div id="step-dimensions" className="px-3 sm:px-4 bg-white border-b border-gray-100 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-2 sm:w-3 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">
                  ขั้นตอนที่ 4: ระบุพื้นที่
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 leading-tight">กรอกความกว้างและความยาวของพื้นที่</p>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <span>ความกว้าง (เมตร)</span>
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm sm:text-base font-medium transition-all placeholder-gray-400"
                      placeholder="เช่น 5.0"
                      value={dimensions.width || ""}
                      onChange={(e) =>
                        setDimensions({
                          width: parseFloat(e.target.value) || 0,
                          length: dimensions.length,
                        })
                      }
                    />
                    <div className="absolute right-2 top-2 sm:right-3 sm:top-3 text-gray-500 text-xs sm:text-sm font-medium">ม.</div>
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <span>ความยาว (เมตร)</span>
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-sm sm:text-base font-medium transition-all placeholder-gray-400"
                      placeholder="เช่น 10.0"
                      value={dimensions.length || ""}
                      onChange={(e) =>
                        setDimensions({
                          width: dimensions.width,
                          length: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                    <div className="absolute right-2 top-2 sm:right-3 sm:top-3 text-gray-500 text-xs sm:text-sm font-medium">ม.</div>
                  </div>
                </div>
              </div>

              {/* Area calculation display */}
              {area > 0 && (
                <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 shadow-sm">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Square className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-blue-700 font-medium">พื้นที่รวมทั้งหมด</div>
                      <div className="text-lg sm:text-2xl font-bold text-blue-600">
                        {area.toFixed(2)} ตารางเมตร
                      </div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-blue-600">
                    {dimensions.width} × {dimensions.length} = {area.toFixed(2)} ตร.ม.
                  </div>
                </div>
              )}
              
              {/* Helper info */}
              <div className="p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Info className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-amber-800 font-semibold text-xs sm:text-sm mb-1">💡 เคล็ดลับการวัด</p>
                    <ul className="text-amber-700 text-xs sm:text-sm space-y-0.5 sm:space-y-1 list-disc list-inside leading-tight">
                      <li>วัดจากขอบถึงขอบของพื้นที่ที่ต้องการติดตั้ง</li>
                      <li>สามารถกรอกทศนิยมได้ เช่น 5.5 เมตร</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Next step hint */}
            {area > 0 && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-green-800 font-semibold text-xs sm:text-sm">สุดยอด! ขั้นตอนถัดไป</p>
                    <p className="text-green-700 text-xs sm:text-sm leading-tight">เลือกการติดตั้ง</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5 — full-bleed */}
        {selectedSize && dimensions.width > 0 && dimensions.length > 0 && (
          <div id="step-installation" className="px-2 sm:px-3 bg-white border-b border-gray-100 py-2 sm:py-3">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <div className="w-1.5 sm:w-2 h-5 sm:h-6 bg-blue-500 rounded-full" />
              <h3 className="text-sm sm:text-[15px] font-bold text-gray-800">รูปแบบติดตั้ง</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                className={`p-3 sm:p-4 rounded-lg border text-center transition-all duration-150 ${
                  hasColumn === true
                    ? "border-blue-500 bg-blue-50 shadow"
                    : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/40"
                }`}
                onClick={() => setHasColumn(true)}
              >
                <div className="font-bold text-gray-700 text-xs sm:text-[14px] mb-0.5">แบบมีเสา</div>
                <div className="text-[10px] sm:text-[12px] text-gray-600 leading-tight">มีเสาค้ำยัน</div>
              </button>
              <button
                className={`p-3 sm:p-4 rounded-lg border text-center transition-all duration-150 ${
                  hasColumn === false
                    ? "border-blue-500 bg-blue-50 shadow"
                    : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/40"
                }`}
                onClick={() => setHasColumn(false)}
              >
                <div className="font-bold text-gray-700 text-xs sm:text-[14px] mb-0.5">แบบไร้เสา</div>
                <div className="text-[10px] sm:text-[12px] text-gray-600 leading-tight">ไม่มีเสาค้ำยัน</div>
              </button>
            </div>
          </div>
        )}

        {/* Step 6 — full-bleed */}
        {selectedSize && dimensions.width > 0 && dimensions.length > 0 && (
          <>
            <div id="step-services" className="px-2 sm:px-3 bg-white border-b border-gray-100 py-2 sm:py-3">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <div className="w-1.5 sm:w-2 h-4 sm:h-5 bg-blue-500 rounded-full" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">บริการหลัก</h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                {mainServices
                  .filter((service) => {
                    // @ts-ignore optional fields exist in data
                    const sizeOk = !service.requiresSize || service.requiresSize === selectedSize?.id;
                    const installationOk = hasColumn === null || (hasColumn === false ? service.id !== "poles" : true);
                    return sizeOk && installationOk;
                  })
                  .map((service) => (
                    <div
                      key={service.id}
                      className={`p-2 sm:p-3 rounded-lg border transition-all duration-150 ${
                        selectedServices.includes(service.id)
                          ? "border-blue-500 bg-blue-50 shadow"
                          : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/40"
                      }`}
                    >
                      {/* @ts-ignore options optional */}
                      {!service.options ? (
                        <button
                          className="w-full text-left"
                          onClick={() => {
                            const newServices = selectedServices.includes(service.id)
                              ? selectedServices.filter((id) => id !== service.id)
                              : [...selectedServices, service.id];
                            setSelectedServices(newServices);
                          }}
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="min-w-0">
                              <div className="font-semibold text-gray-800 text-base sm:text-lg truncate">{service.name}</div>
                              <div className="text-sm sm:text-base text-gray-600 leading-tight">{service.description}</div>
                            </div>
                            <div className="text-base sm:text-lg font-bold text-blue-600 shrink-0">
                              {service.price ? `฿${service.price.toLocaleString()}` : 'ตามพื้นที่'}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center gap-2 mb-1.5 sm:mb-2">
                            <div className="min-w-0">
                              <div className="font-semibold text-gray-800 text-base sm:text-lg truncate">{service.name}</div>
                              <div className="text-sm sm:text-base text-gray-600 leading-tight">{service.description}</div>
                            </div>
                            <div className="text-base sm:text-lg font-bold text-blue-600 shrink-0">
                              {service.price ? `฿${service.price.toLocaleString()}` : 'ตามพื้นที่'}
                            </div>
                          </div>

                          {/* เพิ่มช่องกรอกจำนวนเสาสำหรับ poles service */}
                          {service.id === 'poles' && selectedServices.includes(service.id) && (
                            <div className="mb-2 p-2 bg-blue-50 rounded-md border border-blue-200">
                              <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700 shrink-0">จำนวนเสา:</label>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    className="w-6 h-6 rounded bg-blue-100 border border-blue-300 flex items-center justify-center hover:bg-blue-200 text-blue-700 font-bold"
                                    onClick={() => setPoleCount(Math.max(1, poleCount - 1))}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    value={poleCount}
                                    onChange={(e) => setPoleCount(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-12 h-6 text-center text-sm border border-gray-300 rounded px-1"
                                    min="1"
                                    max="20"
                                  />
                                  <button
                                    type="button"
                                    className="w-6 h-6 rounded bg-blue-100 border border-blue-300 flex items-center justify-center hover:bg-blue-200 text-blue-700 font-bold"
                                    onClick={() => setPoleCount(Math.min(20, poleCount + 1))}
                                  >
                                    +
                                  </button>
                                  <span className="text-xs text-gray-600 ml-1">ต้น</span>
                                </div>
                              </div>
                              <div className="text-xs text-blue-700 mt-1">
                                ราคารวม: ฿{(
                                  poleCount * (
                                    selectedServiceOptions[service.id] ? 
                                    (service.options?.find((opt: any) => opt.id === selectedServiceOptions[service.id])?.price || 0) : 
                                    (service.options?.[0]?.price || 0)
                                  )
                                ).toLocaleString()}
                              </div>
                            </div>
                          )}

                          <div className="space-y-1 sm:space-y-1.5">
                            {/* @ts-ignore */}
                            {service.options.map((option: any) => (
                              <button
                                key={option.id}
                                className={`w-full p-1.5 sm:p-2 rounded-md border transition-all duration-150 text-left ${
                                  selectedServiceOptions[service.id] === option.id
                                    ? "border-blue-500 bg-blue-50 shadow"
                                    : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/40"
                                }`}
                                onClick={() => {
                                  const newOptions = { ...selectedServiceOptions };
                                  const newServices = [...selectedServices];

                                  if (selectedServiceOptions[service.id] === option.id) {
                                    delete newOptions[service.id];
                                    const idx = newServices.indexOf(service.id);
                                    if (idx > -1) newServices.splice(idx, 1);
                                  } else {
                                    newOptions[service.id] = option.id;
                                    if (!newServices.includes(service.id)) newServices.push(service.id);
                                  }

                                  setSelectedServiceOptions(newOptions);
                                  setSelectedServices(newServices);
                                }}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                    {option.color && (
                                      <div
                                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-gray-400 flex-shrink-0"
                                        style={{ backgroundColor: option.color }}
                                      />
                                    )}
                                    <span className="text-sm sm:text-base font-medium leading-tight truncate">{option.name}</span>
                                  </div>
                                  {option.price > 0 && (
                                    <div className="text-sm sm:text-base text-blue-600 font-semibold flex-shrink-0">
                                      +฿{option.price.toLocaleString()}
                                    </div>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Extra services — full-bleed */}
            <div className="px-2 sm:px-3 bg-white py-2 sm:py-3 pb-4 sm:pb-6">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <div className="w-1.5 sm:w-2 h-5 sm:h-6 bg-blue-500 rounded-full" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">บริการเสริม (ตัวเลือก)</h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                {extraServices
                  .filter((service) => (hasColumn === false ? !service.id.includes("column") : true))
                  .map((service) => (
                    <div 
                      key={service.id} 
                      className={`p-2 sm:p-3 rounded-lg border transition-all duration-150 ${
                        selectedExtras[service.id]
                          ? "border-blue-500 bg-blue-50 shadow"
                          : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/40"
                      }`}
                    >
                      <div className="mb-0.5 sm:mb-1">
                        <div className="font-semibold text-gray-800 text-base sm:text-lg truncate">{service.name}</div>
                        <div className="text-sm sm:text-base text-gray-600 truncate leading-tight">{service.description}</div>
                      </div>
                      
                      {/* ถ้าเป็นบริการรางน้ำ ให้ใช้ gutterMaterials แทน service.options */}
                      {service.id === 'gutter' ? (
                        <div className="space-y-1.5 sm:space-y-2">
                          <select
                            className="w-full p-2 sm:p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white text-sm sm:text-base font-medium transition-all"
                            value={selectedGutterMaterials[service.id] || ""}
                            onChange={(e) => {
                              if (e.target.value) {
                                setSelectedExtras({
                                  ...selectedExtras,
                                  [service.id]: 'selected',
                                });
                                setSelectedGutterMaterials({
                                  ...selectedGutterMaterials,
                                  [service.id]: e.target.value,
                                });
                              } else {
                                // ถ้าเลือก "ไม่ต้องการ" ให้ลบทั้งสอง
                                const newExtras = { ...selectedExtras };
                                const newGutterMaterials = { ...selectedGutterMaterials };
                                delete newExtras[service.id];
                                delete newGutterMaterials[service.id];
                                setSelectedExtras(newExtras);
                                setSelectedGutterMaterials(newGutterMaterials);
                              }
                            }}
                          >
                            <option value="">ไม่ต้องการ</option>
                            
                            {/* รางน้ำพับพิเศษ */}
                            <optgroup label="รางน้ำพับพิเศษ">
                              {gutterMaterials
                                .filter(gutter => gutter.category === 'special')
                                .map((gutter) => (
                                  <option key={gutter.id} value={gutter.id}>
                                    {gutter.name} - ฿{gutter.price.toLocaleString()}/ม.
                                  </option>
                                ))}
                            </optgroup>

                            {/* รางน้ำมาตรฐาน */}
                            <optgroup label="รางน้ำมาตรฐาน">
                              {gutterMaterials
                                .filter(gutter => gutter.category === 'standard')
                                .map((gutter) => (
                                  <option key={gutter.id} value={gutter.id}>
                                    {gutter.name} - ฿{gutter.price.toLocaleString()}/ม.
                                  </option>
                                ))}
                            </optgroup>

                            {/* รางน้ำไวนิล */}
                            <optgroup label="รางน้ำไวนิล">
                              {gutterMaterials
                                .filter(gutter => gutter.category === 'vinyl')
                                .map((gutter) => (
                                  <option key={gutter.id} value={gutter.id}>
                                    {gutter.name} - ฿{gutter.price.toLocaleString()}/ม.
                                  </option>
                                ))}
                            </optgroup>
                          </select>
                          
                          {/* แสดงราคารวมรางน้ำ */}
                          {selectedGutterMaterials[service.id] && dimensions.length > 0 && (
                            <div className="mt-1.5 sm:mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="text-[10px] sm:text-[12px] text-blue-700">
                                {(() => {
                                  const selectedGutter = gutterMaterials.find(g => g.id === selectedGutterMaterials[service.id]);
                                  const totalGutterPrice = selectedGutter ? selectedGutter.price * dimensions.length : 0;
                                  return (
                                    <div className="flex justify-between">
                                      <span>ราคารางน้ำ ({dimensions.length} เมตร):</span>
                                      <span className="font-semibold">฿{totalGutterPrice.toLocaleString()}</span>
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : service.id === 'pipe' && service.requiresLength ? (
                        /* ส่วนจัดการท่อน้ำพิเศษ */
                        <div className="space-y-1.5 sm:space-y-2">
                          <select
                            className="w-full p-2 sm:p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white text-xs sm:text-[13px] font-medium transition-all"
                            value={selectedExtras[service.id] || ""}
                            onChange={(e) => {
                              if (e.target.value) {
                                setSelectedExtras({
                                  ...selectedExtras,
                                  [service.id]: e.target.value,
                                });
                                // ตั้งค่าเริ่มต้นเป็นความยาวขั้นต่ำ
                                if (!pipeLength[service.id]) {
                                  setPipeLength({
                                    ...pipeLength,
                                    [service.id]: service.minimumLength || 3,
                                  });
                                }
                              } else {
                                // ถ้าเลือก "ไม่ต้องการ" ให้ลบทั้งสอง
                                const newExtras = { ...selectedExtras };
                                const newPipeLength = { ...pipeLength };
                                delete newExtras[service.id];
                                delete newPipeLength[service.id];
                                setSelectedExtras(newExtras);
                                setPipeLength(newPipeLength);
                              }
                            }}
                          >
                            <option value="">ไม่ต้องการ</option>
                            {service.options.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name} - ฿{option.price.toLocaleString()}/ม.
                              </option>
                            ))}
                          </select>
                          
                          {/* ช่องกรอกความยาวท่อน้ำ */}
                          {selectedExtras[service.id] && (
                            <div className="space-y-1.5 sm:space-y-2">
                              <div>
                                <label className="block text-[10px] sm:text-[12px] text-gray-700 mb-1 font-medium leading-tight">
                                  ความยาวท่อน้ำ (เมตร) - ขั้นต่ำ {service.minimumLength || 3} เมตร
                                </label>
                                <input
                                  type="number"
                                  min={service.minimumLength || 3}
                                  step="0.1"
                                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-xs sm:text-[13px] font-medium transition-all"
                                  placeholder={`${service.minimumLength || 3}.0`}
                                  value={pipeLength[service.id] || ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "") {
                                      // อนุญาตให้ลบเป็นค่าว่าง
                                      const newPipeLength = { ...pipeLength };
                                      delete newPipeLength[service.id];
                                      setPipeLength(newPipeLength);
                                    } else {
                                      const length = parseFloat(value);
                                      if (!isNaN(length)) {
                                        const minLength = service.minimumLength || 3;
                                        setPipeLength({
                                          ...pipeLength,
                                          [service.id]: Math.max(length, minLength),
                                        });
                                      }
                                    }
                                  }}
                                />
                              </div>
                              
                              {/* แสดงราคารวมท่อน้ำ */}
                              {pipeLength[service.id] && selectedExtras[service.id] && (
                                <div className="p-1.5 sm:p-2 bg-orange-50 rounded-lg border border-orange-200">
                                  <div className="text-[10px] sm:text-[12px] text-orange-700">
                                    {(() => {
                                      const selectedOption = service.options.find(opt => opt.id === selectedExtras[service.id]);
                                      const length = pipeLength[service.id] || 0;
                                      const pricePerMeter = selectedOption?.price || 0;
                                      const totalPrice = pricePerMeter * length;
                                      return (
                                        <div className="space-y-0.5 sm:space-y-1">
                                          <div className="flex justify-between">
                                            <span>ความยาว:</span>
                                            <span className="font-semibold">{length} เมตร</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>ราคารวม:</span>
                                            <span className="font-semibold">฿{totalPrice.toLocaleString()}</span>
                                          </div>
                                        </div>
                                      );
                                    })()}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : service.id === 'electrical' && service.requiresQuantity ? (
                        /* ส่วนจัดการงานไฟฟ้าพิเศษ */
                        <div className="space-y-2">
                          <select
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white text-[13px] font-medium transition-all"
                            value={selectedExtras[service.id] || ""}
                            onChange={(e) => {
                              if (e.target.value) {
                                setSelectedExtras({
                                  ...selectedExtras,
                                  [service.id]: e.target.value,
                                });
                                // ตั้งค่าเริ่มต้นเป็น 1 จุด
                                if (!electricalPoints[service.id]) {
                                  setElectricalPoints({
                                    ...electricalPoints,
                                    [service.id]: 1,
                                  });
                                }
                              } else {
                                // ถ้าเลือก "ไม่ต้องการ" ให้ลบทั้งสอง
                                const newExtras = { ...selectedExtras };
                                const newElectricalPoints = { ...electricalPoints };
                                delete newExtras[service.id];
                                delete newElectricalPoints[service.id];
                                setSelectedExtras(newExtras);
                                setElectricalPoints(newElectricalPoints);
                              }
                            }}
                          >
                            <option value="">ไม่ต้องการ</option>
                            {service.options.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name} - ฿{option.price.toLocaleString()}/{service.unit || 'จุด'}
                              </option>
                            ))}
                          </select>
                          
                          {/* ช่องกรอกจำนวนจุดไฟฟ้า */}
                          {selectedExtras[service.id] && (
                            <div className="space-y-2">
                              <div>
                                <label className="block text-[12px] text-gray-700 mb-1 font-medium">
                                  จำนวนจุดไฟฟ้า (ขั้นต่ำ 1 จุด)
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  step="1"
                                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-[13px] font-medium transition-all"
                                  placeholder="1"
                                  value={electricalPoints[service.id] || ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "") {
                                      // อนุญาตให้ลบเป็นค่าว่าง
                                      const newElectricalPoints = { ...electricalPoints };
                                      delete newElectricalPoints[service.id];
                                      setElectricalPoints(newElectricalPoints);
                                    } else {
                                      const points = parseInt(value);
                                      if (!isNaN(points)) {
                                        setElectricalPoints({
                                          ...electricalPoints,
                                          [service.id]: Math.max(points, 1),
                                        });
                                      }
                                    }
                                  }}
                                />
                              </div>
                              
                              {/* แสดงราคารวมงานไฟฟ้า */}
                              {electricalPoints[service.id] && selectedExtras[service.id] && (
                                <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                                  <div className="text-[12px] text-yellow-700">
                                    {(() => {
                                      const selectedOption = service.options.find(opt => opt.id === selectedExtras[service.id]);
                                      const points = electricalPoints[service.id] || 0;
                                      const pricePerPoint = selectedOption?.price || 0;
                                      const totalPrice = pricePerPoint * points;
                                      return (
                                        <div className="space-y-0.5 sm:space-y-1">
                                          <div className="flex justify-between">
                                            <span>จำนวนจุด:</span>
                                            <span className="font-semibold">{points} จุด</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>ราคาต่อจุด:</span>
                                            <span className="font-semibold">฿{pricePerPoint.toLocaleString()}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>ราคารวม:</span>
                                            <span className="font-semibold">฿{totalPrice.toLocaleString()}</span>
                                          </div>
                                        </div>
                                      );
                                    })()}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <select
                          className="w-full p-2 sm:p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white text-xs sm:text-[13px] font-medium transition-all"
                          value={selectedExtras[service.id] || ""}
                          onChange={(e) => {
                            setSelectedExtras({
                              ...selectedExtras,
                              [service.id]: e.target.value,
                            });
                          }}
                        >
                          <option value="">ไม่ต้องการ</option>
                          {service.options.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name} - ฿{option.price.toLocaleString()}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
