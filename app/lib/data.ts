import { Material, Service, ExtraService, MaterialCategory } from './types';
import { translucentMaterials } from './materials/translucentMaterials';
import { opaqueMaterials } from './materials/opaqueMaterials';

export const materialCategories: MaterialCategory[] = [
  {
    id: 'translucent',
    name: 'วัสดุโปร่งแสง',
    description: 'เหมาะสำหรับพื้นที่ที่ต้องการแสงธรรมชาติ'
  },
  {
    id: 'opaque',
    name: 'วัสดุทึบแสง',
    description: 'เหมาะสำหรับพื้นที่ที่ต้องการความเป็นส่วนตัวและการป้องกันแดด'
  }
];

// รวมวัสดุทั้งหมดจากไฟล์แยก
export const materials: Material[] = [
  ...translucentMaterials,
  ...opaqueMaterials
];

// ฟังก์ชันสำหรับดึงวัสดุตามประเภท
export const getMaterialsByType = (type: 'translucent' | 'opaque'): Material[] => {
  return type === 'translucent' ? translucentMaterials : opaqueMaterials;
};

export const mainServices: Service[] = [
  {
    id: 'poles',
    name: 'งานเสา',
    description: 'ติดตั้งเสารองรับโครงสร้างกันสาด',
    price: 2000
  },
  {
    id: 'steel-painting',
    name: 'งานสีเหล็ก',
    description: 'ทาสีโครงสร้างเหล็กเพื่อป้องกันสนิม',
    options: [
      { 
        id: 'standard', 
        name: 'สีมาตรฐาน (น้ำเงิน)', 
        price: 0, 
        isDefault: true,
        color: '#1F1885'
      },
      { 
        id: 'modern', 
        name: 'สีโมเดิร์น (ฟ้า)', 
        price: 200,
        color: '#00A7E1'
      },
      { 
        id: 'accent', 
        name: 'สีพิเศษ (ชมพู)', 
        price: 300,
        color: '#E4007C'
      }
    ],
    price: 1500,
    isSelectedByDefault: true
  },
  {
    id: 'ceiling',
    name: 'งานฝ้า',
    description: 'ติดตั้งฝ้าเพดาน',
    price: 3000,
    requiresSize: 'L_PLUS'
  }
];

export const extraServices: ExtraService[] = [
  {
    id: 'foundation',
    name: 'งานรากฐาน',
    description: 'งานฐานรากสำหรับรองรับโครงสร้าง',
    options: [
      { id: 'basic', name: 'พื้นฐาน', price: 5000 },
      { id: 'advanced', name: 'แบบพิเศษ', price: 8000 }
    ]
  },
  {
    id: 'electrical',
    name: 'งานไฟฟ้า',
    description: 'ระบบไฟฟ้าและแสงสว่าง',
    options: [
      { id: 'basic', name: 'ไฟส่องสว่างพื้นฐาน', price: 3000 },
      { id: 'premium', name: 'ระบบไฟอัตโนมัติ', price: 6000 }
    ]
  },
  {
    id: 'gutter',
    name: 'งานรางน้ำ',
    description: 'ระบบระบายน้ำฝน',
    options: [
      { id: 'pvc', name: 'รางน้ำ PVC', price: 2000 },
      { id: 'stainless', name: 'รางน้ำสแตนเลส', price: 4000 }
    ]
  }
];