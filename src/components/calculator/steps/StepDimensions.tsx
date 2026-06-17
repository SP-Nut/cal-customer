import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/Input";
import type { CalculatorInput, InstallationType } from "@/domain/calculator/types";

interface StepDimensionsProps {
  value: CalculatorInput;
  onChange: (update: Partial<CalculatorInput>) => void;
  onInstallationSelect?: (update: Partial<CalculatorInput>) => void;
}

const installationOptions: Array<{ id: InstallationType; label: string; description: string }> = [
  { id: "with-posts", label: "มีเสารับโครงสร้าง", description: "งานทั่วไป มั่นคงแข็งแรง" },
  { id: "no-posts", label: "ไม่มีเสา (ยึดผนัง)", description: "แขนดึง ต้องตรวจหน้างาน" },
  { id: "survey", label: "ให้ทีมแนะนำ", description: "ยังไม่แน่ใจ ให้ SP แนะนำ" }
];

export function StepDimensions({ value, onChange, onInstallationSelect }: StepDimensionsProps) {
  const area = Math.max(0, value.width) * Math.max(0, value.length);
  const selectInstallation = onInstallationSelect ?? onChange;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">พื้นที่และรูปแบบ</h2>
        <p className="mt-0.5 text-sm text-slate-500">ระบุขนาดพื้นที่และรูปแบบการติดตั้ง</p>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="กว้าง"
          type="number"
          min="0"
          step="0.1"
          value={value.width || ""}
          suffix="ม."
          placeholder="0.0"
          required
          onChange={(e) => onChange({ width: Number(e.target.value) })}
        />
        <Input
          label="ยาว"
          type="number"
          min="0"
          step="0.1"
          value={value.length || ""}
          suffix="ม."
          placeholder="0.0"
          required
          onChange={(e) => onChange({ length: Number(e.target.value) })}
        />
      </div>

      {/* Area display */}
      {area > 0 && (
        <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3">
          <p className="text-sm font-semibold text-brand-700">พื้นที่ทั้งหมด</p>
          <p className="text-xl font-bold text-brand-700">{area.toFixed(2)} ตร.ม.</p>
        </div>
      )}

      {/* Installation type */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-700">รูปแบบการติดตั้ง</p>
        <div className="grid gap-2">
          {installationOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => selectInstallation({ installationType: opt.id })}
              className={cn(
                "flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-150",
                value.installationType === opt.id
                  ? "border-brand-600 bg-brand-50"
                  : "border-slate-200 bg-white hover:border-brand-300"
              )}
            >
              <span
                className={cn(
                  "flex h-4 w-4 flex-none rounded-full border-2",
                  value.installationType === opt.id
                    ? "border-brand-600 bg-brand-600"
                    : "border-slate-300 bg-white"
                )}
              >
                {value.installationType === opt.id && (
                  <span className="m-auto h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{opt.label}</p>
                <p className="text-xs text-slate-500">{opt.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Post count (conditional) */}
      {value.installationType === "with-posts" && (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">จำนวนเสา</p>
            <p className="text-xs text-slate-500">ขั้นต่ำ 2 ต้น</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="ลดจำนวนเสา"
              onClick={() => onChange({ postCount: Math.max(2, value.postCount - 1) })}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white transition hover:border-brand-500 hover:text-brand-600"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-lg font-bold">{Math.max(2, value.postCount)}</span>
            <button
              type="button"
              aria-label="เพิ่มจำนวนเสา"
              onClick={() => onChange({ postCount: value.postCount + 1 })}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white transition hover:border-brand-500 hover:text-brand-600"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
