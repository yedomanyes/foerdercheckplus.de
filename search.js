/* search.js – Client-side search and filter for foerderungen.html */

const PROGRAMS = [
    {
        id: 'waermepumpe',
        name: 'Wärmepumpe Förderung 2026',
        desc: 'Bis zu 70 % Zuschuss für den Einbau einer Wärmepumpe über das Bundesamt für Wirtschaft (BAFA). Jetzt modernisieren und Heizkosten dauerhaft senken.',
        category: 'energie',
        amount: 'Bis zu 70 %',
        source: 'BAFA',
        url: 'waermepumpe-foerderung.html',
        img: 'images/waermepumpe_card.png',
        tags: ['wärmepumpe', 'heizung', 'energie', 'bafa', 'sanierung', 'haus'],
    },
    {
        id: 'photovoltaik',
        name: 'Photovoltaik Förderung 2026',
        desc: 'Einspeisevergütung und KfW-Finanzierung für Solaranlagen. Strom selbst erzeugen und dauerhaft Energiekosten sparen.',
        category: 'energie',
        amount: 'Ab 6,81 ct/kWh',
        source: 'KfW / Netzbetreiber',
        url: 'photovoltaik-foerderung.html',
        img: 'images/photovoltaik_card.png',
        tags: ['photovoltaik', 'solar', 'pv', 'energie', 'strom', 'kfw'],
    },
    {
        id: 'sanierung',
        name: 'Sanierung Förderung 2026',
        desc: 'Bundesförderung für effiziente Gebäude (BEG): Zuschüsse und günstige Kredite für energetische Sanierungsmaßnahmen.',
        category: 'energie',
        amount: 'Bis zu 45 %',
        source: 'BAFA / KfW',
        url: 'sanierung-foerderung.html',
        img: 'images/Sanierung45Prozent.png',
        tags: ['sanierung', 'energie', 'gebäude', 'beg', 'bafa', 'kfw', 'dämmung'],
    },
    {
        id: 'heizung',
        name: 'Heizung Austausch Förderung 2026',
        desc: 'Tauschen Sie Ihre alte Heizung gegen eine moderne klimafreundliche Lösung. Bis zu 35 % Zuschuss möglich.',
        category: 'energie',
        amount: 'Bis zu 35 %',
        source: 'BAFA / KfW',
        url: 'foerderung-heizungstausch-2026.html',
        img: 'images/heizung_austausch_premium.png',
        tags: ['heizung', 'wärmepumpe', 'zuschuss', 'sanierung', 'energie', 'kfw'],
    },
    {
        id: 'gruenderzuschuss',
        name: 'Gründerzuschuss 2026',
        desc: 'Finanzielle Unterstützung der Bundesagentur für Arbeit für Gründer aus der Arbeitslosigkeit. Bis zu 15 Monate Förderung.',
        category: 'business',
        amount: 'Bis zu 15 Monate',
        source: 'Arbeitsagentur',
        url: 'gruenderzuschuss.html',
        img: 'images/Gründerzuschuss 2026.png',
        tags: ['gründen', 'startup', 'selbstständig', 'arbeitsagentur', 'existenzgründung'],
    },
    {
        id: 'selbststaendige',
        name: 'Förderungen für Selbstständige 2026',
        desc: 'Übersicht aller Förderprogramme für Selbstständige und Freiberufler: Mikrokredite, BAFA-Beratungsförderung, EU-Fonds.',
        category: 'business',
        amount: 'Variiert',
        source: 'Verschiedene',
        url: 'foerderung-selbststaendige.html',
        img: 'images/FöderungenFürSelbständige.png',
        tags: ['selbstständig', 'freiberufler', 'unternehmer', 'kredit', 'beratung'],
    },
    {
        id: 'kfw',
        name: 'KfW Förderprogramme 2026',
        desc: 'Alle KfW-Kredite und Zuschüsse auf einen Blick: Wohnen, Energie, Gründen, Digitalisierung und mehr.',
        category: 'wohnen',
        amount: 'Ab 1 % Zins',
        source: 'KfW Bank',
        url: 'kfw-foerderung.html',
        img: 'images/kfw_card.png',
        tags: ['kfw', 'kredit', 'bank', 'zinsen', 'wohnen', 'energie', 'gründen'],
    },
    {
        id: 'e-auto',
        name: 'E-Auto Förderung 2026',
        desc: 'Aktuelle staatliche Förderungen für Elektrofahrzeuge: Steuervorteile, Unternehmensförderungen und Sonderabschreibungen.',
        category: 'mobil',
        amount: 'Steuervorteile',
        source: 'Finanzamt / Länder',
        url: 'e-auto-foerderung.html',
        img: 'images/eauto_card.png',
        tags: ['elektroauto', 'e-auto', 'ev', 'laden', 'mobilität', 'steuer'],
    },
    {
        id: 'wallbox',
        name: 'Wallbox Förderung 2026',
        desc: 'Förderungen für private und gewerbliche Wallboxen: Länderprogramme, KfW 440, Arbeitgeber-Modelle.',
        category: 'mobil',
        amount: 'Bis zu 900 €',
        source: 'KfW / Länder',
        url: 'wallbox-foerderung.html',
        img: 'images/wallbox_card.png',
        tags: ['wallbox', 'laden', 'elektro', 'kfw', 'e-auto', 'mobil'],
    },
    {
        id: 'studium',
        name: 'Studienförderung 2026',
        desc: 'BAföG, Stipendien, Bildungskredite: Alle Möglichkeiten für Studierende kompakt erklärt.',
        category: 'familie',
        amount: 'Bis zu 1.000 €/Monat',
        source: 'BMBF / Stiftungen',
        url: 'studienfoerderung.html',
        img: 'images/studium_card.png',
        tags: ['studium', 'bafög', 'stipendium', 'bildung', 'kredit', 'hochschule'],
    },
    {
        id: 'familie',
        name: 'Familienförderungen 2026',
        desc: 'Kindergeld, Elterngeld, Kinderzuschlag, KfW-Wohneigentum: Alle Leistungen für Familien im Überblick.',
        category: 'familie',
        amount: 'Bis zu 250 €/Kind',
        source: 'Familienkasse / KfW',
        url: 'familienfoerderung.html',
        img: 'images/familie_card.png',
        tags: ['familie', 'kinder', 'elterngeld', 'kindergeld', 'kinderzuschlag'],
    },
    {
        id: 'pv-bayern',
        name: 'PV Förderung Bayern 2026',
        desc: 'Sichern Sie sich den Solar-Zuschuss in Bayern. Photovoltaik-Boni, Steuerbefreiung und zinsgünstige Kredite für Hausbesitzer.',
        category: 'energie',
        amount: '0 % MwSt.',
        source: 'Bayern / KfW',
        url: 'foerderung-photovoltaik-bayern.html',
        img: 'images/photovoltaik_bayern_card.png',
        tags: ['photovoltaik', 'solar', 'bayern', 'speicher', 'strom', 'energie'],
    },

    {
        id: 'daemmung-dach',
        name: 'Dachdämmung Förderung 2026',
        desc: 'Heizkosten senken durch professionelle Dachdämmung. Sichern Sie sich bis zu 20 % Zuschuss oder Steuerboni.',
        category: 'energie',
        amount: 'Bis zu 20 %',
        source: 'BAFA / Steuer',
        url: 'foerderung-daemmung-dach.html',
        img: 'images/daemmung_dach_card.png',
        tags: ['dachdämmung', 'dämmung', 'sanierung', 'energie', 'dach', 'haus'],
    },
    {
        id: 'fenstertausch-bafa',
        name: 'Fenstertausch Förderung 2026',
        desc: 'Tauschen Sie alte Fenster gegen moderne Dreifachverglasung. BAFA-Zuschüsse bis zu 20 % sichern.',
        category: 'energie',
        amount: 'Bis zu 20 %',
        source: 'BAFA',
        url: 'foerderung-fenstertausch-bafa.html',
        img: 'images/fenstertausch_card.png',
        tags: ['fenster', 'sanierung', 'bafa', 'energie', 'glas', 'haus'],
    },
    {
        id: 'pv-nrw',
        name: 'PV Förderung NRW 2026',
        desc: 'Solar-Zuschüsse in Nordrhein-Westfalen. Sichern Sie sich Boni für Batteriespeicher über Progress.nrw.',
        category: 'energie',
        amount: 'Boni + Kredit',
        source: 'NRW / KfW',
        url: 'foerderung-photovoltaik-nrw.html',
        img: 'images/photovoltaik_nrw_card.png',
        tags: ['photovoltaik', 'solar', 'nrw', 'speicher', 'strom', 'energie'],
    },
    {
        id: 'wp-berlin',
        name: 'Wärmepumpe Berlin Boni 2026',
        desc: 'Zusätzliche Landesförderung für Wärmepumpen in Berlin. Kombinieren Sie Bundes- und Landeszuschüsse.',
        category: 'energie',
        amount: 'Extra Boni',
        source: 'Berlin (IBB)',
        url: 'foerderung-waermepumpe-berlin.html',
        img: 'images/berlin_waermepumpe_card.png',
        tags: ['wärmepumpe', 'berlin', 'zuschuss', 'energie', 'heizung'],
    },
    {
        id: 'brennstoffzelle',
        name: 'Brennstoffzellen-Heizung 2026',
        desc: 'Hocheffiziente Energieerzeugung: Wärme und Strom gleichzeitig. Sichern Sie sich hohe KfW-Zuschüsse.',
        category: 'energie',
        amount: 'Bis zu 40 %',
        source: 'KfW',
        url: 'foerderung-brennstoffzelle-heizung.html',
        img: 'images/brennstoffzelle_card.png',
        tags: ['brennstoffzelle', 'kwk', 'heizung', 'energie', 'kfw', 'strom'],
    },
    {
        id: 'solarthermie',
        name: 'Solarthermie Förderung 2026',
        desc: 'Nutzen Sie die Sonne für Warmwasser und Heizung. Sichern Sie sich bis zu 30 % Zuschuss vom BAFA.',
        category: 'energie',
        amount: 'Bis zu 30 %',
        source: 'BAFA',
        url: 'foerderung-solarthermie-bafa.html',
        img: 'images/solarthermie_card.png',
        tags: ['solarthermie', 'solar', 'wärme', 'energie', 'bafa', 'haus'],
    },
    {
        id: 'speicher-nrw',
        name: 'Batteriespeicher NRW 2026',
        desc: 'Boni für Stromspeicher in NRW. Kombinieren Sie Ihre PV-Anlage mit staatlicher Unterstützung aus Düsseldorf.',
        category: 'energie',
        amount: 'NRW Boni',
        source: 'Progress.nrw',
        url: 'foerderung-batteriespeicher-nrw.html',
        img: 'images/batteriespeicher_nrw_card.png',
        tags: ['speicher', 'batterie', 'nrw', 'solar', 'energie', 'strom'],
    },
    {
        id: 'energieberatung',
        name: 'Energieberatung Förderung 2026',
        desc: 'Professionelle Sanierungsplanung: Das BAFA übernimmt bis zu 80 % der Kosten für Ihren Energieberater.',
        category: 'energie',
        amount: 'Bis zu 80 %',
        source: 'BAFA',
        url: 'foerderung-energieberatung-wohngebaeude.html',
        img: 'images/energieberatung_card.png',
        tags: ['energieberatung', 'isfp', 'sanierung', 'beratung', 'energie', 'bafa'],
    },
    {
        id: 'kfw-qng',
        name: 'KfW Nachhaltiges Bauen (QNG)',
        desc: 'Klimafreundlicher Neubau 2026: Zinsgünstige Kredite für Häuser mit Qualitätssiegel Nachhaltiges Gebäude.',
        category: 'wohnen',
        amount: 'KfW Kredit',
        source: 'KfW (297/298)',
        url: 'kfw-nachhaltiges-bauen-qng.html',
        img: 'images/kfw_qng_card.png',
        tags: ['kfw', 'neubau', 'qng', 'nachhaltigkeit', 'kredit', 'hausbau'],
    },
    {
        id: 'kfw-denkmal',
        name: 'KfW (151) Denkmal Sanierung',
        desc: 'Sanierung von Baudenkmalen und historischer Bausubstanz. Sichern Sie sich zinsgünstige KfW-Kredite.',
        category: 'wohnen',
        amount: 'KfW Kredit',
        source: 'KfW',
        url: 'kfw-denkmal-sanierung-151.html',
        img: 'images/kfw_denkmal_card.png',
        tags: ['denkmal', 'sanierung', 'kfw', 'altbau', 'haus', 'kredit'],
    },
    {
        id: 'barrierefrei-159',
        name: 'KfW (159) Barrierefrei Umbauen',
        desc: 'Altersgerecht umbauen und Einbruchschutz erhöhen. Zinsgünstige Kredite für ein komfortables Zuhause.',
        category: 'wohnen',
        amount: 'KfW Kredit',
        source: 'KfW',
        url: 'kfw-barrierefreies-umbauen-159.html',
        img: 'images/barrierefrei_card.png',
        tags: ['barrierefrei', 'umbau', 'kfw', 'altersgerecht', 'einbruchschutz', 'wohnen'],
    },
    {
        id: 'biomasse-pellets',
        name: 'Biomasseheizung Förderung 2026',
        desc: 'Heizen mit Pellets oder Holzvergaser. Sichern Sie sich bis zu 70 % Zuschuss für Ihre neue Biomasseheizung.',
        category: 'energie',
        amount: 'Bis zu 70 %',
        source: 'KfW / BAFA',
        url: 'foerderung-biomasseheizung-pellets.html',
        img: 'images/biomasse_card.png',
        tags: ['biomasse', 'pellets', 'holz', 'heizung', 'zuschuss', 'energie'],
    },
    {
        id: 'kfw-261',
        name: 'KfW (261) Sanierung Kredit',
        desc: 'Komplettsanierung zum Effizienzhaus. Bis zu 150.000 € Kredit mit hohen Tilgungszuschüssen vom Staat.',
        category: 'wohnen',
        amount: 'Bis 150.000 €',
        source: 'KfW',
        url: 'kfw-sanierung-kredit-261.html',
        img: 'images/kfw_sanierung_card.png',
        tags: ['kfw', 'sanierung', 'effizienzhaus', 'kredit', 'zuschuss', 'haus'],
    },
    {
        id: 'gruenderzuschuss-antrag',
        name: 'Gründungszuschuss 2026',
        desc: 'Startkapital für die Selbstständigkeit aus dem ALG I. Monatliche Förderung zur Absicherung Ihrer Gründung.',
        category: 'business',
        amount: 'ALG I + 300€',
        source: 'Arbeitsagentur',
        url: 'gruenderzuschuss-antrag-tipps.html',
        img: 'images/gruenderzuschuss_card.png',
        tags: ['gründung', 'business', 'zuschuss', 'arbeitsagentur', 'alg1', 'selbstständig'],
    },
    {
        id: 'kfw-startgeld',
        name: 'KfW Startgeld (067)',
        desc: 'Kredit für Gründer und junge Unternehmen bis 125.000 €. Ohne Eigenkapital möglich dank Haftungsfreistellung.',
        category: 'business',
        amount: 'Bis 125.000€',
        source: 'KfW',
        url: 'kfw-startgeld-foerderung.html',
        img: 'images/gruender_card.png',
        tags: ['kfw', 'kredit', 'business', 'gründung', 'kapital', 'finanzierung'],
    },
    {
        id: 'exist-stipendium',
        name: 'EXIST Gründerstipendium',
        desc: 'Unterstützung für Uni-Absolventen und Forscher. Bis zu 3.000 € monatlich für innovative Gründungsteams.',
        category: 'business',
        amount: 'Bis 3.000€/Mon.',
        source: 'BMWK / EU',
        url: 'exist-gruenderstipendium.html',
        img: 'images/gruender_card.png',
        tags: ['stipendium', 'uni', 'hochschule', 'innovation', 'business', 'gründung'],
    },
    {
        id: 'digital-jetzt',
        name: 'Digital Jetzt Förderung',
        desc: 'Zuschüsse bis 50.000 € für die Digitalisierung Ihres Unternehmens. Modernisieren Sie Hardware, Software und Know-how.',
        category: 'business',
        amount: 'Bis 50.000€',
        source: 'BMWK',
        url: 'digital-jetzt-foerderung.html',
        img: 'images/eu_regional_card.png',
        tags: ['digitalisierung', 'it', 'software', 'zuschuss', 'business', 'kmu'],
    },
    {
        id: 'kfw-300',
        name: 'KfW (300) Wohneigentum',
        desc: 'Zinsgünstige Kredite für Familien mit Kindern. Bauen oder kaufen Sie klimafreundliches Wohneigentum für Ihr Familienglück.',
        category: 'wohnen',
        amount: 'Bis 270.000€',
        source: 'KfW',
        url: 'kfw-hausbau-kredit-300.html',
        img: 'images/familie_card.png',
        tags: ['kfw', 'familie', 'wohnen', 'kredit', 'hausbau', 'zinsgünstig'],
    },
    {
        id: 'kfw-124',
        name: 'KfW (124) Basis-Kredit',
        desc: 'Das Wohneigentumsprogramm für alle. Sichern Sie sich bis zu 100.000 € für den Kauf oder Bau Ihres Eigenheims.',
        category: 'wohnen',
        amount: 'Bis 100.000€',
        source: 'KfW',
        url: 'kfw-wohneigentumsprogramm-124.html',
        img: 'images/kfw_sanierung_card.png',
        tags: ['kfw', 'kredit', 'hausbau', 'wohnen', 'finanzierung', 'immobilie'],
    },
    {
        id: 'invest-zuschuss',
        name: 'INVEST Wagniskapital',
        desc: '25 % Zuschuss für Business Angels und private Investoren. Unterstützen Sie innovative Startups und sparen Sie Steuern.',
        category: 'business',
        amount: '25 % Zuschuss',
        source: 'BAFA',
        url: 'invest-zuschuss-wagniskapital.html',
        img: 'images/selbststaendige_card.png',
        tags: ['invest', 'business', 'zuschuss', 'bafa', 'startup', 'wagniskapital'],
    },
    {
        id: 'bafa-beratung',
        name: 'BAFA Beratung Know-how',
        desc: 'Staatlicher Zuschuss zu Beratungskosten für Firmen. Sichern Sie sich bis zu 50 % für Strategie, Marketing und Personal.',
        category: 'business',
        amount: 'Bis 50 %',
        source: 'BAFA',
        url: 'unternehmensberatung-foerderung-bafa.html',
        img: 'images/energieberatung_card.png',
        tags: ['beratung', 'coaching', 'bafa', 'business', 'kmu', 'wissen'],
    },
    {
        id: 'kfw-umwelt-240',
        name: 'KfW Umweltprogramm (240)',
        desc: 'Kredit für gewerbliche Investitionen in den Umweltschutz. Finanzieren Sie Luftreinhaltung, Abwasser und Recycling.',
        category: 'business',
        amount: 'Zinsgünstig',
        source: 'KfW',
        url: 'kfw-umweltprogramm-240.html',
        img: 'images/kfw_card.png',
        tags: ['kfw', 'umwelt', 'nachhaltigkeit', 'business', 'kredit', 'klima'],
    },
    {
        id: 'fe-foerderung',
        name: 'Forschung & Entwicklung',
        desc: 'Förderung für Innovationen in KMU. Nutzen Sie steuerliche Forschungszulagen und direkte Projektzuschüsse für Ihr Wachstum.',
        category: 'business',
        amount: 'Bis 1 Mio €',
        source: 'Bund',
        url: 'foerderung-forschung-entwicklung.html',
        img: 'images/fe_foerderung_card.png',
        tags: ['forschung', 'innovation', 'business', 'zuschuss', 'entwicklung', 'tech'],
    },
    {
        id: 'begabtenfoerderung',
        name: 'Stipendium Begabtenförderung',
        desc: 'Finanzielle Unterstützung für talentierte Studierende. Erhalten Sie monatliche Büchergelder und BAföG-unabhängige Boni.',
        category: 'business',
        amount: 'Bis 300€/Mon.',
        source: 'BMBF / Stiftungen',
        url: 'stipendium-begabtenfoerderung-studium.html',
        img: 'images/stipendium_card.png',
        tags: ['stipendium', 'studium', 'bildung', 'förderung', 'talent', 'uni'],
    },
    {
        id: 'bab-foederung',
        name: 'BAB Berufsausbildungsbeihilfe',
        desc: 'Finanzielle Hilfe für Auszubildende mit eigenem Haushalt. Wir unterstützen Ihren Weg in den Beruf mit monatlichen Zuschüssen.',
        category: 'business',
        amount: 'Individuell',
        source: 'Arbeitsagentur',
        url: 'berufsausbildungsbeihilfe-bab.html',
        img: 'images/studium_card.png',
        tags: ['ausbildung', 'azubi', 'zuschuss', 'arbeitsagentur', 'bildung', 'beruf'],
    },
    {
        id: 'eu-regional',
        name: 'EU Regionalentwicklung',
        desc: 'Förderung für Infrastruktur und regionale Wirtschaftsprojekte. Stärken Sie Ihren Standort mit Mitteln aus EFRE und ELER.',
        category: 'business',
        amount: 'Milliarden-Fonds',
        source: 'EU',
        url: 'eu-foerderung-regionalentwicklung.html',
        img: 'images/eu_regional_card.png',
        tags: ['eu', 'regionalentwicklung', 'business', 'infrastruktur', 'förderung', 'europa'],
    },
    {
        id: 'emobil-unternehmen',
        name: 'E-Mobilität für Unternehmen',
        desc: 'Zuschüsse für Elektro-Fuhrparks und Ladeinfrastruktur. Stellen Sie Ihr Unternehmen zukunftssicher und nachhaltig auf.',
        category: 'business',
        amount: 'Bis 80 % Bonus',
        source: 'BMDV / KfW',
        url: 'foerderung-elektromobilitaet-unternehmen.html',
        img: 'images/eauto_card.png',
        tags: ['elektroauto', 'laden', 'unternehmen', 'flotte', 'mobilbität', 'nachhaltig'],
    },
    {
        id: 'kfw-studienkredit',
        name: 'KfW Studienkredit (174)',
        desc: 'Flexible Finanzierung für Ihr Studium unabhängig vom Einkommen. Bis zu 650 € monatlich für Lebenshaltungskosten.',
        category: 'business',
        amount: 'Bis 650€/Mon.',
        source: 'KfW',
        url: 'kfw-studienkredit-konditionen.html',
        img: 'images/meister_bafoeg_alt.png',
        tags: ['kfw', 'studienkredit', 'studium', 'finanzierung', 'uni', 'kredit'],
    },
    {
        id: 'bafoeg-2026',
        name: 'BAföG Höchstsatz 2026',
        desc: 'Sichern Sie sich bis zu 934 € monatlich für Ihr Studium oder Ihre schulische Ausbildung. Wir zeigen Ihnen alle Freibeträge.',
        category: 'familie',
        amount: 'Bis 934€',
        source: 'BMBF',
        url: 'bafoeg-hoechstsatz-2026.html',
        img: 'images/studium_card.png',
        tags: ['bafoeg', 'studium', 'bildung', 'zuschuss', 'bafög', 'uni'],
    },
    {
        id: 'kindergeld-2026',
        name: 'Kindergeld Termine 2026',
        desc: 'Alle Auszahlungstermine und nützliche Infos zum Kindergeld 2026. 255 € pro Kind monatlich für Ihre Familie.',
        category: 'familie',
        amount: '255€ / Kind',
        source: 'Familienkasse',
        url: 'kindergeld-auszahlungstermine-2026.html',
        img: 'images/familiecard.png',
        tags: ['kindergeld', 'familie', 'auszahlung', 'termin', 'zuschuss', 'finanzen'],
    },
    {
        id: 'elterngeld-anleitung',
        name: 'Elterngeld Anleitung 2026',
        desc: 'Berechnen Sie Ihr Elterngeld optimal. Alles zu Basiselterngeld, ElterngeldPlus und den Partnermonaten für moderne Eltern.',
        category: 'familie',
        amount: 'Bis 1.800€',
        source: 'Elterngeldstelle',
        url: 'elterngeld-berechnen-anleitung.html',
        img: 'images/familie_card.png',
        tags: ['elterngeld', 'familie', 'geburt', 'baby', 'planung', 'zuschuss'],
    },
    {
        id: 'wohngeld-2026',
        name: 'Wohngeld 2026 Check',
        desc: 'Staatlicher Zuschuss zu Ihren Wohnkosten. Wir prüfen Ihre Voraussetzungen für Mietzuschuss oder Lastenzuschuss.',
        category: 'familie',
        amount: '∅ 370€',
        source: 'Wohngeldbehörde',
        url: 'wohngeld-antrag-voraussetzungen.html',
        img: 'images/kfw_card.png',
        tags: ['wohngeld', 'wohnen', 'miete', 'zuschuss', 'wohnung', 'soziales'],
    },
    {
        id: 'kinderzuschlag-2026',
        name: 'Kinderzuschlag (KiZ)',
        desc: 'Zusätzliche finanzielle Hilfe für berufstätige Eltern mit kleinem Einkommen. Bis zu 292 € pro Kind monatlich sichern.',
        category: 'familie',
        amount: 'Bis 292€ / Kind',
        source: 'Familienkasse',
        url: 'kinderzuschlag-beantragen-online.html',
        img: 'images/familie_card.png',
        tags: ['kinderzuschlag', 'kiz', 'familie', 'zuschuss', 'finanzen', 'zusatz'],
    },
    {
        id: 'bildungspaket-but',
        name: 'Bildungspaket (BuT)',
        desc: 'Leistungen für Bildung und Teilhabe. Sichern Sie Ihrem Kind Mittagessen, Schulbedarf und Sportvereine.',
        category: 'familie',
        amount: 'Bedarfsgerecht',
        source: 'Kommune / Jobcenter',
        url: 'bildungspaket-bu-teilhabe.html',
        img: 'images/studium_card.png',
        tags: ['bildung', 'teilhabe', 'but', 'schule', 'kinder', 'zuschuss'],
    },
    {
        id: 'eauto-privat-2026',
        name: 'E-Auto Förderung 2026 (Privat)',
        desc: 'Alle Vorteile für den Umstieg auf Elektromobilität. Nutzen Sie Steuerbefreiungen und die THG-Quote für Ihr neues Auto.',
        category: 'familie',
        amount: 'Vorteile & Boni',
        source: 'Bund',
        url: 'foerderung-elektroauto-2026.html',
        img: 'images/eauto_card.png',
        tags: ['elektroauto', 'e-auto', 'mobilbität', 'nachhaltig', 'familie', 'zuschuss'],
    },
    {
        id: 'wallbox-privat',
        name: 'Wallbox Förderung Privat',
        desc: 'Ihre eigene Ladestation zu Hause. Wir zeigen Ihnen alle regionalen und kommunalen Zuschüsse für Ihre Wallbox.',
        category: 'familie',
        amount: 'Zuschüsse variieren',
        source: 'KfW / Land',
        url: 'foederung-wallbox-privat.html',
        img: 'images/wallbox_card.png',
        tags: ['wallbox', 'laden', 'e-auto', 'elektroauto', 'familie', 'zuschuss'],
    },
    {
        id: 'lastenrad-bayern',
        name: 'Lastenrad Förderung Bayern',
        desc: 'Zuschüsse für E-Lastenräder in bayerischen Städten und Regionen. Sichern Sie sich bis zu 1.000 € pro Rad.',
        category: 'familie',
        amount: 'Bis 1.000€',
        source: 'Kommune / Bayern',
        url: 'foerderung-lastenrad-bayern.html',
        img: 'images/ebike_leasing_card.png',
        tags: ['lastenrad', 'bayern', 'e-bike', 'fahrrad', 'familie', 'zuschuss'],
    },
    {
        id: 'erwachsenen-sachsen',
        name: 'Erwachsenenbildung Sachsen',
        desc: 'Weiterbildungsschecks für Beschäftigte in Sachsen. Sichern Sie sich bis zu 80 % Zuschuss für Ihre berufliche Qualifizierung.',
        category: 'familie',
        amount: 'Bis 80 %',
        source: 'SAB Sachsen',
        url: 'erwachsenenbildung-foerderung-sachsen.html',
        img: 'images/familie_card.png',
        tags: ['bildung', 'sachsen', 'weiterbildung', 'zuschuss', 'karriere', 'lernen'],
    },
    {
        id: 'meister-bafoeg',
        name: 'Meister-BAföG (Aufstieg)',
        desc: 'Die ideale Finanzierung für Ihre Weiterbildung zum Meister oder Fachwirt. 50 % Zuschuss auf Kurs- und Prüfungsgebühren.',
        category: 'familie',
        amount: '50 % Zuschuss',
        source: 'BMBF',
        url: 'meister-bafoeg-hoehe.html',
        img: 'images/meister_bafoeg_alt.png',
        tags: ['meister', 'bafög', 'fortbildung', 'zuschuss', 'karriere', 'handwerk'],
    },
    {
        id: 'meisterbonus-bb',
        name: 'Meisterbonus Brandenburg',
        desc: 'Zusätzliche Prämie von 1.500 € für erfolgreiche Absolventen in Brandenburg. Belohnen Sie Ihren beruflichen Aufstieg.',
        category: 'familie',
        amount: '1.500 € Prämie',
        source: 'ILB / Brandenburg',
        url: 'aufstiegs-bafoeg-brandenburg.html',
        img: 'images/brandeburgcard.png',
        tags: ['meister', 'brandenburg', 'bonus', 'fortbildung', 'zuschuss', 'karriere'],
    },
    {
        id: 'landwirt-eu',
        name: 'EU Landwirtschaftsförderung',
        desc: 'Direktzahlungen und Öko-Regelungen für landwirtschaftliche Betriebe. Sichern Sie die Zukunftsfähigkeit Ihres Hofes.',
        category: 'familie',
        amount: 'Milliarden-Paket',
        source: 'EU / BMEL',
        url: 'landwirtschaft-foerderung-eu.html',
        img: 'images/landwirtschaft_card.png',
        tags: ['landwirtschaft', 'eu', 'bauern', 'umwelt', 'zuschuss', 'agrar'],
    },
    {
        id: 'kultur-bund',
        name: 'Kulturförderung des Bundes',
        desc: 'Förderung für künstlerische Projekte, Kultureinrichtungen und individuelle Stipendien. Stärken Sie die kulturelle Vielfalt.',
        category: 'familie',
        amount: 'Bedarfsgerecht',
        source: 'BKM / Bund',
        url: 'foerderung-kultur-projekte-bund.html',
        img: 'images/kulturfoerderung_card.png',
        tags: ['kultur', 'kunst', 'projekt', 'stipendium', 'bund', 'zuschuss'],
    },
    {
        id: 'ebike-leasing',
        name: 'E-Bike Leasing & Förderung',
        desc: 'Günstig zum neuen E-Bike durch Gehaltsumwandlung und kommunale Boni. Nutzen Sie die 0,25 % Steuerregel.',
        category: 'familie',
        amount: 'Bis 40 % Sparen',
        source: 'Arbeitgeber / Kommune',
        url: 'foerderung-e-bike-leasing.html',
        img: 'images/ebike_leasing_card.png',
        tags: ['ebike', 'e-bike', 'leasing', 'fahrrad', 'mobilbität', 'nachhaltig'],
    },
];

