import { Material } from '../types';

export const translucentMaterials: Material[] = [
  {
    id: 'shinkolite-prime',
    type: 'translucent',
    name: 'Shinkolite Prime 10 มม.',
    image: '/materials/shinkolite-prime.jpg',
    description: 'วัสดุคุณภาพสูง ความหนา 10 มม. ให้ความแข็งแรงและความโปร่งแสงสูง',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาดเล็ก' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาดกลาง' },
      { id: 'STAINLESS_L', name: 'Stainless L', description: 'โครงสร้างสแตนเลส 304 ขนาดใหญ่' }
    ],
    pricePerSqm: {
      'S': 0,
      'M': 8350,
      'M_PLUS': 8890,
      'L': 9100,
      'L_PLUS': 10300,
      'STAINLESS_S': 14900,
      'STAINLESS_M': 15900,
      'STAINLESS_L': 16900
    }
  },
  {
    id: 'shinkolite-heat-cut',
    type: 'translucent',
    name: 'Shinkolite Heat Cut/Nature 6 มม.',
    image: '/materials/shinkolite-heat.jpg',
    description: 'แผ่นอะคริลิคพรีเมียม ความหนา 6 มม. พร้อมคุณสมบัติกันความร้อน',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาดเล็ก' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาดกลาง' },
      { id: 'STAINLESS_L', name: 'Stainless L', description: 'โครงสร้างสแตนเลส 304 ขนาดใหญ่' }
    ],
    pricePerSqm: {
      'S': 0,
      'M': 5550,
      'M_PLUS': 5700,
      'L': 5900,
      'L_PLUS': 6100,
      'STAINLESS_S': 11900,
      'STAINLESS_M': 12900,
      'STAINLESS_L': 13900
    }
  },
  {
    id: 'shinkolite-superior',
    type: 'translucent',
    name: 'Shinkolite Superior 6 มม.',
    image: '/materials/shinkolite-superior.jpg',
    description: 'แผ่นอะคริลิคคุณภาพสูง ความหนา 6 มม. เหมาะสำหรับงานทั่วไป',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 0,
      'M': 4250,
      'M_PLUS': 4400,
      'L': 4600,
      'L_PLUS': 4800,
      'STAINLESS_S': 9900,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  },
  {
    id: 'shinkolite-shade',
    type: 'translucent',
    name: 'Shinkolite Shade Series 4 มม.',
    image: '/materials/shinkolite-shade.jpg',
    description: 'แผ่นอะคริลิคซีรีส์พิเศษ ความหนา 4 มม. พร้อมเฉดสีสวยงาม',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 0,
      'M': 3850,
      'M_PLUS': 4050,
      'L': 4250,
      'L_PLUS': 4400,
      'STAINLESS_S': 9100,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  },
  {
    id: 'poly-embossed',
    type: 'translucent',
    name: 'โพลีชีทตัน Embossed 3 มม.',
    image: '/materials/poly-embossed.jpg',
    description: 'แผ่นโพลีคาร์บอเนตลายนูน ความหนา 3 มม. ทนทานต่อแรงกระแทก',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 4800,
      'M': 3300,
      'M_PLUS': 3400,
      'L': 3600,
      'L_PLUS': 3750,
      'STAINLESS_S': 6600,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  },
  {
    id: 'fiber-flat',
    type: 'translucent',
    name: 'ไฟเบอร์เรียบ D-Lite/J-Roof',
    image: '/materials/fiber-flat.jpg',
    description: 'แผ่นไฟเบอร์กลาสเรียบ น้ำหนักเบา ติดตั้งง่าย ราคาประหยัด',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 4600,
      'M': 3100,
      'M_PLUS': 3200,
      'L': 3400,
      'L_PLUS': 3600,
      'STAINLESS_S': 6400,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  },
  {
    id: 'fiber-wave-alloy',
    type: 'translucent',
    name: 'ไฟเบอร์คลื่น D-Lite 1.2 มม. (เทาอัลลอย)',
    image: '/materials/fiber-wave-alloy.jpg',
    description: 'แผ่นไฟเบอร์กลาสลอนคลื่นสีเทาอัลลอย ความหนา 1.2 มม.',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 4200,
      'M': 2650,
      'M_PLUS': 2750,
      'L': 2850,
      'L_PLUS': 2900,
      'STAINLESS_S': 0,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  },
  {
    id: 'fiber-wave',
    type: 'translucent',
    name: 'ไฟเบอร์คลื่น D-Lite 1.2 มม.',
    image: '/materials/fiber-wave.jpg',
    description: 'แผ่นไฟเบอร์กลาสลอนคลื่น ความหนา 1.2 มม.',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 4100,
      'M': 2550,
      'M_PLUS': 2650,
      'L': 2750,
      'L_PLUS': 2850,
      'STAINLESS_S': 5700,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  },
  {
    id: 'poly-small',
    type: 'translucent',
    name: 'โพลีลอนเล็ก 1.2/1.5 มม.',
    image: '/materials/poly-small.jpg',
    description: 'แผ่นโพลีคาร์บอเนตลอนเล็ก ความหนา 1.2/1.5 มม.',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 4100,
      'M': 2550,
      'M_PLUS': 2650,
      'L': 2750,
      'L_PLUS': 2850,
      'STAINLESS_S': 5700,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  },
  {
    id: 'clear-metalsheet',
    type: 'translucent',
    name: 'ใสลอนเมทัลชีท/โพลี 1.2 มม.',
    image: '/materials/clear-metalsheet.jpg',
    description: 'แผ่นโพลีคาร์บอเนตใสลอนเมทัลชีท ความหนา 1.2 มม.',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 3700,
      'M': 2150,
      'M_PLUS': 2250,
      'L': 2350,
      'L_PLUS': 2450,
      'STAINLESS_S': 4800,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  },
  {
    id: 'polycarbonate-10mm',
    type: 'translucent',
    name: 'โพลีคาร์บอเนต 10 มม.',
    image: '/materials/polycarbonate-10mm.jpg',
    description: 'แผ่นโพลีคาร์บอเนตใส ความหนา 10 มม.',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 3700,
      'M': 2150,
      'M_PLUS': 2250,
      'L': 2350,
      'L_PLUS': 2450,
      'STAINLESS_S': 4800,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  },
  {
    id: 'polycarbonate-8mm',
    type: 'translucent',
    name: 'โพลีคาร์บอเนต 8 มม.',
    image: '/materials/polycarbonate-8mm.jpg',
    description: 'แผ่นโพลีคาร์บอเนตใส ความหนา 8 มม.',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 3500,
      'M': 2000,
      'M_PLUS': 2100,
      'L': 2150,
      'L_PLUS': 2250,
      'STAINLESS_S': 4600,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  },
  {
    id: 'polycarbonate-6mm',
    type: 'translucent',
    name: 'โพลีคาร์บอเนต 6 มม.',
    image: '/materials/polycarbonate-6mm.jpg',
    description: 'แผ่นโพลีคาร์บอเนตใส ความหนา 6 มม.',
    sizes: [
      { id: 'S', name: 'S', description: 'ขนาดพื้นที่น้อยกว่า 12 ตร.ม.' },
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless 304', description: 'โครงสร้างสแตนเลส 304' }
    ],
    pricePerSqm: {
      'S': 3300,
      'M': 1800,
      'M_PLUS': 1900,
      'L': 2000,
      'L_PLUS': 2100,
      'STAINLESS_S': 4400,
      'STAINLESS_M': 0,
      'STAINLESS_L': 0
    }
  }
];