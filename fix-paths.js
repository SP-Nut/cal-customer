const fs = require('fs');
const path = require('path');

console.log('Fixing size image paths...');

// Fix translucent materials
const translucentPath = path.join(__dirname, 'app', 'lib', 'materials', 'translucentMaterials.ts');
if (fs.existsSync(translucentPath)) {
  let content = fs.readFileSync(translucentPath, 'utf8');
  content = content.replace(/\/materials\/size\//g, '/size/');
  fs.writeFileSync(translucentPath, content);
  console.log('Fixed translucent materials paths');
}

// Fix opaque materials  
const opaquePath = path.join(__dirname, 'app', 'lib', 'materials', 'opaqueMaterials.ts');
if (fs.existsSync(opaquePath)) {
  let content = fs.readFileSync(opaquePath, 'utf8');
  content = content.replace(/\/materials\/size\//g, '/size/');
  fs.writeFileSync(opaquePath, content);
  console.log('Fixed opaque materials paths');
}

console.log('All paths fixed!');
