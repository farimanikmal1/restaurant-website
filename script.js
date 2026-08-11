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
// Favorites
// ==========================

function toggleFavorite(element) {

    const card = element.closest(".card");

    if (!card) return;

    const name =
        card.querySelector("h3").innerText;

    const image =
        card.querySelector("img").getAttribute("src");

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    const existingIndex =
        favorites.findIndex(item => item.name === name);


    if (existingIndex === -1) {

        // Add favorite

        favorites.push({
            name: name,
            image: image
        });

        element.classList.add("active");

        element.innerHTML = "🖤";

    } else {

        // Remove favorite

        favorites.splice(existingIndex, 1);

        element.classList.remove("active");

        element.innerHTML = "♡";

    }


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

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
// ==========================
// Login
// ==========================

function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    // Get saved account
    const savedAccount =
        localStorage.getItem("restaurantAccount");

    // Check account
    if (!savedAccount) {

        alert("Account not found. Please create an account first.");

        window.location.href = "signup.html";

        return;
    }

    const account =
        JSON.parse(savedAccount);

    // Check email and password
    if (
        email === account.email &&
        password === account.password
    ) {

        // IMPORTANT
        // Save login status
        localStorage.setItem("isLoggedIn", "true");

        alert("Login successful! 🎉");

        // Go to Profile
        window.location.href = "profile.html";

    } else {

        alert("Invalid email or password.");

    }

}

// ==========================
// Create Account
// ==========================

function signup(event) {

    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    // Check empty fields

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill in all fields.");

        return;
    }


    // Check password

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    // Create account object

    const account = {

        name: name,

        email: email,

        password: password

    };


    // Save account

    localStorage.setItem(
        "restaurantAccount",
        JSON.stringify(account)
    );


    // Success message

    alert(
        "Your account has been created successfully! 🎉"
    );


    // Go to Login page

    window.location.href = "login.html";

}

//====================
//Open Profile
//============================

function openProfile(){
    const savedUser = localStorage.getItem("loggedInUser");
    if (! savedUser) {

        alert ("Please login first.");
        window.location.href = "profile.html";
    }
}


// ==========================
// Sign Up / Create Account
// ==========================

function signup(event) {

    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    // Check password
    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    // Check if account already exists

    const existingUser =
        JSON.parse(localStorage.getItem("userAccount"));

    if (existingUser && existingUser.email === email) {

        alert("An account with this email already exists.");

        window.location.href = "login.html";

        return;
    }


    // Create user account

    const userAccount = {

        name: name,
        email: email,
        password: password

    };


    // Save account

    localStorage.setItem(
        "userAccount",
        JSON.stringify(userAccount)
    );


    // Success message

    alert("Your account has been created successfully!");


    // Go to Login

    window.location.href = "login.html";

}

// ==========================
// Profile
// ==========================

