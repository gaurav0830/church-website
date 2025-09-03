const parallaxImg = document.querySelector("#parallax-img img");

document.addEventListener("mousemove", (e) => {
  let x = (window.innerWidth - e.pageX) / 100;
  let y = (window.innerHeight - e.pageY) / 100;
  parallaxImg.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
});

document.addEventListener("mouseleave", () => {
  parallaxImg.style.transform = "translate(0,0) scale(1.05)";
});
