document.addEventListener("DOMContentLoaded", () => {
  // ✅ Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Generic reveal
  gsap.utils.toArray(".reveal-bottom").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });
  });

  gsap.utils.toArray(".reveal-top").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      },
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out"
    });
  });

  gsap.utils.toArray(".reveal-left").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out"
    });
  });

  gsap.utils.toArray(".reveal-right").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      },
      opacity: 0,
      x: 50,
      duration: 1,
      ease: "power3.out"
    });
  });
});
