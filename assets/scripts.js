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

  // ---- Navigation Injection (Issue 2) ----
  // Single authoritative nav structure injected into all pages.
  // Detects prototype pages (inside /prototypes/) and adjusts relative paths.
  function initNav() {
    var header = document.querySelector('.site-header') || document.querySelector('.proto-header');
    if (!header) return;

    // Normalize proto-header to site-header class for consistent styling
    if (header.classList.contains('proto-header')) {
      header.classList.remove('proto-header');
      header.classList.add('site-header');
    }

    var isPrototype = window.location.pathname.indexOf('/prototypes/') !== -1 ||
                      window.location.pathname.indexOf('/prototypes\\') !== -1;
    var prefix = isPrototype ? '../' : '';

    // Authoritative nav items
    var navItems = [
      { href: 'index.html', label: 'Home' },
      { href: 'brand-system.html', label: 'Brand' },
      { href: 'component-state-matrix.html', label: 'Components' },
      { href: 'motion-system.html', label: 'Motion' },
      { href: 'layout-system.html', label: 'Layout' },
      { href: 'engineer-quick-start.html', label: 'Quick Start' }
    ];

    // Build mark
    var markLink = header.querySelector('.mark');
    if (markLink) {
      markLink.setAttribute('href', prefix + 'index.html');
    }

    // Find or create controls container
    var controls = header.querySelector('.site-header-controls');
    if (!controls) {
      controls = document.createElement('div');
      controls.className = 'site-header-controls';

      // Move existing theme toggle into controls if present
      var existingToggle = header.querySelector('.theme-toggle');
      var existingNav = header.querySelector('.site-nav');

      // Clear header children except mark
      while (header.children.length > 1) {
        header.removeChild(header.lastChild);
      }

      // Build hamburger button
      var toggleBtn = document.createElement('button');
      toggleBtn.className = 'nav-toggle';
      toggleBtn.setAttribute('aria-label', 'Toggle navigation');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '<span class="nav-toggle-icon"></span>';
      controls.appendChild(toggleBtn);

      // Theme toggle
      if (existingToggle) {
        controls.appendChild(existingToggle);
      }

      header.appendChild(controls);

      // Build nav
      var nav = document.createElement('nav');
      nav.className = 'site-nav';
      nav.setAttribute('aria-label', 'Main navigation');

      navItems.forEach(function (item) {
        var a = document.createElement('a');
        a.href = prefix + item.href;
        a.textContent = item.label;
        nav.appendChild(a);
      });

      header.appendChild(nav);
    }
  }

  // ---- Active Page Detection (Issue 3) ----
  function initActiveNav() {
    var path = window.location.pathname;
    var filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // Also handle file:// protocol where path might end with the filename directly
    if (filename === '' || filename === '/') {
      filename = 'index.html';
    }

    var navLinks = document.querySelectorAll('.site-nav a');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      var linkFile = href.substring(href.lastIndexOf('/') + 1);
      if (linkFile === filename) {
        link.classList.add('active');
      }
    });
  }

  // ---- Hamburger Toggle (Issue 1) ----
  function initHamburger() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.nav-toggle');
      if (!btn) return;
      var nav = btn.closest('.site-header').querySelector('.site-nav');
      if (!nav) return;
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked (mobile)
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-nav a')) return;
      var nav = e.target.closest('.site-nav');
      var btn = document.querySelector('.nav-toggle');
      if (nav && btn && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
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
    initNav();
    initActiveNav();
    initHamburger();
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
