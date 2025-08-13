const fs = require('fs');
const path = require('path');

// Get all image files in public/materials
const materialsDir = 'public/materials';
const imageFiles = fs.readdirSync(materialsDir).filter(file => 
  /\.(png|jpg|jpeg|webp)$/i.test(file)
);

console.log('=== Image files in public/materials ===');
imageFiles.forEach(file => console.log(file));

// Images referenced in code (extracted from grep results)
const usedImages = [
  'aluminum-roof.png',
  'vinyl-dream-roof.jpg', 
  'vinyl-smooth-roof.jpg',
  'vinyl-pr6-roof.jpg',
  'winter-roof.jpg',
  'metal-sheet-sandwich.jpg',
  'metal-sheet-pe.jpg',
  'metal-sheet-bluescope-snaplock.jpg',
  'metal-sheet-external-snaplock.jpg', 
  'metal-sheet-bluescope-cool.jpg',
  'metal-sheet-basic.jpg',
  'pr.png',
  'logo.webp',
  'shinkolite-prime.jpg',
  'shinkolite-heat.jpg',
  'shinkolite-superior.jpg',
  'shinkolite-shade.jpg',
  'polycarbonate-10mm.jpg',
  'polycarbonate-8mm.jpg',
  'polycarbonate-6mm.jpg'
];

// Images referenced but missing from translucentMaterials.ts
const missingImages = [
  'polycarbonate-embossed.jpg',
  'fiberglass-smooth.jpg', 
  'fiberglass-wave-gray.jpg',
  'fiberglass-wave.jpg',
  'poly-corrugated.jpg',
  'clear-metal-sheet.jpg',
  'metal-sheet-snaplock.jpg',
  'metal-sheet-pu-25.jpg'
];

console.log('\n=== Images referenced in code ===');
usedImages.forEach(file => console.log(file));

console.log('\n=== Images referenced but missing ===');
missingImages.forEach(file => console.log(file));

// Find unused files
const unusedFiles = imageFiles.filter(file => 
  !usedImages.includes(file) && !missingImages.includes(file)
);

console.log('\n=== UNUSED image files (can be deleted) ===');
unusedFiles.forEach(file => console.log(file));

// Check for files that exist but have wrong names
console.log('\n=== Files that might need renaming ===');
const existingFiles = imageFiles;
const neededFiles = [...usedImages, ...missingImages];

neededFiles.forEach(needed => {
  if (!existingFiles.includes(needed)) {
    // Look for similar named files
    const similar = existingFiles.filter(existing => {
      const neededBasename = needed.replace(/\.(png|jpg|jpeg|webp)$/i, '');
      const existingBasename = existing.replace(/\.(png|jpg|jpeg|webp)$/i, '');
      return neededBasename.includes(existingBasename) || existingBasename.includes(neededBasename);
    });
    if (similar.length > 0) {
      console.log(`Missing: ${needed} -> Possible matches: ${similar.join(', ')}`);
    }
  }
});
