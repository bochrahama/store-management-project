let cartCount = 0;
let cartTotal = 0;

const buttons = document.querySelectorAll(".cart-box button");

buttons.forEach(button => {
  button.addEventListener("click", () => {

    const card = button.closest(".card");

    let priceText = card.querySelector(".price").textContent;
    let price = parseInt(priceText.replace(/\D/g, ""));

    let quantity = parseInt(card.querySelector("input").value);

    cartCount += quantity;
    cartTotal += price * quantity;

    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("cart-total").textContent = cartTotal;

   
    button.textContent = "Added!";
    setTimeout(() => {
      button.textContent = "Add to cart";
    }, 1000);
  });
}); 
const checkoutBtn = document.getElementById("checkout-btn");
const finalMessage = document.getElementById("final-message");

checkoutBtn.addEventListener("click", () => {

  if (cartCount === 0) {
    finalMessage.textContent = "Your cart is empty ";
    return;
  }

  finalMessage.textContent = 
    "Order placed! Total: " + cartTotal + " DA";


  console.log("Saved order:", order);

  // reset cart
  cartCount = 0;
  cartTotal = 0;

  document.getElementById("cart-count").textContent = 0;
  document.getElementById("cart-total").textContent = 0;
});