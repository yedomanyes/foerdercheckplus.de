/**
 * fix-defer-scripts.js
 * Removes "defer" from header.js/footer.js and ensures they load cleanly. 
 * Since header.js does document.body.prepend, deferring it can cause 
 * race conditions and blank screens on first load.
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

    // header.js must NOT be deferred because it creates the <nav> element dynamically
    // If it's deferred, main.js might try to attach events to a nav that doesn't exist yet,
    // or the browser rendering gets blocked waiting for the DOM mutation.
    html = html.replace(/<script src="header\.js" defer><\/script>/g, '<script src="header.js"></script>');
    html = html.replace(/<script defer src="header\.js"><\/script>/g, '<script src="header.js"></script>');

    // footer.js can be deferred, but for consistency and since it's small, let's load it synchronously
    // at the bottom of the body where it currently sits.
    html = html.replace(/<script src="footer\.js" defer><\/script>/g, '<script src="footer.js"></script>');
    html = html.replace(/<script defer src="footer\.js"><\/script>/g, '<script src="footer.js"></script>');

    // ensure main.js is deferred ONLY if it's at the end of the body
    if (!html.includes('<script defer src="main.js"></script>') && html.includes('<script src="main.js" defer></script>')) {
         // Keep it as is, defer is fine for main.js because it listens for DOMContentLoaded
    }

    if (html !== before) {
        fs.writeFileSync(filePath, html, 'utf8');
        updated++;
    }
}

console.log(`\n✅ Fixed script loading strategy on ${updated} pages.`);
