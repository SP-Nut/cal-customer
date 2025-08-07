import { Material } from '../types';

export const opaqueMaterials: Material[] = [
  {
    id: 'aluminum-roof',
    type: 'opaque',
    name: 'Aluminum Roof หนา 3 มม.',
    image: '/materials/aluminum-roof.png',
    description: 'หลังคาอลูมิเนียมคุณภาพสูง ความหนา 3 มม. ทนทานต่อสภาพอากาศ',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 3650,
      'M_PLUS': 3850,
      'L': 4050,
      'L_PLUS': 4250,
      'STAINLESS_S': 0,
      'STAINLESS_M': 9500
    }
  },
  {
    id: 'vinyl-dream-roof',
    type: 'opaque',
    name: 'หลังคาไวนิล รุ่นดรีมรูฟ Vinyl Dream Roof ท้องเรียบ คลิป-ล็อค หนา 6 มม.',
    image: '/materials/vinyl-dream-roof.jpg',
    description: 'หลังคาไวนิลรุ่นดรีมรูฟ ท้องเรียบพร้อมระบบคลิป-ล็อค ความหนา 6 มม.',
     sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 2750,
      'M_PLUS': 2850,
      'L': 2900,
      'L_PLUS': 2900,
      'STAINLESS_S': 4300,
      'STAINLESS_M': 6000
    }
  },
  {
    id: 'vinyl-smooth-roof',
    type: 'opaque',
    name: 'หลังคาไวนิล รุ่นท้องเรียบหัวกลม/หัวเหลี่ยม Vinyl หนา 6 มม.',
    image: '/materials/vinyl-smooth-roof.jpg',
    description: 'หลังคาไวนิลท้องเรียบแบบหัวกลม/หัวเหลี่ยม ความหนา 6 มม.',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 2750,
      'M_PLUS': 2850,
      'L': 2900,
      'L_PLUS': 3000,
      'STAINLESS_S': 4300,
      'STAINLESS_M': 6000
    }
  },
  {
    id: 'vinyl-pr6-roof',
    type: 'opaque',
    name: 'หลังคาไวนิล รุ่นท้องเรียบหัวเหลี่ยม Vinyl หนา 5 มม. (PR-6)',
    image: '/materials/vinyl-pr6-roof.jpg',
    description: 'หลังคาไวนิลรุ่น PR-6 ท้องเรียบหัวเหลี่ยม ความหนา 5 มม.',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 2650,
      'M_PLUS': 2750,
      'L': 2800,
      'L_PLUS': 2900,
      'STAINLESS_S': 4200,
      'STAINLESS_M': 5900
    }
  },
  {
    id: 'winter-roof',
    type: 'opaque',
    name: 'หลังคาวินเทอร์รูฟ Winter roof หนา 2 มม.',
    image: '/materials/winter-roof.jpg',
    description: 'หลังคาวินเทอร์รูฟ ความหนา 2 มม. น้ำหนักเบา ทนทาน',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 2350,
      'M_PLUS': 2450,
      'L': 2550,
      'L_PLUS': 2650,
      'STAINLESS_S': 3900,
      'STAINLESS_M': 5000
    }
  },
  {
    id: 'metal-sheet-sandwich-bluescope',
    type: 'opaque',
    name: 'หลังคาเมทัลชีท หนา 0.35 มม. แผ่นแซนวิช หนา 0.35 มม. ติดฉนวน PU หนา 25 มม. บูลสโคป',
    image: '/materials/metal-sheet-sandwich.jpg',
    description: 'เมทัลชีทแผ่นแซนวิช พร้อมฉนวน PU หนา 25 มม. บูลสโคป)',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 2350,
      'M_PLUS': 2450,
      'L': 2550,
      'L_PLUS': 2650,
      'STAINLESS_S': 3900,
      'STAINLESS_M': 5000
    }
  },
    {
    id: 'metal-sheet-sandwich',
    type: 'opaque',
    name: 'หลังคาเมทัลชีท หนา 0.35 มม. แผ่นแซนวิช หนา 0.35 มม. ติดฉนวน PU หนา 25 มม.',
    image: '/materials/metal-sheet-sandwich.jpg',
    description: 'เมทัลชีทแผ่นแซนวิช พร้อมฉนวน PU หนา 25 มม. (บูลสโคป เพิ่ม 200 บาท)',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
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
    id: 'metal-sheet-snaplock',
    type: 'opaque',
    name: 'หลังคาเมทัลชีท หนา 0.35 มม. ลอนสแนปล็อค ติดฉนวนกันความร้อน PU หนา 25 มม.',
    image: '/materials/metal-sheet-snaplock.jpg',
    description: 'เมทัลชีทลอนสแนปล็อค พร้อมฉนวน PU หนา 25 มม.',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 2100,
      'M_PLUS': 2200,
      'L': 2300,
      'L_PLUS': 2400,
      'STAINLESS_S': 3650,
      'STAINLESS_M': 4750
    }
  },
  {
    id: 'metal-sheet-pu-25',
    type: 'opaque',
    name: 'หลังคาเมทัลชีท หนา 0.35 มม. ติดฉนวนกันความร้อน PU หนา 25 มม.',
    image: '/materials/metal-sheet-pu-25.jpg',
    description: 'เมทัลชีท พร้อมฉนวน PU หนา 25 มม. (PU หนา 50 มม. เพิ่ม 200 บาท)',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 1800,
      'M_PLUS': 1900,
      'L': 2000,
      'L_PLUS': 2100,
      'STAINLESS_S': 3300,
      'STAINLESS_M': 4400
    }
  },
  {
    id: 'metal-sheet-pe',
    type: 'opaque',
    name: 'หลังคาเมทัลชีท หนา 0.35 มม. ติดฉนวนกันความร้อน PE หนา 5 มม.',
    image: '/materials/metal-sheet-pe.jpg',
    description: 'เมทัลชีท พร้อมฉนวน PE หนา 5 มม.',
  sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 1600,
      'M_PLUS': 1700,
      'L': 1800,
      'L_PLUS': 1900,
      'STAINLESS_S': 3100,
      'STAINLESS_M': 4200
    }
  },
  {
    id: 'metal-sheet-bluescope-snaplock',
    type: 'opaque',
    name: 'หลังคาเมทัลชีท บูลสโคป หนา 0.35 มม. ลอนสแนปล็อค ไม่ติดฉนวนกันความร้อน',
    image: '/materials/metal-sheet-bluescope-snaplock.jpg',
    description: 'เมทัลชีทบูลสโคป ลอนสแนปล็อค (0.40 เพิ่ม 100 บาท / 0.47 เพิ่ม 200 บาท)',
     sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 1800,
      'M_PLUS': 1900,
      'L': 2000,
      'L_PLUS': 2100,
      'STAINLESS_S': 3300,
      'STAINLESS_M': 4400
    }
  },
  {
    id: 'metal-sheet-external-snaplock',
    type: 'opaque',
    name: 'หลังคาเมทัลชีท เหล็กนอก หนา 0.35 มม. ลอนสแนปล็อค ไม่ติดฉนวนกันความร้อน',
    image: '/materials/metal-sheet-external-snaplock.jpg',
    description: 'เมทัลชีทเหล็กนอก ลอนสแนปล็อค (0.40 เพิ่ม 100 บาท / 0.47 เพิ่ม 200 บาท)',
     sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 1700,
      'M_PLUS': 1800,
      'L': 1900,
      'L_PLUS': 2000,
      'STAINLESS_S': 3200,
      'STAINLESS_M': 4300
    }
  },
  {
    id: 'metal-sheet-bluescope-cool',
    type: 'opaque',
    name: 'หลังคาเมทัลชีท บลูสโคป แซคส์® คูล หนา 0.35 มม. ไม่ติดฉนวนกันความร้อน',
    image: '/materials/metal-sheet-bluescope-cool.jpg',
    description: 'เมทัลชีทบลูสโคป แซคส์® คูล ไม่ติดฉนวน',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 1600,
      'M_PLUS': 1700,
      'L': 1800,
      'L_PLUS': 1900,
      'STAINLESS_S': 3100,
      'STAINLESS_M': 4200
    }
  },
  {
    id: 'metal-sheet-basic',
    type: 'opaque',
    name: 'หลังคาเมทัลชีท หนา 0.35 มม. ไม่ติดฉนวนกันความร้อน',
    image: '/materials/metal-sheet-basic.jpg',
    description: 'เมทัลชีทพื้นฐาน ไม่ติดฉนวน (0.40 เพิ่ม 100 บาท / 0.47 เพิ่ม 200 บาท)',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 1500,
      'M_PLUS': 1600,
      'L': 1700,
      'L_PLUS': 1800,
      'STAINLESS_S': 3000,
      'STAINLESS_M': 4100
    }
  }
];