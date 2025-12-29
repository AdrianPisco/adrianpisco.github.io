/* ==========================================================================
   MAIN.JS — YACHAY.dev
   RESPONSABILIDAD:
   - Animación de terminal tipo boot real
   - Escritura progresiva línea por línea
   - Cursor aparece SOLO al finalizar
   - Código limpio, explicable y escalable
   ========================================================================== */

(() => {

  /* =========================================================
     SELECCIÓN DE ELEMENTOS
     ========================================================= */

  const terminalLines = document.querySelectorAll(".terminal-line");
  const terminalCursor = document.querySelector(".terminal-cursor");

  // Si no existe terminal, no ejecutamos nada
  if (terminalLines.length === 0) return;

  /* =========================================================
     PREPARACIÓN DEL CONTENIDO
     - Guardamos el texto original
     - Limpiamos las líneas para animar
     ========================================================= */

  const linesText = Array.from(terminalLines).map(line =>
    line.textContent.trim()
  );

  terminalLines.forEach(line => {
    line.textContent = "";
  });

  /* =========================================================
     CONTROL DE ÍNDICES
     ========================================================= */

  let lineIndex = 0; // línea actual
  let charIndex = 0; // carácter actual

  /* =========================================================
     ACTIVAR CURSOR (ESTADO FINAL)
     ========================================================= */

  function activarCursor() {
    if (terminalCursor) {
      terminalCursor.classList.add("is-active");
    }
  }

  /* =========================================================
     FUNCIÓN PRINCIPAL DE ESCRITURA
     ========================================================= */

  function escribirLinea() {

    // 🔚 TERMINÓ TODO EL BOOT
    if (lineIndex >= terminalLines.length) {
      activarCursor();
      return;
    }

    const currentLine = terminalLines[lineIndex];
    const currentText = linesText[lineIndex];

    // ⌨️ ESCRIBIENDO CARÁCTER POR CARÁCTER
    if (charIndex < currentText.length) {
      currentLine.textContent += currentText.charAt(charIndex);
      charIndex++;

      setTimeout(escribirLinea, 28); // velocidad typing
    }
    // ⏭️ PASA A LA SIGUIENTE LÍNEA
    else {
      charIndex = 0;
      lineIndex++;

      setTimeout(escribirLinea, 420); // pausa entre líneas
    }
  }

  /* =========================================================
     DELAY INICIAL — SIMULA ARRANQUE DE SISTEMA
     ========================================================= */

  setTimeout(escribirLinea, 600);

})();

/* ==========================================================================
   REVEAL ON SCROLL — ANIMACIÓN DE SECCIONES
   RESPONSABILIDAD:
   - Aparece contenido al hacer scroll
   - Uso de IntersectionObserver (performante)
   - Estilo profesional (no invasivo)
   ========================================================================== */

(() => {

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // solo una vez
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  revealElements.forEach(el => observer.observe(el));

})();

/* ==========================================================================
   FOOTER — AÑO AUTOMÁTICO
   ========================================================================== */

(() => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();

const track = document.querySelector('.projects-track');
const cards = Array.from(document.querySelectorAll('.project-card'));
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let current = 2; // empieza en el centro

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === current);
  });

  const cardWidth = cards[0].offsetWidth + 24;
  const offset = -(current - 2) * cardWidth;

  track.style.transform = `translateX(${offset}px)`;
}

nextBtn.addEventListener('click', () => {
  if (current < cards.length - 1) {
    current++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    updateCarousel();
  }
});

updateCarousel();

/* =========================================================
   PROJECTS CAROUSEL — CONTROL DE LÍMITES
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector(".projects-track");
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const btnPrev = document.querySelector(".carousel-btn.prev");
  const btnNext = document.querySelector(".carousel-btn.next");

  if (!track || cards.length === 0) return;

  let currentIndex = cards.findIndex(card =>
    card.classList.contains("active")
  );

  if (currentIndex === -1) currentIndex = 0;

  const updateCarousel = () => {
    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex);
    });

    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // ajusta si cambias el gap en CSS

    track.style.transform =
      `translateX(${-currentIndex * (cardWidth + gap)}px)`;

    // DESACTIVAR BOTONES EN LOS EXTREMOS
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === cards.length - 1;

    btnPrev.classList.toggle("disabled", btnPrev.disabled);
    btnNext.classList.toggle("disabled", btnNext.disabled);
  };

  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  btnNext.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  updateCarousel();
});
