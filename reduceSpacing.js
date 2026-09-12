const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);

let modifiedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Reduce overall padding heavily, keeping responsive proportions
    content = content.replace(/className="([^"]*?)(?:py-24)([^"]*?)"/g, 'className="$1py-12 md:py-16$2"');
    content = content.replace(/className="([^"]*?)(?:pt-32 pb-24)([^"]*?)"/g, 'className="$1pt-24 pb-16 md:pt-28 md:pb-20$2"');
    content = content.replace(/className="([^"]*?)(?:py-16 md:py-24)([^"]*?)"/g, 'className="$1py-12 md:py-16$2"');
    content = content.replace(/className="([^"]*?)(?:pt-32)([^"]*?)"/g, 'className="$1pt-24 md:pt-28$2"');
    content = content.replace(/className="([^"]*?)(?:pb-32)([^"]*?)"/g, 'className="$1pb-24 md:pb-28$2"');
    content = content.replace(/className="([^"]*?)(?:pb-24)([^"]*?)"/g, 'className="$1pb-12 md:pb-16$2"');
    
    // Some components might have `py-[large value]`
    content = content.replace(/className="([^"]*?)(?:py-20)([^"]*?)"/g, 'className="$1py-12 md:py-14$2"');
    content = content.replace(/className="([^"]*?)(?:pt-24)([^"]*?)"/g, 'className="$1pt-16 md:pt-20$2"');
    content = content.replace(/className="([^"]*?)(?:mt-24)([^"]*?)"/g, 'className="$1mt-12 md:mt-16$2"');
    content = content.replace(/className="([^"]*?)(?:mt-32)([^"]*?)"/g, 'className="$1mt-16 md:mt-24$2"');


    // Clean up duplicate md: attributes if any result from replacement, e.g. "py-12 md:py-16 md:py-24"
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated spacing in ${file}`);
        modifiedCount++;
    }
});

console.log(`Total files modified: ${modifiedCount}`);
