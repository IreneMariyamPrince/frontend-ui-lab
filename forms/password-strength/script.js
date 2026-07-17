document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("toggleBtn");
  const strengthBar = document.getElementById("strengthBar");
  const strengthLabel = document.getElementById("strengthLabel");

  const criteriaElements = {
    length: document.getElementById("length"),
    lowercase: document.getElementById("lowercase"),
    uppercase: document.getElementById("uppercase"),
    number: document.getElementById("number"),
    symbol: document.getElementById("symbol")
  };

  const validIcon = `
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  `;
  
  const invalidIcon = `
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  `;

  // Toggle Password Visibility
  toggleBtn.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    toggleBtn.textContent = type === "password" ? "Show" : "Hide";
  });

  // Evaluate Password Strength
  passwordInput.addEventListener("input", (e) => {
    const password = e.target.value;
    
    // Check criteria
    const criteria = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password)
    };

    let score = 0;

    // Update criteria UI
    for (const key in criteria) {
      if (criteria[key]) {
        score++;
        criteriaElements[key].classList.add("valid");
        criteriaElements[key].querySelector(".icon").innerHTML = validIcon;
      } else {
        criteriaElements[key].classList.remove("valid");
        criteriaElements[key].querySelector(".icon").innerHTML = invalidIcon;
      }
    }

    // Default state when empty
    if (password.length === 0) {
      strengthBar.style.width = "0%";
      strengthLabel.textContent = "Weak";
      strengthLabel.style.color = "var(--text-muted)";
      return;
    }

    // Update Progress Bar
    const percentage = (score / 5) * 100;
    strengthBar.style.width = `${percentage}%`;

    // Update Colors and Labels based on score
    if (score <= 2) {
      strengthBar.style.backgroundColor = "var(--color-weak)";
      strengthLabel.textContent = "Weak";
      strengthLabel.style.color = "var(--color-weak)";
    } else if (score === 3 || score === 4) {
      strengthBar.style.backgroundColor = "var(--color-fair)";
      strengthLabel.textContent = "Fair";
      strengthLabel.style.color = "var(--color-fair)";
    } else if (score === 5) {
      // Bonus checks for 'Good' vs 'Strong'
      if (password.length >= 12) {
        strengthBar.style.backgroundColor = "var(--color-strong)";
        strengthLabel.textContent = "Strong";
        strengthLabel.style.color = "var(--color-strong)";
      } else {
        strengthBar.style.backgroundColor = "var(--color-good)";
        strengthLabel.textContent = "Good";
        strengthLabel.style.color = "var(--color-good)";
      }
    }
  });

});
