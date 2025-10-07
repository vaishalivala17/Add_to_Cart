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
        cartEl.innerHTML = "<h3>Cart is empty</h3>";
        totalEl.innerText = "0";
        discountEl.innerText = "0";
        payableEl.innerText = "0";
        return;
    }

let rows = "";

// Create all table rows first
cart.forEach(c => {
  total += c.price * c.qty;
  rows += `
    <tr class="cart-item fw-bold text-center align-middle">
      <td><img class="mx-5" src="${c.thumbnail}" alt="${c.title}"></td>
      <td><h4>${c.title}</h4></td>
      <td><p>₹${c.price}</p></td>
      <td><p>${c.qty}</p></td>
      <td><p>₹${c.price * c.qty}</p></td>
      <td>
        <button onclick="changeQty(${c.id}, 'decrease')">-</button>
        <button onclick="changeQty(${c.id}, 'increase')">+</button>
        <button onclick="removeFromCart(${c.id})">Remove</button>
      </td>
    </tr>
  `;
});

// Then add everything to cartEl *once*
cartEl.innerHTML = `
  <h2 class="text-center fw-bold my-3">Your Cart</h2>
  <table class="table table-bordered text-center">
    <thead class="table-dark">
      <tr>
        <th>Image</th>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
`;


    // Apply discount if >= 2000
    let discount = 0;
    if (total >= 2000) {
        discount = total * 0.05;
    }
    let payable = total - discount;

    totalEl.innerText = total.toFixed(2);
    discountEl.innerText = discount.toFixed(2);
    payableEl.innerText = payable.toFixed(2);
}


renderCart();
updateCartCount();
