document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  // CORRECCIÓN: Se envuelve window.scrollTo en una función anónima.
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    };
    window.addEventListener("load", togglescrollTop);
    document.addEventListener("scroll", togglescrollTop);
    scrollTop.addEventListener("click", function () {
      // Esto es ahora una función
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /**
   * Initiate glightbox
   */
  // Agregada verificación de typeof para evitar error si GLightbox no carga
  if (typeof GLightbox !== "undefined") {
    const glightbox = GLightbox({
      selector: ".glightbox",
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    // Agregada verificación de typeof para evitar error si AOS no carga
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "slide",
        once: true,
        mirror: false,
      });
    }
  }
  window.addEventListener("load", () => {
    aos_init();
  });

  // --- TU CÓDIGO PERSONALIZADO: COPIAR AL PORTAPAPELES ---
  /**
   * Function to handle copy to clipboard functionality
   */
  const copyButtons = document.querySelectorAll(".copy-button");

  copyButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior

      const targetId = this.dataset.copyTarget;
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = targetElement.textContent.trim();

        tempTextArea.style.position = "fixed";
        tempTextArea.style.top = 0;
        tempTextArea.style.left = 0;
        tempTextArea.style.opacity = 0;
        document.body.appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);

        const originalIcon = this.querySelector("i");
        if (originalIcon) {
          originalIcon.classList.remove("bi-clipboard");
          originalIcon.classList.add("bi-check-lg");
          setTimeout(() => {
            originalIcon.classList.remove("bi-check-lg");
            originalIcon.classList.add("bi-clipboard");
          }, 1500);
        }
      }
    });
  });

  // --- Asegurar que Bootstrap escanee todas las modales ---
  // Esto es un parche para cuando Bootstrap no inicializa todas las modales automáticamente
  // Puedes listar los IDs de tus modales problemáticas aquí
  const problematicModals = ["selladoresProductModal", "faqModal"];

  problematicModals.forEach((modalId) => {
    const modalElement = document.getElementById(modalId);
    if (
      modalElement &&
      typeof bootstrap !== "undefined" &&
      typeof bootstrap.Modal !== "undefined"
    ) {
      // Intenta inicializar la modal si Bootstrap.Modal no lo hizo automáticamente
      // Esto fuerza a Bootstrap a "conocer" la modal.
      const bsModal = new bootstrap.Modal(modalElement, {
        backdrop: true, // Asegura que el backdrop se ponga
      });
      // No la mostramos aquí, solo la inicializamos.
      // La mostrara el data-bs-toggle del botón.
    }
  });
}); // CIERRE DEL addEventListener "DOMContentLoaded" PRINCIPAL

window.addEventListener("load", () => {
  /*
   * =================================================================================
   * PROJECTS SECTION - ISOTOPE PORTFOLIO FILTER
   * Description: This code initializes the Isotope library to handle the filtering
   * and layout of the project gallery.
   * =================================================================================
   */

  // Seleccionamos el contenedor que envuelve todas las imágenes de la galería.
  // Tu HTML usa la clase '.portfolio-container'.
  let portfolioContainer = document.querySelector(".portfolio-container");

  // Solo ejecutamos el código si encontramos ese contenedor en la página.
  if (portfolioContainer) {
    // Inicializamos Isotope en el contenedor.
    // Le decimos que cada elemento a filtrar/ordenar tiene la clase '.portfolio-item'.
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item",
      layoutMode: "masonry", // 'masonry' es ideal para imágenes de diferentes alturas.
      percentPosition: true,
    });

    // Seleccionamos todos los botones de filtro.
    // Tu HTML usa la clase '.portfolio-flters' en el <ul>.
    let portfolioFilters = document.querySelectorAll(".portfolio-flters li");

    // Añadimos un 'event listener' (un escuchador de clics) a cada botón.
    portfolioFilters.forEach(function (filterEl) {
      filterEl.addEventListener("click", function (e) {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del enlace.

        // Quitamos la clase 'filter-active' de cualquier botón que la tenga.
        portfolioFilters.forEach(function (el) {
          el.classList.remove("filter-active");
        });

        // Añadimos la clase 'filter-active' solo al botón que acabamos de presionar.
        this.classList.add("filter-active");

        // Usamos Isotope para filtrar los elementos.
        // El valor del filtro lo leemos del atributo 'data-filter' del botón.
        portfolioIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        });
      });
    });
  }
});