/* -- Public API --------------------------------------------- */
window.FoerderSearch = {
    programs: PROGRAMS,

    filter(query = '', category = '') {
        const q = query.toLowerCase().trim();
        return PROGRAMS.filter(p => {
            const matchesCat = !category || p.category === category;
            if (!q) return matchesCat;
            const haystack = [p.name, p.desc, p.source, ...p.tags].join(' ').toLowerCase();
            return matchesCat && haystack.includes(q);
        });
    },

    renderCards(container, programs) {
        if (!programs.length) {
            container.innerHTML = `
        <div class="empty">
          <div class="empty__icon">🔍</div>
          <h3 class="empty__title">Keine Treffer gefunden</h3>
          <p class="empty__sub">Versuche andere Suchbegriffe oder wähle eine andere Kategorie.</p>
        </div>`;
            return;
        }

        const catBg = {
            energie: '#FFF4ED', business: '#F5F3FF',
            mobil: '#ECFEFF', familie: '#FDF2F8', wohnen: '#EDEFFD',
        };
        const catColor = {
            energie: '#C2410C', business: '#6D28D9',
            mobil: '#0E7490', familie: '#BE185D', wohnen: '#3B5FA0',
        };
        const catLabels = {
            energie: 'Energie & Haus', business: 'Gründen & Business',
            mobil: 'Mobilität', familie: 'Familie & Bildung', wohnen: 'Wohnen & Kredit',
        };

        container.innerHTML = programs.map(p => `
      <a href="${p.url}" class="img-card animate-in" data-category="${p.category}">
        <div class="img-card__img-wrap">
          <img src="${p.img}" alt="${p.name}" class="img-card__img" loading="lazy">
        </div>
        <div class="img-card__body">
          <div class="img-card__badges">
            <span class="img-card__cat badge--${p.category}">${catLabels[p.category] || p.category}</span>
            <span class="img-card__amount">${p.amount}</span>
          </div>
          <h3 class="img-card__name">${p.name}</h3>
          <p class="img-card__desc">${p.desc}</p>
          <div class="img-card__footer">
            <span class="img-card__btn">Details ansehen →</span>
          </div>
        </div>
      </a>
    `).join('');

        if (window.FoerderSearch._reObserve) window.FoerderSearch._reObserve();
    },

    _reObserve: null,
};

