/* Yuvanesh Sharma S — Portfolio interactions */
document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the copyright year.
  document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Mobile navigation.
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  // Dark/light theme, saved for the next visit.
  const themeButtons = document.querySelectorAll(".theme-toggle");
  const themeStorageKey = "yuvaneshPortfolioTheme";

  const applyTheme = (theme) => {
    const light = theme === "light";
    document.body.classList.toggle("light-theme", light);

    themeButtons.forEach((button) => {
      button.textContent = light ? "☾" : "☼";
      button.setAttribute(
        "aria-label",
        light ? "Switch to dark theme" : "Switch to light theme"
      );
      button.setAttribute("aria-pressed", String(light));
      button.title = light ? "Switch to dark theme" : "Switch to light theme";
    });
  };

  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem(themeStorageKey) || "dark";
  } catch (error) {
    // The theme still works if browser storage is unavailable.
  }
  applyTheme(savedTheme);

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("light-theme")
        ? "dark"
        : "light";
      applyTheme(nextTheme);
      try {
        localStorage.setItem(themeStorageKey, nextTheme);
      } catch (error) {
        // Ignore storage restrictions; the current page theme has changed.
      }
    });
  });

  // Project category filters (used on projects.html).
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter || "all";

        filterButtons.forEach((item) => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });

        projectCards.forEach((card) => {
          const category = card.dataset.category || "";
          card.hidden = filter !== "all" && category !== filter;
        });
      });
    });
  }

  // Front-end-only contact form validation. This does not send messages.
  const contactForm = document.querySelector("#contactForm");
  const feedback = document.querySelector("#formFeedback");

  if (contactForm && feedback) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.querySelector("#contactName")?.value.trim() || "";
      const email = document.querySelector("#contactEmail")?.value.trim() || "";
      const message =
        document.querySelector("#contactMessage")?.value.trim() || "";

      feedback.className = "form-feedback";

      if (!name || !email || !message) {
        feedback.textContent = "Please complete all fields before continuing.";
        feedback.classList.add("error");
        return;
      }

      const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailLooksValid) {
        feedback.textContent = "Please enter a valid email address.";
        feedback.classList.add("error");
        return;
      }

      feedback.textContent =
        "Your entries look good, but this demo form does not send messages yet.";
      feedback.classList.add("success");
    });
  }
});
