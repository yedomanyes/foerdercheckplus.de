/**
 * fix-kfw-image.js
 * The user reported that the KfW image under "Verwandte Programme"
 * (the discovery section) is not loading.
 * It's likely trying to load an old filename Instead of 'kfw_card_2026.png'.
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html') || f.endsWith('.js'));
let updated = 0;

for (const file of files) {
    if (file === 'fix-kfw-image.js') continue;

    const filePath = path.join(DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const before = content;

    // The image kfw_card_2026.png exists, let's make sure it's referenced correctly
    // Sometimes it might just be a typo like 'images/kfw_card_2026.jpg' or missing
    content = content.replace(/src="images\/kfw_card_2026\.jpg"/g, 'src="images/kfw_card_2026.png"');
    content = content.replace(/src="images\/kfw_card\.png"/g, 'src="images/kfw_card_2026.png"');
    
    // Check for the specific discovery section block if the name is completely missing/wrong
    content = content.replace(/<img src="[^"]*" class="discovery-card__img" alt="KfW">/g, '<img src="images/kfw_card_2026.png" class="discovery-card__img" alt="KfW">');

    if (content !== before) {
        fs.writeFileSync(filePath, content, 'utf8');
        updated++;
    }
}

console.log(`\n✅ Fixed broken KfW image references in ${updated} files.`);
