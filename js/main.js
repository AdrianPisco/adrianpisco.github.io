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
