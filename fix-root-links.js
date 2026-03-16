/**
 * fix-root-links.js
 * The user experiences connection drops when clicking on the logo
 * or "Startseite" because they link to href="/" which might not
 * be configured to serve index.html properly on the local dev server.
 * This script changes all href="/" to href="index.html" across all files.
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html') || f.endsWith('.js'));
let updated = 0;

for (const file of files) {
    if (file === 'server.js' || file === 'fix-root-links.js') continue;

    const filePath = path.join(DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const before = content;

    // Replace href="/" with href="index.html"
    content = content.replace(/href="\/"/g, 'href="index.html"');
    
    if (content !== before) {
        fs.writeFileSync(filePath, content, 'utf8');
        updated++;
    }
}

console.log(`\n✅ Fixed root links on ${updated} files.`);
