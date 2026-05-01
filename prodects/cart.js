// Load cart from storage (shared across pages)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements (must exist on every page)
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const finalMessage = document.getElementById("final-message");

// --------------------
// UPDATE UI FUNCTION
// --------------------
function updateCartUI() {
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  if (cartCountEl) cartCountEl.textContent = totalItems;
  if (cartTotalEl) cartTotalEl.textContent = totalPrice;
}

// --------------------
// ADD TO CART (works on ALL pages)
// --------------------
document.querySelectorAll(".cart-box button").forEach(button => {
  button.addEventListener("click", () => {

    const card = button.closest(".card");

    let name = card.querySelector("h3").textContent;
    let price = parseInt(card.querySelector(".price").textContent.replace(/\D/g, ""));
    let quantity = parseInt(card.querySelector("input").value);

    // check if product already exists
    let existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();

    button.textContent = "Added!";
    setTimeout(() => button.textContent = "Add to cart", 800);
  });
});

// --------------------
// CHECKOUT (footer button)
// --------------------
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {
      if (finalMessage) finalMessage.textContent = "Your cart is empty";
      return;
    }

    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
    });

    if (finalMessage) {
      finalMessage.textContent = "Order placed! Total: " + total + " DA";
    }

    // Save order (teacher requirement)
    localStorage.setItem("order", JSON.stringify(cart));

    // Clear cart
    cart = [];
    localStorage.removeItem("cart");

    updateCartUI();
  });
}

// --------------------
// INIT ON PAGE LOAD
// --------------------
updateCartUI();