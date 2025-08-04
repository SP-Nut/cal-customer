'use client';

import { useState, useEffect } from 'react';


import type { Material, MaterialCategory, Size, Service, ServiceOption, ExtraService } from '../../lib/types';


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

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
}

function StepIndicator({ currentStep, totalSteps, stepName }: StepIndicatorProps) {
  return (
    <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">{currentStep}</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 text-sm">{stepName}</h3>
            <p className="text-xs text-gray-500">ขั้นที่ {currentStep} จาก {totalSteps}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MaterialSelector({
  materials,
  categories,
  mainServices,
  extraServices,
  onSelectionChange,
}: MaterialSelectorProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, length: 0 });
  const [hasColumn, setHasColumn] = useState<boolean | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedServiceOptions, setSelectedServiceOptions] = useState<Record<string, string>>({});
  const [selectedExtras, setSelectedExtras] = useState<Record<string, string>>({});

  const filteredMaterials = selectedType
    ? materials.filter((m) => m.type === selectedType)
    : [];

  const area = dimensions.width * dimensions.length;

  // Set default services when material is selected
  useEffect(() => {
    if (selectedMaterial) {
      const defaultServices = mainServices
        .filter(service => service.isSelectedByDefault)
        .map(service => service.id);
      setSelectedServices(defaultServices);
      
      // Set default service options
      const defaultOptions: Record<string, string> = {};
      mainServices.forEach(service => {
        if (service.options) {
          const defaultOption = service.options.find(opt => opt.isDefault);
          if (defaultOption) {
            defaultOptions[service.id] = defaultOption.id;
          }
        }
      });
      setSelectedServiceOptions(defaultOptions);
    }
  }, [selectedMaterial, mainServices]);

  // Update parent whenever any selection changes
  const updateParent = () => {
    onSelectionChange({
      material: selectedMaterial,
      size: selectedSize,
      dimensions,
      hasColumn,
      selectedServices,
      selectedServiceOptions,
      selectedExtras,
    });
  };

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
      case 1: return 'เลือกประเภทวัสดุ';
      case 2: return 'เลือกชนิดวัสดุ';
      case 3: return 'เลือกขนาดวัสดุ';
      case 4: return 'ระบุขนาดพื้นที่';
      case 5: return 'รูปแบบการติดตั้ง';
      case 6: return 'เลือกบริการ';
      default: return 'คำนวณราคา';
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
    setTimeout(updateParent, 0);
  };

  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
    setDimensions({ width: 0, length: 0 });
    setHasColumn(null);
    setSelectedServices([]);
    setSelectedServiceOptions({});
    setSelectedExtras({});
    setTimeout(updateParent, 0);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <StepIndicator 
        currentStep={getCurrentStep()} 
        totalSteps={6} 
        stepName={getStepName()} 
      />

      <div 
        className="flex-1 overflow-y-auto px-4 py-4 space-y-6"
      >
        {/* Step 1: Material Type Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">เลือกประเภทวัสดุ</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedType === category.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
                }`}
                onClick={() => {
                  setSelectedType(category.id);
                  if (selectedMaterial?.type !== category.id) {
                    handleMaterialSelect(null);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedType === category.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className="text-lg">
                      {category.id === 'translucent' ? '☀️' : '🏠'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{category.name}</h4>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Material Selection */}
        {selectedType && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">เลือกวัสดุ</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredMaterials.map((material) => (
                <button
                  key={material.id}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedMaterial?.id === material.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
                  }`}
                  onClick={() => handleMaterialSelect(material)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                      selectedMaterial?.id === material.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedMaterial?.id === material.id ? '✓' : '📦'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{material.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{material.description}</p>
                      <div className="text-sm font-semibold text-blue-600 mt-2">
                        เริ่มต้น ฿{Math.min(...Object.values(material.pricePerSqm).filter(p => p > 0)).toLocaleString()} ต่อ ตร.ม.
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Size Selection */}
        {selectedMaterial && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">เลือกขนาด</h3>
            <div className="grid grid-cols-1 gap-2">
              {selectedMaterial.sizes.map((size) => (
                <button
                  key={size.id}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedSize?.id === size.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{size.name}</div>
                      <div className="text-sm text-gray-500">{size.description}</div>
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      {selectedMaterial.pricePerSqm[size.id] > 0 
                        ? `฿${selectedMaterial.pricePerSqm[size.id].toLocaleString()}`
                        : '-'
                      }
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Dimensions Input */}
        {selectedSize && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">ระบุขนาดพื้นที่</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">ความกว้าง (เมตร)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="0.0"
                  value={dimensions.width || ''}
                  onChange={(e) => {
                    const newDimensions = {
                      width: parseFloat(e.target.value) || 0,
                      length: dimensions.length,
                    };
                    setDimensions(newDimensions);
                    setTimeout(updateParent, 0);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">ความยาว (เมตร)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="0.0"
                  value={dimensions.length || ''}
                  onChange={(e) => {
                    const newDimensions = {
                      width: dimensions.width,
                      length: parseFloat(e.target.value) || 0,
                    };
                    setDimensions(newDimensions);
                    setTimeout(updateParent, 0);
                  }}
                />
              </div>
            </div>
            {area > 0 && (
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-lg font-semibold text-blue-600">
                  พื้นที่รวม: {area.toFixed(2)} ตร.ม.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Installation Type */}
        {selectedSize && dimensions.width > 0 && dimensions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">รูปแบบติดตั้ง</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  hasColumn === true
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
                }`}
                onClick={() => {
                  setHasColumn(true);
                  setTimeout(updateParent, 0);
                }}
              >
                <div className="text-2xl mb-2">🏗️</div>
                <div className="font-medium text-gray-700">แบบมีเสา</div>
                <div className="text-sm text-gray-500 mt-1">มีเสาค้ำยัน</div>
              </button>
              <button
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  hasColumn === false
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
                }`}
                onClick={() => {
                  setHasColumn(false);
                  setTimeout(updateParent, 0);
                }}
              >
                <div className="text-2xl mb-2">🏠</div>
                <div className="font-medium text-gray-700">แบบไร้เสา</div>
                <div className="text-sm text-gray-500 mt-1">ไม่มีเสาค้ำยัน</div>
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Services */}
        {selectedSize && dimensions.width > 0 && dimensions.length > 0 && (
          <>
            {/* Main Services Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">บริการหลัก</h3>
              <div className="space-y-3">
                {mainServices
                  .filter(service => {
                    const sizeOk = !service.requiresSize || service.requiresSize === selectedSize?.id;
                    const installationOk = hasColumn === null || 
                      (hasColumn === false ? service.id !== 'poles' : true);
                    return sizeOk && installationOk;
                  })
                  .map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedServices.includes(service.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
                      }`}
                    >
                      {!service.options ? (
                        <button
                          className="w-full text-left"
                          onClick={() => {
                            const newServices = selectedServices.includes(service.id)
                              ? selectedServices.filter(id => id !== service.id)
                              : [...selectedServices, service.id];
                            setSelectedServices(newServices);
                            setTimeout(updateParent, 0);
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-gray-800">{service.name}</div>
                              <div className="text-sm text-gray-500 mt-1">{service.description}</div>
                            </div>
                            <div className="text-lg font-semibold text-blue-600">
                              ฿{service.price.toLocaleString()}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <div className="font-medium text-gray-800">{service.name}</div>
                              <div className="text-sm text-gray-500">{service.description}</div>
                            </div>
                            <div className="text-lg font-semibold text-blue-600">
                              ฿{service.price.toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {service.options.map(option => (
                              <button
                                key={option.id}
                                className={`p-3 rounded-lg border transition-all ${
                                  selectedServiceOptions[service.id] === option.id
                                    ? 'border-blue-500 bg-blue-100'
                                    : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
                                }`}
                                onClick={() => {
                                  const newOptions = { ...selectedServiceOptions };
                                  const newServices = [...selectedServices];
                                  
                                  if (selectedServiceOptions[service.id] === option.id) {
                                    delete newOptions[service.id];
                                    const serviceIndex = newServices.indexOf(service.id);
                                    if (serviceIndex > -1) {
                                      newServices.splice(serviceIndex, 1);
                                    }
                                  } else {
                                    newOptions[service.id] = option.id;
                                    if (!newServices.includes(service.id)) {
                                      newServices.push(service.id);
                                    }
                                  }
                                  
                                  setSelectedServiceOptions(newOptions);
                                  setSelectedServices(newServices);
                                  setTimeout(updateParent, 0);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  {option.color && (
                                    <div 
                                      className="w-4 h-4 rounded-full border border-gray-300" 
                                      style={{ backgroundColor: option.color }}
                                    />
                                  )}
                                  <span className="text-sm font-medium">{option.name}</span>
                                </div>
                                {option.price > 0 && (
                                  <div className="text-sm text-blue-600 mt-1">
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

            {/* Extra Services Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">บริการเสริม (ตัวเลือก)</h3>
              <div className="space-y-3">
                {extraServices
                  .filter(service =>
                    hasColumn === false
                      ? !service.id.includes('column')
                      : true
                  )
                  .map((service) => (
                    <div key={service.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium text-gray-800">{service.name}</div>
                          <div className="text-sm text-gray-500">{service.description}</div>
                        </div>
                      </div>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                        value={selectedExtras[service.id] || ''}
                        onChange={(e) => {
                          const newExtras = {
                            ...selectedExtras,
                            [service.id]: e.target.value,
                          };
                          setSelectedExtras(newExtras);
                          setTimeout(updateParent, 0);
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