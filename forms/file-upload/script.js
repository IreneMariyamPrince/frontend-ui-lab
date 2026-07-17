document.addEventListener("DOMContentLoaded", () => {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const uploadList = document.getElementById("uploadList");
  const saveBtn = document.getElementById("saveBtn");

  // Prevent default behavior for drag events
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Highlight dropzone when item is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => dropzone.classList.add('dragover'), false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => dropzone.classList.remove('dragover'), false);
  });

  // Handle dropped files
  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  });

  // Handle files selected via input click
  fileInput.addEventListener('change', function() {
    handleFiles(this.files);
  });

  function handleFiles(files) {
    [...files].forEach(file => {
      // Validate file size (e.g. 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Max size is 10MB.`);
        return;
      }
      simulateUpload(file);
    });
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  function simulateUpload(file) {
    saveBtn.disabled = false;
    
    // Create UI elements
    const fileItem = document.createElement("div");
    fileItem.className = "file-item";

    const svgIcon = `
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
    `;

    fileItem.innerHTML = `
      <div class="file-icon">${svgIcon}</div>
      <div class="file-details">
        <div class="file-name">${file.name}</div>
        <div class="file-meta">
          <span class="file-size">${formatBytes(file.size)}</span>
          <span class="file-status">0%</span>
        </div>
        <div class="progress-bg">
          <div class="progress-fill"></div>
        </div>
      </div>
    `;

    uploadList.appendChild(fileItem);

    const progressFill = fileItem.querySelector(".progress-fill");
    const fileStatus = fileItem.querySelector(".file-status");

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15; // random jump
      if (progress > 100) progress = 100;
      
      progressFill.style.width = `${progress}%`;
      fileStatus.textContent = `${Math.round(progress)}%`;

      if (progress === 100) {
        clearInterval(interval);
        progressFill.classList.add("completed");
        fileStatus.textContent = "Completed";
        fileStatus.style.color = "var(--success)";
      }
    }, 200);
  }

  saveBtn.addEventListener("click", () => {
    saveBtn.textContent = "Saving...";
    setTimeout(() => {
      saveBtn.textContent = "Saved Successfully!";
      saveBtn.style.backgroundColor = "var(--success)";
      setTimeout(() => {
        saveBtn.textContent = "Save files";
        saveBtn.style.backgroundColor = "var(--primary)";
        uploadList.innerHTML = '';
        saveBtn.disabled = true;
      }, 2000);
    }, 1000);
  });
});
