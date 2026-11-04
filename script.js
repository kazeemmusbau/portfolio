(() => {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");
  const navItems = [...document.querySelectorAll(".nav-link")];
  const actionLinks = [...document.querySelectorAll(".header-cta, .hero-actions a")];

  const closeMenu = () => {
    if (!toggle || !navigation) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  };

  const setActiveNavigation = (target) => {
    navItems.forEach((item) => {
      const active = item.getAttribute("href") === target;
      item.classList.toggle("is-active", active);
      if (active) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
  };

  if (toggle && navigation) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      setActiveNavigation(link.getAttribute("href"));
      closeMenu();
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

  actionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("href");
      if (target === "#projects" || target === "#contact") setActiveNavigation(target);
    });
  });
})();
