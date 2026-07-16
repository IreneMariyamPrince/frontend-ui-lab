const scene = document.querySelector(".carousel-scene");
let isDragging = false;
let startX = 0;
let currentRotation = 0;
let targetRotation = 0;
let velocity = 0;
const friction = 0.95; // Drag momentum decay
const autoRotateSpeed = 5; // Degrees per second (gentle autoplay)
const sensitivity = 0.25; // Drag sensitivity
let lastTime = performance.now();
// Pointer Events handle mouse + touch
window.addEventListener("pointerdown", (e) => {
  isDragging = true;
  startX = e.clientX;
  velocity = 0;
  // Capture pointer for smooth dragging
  e.target.setPointerCapture?.(e.pointerId);
});
window.addEventListener("pointermove", (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - startX;
  startX = e.clientX;
  velocity = deltaX * sensitivity;
  targetRotation += velocity;
});
window.addEventListener("pointerup", () => {
  isDragging = false;
});
// Animation loop
function update(now) {
  const deltaTime = (now - lastTime) / 1000;
  lastTime = now;
  if (!isDragging) {
    // Gentle continuous autoplay
    targetRotation += autoRotateSpeed * deltaTime;
    // Apply drag momentum
    velocity *= Math.pow(friction, deltaTime * 60);
    targetRotation += velocity;
  }
  // Smooth movement interpolation
  currentRotation += (targetRotation - currentRotation) * 0.08;
  // Apply 3D rotation
  scene.style.transform = `rotateY(${currentRotation}deg)`;
  requestAnimationFrame(update);
}
// Start animation
requestAnimationFrame(update);
