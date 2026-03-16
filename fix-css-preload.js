/**
 * fix-css-preload.js
 * Reverts the async CSS preload hack back to a synchronous stylesheet link.
 * The async preload with onload="this.rel='stylesheet'" can cause a blank
 * page (unrendered content) on the first load if JS execution is delayed 
 * or fails, causing the page to only render after a refresh.
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
let updated = 0;

for (const file of files) {
    const filePath = path.join(DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const before = html;

    // 1. Remove the preload hack
    html = html.replace(/<!-- Preload critical CSS -->\s*<link rel="preload" href="index\.css" as="style" onload="this\.rel='stylesheet'">\s*<noscript><link rel="stylesheet" href="index\.css"><\/noscript>/g, '<link rel="stylesheet" href="index.css">');
    
    // 2. Remove the font async hack and replace with standard synchronous link
    html = html.replace(/<!-- Fonts: display=swap for fast text rendering -->\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Poppins:wght@400;600;700;800;900&display=swap"\s+rel="stylesheet" media="print" onload="this\.media='all'">\s*<noscript><link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Poppins:wght@400;600;700;800;900&display=swap" rel="stylesheet"><\/noscript>/g, '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">');

    if (html !== before) {
        fs.writeFileSync(filePath, html, 'utf8');
        updated++;
    }
}

console.log(`\n✅ Fixed CSS and Font loading strategy on ${updated} pages.`);
