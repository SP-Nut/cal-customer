import type { AddOn } from "@/domain/calculator/types";

export const addOns: AddOn[] = [
  {
    id: "posts",
    group: "structure",
    name: "งานเสา",
    description: "เสารองรับโครงสร้าง คิดตามจำนวนต้น",
    pricingMode: "perPole",
    defaultOptionId: "single",
    options: [
      { id: "single", name: "เสาเดี่ยว", price: 2000 },
      { id: "cantilever", name: "เสาระแนง", price: 3500 },
      { id: "extension", name: "เสาเรียง", price: 2800 }
    ]
  },
  {
    id: "paint",
    group: "structure",
    name: "สีโครงสร้าง",
    description: "สีมาตรฐานฟรี สีพิเศษคิดเพิ่มตามพื้นที่",
    pricingMode: "perSqm",
    defaultOptionId: "standard",
    options: [
      { id: "standard", name: "สีมาตรฐาน", price: 0 },
      { id: "custom", name: "สีพิเศษ", price: 200 }
    ]
  },
  {
    id: "ceiling",
    group: "ceiling",
    name: "งานฝ้า",
    description: "งานฝ้าใต้หลังคา คิดตามพื้นที่",
    pricingMode: "perSqm",
    requiresSize: ["L_PLUS"],
    options: [
      { id: "steel-slat", name: "ฝ้าระแนงเหล็ก", price: 1600 },
      { id: "shera", name: "ฝ้าเฌอร่า", price: 1500 },
      { id: "grid", name: "ฝ้าตะแกรงเหล็ก", price: 1100 }
    ]
  },
  {
    id: "gutter",
    group: "water",
    name: "รางน้ำ",
    description: "ระบบรางน้ำ คิดตามความยาวด้านหน้า",
    pricingMode: "perMeter",
    options: [
      { id: "stainless", name: "สแตนเลส 304", price: 850 },
      { id: "aluminum", name: "อลูมิเนียม", price: 550 },
      { id: "vinyl", name: "ไวนิล", price: 700 }
    ]
  },
  {
    id: "pipe",
    group: "water",
    name: "ท่อน้ำลง",
    description: "ท่อน้ำลงขั้นต่ำ 3 เมตร",
    pricingMode: "perMeter",
    options: [
      { id: "pvc", name: "PVC 3 นิ้ว", price: 550 },
      { id: "vinyl-vg", name: "Vinyl VG", price: 900 }
    ]
  },
  {
    id: "foundation",
    group: "foundation",
    name: "งานฐานราก",
    description: "ฐานรากและเข็มสำหรับรองรับเสา",
    pricingMode: "perPole",
    options: [
      { id: "footing", name: "ฟุตติ้ง", price: 3000 },
      { id: "hex-3m", name: "เข็มหกเหลี่ยม 3 เมตร", price: 5000 },
      { id: "micropile", name: "ไมโครไพล์", price: 15000 }
    ]
  },
  {
    id: "lighting",
    group: "electrical",
    name: "ไฟส่องสว่าง",
    description: "จุดไฟพร้อมติดตั้ง คิดตามจำนวนจุด",
    pricingMode: "perPoint",
    options: [
      { id: "standard-light", name: "ไฟมาตรฐาน", price: 1500 }
    ]
  }
];

