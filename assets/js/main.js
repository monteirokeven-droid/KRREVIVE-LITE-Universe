/**
 * assets/js/main.js
 * Lightweight site JS: mobile menu toggle, active nav links,
 * download tracking (localStorage), simple notifications.
 */

(function () {
  'use strict';

  /* ---- Utilities ---- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---- Active link highlight ---- */
  function highlightActiveLink() {
    const links = $$('nav a');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === path || (href === 'index.html' && path === '')) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  /* ---- Simple notification (non-blocking) ---- */
  function notify(message, timeout = 4200) {
    const containerId = '__kr_notify_container';
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'fixed';
      container.style.right = '18px';
      container.style.top = '80px';
      container.style.zIndex = 9999;
      document.body.appendChild(container);
    }
    const el = document.createElement('div');
    el.textContent = message;
    el.style.background = 'rgba(0,0,0,0.6)';
    el.style.color = '#e6fbff';
    el.style.padding = '10px 14px';
    el.style.borderRadius = '8px';
    el.style.marginTop = '8px';
    el.style.boxShadow = '0 8px 30px rgba(0,217,255,0.06)';
    el.style.fontWeight = '700';
    container.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 300ms';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 320);
    }, timeout);
  }

  /* ---- Download counter (localStorage) ---- */
  const DOWNLOAD_KEY = 'krrevive_download_count';
  function incrementDownloadCounter() {
    try {
      const current = parseInt(localStorage.getItem(DOWNLOAD_KEY) || '0', 10);
      localStorage.setItem(DOWNLOAD_KEY, (current + 1).toString());
      notify('Download started — thank you for trying KRREVIVEÉLITE!');
    } catch (e) {
      // localStorage may be blocked — ignore
    }
  }

  function getDownloadCount() {
    try {
      return parseInt(localStorage.getItem(DOWNLOAD_KEY) || '0', 10);
    } catch (e) {
      return 0;
    }
  }

  /* ---- Wire up download link(s) ---- */
  function wireDownloadLinks() {
    const links = $$('a[download]');
    links.forEach(a => {
      a.addEventListener('click', () => {
        incrementDownloadCounter();
      });
    });
  }

  /* ---- Accessibility: focus outlines for keyboard users ---- */
  function enableFocusOutlineOnKeyboard() {
    function handleFirstTab(e) {
      if (e.key === 'Tab') {
        document.documentElement.classList.add('show-focus-outline');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);
  }

  /* ---- Init ---- */
  function init() {
    highlightActiveLink();
    wireDownloadLinks();
    enableFocusOutlineOnKeyboard();

    // small friendly message when site loads
    setTimeout(() => {
      const count = getDownloadCount();
      if (count > 0) notify(`You have downloaded the game ${count} time(s) on this device.`);
    }, 800);
  }

  /* DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
