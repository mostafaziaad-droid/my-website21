// script.js for Easy2wear

// Sample product data
const seniorProducts = [
    { id: 1, name: 'Breathable Senior Polo Shirt', price: 900, image: 'https://via.placeholder.com/300x200?text=Polo+Shirt', description: 'Comfortable and easy to wear.' },
    { id: 2, name: 'Elastic Waist Pants', price: 1200, image: 'https://via.placeholder.com/300x200?text=Pants', description: 'Flexible fit for mobility.' },
    { id: 6, name: 'Senior T-Shirt', price: 300, image: 'https://via.placeholder.com/300x200?text=Senior+T-Shirt', description: 'Comfortable t-shirt for seniors.' },
    // Add more products as needed
];

const graduationProducts = [
    { id: 3, name: 'Graduation Gown', price: 1500, image: 'https://via.placeholder.com/300x200?text=Gown', description: 'Elegant cap and gown set.' },
    { id: 4, name: 'Graduation Suit', price: 2400, image: 'https://via.placeholder.com/300x200?text=Suit', description: 'Formal attire for the big day.' },
    { id: 5, name: 'Black Rob Package', price: 150, image: 'https://via.placeholder.com/300x200?text=Black+Rob+Package', description: 'Complete black robe package for graduation.' },
    // Add more products as needed
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function addToCart(productId, category) {
    const products = category === 'senior' ? seniorProducts : graduationProducts;
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Added to cart!');
    }
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h6>${item.name}</h6>
                    <p>EGP${item.price} x ${item.quantity}</p>
                </div>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    cartItems.innerHTML += `<div id="cart-total">Total: EGP${total.toFixed(2)}</div>`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Render products
function renderProducts(products, containerId, category) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    products.forEach(product => {
        container.innerHTML += `
            <div class="col-md-4 product-card">
                <img src="${product.image}" alt="${product.name}">
                <h5>${product.name}</h5>
                <p>EGP${product.price}</p>
                <p>${product.description}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id}, '${category}')">Add to Cart</button>
            </div>
        `;
    });
}

// Checkout functionality
let currentStep = 1;

function showCheckoutStep(step) {
    document.querySelectorAll('.checkout-step').forEach(s => s.style.display = 'none');
    document.getElementById(`checkout-step-${step}`).style.display = 'block';
    currentStep = step;
}

document.getElementById('next-step-1').addEventListener('click', () => {
    if (document.getElementById('shipping-form').checkValidity()) {
        showCheckoutStep(2);
    } else {
        alert('Please fill in all shipping details.');
    }
});

document.getElementById('next-step-2').addEventListener('click', () => {
    showCheckoutStep(3);
});

document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate payment processing
    alert('Payment processed successfully! Order confirmed.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    bootstrap.Modal.getInstance(document.getElementById('checkoutModal')).hide();
    bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
});

// Chatbot functionality
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    const body = document.getElementById('chatbot-body');
    body.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    input.value = '';

    // General response for any question
    const responses = [
        "Thank you for your question! I'm here to help with any inquiries about our products, orders, or services.",
        "That's a great question! Let me assist you with that. What specific information are you looking for?",
        "I'm happy to help! Feel free to ask me anything about Easy2wear, our clothing, or how to place an order.",
        "Thanks for reaching out! How can I make your shopping experience better today?"
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    setTimeout(() => {
        body.innerHTML += `<p><strong>zizi:</strong> ${randomResponse}</p>`;
        body.scrollTop = body.scrollHeight;
    }, 500);
}

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Event listeners
document.getElementById('cart-link').addEventListener('click', (e) => {
    e.preventDefault();
    renderCart();
    new bootstrap.Modal(document.getElementById('cartModal')).show();
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    new bootstrap.Modal(document.getElementById('checkoutModal')).show();
    showCheckoutStep(1);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(seniorProducts, 'senior-products', 'senior');
    renderProducts(graduationProducts, 'graduation-products', 'graduation');
    updateCartCount();
});
// HTML
<span id="close-chat">×</span>

// JS
document.getElementById("close-chat").onclick = function() {
    document.getElementById("chat-box").style.display = "none";
};
