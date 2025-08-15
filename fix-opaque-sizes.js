const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/lib/materials/opaqueMaterials.ts');

// อ่านไฟล์
let content = fs.readFileSync(filePath, 'utf8');

// แทนที่ sizes ที่ไม่มี image
const sizeReplacements = [
  {
    from: "{ id: 'M', name: 'M'}",
    to: "{ id: 'M', name: 'M', image: '/size/size-m.png' }"
  },
  {
    from: "{ id: 'M_PLUS', name: 'M+'}",
    to: "{ id: 'M_PLUS', name: 'M+', image: '/size/size-m+.png' }"
  },
  {
    from: "{ id: 'L', name: 'L'}",
    to: "{ id: 'L', name: 'L', image: '/size/size-l.png' }"
  },
  {
    from: "{ id: 'L_PLUS', name: 'L+'}",
    to: "{ id: 'L_PLUS', name: 'L+', image: '/size/size-l+.png' }"
  },
  {
    from: "{ id: 'STAINLESS_S', name: 'Stainless S'}",
    to: "{ id: 'STAINLESS_S', name: 'Stainless S', image: '/size/size-m.png' }"
  },
  {
    from: "{ id: 'STAINLESS_M', name: 'Stainless M'}",
    to: "{ id: 'STAINLESS_M', name: 'Stainless M', image: '/size/size-m+.png' }"
  }
];

// ทำการแทนที่
sizeReplacements.forEach(replacement => {
  content = content.replaceAll(replacement.from, replacement.to);
});

// เขียนไฟล์กลับ
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ อัพเดต opaqueMaterials.ts เสร็จแล้ว - เพิ่มรูปขนาดให้ทุกวัสดุ');
