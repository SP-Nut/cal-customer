// lib/materials/gutterMaterials.ts

export interface GutterMaterial {
  id: string;
  name: string;
  price: number; // ราคาต่อเมตร
  category: 'special' | 'standard' | 'vinyl';
  description?: string;
  color?: string;
  brand?: string;
  size?: string;
}

export const gutterMaterials: GutterMaterial[] = [
  // รางน้ำพับพิเศษ
  {
    id: "l1",
    name: "รางน้ำพับพิเศษ L1 (หลังบ้าน)",
    price: 2600,
    category: "special",
    description: "รางน้ำพับสั่งทำพิเศษ เหมาะสำหรับหลังบ้าน คุณภาพพรีเมียม แข็งแรงทนทาน"
  },
  {
    id: "l2", 
    name: "รางน้ำพับพิเศษ L2 (ซ่อนราง งานฝ้า)",
    price: 1600,
    category: "special",
    description: "รางน้ำพับแบบซ่อนราง สำหรับงานฝ้าและหลังบ้าน ดีไซน์เรียบหรู"
  },
  {
    id: "l3",
    name: "รางน้ำพับพิเศษ L3 (ซ่อนราง หน้าบ้าน)", 
    price: 1500,
    category: "special",
    description: "รางน้ำพับแบบซ่อนราง สำหรับหน้าบ้าน สวยงามไม่เสียทัศนียภาพ"
  },
  
  // รางน้ำมาตรฐาน สแตนเลส
  {
    id: "standard6",
    name: "รางน้ำสแตนเลส 6 นิ้ว (เกรด 304)",
    price: 850,
    category: "standard", 
    description: "รางน้ำสแตนเลสเกรด 304 ขนาด 6 นิ้ว ทนสนิม ทนทานยาวนาน",
    size: "6\"",
    brand: "Grade 304"
  },
  {
    id: "standard5",
    name: "รางน้ำสแตนเลส 5 นิ้ว (เกรด 304)",
    price: 700,
    category: "standard",
    description: "รางน้ำสแตนเลสเกรด 304 ขนาด 5 นิ้ว ทนสนิม คุณภาพมาตรฐาน",
    size: "5\"",
    brand: "Grade 304"
  },
  
  // รางน้ำไวนิล
  {
    id: "vinyl_vg",
    name: "รางน้ำไวนิล VG (สีขาว)",
    price: 900,
    category: "vinyl",
    description: "รางน้ำไวนิลยี่ห้อ VG คุณภาพเยี่ยม ทนแดด ไม่ซีดจาง น้ำหนักเบา",
    color: "#ffffff",
    brand: "VG"
  },
  {
    id: "vinyl_lion",
    name: "รางน้ำไวนิล Lion (สีขาว)",
    price: 700,
    category: "vinyl", 
    description: "รางน้ำไวนิลยี่ห้อ Lion คุณภาพดี ราคาประหยัด เหมาะงบจำกัด",
    color: "#ffffff",
    brand: "Lion"
  }
];

export const gutterCategories = [
  { 
    id: "special", 
    name: "รางน้ำพับพิเศษ", 
    description: "รางน้ำสำหรับงานพิเศษ คุณภาพสูง",
    icon: "⭐"
  },
  { 
    id: "standard", 
    name: "รางน้ำมาตรฐาน", 
    description: "รางน้ำสแตนเลสเกรด 304 ทนทาน",
    icon: "🔧"
  },
  { 
    id: "vinyl", 
    name: "รางน้ำไวนิล", 
    description: "รางน้ำไวนิลทนทาน น้ำหนักเบา",
    icon: "🏠"
  },
  { 
    id: "pipe", 
    name: "ท่อน้ำลง", 
    description: "ท่อสำหรับระบายน้ำ หลากหลายขนาด",
    icon: "🚰"
  }
];

// ฟังก์ชันสำหรับคำนวณราคารางน้ำตามความยาว
export const calculateGutterPrice = (materialId: string, length: number): number => {
  const material = gutterMaterials.find(m => m.id === materialId);
  if (!material || length <= 0) return 0;
  return material.price * length;
};

// ฟังก์ชันสำหรับหาวัสดุรางน้ำตาม ID
export const getGutterMaterial = (id: string): GutterMaterial | undefined => {
  return gutterMaterials.find(m => m.id === id);
};

// ฟังก์ชันสำหรับหาวัสดุตามประเภท
export const getGutterMaterialsByCategory = (category: string): GutterMaterial[] => {
  return gutterMaterials.filter(m => m.category === category);
};

// ฟังก์ชันสำหรับหาประเภทวัสดุทั้งหมด
export const getAllGutterCategories = () => {
  return gutterCategories;
};

// ฟังก์ชันสำหรับคำนวณราคาทั้งหมดของรางน้ำ (รวมค่าติดตั้ง)
export const calculateTotalGutterCost = (
  materialId: string, 
  length: number, 
  installationFee: number = 0
): number => {
  const materialCost = calculateGutterPrice(materialId, length);
  return materialCost + installationFee;
};

// Export default
export default {
  gutterMaterials,
  gutterCategories,
  calculateGutterPrice,
  getGutterMaterial,
  getGutterMaterialsByCategory,
  getAllGutterCategories,
  calculateTotalGutterCost
};