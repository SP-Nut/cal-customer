import type { CalculatorInput, ContactInfo } from "./types";

export interface StepValidation {
  valid: boolean;
  errors: string[];
}

export function validateStep(step: number, input: CalculatorInput, contact?: ContactInfo): StepValidation {
  switch (step) {
    case 1:
      return input.category ? { valid: true, errors: [] } : { valid: false, errors: ["กรุณาเลือกประเภทวัสดุ"] };

    case 2:
      return input.materialId ? { valid: true, errors: [] } : { valid: false, errors: ["กรุณาเลือกวัสดุ"] };

    case 3:
      return input.sizeCode ? { valid: true, errors: [] } : { valid: false, errors: ["กรุณาเลือกขนาดโครงสร้าง"] };

    case 4: {
      const errors: string[] = [];
      if (!input.width || input.width <= 0) errors.push("กรุณาระบุความกว้าง");
      if (!input.length || input.length <= 0) errors.push("กรุณาระบุความยาว");
      if (input.width > 50) errors.push("ความกว้างเกิน 50 เมตร กรุณาติดต่อทีมงาน");
      if (input.length > 50) errors.push("ความยาวเกิน 50 เมตร กรุณาติดต่อทีมงาน");
      return { valid: errors.length === 0, errors };
    }

    case 5:
      // Add-ons are optional
      return { valid: true, errors: [] };

    case 6: {
      if (!contact) return { valid: false, errors: ["กรุณากรอกข้อมูลติดต่อ"] };
      const errors: string[] = [];
      if (!contact.name.trim()) errors.push("กรุณาระบุชื่อ-นามสกุล");
      const phoneClean = contact.phone.replace(/[-\s]/g, "");
      if (!phoneClean) errors.push("กรุณาระบุเบอร์โทรศัพท์");
      else if (!/^0[0-9]{8,9}$/.test(phoneClean)) errors.push("เบอร์โทรศัพท์ไม่ถูกต้อง (เช่น 0891234567)");
      return { valid: errors.length === 0, errors };
    }

    default:
      return { valid: true, errors: [] };
  }
}
