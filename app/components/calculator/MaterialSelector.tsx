"use client";

import { useState, useEffect } from "react";
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
  onSelectionChange: (data: {
    material: Material | null;
    size: Size | null;
    dimensions: { width: number; length: number };
    hasColumn: boolean | null;
    selectedServices: string[];
    selectedServiceOptions: Record<string, string>;
    selectedExtras: Record<string, string>;
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
    });
  }, [
    selectedMaterial,
    selectedSize,
    dimensions,
    hasColumn,
    selectedServices,
    selectedServiceOptions,
    selectedExtras,
    onSelectionChange,
  ]);

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
  };

  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
    setDimensions({ width: 0, length: 0 });
    setHasColumn(null);
    setSelectedServices([]);
    setSelectedServiceOptions({});
    setSelectedExtras({});
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
            <div className="-mx-3 px-3 bg-white border-b border-gray-100 py-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-6 bg-blue-500 rounded-full" />
                <h3 className="text-[15px] font-bold text-gray-800">บริการหลัก</h3>
              </div>
              <div className="space-y-3">
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
                      className={`p-4 rounded-lg border transition-all duration-150 ${
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
                          <div className="flex justify-between items-center gap-3">
                            <div className="min-w-0">
                              <div className="font-semibold text-gray-800 text-[14px] truncate">{service.name}</div>
                              <div className="text-[12px] text-gray-600 mt-0.5">{service.description}</div>
                            </div>
                            <div className="text-[15px] font-bold text-blue-600 shrink-0">
                              ฿{service.price.toLocaleString()}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center gap-3 mb-3">
                            <div className="min-w-0">
                              <div className="font-semibold text-gray-800 text-[14px] truncate">{service.name}</div>
                              <div className="text-[12px] text-gray-600">{service.description}</div>
                            </div>
                            <div className="text-[15px] font-bold text-blue-600 shrink-0">
                              ฿{service.price.toLocaleString()}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {/* @ts-ignore */}
                            {service.options.map((option: any) => (
                              <button
                                key={option.id}
                                className={`p-3 rounded-lg border transition-all duration-150 ${
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
                                <div className="flex items-center gap-2">
                                  {option.color && (
                                    <div
                                      className="w-3.5 h-3.5 rounded-full border border-gray-400"
                                      style={{ backgroundColor: option.color }}
                                    />
                                  )}
                                  <span className="text-[13px] font-semibold truncate">{option.name}</span>
                                </div>
                                {option.price > 0 && (
                                  <div className="text-[12px] text-blue-600 mt-1 font-bold">
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
