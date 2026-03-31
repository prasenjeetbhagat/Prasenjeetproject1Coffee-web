// Global cart state
let cart = [];

// Mobile hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add to cart functionality (attached to all buttons)
document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const name = productCard.dataset.name;
        const price = parseFloat(productCard.dataset.price);
        
        cart.push({ name, price });
        updateCartDisplay();
        
        // Visual feedback
        const originalText = this.textContent;
        this.textContent = '✅ Added!';
        this.style.background = '#28a745';
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 1200);
    });
});

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; opacity: 0.8;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(255,255,255,0.2);">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})" style="background: #dc3545; color: white; border: none; padding: 5px 12px; border-radius: 20px; cursor: pointer; font-size: 0.9rem;">Remove</button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toFixed(2);
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Checkout functionality
document.querySelector('.checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('❌ Your cart is empty! Add some coffee first ☕');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`✅ Thank you for your order!\n\nTotal: $${total.toFixed(2)}\n\nYour coffee is being prepared! ☕✨`);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
});

// Login form validation
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('❌ Please fill all fields');
        return;
    }
    
    // Demo credentials (change as needed)
    if (username === 'admin' && password === 'coffee123') {
        alert(`✅ Welcome back, ${username}! 🎉\n\nEnjoy exclusive gallery access!`);
        this.reset();
    } else {
        alert('❌ Invalid credentials. Try: admin / coffee123');
    }
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Thank you! Your message has been sent.\n\nWe\'ll get back to you soon! ☕');
    this.reset();
});

// Navbar scroll effect (enhances your fixed navbar)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(59, 20, 28, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.background = 'rgba(59, 20, 28, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for smooth entrance animations
document.querySelectorAll('.menu-section, .order-section, .gallery-section, .contact-section, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
});

// Button hover effects for your exact buttons
document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});