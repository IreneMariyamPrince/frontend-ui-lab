const icons = {
  success: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  error: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
  info: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  warning: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
};

function showToast(type, title, message) {
  const container = document.getElementById('toastContainer');
  
  // Create toast element
  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  
  toast.innerHTML = `
    <div class="toast-icon">${icons[type]}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Close notification">
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  `;
  
  // Append to container
  container.appendChild(toast);
  
  // Trigger reflow to enable transition
  toast.offsetHeight;
  
  // Slide in
  toast.classList.add('show');
  
  // Setup removal logic
  const duration = 5000; // 5 seconds
  let timeoutId;
  
  const removeToast = () => {
    toast.classList.remove('show');
    toast.classList.add('hiding');
    // Wait for animation to finish before removing from DOM
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 400); // 400ms matches CSS transition duration
  };
  
  // Auto-remove
  timeoutId = setTimeout(removeToast, duration);
  
  // Manual remove via button
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(timeoutId);
    removeToast();
  });
}
