document.addEventListener("DOMContentLoaded", () => {
  const sortableList = document.querySelector(".sortable-list");
  const items = document.querySelectorAll(".item");

  items.forEach(item => {
    item.addEventListener("dragstart", () => {
      // Adding a slight delay prevents the dragging element from disappearing 
      // before the browser takes a snapshot of it for the drag image.
      setTimeout(() => item.classList.add("dragging"), 0);
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      item.classList.remove("drag-over");
    });
    
    // Highlight items when dragged over
    item.addEventListener("dragenter", (e) => {
      e.preventDefault();
      const draggingItem = document.querySelector(".dragging");
      if (item !== draggingItem) {
        item.classList.add("drag-over");
      }
    });

    item.addEventListener("dragleave", () => {
      item.classList.remove("drag-over");
    });
  });

  sortableList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    
    // Getting all items except currently dragging and making array of them
    const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
      return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    // Remove drag-over class from all to be safe
    siblings.forEach(sib => sib.classList.remove("drag-over"));
    
    if (nextSibling) {
      nextSibling.classList.add("drag-over");
    }

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
  });
  
  // Clean up classes when dropping anywhere in the list
  sortableList.addEventListener("drop", (e) => {
    e.preventDefault();
    const items = sortableList.querySelectorAll(".item");
    items.forEach(item => item.classList.remove("drag-over"));
  });
});
