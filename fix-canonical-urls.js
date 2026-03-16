/**
 * fix-canonical-urls.js
 * The user wants www.foerdercheckplus.de to be the primary domain.
 * This script ensures all canonical URLs and Open Graph tags explicitly
 * point to the HTTPS www version of the site to prevent redirect loops,
 * double-hops, or SEO penalties.
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
let updated = 0;

for (const file of files) {
    const filePath = path.join(DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const before = content;

    // Replace canonical links
    content = content.replace(/href="https:\/\/foerdercheckplus\.de(?!\/?"?)/g, 'href="https://www.foerdercheckplus.de');
    
    // Explicitly target exact canonical tags just in case
    content = content.replace(/<link rel="canonical" href="https:\/\/foerdercheckplus\.de\/([^"]*)">/g, '<link rel="canonical" href="https://www.foerdercheckplus.de/$1">');

    // Also fix Open Graph URLs
    content = content.replace(/content="https:\/\/foerdercheckplus\.de\/([^"]*)">/g, 'content="https://www.foerdercheckplus.de/$1">');

    if (content !== before) {
        fs.writeFileSync(filePath, content, 'utf8');
        updated++;
    }
}

console.log(`\n✅ Updated Canonical & OG URLs to www on ${updated} files.`);
