// ==========================
// Variables
// ==========================

let count = 0;
let orders = [];
let totalprice = 0;

// ==========================
// Load Saved Cart
// ==========================

function loadCart() {

    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    let savedCount = Number(localStorage.getItem("count")) || 0;

    orders = savedCart;
    count = savedCount;

    if (count === 0) {
        count = orders.reduce((sum, item) => sum + item.quantity, 0);
    }

}

// ==========================
// Add Food
// ==========================

function orderFood(foodName, price) {

    let item = orders.find(order => order.name === foodName);

    if (item) {

        item.quantity++;

    } else {

        let imagePath =
            foodName === "pizza"
                ? "images/pizza1.jpg"
                : `images/${foodName}.jpg`;

        orders.push({
            name: foodName,
            price: price,
            quantity: 1,
            image: imagePath
        });

    }

    count++;

    updateCart();

}

// ==========================
// Update Cart
// ==========================

function updateCart() {

    const list = document.getElementById("orderList");

    if (!list) return;

    list.innerHTML = "";

    totalprice = 0;

    orders.forEach(item => {

        totalprice += item.price * item.quantity;

        list.innerHTML += `

        <li class="cart-item">

            <img src="${item.image}" class="cart-img">

            <span>${item.name}</span>

            <button onclick="decreaseQuantity('${item.name}')">-</button>

            <span>${item.quantity}</span>

            <button onclick="increaseQuantity('${item.name}')">+</button>

            <span>${(item.price * item.quantity).toFixed(2)} €</span>

            <button class="delete-btn"
                onclick="removeItem('${item.name}')">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </li>

        `;

    });

    const orderCount = document.getElementById("orderCount");
    if (orderCount) {
        orderCount.innerText = count;
    }

    const totalElement = document.getElementById("totalprice");
    if (totalElement) {
        totalElement.innerText = totalprice.toFixed(2);
    }

    const emptyCart = document.getElementById("emptyCart");
    if (emptyCart) {
        emptyCart.style.display = orders.length === 0 ? "block" : "none";
    }

    localStorage.setItem("cart", JSON.stringify(orders));
    localStorage.setItem("count", count);
    localStorage.setItem("totalPrice", totalprice);

}

// ==========================
// Increase Quantity
// ==========================

function increaseQuantity(foodName) {

    let item = orders.find(order => order.name === foodName);

    if (!item) return;

    item.quantity++;
    count++;

    updateCart();

}

// ==========================
// Decrease Quantity
// ==========================

function decreaseQuantity(foodName) {

    let item = orders.find(order => order.name === foodName);

    if (!item) return;

    item.quantity--;
    count--;

    if (item.quantity <= 0) {

        orders = orders.filter(order => order.name !== foodName);

    }

    if (count < 0) {
        count = 0;
    }

    updateCart();

}

// ==========================
// Remove Item
// ==========================

function removeItem(foodName) {

    let item = orders.find(order => order.name === foodName);

    if (!item) return;

    count -= item.quantity;

    orders = orders.filter(order => order.name !== foodName);

    if (count < 0) {
        count = 0;
    }

    updateCart();

    if (count === 0) {
        closeCart();
    }

}

// ==========================
// Clear Cart
// ==========================

function clearOrders() {

    count = 0;
    orders = [];
    totalprice = 0;

    localStorage.removeItem("cart");
    localStorage.removeItem("count");
    localStorage.removeItem("totalPrice");

    const orderCount = document.getElementById("orderCount");
    if (orderCount) {
        orderCount.innerText = "0";
    }

    const orderList = document.getElementById("orderList");
    if (orderList) {
        orderList.innerHTML = "";
    }

    const totalElement = document.getElementById("totalprice");
    if (totalElement) {
        totalElement.innerText = "0.00";
    }

    const emptyCart = document.getElementById("emptyCart");
    if (emptyCart) {
        emptyCart.style.display = "block";
    }

    closeCart();

}

// اگر در HTML هنوز نوشته‌ای:
// onclick="clearorders()"
// این تابع را نگه دار

function clearorders() {
    clearOrders();
}

