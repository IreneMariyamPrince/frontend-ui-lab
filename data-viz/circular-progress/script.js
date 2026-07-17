document.addEventListener("DOMContentLoaded", () => {
  const circle = document.querySelector('.progress-ring-circle');
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;

  // Set dash array to circumference
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  // Set starting offset to 0% (which means full offset)
  circle.style.strokeDashoffset = circumference;

  const progressText = document.getElementById('progressValue');
  let currentPercentage = 0;

  // Global function so buttons can call it
  window.setProgress = function(percent) {
    // Optional: change color based on percentage
    if (percent === 100) {
      circle.style.stroke = "#10b981"; // Success Green
    } else if (percent < 50) {
      circle.style.stroke = "#ef4444"; // Danger Red
    } else {
      circle.style.stroke = "#3b82f6"; // Primary Blue
    }

    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    // Animate numbers
    animateValue(progressText, currentPercentage, percent, 1000);
    currentPercentage = percent;
  };

  // Helper to animate numbers
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      obj.innerHTML = Math.floor(easeProgress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = end;
      }
    };
    window.requestAnimationFrame(step);
  }

  // Initial load animation
  setTimeout(() => {
    window.setProgress(65);
  }, 300);
});
