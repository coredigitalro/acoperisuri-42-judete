# Acoperișuri — 41 site-uri pe județe (subdomenii)

## Structură
Fiecare folder (`alba/`, `arad/`, `cluj/`, etc.) e un site complet, independent:
`index.html`, `style.css`, `script.js`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `assets/` (6 poze galerie).

## ⚠️ IMPORTANT — înainte de deploy
Fișierul `vercel.json` conține 41 de reguli de rewrite, toate scrise cu domeniul placeholder
**`DOMENIUL-TAU-REAL.ro`**. Înlocuiește-l cu domeniul real cumpărat, în TOATE apariițiile,
înainte de primul deploy:

```
sed -i 's/DOMENIUL-TAU-REAL\.ro/domeniul-tau-real.ro/g' vercel.json sitemap-index.xml
```

Pe Windows (PowerShell):
```
(Get-Content vercel.json) -replace 'DOMENIUL-TAU-REAL\.ro','domeniul-tau-real.ro' | Set-Content vercel.json
```

## Ce s-a schimbat față de versiunea anterioară
- **Telefon unic peste tot:** 0721 001 888 (identic în toate cele 41 de site-uri)
- **Ani experiență unic peste tot:** 20 ani (identic în toate cele 41)
- **Text descriptiv (lede) rămâne diferit per județ** — intenționat, pentru SEO: conținut identic
  pe subdomenii diferite ("duplicate content") e penalizat de Google, deci variația de text ajută
  indexarea fiecărui subdomeniu ca pagină distinctă.
- **Galerie extinsă la 6 poze** (adăugate: fereastră mansardă, montaj jgheaburi).

## Pași de deploy (Vercel + GitHub)

1. Urci acest folder complet într-un repo GitHub nou (păstrează structura exact așa cum e).
2. Vercel → **Add New Project → Import Git Repository** → alegi repo-ul.
   Framework Preset: **Other** (fără build command — site-urile sunt HTML/CSS/JS static pur).
3. După primul deploy: **Project → Settings → Domains**.
4. Adaugi fiecare subdomeniu din cele 41 (`alba.domeniul-tau-real.ro`, ... — numele = folderele din proiect).
5. **CNAME-urile rămân manuale**, la providerul de domeniu, per subdomeniu:
   ```
   Tip:   CNAME
   Nume:  <slug-județ>
   Value: cname.vercel-dns.com
   ```
   Sau un singur wildcard pentru toate 41:
   ```
   Tip:   CNAME
   Nume:  *
   Value: cname.vercel-dns.com
   ```
   (wildcard-ul trebuie adăugat și ca `*.domeniul-tau-real.ro` în Vercel → Domains)
6. După propagarea DNS, fiecare subdomeniu e live automat, cu SSL emis automat.

## SEO
Fiecare site are `robots.txt` + `sitemap.xml` proprii. `sitemap-index.xml` din rădăcină e un
punct de plecare pentru un sitemap central, dacă vrei unul (trebuie actualizat cu domeniul real).
