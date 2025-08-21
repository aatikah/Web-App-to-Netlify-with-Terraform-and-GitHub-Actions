// Tiny smooth-scroll enhancement for in-page anchor links
// Respects prefers-reduced-motion and only handles links with hash targets on the same page
(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  document.addEventListener('click', function (e) {
    var link = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) return;

    var href = link.getAttribute('href');
    // Ignore plain '#' or empty hashes
    if (!href || href === '#' || href === '#!') return;

    var id = href.slice(1);
    try { id = decodeURIComponent(id); } catch (_) {}

    var target = document.getElementById(id);
    if (!target) return;

    // Prevent default jump
    e.preventDefault();

    var prefersReduced = false;
    if (window.matchMedia) {
      try {
        prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch (_) {}
    }

    var top = target.getBoundingClientRect().top + window.pageYOffset;
    var behavior = prefersReduced ? 'auto' : 'smooth';

    try {
      window.scrollTo({ top: top, behavior: behavior });
    } catch (_) {
      // Fallback for older browsers without smooth behavior support
      window.scrollTo(0, top);
    }

    // Update the hash without causing another jump
    if (history && history.pushState) {
      try { history.pushState(null, '', '#' + id); } catch (_) {}
    } else {
      // Fallback: assign location hash (may jump, but we've already scrolled)
      window.location.hash = id;
    }
  }, false);
})();

