'use client';

import { Material, Size } from '@/app/lib/types';

interface SizeSelectorProps {
  material: Material;
  selectedSize: Size | null;
  onSelect: (size: Size) => void;
}

export function SizeSelector({
  material,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">ขนาดวัสดุ</h2>
      <div className="grid gap-2">
        {material.sizes.map((size) => (
          <button
            key={size.id}
            className={`p-3 rounded-lg border ${
              selectedSize?.id === size.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => onSelect(size)}
          >
            {size.name}
            <p className="text-sm text-gray-600">{size.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
