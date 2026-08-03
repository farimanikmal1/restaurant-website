// ==========================
// Variables
// ==========================

let count = 0;
let orders = [];
let totalprice = 0;

// ==========================
// Add Food
// ==========================

function orderFood(foodName, price) {

    count++;

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

    document.getElementById("orderCount").innerText = count;

    updateCart();
}

// ==========================
// Update Cart
// ==========================

function updateCart() {

    const list = document.getElementById("orderList");

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

            <span>${item.price * item.quantity} €</span>

            <button class="delete-btn"
                onclick="removeItem('${item.name}')">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </li>`;
    });

    document.getElementById("totalprice").innerText = totalprice;

    document.getElementById("emptyCart").style.display =
        orders.length > 0 ? "none" : "block";

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("count", count);
}
// ==========================
// Increase Quantity
// ==========================

function increaseQuantity(foodName) {

    let item = orders.find(order => order.name === foodName);

    if (item) {

        item.quantity++;
        count++;

        updateCart();

        document.getElementById("orderCount").innerText = count;
    }
}

// ==========================
// Decrease Quantity
// ==========================

function decreaseQuantity(foodName) {

    let item = orders.find(order => order.name === foodName);

    if (item) {

        item.quantity--;
        count--;

        if (item.quantity === 0) {

            orders = orders.filter(order => order.name !== foodName);
        }

        updateCart();

        document.getElementById("orderCount").innerText = count;
    }
}

// ==========================
// Remove Item
// ==========================

function removeItem(foodName) {

    let item = orders.find(order => order.name === foodName);

    if (item) {

        count -= item.quantity;

        orders = orders.filter(order => order.name !== foodName);

        updateCart();

        document.getElementById("orderCount").innerText = count;

        if (count === 0) {

            closecart();
        }
    }
}

// ==========================
// Clear Cart
// ==========================

function clearorders() {

    count = 0;
    orders = [];
    totalprice = 0;

    document.getElementById("orderCount").innerText = "0";
    document.getElementById("orderList").innerHTML = "";
    document.getElementById("totalprice").innerText = "0";

    localStorage.removeItem("orders");
    localStorage.removeItem("count");

    document.getElementById("cartbox").classList.remove("show");

    document.getElementById("emptyCart").style.display = "block";
}

// ==========================
// Open / Close Cart
// ==========================

function opencart() {

    document.getElementById("cartbox").classList.add("show");
}

function closecart() {

    document.getElementById("cartbox").classList.remove("show");
}

// ==========================
// Checkout
// ==========================

function checkout() {

    if (count === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert("Thank you for your order!");

    clearorders();
}

// ==========================
// Load Saved Cart
// ==========================

window.onload = function () {

    let savedOrders = localStorage.getItem("orders");
    let savedCount = localStorage.getItem("count");

    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }

    if (savedCount) {
        count = Number(savedCount);
    }

    document.getElementById("orderCount").innerText = count;

    updateCart();
};

// ==========================
// Search Food
// ==========================

function searchfood() {

    let input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {

        let foodName = card
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

function openOffers() {
    document.getElementById("offersBox").classList.add("show");
}

function closeOffers() {
    document.getElementById("offersBox").classList.remove("show");
}

function togglemenu(){
    document.querySelector("nav").classList.toggle("active");
}

let hours = 2;
let minutes = 0;
let seconds = 0;

function updateTimer(){
let timer = document.getElementById("timer");

timer.innerHTML =
String(hours).padStart(2,"0") +":" +
String(minutes).padStart(2,"0") + ":" +
String(seconds).padStart(2,"0");
}

 let timerInterval =setInterval (function (){
    if (seconds > 0) {
        seconds--;
    }
    else{
        if (minutes > 0){
            minutes--;
            seconds = 59;

        }
        else {
            if (hours > 0){
                hours--;
                minutes = 59;
                seconds = 59;
            }
        }
    }
    updateTimer();
    if (hours == 0 && minutes == 0 && seconds == 0){
        clearInterval(timerInterval);

        timer.innerHTML ="Offer Expired";
        document.querySelectorAll(".Offer-card button").disabled = true;
    }
},1000);

window.onscroll =function(){
    scrollFuncation ();

};

function scrollFuncation(){
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("topBtn").style.display ="block";
    }
else {
    document.getElementById("topBtn").style.display ="none";
}
}

function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;


}

function submitOrder(event){
    event.preventDefault();
    document.getElementById("successModal").style.display = "flex";

}

function closeModal(){

    document.getElementById("successModal").style.display ="none";
    window.location.href = "index.html";

}

let cart =JSON.parse(localStorage.getItem("cart"))|| [];

            let cartItems =document.getElementById("cartItems");
            let totalPrice =document.getElementById("totalPrice");

            let total = 0;

            cart.forEach (function(item){
                let div =document.createElement("div");

                div.innerHTML=`
                <p>${item.name} x ${item.quantity} - ${item.price * item.quantity} €</p>;`

                cartItems.appendChild(div);
                total += item.price * item.quantity;

                
            });

            totalPrice.innerText = total.toFixed(2)+ "€";