import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { materials } from "@/data/materials";
import type { CalculatorInput } from "@/domain/calculator/types";
import { formatBaht } from "@/lib/format";

interface StepMaterialProps {
  value: CalculatorInput;
  onChange: (update: Partial<CalculatorInput>) => void;
}

export function StepMaterial({ value, onChange }: StepMaterialProps) {
  const filtered = materials.filter((m) => m.category === value.category);

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900">เลือกวัสดุ</h2>
        <p className="mt-0.5 text-sm text-slate-500">เปรียบเทียบวัสดุ เลือกที่เหมาะกับการใช้งานของคุณ</p>
      </div>

      <div className="space-y-2.5">
        {filtered.map((mat) => {
          const minPrice = Math.min(...(Object.values(mat.pricePerSqm).filter(Boolean) as number[]));
          const selected = value.materialId === mat.id;

          return (
            <button
              key={mat.id}
              type="button"
              onClick={() => onChange({ materialId: mat.id })}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border-2 p-3 text-left transition-all duration-150",
                selected
                  ? "border-brand-600 bg-brand-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-brand-300"
              )}
            >
              <div className="relative h-20 w-24 flex-none overflow-hidden rounded-lg bg-slate-100">
                <Image src={mat.image} alt={mat.name} fill className="object-cover" sizes="96px" />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-slate-900 leading-tight">{mat.name}</p>
                  {selected && (
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-600">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-4 text-slate-500">{mat.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-bold text-brand-600">
                    เริ่ม {formatBaht(minPrice)}/ตร.ม.
                  </span>
                  {mat.badges.slice(0, 2).map((badge) => (
                    <Badge key={badge} variant="brand">{badge}</Badge>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
