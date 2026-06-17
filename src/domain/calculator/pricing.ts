import { addOns } from "@/data/services";
import { getMaterial, getSizeOption } from "@/data/materials";
import type { CalculatorInput, QuoteBreakdown, QuoteLine } from "./types";

export function calculateQuote(input: CalculatorInput): QuoteBreakdown {
  const material = getMaterial(input.materialId);
  const size = getSizeOption(input.sizeCode);
  const area = roundMoney(Math.max(input.width, 0) * Math.max(input.length, 0));
  const warnings: string[] = [];
  const pricePerSqm = material.pricePerSqm[input.sizeCode];

  if (!pricePerSqm) {
    warnings.push(`${material.name} ยังไม่มีราคาสำหรับขนาด ${size.label}`);
  }

  if (area > 0 && area < 2) {
    warnings.push("พื้นที่น้อยกว่า 2 ตร.ม. อาจต้องประเมินหน้างานเพิ่มเติม");
  }

  if (input.width > 8 || input.length > 12) {
    warnings.push("ขนาดงานค่อนข้างใหญ่ ควรให้ทีมสำรวจยืนยันโครงสร้าง");
  }

  const materialAmount = pricePerSqm && area > 0 ? roundMoney(pricePerSqm * area) : 0;
  const materialLine: QuoteLine | null = pricePerSqm
    ? {
        id: "material",
        label: `${material.name} / ${size.label}`,
        detail: `${area.toFixed(2)} ตร.ม. x ฿${pricePerSqm.toLocaleString()}`,
        amount: materialAmount
      }
    : null;

  const addOnLines = addOns.flatMap((addOn): QuoteLine[] => {
    const optionId = input.selectedAddOns[addOn.id];
    if (!optionId) return [];

    if (addOn.requiresSize && !addOn.requiresSize.includes(input.sizeCode)) {
      return [];
    }

    const option = addOn.options.find((item) => item.id === optionId);
    if (!option) return [];

    const quantity = resolveQuantity(addOn.id, input);
    const amount = calculateAddOnAmount(addOn.pricingMode, option.price, area, quantity);

    return [
      {
        id: addOn.id,
        label: addOn.name,
        detail: `${option.name}${formatQuantity(addOn.pricingMode, quantity, area)}`,
        amount
      }
    ];
  });

  const subtotal = roundMoney(materialAmount + addOnLines.reduce((sum, line) => sum + line.amount, 0));

  return {
    area,
    materialLine,
    addOnLines,
    warnings,
    subtotal
  };
}

function resolveQuantity(addOnId: string, input: CalculatorInput) {
  if (addOnId === "posts" || addOnId === "foundation") {
    return Math.max(input.postCount || 0, 2);
  }
  if (addOnId === "pipe") {
    return Math.max(input.quantities[addOnId] || 3, 3);
  }
  return input.quantities[addOnId] || 1;
}

function calculateAddOnAmount(mode: string, price: number, area: number, quantity: number) {
  switch (mode) {
    case "free":
      return 0;
    case "fixed":
      return price;
    case "perSqm":
      return roundMoney(price * area);
    case "perMeter":
    case "perPoint":
    case "perPole":
      return roundMoney(price * quantity);
    default:
      return 0;
  }
}

function formatQuantity(mode: string, quantity: number, area: number) {
  if (mode === "perSqm") return ` / ${area.toFixed(2)} ตร.ม.`;
  if (mode === "perMeter") return ` / ${quantity} ม.`;
  if (mode === "perPoint") return ` / ${quantity} จุด`;
  if (mode === "perPole") return ` / ${quantity} ต้น`;
  return "";
}

function roundMoney(value: number) {
  return Math.round(value);
}

