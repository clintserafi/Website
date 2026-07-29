# Formspree follow-up automation

This workflow turns a new Formspree contact submission into a Gmail draft for a personalized follow-up email.

## How it works
1. Send your Formspree contact form submissions into a Google Sheet.
2. Open the sheet and run the Apps Script function in this folder.
3. Gmail will create a draft using the contact’s name, email, and message.

## Setup
1. Create a Google Sheet with these headers:
   - name
   - email
   - message
   - phone
   - referral
2. Open the sheet and choose Extensions → Apps Script.
3. Paste the contents of [follow-up-draft.gs](follow-up-draft.gs).
4. Save the project and reload the sheet.
5. From the new “Performance Collective” menu, run “Create follow-up drafts”.

## Recommended connector path
Use either of these when the form is submitted:
- Formspree → Google Sheets → Apps Script
- Formspree → Zapier → Google Sheets → Apps Script

## Draft email template
The draft uses this structure:

Hey [name]!

Thanks for reaching out to us about [message]. We’d love to help you take the next step.

What is the best time for us to connect via phone or Google Meet?

➡️ Click here to schedule your Virtual Consultation:
https://calendar.app.google/kQQdvzUcjmH3BAAz7

Thanks,
Clint Serafino
Health Navigator
Performance Collective
