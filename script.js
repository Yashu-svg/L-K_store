// slider
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");

 if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.toggle("active");
    })
}
// large image slider

const mainImg = document.getElementById("MainImg");
const thumbnails = document.querySelectorAll(".thumb-img");

thumbnails.forEach((img) => {
  img.addEventListener("click", () => {
    mainImg.src = img.src;
  });
});

// cart functionality
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) cartCountEl.textContent = count;
}

function addToCart(name, price, img) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, img, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
  alert('Item added to cart!');
}

function removeFromCart(name) {
  let cart = getCart();
  cart = cart.filter(item => item.name !== name);
  saveCart(cart);
  renderCartItems();
  updateCartCount();
}

function renderCartItems() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  if (!container) return;

  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}" />
      <div>
        <h4>${item.name}</h4>
        <p>₹${item.price} × ${item.quantity}</p>
      </div>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    container.appendChild(div);
  });
}

// Initialize cart count and items on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCartItems();
});
