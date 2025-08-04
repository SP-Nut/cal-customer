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
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="sticky top-0 z-20 bg-gradient-to-r from-gray-600 to-slate-600 backdrop-blur-md border-b border-gray-400/50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40">
              <span className="text-white font-medium text-sm">{currentStep}</span>
            </div>
            <div>
              <h3 className="font-medium text-white text-sm">{stepName}</h3>
              <p className="text-xs text-white/90">ขั้นที่ {currentStep}/{totalSteps}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-white">{Math.round(progress)}%</div>
          </div>
        </div>
        
        <div className="w-full bg-white/25 rounded-full h-1.5">
          <div 
            className="bg-white h-1.5 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progress}%` }}
          />
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
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-white to-slate-50">
      <StepIndicator 
        currentStep={getCurrentStep()} 
        totalSteps={6} 
        stepName={getStepName()} 
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Step 1: Material Type Selection */}
        <div id="materials" className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">ประเภทวัสดุ</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`w-full p-4 rounded-xl border transition-all duration-300 text-left shadow-sm hover:shadow-md ${
                  selectedType === category.id
                    ? 'border-gray-400 bg-gray-50 shadow-gray-200/50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-white bg-white/90 backdrop-blur-sm'
                }`}
                onClick={() => {
                  setSelectedType(category.id);
                  if (selectedMaterial?.type !== category.id) {
                    handleMaterialSelect(null);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    selectedType === category.id 
                      ? 'bg-gray-500 text-white' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <span className="text-lg">
                      {category.id === 'translucent' ? '☀️' : '🏠'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-700">{category.name}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{category.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    selectedType === category.id 
                      ? 'border-gray-500 bg-gray-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedType === category.id && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Material Selection */}
        {selectedType && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">เลือกวัสดุ</h3>
              <span className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                แสดง {filteredMaterials.length} รายการ
              </span>
            </div>
            
            <div className="space-y-2 max-h-[360px] overflow-y-auto custom-scrollbar pr-2">
              {filteredMaterials.map((material, index) => (
                <button
                  key={material.id}
                  className={`w-full p-4 rounded-xl border transition-all duration-300 text-left shadow-sm hover:shadow-md ${
                    selectedMaterial?.id === material.id
                      ? 'border-gray-400 bg-gray-50 shadow-gray-200/50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-white bg-white/90 backdrop-blur-sm'
                  }`}
                  onClick={() => handleMaterialSelect(material)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      selectedMaterial?.id === material.id
                        ? 'bg-gray-500 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {selectedMaterial?.id === material.id ? '✓' : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-700 text-sm leading-tight">
                        {material.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {material.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-700 text-sm">
                        ฿{Math.min(...Object.values(material.pricePerSqm).filter(p => p > 0)).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">ต่อ ตร.ม.</div>
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
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">ขนาดวัสดุ</h3>
            <div className="grid grid-cols-2 gap-2 max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
              {selectedMaterial.sizes.map((size) => (
                <button
                  key={size.id}
                  className={`w-full p-2 rounded-lg border text-left transition-all duration-300 shadow-sm hover:shadow-md ${
                    selectedSize?.id === size.id
                      ? 'border-gray-400 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-white bg-white/90 backdrop-blur-sm'
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-700">{size.name}</div>
                    <div className="text-xs text-gray-600 font-medium">
                      {selectedMaterial.pricePerSqm[size.id] > 0 
                        ? `฿${selectedMaterial.pricePerSqm[size.id].toLocaleString()}`
                        : '-'
                      }
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{size.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Dimensions Input */}
        {selectedSize && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">ขนาดพื้นที่</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-700 mb-1 font-medium">ความกว้าง (ม.)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300"
                  value={dimensions.width}
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
                <label className="block text-xs text-gray-700 mb-1 font-medium">ความยาว (ม.)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300"
                  value={dimensions.length}
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
            <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              พื้นที่รวม: <span className="font-semibold">{area.toFixed(2)} ตร.ม.</span>
            </div>
          </div>
        )}

        {/* Step 5: Installation Type */}
        {selectedSize && dimensions.width > 0 && dimensions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">รูปแบบติดตั้ง</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`p-3 rounded-lg border text-center transition-all duration-300 shadow-sm hover:shadow-md ${
                  hasColumn === true
                    ? 'border-gray-400 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-white bg-white/90 backdrop-blur-sm'
                }`}
                onClick={() => {
                  setHasColumn(true);
                  setTimeout(updateParent, 0);
                }}
              >
                <div className="text-lg mb-1">🏗️</div>
                <div className="text-xs font-medium text-gray-600">แบบมีเสา</div>
              </button>
              <button
                className={`p-3 rounded-lg border text-center transition-all duration-300 shadow-sm hover:shadow-md ${
                  hasColumn === false
                    ? 'border-gray-400 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-white bg-white/90 backdrop-blur-sm'
                }`}
                onClick={() => {
                  setHasColumn(false);
                  setTimeout(updateParent, 0);
                }}
              >
                <div className="text-lg mb-1">🏠</div>
                <div className="text-xs font-medium text-gray-600">แบบไร้เสา</div>
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Services */}
        {selectedSize && dimensions.width > 0 && dimensions.length > 0 && (
          <>
            {/* Main Services Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">บริการหลัก</h3>
              <div className="space-y-2">
                {mainServices
                  .filter(service => {
                    // กรองบริการตามขนาด
                    const sizeOk = !service.requiresSize || service.requiresSize === selectedSize?.id;
                    // กรองบริการตามรูปแบบการติดตั้ง
                    const installationOk = hasColumn === null || 
                      (hasColumn === false ? service.id !== 'poles' : true);
                    return sizeOk && installationOk;
                  })
                  .map((service) => (
                    <div
                      key={service.id}
                      className={`p-3 rounded-lg border transition-all shadow-sm ${
                        selectedServices.includes(service.id)
                          ? 'border-gray-500 bg-gray-100'
                          : 'border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm'
                      }`}
                    >
                      {!service.options ? (
                        // Simple service without options
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
                            <span className="text-sm font-medium text-blue-900">{service.name}</span>
                            <span className="text-sm font-semibold text-blue-600">
                              ฿{service.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-blue-700 mt-1">{service.description}</p>
                        </button>
                      ) : (
                        // Service with options (like colors)
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-blue-900">{service.name}</span>
                            <span className="text-sm font-semibold text-blue-600">
                              ฿{service.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-blue-700 mb-3">{service.description}</p>
                          
                          {/* Service Options Grid */}
                          <div className="grid grid-cols-3 gap-2">
                            {service.options.map(option => (
                              <button
                                key={option.id}
                                className={`p-2 text-xs rounded border transition-all ${
                                  selectedServiceOptions[service.id] === option.id
                                    ? 'border-blue-500 bg-blue-200'
                                    : 'border-blue-200 hover:border-blue-300 bg-white/50'
                                }`}
                                onClick={() => {
                                  const newOptions = { ...selectedServiceOptions };
                                  const newServices = [...selectedServices];
                                  
                                  if (selectedServiceOptions[service.id] === option.id) {
                                    // Deselect option and service
                                    delete newOptions[service.id];
                                    const serviceIndex = newServices.indexOf(service.id);
                                    if (serviceIndex > -1) {
                                      newServices.splice(serviceIndex, 1);
                                    }
                                  } else {
                                    // Select option and service
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
                                      className="w-3 h-3 rounded-full border border-blue-200" 
                                      style={{ backgroundColor: option.color }}
                                    />
                                  )}
                                  <span className="truncate text-blue-900">{option.name}</span>
                                </div>
                                {option.price > 0 && (
                                  <div className="text-xs text-blue-600 mt-1">
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
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wide">บริการเสริม</h3>
              <div className="space-y-3">
                {extraServices
                  .filter(service =>
                    hasColumn === false
                      ? !service.id.includes('column')
                      : true
                  )
                  .map((service) => (
                    <div key={service.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-blue-800">
                          {service.name}
                        </label>
                        {selectedExtras[service.id] && (
                          <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                            ✓ เลือกแล้ว
                          </span>
                        )}
                      </div>
                      <select
                        className="w-full p-2 border border-blue-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none bg-white/80 backdrop-blur-sm focus:bg-white transition-all"
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
                        <option value="">ไม่เลือก</option>
                        {service.options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name} - ฿{option.price.toLocaleString()}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-blue-700">{service.description}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Summary Section */}
            {(selectedServices.length > 0 || Object.keys(selectedExtras).some(key => selectedExtras[key])) && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-blue-600 mb-2">
                  🎉 บริการที่เลือก
                </h4>
                
                {/* Selected Services */}
                {selectedServices.length > 0 && (
                  <div className="mb-2">
                    <div className="text-xs text-blue-600 mb-1 font-medium">บริการหลัก:</div>
                    {mainServices
                      .filter(service => selectedServices.includes(service.id))
                      .map(service => {
                        const selectedOption = selectedServiceOptions[service.id];
                        let optionText = '';
                        if (selectedOption && service.options) {
                          const option = service.options.find(opt => opt.id === selectedOption);
                          if (option) {
                            optionText = ` (${option.name})`;
                          }
                        }
                        return (
                          <div key={service.id} className="text-xs text-blue-500">
                            • {service.name}{optionText}
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* Selected Extras */}
                {Object.keys(selectedExtras).some(key => selectedExtras[key]) && (
                  <div>
                    <div className="text-xs text-blue-600 mb-1 font-medium">บริการเสริม:</div>
                    {Object.entries(selectedExtras)
                      .filter(([_, optionId]) => optionId)
                      .map(([serviceId, optionId]) => {
                        const service = extraServices.find(s => s.id === serviceId);
                        const option = service?.options.find(o => o.id === optionId);
                        if (!service || !option) return null;
                        return (
                          <div key={serviceId} className="text-xs text-blue-500">
                            • {service.name} - {option.name}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}