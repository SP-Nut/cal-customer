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

export const mainServices: Service[] = [
  {
    id: 'poles',
    name: 'งานเสา',
    description: 'ติดตั้งเสารองรับโครงสร้างกันสาด',
    options: [
      { 
        id: 'single', 
        name: 'เสาเดี่ยว', 
        price: 2000, 
        isDefault: true,
        description: 'เสาเดี่ยว เหมาะสำหรับพื้นที่ขนาดเล็ก-กลาง (2,000 บาท/ต้น)'
      },
      { 
        id: 'cantilever', 
        name: 'เสาระแนง', 
        price: 3500,
        description: 'เสาระแนง รองรับได้ดี เหมาะสำหรับพื้นที่กว้าง (3,500 บาท/ต้น)'
      },
      { 
        id: 'extension', 
        name: 'แขนดึง', 
        price: 2800,
        description: 'แขนดึง ติดตั้งง่าย ประหยัดพื้นที่ (2,800 บาท/ต้น)'
      }
    ]
  },
  {
    id: 'steel-painting',
    name: 'สีโครงสร้าง',
    description: 'ทาสีโครงสร้างเหล็กเพื่อป้องกันสนิมและความสวยงาม',
    options: [
      { 
        id: 'black-matte', 
        name: 'ดำด้าน', 
        price: 0, 
        isDefault: true,
        color: '#2D2D2D',
        description: 'สีดำด้าน คลาสสิก ไม่สะท้อนแสง'
      },
      { 
        id: 'black-gloss', 
        name: 'ดำเงา', 
        price: 0,
        color: '#000000',
        description: 'สีดำเงา เงางาม หรูหรา'
      },
      { 
        id: 'black-oak', 
        name: 'สีโอ๊คดำ', 
        price: 0,
        color: '#3C2415',
        description: 'สีโอ๊คดำ ลายไม้ธรรมชาติ'
      },
      { 
        id: 'gray', 
        name: 'สีเทา', 
        price: 0,
        color: '#6B7280',
        description: 'สีเทา โทนสีสบายตา'
      },
      { 
        id: 'white', 
        name: 'สีขาว', 
        price: 0,
        color: '#FFFFFF',
        description: 'สีขาว สะอาด สดใส'
      },
      { 
        id: 'custom', 
        name: 'สีผสม (พิเศษ)', 
        price: 1000,
        color: '#FF6B6B',
        description: 'สีผสมตามต้องการ +1,000 บาท'
      }
    ],
    isSelectedByDefault: true
  },
  {
    id: 'ceiling',
    name: 'งานฝ้า',
    description: 'ติดตั้งฝ้าเพดาน (คิดตามตารางเมตร)',
    options: [
      { 
        id: 'corrugated', 
        name: 'ฝ้าลอนระแนง', 
        price: 1000, 
        isDefault: true,
        description: 'ฝ้าแบบลอนระแนง เหมาะสำหรับการระบายอากาศ (1,000 บาท/ตร.ม.)'
      },
      { 
        id: 'smooth', 
        name: 'ฉาบเรียบ', 
        price: 800,
        description: 'ฝ้าฉาบเรียบ สวยงาม เหมาะกับงานตกแต่ง (800 บาท/ตร.ม.)'
      }
    ],
    requiresSize: 'L_PLUS',
    pricePerSqm: true
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
    description: 'ระบบไฟฟ้าและแสงสว่าง (1,500 บาท/จุด)',
    options: [
      { 
        id: 'lighting', 
        name: 'จุดไฟส่องสว่าง', 
        price: 1500,
        description: 'ติดตั้งจุดไฟส่องสว่าง 1,500 บาท/จุด'
      }
    ],
    requiresQuantity: true,
    pricePerPoint: true,
    unit: 'จุด'
  },
  {
    id: 'gutter',
    name: 'งานรางน้ำ',
    description: 'ระบบระบายน้ำฝน',
    options: [
      { id: 'pvc', name: 'รางน้ำ PVC', price: 2000 },
      { id: 'stainless', name: 'รางน้ำสแตนเลส', price: 4000 }
    ]
  },
  {
    id: 'pipe',
    name: 'งานท่อน้ำ',
    description: 'ระบบท่อระบายน้ำลง (550 บาท/เมตร ขั้นต่ำ 3 เมตร)',
    options: [
      { 
        id: 'standard', 
        name: 'ท่อระบายน้ำมาตรฐาน', 
        price: 550,
        description: 'ท่อระบายน้ำคุณภาพดี ราคา 550 บาท/เมตร (ขั้นต่ำ 3 เมตร)'
      }
    ],
    requiresLength: true,
    pricePerMeter: true,
    minimumLength: 3
  }
];