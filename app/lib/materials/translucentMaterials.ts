import { Material } from '../types';

export const translucentMaterials: Material[] = [
  {
    id: 'shinkolite-prime',
    type: 'translucent',
    name: 'หลังคาอะคริลิค Shinkolite รุ่น Prime หนา 10 มม.',
    image: '/materials/shinkolite-prime.jpg',
    description: 'วัสดุคุณภาพสูง ความหนา 10 มม. ให้ความแข็งแรงและความโปร่งแสงสูง',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 8350,
      'M_PLUS': 8890,
      'L': 9100,
      'L_PLUS': 10300,
      'STAINLESS_S': 0, // ไม่มีราคา
      'STAINLESS_M': 15900
    }
  },
  {
    id: 'shinkolite-heat-cut',
    type: 'translucent',
    name: 'หลังคาอะคริลิค Shinkolite รุ่น Heat Cut/Nature หนา 6 มม. เคลือบสารป้องกัน UV',
    image: '/materials/shinkolite-heat.jpg',
    description: 'แผ่นอะคริลิคพรีเมียม ความหนา 6 มม. พร้อมคุณสมบัติกันความร้อน',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 5550,
      'M_PLUS': 5700,
      'L': 5900,
      'L_PLUS': 6100,
      'STAINLESS_S': 0, // ไม่มีราคา
      'STAINLESS_M': 11900
    }
  },
  {
    id: 'shinkolite-superior',
    type: 'translucent',
    name: 'หลังคาอะคริลิค Shinkolite รุ่น Superior หนา 6 มม.',
    image: '/materials/shinkolite-superior.jpg',
    description: 'แผ่นอะคริลิคคุณภาพสูง ความหนา 6 มม. เหมาะสำหรับงานทั่วไป',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 4250,
      'M_PLUS': 4400,
      'L': 4600,
      'L_PLUS': 4800,
      'STAINLESS_S': 0, // ไม่มีราคา
      'STAINLESS_M': 9900
    }
  },
  {
    id: 'shinkolite-shade',
    type: 'translucent',
    name: 'หลังคาอะคริลิค Shinkolite รุ่น Shade series หนา 4 มม.',
    image: '/materials/shinkolite-shade.jpg',
    description: 'แผ่นอะคริลิคซีรีส์พิเศษ ความหนา 4 มม. พร้อมเฉดสีสวยงาม',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 3850,
      'M_PLUS': 4050,
      'L': 4250,
      'L_PLUS': 4400,
      'STAINLESS_S': 0, // ไม่มีราคา
      'STAINLESS_M': 9100
    }
  },
  {
    id: 'polycarbonate-embossed',
    type: 'translucent',
    name: 'หลังคาโพลีชีทตัน Embossed Sheet หนา 3 มม.',
    image: '/materials/polycarbonate-embossed.jpg',
    description: 'หลังคาโพลีชีทตัน Embossed Sheet ความหนา 3 มม.',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 3300,
      'M_PLUS': 3400,
      'L': 3600,
      'L_PLUS': 3750,
      'STAINLESS_S': 4800,
      'STAINLESS_M': 6600
    }
  },
  {
    id: 'fiberglass-smooth',
    type: 'translucent',
    name: 'หลังคาไฟเบอร์กลาส ลอนเรียบ D-Lite หนา 1.5 มม. / หลังคาไฟเบอร์กลาส ลอนเรียบ J-Roof 1.2 มม.',
    image: '/materials/fiberglass-smooth.jpg',
    description: 'หลังคาไฟเบอร์กลาส ลอนเรียบ D-Lite หนา 1.5 มม. หรือ J-Roof 1.2 มม.',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 3100,
      'M_PLUS': 3200,
      'L': 3400,
      'L_PLUS': 3600,
      'STAINLESS_S': 4600,
      'STAINLESS_M': 6400
    }
  },
  {
    id: 'fiberglass-wave-gray',
    type: 'translucent',
    name: 'หลังคาไฟเบอร์กลาส ลอนคลื่น D-Lite หนา 1.2 มม. (สีเทาอัลลอยด์)',
    image: '/materials/fiberglass-wave-gray.jpg',
    description: 'หลังคาไฟเบอร์กลาส ลอนคลื่น D-Lite หนา 1.2 มม. สีเทาอัลลอยด์',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 2650,
      'M_PLUS': 2750,
      'L': 2850,
      'L_PLUS': 2900,
      'STAINLESS_S': 4200,
      'STAINLESS_M': 5900
    }
  },
  {
    id: 'fiberglass-wave',
    type: 'translucent',
    name: 'หลังคาไฟเบอร์กลาส ลอนคลื่น D-Lite หนา 1.2 มม.',
    image: '/materials/fiberglass-wave.jpg',
    description: 'หลังคาไฟเบอร์กลาส ลอนคลื่น D-Lite หนา 1.2 มม.',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 2550,
      'M_PLUS': 2650,
      'L': 2750,
      'L_PLUS': 2850,
      'STAINLESS_S': 4100,
      'STAINLESS_M': 5700
    }
  },
  {
    id: 'poly-corrugated',
    type: 'translucent',
    name: 'หลังคาโพลีลอนเล็ก หนา 1.2 มม./1.5 มม.',
    image: '/materials/poly-corrugated.jpg',
    description: 'หลังคาโพลีลอนเล็ก หนา 1.2 มม. หรือ 1.5 มม.',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 2550,
      'M_PLUS': 2650,
      'L': 2750,
      'L_PLUS': 2850,
      'STAINLESS_S': 4100,
      'STAINLESS_M': 5700
    }
  },
  {
    id: 'clear-metal-sheet',
    type: 'translucent',
    name: 'หลังคาแผ่นใสไฟเบอร์กลาสลอนเมทัลชีท หนา 1.2 มม. / หลังคาใสโพลีฯลอนเมทัลชีท หนา 1.2 มม.',
    image: '/materials/clear-metal-sheet.jpg',
    description: 'หลังคาแผ่นใสไฟเบอร์กลาสลอนเมทัลชีท หรือโพลีลอนเมทัลชีท หนา 1.2 มม.',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 2150,
      'M_PLUS': 2250,
      'L': 2350,
      'L_PLUS': 2450,
      'STAINLESS_S': 3700,
      'STAINLESS_M': 4800
    }
  },
  {
    id: 'polycarbonate-10mm',
    type: 'translucent',
    name: 'หลังคาโพลีคาร์บอเนต Polycarbonate หนา 10 มม.',
    image: '/materials/polycarbonate-10mm.jpg',
    description: 'หลังคาโพลีคาร์บอเนต Polycarbonate หนา 10 มม.',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 2150,
      'M_PLUS': 2250,
      'L': 2350,
      'L_PLUS': 2450,
      'STAINLESS_S': 3700,
      'STAINLESS_M': 4800
    }
  },
  {
    id: 'polycarbonate-8mm',
    type: 'translucent',
    name: 'หลังคาโพลีคาร์บอเนต Polycarbonate หนา 8 มม.',
    image: '/materials/polycarbonate-8mm.jpg',
    description: 'หลังคาโพลีคาร์บอเนต Polycarbonate หนา 8 มม.',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 2000,
      'M_PLUS': 2100,
      'L': 2150,
      'L_PLUS': 2250,
      'STAINLESS_S': 3500,
      'STAINLESS_M': 4600
    }
  },
  {
    id: 'polycarbonate-6mm',
    type: 'translucent',
    name: 'หลังคาโพลีคาร์บอเนต Polycarbonate หนา 6 มม.',
    image: '/materials/polycarbonate-6mm.jpg',
    description: 'หลังคาโพลีคาร์บอเนต Polycarbonate หนา 6 มม.',
    sizes: [
      { id: 'M', name: 'M' },
      { id: 'M_PLUS', name: 'M+' },
      { id: 'L', name: 'L' },
      { id: 'L_PLUS', name: 'L+' },
      { id: 'STAINLESS_S', name: 'Stainless S' },
      { id: 'STAINLESS_M', name: 'Stainless M' }
    ],
    pricePerSqm: {
      'M': 1800,
      'M_PLUS': 1900,
      'L': 2000,
      'L_PLUS': 2100,
      'STAINLESS_S': 3300,
      'STAINLESS_M': 4400
    }
  }
];