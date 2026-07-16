document.addEventListener("DOMContentLoaded", () => {
  const valueElements = document.querySelectorAll(".card-value");

  // Format number based on value size and type
  const formatNumber = (num, hasDecimals) => {
    if (hasDecimals) {
      return num.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
    }
    return Math.floor(num).toLocaleString('en-US');
  };

  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const prefix = element.getAttribute("data-prefix") || "";
    const suffix = element.getAttribute("data-suffix") || "";
    const hasDecimals = end % 1 !== 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentVal = start + (end - start) * easeProgress;
      
      element.innerHTML = `${prefix}${formatNumber(currentVal, hasDecimals)}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  };

  // Start animations
  valueElements.forEach(el => {
    const target = parseFloat(el.getAttribute("data-target"));
    if (!isNaN(target)) {
      // Stagger slightly or just run all at 1.5s
      animateValue(el, 0, target, 1500);
    }
  });
});
