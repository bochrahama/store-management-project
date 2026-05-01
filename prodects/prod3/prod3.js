// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const buttons = document.querySelectorAll(".cart-box button");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const finalMessage = document.getElementById("final-message");


function updateCartUI() {
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  cartCountEl.textContent = totalItems;
  cartTotalEl.textContent = totalPrice;
}

// add to chart
buttons.forEach(button => {
  button.addEventListener("click", () => {

    const card = button.closest(".card");

    let name = card.querySelector("h3").textContent;
    let priceText = card.querySelector(".price").textContent;
    let price = parseInt(priceText.replace(/\D/g, ""));
    let quantity = parseInt(card.querySelector("input").value);

    cart.push({
      name: name,
      price: price,
      quantity: quantity
    });

    // save
    localStorage.setItem("cart", JSON.stringify(cart));

    // update 
    updateCartUI();

    // button feedback
    button.textContent = "Added!";
    setTimeout(() => {
      button.textContent = "Add to cart";
    }, 1000);
  });
});

// checkout
checkoutBtn.addEventListener("click", () => {

  if (cart.length === 0) {
    finalMessage.textContent = "Your cart is empty";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  finalMessage.textContent = "Order placed! Total: " + total + " DA";

  // save order 
  localStorage.setItem("order", JSON.stringify(cart));

  console.log("Saved order:", cart);

  // clear cart
  cart = [];
  localStorage.removeItem("cart");

  updateCartUI();
});


updateCartUI();