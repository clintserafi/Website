document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  if (form && status) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.textContent = "Sending...";
      status.dataset.state = "";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent = "Thanks — your message has been sent. We'll be in touch soon.";
          status.dataset.state = "success";
          form.reset();
        } else {
          status.textContent = "Something went wrong. Please try again or email us directly.";
          status.dataset.state = "error";
        }
      } catch (err) {
        status.textContent = "Something went wrong. Please try again or email us directly.";
        status.dataset.state = "error";
      }
    });
  }
});
