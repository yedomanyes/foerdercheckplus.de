/**
 * add-js-redirect.js
 * Since the user cannot easily fix the DNS A-Record, we are adding an ultra-fast 
 * inline JavaScript redirect to the very top of the <head> of every HTML file.
 * This script checks if the hostname is exactly "foerdercheckplus.de" (no www)
 * and immediately forces a redirect to the www version before the rest of the 
 * page (CSS, images, etc.) even tries to load. This acts as a client-side 
 * fallback for the missing DNS/Vercel edge redirect.
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
let updated = 0;

const redirectScript = `  <!-- JS Fallback Redirect to www -->
  <script>
    if (window.location.hostname === 'foerdercheckplus.de') {
      window.location.replace('https://www.foerdercheckplus.de' + window.location.pathname + window.location.search);
    }
  </script>`;

for (const file of files) {
    const filePath = path.join(DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const before = html;

    // Check if it already exists
    if (!html.includes('window.location.hostname === \'foerdercheckplus.de\'')) {
        // Insert right after the <head> tag
        html = html.replace(/<head>/i, `<head>\n${redirectScript}`);
    }

    if (html !== before) {
        fs.writeFileSync(filePath, html, 'utf8');
        updated++;
    }
}

console.log(`\n✅ Added JS fallback redirect to ${updated} HTML files.`);
