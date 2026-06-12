const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\5a81b3ff-8ba7-41a5-a139-544a71f62753';
const destDir = path.join(__dirname, '..', 'public', 'images');

const files = [
  { src: 'luxury_hero_bg_1781263635387.png', dest: 'hero_bg.png' },
  { src: 'media__1781283522727.png', dest: 'brand_story.png' },
  { src: 'project_pavilion_1781263806402.png', dest: 'project1.png' },
  { src: 'project_interior_1781263829610.png', dest: 'project2.png' },
  { src: 'project_coastal_1781263852546.png', dest: 'project3.png' }
];

console.log('Starting asset copy...');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('Created destination folder:', destDir);
}

files.forEach(file => {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Successfully copied ${file.src} to ${file.dest}`);
    } else {
      console.warn(`Warning: Source file not found at ${srcPath}`);
    }
  } catch (error) {
    console.error(`Error copying ${file.src}:`, error.message);
  }
});

console.log('Asset copying sequence finished.');
