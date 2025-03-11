document.addEventListener("DOMContentLoaded", function () {
  // Elements to update
  const navBottom = document.getElementById("navBottom");
  const navLogo = document.getElementById("navLogo");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuClose = document.getElementById("mobileMenuClose");

  // Set your scroll threshold (in pixels)
  const scrollThreshold = 50;

  // Function to handle scroll
  function handleScroll() {
      if (window.scrollY > scrollThreshold) {
          // Add scrolled class to nav-bottom and hamburger
          navBottom.classList.add("scrolled");
          hamburger.classList.add("scrolled");

          // Change logo image based on whether it's dark mode or not
          if (navLogo.getAttribute("id") === "navLogo-dark") {
              if (navLogo.getAttribute("src") !== "/images/logo/logo-color.svg") {
                  navLogo.setAttribute("src", "/images/logo/logo-color.svg");
              }
          } else {
              if (navLogo.getAttribute("src") !== "/images/logo/logo-color.svg") {
                  navLogo.setAttribute("src", "/images/logo/logo-color.svg");
              }
          }
      } else {
          // Remove scrolled class and revert logo
          navBottom.classList.remove("scrolled");
          hamburger.classList.remove("scrolled");

          // Change logo image back to white only if it's not navLogo-dark
          if (navLogo.getAttribute("id") === "navLogo-dark") {
              if (navLogo.getAttribute("src") !== "/images/logo/logo-color.svg") {
                  navLogo.setAttribute("src", "/images/logo/logo-color.svg");
              }
          } else {
              if (navLogo.getAttribute("src") !== "/images/logo/logo-white.svg") {
                  navLogo.setAttribute("src", "/images/logo/logo-white.svg");
              }
          }
      }
  }

  // Listen for scroll events
  window.addEventListener("scroll", handleScroll);

  // Toggle mobile menu overlay when hamburger is clicked
  hamburger.addEventListener("click", function () {
      mobileMenu.classList.add("open");
  });

  // Close mobile menu when close button is clicked
  mobileMenuClose.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
  });

  // Optional: close mobile menu when clicking outside the menu links
  mobileMenu.addEventListener("click", function (e) {
      // If the clicked element is the overlay (and not one of its children), close the menu.
      if (e.target === mobileMenu) {
          mobileMenu.classList.remove("open");
      }
  });
});
