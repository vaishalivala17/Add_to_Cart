let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");
const discountEl = document.getElementById("discount");
const payableEl = document.getElementById("payable");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function changeQty(id, type) {
  let item = cart.find(c => c.id === id);
  if (type === "increase") {
    item.qty++;
  } else if (type === "decrease" && item.qty > 1) {
    item.qty--;
  }
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
}

function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").innerText = count;
}

function renderCart() {
  cartEl.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartEl.innerHTML = "<p>Cart is empty</p>";
    totalEl.innerText = "0";
    discountEl.innerText = "0";
    payableEl.innerText = "0";
    return;
  }

  cart.forEach(c => {
    total += c.price * c.qty;
    cartEl.innerHTML += `
      <div class="cart-item">
        <img src="${c.thumbnail}" alt="${c.title}">
        <h4>${c.title}</h4>
        <p>₹${c.price} x ${c.qty}</p>
        <div>
          <button onclick="changeQty(${c.id}, 'decrease')">-</button>
          <button onclick="changeQty(${c.id}, 'increase')">+</button>
          <button onclick="removeFromCart(${c.id})">Remove</button>
        </div>
      </div>
    `;
  });

  // Apply discount if >= 5000
  let discount = 0;
  if (total >= 5000) {
    discount = total * 0.05;
  }
  let payable = total - discount;

  totalEl.innerText = total.toFixed(2);
  discountEl.innerText = discount.toFixed(2);
  payableEl.innerText = payable.toFixed(2);
}

renderCart();
updateCartCount();
