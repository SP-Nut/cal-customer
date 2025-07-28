'use client';

import { Material } from '@/app/lib/types';

interface MaterialPreviewProps {
  material: Material | null;
}

export function MaterialPreview({ material }: MaterialPreviewProps) {
  if (!material) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="max-w-md mx-auto">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h2 className="mt-4 text-xl font-medium text-gray-600">
            กรุณาเลือกวัสดุเพื่อดูรายละเอียด
          </h2>
          <p className="mt-2 text-gray-500">
            เลือกประเภทและชนิดวัสดุที่ต้องการจากเมนูด้านซ้าย
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-80">
        <img
          src={material.image}
          alt={material.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold">{material.name}</h2>
          <div className="mt-2 flex items-center text-sm">
            <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              {material.type === 'translucent' ? 'วัสดุโปร่งแสง' : 'วัสดุทึบแสง'}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 leading-relaxed">{material.description}</p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {material.sizes.map((size) => (
            <div
              key={size.id}
              className="p-4 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="font-medium">{size.name}</div>
              <p className="mt-1 text-sm text-gray-600">{size.description}</p>
              <div className="mt-2 text-blue-600 font-medium">
                ฿{material.pricePerSqm[size.id].toLocaleString()}/ตร.ม.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
