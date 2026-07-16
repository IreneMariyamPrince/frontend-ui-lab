document.addEventListener("DOMContentLoaded", () => {
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  let timeoutId;

  dropdownItems.forEach(item => {
    // We add the 'active' class via JS to allow for a slight delay before hiding,
    // improving UX so the menu doesn't disappear instantly if the mouse slips.
    
    item.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId);
      item.classList.add('active');
    });

    item.addEventListener('mouseleave', () => {
      // 150ms delay before hiding
      timeoutId = setTimeout(() => {
        item.classList.remove('active');
      }, 150);
    });
  });
});
