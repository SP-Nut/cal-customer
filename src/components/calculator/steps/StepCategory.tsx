import Image from "next/image";
import { cn } from "@/lib/cn";
import { categories, materials } from "@/data/materials";
import type { CalculatorInput, MaterialCategory } from "@/domain/calculator/types";

interface StepCategoryProps {
  value: CalculatorInput;
  onChange: (update: Partial<CalculatorInput>) => void;
}

export function StepCategory({ value, onChange }: StepCategoryProps) {
  function select(id: MaterialCategory) {
    const nextMaterial = materials.find((m) => m.category === id);
    onChange({ category: id, materialId: nextMaterial?.id ?? value.materialId });
  }

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900">คุณต้องการอะไร?</h2>
        <p className="mt-0.5 text-sm text-slate-500">เลือกประเภทหลังคากันสาดที่เหมาะกับพื้นที่ของคุณ</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => select(cat.id)}
            className={cn(
              "relative flex flex-col gap-3 overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-150",
              value.category === cat.id
                ? "border-brand-600 bg-brand-50 shadow-md"
                : "border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm"
            )}
          >
            {value.category === cat.id && (
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </span>
            )}
            <div className="h-40 w-full overflow-hidden rounded-lg bg-white sm:h-32">
              <Image
                src={materials.find((m) => m.category === cat.id)?.image ?? "/materials/pr.png"}
                alt={cat.name}
                width={520}
                height={280}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="font-bold text-slate-900">{cat.name}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{cat.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
