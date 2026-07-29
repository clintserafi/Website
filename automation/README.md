# Formspree follow-up automation

Automatically create personalized Gmail follow-up drafts from Formspree contact submissions, directly from your Gmail inbox.

## Quick Setup

### Step 1: Create a Gmail label
1. Go to your Gmail inbox
2. Create a new label called **"Formspree"**
3. Set up a Gmail filter: from:`noreply@formspree.io` → Apply label "Formspree"

### Step 2: Create a Google Sheet
Create a new Google Sheet with these column headers in row 1:
- `name`
- `email`
- `phone`
- `referral`
- `message`
- `draft_created`

### Step 3: Set up Apps Script
1. Open your Google Sheet
2. Click **Extensions → Apps Script**
3. Delete any existing code
4. Paste the code from [gmail-formspree-automation.gs](gmail-formspree-automation.gs)
5. Click **Save** (project name can stay as "Untitled project")

### Step 4: Add a time-based trigger
1. In Apps Script, click the **Triggers** icon (⏰) on the left
2. Click **Create new trigger**
3. Configure:
   - **Function:** `processFormspreeEmails`
   - **Deployment:** Head deployment
   - **Event source:** Time-driven
   - **Type of time interval:** Minutes
   - **Interval:** Every 5 minutes
4. Click **Save**

### Step 5: Test it
1. From your Google Sheet, click **Performance Collective → Process Formspree emails now**
2. Fill out your contact form at performancecollective.co/contact.html
3. Watch the script automatically:
   - Pull name, email, phone, referral, and message from the Formspree email
   - Add the row to your Google Sheet
   - Create a personalized Gmail draft

## How it works

- **Every 5 minutes**, the script checks your Gmail inbox for new unread emails from Formspree
- **Extracts** name, email, phone, referral, and message from the email
- **Logs each entry** to your Google Sheet for record-keeping
- **Creates a Gmail draft** with your personalized follow-up message
- **Marks the email as read** so it's not processed again

## Follow-up email template

```
Hey [name]!

Thanks for reaching out to us about "[message]". We'd love to help you take the next step.

What is the best time for us to connect via phone or Google Meet?

➡️ Click here to schedule your Virtual Consultation:
https://calendar.app.google/kQQdvzUcjmH3BAAz7

Thanks,
Clint Serafino
Health Navigator
Performance Collective
```

## Alternative: Manual processing

If you don't want the time-based trigger, you can run the script manually:
1. Open your Google Sheet
2. Click **Performance Collective → Process Formspree emails now**

## Older automation file

[follow-up-draft.gs](follow-up-draft.gs) is a simpler version that works with manually-added data. It can be deleted if you're using the Gmail-based automation.
