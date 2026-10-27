/**
 * Performance Collective — website lead capture
 *
 * Receives every website form submission (js/leads.js), logs it to the
 * "Leads" tab of this Google Sheet, emails a notification, and creates a
 * personalized Gmail follow-up draft.
 *
 * Setup: see automation/README.md. In short:
 * 1. Create a Google Sheet, open Extensions > Apps Script, paste this file.
 * 2. Run setup() once (authorize when prompted).
 * 3. Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * 4. Paste the web app URL into LEADS_ENDPOINT in js/leads.js.
 */

const NOTIFY_EMAIL = "hello@performancecollective.co";
const CREATE_FOLLOW_UP_DRAFTS = true;
const SITE_URL = "https://www.performancecollective.co";
const BOOKING_LINK = "https://calendar.app.google/kQQdvzUcjmH3BAAz7";
const GUIDE_LINK = SITE_URL + "/Doorways/peptide-guide.html?access=granted";

const LEADS_SHEET = "Leads";
const SUMMARY_SHEET = "Summary";
const HEADERS = [
  "Timestamp", "Name", "Email", "Phone", "Message", "Source", "Referral", "Tier",
  "Page", "Referrer", "UTM Source", "UTM Medium", "UTM Campaign",
  "Status", "Follow-up Draft", "Next Follow-up", "Notes",
];
const STATUSES = ["New", "Contacted", "Consult Booked", "Client", "Not a Fit"];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Honeypot: bots fill the hidden _gotcha field. Pretend success, store nothing.
  if (p._gotcha) return json_({ ok: true });
  if (!p.email) return json_({ ok: false, error: "Email is required" });

  const lead = {
    "Timestamp": new Date(),
    "Name": p.name || "",
    "Email": p.email,
    "Phone": p.phone || "",
    "Message": p.message || "",
    "Source": p.source || "Contact page",
    "Referral": p.referral || "",
    "Tier": p.tier || "",
    "Page": p.page || "",
    "Referrer": p.referrer || "",
    "UTM Source": p.utm_source || "",
    "UTM Medium": p.utm_medium || "",
    "UTM Campaign": p.utm_campaign || "",
    "Status": "New",
    "Follow-up Draft": "",
    "Next Follow-up": "",
    "Notes": "",
  };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  let rowNum;
  try {
    const sheet = getLeadsSheet_();
    sheet.appendRow(HEADERS.map((h) => safeCell_(lead[h])));
    rowNum = sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }

  try {
    sendNotification_(lead, p._subject);
  } catch (err) {
    console.error("Notification failed: " + err);
  }

  if (CREATE_FOLLOW_UP_DRAFTS) {
    try {
      createFollowUpDraft_(lead);
      setCell_(rowNum, "Follow-up Draft", "Drafted");
    } catch (err) {
      setCell_(rowNum, "Follow-up Draft", "Failed: " + err);
    }
  }

  return json_({ ok: true });
}

// Visiting the web app URL in a browser confirms the deployment is live.
function doGet() {
  return ContentService.createTextOutput("Performance Collective lead endpoint is running.");
}

