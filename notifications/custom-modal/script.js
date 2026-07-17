document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("openModalBtn");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modal = document.getElementById("customModal");
  const closeIcon = document.getElementById("closeModalIcon");
  const cancelBtn = document.getElementById("cancelModalBtn");
  const confirmBtn = document.getElementById("confirmModalBtn");

  // Keep track of the element that had focus before modal opened
  let previousActiveElement;

  function openModal() {
    previousActiveElement = document.activeElement;
    
    modalBackdrop.classList.add("active");
    modal.classList.add("active");
    document.body.classList.add("modal-open");
    
    // Update aria
    modalBackdrop.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "false");

    // Set focus to the first focusable element inside modal (close icon)
    setTimeout(() => {
      closeIcon.focus();
    }, 100);
  }

  function closeModal() {
    modalBackdrop.classList.remove("active");
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    
    // Update aria
    modalBackdrop.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "true");

    // Restore focus
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  }

  // Event Listeners for opening/closing
  openModalBtn.addEventListener("click", openModal);
  closeIcon.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  // Handle Confirm action
  confirmBtn.addEventListener("click", () => {
    confirmBtn.textContent = "Deleting...";
    confirmBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      closeModal();
      // Reset button state after closing
      setTimeout(() => {
        confirmBtn.textContent = "Yes, delete account";
        confirmBtn.disabled = false;
        alert("Account deleted simulation complete.");
      }, 300);
    }, 1000);
  });

  // Handle Escape key and Focus Trapping
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    }

    if (e.key === "Tab") {
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } 
      // Tab
      else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
});
