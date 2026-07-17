document.addEventListener("DOMContentLoaded", () => {
  const customSelect = document.getElementById("customSelect");
  const selectTrigger = document.getElementById("selectTrigger");
  const selectedValue = selectTrigger.querySelector(".selected-value");
  const options = document.querySelectorAll(".option");

  // Toggle Dropdown
  selectTrigger.addEventListener("click", () => {
    const isOpen = customSelect.classList.contains("open");
    customSelect.classList.toggle("open");
    selectTrigger.setAttribute("aria-expanded", !isOpen);
  });

  // Handle Option Selection
  options.forEach(option => {
    option.addEventListener("click", () => {
      // Remove selected class from all
      options.forEach(opt => opt.classList.remove("selected"));
      
      // Add selected class to clicked
      option.classList.add("selected");
      
      // Update trigger text (including emoji)
      const iconHTML = option.querySelector(".option-icon").outerHTML;
      const text = option.querySelector("span").innerText;
      
      // Use innerHTML to keep the icon in the trigger
      selectedValue.innerHTML = `<span style="display:flex; align-items:center; gap:8px;">${iconHTML} ${text}</span>`;
      
      // Close dropdown
      customSelect.classList.remove("open");
      selectTrigger.setAttribute("aria-expanded", "false");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("open");
      selectTrigger.setAttribute("aria-expanded", "false");
    }
  });

  // Keyboard Accessibility
  selectTrigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectTrigger.click();
    }
  });
});
