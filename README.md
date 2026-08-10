# BilkaRoofArt — 42 de site-uri (subdomenii pe județ)

## Ce conține
- **42 de foldere** (unul per județ + București), fiecare cu **14 pagini** (index, servicii, prețuri,
  lucrări, despre, contact + 8 subpagini de servicii) = **588 pagini HTML total**.
- **`assets/`** — o singură copie, partajată între toate cele 42 (imagini, video, CSS, JS).
  Nu e duplicată per județ (ar fi însemnat ~380MB în loc de 22MB).
- **`vercel.json`** — 43 de reguli: una pentru servirea partajată a `assets/`, plus câte una
  pentru fiecare din cele 42 de subdomenii.

## ⚠️ Înainte de deploy — obligatoriu
Toate fișierele (HTML + `vercel.json`) folosesc domeniul placeholder **`DOMENIUL-TAU.ro`**.
Înlocuiește-l cu domeniul real, în TOATE fișierele, dintr-o comandă:

```bash
grep -rl "DOMENIUL-TAU.ro" --include="*.html" --include="*.json" --include="*.xml" --include="*.txt" . \
  | xargs sed -i 's/DOMENIUL-TAU\.ro/domeniul-real.ro/g'
```

Pe Windows (PowerShell), rulează comanda echivalentă per tip de fișier sau folosește WSL/Git Bash.

## Arhitectura fișierelor (important)
**Fiecare județ este autonom.** Are propriul folder `assets/` cu CSS, JS și imagini —
deci funcționează corect indiferent unde îl deschizi: local (dublu-click pe `index.html`),
pe Vercel, pe GitHub Pages sau pe orice alt hosting.

Singura excepție: **videourile** (`assets/video/`) sunt păstrate o singură dată, la rădăcină,
pentru că duplicate de 42 de ori ar fi însemnat +84MB. Ele sunt referite cu cale absolută
(`/assets/video/...`) și servite prin prima regulă din `vercel.json`:
```json
{ "source": "/assets/video/(.*)", "destination": "/assets/video/$1" }
```
Această regulă trebuie să rămână **prima** în listă — Vercel se oprește la prima potrivire.

Consecință practică: dacă deschizi un județ local, direct de pe calculator, totul arată
corect (design, imagini, meniuri), dar cele două filmări nu vor porni — se văd doar imaginile
de previzualizare. Pe Vercel, după deploy, funcționează și ele.

## Pași de deploy (Vercel + GitHub)
1. Rulezi comanda `sed` de mai sus, cu domeniul tău real.
2. Urci tot conținutul acestui folder într-un repo GitHub (poți suprascrie direct
   `coredigitalro/acoperisuri-42-judete`, dat fiind că masterul de-acolo a fost sursa acestui build).
3. Vercel → Add New Project → Import repo → Framework Preset: **Other** (fără build command).
4. Project → Settings → Domains → adaugi domeniul principal, apoi fiecare din cele 42 de subdomenii
   (`alba.domeniul-tau.ro`, `cluj.domeniul-tau.ro`, ...) — Vercel îți arată exact ce CNAME să pui.
   Alternativ, un singur record wildcard `* → cname.vercel-dns.com` acoperă toate 42 dintr-o mișcare
   (plus adaugi și `*.domeniul-tau.ro` ca domeniu wildcard în Vercel).
5. Testezi 2-3 subdomenii înainte să confirmi restul — ex. `alba.domeniul-tau.ro`,
   `cluj.domeniul-tau.ro/servicii/montaj-tigla-metalica.html`.

## SEO — ce diferă între cele 42 de site-uri (ca să nu fie duplicate content)
- **Title + meta description unice** pe fiecare pagină, cu numele județului/orașului inserat.
- **Canonical tag propriu** pe fiecare din cele 588 de pagini, către subdomeniul corect.
- **Textul de hero de pe pagina principală** — 4 variante de propoziție, rotite ciclic
  și completate cu județul/orașul, ca textul să nu fie identic cuvânt cu cuvânt pe toate 42.
- **Un paragraf suplimentar pe pagina "Despre"**, tot cu variație rotativă + local.
- **`robots.txt` + `sitemap.xml` propriu** per județ.

Ce rămâne intenționat identic pe toate 42 (nu e o problemă de SEO, e conținut de produs/serviciu,
nu de locație): descrierile tehnice ale serviciilor, prețurile, textele din galerie și secțiunea Bilka.

## Telefoane și contact
Peste tot: `0721 001 888`, `0732 080 320`, `bilkaroofart@gmail.com` — identice pe toate 42,
cum a fost stabilit.

## Ce NU s-a schimbat față de site-ul aprobat
Codul (animații, meniu, formular), stilul (temă luminoasă, cupru), toate cele 8 subpagini
de servicii, secțiunea Bilka cu 9 modele + paletă de culori, prețurile — identice cu varianta
pe care clientul a aprobat-o. Doar textul specific de locație și meta-datele SEO diferă.
