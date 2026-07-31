// Sample products
const products = [
  {id: 1, name: "iPhone 15", price: 999, category: "phone", img: "https://via.placeholder.com/250"},
  {id: 2, name: "MacBook Pro", price: 1999, category: "laptop", img: "https://via.placeholder.com/250"},
  {id: 3, name: "Wireless Earbuds", price: 199, category: "accessory", img: "https://via.placeholder.com/250"},
  {id: 4, name: "Samsung Galaxy", price: 899, category: "phone", img: "https://via.placeholder.com/250"},
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productsGrid = document.getElementById('products');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartSection = document.getElementById('cart');

// Render products
function renderProducts(list) {
  productsGrid.innerHTML = '';
  list.forEach(p => {
    productsGrid.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Cart functions
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  saveCart();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - $${item.price}</span>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Search and Filter
document.getElementById('search').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});

document.getElementById('filter').addEventListener('change', (e) => {
  const cat = e.target.value;
  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
  renderProducts(filtered);
});

// Dark mode
document.getElementById('darkToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Show/Hide Cart
document.getElementById('cartBtn').addEventListener('click', () => {
  cartSection.classList.toggle('hidden');
});

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
  alert('Order placed! Total: $' + cartTotal.textContent);
  cart = [];
  saveCart();
  renderCart();
});

renderProducts(products);
renderCart();