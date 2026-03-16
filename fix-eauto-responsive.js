/**
 * fix-eauto-responsive.js
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'e-auto-foerderung.html');
let html = fs.readFileSync(file, 'utf8');

// Replace the hardcoded grid with responsive flexbox
const badGrid = 'style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px;"';
const goodGrid = 'style="display:flex; flex-wrap:wrap; gap:20px; margin-top:24px;"';

html = html.replace(badGrid, goodGrid);

// Ensure the inner items can wrap by setting flex-basis
html = html.replace(
    /<div style="background:rgba\(30, 58, 138, 0\.03\); padding:20px; border-radius:16px; border:1px solid var\(--border\);">/g,
    '<div style="flex: 1 1 300px; background:rgba(30, 58, 138, 0.03); padding:20px; border-radius:16px; border:1px solid var(--border);">'
);

fs.writeFileSync(file, html, 'utf8');
console.log('✅ Fixed e-auto mobile responsiveness');
