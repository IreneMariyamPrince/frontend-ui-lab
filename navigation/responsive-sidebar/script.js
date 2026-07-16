document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggle-btn");

  // Check local storage for sidebar state
  const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
  
  if (isCollapsed) {
    sidebar.classList.add("collapsed");
  }

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    
    // Save state to local storage
    localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed"));
  });
});
