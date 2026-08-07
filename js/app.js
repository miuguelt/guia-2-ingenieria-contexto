/**
 * app.js
 * -------
 * Comportamientos generales de la guía: navegación suave, tema, aparición
 * progresiva de contenidos y pequeñas utilidades de interfaz.
 *
 * El simulador pedagógico vive en simulator.js para separar la UI general de
 * la lógica de construcción y validación de strings BDD.
 */

(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector("#scroll-progress-bar");
  const themeToggle = document.querySelector("#theme-toggle");
  const mobileMenuToggle = document.querySelector("#mobile-menu-toggle");
  const mainNav = document.querySelector("#main-nav");
  const yearLabel = document.querySelector("#footer-year");

  /**
   * Lee el tema guardado sin romper la página si el navegador bloquea
   * localStorage (por ejemplo, en una pestaña privada muy restrictiva).
   */
  function getSavedTheme() {
    try {
      return localStorage.getItem("adso-guide-theme");
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("adso-guide-theme", theme);
    } catch (error) {
      // La preferencia visual sigue funcionando aunque no se pueda guardar.
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const nextLabel = theme === "light" ? "Activar modo oscuro" : "Activar modo claro";
    themeToggle?.setAttribute("aria-label", nextLabel);
    themeToggle?.setAttribute("title", nextLabel);
  }

  // El modo oscuro es el valor por defecto del producto.
  applyTheme(getSavedTheme() === "light" ? "light" : "dark");

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });

  /** Mantiene la navegación móvil controlable por teclado y por toque. */
  function setMobileMenu(isOpen) {
    mainNav?.classList.toggle("is-open", isOpen);
    mobileMenuToggle?.setAttribute("aria-expanded", String(isOpen));
    mobileMenuToggle?.setAttribute("aria-label", isOpen ? "Cerrar navegación" : "Abrir navegación");
  }

  mobileMenuToggle?.addEventListener("click", () => {
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    setMobileMenu(!isOpen);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileMenu(false);
  });

  document.addEventListener("click", (event) => {
    if (!mainNav?.classList.contains("is-open")) return;
    if (mainNav.contains(event.target) || mobileMenuToggle?.contains(event.target)) return;
    setMobileMenu(false);
  });

  /**
   * Convierte los enlaces internos en navegación suave. La acción funciona
   * también con teclado porque los elementos siguen siendo enlaces reales.
   */
  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = targetId ? document.querySelector(targetId) : null;

      if (!target) return;

      event.preventDefault();
      setMobileMenu(false);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", targetId);
    });
  });

  function updateScrollChrome() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", updateScrollChrome, { passive: true });
  window.addEventListener("resize", updateScrollChrome);
  updateScrollChrome();

  /**
   * Activa la navegación contextual y las animaciones de entrada cuando cada
   * sección se aproxima al viewport.
   */
  const sectionLinks = [...document.querySelectorAll(".main-nav a[data-scroll]")];
  const trackedSections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isActive);
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-25% 0px -60%", threshold: 0 });

    trackedSections.forEach((section) => sectionObserver.observe(section));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  }

  if (yearLabel) yearLabel.textContent = new Date().getFullYear();

  /**
   * Copia el texto de una salida de la guía y da feedback en el mismo botón.
   */
  document.querySelectorAll(".copy-button[data-copy-target]").forEach((copyButton) => {
    copyButton.addEventListener("click", async () => {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      const text = target?.textContent?.trim();
      if (!text || text.includes("[rol]")) return;

      try {
        await navigator.clipboard.writeText(text);
        const previousText = copyButton.textContent;
        copyButton.textContent = "Copiado ✓";
        window.setTimeout(() => { copyButton.textContent = previousText; }, 1600);
      } catch (error) {
        copyButton.textContent = "Selecciona el texto";
        window.setTimeout(() => { copyButton.textContent = "Copiar"; }, 1600);
      }
    });
  });

  // El simulador emite este evento cuando el reto final se aprueba.
  document.addEventListener("guide:completed", () => {
    const labStatus = document.querySelector("#lab-status-text");
    if (labStatus) labStatus.textContent = "Especificación clara · 100%";
  });
})();
