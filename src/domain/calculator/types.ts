export type MaterialCategory = "translucent" | "opaque";

export type SizeCode = "M" | "M_PLUS" | "L" | "L_PLUS" | "STAINLESS_S" | "STAINLESS_M";

export type InstallationType = "with-posts" | "no-posts" | "survey";

export type AddOnGroup = "structure" | "ceiling" | "water" | "foundation" | "electrical";

export type PricingMode = "free" | "fixed" | "perSqm" | "perMeter" | "perPoint" | "perPole";

export interface SizeOption {
  code: SizeCode;
  label: string;
  description: string;
  image: string;
  humanLabel: string;
}

export interface Material {
  id: string;
  category: MaterialCategory;
  name: string;
  shortName: string;
  image: string;
  description: string;
  badges: string[];
  pricePerSqm: Partial<Record<SizeCode, number>>;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface AddOn {
  id: string;
  group: AddOnGroup;
  name: string;
  description: string;
  pricingMode: PricingMode;
  options: AddOnOption[];
  defaultOptionId?: string;
  requiresSize?: SizeCode[];
}

export interface CalculatorInput {
  category: MaterialCategory;
  materialId: string;
  sizeCode: SizeCode;
  width: number;
  length: number;
  installationType: InstallationType;
  postCount: number;
  selectedAddOns: Record<string, string>;
  quantities: Record<string, number>;
}

export interface ContactInfo {
  name: string;
  phone: string;
  lineId: string;
  note: string;
}

export interface QuoteLine {
  id: string;
  label: string;
  detail: string;
  amount: number;
}

export interface QuoteBreakdown {
  area: number;
  materialLine: QuoteLine | null;
  addOnLines: QuoteLine[];
  warnings: string[];
  subtotal: number;
}


