/**
 * fix-cta-links.js
 * Updates the sidebar CTA buttons to link to relevant government portals
 * based on keywords found in the page filename and content.
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;

// Mapping: keyword in filename → { href, btnText }
const linkMap = [
    // BAFA programs
    { keys: ['waermepumpe', 'heizung', 'sanitaer', 'fenster', 'daemmung', 'solarthermie', 'brennstoff', 'energieberatung', 'bafa', 'biomasseheiz'], href: 'https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/effiziente_gebaeude_node.html', btn: 'Zum BAFA-Antrag →' },
    // KfW programs
    { keys: ['kfw', 'wohneigentum', 'sanierung-kredit', 'hausbau', 'barrierefreies', 'denkmal', 'nachhaltiges', 'startgeld', 'umweltprogramm'], href: 'https://www.kfw.de/foerderprodukte/', btn: 'Zum KfW-Antrag →' },
    // Bundesagentur/Gründer
    { keys: ['gruenderzuschuss', 'gruendung', 'arbeitsagentur'], href: 'https://www.arbeitsagentur.de/existenzgruendung', btn: 'Zur Bundesagentur →' },
    // EXIST
    { keys: ['exist'], href: 'https://www.exist.de/EXIST/Navigation/DE/Programm/Gruenderstipendium/gruenderstipendium.html', btn: 'Zum EXIST-Antrag →' },
    // E-Auto / Mobilität
    { keys: ['e-auto', 'elektroauto', 'elektromobil'], href: 'https://www.bafa.de/DE/Fahrzeuge/Elektromobilitaet/elektromobilitaet_node.html', btn: 'BAFA Förderantrag →' },
    // Wallbox
    { keys: ['wallbox'], href: 'https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Ladestationen-f%C3%BCr-Elektroautos-(440)/', btn: 'KfW 440 beantragen →' },
    // Photovoltaik
    { keys: ['photovoltaik', 'pv-foerderung'], href: 'https://www.bundesnetzagentur.de/DE/Sachgebiete/ElektrizitaetundGas/Unternehmen_Institutionen/ErneuerbareEnergien/Photovoltaik/photovoltaik-node.html', btn: 'Zum PV-Förderantrag →' },
    // BAföG / Bildung
    { keys: ['bafoeg', 'aufstiegs-bafoeg', 'meister-bafoeg'], href: 'https://www.aufstiegs-bafoeg.de/', btn: 'Zum Aufstiegs-BAföG →' },
    // BuT Bildungspaket
    { keys: ['bildungspaket', 'teilhabe'], href: 'https://www.bmas.de/DE/Soziales/Bildung-und-Teilhabe/bildung-und-teilhabe.html', btn: 'Zum BuT-Antrag →' },
    // Gründerzuschuss
    { keys: ['gründerzuschuss', 'gruenderzuschuss-antrag'], href: 'https://www.arbeitsagentur.de/existenzgruendung/gruendungszuschuss', btn: 'Zur Arbeitsagentur →' },
    // Studium / Stipendium
    { keys: ['stipendium', 'studien', 'bafoeg-konditionen', 'kfw-studien'], href: 'https://www.bafög.de/', btn: 'BAföG-Antrag stellen →' },
    // Elterngeld / Familie
    { keys: ['elterngeld', 'kindergeld', 'kinderzuschlag', 'familien'], href: 'https://familienportal.de/', btn: 'Zum Familienportal →' },
    // Meisterbonus / Brandenburg
    { keys: ['meisterbonus', 'aufstiegs-bafoeg-branden', 'meister-bafoeg-hoehe'], href: 'https://www.aufstiegs-bafoeg.de/', btn: 'Aufstiegs-BAföG beantragen →' },
    // EU Landwirtschaft
    { keys: ['landwirtschaft'], href: 'https://www.bmel.de/DE/themen/landwirtschaft/eu-agrarpolitik-und-foerderung/eu-agrarpolitik-und-foerderung_node.html', btn: 'Zum BMEL-Portal →' },
    // EU Regionalentwicklung
    { keys: ['eu-foerderung-regional', 'eu-regional'], href: 'https://www.deutsche-einheit-foerderbank.de/', btn: 'Förderantrag stellen →' },
    // Kultur
    { keys: ['kultur', 'kunst'], href: 'https://www.bundesregierung.de/breg-de/bundesregierung/bundeskanzleramt/kulturstaatsministerin', btn: 'Zum BKM-Portal →' },
    // Batteriespeicher NRW
    { keys: ['batteriespeicher'], href: 'https://www.nrwbank.de/de/foerderlotse/foerderprogramme.html', btn: 'Zur NRW.BANK →' },
    // Selbstständige / Beratung
    { keys: ['selbststaendige', 'unternehmensberatung', 'bafa-beratung'], href: 'https://www.bafa.de/DE/Wirtschaft/Unternehmensberatung/unternehmensberatung_node.html', btn: 'BAFA-Antrag stellen →' },
    // INVEST Wagniskapital
    { keys: ['invest-zuschuss', 'wagniskapital'], href: 'https://www.invest-bund.de/', btn: 'Zum INVEST-Portal →' },
    // Digital Jetzt
    { keys: ['digital-jetzt'], href: 'https://www.bmwk.de/Redaktion/DE/Dossier/digital-jetzt.html', btn: 'Digital Jetzt beantragen →' },
    // E-Bike / Lastenrad
    { keys: ['e-bike', 'ebike', 'lastenrad'], href: 'https://www.jobrad.org/', btn: 'JobRad-Portal →' },
    // Wohngeld
    { keys: ['wohngeld'], href: 'https://www.bmwsb.bund.de/WeBS/BMWSB/DE/themen/wohnen/wohngeld/wohngeld_node.html', btn: 'Wohngeld beantragen →' },
    // Erwachsenenbildung Sachsen
    { keys: ['erwachsenenbildung', 'sachsen'], href: 'https://www.bildungsmarkt-sachsen.de/', btn: 'Zum Bildungsportal Sachsen →' },
    // BAB
    { keys: ['berufsausbildungsbeihilfe', 'bab'], href: 'https://www.arbeitsagentur.de/bildung/ausbildung/berufsausbildungsbeihilfe', btn: 'BAB beantragen →' },
    // Default fallback
    { keys: ['kontakt'], href: 'foerderungen.html', btn: 'Weitere Programme →' },
];

function getLink(filename, content) {
    const fname = filename.toLowerCase();
    for (const entry of linkMap) {
        if (entry.keys.some(k => fname.includes(k) || content.toLowerCase().includes(k))) {
            return entry;
        }
    }
    return { href: 'foerderungen.html', btn: 'Weitere Programme →' };
}

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
let updated = 0;

for (const file of files) {
    const filePath = path.join(DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Only update pages that have the CTA button linking to kontakt.html
    if (!html.includes('href="kontakt.html" class="btn-saas"') && 
        !html.includes("href='kontakt.html'") &&
        !html.includes('href="kontakt.html"')) continue;

    const link = getLink(file, html);
    
    // Replace all kontakt.html links in CTA buttons
    const before = html;
    // Replace btn-saas linking to kontakt.html
    html = html.replace(
        /href="kontakt\.html" class="btn-saas">([^<]*)</g,
        `href="${link.href}" target="_blank" rel="noopener" class="btn-saas">${link.btn}<`
    );
    html = html.replace(
        /href="kontakt\.html" class="btn-saas">/g,
        `href="${link.href}" target="_blank" rel="noopener" class="btn-saas">`
    );
    // Also fix old btn--accent links to kontakt.html
    html = html.replace(
        /href="kontakt\.html"([^>]*)>(Leasing-Check →|Region prüfen →|Jetzt anfragen →|Beratung anfragen →|Betriebscheck →|Kultur-Beratung →|Vorteils-Rechner →|Förder-Beratung →|Jetzt prüfen →|Regional-Check →|[^<]*)</g,
        `href="${link.href}" target="_blank" rel="noopener"$1>${link.btn}<`
    );

    if (html !== before) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✅ ${file} → ${link.href}`);
        updated++;
    }
}

console.log(`\n📊 Updated ${updated} pages with relevant button links.`);
