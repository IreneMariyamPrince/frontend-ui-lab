// Simple script to add a subtle mouse movement effect to the bento boxes
const boxes = document.querySelectorAll('.bento-box');

boxes.forEach(box => {
  box.addEventListener('mousemove', (e) => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Optional: Could be used to set a radial gradient glow around the cursor on hover.
    // box.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.8), transparent 50%)`;
  });
});
