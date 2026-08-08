# BilkaRoofArt — site

## Structură
14 pagini HTML, fără dependențe externe (doar Google Fonts).

    index.html          — pagina principală
    servicii.html       — index servicii
    preturi.html        — listă prețuri (montaj complet / manoperă)
    lucrari.html        — portofoliu + filmări
    despre.html         — despre firmă, principii, parteneri
    contact.html        — formular + date de contact
    servicii/           — 8 subpagini, câte una per serviciu
    assets/css/main.css
    assets/js/main.js
    assets/img/         — 16 imagini + favicon
    assets/video/       — 2 filmări + postere

## Design
- Tipografie: Instrument Serif (titluri) + Inter Tight (text) + JetBrains Mono (cifre, etichete)
- Paletă: grafit profund cu accent cupru (#B87333) — culoarea tablei de acoperiș
- Meniu cu mega-dropdown pentru servicii; drawer separat pe mobil
- Animații: reveal la scroll, parallax pe hero, contoare animate, tranziții pe hover

## Formularul de contact
Momentan validează și confirmă vizual, dar NU trimite email.
Pentru trimitere reală: Formspree, Web3Forms sau un webhook — se modifică
blocul `contact form` din `assets/js/main.js`.

## Prețuri
Valorile din `preturi.html` și din subpaginile de servicii sunt orientative,
la nivelul pieței. **Trebuie confirmate sau înlocuite cu prețurile reale**
înainte de publicare.

## Deploy (Vercel / GitHub Pages)
Site static, fără build step.
- Vercel: Add New Project → Import repo → Framework Preset: **Other**
- GitHub Pages: Settings → Pages → Deploy from branch
