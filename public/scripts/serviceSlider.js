document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    const indicators = document.querySelectorAll('.slider-indicator .bar');
  
    // Set the initial slide index to the middle slide.
    let currentIndex = 0;
    // Flag to ignore scroll events during our programmatic scrolling.
    let isProgrammaticScrolling = false;
    // Approximate duration of our scroll animation (in ms)
    const scrollDuration = 500;
  
    // Scroll to a slide by centering it in the slider.
    function scrollToSlide(index, behavior = 'smooth') {
      if (slides[index]) {
        const sliderWidth = slider.clientWidth;
        const slide = slides[index];
        const slideWidth = slide.clientWidth;
        // Calculate the target scrollLeft so that the slide is centered.
        const targetScrollLeft = slide.offsetLeft - (sliderWidth - slideWidth) / 2;
        isProgrammaticScrolling = true;
        slider.scrollTo({ left: targetScrollLeft, behavior });
        // After the scroll duration, re-enable scroll event updates.
        setTimeout(() => {
          isProgrammaticScrolling = false;
        }, scrollDuration);
      }
    }
  
    // Update the active indicator bar.
    function updateIndicators() {
      indicators.forEach((bar, index) => {
        bar.classList.toggle('active', index === currentIndex);
      });
    }
  
    // Wait for the full page (including images) to load before setting initial slide.
    window.addEventListener('load', () => {
      scrollToSlide(currentIndex, 'auto'); // Jump instantly to the middle slide.
      updateIndicators();
    });
  
    // Arrow click events
    leftArrow.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        scrollToSlide(currentIndex);
        updateIndicators();
      }
    });
  
    rightArrow.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        scrollToSlide(currentIndex);
        updateIndicators();
      }
    });
  
    // Update currentIndex when the user scrolls manually (if not programmatic).
    slider.addEventListener('scroll', () => {
      if (isProgrammaticScrolling) return;
      const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
      let closestIndex = currentIndex;
      let minDistance = Infinity;
      slides.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const distance = Math.abs(slideCenter - sliderCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      if (closestIndex !== currentIndex) {
        currentIndex = closestIndex;
        updateIndicators();
      }
    });
  });
  