const fs = require('fs');
const path = require('path');
const mappings = {
  'p8': 'meadows-vilankurichi',
  'p9': 'blue-heaven-1',
  'p10': 'blue-heaven-2',
  'p11': 'nivasana',
  'p12': 'viveka-enclave',
  'p13': 'meenakshi-vishranth',
};

let projectImages = {};

for (const [folder, id] of Object.entries(mappings)) {
    const dir = path.join('c:/WayoraEnterprices/nivasan/public/completed', folder);
    try {
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
        projectImages[id] = files.map(f => `/completed/${folder}/${f}`);
        console.log(`Mapped ${id} to ${files.length} images`);
    } catch(e) {
        projectImages[id] = [];
        console.log(`Failed to map ${id}`);
    }
}

const listFile = path.resolve('c:/WayoraEnterprices/nivasan/src/app/projects/ProjectsList.tsx');
let listContent = fs.readFileSync(listFile, 'utf8');

for (const [id, images] of Object.entries(projectImages)) {
    if (images.length > 0) {
        // Find block for id and replace its image string
        const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?image:\\s*")[^"]+(")`);
        listContent = listContent.replace(regex, `$1${images[0]}$2`);
    }
}
fs.writeFileSync(listFile, listContent, 'utf8');

const detailsFile = path.resolve('c:/WayoraEnterprices/nivasan/src/app/projects/[id]/page.tsx');
let detailsContent = fs.readFileSync(detailsFile, 'utf8');

for (const [id, images] of Object.entries(projectImages)) {
    if (images.length > 0) {
        const regex = new RegExp(`("${id}":\\s*{[\\s\\S]*?images:\\s*\\[)[^\\]]*(\\])`);
        const imgsStr = images.map(i => `\n        "${i}"`).join(',') + '\n      ';
        detailsContent = detailsContent.replace(regex, `$1${imgsStr}$2`);
    }
}
fs.writeFileSync(detailsFile, detailsContent, 'utf8');
console.log('Images mapped successfully.');
