"use client";

import { useState, useEffect } from "react";
import { gutterMaterials, GutterMaterial } from "../../lib/materials/gutterMaterials";

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
    pipeLength: Record<string, number>; // เพิ่มการส่งความยาวท่อน้ำ
    electricalPoints: Record<string, number>; // เพิ่มการส่งจำนวนจุดไฟฟ้า
  }) => void;
}

/** Header step indicator — full width, compact, pretty */
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
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl shadow-md">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-sm leading-none">
              {currentStep}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-[13px] truncate">
              {stepName}
            </h3>
            <p className="text-[11px] text-blue-100">
              ขั้นที่ {currentStep} จาก {totalSteps}
            </p>
          </div>
        </div>
        <div className="mt-2 h-1.5 bg-white/25 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

// Utility
const buttonClass = (isSelected: boolean, disabled?: boolean) =>
  `w-full p-3 rounded-lg border transition-all duration-150 text-left hover:translate-y-[-1px] ${
    disabled
      ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
      : isSelected
      ? "border-blue-500 bg-blue-50 shadow"
      : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/40"
  }`;

/** Empty state — โชว์เมื่อยังไม่เลือกประเภทวัสดุ */
const EmptyState = () => (
  <div className="-mx-3 px-3 py-3">
    <div className="bg-white rounded-xl border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-gray-800 text-[14px]">
          เริ่มต้นคำนวณราคา
        </div>
        <button
          className="px-3 py-1.5 text-[12px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] transition"
          onClick={() =>
            document
              .getElementById("step-type")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          เริ่มเลือกวัสดุ
        </button>
      </div>

      <ul className="mt-2 text-[12px] text-gray-600 space-y-1.5">
        <li>• เลือกประเภทวัสดุ → เลือกรุ่น/ขนาด → กรอกกว้าง×ยาว → เลือกบริการ</li>
        <li>• ระบบคำนวณพื้นที่และราคาให้อัตโนมัติ พร้อมแสดงสรุปท้ายหน้า</li>
      </ul>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-[11px] text-gray-600">ติดตั้งไว</div>
          <div className="text-[13px] font-semibold">เสร็จใน 1 วัน</div>
        </div>
        <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-[11px] text-gray-600">รับประกัน</div>
          <div className="text-[13px] font-semibold">สูงสุด 15 ปี</div>
        </div>
        <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-[11px] text-gray-600">คำนวณแม่น</div>
          <div className="text-[13px] font-semibold">อัปเดตราคาใหม่</div>
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

  const filteredMaterials = selectedType
    ? materials.filter((m) => m.type === selectedType)
    : [];
  const area = dimensions.width * dimensions.length;

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
        return "เลือกประเภทวัสดุ";
      case 2:
        return "เลือกชนิดวัสดุ";
      case 3:
        return "เลือกขนาดวัสดุ";
      case 4:
        return "ระบุขนาดพื้นที่";
      case 5:
        return "รูปแบบการติดตั้ง";
      case 6:
        return "เลือกบริการ";
      default:
        return "คำนวณราคา";
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
      <div className="-mx-3">
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

        {/* Step 1 — full-bleed */}
        <div id="step-type" className="-mx-3 px-3 bg-white border-b border-gray-100 py-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-6 bg-blue-500 rounded-full" />
            <h3 className="text-[15px] font-bold text-gray-800">
              เลือกประเภทวัสดุ
            </h3>
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={buttonClass(selectedType === category.id)}
                onClick={() => {
                  setSelectedType(category.id);
                  if (selectedMaterial?.type !== category.id)
                    handleMaterialSelect(null);
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3.5 h-3.5 rounded-full ${
                      selectedType === category.id ? "bg-blue-500" : "bg-gray-300"
                    } transition-all duration-150`}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-[14px] leading-tight">
                      {category.name}
                    </h4>
                    <p className="text-[12px] text-gray-600 mt-0.5 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — full-bleed */}
        {selectedType && (
          <div className="-mx-3 px-3 bg-white border-b border-gray-100 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-6 bg-blue-500 rounded-full" />
              <h3 className="text-[15px] font-bold text-gray-800">เลือกวัสดุ</h3>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-hide">
              {filteredMaterials.map((material) => (
                <button
                  key={material.id}
                  className={buttonClass(selectedMaterial?.id === material.id)}
                  onClick={() => handleMaterialSelect(material)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        selectedMaterial?.id === material.id ? "bg-blue-500" : "bg-gray-300"
                      } transition-all duration-150`}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-[14px] leading-tight truncate">
                        {material.name}
                      </h4>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — full-bleed */}
        {selectedMaterial && (
          <div className="-mx-3 px-3 bg-white border-b border-gray-100 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-6 bg-blue-500 rounded-full" />
              <h3 className="text-[15px] font-bold text-gray-800">เลือกขนาด</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["M", "M+", "L", "L+", "Stainless S", "Stainless M"].map((sizeName) => {
                const size = selectedMaterial.sizes.find((s) => s.name === sizeName);
                const price = size ? selectedMaterial.pricePerSqm[size.id] : 0;
                const isAvailable = !!(size && price && price > 0);

                return (
                  <button
                    key={sizeName}
                    className={`p-3 rounded-lg border text-center transition-all duration-150 ${
                      selectedSize?.name === sizeName
                        ? "border-blue-500 bg-blue-50 shadow"
                        : isAvailable
                        ? "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/40"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                    }`}
                    onClick={() => {
                      if (isAvailable && size) handleSizeSelect(size);
                    }}
                    disabled={!isAvailable}
                  >
                    <div className="font-bold text-gray-800 text-[14px] mb-1">{sizeName}</div>
                    {isAvailable ? (
                      <>
                        <div className="text-[15px] font-bold text-blue-600">฿{price.toLocaleString()}</div>
                        <div className="text-[12px] text-gray-500">/ตร.ม.</div>
                      </>
                    ) : (
                      <div className="text-[12px] text-gray-400 font-medium">ไม่รองรับ</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4 — full-bleed */}
        {selectedSize && (
          <div className="-mx-3 px-3 bg-white border-b border-gray-100 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-6 bg-blue-500 rounded-full" />
              <h3 className="text-[15px] font-bold text-gray-800">ระบุขนาดพื้นที่</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5 font-medium">ความกว้าง (เมตร)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-[14px] font-medium transition-all"
                    placeholder="0.0"
                    value={dimensions.width || ""}
                    onChange={(e) =>
                      setDimensions({
                        width: parseFloat(e.target.value) || 0,
                        length: dimensions.length,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5 font-medium">ความยาว (เมตร)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-[14px] font-medium transition-all"
                    placeholder="0.0"
                    value={dimensions.length || ""}
                    onChange={(e) =>
                      setDimensions({
                        width: dimensions.width,
                        length: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              {area > 0 && (
                <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow">
                  <div className="text-[15px] font-bold text-blue-600">
                    พื้นที่รวม: {area.toFixed(2)} ตร.ม.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5 — full-bleed */}
        {selectedSize && dimensions.width > 0 && dimensions.length > 0 && (
          <div className="-mx-3 px-3 bg-white border-b border-gray-100 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-6 bg-blue-500 rounded-full" />
              <h3 className="text-[15px] font-bold text-gray-800">รูปแบบติดตั้ง</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`p-4 rounded-lg border text-center transition-all duration-150 ${
                  hasColumn === true
                    ? "border-blue-500 bg-blue-50 shadow"
                    : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/40"
                }`}
                onClick={() => setHasColumn(true)}
              >
                <div className="font-bold text-gray-700 text-[14px] mb-0.5">แบบมีเสา</div>
                <div className="text-[12px] text-gray-600">มีเสาค้ำยัน</div>
              </button>
              <button
                className={`p-4 rounded-lg border text-center transition-all duration-150 ${
                  hasColumn === false
                    ? "border-blue-500 bg-blue-50 shadow"
                    : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/40"
                }`}
                onClick={() => setHasColumn(false)}
              >
                <div className="font-bold text-gray-700 text-[14px] mb-0.5">แบบไร้เสา</div>
                <div className="text-[12px] text-gray-600">ไม่มีเสาค้ำยัน</div>
              </button>
            </div>
          </div>
        )}

        {/* Step 6 — full-bleed */}
        {selectedSize && dimensions.width > 0 && dimensions.length > 0 && (
          <>
            <div className="-mx-3 px-3 bg-white border-b border-gray-100 py-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-5 bg-blue-500 rounded-full" />
                <h3 className="text-[14px] font-bold text-gray-800">บริการหลัก</h3>
              </div>
              <div className="space-y-2">
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
                      className={`p-3 rounded-lg border transition-all duration-150 ${
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
                              <div className="font-semibold text-gray-800 text-[13px] truncate">{service.name}</div>
                              <div className="text-[11px] text-gray-600 leading-tight">{service.description}</div>
                            </div>
                            <div className="text-[13px] font-bold text-blue-600 shrink-0">
                              {service.price ? `฿${service.price.toLocaleString()}` : 'ตามพื้นที่'}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center gap-2 mb-2">
                            <div className="min-w-0">
                              <div className="font-semibold text-gray-800 text-[13px] truncate">{service.name}</div>
                              <div className="text-[11px] text-gray-600 leading-tight">{service.description}</div>
                            </div>
                            <div className="text-[13px] font-bold text-blue-600 shrink-0">
                              {service.price ? `฿${service.price.toLocaleString()}` : 'ตามพื้นที่'}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5">
                            {/* @ts-ignore */}
                            {service.options.map((option: any) => (
                              <button
                                key={option.id}
                                className={`p-2 rounded-md border transition-all duration-150 ${
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
                                <div className="flex items-center gap-1.5">
                                  {option.color && (
                                    <div
                                      className="w-3 h-3 rounded-full border border-gray-400"
                                      style={{ backgroundColor: option.color }}
                                    />
                                  )}
                                  <span className="text-[12px] font-medium truncate">{option.name}</span>
                                </div>
                                {option.price > 0 && (
                                  <div className="text-[11px] text-blue-600 mt-0.5 font-semibold">
                                    +฿{option.price.toLocaleString()}
                                  </div>
                                )}
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
            <div className="-mx-3 px-3 bg-white py-4 pb-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-6 bg-blue-500 rounded-full" />
                <h3 className="text-[15px] font-bold text-gray-800">บริการเสริม (ตัวเลือก)</h3>
              </div>
              <div className="space-y-2">
                {extraServices
                  .filter((service) => (hasColumn === false ? !service.id.includes("column") : true))
                  .map((service) => (
                    <div key={service.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="mb-1">
                        <div className="font-medium text-gray-800 text-[13px] truncate">{service.name}</div>
                        <div className="text-[12px] text-gray-600 truncate">{service.description}</div>
                      </div>
                      
                      {/* ถ้าเป็นบริการรางน้ำ ให้ใช้ gutterMaterials แทน service.options */}
                      {service.id === 'gutter' ? (
                        <div className="space-y-2">
                          <select
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white text-[13px] font-medium transition-all"
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
                            <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="text-[12px] text-blue-700">
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
                            <div className="space-y-2">
                              <div>
                                <label className="block text-[12px] text-gray-700 mb-1 font-medium">
                                  ความยาวท่อน้ำ (เมตร) - ขั้นต่ำ {service.minimumLength || 3} เมตร
                                </label>
                                <input
                                  type="number"
                                  min={service.minimumLength || 3}
                                  step="0.1"
                                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-[13px] font-medium transition-all"
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
                                <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                                  <div className="text-[12px] text-orange-700">
                                    {(() => {
                                      const selectedOption = service.options.find(opt => opt.id === selectedExtras[service.id]);
                                      const length = pipeLength[service.id] || 0;
                                      const pricePerMeter = selectedOption?.price || 0;
                                      const totalPrice = pricePerMeter * length;
                                      return (
                                        <div className="space-y-1">
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
                                        <div className="space-y-1">
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
                          className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white text-[13px] font-medium transition-all"
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
