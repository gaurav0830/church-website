function initNavbar() {
  const navbar = document.querySelector(".navbar");

  // Scroll background change
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // GSAP animation timeline
  const t1 = gsap.timeline({ paused: true, reversed: true });

  t1.to(".one", { duration: 0.5, y: 6, rotation: 45, ease: "expo.inOut" });
  t1.to(".two", { duration: 0.5, y: -6, rotation: -45, ease: "expo.inOut" }, "-=0.5");
  t1.to(".menu", { duration: 1.5, top: "0%", ease: "expo.inOut" }, "-=0.5");
  t1.from(".menu ul li", {
    duration: 0.75,
    x: -30,
    opacity: 0,
    ease: "expo.out",
    stagger: 0.1
  });

  // Toggle button
  document.querySelector(".toggle-btn").addEventListener("click", () => {
    t1.reversed() ? t1.play() : t1.reverse();
  });

  // Close menu when a normal link is clicked (not dropdown parent)
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", (e) => {
      if (!link.closest(".has-dropdown")) {
        t1.reverse(); // close only if it's not a dropdown parent
      }
    });
  });

  // Dropdown toggle
  const dropdownParents = document.querySelectorAll(".has-dropdown > a");
  dropdownParents.forEach(parent => {
    parent.addEventListener("click", (e) => {
      e.preventDefault();
      const li = parent.parentElement;
      li.classList.toggle("active");

      // Close other dropdowns (optional)
      document.querySelectorAll(".has-dropdown").forEach(item => {
        if (item !== li) item.classList.remove("active");
      });
    });
  });
}

window.initNavbar = initNavbar;
