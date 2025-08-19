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
  // รางน้ำพับพิเศษ สำหรับหลังบ้าน (L1)
  {
    id: "l1_stainless",
    name: "รางน้ำพับพิเศษ L1 สแตนเลส 304  (หลังบ้าน) ",
    price: 2600,
    category: "special",
    description: "รางน้ำพับพิเศษ สำหรับหลังบ้าน สแตนเลส 304"
  },
  {
    id: "l1_aluminum",
    name: "รางน้ำพับพิเศษ L1 อลูมิเนียม (หลังบ้าน) ",
    price: 1600,
    category: "special",
    description: "รางน้ำพับพิเศษ สำหรับหลังบ้าน อลูมิเนียม"
  },

  // รางน้ำพับพิเศษ สำหรับงานฝ้า หลังบ้าน (ซ่อนราง) (L2)
  {
    id: "l2_stainless",
    name: "รางน้ำพับพิเศษ L2 สแตนเลส 304 (ซ่อนราง)",
    price: 1600,
    category: "special",
    description: "รางน้ำพับพิเศษ สำหรับงานฝ้า หลังบ้าน (ซ่อนราง) สแตนเลส 304"
  },
  {
    id: "l2_aluminum",
    name: "รางน้ำพับพิเศษ L2 อลูมิเนียม (ซ่อนราง)",
    price: 850,
    category: "special",
    description: "รางน้ำพับพิเศษ สำหรับงานฝ้า หลังบ้าน (ซ่อนราง) อลูมิเนียม"
  },

  // รางน้ำพับพิเศษ สำหรับหน้าบ้าน (ซ่อนราง) (L3)
  {
    id: "l3_stainless",
    name: "รางน้ำพับพิเศษ L3 สแตนเลส 304 (หน้าบ้าน)",
    price: 1500,
    category: "special",
    description: "รางน้ำพับพิเศษ สำหรับหน้าบ้าน (ซ่อนราง) สแตนเลส 304"
  },
  {
    id: "l3_aluminum",
    name: "รางน้ำพับพิเศษ L3 อลูมิเนียม (หน้าบ้าน)",
    price: 550,
    category: "special",
    description: "รางน้ำพับพิเศษ สำหรับหน้าบ้าน (ซ่อนราง) อลูมิเนียม"
  },
  
  // รางน้ำมาตรฐาน
  {
    id: "standard6",
    name: "รางน้ำมาตรฐาน 6\" เกรด 304",
    price: 850,
    category: "standard", 
    description: "รางน้ำมาตรฐาน 6 นิ้ว เกรด 304",
    size: "6\"",
    brand: "Grade 304"
  },
  {
    id: "standard5",
    name: "รางน้ำมาตรฐาน 5\" เกรด 304",
    price: 700,
    category: "standard",
    description: "รางน้ำมาตรฐาน 5 นิ้ว เกรด 304",
    size: "5\"",
    brand: "Grade 304"
  },
  
  // รางน้ำไวนิล
  {
    id: "vinyl_vg",
    name: "รางน้ำไวนิล VG (สีขาว)",
    price: 900,
    category: "vinyl",
    description: "รางน้ำไวนิล Vinyl Gutter ยี่ห้อ VG (สีขาว)",
    color: "#ffffff",
    brand: "VG"
  },
  {
    id: "vinyl_lion",
    name: "รางน้ำไวนิล Lion (สีขาว)",
    price: 700,
    category: "vinyl", 
    description: "รางน้ำไวนิล Vinyl Gutter ยี่ห้อ Lion (สีขาว)",
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