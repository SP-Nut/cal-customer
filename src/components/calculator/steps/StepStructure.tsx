import Image from "next/image";
import { cn } from "@/lib/cn";
import { materials, sizeOptions } from "@/data/materials";
import type { CalculatorInput, SizeCode } from "@/domain/calculator/types";
import { formatBaht } from "@/lib/format";

interface StepStructureProps {
  value: CalculatorInput;
  onChange: (update: Partial<CalculatorInput>) => void;
}

export function StepStructure({ value, onChange }: StepStructureProps) {
  const selectedMaterial = materials.find((m) => m.id === value.materialId) ?? materials[0];

  function select(code: SizeCode) {
    onChange({ sizeCode: code });
  }

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900">ขนาดโครงสร้าง</h2>
        <p className="mt-0.5 text-sm text-slate-500">เลือกขนาดโครงเหล็กที่เหมาะกับพื้นที่และการใช้งาน</p>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {sizeOptions.map((size) => {
          const price = selectedMaterial.pricePerSqm[size.code];
          const disabled = !price;
          const selected = value.sizeCode === size.code;

          return (
            <button
              key={size.code}
              type="button"
              disabled={disabled}
              onClick={() => select(size.code)}
              className={cn(
                "flex flex-col rounded-xl border-2 p-2.5 text-left transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40",
                selected
                  ? "border-brand-600 bg-brand-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-brand-300"
              )}
            >
              <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-100">
                <Image src={size.image} alt={size.humanLabel} fill className="object-cover" sizes="140px" />
              </div>
              <p className="text-sm font-bold text-slate-900 leading-tight">{size.humanLabel}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {price ? `${formatBaht(price)}/ตร.ม.` : "ยังไม่เปิดราคา"}
              </p>
            </button>
          );
        })}
      </div>

      <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
        ไม่แน่ใจ? เลือก <strong>มาตรฐาน (M)</strong> สำหรับงานทั่วไป หรือให้ทีมงานแนะนำหน้างาน
      </p>
    </div>
  );
}
