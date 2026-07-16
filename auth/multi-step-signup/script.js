document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const sections = document.querySelectorAll(".form-section");
  const progressFill = document.getElementById("progressFill");
  
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const form = document.getElementById("multiStepForm");

  let currentStep = 1;
  const totalSteps = steps.length;

  const updateUI = () => {
    // Update progress bar width
    // If 3 steps: step 1 = 0%, step 2 = 50%, step 3 = 100%
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${progress}%`;

    // Update step circles
    steps.forEach((step, index) => {
      const stepNum = index + 1;
      step.classList.remove("active", "completed");
      
      if (stepNum === currentStep) {
        step.classList.add("active");
      } else if (stepNum < currentStep) {
        step.classList.add("completed");
        // Change text in circle to checkmark if desired:
        step.querySelector(".step-circle").innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
        `;
      } else {
        // Reset text in circle to number
        step.querySelector(".step-circle").textContent = stepNum;
      }
    });

    // Update form sections
    sections.forEach((section, index) => {
      const sectionNum = index + 1;
      if (sectionNum === currentStep) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  };

  // Input validation logic (simple check for required fields)
  const validateStep = (stepIndex) => {
    const section = sections[stepIndex - 1];
    const inputs = section.querySelectorAll("input[required]");
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim() || (input.type === "checkbox" && !input.checked)) {
        isValid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });
    
    // Check passwords match on step 3
    if (stepIndex === 3) {
      const pass = document.getElementById("password").value;
      const confirm = document.getElementById("confirmPassword").value;
      if (pass !== confirm && pass !== "") {
        isValid = false;
        document.getElementById("confirmPassword").classList.add("error");
      }
    }

    return isValid;
  };

  // Remove error class on input
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("error");
    });
  });

  // Next Buttons
  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
          currentStep++;
          updateUI();
        }
      }
    });
  });

  // Previous Buttons
  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--;
        updateUI();
      }
    });
  });

  // Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      const submitBtn = form.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = "Creating...";
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("Account successfully created!");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Reset form
        form.reset();
        currentStep = 1;
        updateUI();
      }, 1500);
    }
  });

  // Init UI
  updateUI();
});