// ==========================
// Open Cart
// ==========================

function openCart() {

    const cartBox = document.getElementById("cartbox");

    if (cartBox) {
        cartBox.classList.add("show");
    }

}

// ==========================
// Close Cart
// ==========================

function closeCart() {

    const cartBox = document.getElementById("cartbox");

    if (cartBox) {
        cartBox.classList.remove("show");
    }

}

// ==========================
// Checkout
// ==========================

function checkout() {

    if (orders.length === 0) {

        alert("Your cart is empty.");
        return;

    }

    localStorage.setItem("cart", JSON.stringify(orders));
    localStorage.setItem("count", count);
    localStorage.setItem("totalPrice", totalprice);

    window.location.href = "checkout.html";

}

// ==========================
// Page Load
// ==========================

window.addEventListener("load", function () {

    loadCart();

    if (document.getElementById("orderList")) {
        updateCart();
    }

    if (document.getElementById("ordersContainer")) {
        loadOrders();
    }

});

// ==========================
// Search Food
// ==========================

function searchFood() {

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const foodName = card
            .querySelector("h3")
            .innerText
            .toLowerCase();

        if (foodName.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}

// اگر در HTML هنوز searchfood() نوشته‌ای
function searchfood() {
    searchFood();
}

// ==========================
// Offers
// ==========================

function openOffers() {

    const offers = document.getElementById("offersBox");

    if (offers) {
        offers.classList.add("show");
    }

}

function closeOffers() {

    const offers = document.getElementById("offersBox");

    if (offers) {
        offers.classList.remove("show");
    }

}

// ==========================
// Mobile Menu
// ==========================

function toggleMenu() {

    const menu = document.getElementById("sideMenu");

    if (menu) {
        menu.classList.toggle("active");
    }

}

function closeMenu() {

    const menu = document.getElementById("sideMenu");

    if (menu) {
        menu.classList.remove("active");
    }

}

// ==========================
// Offer Timer
// ==========================

let hours = 2;
let minutes = 0;
let seconds = 0;

function updateTimer() {

    const timer = document.getElementById("timer");

    if (!timer) return;

    timer.innerHTML =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");

}

const timerInterval = setInterval(function () {

    if (!document.getElementById("timer")) return;

    if (seconds > 0) {

        seconds--;

    } else if (minutes > 0) {

        minutes--;
        seconds = 59;

    } else if (hours > 0) {

        hours--;
        minutes = 59;
        seconds = 59;

    }

    updateTimer();

    if (hours === 0 && minutes === 0 && seconds === 0) {

        clearInterval(timerInterval);

        const timer = document.getElementById("timer");

        if (timer) {
            timer.innerHTML = "Offer Expired";
        }

    }

}, 1000);

// ==========================
// Scroll To Top
// ==========================

window.onscroll = function () {

    const topBtn = document.getElementById("topBtn");

    if (!topBtn) return;

    if (document.documentElement.scrollTop > 200 ||
        document.body.scrollTop > 200) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

};

function goTop() {

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

}

// ==========================
// Checkout Form
// ==========================

function submitOrder(event) {

    event.preventDefault();

    if (orders.length === 0) {

        alert("Your cart is empty.");
        return;

    }

    window.location.href = "payment.html";

}

// ==========================
// Payment
// ==========================

function payByCard() {
    alert("Credit Card payment is not connected yet.");
}

function payByPayPal() {
    alert("PayPal payment is not connected yet.");
}

function payByApple() {
    alert("Apple Pay is not connected yet.");
}

function payByGoogle() {
    alert("Google Pay is not connected yet.");
}

function cashOnDelivery() {

    orders = JSON.parse(localStorage.getItem("cart")) || [];

    let history = JSON.parse(localStorage.getItem("orderHistory")) || [];

    // Calculate total
    let total = orders.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    history.push({
        items: [...orders],
        total: total.toFixed(2),
        date: new Date().toLocaleString(),
        status: "Completed"
    });

    localStorage.setItem("orderHistory", JSON.stringify(history));

    localStorage.removeItem("cart");
    localStorage.removeItem("count");
    localStorage.removeItem("totalPrice");

    orders = [];
    count = 0;
    totalprice = 0;

    alert("Your order has been placed successfully!");

    window.location.href = "Orders.html";

}

function payNow(event) {

    event.preventDefault();
    orders = JSON.parse(localStorage.getItem("cart")) || [];
count = Number(localStorage.getItem("count")) || 0;

    let history = JSON.parse(localStorage.getItem("orderHistory")) || [];

    // Calculate total before clearing the cart
    let total = orders.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    // Create new order
    let newOrder = {
        items: [...orders],
        total: total.toFixed(2),
        date: new Date().toLocaleString(),
        status: "Completed"
    };

    // Save order
    history.push(newOrder);
    localStorage.setItem("orderHistory", JSON.stringify(history));

    // Clear cart
    localStorage.removeItem("cart");
    localStorage.removeItem("count");
    localStorage.removeItem("totalPrice");

    orders = [];
    count = 0;
    totalprice = 0;

    // Show success message
    const modal = document.getElementById("paymentSuccess");

    if (modal) {
        modal.style.display = "flex";
    }
}

function backHome() {

    window.location.href = "Orders.html";

}


// ==========================
// Order History
// ==========================

function loadOrders() {

    const container = document.getElementById("ordersContainer");

    if (!container) return;

    let history = JSON.parse(localStorage.getItem("orderHistory")) || [];

    if (history.length === 0) {

        container.innerHTML = `
            <p class="empty-orders">
                No orders yet.
            </p>
        `;

        return;
    }

    container.innerHTML = "";

    history.forEach((order, index) => {

        let itemsHTML = "";

        order.items.forEach(item => {

            itemsHTML += `

                <div class="history-item">

                    <img src="${item.image}" class="history-img">

                    <div>

                        <h4>${item.name}</h4>

                        <p>Quantity: ${item.quantity}</p>

                        <p>${Number(item.price).toFixed(2)} €</p>

                    </div>

                </div>

            `;

        });

        container.innerHTML += `

            <div class="history-card">

                <h3>Order #${index + 1}</h3>

                <p><strong>Date:</strong> ${order.date}</p>

                <p><strong>Status:</strong> ${order.status || "Completed"} </p>

                ${itemsHTML}

                <h2>Total: ${Number(order.total).toFixed(2)} €</h2>

            </div>

        `;

    });

}

// ==========================
// Favorite
// ==========================

function toggleFavorite(element) {

    element.classList.toggle("active");

    if (element.classList.contains("active")) {
        element.innerHTML = "🖤";
    } else {
        element.innerHTML = "♡";
    }

}

// ==========================
// Customer Reviews
// ==========================

function rateFood(star, rating) {

    const card = star.closest(".card");

    const foodName = card.querySelector("h3").innerText;

    if (localStorage.getItem(foodName + "-voted")) {

        alert("You have already rated this food.");

        return;

    }

    const stars = card.querySelectorAll(".stars span");

    stars.forEach((item, index) => {

        if (index < rating) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });

    let average = card.querySelector(".average");
    let reviews = card.querySelector(".review");

    let oldAverage = parseFloat(average.innerText);
    let oldReviews = parseInt(reviews.innerText);

    let newReviews = oldReviews + 1;

    let newAverage =
        ((oldAverage * oldReviews) + rating) / newReviews;

    average.innerText = newAverage.toFixed(1);
    reviews.innerText = newReviews + " Reviews";

    localStorage.setItem(foodName + "-rating", newAverage);
    localStorage.setItem(foodName + "-reviews", newReviews);
    localStorage.setItem(foodName + "-voted", "true");

}

// ==========================
// Load Ratings
// ==========================

window.addEventListener("load", function () {

    document.querySelectorAll(".card").forEach(card => {

        const foodName = card.querySelector("h3").innerText;

        const rating = localStorage.getItem(foodName + "-rating");
        const reviews = localStorage.getItem(foodName + "-reviews");

        if (rating) {

            card.querySelector(".average").innerText =
                Number(rating).toFixed(1);

            card.querySelector(".review").innerText =
                reviews + " Reviews";

        }

    });

});