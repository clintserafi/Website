# Website Update Transcript

## Request Summary
- Increase the homepage logo size.
- Replace the homepage hero placeholder with a dynamic carousel of avatar images representing adventure sports, amputee athletes, collegiate athletes, over-40 athletic adults, and military service members.
- Change typography to a more modern sans-serif style.
- Update the About page headline to "Protect your freedom, plan for performance." and include subtext with "Guidance that puts you back in control of your health."
- Add team member profiles for Clint Serafino and Jennifer McConnell, using Clint's headshot from the Images folder.
- Update Services to add peptides, GLP-1, HRT/TRT with physician oversight, nutrition support, resistance training and conditioning, lifestyle coaching, virtual triage, and a health navigator retainer.
- Update Contact with Gmail/Formspree setup instructions, anti-spam friction, published email, and Privacy Policy / Terms of Service links.

## Changes Made
- `index.html`: inserted a carousel section with slides for key athlete imagery, and kept hero messaging and CTAs.
- `about.html`: updated hero headline and subtext; added Clint Serafino's headshot and Jennifer McConnell profile placeholder.
- `services.html`: replaced the service lineup with the requested offerings and added a physician oversight footnote.
- `contact.html`: added explicit Formspree/Gmail routing guidance, required referral field, anti-spam honeypot field, email publication at the bottom, and links to policy pages.
- `css/style.css`: increased logo size, switched heading fonts to Inter, added carousel styles, and styled the contact form select field.
- `js/main.js`: added homepage carousel behavior with autoplay and manual controls.
- `privacy.html` and `terms.html`: created placeholder policy pages linked from the site footer.

## Notes
- The contact form still requires replacing `YOUR_FORM_ID` with the real Formspree form ID.
- The Jennifer McConnell headshot is currently a placeholder until the actual image is provided.
