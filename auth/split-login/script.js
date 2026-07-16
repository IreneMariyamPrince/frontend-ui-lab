document.addEventListener("DOMContentLoaded", () => {
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const loginForm = document.getElementById("loginForm");

  // Toggle Password Visibility
  togglePasswordBtn.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    
    // Toggle Icon (eye vs eye-off)
    if (type === "text") {
      togglePasswordBtn.innerHTML = `
        <svg class="eye-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      `;
    } else {
      togglePasswordBtn.innerHTML = `
        <svg class="eye-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      `;
    }
  });

  // Handle Form Submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = loginForm.querySelector(".submit-btn");
    const originalText = btn.textContent;
    
    // Simulate loading state
    btn.textContent = "Signing in...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    setTimeout(() => {
      alert("Sign in successful! (Dummy action)");
      btn.textContent = originalText;
      btn.style.opacity = "1";
      btn.disabled = false;
      loginForm.reset();
    }, 1500);
  });
});
