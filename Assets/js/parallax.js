// GSAP Animation for Parallax Text
window.addEventListener("load", () => {
  gsap.to(".parallax-content", {
    duration: 1.5,
    opacity: 1,
    y: 0,
    ease: "power3.out"
  });
});
