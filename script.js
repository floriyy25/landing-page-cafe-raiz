document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     1. ANIMACIONES AL SCROLL (IntersectionObserver)
     ========================================================= */
  const revealTargets = document.querySelectorAll(
    '.container > .eyebrow, .section-title, .section-lead, .custom-card, .custom-step, .stat-num, .about-img-wrapper, .col-lg-6, .custom-quote'
  );

  revealTargets.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  /* =========================================================
     2. CONTADORES ANIMADOS
     ========================================================= */
  const counters = document.querySelectorAll('.stat-num');

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.count) || 0;
        const duration = 2500;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3); 
          const value = Math.floor(easeOut * target);
          el.textContent = value.toLocaleString('es-AR');
          if (progress < 1) requestAnimationFrame(update);
        }
        
        setTimeout(() => requestAnimationFrame(update), 150);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => countObserver.observe(c));

  /* =========================================================
     3. VALIDACIÓN DEL FORMULARIO
     ========================================================= */
  const form = document.getElementById('form');
  const emailInput = document.getElementById('email');
  const formMsg = document.getElementById('formMsg');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      formMsg.classList.remove('is-error', 'is-success');

      if (!email) {
        formMsg.textContent = 'Ingresá tu email.';
        formMsg.classList.add('is-error');
        return;
      }

      if (!emailRegex.test(email)) {
        formMsg.textContent = 'El email no parece válido.';
        formMsg.classList.add('is-error');
        return;
      }

      formMsg.textContent = '¡Listo! Te vamos a avisar de nuevos lotes. ☕';
      formMsg.classList.add('is-success');
      form.reset();
    });
  }
});