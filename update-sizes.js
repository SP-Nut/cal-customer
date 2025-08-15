const fs = require('fs');
const path = require('path');

console.log('Starting size image update...');

// Read translucent materials file
const translucentPath = path.join(__dirname, 'app', 'lib', 'materials', 'translucentMaterials.ts');
console.log('Reading:', translucentPath);

if (!fs.existsSync(translucentPath)) {
  console.error('File not found:', translucentPath);
  process.exit(1);
}

let translucentContent = fs.readFileSync(translucentPath, 'utf8');

// Simple replacement pattern
translucentContent = translucentContent.replace(
  /{ id: 'M', name: 'M' }/g, 
  "{ id: 'M', name: 'M', image: '/materials/size/size-m.png' }"
);
translucentContent = translucentContent.replace(
  /{ id: 'M_PLUS', name: 'M\+' }/g, 
  "{ id: 'M_PLUS', name: 'M+', image: '/materials/size/size-m+.png' }"
);
translucentContent = translucentContent.replace(
  /{ id: 'L', name: 'L' }/g, 
  "{ id: 'L', name: 'L', image: '/materials/size/size-l.png' }"
);
translucentContent = translucentContent.replace(
  /{ id: 'L_PLUS', name: 'L\+' }/g, 
  "{ id: 'L_PLUS', name: 'L+', image: '/materials/size/size-l+.png' }"
);
translucentContent = translucentContent.replace(
  /{ id: 'STAINLESS_S', name: 'Stainless S' }/g, 
  "{ id: 'STAINLESS_S', name: 'Stainless S', image: '/materials/size/size-m.png' }"
);
translucentContent = translucentContent.replace(
  /{ id: 'STAINLESS_M', name: 'Stainless M' }/g, 
  "{ id: 'STAINLESS_M', name: 'Stainless M', image: '/materials/size/size-m+.png' }"
);

// Write back to file
fs.writeFileSync(translucentPath, translucentContent);
console.log('Updated translucent materials');

// Do the same for opaque materials
const opaquePath = path.join(__dirname, 'app', 'lib', 'materials', 'opaqueMaterials.ts');
console.log('Reading:', opaquePath);

if (fs.existsSync(opaquePath)) {
  let opaqueContent = fs.readFileSync(opaquePath, 'utf8');
  
  opaqueContent = opaqueContent.replace(
    /{ id: 'M', name: 'M' }/g, 
    "{ id: 'M', name: 'M', image: '/materials/size/size-m.png' }"
  );
  opaqueContent = opaqueContent.replace(
    /{ id: 'M_PLUS', name: 'M\+' }/g, 
    "{ id: 'M_PLUS', name: 'M+', image: '/materials/size/size-m+.png' }"
  );
  opaqueContent = opaqueContent.replace(
    /{ id: 'L', name: 'L' }/g, 
    "{ id: 'L', name: 'L', image: '/materials/size/size-l.png' }"
  );
  opaqueContent = opaqueContent.replace(
    /{ id: 'L_PLUS', name: 'L\+' }/g, 
    "{ id: 'L_PLUS', name: 'L+', image: '/materials/size/size-l+.png' }"
  );
  opaqueContent = opaqueContent.replace(
    /{ id: 'STAINLESS_S', name: 'Stainless S' }/g, 
    "{ id: 'STAINLESS_S', name: 'Stainless S', image: '/materials/size/size-m.png' }"
  );
  opaqueContent = opaqueContent.replace(
    /{ id: 'STAINLESS_M', name: 'Stainless M' }/g, 
    "{ id: 'STAINLESS_M', name: 'Stainless M', image: '/materials/size/size-m+.png' }"
  );
  
  fs.writeFileSync(opaquePath, opaqueContent);
  console.log('Updated opaque materials');
}

console.log('Updated size images for all materials!');
