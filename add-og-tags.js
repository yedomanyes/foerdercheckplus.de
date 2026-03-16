/**
 * add-og-tags.js
 * Updates all HTML files to include Open Graph meta tags and the new favicon
 * to ensure the F+ logo shows up in search engines and social shares.
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
let updated = 0;

const OG_TAGS = `
    <!-- Favicon & Touch Icons -->
    <link rel="icon" type="image/png" href="LogoSeitenLogo.png">
    <link rel="apple-touch-icon" href="LogoSeitenLogo.png">
    
    <!-- Open Graph / Search Engine Preview -->
    <meta property="og:site_name" content="FoerderCheckPlus">
    <meta property="og:image" content="https://foerdercheckplus.de/LogoSeitenLogo.png">
    <meta property="og:image:width" content="512">
    <meta property="og:image:height" content="512">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="https://foerdercheckplus.de/LogoSeitenLogo.png">
`;

for (const file of files) {
    const filePath = path.join(DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Remove the previously injected fplus-logo tags
    html = html.replace(/<link rel="icon" type="image\/png" href="images\/fplus-logo.png">\n/g, '');
    html = html.replace(/<link rel="apple-touch-icon" href="images\/fplus-logo.png">\n/g, '');
    html = html.replace(/<meta property="og:site_name"[^>]*>\n/g, '');
    html = html.replace(/<meta property="og:image"[^>]*>\n/g, '');
    html = html.replace(/<meta property="og:image:width"[^>]*>\n/g, '');
    html = html.replace(/<meta property="og:image:height"[^>]*>\n/g, '');
    html = html.replace(/<meta name="twitter:card"[^>]*>\n/g, '');
    html = html.replace(/<meta name="twitter:image"[^>]*>\n/g, '');
    html = html.replace(/<!-- Favicon & Touch Icons -->\n/g, '');
    html = html.replace(/<!-- Open Graph \/ Search Engine Preview -->\n/g, '');

    // 3. Inject new tags right before closing </head>
    // Ensure we don't duplicate if script runs multiple times
    if (!html.includes('images/fplus-logo.png')) {
        html = html.replace('</head>', OG_TAGS + '\n</head>');
        fs.writeFileSync(filePath, html, 'utf8');
        updated++;
    }
}

console.log(`\n✅ Added Open Graph / Search Engine Logo and Favicon to ${updated} pages.`);
