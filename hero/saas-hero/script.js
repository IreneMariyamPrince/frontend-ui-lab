document.addEventListener("DOMContentLoaded", () => {
  const mockupContainer = document.querySelector(".mockup-container");
  const dashboardMockup = document.querySelector(".dashboard-mockup");
  const mockupGlow = document.querySelector(".mockup-glow");

  // Subtle Parallax effect on mouse move
  if (mockupContainer && dashboardMockup) {
    document.addEventListener("mousemove", (e) => {
      // Only apply effect if mouse is reasonably close or over the hero area
      // to save performance, but we'll apply it globally for this demo
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Calculate rotation based on mouse position
      // Mouse on left (x=0) -> rotateY negative
      // Mouse on top (y=0) -> rotateX positive
      const rotateX = 10 - (y - 0.5) * 15; // base 10deg, +/- 7.5deg
      const rotateY = (x - 0.5) * 15;      // base 0deg, +/- 7.5deg

      // We use requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
        dashboardMockup.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.95)`;
        
        // Move the glow slightly opposite to the mouse for a dynamic lighting feel
        mockupGlow.style.transform = `translate(calc(-50% + ${(x - 0.5) * -50}px), calc(-50% + ${(y - 0.5) * -50}px))`;
      });
    });

    // Reset on mouse leave (if we wanted to bind only to container)
    // mockupContainer.addEventListener("mouseleave", () => { ... })
  }
});
