/* ============================================================
   Log• Design System — Shared Scripts
   ============================================================ */

(function () {
  'use strict';

  // ---- Theme Toggle ----
  function initTheme() {
    var saved = localStorage.getItem('log-theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
    }
    updateThemeIcon();
  }

  function toggleTheme() {
    var isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('log-theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  }

  function updateThemeIcon() {
    var icon = document.getElementById('themeIcon');
    if (!icon) return;
    icon.textContent = document.body.classList.contains('dark-mode') ? '\u25D0' : '\u2600';
  }

  // ---- Collapsible Sections ----
  function initCollapsibles() {
    document.querySelectorAll('[data-collapsible]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var target = document.getElementById(trigger.getAttribute('data-collapsible'));
        if (!target) return;
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        target.hidden = expanded;
      });
    });
  }

  // ---- Smooth Scroll ----
  function initSmoothScroll() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var behavior = prefersReduced ? 'auto' : 'smooth';

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: behavior, block: 'start' });
    });
  }

  // ---- Copy to Clipboard ----
  function initCopyButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.copy-btn');
      if (!btn) return;
      var block = btn.closest('.code-block');
      if (!block) return;
      var pre = block.querySelector('pre');
      if (!pre) return;
      navigator.clipboard.writeText(pre.textContent).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = original; }, 1500);
      });
    });
  }

  // ---- Back to Top ----
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  // ---- Init ----
  function init() {
    initTheme();
    initCollapsibles();
    initSmoothScroll();
    initCopyButtons();
    initBackToTop();
  }

  // Expose toggle for inline onclick
  window.toggleTheme = toggleTheme;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
