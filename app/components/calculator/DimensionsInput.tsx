'use client';

interface DimensionsInputProps {
  width: number;
  length: number;
  onChange: (dimensions: { width: number; length: number }) => void;
}

export function DimensionsInput({ width, length, onChange }: DimensionsInputProps) {
  const area = width * length;

  return (
    <section id="dimensions" className="space-y-4">
      <h2 className="text-xl font-semibold">ขนาด</h2>
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ความกว้าง (เมตร)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={width}
            onChange={(e) =>
              onChange({
                width: parseFloat(e.target.value) || 0,
                length,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ความยาว (เมตร)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={length}
            onChange={(e) =>
              onChange({
                width,
                length: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>
        <div className="pt-2">
          <p className="text-sm text-gray-600">
            พื้นที่รวม: {area.toFixed(2)} ตารางเมตร
          </p>
        </div>
      </div>
    </section>
  );
}
