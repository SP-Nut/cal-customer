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
    description: 'ติดตั้งเสารองรับโครงสร้างกันสาด (ขั้นต่ำ 2 ต้น)',
    options: [
      { 
        id: 'single', 
        name: 'เสาเดี่ยว', 
        price: 2000, 
        isDefault: true,
        description: '2,000 บาท/ต้น'
      },
      { 
        id: 'cantilever', 
        name: 'เสาระแนง', 
        price: 3500,
        description: '3,500 บาท/ต้น'
      },
      { 
        id: 'extension', 
        name: 'แขนดึง', 
        price: 2800,
        description: '2,800 บาท/ต้น'
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
        id: 'aion', 
        name: 'ฝ้าระแนงเหล็กลายไม้ Aron', 
        price: 3700
      },
      { 
        id: 'plastic-wood', 
        name: 'ฝ้าระแนงเหล็กใต้หลังคา', 
        price: 1600
      },
      { 
        id: 'shera', 
        name: 'ฝ้าระแนงเชอรา หนา 8 มม.', 
        price: 1500
      },
      { 
        id: 'ceiling-smooth-white', 
        name: 'ฝ้าระแนงเททัลชีท ลอนฝ้าระแนง (สีธรรมดา)', 
        price: 1500
      },
      { 
        id: 'ceiling-smooth-color', 
        name: 'ฝ้าระแนงเททัลชีท ลอนฝ้าระแนง (ลายไม้)', 
        price: 1600
      },
      { 
        id: 'corrugated', 
        name: 'ฝ้าตะแกรงเหล็ก', 
        price: 1100, 
        isDefault: true
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
    description: 'งานฐานรากสำหรับรองรับโครงสร้าง เลือกประเภทเข็มที่ต้องการ',
    options: [
      {
        id: 'hexagonal-pile',
        name: 'ลงเข็มหกเหลี่ยมพร้อมรากฐาน',
        price: 0,
        isDefault: true,
        description: 'เข็มหกเหลี่ยมพร้อมฟุตติ้ง (ขั้นต่ำ 2 ชุด)',
        subOptions: [
          {
            id: 'footing-only',
            name: 'งานฟุตติ้ง (ไม่ลงเข็ม)',
            price: 3000,
            description: '3,000 บาท/ชุด'
          },
          {
            id: 'hex-3m',
            name: '3 เมตร 3 ต้น/หลุม + ฟุตติ้ง',
            price: 5000,
            description: '5,000 บาท/ชุด'
          },
          {
            id: 'hex-4m',
            name: '4 เมตร 3 ต้น/หลุม + ฟุตติ้ง',
            price: 6000,
            description: '6,000 บาท/ชุด'
          },
          {
            id: 'hex-6m',
            name: '6 เมตร 3 ต้น/หลุม + ฟุตติ้ง',
            price: 7000,
            description: '7,000 บาท/ชุด'
          }
        ]
      },
      {
        id: 'micropile',
        name: 'ลงเข็มไมโครไพล์',
        price: 0,
        description: 'เข็มไมโครไพล์ I18/I22 ลึก 18 เมตร',
        subOptions: [
          {
            id: 'micropile-i18-1',
            name: 'เข็มไมโครไพล์ I18 1 ต้น ลึก 18เมตร',
            price: 20000,
            description: '20,000 บาท/ต้น'
          },
          {
            id: 'micropile-i18-2',
            name: 'เข็มไมโครไพล์ I18 2 ต้น ลึก 18เมตร',
            price: 17000,
            description: '17,000 บาท/ต้น'
          },
          {
            id: 'micropile-i18-3',
            name: 'เข็มไมโครไพล์ I18 3 ต้น ลึก 18เมตร',
            price: 15000,
            description: '15,000 บาท/ต้น'
          },
          {
            id: 'micropile-i18-4',
            name: 'เข็มไมโครไพล์ I18 4 ต้น ลึก 18เมตร',
            price: 13000,
            description: '13,000 บาท/ต้น'
          },
          {
            id: 'micropile-i22-1',
            name: 'เข็มไมโครไพล์ I22 1 ต้น ลึก 18เมตร',
            price: 22000,
            description: '22,000 บาท/ต้น'
          },
          {
            id: 'micropile-i22-2',
            name: 'เข็มไมโครไพล์ I22 2 ต้น ลึก 18เมตร',
            price: 19000,
            description: '19,000 บาท/ต้น'
          },
          {
            id: 'micropile-i22-3',
            name: 'เข็มไมโครไพล์ I22 3 ต้น ลึก 18เมตร',
            price: 17000,
            description: '17,000 บาท/ต้น'
          },
          {
            id: 'micropile-i22-4',
            name: 'เข็มไมโครไพล์ I22 4 ต้น ลึก 18เมตร',
            price: 13000,
            description: '13,000 บาท/ต้น'
          }
        ]
      },
      {
        id: 'steel-pile',
        name: 'ลงเข็มเหล็ก',
        price: 0,
        description: 'เข็มเหล็ก F76 + ค่าเจาะปูน 500 บาท/ต้น',
        subOptions: [
          {
            id: 'steel-f76-2m',
            name: 'เข็มเหล็ก F76 ลึก 2 เมตร',
            price: 9500,
            description: '9,000 บาท/ต้น + ค่าเจาะปูน 500 บาท/ต้น'
          },
          {
            id: 'steel-f76-3m',
            name: 'เข็มเหล็ก F76 ลึก 3 เมตร',
            price: 12500,
            description: '12,000 บาท/ต้น + ค่าเจาะปูน 500 บาท/ต้น'
          }
        ]
      }
    ]
  },
  {
    id: 'electrical',
    name: 'งานไฟฟ้า',
    description: 'ระบบไฟฟ้าและแสงสว่าง ',
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
    description: 'ระบบท่อระบายน้ำลง (ขั้นต่ำ 3 เมตร)',
    options: [
      { 
        id: 'pvc', 
        name: 'ท่อน้ำลง PVC 3"', 
        price: 550,
        description: 'ท่อน้ำลง PVC 3 นิ้ว ราคา 550 บาท/เมตร (ขั้นต่ำ 3 เมตร)'
      },
      { 
        id: 'vinyl-lion', 
        name: 'ท่อน้ำลงไวนิล Vinyl Gutter ยี่ห้อ Lion 3" (สีขาว)', 
        price: 700,
        description: 'ท่อน้ำลงไวนิล Vinyl Gutter ยี่ห้อ Lion 3 นิ้ว สีขาว ราคา 700 บาท/เมตร (ขั้นต่ำ 3 เมตร)'
      },
      { 
        id: 'vinyl-vg', 
        name: 'ท่อน้ำลงไวนิล Vinyl Gutter ยี่ห้อ VG 3" (สีขาว)', 
        price: 900,
        description: 'ท่อน้ำลงไวนิล Vinyl Gutter ยี่ห้อ VG 3 นิ้ว สีขาว ราคา 900 บาท/เมตร (ขั้นต่ำ 3 เมตร)'
      }
    ],
    requiresLength: true,
    pricePerMeter: true,
    minimumLength: 3
  }
];