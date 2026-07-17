document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("promptInput");
  const submitBtn = document.getElementById("submitBtn");
  const container = document.getElementById("promptContainer");

  // Auto-resize textarea as user types
  textarea.addEventListener("input", function() {
    this.style.height = "auto";
    // Cap height at roughly 4 lines (approx 96px depending on line-height)
    const newHeight = Math.min(this.scrollHeight, 120); 
    this.style.height = newHeight + "px";
  });

  // Handle Submission (Enter key or Click)
  const handleSubmit = () => {
    const text = textarea.value.trim();
    if (!text) return;

    // Trigger Generating State
    container.classList.add("generating");
    
    // Simulate AI Response Time (2.5 seconds)
    setTimeout(() => {
      container.classList.remove("generating");
      textarea.value = "";
      textarea.style.height = "auto";
      // Focus back for immediate next question
      textarea.focus();
      
      // Realistically you would append the response to a chat window here
    }, 2500);
  };

  submitBtn.addEventListener("click", handleSubmit);

  textarea.addEventListener("keydown", (e) => {
    // Enter to submit (without shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  });
});
