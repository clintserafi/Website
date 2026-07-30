// Single source of truth for the GA4 Measurement ID.
// Get yours at analytics.google.com -> Admin -> Data Streams -> your web stream.
// Swap the placeholder below with the real ID (format: G-XXXXXXXXXX) to start tracking.
window.GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

(function () {
  var id = window.GA_MEASUREMENT_ID;
  if (!id || id.indexOf("XXXXXXXXXX") !== -1) return;

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id);
})();