function loadProfile() {

    const savedAccount =

        localStorage.getItem("restaurantAccount");

    const isLoggedIn =

        localStorage.getItem("isLoggedIn");

    // فقط در صفحه Profile بررسی شود

    if (!savedAccount || isLoggedIn !== "true") {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    const account = JSON.parse(savedAccount);

    const profileName =

        document.getElementById("profileName");

    const profileEmail =

        document.getElementById("profileEmail");

    if (profileName) {

        profileName.innerText = account.name;

    }

    if (profileEmail) {

        profileEmail.innerText = account.email;
    }
}


// ==========================
// Edit Profile
// ==========================

function editProfile() {

    window.location.href = "edit-profile.html";

}

// ==========================
// Change Password Page
// ==========================

function changePassword() {

    window.location.href = "change-password.html";

}


// ==========================
// Save New Password
// ==========================

function changePasswordSubmit(event) {

    event.preventDefault();


    const currentPassword =
        document.getElementById("currentPassword").value;

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmNewPassword =
        document.getElementById("confirmNewPassword").value;


    // Get saved account

    const savedAccount =
        localStorage.getItem("restaurantAccount");


    if (!savedAccount) {

        alert("Account not found.");

        window.location.href = "login.html";

        return;
    }


    const account =
        JSON.parse(savedAccount);


    // Check current password

    if (currentPassword !== account.password) {

        alert("Current password is incorrect.");

        return;
    }


    // Check new password

    if (newPassword !== confirmNewPassword) {

        alert("New passwords do not match.");

        return;
    }


    // Check password length

    if (newPassword.length < 6) {

        alert("Password must be at least 6 characters.");

        return;
    }


    // Save new password

    account.password = newPassword;


    localStorage.setItem(
        "restaurantAccount",
        JSON.stringify(account)
    );


    // Success message

    alert(
        "Your password has been changed successfully! 🎉"
    );


    // Go back to Login

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

}

// ==========================
// Load Edit Profile
// ==========================

function loadEditProfile() {

    const savedAccount =
        localStorage.getItem("restaurantAccount");

    if (!savedAccount) {

        alert("Please create an account first.");

        window.location.href = "login.html";

        return;
    }

    const account = JSON.parse(savedAccount);

    const nameInput =
        document.getElementById("editName");

    const emailInput =
        document.getElementById("editEmail");


    if (nameInput) {

        nameInput.value = account.name;

    }


    if (emailInput) {

        emailInput.value = account.email;

    }

}


// ==========================
// Save Profile Changes
// ==========================

function saveProfile(event) {

    event.preventDefault();

    const name =
        document.getElementById("editName").value.trim();

    const email =
        document.getElementById("editEmail").value.trim();


    if (name === "" || email === "") {

        alert("Please fill in all fields.");

        return;
    }


    const savedAccount =
        localStorage.getItem("restaurantAccount");


    if (!savedAccount) {

        alert("Account not found.");

        window.location.href = "login.html";

        return;
    }


    const account =
        JSON.parse(savedAccount);


    // Update account information

    account.name = name;
    account.email = email;


    // Save updated account

    localStorage.setItem(
        "restaurantAccount",
        JSON.stringify(account)
    );


    // Success message

    alert(
        "Your profile has been updated successfully! 🎉"
    );


    // Go back to Profile

    window.location.href = "profile.html";

}


// ==========================
// Load Profile / Edit Profile
// ==========================

window.addEventListener("load", function () {

    // Profile page

    if (document.getElementById("profileName")) {

        loadProfile();

    }


    // Edit Profile page

    if (document.getElementById("editName")) {

        loadEditProfile();

    }

});



// ==========================
// Logout
// ==========================

function logout() {

    localStorage.removeItem("isLoggedIn");

    alert("You have been logged out successfully.");

    window.location.href = "login.html";

}


//========================
// My Orders 
//============================

function openOrders(){
    window.location.href ="Orders.html";
    
}


//======================
// Favorites
//=============================

function openFavorites (){

    window.location.href= "favorites.html";

}


// ==========================
// Load Favorites
// ==========================

function loadFavorites() {

    const container =
        document.getElementById("favoritesContainer");

    if (!container) return;


    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    if (favorites.length === 0) {

        container.innerHTML = `
            <p class="empty-favorites">
                No favorite food yet.
            </p>
        `;

        return;
    }


    container.innerHTML = "";


    favorites.forEach(item => {

        container.innerHTML += `

            <div class="favorite-card">

                <img
                    src="${item.image}"
                    alt="${item.name}">

                <div class="favorite-info">

                    <h3>${item.name}</h3>

                    <button
                        onclick="removeFavorite('${item.name}')">

                        <i class="fa-solid fa-heart"></i>

                        Remove

                    </button>

                </div>

            </div>

        `;

    });

}

// ==========================
// Remove Favorite
// ==========================

function removeFavorite(foodName) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    favorites =
        favorites.filter(item => item.name !== foodName);


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


    loadFavorites();

}

// ==========================
// Load Favorites Page
// ==========================

window.addEventListener("load", function () {

    if (document.getElementById("favoritesContainer")) {

        loadFavorites();

    }

});

// ==========================
// Forgot Password
// ==========================

function forgotPassword(event) {

    event.preventDefault();

    const email =
        document.getElementById("forgotEmail").value.trim();

    const savedAccount =
        localStorage.getItem("restaurantAccount");


    // Check account

    if (!savedAccount) {

        alert("No account was found. Please create an account first.");

        window.location.href = "signup.html";

        return;
    }


    const account =
        JSON.parse(savedAccount);


    // Check email

    if (email !== account.email) {

        alert("This email address is not registered.");

        return;
    }


    // Ask for new password

    const newPassword =
        prompt("Enter your new password:");


    if (!newPassword) {

        return;
    }


    // Password length

    if (newPassword.length < 6) {

        alert("Password must be at least 6 characters.");

        return;
    }


    // Save new password

    account.password = newPassword;


    localStorage.setItem(
        "restaurantAccount",
        JSON.stringify(account)
    );


    // Remove login status

    localStorage.removeItem("isLoggedIn");


    alert(
        "Your password has been reset successfully! 🎉"
    );


    // Go to Login

    window.location.href = "login.html";

}

// ==========================
// Contact Us
// ==========================

function sendMessage(event) {

    event.preventDefault();

    const form = event.target;

    const name = form.querySelector(
        'input[type="text"]'
    ).value.trim();

    const email = form.querySelector(
        'input[type="email"]'
    ).value.trim();

    const message = form.querySelector(
        "textarea"
    ).value.trim();


    // Check fields

    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        alert("Please fill in all fields.");

        return;
    }


    // Success message

    alert(
        "Your message has been sent successfully! 🎉"
    );


    // Clear form

    form.reset();

}