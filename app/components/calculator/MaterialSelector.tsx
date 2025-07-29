'use client';

import { useState } from 'react';
import { Material, MaterialCategory, MaterialType } from '@/app/lib/types';

interface MaterialSelectorProps {
  materials: Material[];
  categories: MaterialCategory[];
  selectedMaterial: Material | null;
  onSelect: (material: Material | null) => void;
}

export function MaterialSelector({
  materials,
  categories,
  selectedMaterial,
  onSelect,
}: MaterialSelectorProps) {
  const [selectedType, setSelectedType] = useState<MaterialType | null>(null);

  const filteredMaterials = selectedType
    ? materials.filter((m) => m.type === selectedType)
    : [];

  return (
    <section id="materials" className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">1</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">เลือกวัสดุ</h2>
      </div>
      
      {/* Initial State - Before selecting any type */}
      {!selectedType && (
        <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-2xl p-6 border border-blue-200 shadow-sm">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">เริ่มต้นเลือกประเภทวัสดุ</h3>
            <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto leading-relaxed">
              เลือกประเภทวัสดุที่เหมาะสมกับความต้องการของคุณ โดยพิจารณาจากการใช้งานและสไตล์ที่ต้องการ
            </p>
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span>กดปุ่มด้านล่างเพื่อเริ่มต้น</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Material Type Selection */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`group relative p-6 rounded-2xl transition-all duration-300 ${
              selectedType === category.id
                ? 'bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-[1.02] border-blue-500'
                : 'bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50/30 hover:scale-[1.01] border-gray-200 hover:border-blue-300'
            } border-2 shadow-sm hover:shadow-md`}
            onClick={() => {
              setSelectedType(category.id);
              if (selectedMaterial?.type !== category.id) {
                onSelect(null);
              }
            }}
          >
            <div className="text-left relative z-10">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedType === category.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                } transition-colors duration-300`}>
                  <span className="text-xl">
                    {category.id === 'translucent' ? '🔆' : '🛡️'}
                  </span>
                </div>
                <div className={`text-lg font-bold ${
                  selectedType === category.id ? 'text-blue-800' : 'text-gray-800'
                }`}>
                  {category.name}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed pl-13">{category.description}</p>
            </div>
            
            {/* Selection Indicator */}
            {selectedType === category.id && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Material Selection with Scrollable Container */}
      {selectedType && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">เลือกชนิดวัสดุ</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredMaterials.length} รายการ
            </span>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-2xl border border-gray-200 shadow-inner">
            <div className="h-80 overflow-y-auto custom-scrollbar p-3">
              <div className="space-y-3">
                {filteredMaterials.map((material, index) => (
                  <button
                    key={material.id}
                    className={`group w-full p-4 rounded-xl transition-all duration-300 ${
                      selectedMaterial?.id === material.id
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 shadow-md scale-[1.02]'
                        : 'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-[1.01]'
                    } border-2 shadow-sm`}
                    onClick={() => onSelect(material)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            selectedMaterial?.id === material.id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                          } transition-colors duration-300`}>
                            {index + 1}
                          </div>
                          <span className={`font-semibold text-sm leading-tight ${
                            selectedMaterial?.id === material.id ? 'text-blue-800' : 'text-gray-800'
                          }`}>
                            {material.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed pl-11 line-clamp-2">
                          {material.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-3">
                        {/* Price Range Indicator */}
                        <div className="text-right">
                          <div className="text-xs text-gray-400">เริ่มต้น</div>
                          <div className={`text-sm font-bold ${
                            selectedMaterial?.id === material.id ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            ฿{Math.min(...Object.values(material.pricePerSqm).filter(p => p > 0)).toLocaleString()}
                          </div>
                        </div>
                        
                        {/* Arrow Icon */}
                        <svg
                          className={`w-5 h-5 transition-all duration-300 ${
                            selectedMaterial?.id === material.id
                              ? 'text-blue-500 scale-100 translate-x-1'
                              : 'text-gray-400 scale-75 group-hover:scale-100 group-hover:translate-x-1 group-hover:text-blue-500'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-b-2xl border-t border-gray-100/50">
              <p className="text-xs text-center text-gray-500 flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span>เลื่อนเพื่อดูวัสดุเพิ่มเติม</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}