const toggle = document.getElementById('pricing-toggle');
const amounts = document.querySelectorAll('.amount');
const monthlyLabel = document.getElementById('monthly-label');
const yearlyLabel = document.getElementById('yearly-label');

// Initialize active label
monthlyLabel.classList.add('active');

toggle.addEventListener('change', (e) => {
  const isYearly = e.target.checked;
  
  if (isYearly) {
    yearlyLabel.classList.add('active');
    monthlyLabel.classList.remove('active');
  } else {
    monthlyLabel.classList.add('active');
    yearlyLabel.classList.remove('active');
  }

  amounts.forEach(amount => {
    // Add a quick fade out/in effect
    amount.style.opacity = 0;
    
    setTimeout(() => {
      if (isYearly) {
        amount.textContent = amount.getAttribute('data-yearly');
      } else {
        amount.textContent = amount.getAttribute('data-monthly');
      }
      amount.style.opacity = 1;
    }, 200); // Matches CSS transition if we added one, or just a quick JS timeout
  });
});

// Add CSS transition for smooth opacity change
amounts.forEach(amount => {
  amount.style.transition = "opacity 0.2s ease";
});
