# Claude Website Update Notes

## Objective
Implement the requested website edits for Performance Collective across Home, About, Services, and Contact.

## Key Updates
- Homepage: added an image carousel with five avatar slides, enlarged the logo, and updated site font styling for headings.
- About: revised the headline and subtext as requested; added Clint Serafino and Jennifer McConnell team cards.
- Services: updated service cards to include peptides, GLP-1, HRT/TRT with physician oversight, nutrition support, resistance training, lifestyle coaching, virtual triage, and health navigator retainer.
- Contact: included Formspree-to-Gmail routing guidance, spam reduction fields, published email, plus Privacy Policy and Terms of Service page links.

## Files Changed
- `index.html`
- `about.html`
- `services.html`
- `contact.html`
- `css/style.css`
- `js/main.js`
- `privacy.html`
- `terms.html`

## Implementation Details
- The carousel uses static image slides and simple JS for autoplay and navigation.
- The contact form includes a hidden `_gotcha` honeypot field and a required referral dropdown to help reduce spam.
- Privacy and Terms pages were created as basic site content placeholders.
