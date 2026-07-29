function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Performance Collective')
    .addItem('Create follow-up drafts', 'createFollowUpDrafts')
    .addToUi();
}

function createFollowUpDrafts() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const values = sheet.getDataRange().getDisplayValues();

  if (!values.length) {
    SpreadsheetApp.getUi().alert('No rows found in the sheet.');
    return;
  }

  const headers = values[0].map((header) => String(header).trim().toLowerCase());
  const nameIndex = headers.indexOf('name');
  const emailIndex = headers.indexOf('email');
  const messageIndex = headers.indexOf('message');
  const statusIndex = headers.indexOf('draft_status');

  if (nameIndex === -1 || emailIndex === -1 || messageIndex === -1) {
    SpreadsheetApp.getUi().alert('Expected columns named name, email, and message.');
    return;
  }

  if (statusIndex === -1) {
    sheet.getRange(1, headers.length + 1).setValue('draft_status');
    headers.push('draft_status');
  }

  let created = 0;

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const name = row[nameIndex] || '';
    const email = row[emailIndex] || '';
    const message = row[messageIndex] || '';
    const status = row[statusIndex] || '';

    if (!email || status.toLowerCase() === 'drafted') {
      continue;
    }

    const subject = `Thanks for reaching out, ${name || 'there'} — let’s connect`;
    const body = `Hey ${name || 'there'}!\n\nThanks for reaching out to us about ${message ? '"' + message + '"' : 'your health goals'}. We’d love to help you take the next step.\n\nWhat is the best time for us to connect via phone or Google Meet?\n\n➡️ Click here to schedule your Virtual Consultation:\nhttps://calendar.app.google/kQQdvzUcjmH3BAAz7\n\nThanks,\nClint Serafino\nHealth Navigator\nPerformance Collective`;

    GmailApp.createDraft(email, subject, body);
    sheet.getRange(i + 1, statusIndex === -1 ? headers.length : statusIndex + 1).setValue('drafted');
    created += 1;
  }

  SpreadsheetApp.getUi().alert(`Created ${created} follow-up draft(s).`);
}
