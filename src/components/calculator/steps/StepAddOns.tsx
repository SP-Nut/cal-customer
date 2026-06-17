"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { addOns } from "@/data/services";
import type { CalculatorInput, AddOnGroup } from "@/domain/calculator/types";
import { formatBaht } from "@/lib/format";

interface StepAddOnsProps {
  value: CalculatorInput;
  onToggle: (addOnId: string, optionId: string) => void;
  onChange: (update: Partial<CalculatorInput>) => void;
}

const groupMeta: Record<AddOnGroup, { label: string; emoji: string }> = {
  structure: { label: "โครงสร้าง", emoji: "🏗️" },
  ceiling: { label: "งานฝ้า", emoji: "🪟" },
  water: { label: "ระบบน้ำ", emoji: "💧" },
  foundation: { label: "ฐานราก", emoji: "⚓" },
  electrical: { label: "ไฟฟ้า", emoji: "💡" }
};

function formatPriceLabel(mode: string, price: number) {
  if (price === 0) return "ฟรี";
  if (mode === "perSqm") return `${formatBaht(price)}/ตร.ม.`;
  if (mode === "perMeter") return `${formatBaht(price)}/ม.`;
  if (mode === "perPoint") return `${formatBaht(price)}/จุด`;
  if (mode === "perPole") return `${formatBaht(price)}/ต้น`;
  return formatBaht(price);
}

export function StepAddOns({ value, onToggle, onChange }: StepAddOnsProps) {
  // Group add-ons
  const groups = Object.keys(groupMeta) as AddOnGroup[];
  const [openGroups, setOpenGroups] = useState<Set<AddOnGroup>>(new Set(["structure"]));

  function toggleGroup(group: AddOnGroup) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  }

  const selectedCount = Object.keys(value.selectedAddOns).length;

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900">บริการเสริม</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          ไม่บังคับ — เลือกเฉพาะที่ต้องการ
          {selectedCount > 0 && (
            <span className="ml-2 font-semibold text-brand-600">
              เลือกแล้ว {selectedCount} รายการ
            </span>
          )}
        </p>
      </div>

      <div className="space-y-2">
        {groups.map((group) => {
          const groupAddOns = addOns.filter((a) => a.group === group);
          if (groupAddOns.length === 0) return null;
          const meta = groupMeta[group];
          const isOpen = openGroups.has(group);
          const activeInGroup = groupAddOns.filter((a) => value.selectedAddOns[a.id]).length;

          return (
            <div key={group} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => toggleGroup(group)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{meta.emoji}</span>
                  <span className="text-sm font-semibold text-slate-900">{meta.label}</span>
                  {activeInGroup > 0 && (
                    <Badge variant="brand">{activeInGroup}</Badge>
                  )}
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-slate-400 flex-none" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400 flex-none" />
                )}
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 px-4 pb-3 pt-2 space-y-3">
                  {groupAddOns.map((addOn) => (
                    <div key={addOn.id}>
                      <p className="mb-1.5 text-xs font-semibold text-slate-700">{addOn.name}</p>
                      <div className="grid gap-1.5">
                        {addOn.options.map((option) => {
                          const active = value.selectedAddOns[addOn.id] === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => onToggle(addOn.id, option.id)}
                              className={cn(
                                "flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-all",
                                active
                                  ? "border-brand-600 bg-brand-50 text-brand-900"
                                  : "border-slate-200 hover:border-brand-300"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "h-3.5 w-3.5 flex-none rounded-full border-2",
                                    active ? "border-brand-600 bg-brand-600" : "border-slate-300"
                                  )}
                                />
                                <span className="font-medium">{option.name}</span>
                              </div>
                              <span className="text-xs font-semibold text-slate-600 shrink-0">
                                {formatPriceLabel(addOn.pricingMode, option.price)}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Quantity for pipe/lighting */}
                      {value.selectedAddOns[addOn.id] && (addOn.id === "pipe" || addOn.id === "lighting") && (
                        <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                          <p className="text-xs font-semibold text-slate-700">
                            {addOn.id === "pipe" ? "ความยาวท่อน้ำ (ม.)" : "จำนวนจุดไฟ"}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              aria-label="ลด"
                              onClick={() =>
                                onChange({
                                  quantities: {
                                    ...value.quantities,
                                    [addOn.id]: Math.max(addOn.id === "pipe" ? 3 : 1, (value.quantities[addOn.id] ?? (addOn.id === "pipe" ? 3 : 1)) - 1)
                                  }
                                })
                              }
                              className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-brand-500"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">
                              {value.quantities[addOn.id] ?? (addOn.id === "pipe" ? 3 : 1)}
                            </span>
                            <button
                              type="button"
                              aria-label="เพิ่ม"
                              onClick={() =>
                                onChange({
                                  quantities: {
                                    ...value.quantities,
                                    [addOn.id]: (value.quantities[addOn.id] ?? (addOn.id === "pipe" ? 3 : 1)) + 1
                                  }
                                })
                              }
                              className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-brand-500"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
