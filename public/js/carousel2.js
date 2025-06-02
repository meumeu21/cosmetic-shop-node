document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carousel-dots');
  const dots = Array.from(dotsContainer.querySelectorAll('svg'));

  const items = Array.from(carousel.children);
  const itemWidth = items[0].offsetWidth;
  const gap = 100;
  const visibleItems = 3;
  const totalItems = items.length;

  let currentPosition = 0;
  const maxPosition = totalItems - visibleItems;

  function updateControls() {
    prevBtn.disabled = currentPosition === 0;
    nextBtn.disabled = currentPosition === maxPosition;

    dots.forEach((dot, index) => {
      const isActive = index === currentPosition;
      dot.querySelector('circle').setAttribute('fill', isActive ? '#191818' : '#DADED6');
    });
  }

  function moveCarousel() {
    const offset = -(currentPosition * (itemWidth + gap));
    carousel.style.transform = `translateX(${offset}px)`;
    updateControls();
  }

  nextBtn.addEventListener('click', function() {
    if (currentPosition < maxPosition) {
      currentPosition++;
      moveCarousel();
    }
  });

  prevBtn.addEventListener('click', function() {
    if (currentPosition > 0) {
      currentPosition--;
      moveCarousel();
    }
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      currentPosition = index;
      moveCarousel();
    });
  });

  updateControls();

  window.addEventListener('resize', function() {
    const newItemWidth = items[0].offsetWidth;
    if (newItemWidth !== itemWidth) {
      moveCarousel();
    }
  });
});
