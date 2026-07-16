document.addEventListener("DOMContentLoaded", () => {
  const selectAll = document.getElementById("selectAll");
  const rowCheckboxes = document.querySelectorAll(".row-checkbox");

  // Select All functionality
  selectAll.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    
    rowCheckboxes.forEach(checkbox => {
      checkbox.checked = isChecked;
      
      // Toggle highlight on parent row
      const row = checkbox.closest("tr");
      if (isChecked) {
        row.classList.add("selected");
      } else {
        row.classList.remove("selected");
      }
    });
  });

  // Individual row selection
  rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", (e) => {
      const row = e.target.closest("tr");
      
      if (e.target.checked) {
        row.classList.add("selected");
      } else {
        row.classList.remove("selected");
        // If one is unchecked, 'select all' must be unchecked
        selectAll.checked = false;
      }
      
      // If all are checked individually, check the 'select all' box
      const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
      if (allChecked) {
        selectAll.checked = true;
      }
    });
  });

  // Data state
  const tableRows = Array.from(document.querySelectorAll("#tableBody tr"));
  let filteredRows = [...tableRows];
  let currentPage = 1;
  const rowsPerPage = 4;

  const searchInput = document.querySelector(".search-input input");
  const pageNumbersContainer = document.querySelector(".page-numbers");
  const pageNumbers = Array.from(document.querySelectorAll(".page-num"));
  const prevBtn = document.querySelector(".page-controls .btn-outline:first-child");
  const nextBtn = document.querySelector(".page-controls .btn-outline:last-child");
  const pageInfo = document.querySelector(".page-info");

  const renderTable = () => {
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    // Hide all rows first
    tableRows.forEach(row => row.style.display = "none");

    // Calculate bounds
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredRows.length);

    // Show only the rows for the current page
    for (let i = startIndex; i < endIndex; i++) {
      filteredRows[i].style.display = "";
    }

    // Update UI text
    if (filteredRows.length === 0) {
      pageInfo.textContent = `Showing 0 to 0 of 0 entries`;
    } else {
      pageInfo.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${filteredRows.length} entries`;
    }

    // Update pagination buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    pageNumbers.forEach((btn, index) => {
      const pageNum = index + 1;
      // Hide buttons if they represent pages beyond our total pages
      if (pageNum > totalPages) {
        btn.style.display = "none";
      } else {
        btn.style.display = "inline-block";
        if (pageNum === currentPage) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      }
    });
  };

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    filteredRows = tableRows.filter(row => {
      const name = row.querySelector(".user-name")?.textContent.toLowerCase() || "";
      const role = row.querySelector("td:nth-child(3)")?.textContent.toLowerCase() || "";
      return name.includes(searchTerm) || role.includes(searchTerm);
    });
    
    currentPage = 1;
    renderTable();
  });

  pageNumbers.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      currentPage = index + 1;
      renderTable();
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage) || 1;
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  });

  // Filter Button Mock
  const filterBtn = document.querySelector(".table-actions .btn-outline");
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      alert("Filter modal/dropdown would open here.");
    });
  }

  // Initial render
  renderTable();
});
