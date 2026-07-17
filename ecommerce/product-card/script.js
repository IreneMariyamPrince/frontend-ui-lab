document.addEventListener('DOMContentLoaded', () => {
  const swatches = document.querySelectorAll('.swatch');
  const images = document.querySelectorAll('.product-image');
  const wishlistBtn = document.querySelector('.wishlist-btn');

  // Handle color swatch clicks
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      // Remove active class from all swatches
      swatches.forEach(s => s.classList.remove('active'));
      
      // Add active class to clicked swatch
      swatch.classList.add('active');
      
      // Get the color selected
      const color = swatch.getAttribute('data-color');
      
      // Update image
      images.forEach(img => {
        img.classList.remove('active');
        if (img.id === `img-${color}`) {
          img.classList.add('active');
        }
      });
    });
  });

  // Handle wishlist toggle
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      wishlistBtn.classList.toggle('active');
      
      // Animate the heart icon slightly on click
      const icon = wishlistBtn.querySelector('svg');
      icon.style.transform = 'scale(1.2)';
      setTimeout(() => {
        icon.style.transform = 'scale(1)';
      }, 200);
    });
  }
});
