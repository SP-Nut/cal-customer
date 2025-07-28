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
    <section id="materials" className="space-y-4">
      <h2 className="text-xl font-semibold">เลือกวัสดุ</h2>
      
      {/* Material Type Selection */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`group relative p-6 rounded-xl transition-all duration-300 ${
              selectedType === category.id
                ? 'bg-blue-50 shadow-lg scale-[1.02]'
                : 'bg-white hover:bg-gray-50 hover:scale-[1.01]'
            } border-2 ${
              selectedType === category.id
                ? 'border-blue-500'
                : 'border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => {
              setSelectedType(category.id);
              if (selectedMaterial?.type !== category.id) {
                onSelect(null);
              }
            }}
          >
            <div className="text-left">
              <div className="text-lg font-semibold mb-2">{category.name}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
            </div>
            <div className={`absolute inset-0 border-2 rounded-xl transition-opacity duration-300 ${
              selectedType === category.id
                ? 'opacity-100 border-blue-500'
                : 'opacity-0 group-hover:opacity-100 border-gray-300'
            }`} />
          </button>
        ))}
      </div>

      {/* Material Selection */}
      {selectedType && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">เลือกชนิดวัสดุ</h3>
          <div className="grid gap-3">
            {filteredMaterials.map((material) => (
              <button
                key={material.id}
                className={`group p-4 rounded-xl transition-all duration-300 ${
                  selectedMaterial?.id === material.id
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200'
                } border-2`}
                onClick={() => onSelect(material)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{material.name}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      selectedMaterial?.id === material.id
                        ? 'text-blue-500 scale-100'
                        : 'text-gray-400 scale-0 group-hover:scale-100'
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
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
