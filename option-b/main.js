// Option B: small progressive enhancements. Everything works and shows without this file.
(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Soft entrance: only hide content once we know we can reveal it again.
  if (!reduce && "IntersectionObserver" in window) {
    root.classList.add("js-motion");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });

    document.querySelectorAll("[data-reveal]").forEach(function (el, i) {
      // Stagger siblings slightly so grids ripple in rather than pop.
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(idx, 5) * 60 + "ms";
      io.observe(el);
    });
  }

  // Header gets a soft edge once the page scrolls.
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // "Get fire ants checked" links pre-tick that pest in the form.
  document.querySelectorAll(".pest-link[data-pest]").forEach(function (link) {
    link.addEventListener("click", function () {
      var box = document.querySelector('.inspect-form input[name="pest"][value="' + link.getAttribute("data-pest") + '"]');
      if (box) box.checked = true;
    });
  });

  // Preview form: never sends anything.
  var form = document.getElementById("inspect-form");
  var status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      window.setTimeout(function () { status.textContent = "Preview only. Nothing was sent."; }, 50);
    });
  }
})();

/* Header menu (<details>): close on link choice, Escape, or focus leaving it. Runs regardless of motion settings. */
(function () {
  var menu = document.querySelector('.nav-menu');
  if (!menu) return;
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) menu.open = false; });
  menu.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
  });
  menu.addEventListener('focusout', function (e) { if (!menu.contains(e.relatedTarget)) menu.open = false; });
})();
