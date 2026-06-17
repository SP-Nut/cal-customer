import type { Material, MaterialCategory, SizeOption } from "@/domain/calculator/types";

export const categories: Array<{
  id: MaterialCategory;
  name: string;
  description: string;
}> = [
  {
    id: "translucent",
    name: "หลังคาโปร่งแสง",
    description: "รับแสงธรรมชาติ เหมาะกับโรงรถ ระเบียง และพื้นที่ใช้งานกลางวัน"
  },
  {
    id: "opaque",
    name: "หลังคาทึบแสง",
    description: "กันแดด ลดความร้อน เพิ่มความเป็นส่วนตัว และดูแลรักษาง่าย"
  }
];

export const sizeOptions: SizeOption[] = [
  {
    code: "M",
    label: "M",
    humanLabel: "มาตรฐาน (M)",
    image: "/size/size-m.png",
    description: "โครงสร้างมาตรฐาน เหมาะกับงานบ้านทั่วไป ≤ 30 ตร.ม."
  },
  {
    code: "M_PLUS",
    label: "M+",
    humanLabel: "เสริมพิเศษ (M+)",
    image: "/size/size-m+.png",
    description: "เพิ่มความแข็งแรง สำหรับพื้นที่ > 30 ตร.ม. หรืองานหนักขึ้น"
  },
  {
    code: "L",
    label: "L",
    humanLabel: "โครงหนัก (L)",
    image: "/size/size-l.png",
    description: "ช่วงกว้างขึ้น เหมาะกับงานโรงรถและพื้นที่หน้าบ้านขนาดใหญ่"
  },
  {
    code: "L_PLUS",
    label: "L+",
    humanLabel: "โครงหนักพิเศษ (L+)",
    image: "/size/size-l+.png",
    description: "โครงสร้างพรีเมียม สำหรับพื้นที่กว้างและงานที่ต้องการความโดดเด่น"
  },
  {
    code: "STAINLESS_S",
    label: "Stainless S",
    humanLabel: "สแตนเลส S",
    image: "/size/size-m.png",
    description: "งานสแตนเลสขนาดเริ่มต้น ดูสะอาด ทนสนิม ดูแลง่าย"
  },
  {
    code: "STAINLESS_M",
    label: "Stainless M",
    humanLabel: "สแตนเลส M",
    image: "/size/size-m+.png",
    description: "งานสแตนเลสขนาดกลาง เหมาะกับงานที่ต้องการภาพลักษณ์พรีเมียม"
  }
];

export const materials: Material[] = [
  {
    id: "polycarbonate-10mm",
    category: "translucent",
    name: "โพลีคาร์บอเนต 10 มม.",
    shortName: "Polycarbonate 10 mm",
    image: "/materials/translucent/โพลีคาร์บอเนต.webp",
    description: "แผ่นโพลีคาร์บอเนตหนา กันร้อนดี น้ำหนักเบา และรับแสงธรรมชาติได้ดี",
    badges: ["รับแสง", "กันร้อน", "คุ้มค่า"],
    pricePerSqm: {
      M: 2150,
      M_PLUS: 2250,
      L: 2350,
      L_PLUS: 2450,
      STAINLESS_S: 3700,
      STAINLESS_M: 4800
    }
  },
  {
    id: "shinkolite-prime",
    category: "translucent",
    name: "Shinkolite Prime 10 มม.",
    shortName: "Shinkolite Prime",
    image: "/materials/translucent/ชินโคไลท์.webp",
    description: "อะคริลิคเกรดพรีเมียม ใสเหมือนกระจก เหมาะกับงานบ้านและอาคารที่ต้องการความหรู",
    badges: ["พรีเมียม", "ใสสวย", "ทน UV"],
    pricePerSqm: {
      M: 8350,
      M_PLUS: 8890,
      L: 9100,
      L_PLUS: 10300,
      STAINLESS_M: 15900
    }
  },
  {
    id: "fiberglass-dlite",
    category: "translucent",
    name: "ไฟเบอร์กลาส D-Lite ลอนเรียบ",
    shortName: "D-Lite Smooth",
    image: "/materials/translucent/ดีไลท์ลอนเรียบ.webp",
    description: "วัสดุโปร่งแสงน้ำหนักเบา เหมาะกับงานที่ต้องการความประหยัดและติดตั้งเร็ว",
    badges: ["ประหยัด", "น้ำหนักเบา", "ติดตั้งง่าย"],
    pricePerSqm: {
      M: 3100,
      M_PLUS: 3200,
      L: 3400,
      L_PLUS: 3600,
      STAINLESS_S: 4600,
      STAINLESS_M: 6400
    }
  },
  {
    id: "aluminum-roof",
    category: "opaque",
    name: "หลังคาอลูมิเนียม 3 มม.",
    shortName: "Aluminum Roof",
    image: "/materials/opaque/alr.webp",
    description: "วัสดุทึบแสง แข็งแรง ไม่เป็นสนิม เหมาะกับงานที่ต้องการความทนทานสูง",
    badges: ["ไม่เป็นสนิม", "ทนแดด", "งานพรีเมียม"],
    pricePerSqm: {
      M: 3650,
      M_PLUS: 3850,
      L: 4050,
      L_PLUS: 4250,
      STAINLESS_M: 9500
    }
  },
  {
    id: "vinyl-lock",
    category: "opaque",
    name: "ไวนิลคลิปล็อค 6 มม.",
    shortName: "Vinyl Clip Lock",
    image: "/materials/opaque/ไวนิลคริปล๊อค.webp",
    description: "หลังคาไวนิลท้องเรียบ ดูสะอาด กันร้อนดี และเหมาะกับบ้านพักอาศัย",
    badges: ["กันร้อน", "เสียงเบา", "บ้านพักอาศัย"],
    pricePerSqm: {
      M: 2750,
      M_PLUS: 2850,
      L: 2900,
      L_PLUS: 3000,
      STAINLESS_S: 4300,
      STAINLESS_M: 6000
    }
  },
  {
    id: "metal-sheet-pu",
    category: "opaque",
    name: "เมทัลชีท + ฉนวน PU",
    shortName: "Metal Sheet PU",
    image: "/materials/opaque/PU.webp",
    description: "โครงสร้างเมทัลชีทพร้อมฉนวน ช่วยลดความร้อน เหมาะกับโรงรถและพื้นที่ใช้งานหนัก",
    badges: ["กันร้อน", "แข็งแรง", "ยอดนิยม"],
    pricePerSqm: {
      M: 1800,
      M_PLUS: 1900,
      L: 2000,
      L_PLUS: 2100,
      STAINLESS_S: 3300,
      STAINLESS_M: 4400
    }
  }
];

export function getMaterial(id: string) {
  return materials.find((material) => material.id === id) ?? materials[0];
}

export function getSizeOption(code: string) {
  return sizeOptions.find((size) => size.code === code) ?? sizeOptions[0];
}

