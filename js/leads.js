// Lead capture for every form marked `data-lead-form`.
// Submissions go to the Google Apps Script web app in automation/leads-to-sheet.gs,
// which logs them to the leads Google Sheet and emails a notification.
//
// Optional form attributes:
//   data-success="page.html"  where to send the visitor after a successful submit (default: thank-you page)
//   data-unlock="key"         localStorage flag to set on success (used to unlock gated content)

// Paste the web app URL from Apps Script (Deploy > Manage deployments) here.
const LEADS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyqPlt_t8RmqxJ7eLw1KkAq9EmaRsKEyB5aHJ-UiPfHhnLGQqlAdATiaw8WqlXvz9jl/exec";

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
        const response = await fetch(LEADS_ENDPOINT, { method: "POST", body: data });
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
