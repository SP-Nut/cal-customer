import { Material } from '../types';

export const opaqueMaterials: Material[] = [
  {
    id: 'aluminum-roof-3mm',
    type: 'opaque',
    name: 'หลังคาอลูมิเนียม 3 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาอลูมิเนียมรูฟคุณภาพสูง หนา 3 มิลลิเมตร ทนทานต่อสภาพอากาศ มีความแข็งแรง ไม่เป็นสนิม เหมาะสำหรับการใช้งานในบ้านเรือน โรงงาน หรือสิ่งปลูกสร้างทั่วไป',
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
    id: 'vinyl-dream-roof-6mm',
    type: 'opaque',
    name: 'หลังคาไวนิล ดรีมรูฟ 6 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาไวนิลรุ่นดรีมรูฟ ท้องเรียบ ระบบคลิป-ล็อค หนา 6 มิลลิเมตร ผิวเรียบสวยงาม ติดตั้งง่าย ทนทานต่อแสงแดดและฝน มีคุณสมบัติกันความร้อนได้ดี เหมาะสำหรับบ้านพักอาศัย',
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
    id: 'vinyl-smooth-round-square-6mm',
    type: 'opaque',
    name: 'หลังคาไวนิล ท้องเรียบ หัวกลม/เหลี่ยม 6 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาไวนิลรุ่นท้องเรียบ มีหัวแบบกลมและเหลี่ยม หนา 6 มิลลิเมตร ผิวเรียบ สีสวย ทนทานต่อสภาพอากาศ ไม่แตกหัก ไม่เปื่อยเน่า เหมาะสำหรับโครงสร้างหลังคาแบบต่างๆ',
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
    id: 'vinyl-smooth-square-5mm-pr6',
    type: 'opaque',
    name: 'หลังคาไวนิล ท้องเรียบ หัวเหลี่ยม 5 มม. (PR-6)',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาไวนิลรุ่น PR-6 ท้องเรียบหัวเหลี่ยม หนา 5 มิลลิเมตร คุณภาพมาตรฐาน น้ำหนักเบา ทนทานต่อแสง UV ไม่ซีดจาง เหมาะสำหรับงบประมาณประหยัด แต่ยังคงคุณภาพดี',
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
    id: 'winter-roof-2mm',
    type: 'opaque',
    name: 'หลังคาวินเทอร์รูฟ 2 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาวินเทอร์รูฟ หนา 2 มิลลิเมตร วัสดุเกรดพรีเมียม ออกแบบให้ทนทานในสภาพอากาศหนาว ป้องกันการควบแน่นของไอน้ำ มีความยืดหยุ่นสูง ไม่แตกเมื่อเจอการขยายตัวของโครงสร้าง',
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
    id: 'metal-sheet-sandwich-35mm-pu25',
    type: 'opaque',
    name: 'เมทัลชีท แผ่นแซนวิช 0.35 มม. + ฉนวน PU 25 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีทแผ่นแซนวิช หนา 0.35 มิลลิเมตร ติดฉนวนโพลียูรีเทน (PU) หนา 25 มิลลิเมตร ป้องกันความร้อนได้ดีเยี่ยม ลดเสียงรบกวน โครงสร้างแข็งแรง เหมาะสำหรับโรงงาน คลังสินค้า',
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
    id: 'metal-sheet-sandwich-bluescope-35mm-pu25',
    type: 'opaque',
    name: 'เมทัลชีท แผ่นแซนวิช บลูสโคป 0.35 มม. + ฉนวน PU 25 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีทแผ่นแซนวิช แบรนด์บลูสโคป หนา 0.35 มิลลิเมตร ติดฉนวน PU 25 มิลลิเมตร คุณภาพพรีเมียม ทนสนิมดีกว่าเหล็กปกติ สีสวยทนนาน เหมาะสำหรับงานคุณภาพสูง (ราคาเพิ่ม 200 บาท)',
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
    id: 'metal-sheet-snaplock-35mm-pu25',
    type: 'opaque',
    name: 'เมทัลชีท ลอนสแนปล็อค 0.35 มม. + ฉนวน PU 25 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีทลอนสแนปล็อค หนา 0.35 มิลลิเมตร ติดฉนวนกันความร้อน PU หนา 25 มิลลิเมตร ระบบล็อคพิเศษ กันน้ำรั่วซึม ป้องกันความร้อนดี เหมาะสำหรับบ้านพักอาศัยและอาคารพาณิชย์',
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
    id: 'metal-sheet-35mm-pu25',
    type: 'opaque',
    name: 'เมทัลชีท 0.35 มม. + ฉนวน PU 25 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีทมาตรฐาน หนา 0.35 มิลลิเมตร ติดฉนวนโพลียูรีเทน หนา 25 มิลลิเมตร ช่วยป้องกันความร้อน ลดค่าไฟฟ้า โครงสร้างแข็งแรง ราคาประหยัด เหมาะสำหรับการใช้งานทั่วไป',
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
    id: 'metal-sheet-35mm-pu50',
    type: 'opaque',
    name: 'เมทัลชีท 0.35 มม. + ฉนวน PU 50 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีทหนา 0.35 มิลลิเมตร ติดฉนวน PU หนา 50 มิลลิเมตร ป้องกันความร้อนได้ดีกว่าฉนวน 25 มม. เหมาะสำหรับพื้นที่ที่ต้องการการป้องกันความร้อนสูง เช่น โรงงาน คลังเก็บสินค้า (ราคาเพิ่ม 200 บาท)',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 2000,
      'M_PLUS': 2100,
      'L': 2200,
      'L_PLUS': 2300,
      'STAINLESS_S': 3500,
      'STAINLESS_M': 4600
    }
  },
  {
    id: 'metal-sheet-35mm-pe5',
    type: 'opaque',
    name: 'เมทัลชีท 0.35 มม. + ฉนวน PE 5 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีทหนา 0.35 มิลลิเมตร ติดฉนวนโพลีเอทิลีน (PE) หนา 5 มิลลิเมตร วัสดุฉนวนเบื้องต้น ช่วยป้องกันความร้อนและลดเสียงในระดับปานกลาง ราคาประหยัด เหมาะสำหรับงบประมาณจำกัด',
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
    id: 'metal-sheet-bluescope-35mm-snaplock',
    type: 'opaque',
    name: 'บลูสโคป ลอนสแนปล็อค 0.35 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีท บลูสโคป หนา 0.35 มิลลิเมตร ลอนสแนปล็อค ไม่ติดฉนวน คุณภาพพรีเมียม ทนสนิมดีเยี่ยม สีทนนาน โครงสร้างแข็งแรง เหมาะสำหรับโครงการที่ต้องการคุณภาพสูง',
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
    id: 'metal-sheet-bluescope-40mm-snaplock',
    type: 'opaque',
    name: 'บลูสโคป ลอนสแนปล็อค 0.40 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีท บลูสโคป หนา 0.40 มิลลิเมตร ลอนสแนปล็อค ไม่ติดฉนวน หนากว่าแบบ 0.35 มม. ทนทานมากขึ้น เหมาะสำหรับโครงสร้างขนาดใหญ่ที่ต้องการความแข็งแรงเพิ่มเติม (ราคาเพิ่ม 100 บาท)',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 1900,
      'M_PLUS': 2000,
      'L': 2100,
      'L_PLUS': 2200,
      'STAINLESS_S': 3400,
      'STAINLESS_M': 4500
    }
  },
  {
    id: 'metal-sheet-bluescope-47mm-snaplock',
    type: 'opaque',
    name: 'บลูสโคป ลอนสแนปล็อค 0.47 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีท บลูสโคป หนา 0.47 มิลลิเมตร ลอนสแนปล็อค ไม่ติดฉนวน หนาที่สุดในกลุ่มนี้ ทนทานสูงสุด เหมาะสำหรับโครงสร้างหนัก โรงงานอุตสาหกรรม หรือพื้นที่ที่มีภาระลมแรง (ราคาเพิ่ม 200 บาท)',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 2000,
      'M_PLUS': 2100,
      'L': 2200,
      'L_PLUS': 2300,
      'STAINLESS_S': 3500,
      'STAINLESS_M': 4600
    }
  },
  {
    id: 'metal-sheet-outdoor-steel-35mm-snaplock',
    type: 'opaque',
    name: 'เหล็กนอก ลอนสแนปล็อค 0.35 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีท เหล็กนอก หนา 0.35 มิลลิเมตร ลอนสแนปล็อค ไม่ติดฉนวน วัสดุคุณภาพมาตรฐาน ราคาประหยัด โครงสร้างแข็งแรง เหมาะสำหรับงานทั่วไป โรงเก็บของ หรือพื้นที่ที่ไม่ต้องการฉนวนกันความร้อน',
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
    id: 'metal-sheet-outdoor-steel-40mm-snaplock',
    type: 'opaque',
    name: 'เหล็กนอก ลอนสแนปล็อค 0.40 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีท เหล็กนอก หนา 0.40 มิลลิเมตร ลอนสแนปล็อค ไม่ติดฉนวน หนากว่าแบบ 0.35 มม. ทนทานมากขึ้น เหมาะสำหรับโครงการที่ต้องการความแข็งแรงเพิ่มเติม (ราคาเพิ่ม 100 บาท)',
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
    id: 'metal-sheet-outdoor-steel-47mm-snaplock',
    type: 'opaque',
    name: 'เหล็กนอก ลอนสแนปล็อค 0.47 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีท เหล็กนอก หนา 0.47 มิลลิเมตร ลอนสแนปล็อค ไม่ติดฉนวน หนาที่สุด ทนทานสูงสุดในกลุ่มเหล็กนอก เหมาะสำหรับโครงสร้างหนัก โรงงาน หรือพื้นที่ที่มีภาระลมแรง (ราคาเพิ่ม 200 บาท)',
    sizes: [
      { id: 'M', name: 'M'},
      { id: 'M_PLUS', name: 'M+'},
      { id: 'L', name: 'L'},
      { id: 'L_PLUS', name: 'L+'},
      { id: 'STAINLESS_S', name: 'Stainless S'},
      { id: 'STAINLESS_M', name: 'Stainless M'}
    ],
    pricePerSqm: {
      'M': 1900,
      'M_PLUS': 2000,
      'L': 2100,
      'L_PLUS': 2200,
      'STAINLESS_S': 3400,
      'STAINLESS_M': 4500
    }
  },
  {
    id: 'metal-sheet-bluescope-zacs-cool-35mm',
    type: 'opaque',
    name: 'บลูสโคป แซคส์ คูล 0.35 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีท บลูสโคป แซคส์® คูล หนา 0.35 มิลลิเมตร ไม่ติดฉนวน เทคโนโลยีพิเศษช่วยสะท้อนความร้อน ลดอุณหภูมิใต้หลังคา ประหยัดพลังงาน สีสวยทนนาน เหมาะสำหรับพื้นที่ร้อน',
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
    id: 'metal-sheet-35mm-no-insulation',
    type: 'opaque',
    name: 'เมทัลชีท มาตรฐาน 0.35 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีทมาตรฐาน หนา 0.35 มิลลิเมตร ไม่ติดฉนวนกันความร้อน วัสดุพื้นฐาน ราคาประหยัดที่สุด โครงสร้างแข็งแรงพอใช้ เหมาะสำหรับงานทั่วไป โรงเก็บของ หรือพื้นที่ที่ไม่ต้องการความเย็น',
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
  },
  {
    id: 'metal-sheet-40mm-no-insulation',
    type: 'opaque',
    name: 'เมทัลชีท มาตรฐาน 0.40 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีทมาตรฐาน หนา 0.40 มิลลิเมตร ไม่ติดฉนวนกันความร้อน หนากว่าแบบ 0.35 มม. ทนทานมากขึ้น โครงสร้างแข็งแรงกว่า เหมาะสำหรับโครงการที่ต้องการความทนทานเพิ่มเติม (ราคาเพิ่ม 100 บาท)',
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
    id: 'metal-sheet-47mm-no-insulation',
    type: 'opaque',
    name: 'เมทัลชีท มาตรฐาน 0.47 มม.',
    image: '/materials/aluminum-roof.jpg',
    description: 'หลังคาเมทัลชีทมาตรฐาน หนา 0.47 มิลลิเมตร ไม่ติดฉนวนกันความร้อน หนาที่สุดในกลุ่มมาตรฐาน ทนทานสูงสุด เหมาะสำหรับโครงสร้างหนัก โรงงานอุตสาหกรรม หรือพื้นที่ที่มีภาระลมแรง (ราคาเพิ่ม 200 บาท)',
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
  }
];