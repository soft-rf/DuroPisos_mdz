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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
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

  /**
   * Function to handle copy to clipboard functionality
   */
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
});
