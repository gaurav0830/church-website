document.addEventListener("DOMContentLoaded", function () {
  const slideTexts = [
    `<h1 class="slider-head1">OUR LADY VIRGIN OF THE POOR CHURCH</h1><h2 class="slider-head2">UPPINANGADY</h2><h3 class="slider-head3">OPP UPPINANGADY GOVT P U COLLAGE</h3><h3 class="slider-head3">UPPINANGADY VILLAGE AND POST PUTTUR TALUK DK-574241</h3>`,
    `<h1 class="slider-head1">OUR LADY VIRGIN OF THE POOR CHURCH</h1><h2 class="slider-head2">UPPINANGADY</h2><h3 class="slider-head3">OPP UPPINANGADY GOVT P U COLLAGE</h3><h3 class="slider-head3">UPPINANGADY VILLAGE AND POST PUTTUR TALUK DK-574241</h3>`,
    `<h1 class="slider-head1">OUR LADY VIRGIN OF THE POOR CHURCH</h1><h2 class="slider-head2">UPPINANGADY</h2><h3 class="slider-head3">OPP UPPINANGADY GOVT P U COLLAGE</h3><h3 class="slider-head3">UPPINANGADY VILLAGE AND POST PUTTUR TALUK DK-574241</h3>`,
    `<h1 class="slider-head1">Church Associations</h1><a href="/component/association.html" class="slide-btn">know more </a>`,
  ];

  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const slides = Array.from(document.querySelectorAll(".slide"));
  const textElement = document.getElementById("text");
  const wrapper = document.getElementById("wrapper");
  const nextBtn = document.getElementById("next");

  const currentIndexRef = { current: 0 };
  const isTweeningRef = { current: false };
  let autoSlideInterval;

  let touchStartX = 0;
  let touchEndX = 0;

  function preloadImages(callback) {
    let loaded = 0;
    const total = slides.length;

    slides.forEach((slide) => {
      const imgUrl = slide.style.backgroundImage.replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      );
      const img = new Image();
      img.src = imgUrl;

      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === total) callback();
      };
    });
  }

  function initSlides() {
    slides.forEach((slide, index) => {
      slide.style.transition = "transform 1s ease, opacity 1s ease";
      slide.style.transform = index === 0 ? "translateX(0%)" : "translateX(100%)";
      slide.style.opacity = index === 0 ? "1" : "0";
      slide.style.zIndex = index === 0 ? "2" : "1";
    });

    wrapper.style.visibility = "visible";

    // Render first slide HTML
    textElement.innerHTML = slideTexts[0];
    textElement.classList.remove("show");
    requestAnimationFrame(() => textElement.classList.add("show"));

    updateNav(0);

    startAutoSlide();
  }

  function updateNav(activeIndex) {
    navItems.forEach((item, index) => {
      item.classList.toggle("active", index === activeIndex);
    });
  }

  function handleGesture() {
    const deltaX = touchEndX - touchStartX;
    if (deltaX < -50) gotoSlide(1);
    if (deltaX > 50) gotoSlide(-1);
  }

  wrapper.addEventListener("touchstart", (e) => (touchStartX = e.changedTouches[0].screenX));
  wrapper.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });
  wrapper.addEventListener("mousedown", (e) => (touchStartX = e.clientX));
  wrapper.addEventListener("mouseup", (e) => {
    touchEndX = e.clientX;
    handleGesture();
  });

  function updateText(nextIndex) {
    textElement.classList.remove("show");
    setTimeout(() => {
      textElement.innerHTML = slideTexts[nextIndex]; // use innerHTML for headings
      requestAnimationFrame(() => textElement.classList.add("show"));
    }, 300);
  }

  function gotoSlide(direction) {
    if (isTweeningRef.current) return;
    isTweeningRef.current = true;

    const totalSlides = slides.length;
    const nextIndex =
      (currentIndexRef.current + direction + totalSlides) % totalSlides;

    const currentSlide = slides[currentIndexRef.current];
    const nextSlide = slides[nextIndex];

    // Prepare next slide
    nextSlide.style.transition = "none";
    nextSlide.style.transform = direction > 0 ? "translateX(100%)" : "translateX(-100%)";
    nextSlide.style.opacity = "1";
    nextSlide.style.zIndex = "3";

    void nextSlide.offsetWidth;

    // Animate slides
    nextSlide.style.transition = "transform 1s ease, opacity 1s ease";
    currentSlide.style.transition = "transform 1s ease, opacity 1s ease";

    nextSlide.style.transform = "translateX(0%)";
    currentSlide.style.transform = direction > 0 ? "translateX(-100%)" : "translateX(100%)";

    updateText(nextIndex);

    setTimeout(() => {
      currentSlide.style.opacity = "0";
      currentSlide.style.zIndex = "1";
      nextSlide.style.zIndex = "2";
      isTweeningRef.current = false;
    }, 1000);

    updateNav(nextIndex);
    currentIndexRef.current = nextIndex;

    resetAutoSlide(); // reset timer on manual navigation
  }

  function gotoSlideDirect(index) {
    if (isTweeningRef.current || currentIndexRef.current === index) return;
    gotoSlide(index - currentIndexRef.current);
  }

  navItems.forEach((item, index) => {
    item.addEventListener("click", () => gotoSlideDirect(index));
  });

  if (nextBtn) nextBtn.addEventListener("click", () => gotoSlide(1));

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      gotoSlide(1);
    }, 5000); // 5 seconds per slide
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  preloadImages(initSlides);
});