/* -- Init search page --------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsGrid = document.getElementById('results-grid');
    const filterBtns = document.querySelectorAll('.filter-pill');
    const resultCount = document.getElementById('result-count');

    if (!resultsGrid) return;

    let currentQuery = '';
    let currentCategory = '';

    const params = new URLSearchParams(window.location.search);
    if (params.get('q')) { currentQuery = params.get('q'); if (searchInput) searchInput.value = currentQuery; }
    if (params.get('kat')) { currentCategory = params.get('kat'); }

    filterBtns.forEach(btn => {
        if (btn.dataset.cat === currentCategory) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    function render() {
        const results = window.FoerderSearch.filter(currentQuery, currentCategory);
        window.FoerderSearch.renderCards(resultsGrid, results);
        if (resultCount) resultCount.textContent = results.length;
    }

    window.FoerderSearch._reObserve = () => {
        const newTargets = resultsGrid.querySelectorAll('.animate-in:not(.visible)');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.08 });
        newTargets.forEach(el => obs.observe(el));
    };

    render();

    if (searchInput) {
        searchInput.addEventListener('input', () => { currentQuery = searchInput.value; render(); });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            currentCategory = btn.dataset.cat === currentCategory ? '' : btn.dataset.cat;
            if (currentCategory) btn.classList.add('active');
            render();
        });
    });
});
