(function () {
  'use strict';

  const groups = {
    inicio: [
      document.getElementById('inicio'),
      document.getElementById('sobre-mi'),
      document.getElementById('proyectos'),
      document.getElementById('nota')
    ],
    'modulo-1': [document.getElementById('modulo-1')],
    'modulo-2': [document.getElementById('modulo-2')],
    'modulo-3': [document.getElementById('modulo-3')],
    'modulo-4': [document.getElementById('modulo-4')],
    autoevaluacion: [
      document.getElementById('autoevaluacion'),
      document.getElementById('evidencias'),
      document.getElementById('contacto')
    ],
    fuentes: [document.getElementById('fuentes')]
  };

  const hashToTab = {
    '#inicio': 'inicio',
    '#modulo-1': 'modulo-1',
    '#modulo-2': 'modulo-2',
    '#modulo-3': 'modulo-3',
    '#modulo-4': 'modulo-4',
    '#autoevaluacion': 'autoevaluacion',
    '#fuentes': 'fuentes'
  };

  const panels = Object.values(groups).flat().filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function clearTabHash() {
    if (!hashToTab[window.location.hash]) return;
    try {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (error) {
      return;
    }
  }

  function activateTab(tab) {
    const activeTab = groups[tab] ? tab : 'inicio';
    const activePanels = groups[activeTab];

    panels.forEach((panel) => {
      panel.hidden = !activePanels.includes(panel);
    });

    navLinks.forEach((link) => {
      const linkTab = hashToTab[link.getAttribute('href')];
      if (linkTab === activeTab) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    clearTabHash();
    scrollToTop();
    window.requestAnimationFrame(scrollToTop);
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const tab = hashToTab[link.getAttribute('href')];
    if (!tab) return;

    event.preventDefault();
    activateTab(tab);
  });

  const initialHash = window.location.hash;
  activateTab(hashToTab[initialHash] || 'inicio');
})();
