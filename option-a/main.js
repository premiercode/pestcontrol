/* Option A, "The shield": progressive enhancement only. Everything is visible without this file. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nativeScrollTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()');

  /* ---- Preview form: never sends anything ---- */
  var form = document.getElementById('inspect-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';
      // Small delay so screen readers announce the change even on repeat clicks.
      window.setTimeout(function () {
        status.textContent = 'Preview only. Nothing was sent.';
      }, 60);
    });
  }

  if (reduceMotion) return;

  /* ---- Reveal on scroll (content is only hidden once this runs) ---- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    root.classList.add('reveal-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var siblings = Array.prototype.indexOf.call(el.parentNode.children, el);
          el.style.transitionDelay = Math.min(siblings, 6) * 70 + 'ms';
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Fallback for browsers without CSS scroll-driven animations ---- */
  if (nativeScrollTimeline) return;

  var hero = document.getElementById('shield');
  var steps = document.getElementById('steps');
  var loops = document.querySelectorAll('.loop-box, .area-map');
  var ticking = false;

  function clamp01(n) { return Math.max(0, Math.min(1, n)); }

  // Progress of an element through the viewport, between two fractions of viewport height.
  function viewProgress(el, startFrac, endFrac) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight;
    var start = vh * startFrac;   // element top at this y = 0
    var end = vh * endFrac;       // element top at this y = 1
    return clamp01((start - r.top) / (start - end));
  }

  function update() {
    ticking = false;
    var vh = window.innerHeight;
    if (hero) {
      var wide = window.innerWidth >= 960;
      var a = wide ? 0 : vh * 0.1, z = wide ? vh * 0.42 : vh * 0.9;
      hero.style.setProperty('--draw', clamp01((window.scrollY - a) / (z - a)).toFixed(4));
    }
    if (steps) steps.style.setProperty('--steps', viewProgress(steps, 0.9, 0.35).toFixed(4));
    loops.forEach(function (el) { el.style.setProperty('--loop', viewProgress(el, 0.95, 0.3).toFixed(4)); });
  }

  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
