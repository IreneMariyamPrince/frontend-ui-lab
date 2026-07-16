const track = document.getElementById("track");
const slides = Array.from(document.querySelectorAll(".testimonial-slide"));
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dots = Array.from(document.querySelectorAll(".dot"));

let currentIndex = 0;
let autoPlayInterval;

function updateSlider() {
  // Move track
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update active slide class for scaling effect
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

// Event Listeners
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoPlay();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoPlay();
});

dots.forEach(dot => {
  dot.addEventListener("click", (e) => {
    currentIndex = parseInt(e.target.dataset.index);
    updateSlider();
    resetAutoPlay();
  });
});

// Auto-play
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

// Init
startAutoPlay();
