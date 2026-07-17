document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');
  const speed = 2000; // Total animation duration in ms

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const isDollar = counter.classList.contains('prefix-dollar');
      
      let startTimestamp = null;
      
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / speed, 1);
        
        // easeOutQuart easing function for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 4);
        
        const currentNum = Math.floor(easeOut * target);
        
        // Format with commas and optional prefix
        let formattedNum = currentNum.toLocaleString();
        if (isDollar) formattedNum = '$' + formattedNum;
        
        counter.innerText = formattedNum;
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          // Ensure exact target is set at the end
          let finalNum = target.toLocaleString();
          if (isDollar) finalNum = '$' + finalNum;
          counter.innerText = finalNum;
        }
      };
      
      window.requestAnimationFrame(step);
    });
  };

  // Use Intersection Observer to start animation only when scrolled into view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect(); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  // Observe the container
  const container = document.querySelector('.stats-container');
  if (container) {
    observer.observe(container);
  }
});
