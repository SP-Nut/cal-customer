import { Material } from '../types';

export const translucentMaterials: Material[] = [
  {
    id: 'shinkolite-prime',
    type: 'translucent',
    name: 'Shinkolite Prime 10 มม.',
    image: '/materials/shinkolite-prime.jpg',
    description: 'วัสดุคุณภาพสูง ความหนา 10 มม. ให้ความแข็งแรงและความโปร่งแสงสูง',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 8350,
      'M_PLUS': 8890,
      'L': 9100,
      'L_PLUS': 10300,
      'STAINLESS_S': 14900,
      'STAINLESS_M': 15900
    }
  },
  {
    id: 'shinkolite-heat-cut',
    type: 'translucent',
    name: 'Shinkolite Heat Cut/Nature 6 มม.',
    image: '/materials/shinkolite-heat.jpg',
    description: 'แผ่นอะคริลิคพรีเมียม ความหนา 6 มม. พร้อมคุณสมบัติกันความร้อน',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 5550,
      'M_PLUS': 5700,
      'L': 5900,
      'L_PLUS': 6100,
      'STAINLESS_S': 11900,
      'STAINLESS_M': 12900
    }
  },
  {
    id: 'shinkolite-superior',
    type: 'translucent',
    name: 'Shinkolite Superior 6 มม.',
    image: '/materials/shinkolite-superior.jpg',
    description: 'แผ่นอะคริลิคคุณภาพสูง ความหนา 6 มม. เหมาะสำหรับงานทั่วไป',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 4250,
      'M_PLUS': 4400,
      'L': 4600,
      'L_PLUS': 4800,
      'STAINLESS_S': 9900,
      'STAINLESS_M': 10300
    }
  },
  {
    id: 'shinkolite-shade',
    type: 'translucent',
    name: 'Shinkolite Shade Series 4 มม.',
    image: '/materials/shinkolite-shade.jpg',
    description: 'แผ่นอะคริลิคซีรีส์พิเศษ ความหนา 4 มม. พร้อมเฉดสีสวยงาม',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 3850,
      'M_PLUS': 4050,
      'L': 4250,
      'L_PLUS': 4400,
      'STAINLESS_S': 9500,
      'STAINLESS_M': 9900
    }
  },
  {
    id: 'polycarbonate-corrugated',
    type: 'translucent',
    name: 'โพลีคาร์บอเนต ลอนเล็ก 6 มม.',
    image: '/materials/polycarbonate-corrugated.jpg',
    description: 'แผ่นโพลีคาร์บอเนตลอนเล็ก ความหนา 6 มม. ทนทานและโปร่งแสงดี',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 2800,
      'M_PLUS': 2900,
      'L': 3000,
      'L_PLUS': 3100,
      'STAINLESS_S': 7300,
      'STAINLESS_M': 7700
    }
  },
  {
    id: 'polycarbonate-6mm',
    type: 'translucent',
    name: 'โพลีคาร์บอเนต เรียบ 6 มม.',
    image: '/materials/polycarbonate-6mm.jpg',
    description: 'แผ่นโพลีคาร์บอเนตเรียบ ความหนา 6 มม. ใสและทนทาน',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 2800,
      'M_PLUS': 2900,
      'L': 3000,
      'L_PLUS': 3100,
      'STAINLESS_S': 7300,
      'STAINLESS_M': 7700
    }
  },
  {
    id: 'polycarbonate-16mm',
    type: 'translucent',
    name: 'โพลีคาร์บอเนต หลังคา 16 มม.',
    image: '/materials/polycarbonate-16mm.jpg',
    description: 'แผ่นโพลีคาร์บอเนตสำหรับหลังคา ความหนา 16 มม. แข็งแรงสูง',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 3850,
      'M_PLUS': 4000,
      'L': 4150,
      'L_PLUS': 4300,
      'STAINLESS_S': 8600,
      'STAINLESS_M': 9000
    }
  },
  {
    id: 'polycarbonate-32mm',
    type: 'translucent',
    name: 'โพลีคาร์บอเนต หลังคา 32 มม.',
    image: '/materials/polycarbonate-32mm.jpg',
    description: 'แผ่นโพลีคาร์บอเนตสำหรับหลังคา ความหนา 32 มม. ประสิทธิภาพสูงสุด',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 5400,
      'M_PLUS': 5600,
      'L': 5800,
      'L_PLUS': 6000,
      'STAINLESS_S': 10900,
      'STAINLESS_M': 11300
    }
  },
  {
    id: 'pvc-corrugated',
    type: 'translucent',
    name: 'พีวีซี ลอนเล็ก PVC กันแสง UV',
    image: '/materials/pvc-corrugated.jpg',
    description: 'แผ่นพีวีซีลอนเล็ก กันแสง UV ราคาประหยัด',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 1950,
      'M_PLUS': 2050,
      'L': 2150,
      'L_PLUS': 2250,
      'STAINLESS_S': 6000,
      'STAINLESS_M': 6400
    }
  },
  {
    id: 'fiberglass-corrugated',
    type: 'translucent',
    name: 'ไฟเบอร์กลาส ลอนเล็ก ใส',
    image: '/materials/fiberglass-corrugated.jpg',
    description: 'แผ่นไฟเบอร์กลาสลอนเล็ก ใสและทนทาน',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 1750,
      'M_PLUS': 1850,
      'L': 1950,
      'L_PLUS': 2050,
      'STAINLESS_S': 5400,
      'STAINLESS_M': 5800
    }
  },
  {
    id: 'fiberglass-flat',
    type: 'translucent',
    name: 'ไฟเบอร์กลาส เรียบ ใส',
    image: '/materials/fiberglass-flat.jpg',
    description: 'แผ่นไฟเบอร์กลาสเรียบ ใสและเรียบสวย',
    sizes: [
      { id: 'M', name: 'M', description: 'ขนาดพื้นที่ 12-18 ตร.ม.' },
      { id: 'M_PLUS', name: 'M+', description: 'ขนาดพื้นที่ 18-24 ตร.ม.' },
      { id: 'L', name: 'L', description: 'ขนาดพื้นที่ 24-36 ตร.ม.' },
      { id: 'L_PLUS', name: 'L+', description: 'ขนาดพื้นที่มากกว่า 36 ตร.ม.' },
      { id: 'STAINLESS_S', name: 'Stainless S', description: 'โครงสร้างสแตนเลส 304 ขนาด S' },
      { id: 'STAINLESS_M', name: 'Stainless M', description: 'โครงสร้างสแตนเลส 304 ขนาด M' }
    ],
    pricePerSqm: {
      'M': 1750,
      'M_PLUS': 1850,
      'L': 1950,
      'L_PLUS': 2050,
      'STAINLESS_S': 5400,
      'STAINLESS_M': 5800
    }
  }
];