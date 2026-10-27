// Lead capture for every form marked `data-lead-form`.
// Submissions go to the Google Apps Script web app in automation/leads-to-sheet.gs,
// which logs them to the leads Google Sheet and emails a notification.
//
// Optional form attributes:
//   data-success="page.html"  where to send the visitor after a successful submit (default: thank-you page)
//   data-unlock="key"         localStorage flag to set on success (used to unlock gated content)

// Paste the web app URL from Apps Script (Deploy > Manage deployments) here.
const LEADS_ENDPOINT = "PASTE_APPS_SCRIPT_WEB_APP_URL_HERE";

// Temporary: until LEADS_ENDPOINT is set, submissions still go to the old Formspree
// form so the live site keeps working. Delete this once the Google Sheet is live.
const FALLBACK_ENDPOINT = "https://formspree.io/f/mbdnwqea";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form[data-lead-form]").forEach((form) => {
    const status = form.querySelector("[data-lead-status], #form-status");
    const button = form.querySelector('[type="submit"]');

    const setStatus = (text) => {
      if (status) status.textContent = text;
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (form.dataset.sending) return;

      const endpoint = LEADS_ENDPOINT.startsWith("https://") ? LEADS_ENDPOINT : FALLBACK_ENDPOINT;

      const data = new URLSearchParams(new FormData(form));
      const params = new URLSearchParams(window.location.search);
      ["utm_source", "utm_medium", "utm_campaign", "tier"].forEach((key) => {
        if (params.get(key)) data.set(key, params.get(key));
      });
      data.set("page", window.location.href);
      data.set("referrer", document.referrer);

      form.dataset.sending = "true";
      if (button) button.disabled = true;
      setStatus("Sending…");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        const result = await response.json();
        if (!result.ok) throw new Error(result.error || "Submission failed");

        if (form.dataset.unlock) {
          try {
            localStorage.setItem(form.dataset.unlock, "1");
          } catch (e) {}
        }
        const success = form.dataset.success || "thank-you.html";
        window.location.href = new URL(success, window.location.href).href;
      } catch (error) {
        setStatus("Something went wrong sending your message. Please try again or email hello@performancecollective.co.");
        delete form.dataset.sending;
        if (button) button.disabled = false;
      }
    });
  });
});