/** Run once from the Apps Script editor to build the Leads and Summary tabs. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getLeadsSheet_();

  sheet.getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setFontWeight("bold")
    .setBackground("#152220")
    .setFontColor("#E8C468");
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(col_("Message"), 360);
  sheet.setColumnWidth(col_("Page"), 240);
  sheet.getRange(2, col_("Timestamp"), sheet.getMaxRows() - 1, 1).setNumberFormat("yyyy-mm-dd h:mm am/pm");
  sheet.getRange(2, col_("Next Follow-up"), sheet.getMaxRows() - 1, 1).setNumberFormat("yyyy-mm-dd");
  sheet.getRange(2, col_("Message"), sheet.getMaxRows() - 1, 1).setWrap(true);

  const statusRange = sheet.getRange(2, col_("Status"), sheet.getMaxRows() - 1, 1);
  statusRange.setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build()
  );
  const colors = { "New": "#FFF4CC", "Contacted": "#DCEBF5", "Consult Booked": "#E3D9F5", "Client": "#D6F0DD", "Not a Fit": "#EEEEEE" };
  sheet.setConditionalFormatRules(Object.keys(colors).map((s) =>
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(s).setBackground(colors[s]).setRanges([statusRange]).build()
  ));

  let summary = ss.getSheetByName(SUMMARY_SHEET) || ss.insertSheet(SUMMARY_SHEET);
  summary.clear();
  const L = LEADS_SHEET;
  const c = (h) => columnLetter_(col_(h));
  summary.getRange("A1:B1").setValues([["Leads, last 7 days", `=COUNTIF(${L}!${c("Timestamp")}:${c("Timestamp")},">="&(TODAY()-7))`]]);
  summary.getRange("A2:B2").setValues([["Leads, last 30 days", `=COUNTIF(${L}!${c("Timestamp")}:${c("Timestamp")},">="&(TODAY()-30))`]]);
  summary.getRange("A3:B3").setValues([["New (not yet contacted)", `=COUNTIF(${L}!${c("Status")}:${c("Status")},"New")`]]);
  summary.getRange("A4:B4").setValues([["Follow-ups due", `=COUNTIFS(${L}!${c("Next Follow-up")}:${c("Next Follow-up")},"<="&TODAY(),${L}!${c("Status")}:${c("Status")},"<>Client",${L}!${c("Status")}:${c("Status")},"<>Not a Fit")`]]);
  summary.getRange("A6").setValue("Leads by source");
  summary.getRange("A7").setFormula(`=QUERY(${L}!A:Q,"select ${c("Source")}, count(${c("Email")}) where ${c("Email")} is not null group by ${c("Source")} order by count(${c("Email")}) desc label ${c("Source")} 'Source', count(${c("Email")}) 'Leads'",1)`);
  summary.getRange("D6").setValue("Leads by status");
  summary.getRange("D7").setFormula(`=QUERY(${L}!A:Q,"select ${c("Status")}, count(${c("Email")}) where ${c("Email")} is not null group by ${c("Status")} label ${c("Status")} 'Status', count(${c("Email")}) 'Leads'",1)`);
  summary.getRange("A1:A6").setFontWeight("bold");
  summary.getRange("D6").setFontWeight("bold");
  summary.setColumnWidth(1, 220);

  ss.setActiveSheet(sheet);
}

function sendNotification_(lead, subject) {
  const lines = HEADERS
    .filter((h) => lead[h] && !["Status", "Follow-up Draft"].includes(h))
    .map((h) => `${h}: ${lead[h]}`);
  lines.push("", "Leads sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl());

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: lead["Email"],
    subject: subject || `New website lead: ${lead["Source"]}`,
    body: lines.join("\n"),
  });
}

function createFollowUpDraft_(lead) {
  const name = lead["Name"] || "there";
  const topic = lead["Message"] ? `"${lead["Message"]}"` : "your health goals";
  const guideLine = /metabolic collective/i.test(lead["Source"])
    ? `\n\nHere's your link to Your Guide to Peptides any time you want to come back to it:\n${GUIDE_LINK}`
    : "";

  const subject = `Thanks for reaching out, ${name} — let's connect`;
  const body = `Hey ${name}!\n\nThanks for reaching out to us about ${topic}. We'd love to help you take the next step.${guideLine}\n\nWhat is the best time for us to connect via phone or Google Meet?\n\n➡️ Click here to schedule your Virtual Consultation:\n${BOOKING_LINK}\n\nThanks,\nClint Serafino\nHealth Navigator\nPerformance Collective`;

  GmailApp.createDraft(lead["Email"], subject, body);
}

function getLeadsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(LEADS_SHEET) || ss.insertSheet(LEADS_SHEET, 0);
}

function setCell_(row, header, value) {
  getLeadsSheet_().getRange(row, col_(header)).setValue(value);
}

function col_(header) {
  return HEADERS.indexOf(header) + 1;
}

function columnLetter_(n) {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

// Keep visitor-typed text from being interpreted as a spreadsheet formula
// (also keeps "+1 555..." phone numbers as text).
function safeCell_(value) {
  if (typeof value === "string" && /^[=+\-@]/.test(value)) return "'" + value;
  return value;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Performance Collective")
    .addItem("Set up / repair lead sheet", "setup")
    .addToUi();
}
