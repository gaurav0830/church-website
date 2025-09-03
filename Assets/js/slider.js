let indexValue = 1;
showImg(indexValue);

// Move carousel left/right
function side_slide(e) {
  showImg(indexValue += e);
}

// Show specific image
function showImg(e) {
  let i;
  const img = document.querySelectorAll('.images img');
  const slider = document.querySelectorAll('.btm-slides span');
  
  if (e > img.length) { indexValue = 1 }
  if (e < 1) { indexValue = img.length }

  for (i = 0; i < img.length; i++) {
    img[i].style.display = "none";
    img[i].classList.remove("active"); // remove active class
  }
  for (i = 0; i < slider.length; i++) {
    slider[i].style.background = "rgba(255,255,255,0.1)";
  }

  img[indexValue - 1].style.display = "block";
  img[indexValue - 1].classList.add("active"); // add active to current
  slider[indexValue - 1].style.background = "white";
}

// -------- PARALLAX ON SCROLL --------
window.addEventListener("scroll", () => {
  const content = document.querySelector(".content");
  const activeImg = document.querySelector(".images img.active");

  if (!activeImg || !content) return;

  // Distance from viewport top
  const rect = content.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Scroll progress (0 at top, 1 at bottom)
  const progress = Math.min(Math.max(rect.top / windowHeight, 0), 1);

  // Translate range (-40px to +40px)
  const translateY = (progress - 0.5) * 80;

  // Apply transform
  activeImg.style.transform = `translateY(${translateY}px) scale(1.2)`;
});
