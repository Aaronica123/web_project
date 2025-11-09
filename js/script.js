// =============================================
// JumShop – Complete JavaScript Logic
// Works with all 5 HTML pages
// =============================================

// Global Cart (persists across pages)
let cart = JSON.parse(localStorage.getItem('jumshop-cart')) || [];

// Update cart count badge on ALL pages
function updateCartCount() {
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

// Add item to cart
function addToCart(name, price, image) {
  cart.push({ name, price, image });
  localStorage.setItem('jumshop-cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

// Toggle mobile menu
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('show');
  }
}

// Contact form validation
function validateForm() {
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return false;
  }
  if (!email.includes('@') || !email.includes('.')) {
    alert('Please enter a valid email address.');
    return false;
  }
  alert('Thank you! Your message has been sent.');
  document.querySelector('form').reset();
  return false; // Prevent actual submission (demo)
}

// Live search filter on products.html
function filterProducts() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  const query = input.value.toLowerCase();
  const cards = document.querySelectorAll('#productGrid .card');

  cards.forEach(card => {
    const productName = card.getAttribute('data-name') || '';
    card.style.display = productName.includes(query) ? 'block' : 'none';
  });
}

// Load and display cart items on cart.html
function loadCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  const emptyMessage = document.getElementById('empty-cart');

  if (!cartItemsContainer) return;

  // Clear previous content
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    if (emptyMessage) emptyMessage.style.display = 'block';
    if (totalElement) totalElement.textContent = '0';
    return;
  }

  if (emptyMessage) emptyMessage.style.display = 'none';

  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price;

    const cartItemHTML = `
      <div class="card" style="position:relative;">
        <img src="${item.image}" alt="${item.name}">
        <div class="card-body">
          <h3>${item.name}</h3>
          <p class="price">$${item.price}</p>
          <button class="btn" style="background:#e74c3c; font-size:0.9rem; padding:0.5rem 1rem;" 
                  onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.innerHTML += cartItemHTML;
  });

  if (totalElement) totalElement.textContent = totalPrice;
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('jumshop-cart', JSON.stringify(cart));
  updateCartCount();
  loadCart();
}

// Clear entire cart
function clearCart() {
  if (confirm('Clear all items from cart?')) {
    cart = [];
    localStorage.removeItem('jumshop-cart');
    updateCartCount();
    loadCart();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Only run cart-specific code on cart.html
  if (window.location.pathname.includes('cart.html')) {
    loadCart();
  }

  // Auto-hide mobile menu when clicking a link
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobileMenu')?.classList.remove('show');
    });
  });
});