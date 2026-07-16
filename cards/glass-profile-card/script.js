const card = document.getElementById("tilt-card");
const glass = document.querySelector(".glass-card");

// Maximum rotation angle in degrees
const MAX_ROTATION = 15;

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  
  // Get mouse position relative to the center of the card (-1 to +1)
  const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
  const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
  
  // Calculate rotation (invert Y axis so it tilts towards the mouse)
  const rotateX = -y * MAX_ROTATION;
  const rotateY = x * MAX_ROTATION;
  
  glass.style.transform = `translateZ(30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  
  // Optional: Add a dynamic glare effect
  // This calculates the angle for a CSS linear-gradient glare
  const angle = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * (180 / Math.PI);
  glass.style.background = `
    linear-gradient(${angle}deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0) 100%),
    rgba(255, 255, 255, 0.05)
  `;
});

card.addEventListener("mouseleave", () => {
  // Reset card smoothly when mouse leaves
  glass.style.transition = "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
  glass.style.transform = "translateZ(30px) rotateX(0deg) rotateY(0deg)";
  glass.style.background = "rgba(255, 255, 255, 0.05)";
});

card.addEventListener("mouseenter", () => {
  // Remove transition so it follows mouse instantly
  glass.style.transition = "none";
});
