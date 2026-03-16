/**
 * remove-preconnects.js
 * Mobile browsers (especially on unstable connections or local WiFi)
 * often hang on <link rel="preconnect"> tags if the external server
 * takes too long, causing a 'connection interrupted' error before 
 * rendering the page. This script removes them to ensure fast loads.
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

    // Remove prefetch and preconnect tags
    html = html.replace(/<link rel="dns-prefetch"[^>]*>\n?/g, '');
    html = html.replace(/<link rel="preconnect"[^>]*>\n?/g, '');

    if (html !== before) {
        fs.writeFileSync(filePath, html, 'utf8');
        updated++;
    }
}

console.log(`\n✅ Removed aggressive preconnects on ${updated} pages.`);
