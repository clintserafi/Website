# Website lead tracker (Google Sheet)

Every form on the site (contact page, The Metabolic Collective, and any future form marked `data-lead-form`) posts to a Google Apps Script web app. For each submission it:

- adds a row to the **Leads** tab of your Google Sheet
- emails a notification to `hello@performancecollective.co` (hit Reply to answer the lead directly)
- creates a personalized Gmail follow-up draft with your booking link. Metabolic Collective leads also get their peptide guide link.

This replaces Formspree. No third-party form service is involved.

## One-time setup (about 10 minutes)

### 1. Create the sheet and paste the script
1. Go to [sheets.new](https://sheets.new) while signed in to the Google account that should own the leads. Name it something like **Performance Collective Leads**.
2. Click **Extensions → Apps Script**.
3. Delete the starter code, paste in all of [leads-to-sheet.gs](leads-to-sheet.gs), and click **Save**.

### 2. Build the tabs
1. In the Apps Script toolbar, choose the `setup` function and click **Run**.
2. Approve the permissions prompt. It asks for access to the sheet, sending email, and creating Gmail drafts. If Google shows "unverified app", choose **Advanced → Go to (project)**: it's your own script.
3. Back in the sheet you'll now have a **Leads** tab (with a Status dropdown) and a **Summary** tab.

### 3. Deploy it as a web app
1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear icon and choose **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**. ("Anyone" is what lets website visitors submit. They can't read the sheet.)
4. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
5. Open that URL in your browser. You should see "Performance Collective lead endpoint is running."

### 4. Connect the website
In [`js/leads.js`](../js/leads.js), replace `PASTE_APPS_SCRIPT_WEB_APP_URL_HERE` with the web app URL, then commit and push.

### 5. Test it
Submit the contact form and The Metabolic Collective form once each. Check for a new row in **Leads**, a notification email, and a draft in Gmail.

## Working your leads

| Column | Filled by | Use |
|---|---|---|
| Timestamp → UTM Campaign | Website | Who they are, what they asked, which page and campaign they came from |
| Status | You | New → Contacted → Consult Booked → Client / Not a Fit |
| Follow-up Draft | Script | "Drafted" once the Gmail draft exists |
| Next Follow-up | You | A date. The Summary tab counts follow-ups that are due |
| Notes | You | Anything else |

**Summary tab:** leads in the last 7 and 30 days, uncontacted leads, follow-ups due, and lead counts by source and by status.

**Tracking campaigns:** add UTM tags to links you share and they're recorded automatically, e.g.
`https://www.performancecollective.co/Doorways/the-metabolic-collective.html?utm_source=instagram&utm_campaign=peptides`

## Changing things later

- **Notification address, booking link, drafts on/off:** edit the constants at the top of `leads-to-sheet.gs`.
- **After editing the script** you must publish a new version: **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The URL stays the same.
- **If the sheet layout gets messed up:** the sheet menu **Performance Collective → Set up / repair lead sheet** rebuilds the headers and Summary tab without touching existing rows.

## Gated peptide guide

`Doorways/peptide-guide.html` is hidden from search engines and unlocks after someone submits The Metabolic Collective form. It's a soft gate: it keeps the guide off Google and makes the form the normal way in, but anyone given the direct link with `?access=granted` (the link in the follow-up draft) can open it. Don't put anything on that page that must stay truly confidential.
