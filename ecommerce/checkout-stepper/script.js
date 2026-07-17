document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step-item");
  const progressLine = document.getElementById("progressLine");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  const stepHeader = document.getElementById("stepHeader");
  
  let currentStep = 2; // Starting at step 2 (Shipping) for demo purposes
  const totalSteps = steps.length;

  const stepTitles = [
    "Cart Review",
    "Shipping Information",
    "Payment Details",
    "Order Review & Confirm"
  ];

  const btnText = [
    "Continue to Shipping",
    "Continue to Payment",
    "Review Order",
    "Place Order"
  ];

  const checkIcon = `
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
  `;

  function updateStepper() {
    // Update active/completed classes
    steps.forEach((step, index) => {
      const stepNum = index + 1;
      const circle = step.querySelector(".step-circle");

      // Reset
      step.classList.remove("active", "completed");
      circle.innerHTML = stepNum;

      if (stepNum < currentStep) {
        step.classList.add("completed");
        circle.innerHTML = checkIcon;
      } else if (stepNum === currentStep) {
        step.classList.add("active");
      }
    });

    // Update Progress Line
    // We have 4 steps, meaning 3 segments. So width = (currentStep - 1) / 3 * 100%
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressLine.style.width = `${progressPercentage}%`;

    // Update Mock Content
    stepHeader.textContent = stepTitles[currentStep - 1];

    // Update Buttons
    if (currentStep === 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    if (currentStep === totalSteps) {
      nextBtn.textContent = btnText[currentStep - 1];
      nextBtn.classList.add("completed-btn"); // Could add specific styling
    } else {
      nextBtn.textContent = btnText[currentStep - 1];
      nextBtn.classList.remove("completed-btn");
    }
  }

  nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps) {
      currentStep++;
      updateStepper();
    } else {
      alert("Order placed successfully!");
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      updateStepper();
    }
  });

  // Initialize
  updateStepper();
});
