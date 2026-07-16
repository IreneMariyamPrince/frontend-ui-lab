document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".otp-field");
  const submitBtn = document.querySelector(".submit-btn");
  const form = document.getElementById("otpForm");

  // Focus first input on load
  inputs[0].focus();

  const checkCompletion = () => {
    const isComplete = Array.from(inputs).every(input => input.value.length === 1);
    submitBtn.disabled = !isComplete;
  };

  inputs.forEach((input, index) => {
    // Handle input (auto-advance)
    input.addEventListener("input", (e) => {
      // Allow only numbers
      input.value = input.value.replace(/[^0-9]/g, "");

      if (input.value !== "") {
        // Move to next input if available
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
      checkCompletion();
    });

    // Handle backspace (auto-return)
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        if (input.value === "" && index > 0) {
          // Move to previous input and clear it
          inputs[index - 1].focus();
          inputs[index - 1].value = "";
        } else {
          input.value = "";
        }
        checkCompletion();
      }
    });

    // Handle paste
    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, inputs.length);
      
      if (pastedData) {
        // Distribute pasted characters across inputs starting from current index
        let currIndex = index;
        for (let i = 0; i < pastedData.length; i++) {
          if (currIndex < inputs.length) {
            inputs[currIndex].value = pastedData[i];
            currIndex++;
          }
        }
        
        // Focus the next empty input or the last one
        const focusIndex = Math.min(index + pastedData.length, inputs.length - 1);
        inputs[focusIndex].focus();
        
        checkCompletion();
      }
    });
  });

  // Handle Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const otpCode = Array.from(inputs).map(input => input.value).join("");
    
    // Simulate verification
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Verifying...";
    submitBtn.disabled = true;
    
    // Dummy check (let's say 123456 is correct, others fail)
    setTimeout(() => {
      if (otpCode === "123456") {
        alert("Verification successful!");
        submitBtn.textContent = "Success!";
        submitBtn.style.backgroundColor = "#10b981";
      } else {
        inputs.forEach(input => input.classList.add("error"));
        setTimeout(() => {
          inputs.forEach(input => {
            input.classList.remove("error");
            input.value = "";
          });
          inputs[0].focus();
          checkCompletion();
        }, 500);
        alert("Invalid code. Try 123456");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }, 1000);
  });

});
