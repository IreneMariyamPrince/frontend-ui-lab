document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("magnetic-wrap");
  const btn = document.getElementById("magnetic-btn");
  const text = btn.querySelector(".btn-text");

  wrap.addEventListener("mousemove", (e) => {
    // Get mouse position relative to the wrap
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Apply translation to the button (magnetic pull)
    // We multiply by a factor (e.g. 0.4) to control the strength of the pull
    btn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
    
    // Apply a stronger translation to the text for parallax effect
    text.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  wrap.addEventListener("mouseleave", () => {
    // Reset transforms when mouse leaves the wrap area
    btn.style.transform = `translate(0px, 0px)`;
    text.style.transform = `translate(0px, 0px)`;
  });
});
