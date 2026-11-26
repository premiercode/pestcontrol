/* Option C, "Field guide": quiet ink-in reveals and the preview-only form. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal: content is visible by default; only hide it once we know we can show it again.
  if (!reduce && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(".reveal, .rule-draw");
    root.classList.add("motion");

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });

    // Show everything before printing.
    window.addEventListener("beforeprint", function () {
      targets.forEach(function (el) { el.classList.add("is-in"); });
    });
  }

  // Preview form: never sends anything.
  var form = document.querySelector(".inspection-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (status) {
        status.textContent = "";
        window.setTimeout(function () { status.textContent = "Preview only. Nothing was sent."; }, 30);
      }
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
