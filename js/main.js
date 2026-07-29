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

  document.querySelectorAll(".team-bio").forEach((bio) => {
    bio.addEventListener("click", () => {
      bio.classList.toggle("is-open");
    });

    bio.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        bio.classList.toggle("is-open");
      }
    });
  });

  const carousel = document.querySelector(".carousel");
  if (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const prevButton = carousel.querySelector(".carousel-button--prev");
    const nextButton = carousel.querySelector(".carousel-button--next");
    const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
    let currentIndex = 0;
    let autoPlayTimer = null;

    const updateCarousel = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      const offset = currentIndex * -100;
      track.style.transform = `translateX(${offset}%)`;
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === currentIndex);
      });
    };

    const startAutoPlay = () => {
      autoPlayTimer = window.setInterval(() => updateCarousel(currentIndex + 1), 5000);
    };

    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        window.clearInterval(autoPlayTimer);
      }
    };

    prevButton?.addEventListener("click", () => {
      updateCarousel(currentIndex - 1);
      stopAutoPlay();
      startAutoPlay();
    });

    nextButton?.addEventListener("click", () => {
      updateCarousel(currentIndex + 1);
      stopAutoPlay();
      startAutoPlay();
    });

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => {
        updateCarousel(dotIndex);
        stopAutoPlay();
        startAutoPlay();
      });
    });

    updateCarousel(0);
    startAutoPlay();
  }
});
