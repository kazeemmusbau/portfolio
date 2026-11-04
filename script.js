(() => {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");
  const links = [...document.querySelectorAll(".nav-link, .header-cta, .hero-actions a")];

  const closeMenu = () => {
    if (!toggle || !navigation) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  };

  if (toggle && navigation) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  // The destination IDs are intentionally lightweight anchors until their
  // respective sections are added in later implementation stages.
  links.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("href");
      if (target === "#home") {
        document.querySelectorAll(".nav-link").forEach((item) => {
          item.classList.toggle("is-active", item.getAttribute("href") === "#home");
          if (item.getAttribute("href") === "#home") item.setAttribute("aria-current", "page");
          else item.removeAttribute("aria-current");
        });
      }
    });
  });
})();
