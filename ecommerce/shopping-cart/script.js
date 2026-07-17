document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openCartBtn");
  const closeBtn = document.getElementById("closeCartBtn");
  const overlay = document.getElementById("cartOverlay");
  const drawer = document.getElementById("cartDrawer");
  
  const cartItemsContainer = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const cartCount = document.getElementById("cartCount");
  
  const subtotalAmount = document.getElementById("subtotalAmount");
  const taxAmount = document.getElementById("taxAmount");
  const totalAmount = document.getElementById("totalAmount");

  const TAX_RATE = 0.08; // 8%

  // Open & Close Drawer
  function toggleCart() {
    overlay.classList.toggle("active");
    drawer.classList.toggle("active");
  }

  openBtn.addEventListener("click", toggleCart);
  closeBtn.addEventListener("click", toggleCart);
  overlay.addEventListener("click", toggleCart);

  // Update Math
  function updateCartMath() {
    const items = cartItemsContainer.querySelectorAll(".cart-item");
    let subtotal = 0;
    let itemCount = 0;

    items.forEach(item => {
      const price = parseFloat(item.getAttribute("data-price"));
      const qty = parseInt(item.querySelector(".qty-input").value);
      
      subtotal += price * qty;
      itemCount += qty;
    });

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    // Update UI
    cartCount.textContent = itemCount;
    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    taxAmount.textContent = `$${tax.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;

    // Handle Empty State
    if (items.length === 0) {
      cartItemsContainer.style.display = "none";
      emptyCart.style.display = "flex";
      // Disable checkout button when empty
      document.querySelector(".checkout-btn").disabled = true;
      document.querySelector(".checkout-btn").style.opacity = "0.5";
      document.querySelector(".checkout-btn").style.cursor = "not-allowed";
    }
  }

  // Event Delegation for Qty changes and Removal
  cartItemsContainer.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;

    const item = target.closest(".cart-item");
    const input = item.querySelector(".qty-input");
    let currentValue = parseInt(input.value);

    // Decrease Qty
    if (target.classList.contains("minus")) {
      if (currentValue > 1) {
        input.value = currentValue - 1;
        updateCartMath();
      }
    } 
    // Increase Qty
    else if (target.classList.contains("plus")) {
      if (currentValue < parseInt(input.getAttribute("max"))) {
        input.value = currentValue + 1;
        updateCartMath();
      }
    } 
    // Remove Item
    else if (target.classList.contains("remove-btn")) {
      item.style.transform = "translateX(20px)";
      item.style.opacity = "0";
      setTimeout(() => {
        item.remove();
        updateCartMath();
      }, 300);
    }
  });

  // Initial Calculation
  updateCartMath();
});
