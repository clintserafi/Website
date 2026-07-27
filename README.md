# Performance Collective — Website

Static site: Home, About, Services, Contact. No build step — plain HTML/CSS/JS, deployed via GitHub Pages.

## Structure
```
index.html      Home
about.html      About
services.html   Services
contact.html    Contact form
css/style.css   Shared styles
js/main.js      Nav toggle + form submit handling
images/         Drop real photos here, then swap the .img-placeholder divs for <img> tags
```

## To-do before launch
- [ ] Sign up at https://formspree.io (or https://usebasin.com), create a form, and replace
      `YOUR_FORM_ID` in `contact.html`'s `<form action="...">` with your real form ID.
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
