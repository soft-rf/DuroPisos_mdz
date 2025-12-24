// --- 1. IMPORTACIONES DE ESTILOS (CSS) ---

// Frameworks y Librerías desde node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.min.css";
// Swiper styles (v12+) are modular
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Importar tu hoja de estilos principal (¡importante que vaya al final para que pueda sobreescribir!)
import "../styles/main.css";

// --- 2. IMPORTACIONES DE LIBRERÍAS (JS) ---
import "bootstrap"; // Importa el JS de Bootstrap
import AOS from "aos";
import GLightbox from "glightbox";
import Isotope from "isotope-layout";
import Swiper from "swiper"; // Importamos Swiper para poder usarlo si es necesario
import PureCounter from "@srexi/purecounterjs";

"use strict";

/**
 * Preloader
 */
export function initPreloader() {
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    preloader.remove(); // Remove preloader immediately as main.js is loaded after partials
  }
}

/**
 * Scroll top button
 */
export function initScrollTop() {
  const scrollTop = document.querySelector(".scroll-top");
  const togglescrollTop = function () {
    window.scrollY > 100
      ? scrollTop.classList.add("active")
      : scrollTop.classList.remove("active");
  };

  if (scrollTop) {
    // No longer wait for window.load, as main.js is loaded later
    document.addEventListener("scroll", togglescrollTop);
    scrollTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    // Call it once on DOMContentLoaded to set initial state
    togglescrollTop();
  }
}

/**
 * Initiate glightbox
 */
export function initGlightbox() {
  GLightbox({
    selector: ".glightbox",
  });
}

/**
 * Animation on scroll function and init
 */
export function initAOS() {
  AOS.init({
    duration: 800,
    easing: "slide",
    once: true,
    mirror: false,
  });
}

/**
 * Initiate PureCounter
 */
export function initPureCounter() {
  new PureCounter();
}

/**
 * Function to handle copy to clipboard functionality
 */
export function initCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-button");

  copyButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

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
}

/*
 * =================================================================================
 * PROJECTS SECTION - ISOTOPE PORTFOLIO FILTER
 * Description: This code initializes the Isotope library to handle the filtering
 * and layout of the project gallery.
 * =================================================================================
 */

export function initIsotope() {
  let portfolioContainer = document.querySelector(".portfolio-container");

  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item",
      layoutMode: "masonry",
      percentPosition: true,
    });

    let portfolioFilters = document.querySelectorAll(".portfolio-flters li");

    portfolioFilters.forEach(function (filterEl) {
      filterEl.addEventListener('click', function(e) {
        e.preventDefault();

        portfolioFilters.forEach(function (el) {
          el.classList.remove("filter-active");
        });

        this.classList.add("filter-active");

        portfolioIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        });
      });
    });
  }
}

// --- START OF NAVBAR LOGIC ---
export function initMobileNavbar() {
    /**
     * Mobile nav toggle
     */
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');

    if (mobileNavShow && mobileNavHide) {
        document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
            el.addEventListener('click', function(event) {
                event.preventDefault();
                mobileNavToggle();
            });
        });
    }

    function mobileNavToggle() {
        document.body.classList.toggle('mobile-nav-active');
        mobileNavShow.classList.toggle('d-none');
        mobileNavHide.classList.toggle('d-none');
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navbar a').forEach(navbarlink => {
        if (!navbarlink.hash) return;
        let section = document.querySelector(navbarlink.hash);
        if (!section) return;
        navbarlink.addEventListener('click', () => {
            if (document.body.classList.contains('mobile-nav-active')) {
                mobileNavToggle();
            }
        });
    });

    /**
     * Toggle dropdowns in mobile nav
     */
    const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');
    navDropdowns.forEach(el => {
        el.addEventListener('click', function(event) {
            if (document.body.classList.contains('mobile-nav-active')) {
                event.preventDefault();
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('dropdown-active');
                let dropDownIndicator = this.querySelector('.dropdown-indicator');
                dropDownIndicator.classList.toggle('bi-chevron-up');
                dropDownIndicator.classList.toggle('bi-chevron-down');
            }
        });
    });

    /**
     * Header state handling
     */
    const header = document.querySelector('#header');
    if (header) {
        // Function to handle the scrolled state
        const handleHeaderScroll = () => {
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        };

        // Check if it's a subpage on load
        window.addEventListener('load', () => {
            if (!document.querySelector('.hero')) {
                document.body.classList.add('is-subpage');
                document.body.classList.add('subpage-nav-dark'); // Add this line
                header.classList.add('header-scrolled'); // Force scrolled state on subpages
            }
            
            // Initial check for scroll state
            handleHeaderScroll();
        });

        // Listen for scroll events
        document.addEventListener('scroll', handleHeaderScroll);
    }
}
// --- END OF NAVBAR LOGIC ---
