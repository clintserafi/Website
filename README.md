# Performance Collective — Website

Static site: Home, About, Services, Contact. No build step — plain HTML/CSS/JS, deployed via GitHub Pages.

## Structure
```
index.html      Home
about.html      About
services.html   Services
contact.html    Contact form
css/style.css   Shared styles
js/main.js      Nav toggle, carousel, contact-form prefill
js/leads.js     Sends every data-lead-form form to the Google Sheet
images/         Drop real photos here, then swap the .img-placeholder divs for <img> tags
```

## To-do before launch
- [ ] Set up the Google Sheet lead tracker and paste its web app URL into `LEADS_ENDPOINT` in `js/leads.js` (see `automation/README.md`). Until then, forms fall back to the old Formspree form (`FALLBACK_ENDPOINT`); remove it once the sheet is live.
- [ ] Replace `.img-placeholder` divs with real `<img src="images/..." alt="...">` tags.
- [ ] Swap placeholder About/Services copy for final content.
- [ ] Update the copyright year/footer if needed.

## Local preview
Open `index.html` directly in a browser, or serve it locally:
```
python3 -m http.server 8000
```
then visit http://localhost:8000

## Deploy
Pushed to GitHub Pages from the `main` branch. See repo Settings → Pages.
Custom domain: www.performancecollective.co (DNS configured at the registrar).
