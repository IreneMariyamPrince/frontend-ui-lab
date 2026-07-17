document.addEventListener('DOMContentLoaded', () => {
  const dock = document.querySelector('.dock');
  const icons = document.querySelectorAll('.dock-icon');
  
  const baseSize = 50;
  const maxSize = 90;
  const range = 200; // The distance over which icons are affected

  dock.addEventListener('mousemove', (e) => {
    icons.forEach(icon => {
      const rect = icon.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(e.clientX - iconCenterX);
      
      // Calculate new size based on distance from cursor
      if (distance < range) {
        // Curve function for smooth scaling: 1 - (distance / range)^2
        const scale = 1 - Math.pow(distance / range, 2);
        const newSize = baseSize + (maxSize - baseSize) * scale;
        icon.style.width = `${newSize}px`;
        icon.style.height = `${newSize}px`;
      } else {
        icon.style.width = `${baseSize}px`;
        icon.style.height = `${baseSize}px`;
      }
    });
  });

  dock.addEventListener('mouseleave', () => {
    icons.forEach(icon => {
      // Reset smoothly
      icon.style.width = `${baseSize}px`;
      icon.style.height = `${baseSize}px`;
    });
  });
});
