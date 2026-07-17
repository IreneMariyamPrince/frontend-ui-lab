document.addEventListener("DOMContentLoaded", () => {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("acceptCookiesBtn");
  const declineBtn = document.getElementById("declineCookiesBtn");
  const closeBtn = document.getElementById("closeCookieBtn");
  const resetBtn = document.getElementById("resetConsentBtn");

  const CONSENT_KEY = "frontend_ui_lab_cookie_consent";

  // Check if consent has already been given
  function checkConsent() {
    const hasConsent = localStorage.getItem(CONSENT_KEY);
    
    if (!hasConsent) {
      // Small delay for smooth entry animation on load
      setTimeout(() => {
        cookieBanner.classList.add("show");
      }, 500);
    }
  }

  // Handle consent choice
  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
    hideBanner();
  }

  function hideBanner() {
    cookieBanner.classList.remove("show");
  }

  // Event Listeners
  acceptBtn.addEventListener("click", () => setConsent("accepted"));
  declineBtn.addEventListener("click", () => setConsent("declined"));
  closeBtn.addEventListener("click", () => setConsent("dismissed"));

  // Reset button for demo purposes
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem(CONSENT_KEY);
    alert("Cookie choice reset! The banner will reappear.");
    
    // Add a tiny delay to allow the class to be re-added smoothly
    hideBanner();
    setTimeout(() => {
      checkConsent();
    }, 500);
  });

  // Initialize
  checkConsent();
});
