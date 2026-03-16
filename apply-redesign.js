/**
 * apply-redesign.js
 * Batch transforms all HTML pages using the old `detail-hero` design
 * to the new premium SaaS design (saas-hero + premium-card + glass-sidebar).
 * Run: node apply-redesign.js
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const GA_TAG = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-N4VE8HX6XX"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-N4VE8HX6XX');</script>`;

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
let transformed = 0;
let skipped = 0;

for (const file of files) {
    const filePath = path.join(DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Skip files that don't use the old detail-hero pattern
    if (!html.includes('class="detail-hero"')) {
        skipped++;
        continue;
    }

    // ── 1. Fix head: modernize font/css imports ─────────────────────────────
    // Replace old font import style (no weight 900)
    html = html.replace(
        /<link href="https:\/\/fonts\.googleapis\.com.*?Poppins.*?<\/link>/gs,
        ''
    );
    html = html.replace(
        /<link href="https:\/\/fonts\.googleapis\.com.*?Poppins[^"]*" rel="stylesheet">/g,
        '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">'
    );

    // Remove the old inline font-family override style tag
    html = html.replace(/<style>body,h1,h2.*?<\/style>/gs, '');

    // Remove old png favicon, replace with svg
    html = html.replace(
        /<link rel="icon" type="image\/png" href="[^"]*">/g,
        '<link rel="icon" type="image/x-icon" href="favicon.svg">'
    );

    // Add GA tag if missing
    if (!html.includes('G-N4VE8HX6XX')) {
        html = html.replace('</head>', GA_TAG + '\n</head>');
    }

    // ── 2. Extract info from the old detail-hero ──────────────────────────────
    // Extract h1 title
    const h1Match = html.match(/<h1 class="detail-hero__title">([\s\S]*?)<\/h1>/);
    const h1Text = h1Match ? h1Match[1].trim() : 'Förderung 2026';

    // Extract badge label (first badge in meta)
    const badgeMatch = html.match(/class="badge[^"]*">(.*?)<\/span>/);
    const badgeText = badgeMatch ? badgeMatch[1].trim() : '🏛 Förderung 2026';

    // Extract amount
    const amountMatch = html.match(/class="detail-hero__amount">(.*?)<\/div>/);
    const amountText = amountMatch ? amountMatch[1].trim() : 'Jetzt informieren';

    // ── 3. Replace detail-hero with saas-hero ─────────────────────────────────
    const newHero = `
    <section class="saas-hero" style="background:#ffffff !important;background-image:none !important;border-bottom:1px solid var(--border) !important;">
        <div class="saas-hero__mesh" style="opacity:0.1;"></div>
        <div class="container saas-hero__content reveal" style="text-align:center;">
            <div class="saas-hero__label" style="background:var(--blue-l)!important;color:var(--blue)!important;border:1px solid var(--blue)!important;">${badgeText}</div>
            <h1 class="saas-hero__h1 animate-in" style="color:#0f172a!important;margin:0 auto 32px;">${h1Text}</h1>
            <div class="hero-actions animate-in" style="transition-delay:0.4s;justify-content:center;display:flex;gap:1rem;margin-top:2rem;">
                <a href="#details" class="btn-saas" style="background:var(--blue);color:white;border:none;">${amountText} →</a>
            </div>
        </div>
    </section>`;

    // Replace the entire <section class="detail-hero">...</section>
    html = html.replace(/<section class="detail-hero">[\s\S]*?<\/section>/, newHero);

    // ── 4. Add id="details" to the main content section ───────────────────────
    html = html.replace('<section class="section">', '<section class="section" id="details">');

    // ── 5. Wrap content-main children in premium-card ─────────────────────────
    // Find content between <main class="content-main"> and </main>
    html = html.replace(
        /(<main class="content-main">)([\s\S]*?)(<\/main>)/,
        (match, open, content, close) => {
            // If already has premium-card, skip
            if (content.includes('premium-card')) return match;

            // Wrap each h2 block in a premium-card
            // Strategy: split on <h2> tags and wrap each section
            let sections = content.split(/(?=<h2>|<h2 )/);
            const wrapped = sections.map((section, i) => {
                const trimmed = section.trim();
                if (!trimmed) return '';
                return `
                    <section class="premium-card reveal">
                        ${trimmed}
                    </section>`;
            }).join('\n');

            return open + wrapped + close;
        }
    );

    // ── 6. Upgrade sidebar: replace sidebar-card__cta with glass-sidebar ─────
    // Find aside.sidebar and replace it
    html = html.replace(
        /(<aside class="sidebar">)([\s\S]*?)(<\/aside>)/,
        (match, open, content, close) => {
            // If already has glass-sidebar, skip
            if (content.includes('glass-sidebar')) return match;

            // Extract CTA card
            const ctaMatch = content.match(/<div class="sidebar-card sidebar-card__cta">([\s\S]*?)<\/div>\s*<\/div>/);
            
            // Extract CTA title and text
            const ctaTitleMatch = content.match(/class="sidebar-card__cta-title">([\s\S]*?)<\/div>/);
            const ctaTextMatch = content.match(/class="sidebar-card__cta-text">([\s\S]*?)<\/div>/);
            const ctaBtnMatch = content.match(/<a href="([^"]*)"[^>]*class="btn[^"]*"[^>]*>([\s\S]*?)<\/a>/);
            
            const ctaTitle = ctaTitleMatch ? ctaTitleMatch[1].trim() : 'Förder-Beratung';
            const ctaText = ctaTextMatch ? ctaTextMatch[1].trim() : 'Wir helfen Ihnen die passende Förderung zu finden.';
            const ctaHref = ctaBtnMatch ? ctaBtnMatch[1] : 'kontakt.html';
            const ctaBtnText = ctaBtnMatch ? ctaBtnMatch[2].trim() : 'Jetzt anfragen →';

            // Keep quick-facts and related-list, remove the CTA sidebar-card
            let newContent = content
                .replace(/<div class="sidebar-card sidebar-card__cta">[\s\S]*?<\/div>\s*<\/div>/, '');

            const glassSidebar = `
                    <div class="glass-sidebar">
                        <div class="cta-premium">
                            <h3 style="color:#fff;">${ctaTitle}</h3>
                            <p style="color:#fff;opacity:0.8;">${ctaText}</p>
                            <a href="${ctaHref}" class="btn-saas">${ctaBtnText}</a>
                        </div>
                        ${newContent}
                    </div>`;

            return open + glassSidebar + close;
        }
    );

    // ── 7. Fix script tags to use defer ─────────────────────────────────────
    html = html.replace(/<script src="footer\.js"><\/script>/, '<script src="footer.js" defer></script>');
    html = html.replace(/<script src="main\.js"><\/script>/, '<script src="main.js" defer></script>');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Transformed: ${file}`);
    transformed++;
}

console.log(`\n📊 Done! ${transformed} files transformed, ${skipped} files skipped.`);
