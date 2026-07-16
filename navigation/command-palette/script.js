document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("paletteOverlay");
  const input = document.getElementById("paletteInput");
  const openBtn = document.getElementById("openPaletteBtn");
  const closeBtn = document.getElementById("closePaletteBtn");
  const resultItems = document.querySelectorAll(".result-item");
  
  let currentIndex = 0;
  let isOpen = false;

  const openPalette = () => {
    isOpen = true;
    overlay.classList.add("open");
    input.value = "";
    input.focus();
    updateActiveItem(0);
  };

  const closePalette = () => {
    isOpen = false;
    overlay.classList.remove("open");
    input.blur();
  };

  const updateActiveItem = (newIndex) => {
    // Remove active class from old item
    resultItems[currentIndex].classList.remove("active");
    
    // Ensure new index is within bounds
    if (newIndex < 0) newIndex = resultItems.length - 1;
    if (newIndex >= resultItems.length) newIndex = 0;
    
    currentIndex = newIndex;
    
    // Add active class to new item
    const newItem = resultItems[currentIndex];
    newItem.classList.add("active");
    
    // Scroll item into view if needed
    newItem.scrollIntoView({ block: "nearest" });
  };

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      isOpen ? closePalette() : openPalette();
    }
    
    if (isOpen) {
      if (e.key === "Escape") {
        e.preventDefault();
        closePalette();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        updateActiveItem(currentIndex + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        updateActiveItem(currentIndex - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const action = resultItems[currentIndex].querySelector(".item-text").textContent;
        alert(`Executing: ${action}`);
        closePalette();
      }
    }
  });

  // UI Event Listeners
  openBtn.addEventListener("click", openPalette);
  closeBtn.addEventListener("click", closePalette);
  
  // Close when clicking outside the palette
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePalette();
  });

  // Hover over items
  resultItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      updateActiveItem(index);
    });
    
    item.addEventListener("click", () => {
      updateActiveItem(index);
      const action = item.querySelector(".item-text").textContent;
      alert(`Executing: ${action}`);
      closePalette();
    });
  });
});
