// Helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Year
const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");

if (nav && toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  // Close nav when clicking a link (mobile)
  $$("a", nav).forEach(a => {
    a.addEventListener("click", () => {
      nav.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// FAQ accordion
const faqRoot = document.querySelector("[data-faq]");
if (faqRoot) {
  const questions = $$(".faq-q", faqRoot);

  questions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      // close all
      questions.forEach(q => q.setAttribute("aria-expanded", "false"));
      $$(".faq-a", faqRoot).forEach(a => (a.hidden = true));

      // open current if it was closed
      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        const answer = btn.nextElementSibling;
        if (answer) answer.hidden = false;
      }
    });
  });
}

// Forms (demo validation only; no backend)
function wireForm(formSelector, statusSelector) {
  const form = document.querySelector(formSelector);
  if (!form) return;

  const status = form.querySelector(statusSelector);
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !phone || !message) {
      if (status) status.textContent = "Please fill out name, phone, and message.";
      return;
    }

    if (status) {
      status.textContent = "Thanks! Your request is ready to send. (Demo template — connect a form backend when publishing.)";
    }
    form.reset();
  });
}

wireForm("[data-mini-form]", "[data-form-status]");
wireForm("[data-contact-form]", "[data-contact-status]");
