(function () {
  "use strict";

  /* ============ header scroll state ============ */
  const header = document.getElementById("siteHeader");
  const toTopBtn = document.getElementById("toTop");
  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("is-scrolled", scrolled);
    toTopBtn.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });

  toTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ============ mobile nav ============ */
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");

  function lockBody() {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function unlockBody() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  function closeNav() {
    mobileNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    header.classList.remove("menu-open");
    unlockBody();
  }

  navToggle.addEventListener("click", function () {
    const isOpen = mobileNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    header.classList.toggle("menu-open", isOpen);
    if (isOpen) { lockBody(); } else { unlockBody(); }
  });

  mobileNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { closeNav(); });
  });

  /* Removed close-on-scroll to prevent accidental closing during lockBody */

  /* ============ reveal on scroll ============ */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ============ animated stat counters ============ */
  const statNums = document.querySelectorAll(".stat .num");
  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return; // static value like 24/7
    const decimals = parseInt(el.getAttribute("data-decimal") || "0", 10);
    const span = el.querySelector("span");
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = target * eased;
      span.textContent = decimals ? value.toFixed(decimals) : Math.round(value);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    const statIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(function (el) { statIo.observe(el); });
  }

  /* ============ gallery filter ============ */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      const filter = btn.getAttribute("data-filter");
      galleryItems.forEach(function (item) {
        const match = filter === "all" || item.getAttribute("data-category") === filter;
        item.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ============ lightbox ============ */
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  const lbCaption = document.getElementById("lbCaption");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");
  let currentIndex = 0;

  function visibleItems() {
    return Array.from(galleryItems).filter(function (item) {
      return !item.classList.contains("is-hidden");
    });
  }

  function openLightbox(index) {
    const items = visibleItems();
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const img = item.querySelector("img");
    lbImage.src = img.src;
    lbImage.alt = img.alt;
    lbCaption.textContent = img.alt;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  galleryItems.forEach(function (item, i) {
    item.addEventListener("click", function () {
      const items = visibleItems();
      const idx = items.indexOf(item);
      openLightbox(idx);
    });
  });

  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  lbPrev.addEventListener("click", function () { openLightbox(currentIndex - 1); });
  lbNext.addEventListener("click", function () { openLightbox(currentIndex + 1); });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") openLightbox(currentIndex - 1);
    if (e.key === "ArrowRight") openLightbox(currentIndex + 1);
  });

  /* ============ testimonials slider ============ */
  const tTrack = document.getElementById("tTrack");
  const tPrev = document.getElementById("tPrev");
  const tNext = document.getElementById("tNext");
  function scrollTestimonials(dir) {
    const card = tTrack.querySelector(".t-card");
    if (!card) return;
    const gap = 22;
    const amount = card.offsetWidth + gap;
    tTrack.scrollBy({ left: dir * amount, behavior: "smooth" });
  }
  tPrev.addEventListener("click", function () { scrollTestimonials(-1); });
  tNext.addEventListener("click", function () { scrollTestimonials(1); });

  /* ============ FAQ accordion ============ */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".faq-a").style.maxHeight = null;
        }
      });
      item.classList.toggle("is-open", !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : null;
    });
  });

  /* ============ WhatsApp teaser bubble (session-only, no persistence) ============ */
  const waBubble = document.getElementById("waBubble");
  const waBubbleClose = document.getElementById("waBubbleClose");
  let waDismissed = false;

  setTimeout(function () {
    if (!waDismissed) waBubble.classList.add("is-visible");
  }, 4000);

  waBubbleClose.addEventListener("click", function (e) {
    e.preventDefault();
    waDismissed = true;
    waBubble.classList.remove("is-visible");
  });



  /* ============ footer year ============ */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
