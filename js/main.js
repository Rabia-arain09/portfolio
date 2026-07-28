/* =========================================================
   RABIA ARAIN — PORTFOLIO SCRIPTS
   Each feature lives in its own small function so you can
   remove or extend any single piece without touching the rest.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initStickyNavbar();
  initMobileMenu();
  initScrollProgress();
  initBackToTop();
  initScrollReveal();
  initTypingAnimation();
  initNetworkBackground();
  initContactForm();
  initFooterYear();
});

/* ---------------------------------------------------------
   1. THEME TOGGLE (dark / light)
   Toggles a data-theme attribute on <html>. Defaults to dark
   for this session; no data is persisted between visits.
--------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  const root = document.documentElement;

  toggleBtn.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    root.setAttribute("data-theme", isLight ? "dark" : "light");
  });
}

/* ---------------------------------------------------------
   2. STICKY NAVBAR
   Adds a "scrolled" state (glass background + shrink) once
   the user moves past the top of the hero.
--------------------------------------------------------- */
function initStickyNavbar() {
  const navbar = document.getElementById("navbar");

  const updateNavbar = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();
}

/* ---------------------------------------------------------
   3. MOBILE MENU
   Simple show/hide toggle for the nav links on small screens.
--------------------------------------------------------- */
function initMobileMenu() {
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");

  burger.addEventListener("click", () => {
    links.classList.toggle("is-open");
  });

  // Close the menu whenever a link is tapped
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("is-open"));
  });
}

/* ---------------------------------------------------------
   4. SCROLL PROGRESS BAR
   Fills a thin bar at the top of the page based on how far
   the user has scrolled through the document.
--------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
}

/* ---------------------------------------------------------
   5. BACK TO TOP BUTTON
   Appears after the user scrolls past the hero and smoothly
   returns them to the top of the page when clicked.
--------------------------------------------------------- */
function initBackToTop() {
  const button = document.getElementById("backToTop");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 500) {
        button.classList.add("is-visible");
      } else {
        button.classList.remove("is-visible");
      }
    },
    { passive: true }
  );

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   6. SCROLL REVEAL ANIMATIONS
   Fades + slides elements with the `.reveal` class into view
   the first time they enter the viewport, using IntersectionObserver
   for good performance (no scroll-based recalculation).
--------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Small stagger so grouped elements don't all pop at once
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   7. TYPING ANIMATION
   Cycles through a list of roles in the hero subtitle.
   Edit the `roles` array to change what's displayed.
--------------------------------------------------------- */
function initTypingAnimation() {
  const el = document.getElementById("typingText");
  if (!el) return;

  const roles = [
    "Computer Science Student",
    "Aspiring Cybersecurity Professional",
    "Learning Laravel & PHP",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 30;
  const PAUSE_AFTER_TYPE = 1600;
  const PAUSE_AFTER_DELETE = 400;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = currentRole.slice(0, charIndex);

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = currentRole.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

/* ---------------------------------------------------------
   8. NETWORK BACKGROUND (hero signature element)
   A quiet, drifting node-and-line network rendered on canvas.
   Nods to the "networks / systems" side of CS and security
   without leaning on cliché matrix-style effects.
--------------------------------------------------------- */
function initNetworkBackground() {
  const canvas = document.getElementById("networkCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height, nodes;

  const NODE_COUNT = 46;
  const LINK_DISTANCE = 150;
  const MOUSE_RADIUS = 160;

  const mouse = { x: -9999, y: -9999 };

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 1,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    // Move nodes and gently steer them away from the cursor
    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      const dx = node.x - mouse.x;
      const dy = node.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        node.x += (dx / dist) * force * 1.2;
        node.y += (dy / dist) * force * 1.2;
      }
    });

    // Draw links between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < LINK_DISTANCE) {
          const opacity = (1 - dist / LINK_DISTANCE) * 0.35;
          ctx.strokeStyle = `rgba(124, 111, 240, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes on top of the links
    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(167, 139, 250, 0.8)";
      ctx.fill();
    });

    requestAnimationFrame(step);
  }

  window.addEventListener("resize", () => {
    resize();
    createNodes();
  });

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  resize();
  createNodes();
  step();
}

/* ---------------------------------------------------------
   9. CONTACT FORM VALIDATION
   Front-end only validation + a simulated submit. Replace the
   `submitForm` function's contents with a real fetch() call to
   your backend or form service (e.g. Formspree) when ready.
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    let isValid = true;
    isValid = validateField(name, "nameError", (v) => v.trim().length >= 2, "Please enter your name.") && isValid;
    isValid = validateField(email, "emailError", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Please enter a valid email address.") && isValid;
    isValid = validateField(message, "messageError", (v) => v.trim().length >= 10, "Message should be at least 10 characters.") && isValid;

    if (!isValid) {
      status.textContent = "";
      return;
    }

    submitForm(form, status);
  });
}

function validateField(field, errorId, testFn, errorMessage) {
  const errorEl = document.getElementById(errorId);
  const value = field.value;

  if (!testFn(value)) {
    field.classList.add("is-invalid");
    errorEl.textContent = errorMessage;
    return false;
  }

  field.classList.remove("is-invalid");
  errorEl.textContent = "";
  return true;
}

function submitForm(form, status) {
  // Placeholder "submit": swap this block for a real request, e.g.
  //
  // fetch("https://formspree.io/f/your-id", {
  //   method: "POST",
  //   headers: { "Accept": "application/json" },
  //   body: new FormData(form),
  // }).then(...)

  status.textContent = "Sending...";

  setTimeout(() => {
    status.textContent = "Thanks! Your message has been noted — I'll get back to you soon.";
    form.reset();
  }, 700);
}

/* ---------------------------------------------------------
   10. FOOTER YEAR
   Keeps the copyright year current without manual edits.
--------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
