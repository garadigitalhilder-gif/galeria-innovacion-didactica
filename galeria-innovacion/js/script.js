document.addEventListener("DOMContentLoaded", () => {
  // 1. Hide Loader and trigger entrance animations
  setupPageLoader();

  // 2. Sticky Header and Scroll Top Button
  setupScrollEvents();

  // 3. Mobile Menu Toggle
  setupMobileMenu();

  // 4. ScrollSpy (Active Nav Highlighting)
  setupScrollSpy();

  // 5. Marco Teórico Tab System
  setupTabs();

  // 6. Experience Detail Drawers
  setupDrawers();

  // 7. Comparative Table Highlighting
  setupTableHighlights();

  // 8. Scroll Reveal (Intersection Observer)
  setupScrollReveal();

  // 9. Interactive SVG Diagrams
  setupInteractiveDiagrams();
});

/**
 * 1. Page Loader Handler & Hero Entrance Trigger
 */
function setupPageLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const fadeOut = () => {
    loader.classList.add("is-hidden");
    
    // Trigger staggered entrance animations for the Hero elements
    document.querySelectorAll("[data-hero-animate]").forEach(el => {
      const animClass = el.getAttribute("data-hero-animate");
      el.classList.add(animClass);
    });

    setTimeout(() => loader.remove(), 500);
  };

  if (document.readyState === "complete") {
    fadeOut();
  } else {
    window.addEventListener("load", fadeOut);
    // Fallback: hide anyway after 1.5 seconds
    setTimeout(fadeOut, 1500);
  }
}

/**
 * 2. Sticky Header & Scroll Top Button scroll behaviors
 */
function setupScrollEvents() {
  const header = document.getElementById("site-header");
  const scrollTopBtn = document.getElementById("scroll-top-btn");

  const checkScroll = () => {
    const scrollY = window.scrollY;

    // Header shrink
    if (header) {
      if (scrollY > 50) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    // Scroll to top button visibility
    if (scrollTopBtn) {
      if (scrollY > 300) {
        scrollTopBtn.classList.add("is-visible");
      } else {
        scrollTopBtn.classList.remove("is-visible");
      }
    }
  };

  // Bind scroll with passive listener for performance
  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();

  // Bind Scroll to Top Click
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

/**
 * 3. Mobile Hamburger Menu Toggle
 */
function setupMobileMenu() {
  const toggleBtn = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = navMenu ? navMenu.querySelector(".nav-links") : null;

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", (e) => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !expanded);
    navLinks.classList.toggle("is-active");
    e.stopPropagation();
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("is-active") && !navMenu.contains(e.target)) {
      toggleBtn.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-active");
    }
  });

  // Close menu when clicking on nav link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      toggleBtn.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-active");
    });
  });
}

/**
 * 4. ScrollSpy: Highlight active section in the header
 */
function setupScrollSpy() {
  const navLinks = document.querySelectorAll(".nav-menu .nav-item a");
  const sections = Array.from(navLinks)
    .map(link => {
      const hash = link.getAttribute("href");
      if (hash.startsWith("#")) {
        return document.querySelector(hash);
      }
      return null;
    })
    .filter(section => section !== null);

  const spy = () => {
    let currentActive = navLinks[0];
    const scrollPosition = window.scrollY + 120; // offset for fixed header

    sections.forEach((section, index) => {
      if (section.offsetTop <= scrollPosition) {
        const hash = `#${section.id}`;
        const match = Array.from(navLinks).find(link => link.getAttribute("href") === hash);
        if (match) {
          currentActive = match;
        }
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });

    currentActive.classList.add("active");
    currentActive.setAttribute("aria-current", "page");
  };

  window.addEventListener("scroll", spy, { passive: true });
  spy();
}

/**
 * 5. Tab System for Theoretical Framework
 */
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("aria-controls");

      // Deactivate all
      tabButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });

      tabPanes.forEach(pane => {
        pane.classList.remove("active");
      });

      // Activate selected
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}

/**
 * 6. Experience Drawers Handler
 */
function setupDrawers() {
  const triggerButtons = document.querySelectorAll("[data-drawer-trigger]");
  const drawers = document.querySelectorAll(".experience-drawer");

  triggerButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const experienceKey = btn.getAttribute("data-drawer-trigger");
      const drawer = document.getElementById(`drawer-${experienceKey}`);
      if (drawer) {
        openDrawer(drawer);
      }
    });
  });

  // Setup close events
  drawers.forEach(drawer => {
    const closeElements = drawer.querySelectorAll("[data-drawer-close]");
    closeElements.forEach(elem => {
      elem.addEventListener("click", () => closeDrawer(drawer));
    });
  });

  // ESC key listener to close active drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeDrawer = document.querySelector(".experience-drawer.is-active");
      if (activeDrawer) {
        closeDrawer(activeDrawer);
      }
    }
  });
}

function openDrawer(drawer) {
  drawer.classList.add("is-active");
  document.body.classList.add("modal-open");
  
  // Set focus on close button for accessibility
  const closeBtn = drawer.querySelector(".close-drawer");
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 100);
  }
}

function closeDrawer(drawer) {
  drawer.classList.remove("is-active");
  document.body.classList.remove("modal-open");
}

/**
 * 7. Comparative Table Column Highlighting
 */
function setupTableHighlights() {
  const filterButtons = document.querySelectorAll(".table-filter-btn");
  const table = document.getElementById("comparison-table");

  if (!table) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetCol = btn.getAttribute("data-highlight");

      // Toggle active filter button
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Remove current highlights
      table.querySelectorAll("td, th").forEach(cell => {
        cell.classList.remove("highlight-col");
      });

      // Highlight selected column
      if (targetCol !== "all") {
        table.querySelectorAll(`[data-col="${targetCol}"]`).forEach(cell => {
          cell.classList.add("highlight-col");
        });
      }
    });
  });
}

/**
 * 8. Scroll Reveal using IntersectionObserver
 */
function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observerOptions = {
    root: null, // relative to viewport
    rootMargin: "0px 0px -50px 0px", // triggers slightly before entering the screen
    threshold: 0.08 // triggers when 8% visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // trigger animation once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 9. Setup Interactive SVG Diagrams logic
 */
function setupInteractiveDiagrams() {
  const containers = document.querySelectorAll(".interactive-svg-container");

  containers.forEach(container => {
    const nodes = container.querySelectorAll(".svg-node");
    const descBox = container.querySelector(".svg-interactive-descriptor");
    if (!descBox) return;

    const defaultText = descBox.textContent;

    nodes.forEach(node => {
      // Mouse Enter / Hover node
      node.addEventListener("mouseenter", () => {
        const desc = node.getAttribute("data-desc");
        if (desc) {
          descBox.style.opacity = "0.4";
          descBox.style.transform = "translateY(2px)";
          
          setTimeout(() => {
            descBox.textContent = desc;
            descBox.style.opacity = "1";
            descBox.style.transform = "translateY(0)";
          }, 100);

          // Focus style states
          nodes.forEach(n => n.classList.remove("active"));
          node.classList.add("active");
        }
      });
    });

    // Reset when cursor leaves the SVG container fully
    container.addEventListener("mouseleave", () => {
      nodes.forEach(n => n.classList.remove("active"));
      descBox.style.opacity = "0.4";
      descBox.style.transform = "translateY(2px)";
      
      setTimeout(() => {
        descBox.textContent = defaultText;
        descBox.style.opacity = "1";
        descBox.style.transform = "translateY(0)";
      }, 100);
    });
  });
}
