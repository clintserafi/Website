/**
 * Gmail-based Formspree follow-up automation
 * 
 * Reads incoming Formspree emails from your inbox,
 * extracts contact info, and creates personalized Gmail drafts.
 * 
 * Setup:
 * 1. Create a label in Gmail called "Formspree" and apply it to incoming Formspree emails
 * 2. Create a Google Sheet with headers: name, email, phone, referral, message, draft_created
 * 3. Open the sheet, go to Extensions > Apps Script, paste this code
 * 4. Set up a time-based trigger to run procesFormspreeEmails() every 5 minutes
 */

function processFormspreeEmails() {
  // Get the Formspree label (create one if it doesn't exist)
  let label = GmailApp.getUserLabelByName("Formspree");
  if (!label) {
    label = GmailApp.createLabel("Formspree");
  }

  // Get unread threads from the Formspree label
  const unreadThreads = label.getThreads(0, 50).filter(thread => thread.isUnread());

  if (unreadThreads.length === 0) {
    Logger.log("No new Formspree emails found.");
    return;
  }

  const sheet = SpreadsheetApp.getActiveSheet();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  const nameIdx = headers.indexOf("name");
  const emailIdx = headers.indexOf("email");
  const phoneIdx = headers.indexOf("phone");
  const referralIdx = headers.indexOf("referral");
  const messageIdx = headers.indexOf("message");
  const draftCreatedIdx = headers.indexOf("draft_created");

  if (nameIdx === -1 || emailIdx === -1 || messageIdx === -1) {
    SpreadsheetApp.getUi().alert("Sheet must have columns: name, email, message");
    return;
  }

  let created = 0;

  for (const thread of unreadThreads) {
    const messages = thread.getMessages();
    const lastMessage = messages[messages.length - 1];
    const body = lastMessage.getPlainBody();

    // Extract form fields from email body
    const extracted = extractFormData(body);
    if (!extracted || !extracted.email) continue;

    const { name, email, phone, referral, message } = extracted;

    // Add to sheet
    const rowNum = sheet.getLastRow() + 1;
    const newRow = new Array(headers.length).fill("");
    newRow[nameIdx] = name;
    newRow[emailIdx] = email;
    newRow[phoneIdx] = phone || "";
    newRow[referralIdx] = referral || "";
    newRow[messageIdx] = message;
    newRow[draftCreatedIdx] = "pending";

    sheet.insertSheet().deleteSheet(); // Refresh the sheet
    sheet.getRange(rowNum, 1, 1, headers.length).setValues([newRow]);

    // Create Gmail draft
    createFollowUpDraft(name, email, message);

    // Mark as processed
    thread.markRead();
    created += 1;
  }

  Logger.log(`Processed ${created} Formspree email(s).`);
}

function extractFormData(emailBody) {
  // Formspree emails follow this pattern:
  // name: <value>
  // email: <value>
  // phone: <value>
  // referral: <value>
  // message: <value>

  const extracted = {};

  const nameMatch = emailBody.match(/name:\s*(.+?)(?=\n|$)/i);
  const emailMatch = emailBody.match(/email:\s*(.+?)(?=\n|$)/i);
  const phoneMatch = emailBody.match(/phone:\s*(.+?)(?=\n|$)/i);
  const referralMatch = emailBody.match(/referral:\s*(.+?)(?=\n|$)/i);
  const messageMatch = emailBody.match(/message:\s*(.+?)(?=\n\n|------|$)/is);

  extracted.name = nameMatch ? nameMatch[1].trim() : "";
  extracted.email = emailMatch ? emailMatch[1].trim() : "";
  extracted.phone = phoneMatch ? phoneMatch[1].trim() : "";
  extracted.referral = referralMatch ? referralMatch[1].trim() : "";
  extracted.message = messageMatch ? messageMatch[1].trim() : "";

  return extracted;
}

function createFollowUpDraft(name, email, message) {
  const subject = `Thanks for reaching out, ${name}! — let's connect`;
  const body = `Hey ${name}!\n\nThanks for reaching out to us about "${message}". We'd love to help you take the next step.\n\nWhat is the best time for us to connect via phone or Google Meet?\n\n➡️ Click here to schedule your Virtual Consultation:\nhttps://calendar.app.google/kQQdvzUcjmH3BAAz7\n\nThanks,\nClint Serafino\nHealth Navigator\nPerformance Collective`;

  GmailApp.createDraft(email, subject, body);
  Logger.log(`Created draft for ${name} (${email})`);
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Performance Collective")
    .addItem("Process Formspree emails now", "processFormspreeEmails")
    .addToUi();
}
