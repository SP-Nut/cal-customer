export type MaterialType = 'translucent' | 'opaque';

export interface MaterialCategory {
  id: MaterialType;
  name: string;
  description: string;
}

export interface Material {
  id: string;
  type: MaterialType;
  name: string;
  image: string;
  description: string;
  sizes: Size[];
  pricePerSqm: Record<SizeId, number>;
}

export type SizeId = 'S' | 'M' | 'M_PLUS' | 'L' | 'L_PLUS' | 'STAINLESS_S' | 'STAINLESS_M' | 'STAINLESS_L';

export interface Size {
  id: SizeId;
  name: string;
  description: string;
}

export interface ServiceOption {
  id: string;
  name: string;
  price: number;
}

export interface ServiceOption {
  id: string;
  name: string;
  price: number;
  color?: string;
  isDefault?: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  requiresSize?: string;
  options?: ServiceOption[];
  isSelectedByDefault?: boolean;
}

export interface ExtraService {
  id: string;
  name: string;
  description: string;
  options: {
    id: string;
    name: string;
    price: number;
  }[];
}
