'use client';

interface DimensionsInputProps {
  width: number;
  length: number;
  onChange: (dimensions: { width: number; length: number }) => void;
}

export function DimensionsInput({ width, length, onChange }: DimensionsInputProps) {
  const area = width * length;

  return (
    <section id="dimensions" className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-2xl p-6 border border-blue-100/50 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-lg">📏</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">กำหนดขนาด</h2>
      </div>
      
      <div className="space-y-5">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            ความกว้าง (เมตร)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="0.0"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 font-medium transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:bg-white hover:border-slate-300 shadow-sm"
              value={width || ''}
              onChange={(e) =>
                onChange({
                  width: parseFloat(e.target.value) || 0,
                  length,
                })
              }
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
              ม.
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            ความยาว (เมตร)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="0.0"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 font-medium transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:bg-white hover:border-slate-300 shadow-sm"
              value={length || ''}
              onChange={(e) =>
                onChange({
                  width,
                  length: parseFloat(e.target.value) || 0,
                })
              }
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
              ม.
            </div>
          </div>
        </div>
        
        {area > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📐</span>
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">พื้นที่รวมทั้งสิ้น</p>
                <p className="text-lg font-bold text-green-800">
                  {area.toFixed(2)} ตารางเมตร
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
