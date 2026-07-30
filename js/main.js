document.addEventListener("DOMContentLoaded", () => {
  const doorwayTitles = {
    "amputee-performance-pathway": "Amputee Performance Pathway",
    "chronic-pain-care-coordination": "Chronic Pain Care Coordination",
    "competitive-athlete-performance-system": "Competitive Athlete Performance System",
    "perimenopause-performance-guide": "Perimenopause Performance Guide",
    "postpartum-recovery-guide": "Postpartum Recovery Guide",
    "the-health-guide-over-40": "The Health Guide Over 40",
    "the-backroads-guide": "The Backroads Guide",
    "metabolic-medications": "Metabolic Medications",
  };

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    const tier = params.get("tier");

    if (ref) {
      const label = doorwayTitles[ref] || ref;
      const tierSuffix = tier ? ` — Tier ${tier}` : "";

      const sourceField = document.getElementById("source-field");
      const subjectField = document.getElementById("subject-field");
      const referralSelect = document.getElementById("referral");
      const banner = document.getElementById("doorway-banner");

      if (sourceField) sourceField.value = `${label}${tierSuffix}`;
      if (subjectField) subjectField.value = `New inquiry: ${label}${tierSuffix}`;
      if (referralSelect) referralSelect.value = "doorway";
      if (banner) {
        banner.textContent = `You're inquiring about the ${label}${tierSuffix}. Tell us a bit more below and we'll follow up within one business day.`;
        banner.style.display = "block";
      }
    }
  }

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
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
