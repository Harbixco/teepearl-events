/**
 * TEEPEARL EVENT SERVICES - INTERACTION & ANIMATION ENGINE
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. SCROLL REVEAL OBSERVER
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 2. DYNAMIC NUMBER COUNTERS FOR STATS
  const counters = document.querySelectorAll('[data-counter-target]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter-target'), 10);
          const suffix = el.getAttribute('data-counter-suffix') || '';
          const duration = 1600; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * target);

            el.textContent = currentVal + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.2
    });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // 3. ENHANCED DETAILS / FAQ ACCORDION MICRO-INTERACTION
  document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        const content = detail.querySelector('.faq-content');
        if (content) {
          content.style.animation = 'none';
          void content.offsetHeight; // Trigger reflow
          content.style.animation = 'faqOpen 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      }
    });
  });
});
