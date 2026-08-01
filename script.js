let count = 0;
let orders = [];
let totalprice = 0;
function orderFood(foodName , price) {
    count++;
    totalprice +=price;
    document.getElementById("totalprice").innerText=totalprice;
let item= orders.find(order => order.name=== foodName);
if (item){
    item.quantity++;
}
else{
    let imagePath;
    if (foodName === "pizza"){
        imagePath ="images/pizza1.jpg";
    }
    else{ 
        imagePath =`images/${foodName}.jpg`;

    }
    orders.push({
        name: foodName,
        price: price,
        quantity:1,
        image: imagePath
    });

}
console.log(orders);

    document.getElementById("orderCount").innerText=count;
     let list = document.getElementById("orderList");
     document.getElementById("emptyCart").style.display="none"; 
     updateCart();
}
function updateCart(){
    let list= document.getElementById("orderList");
    list.innerHTML="";
    totalprice =0;
    orders.forEach(function(item){
        totalprice +=item.price * item.quantity;
list.innerHTML +=`
<li class="cart-item">
<img src="${item.image}" class="cart-img">
<span>${item.name}</span>
<button onclick="decreaseQuantity('${item.name}')">-</button>
<span>${item.quantity}</span>
<button onclick="increaseQuantity('${item.name}')">+</button>
<span>${item.price * item.quantity} €</span> 
<button class="delete-btn" onclick="removeItem('${item.name}')">
<i class="fa-solid fa-xmark"></i></button>
</li>`;});
document.getElementById("totalprice").innerText = totalprice;
if (orders.length > 0){
    document.getElementById("emptyCart").style.display="none";

}
else{
    document.getElementById("emptyCart").style.display="block";
}
localStorage.setItem("orders", JSON.stringify(orders));
localStorage.setItem("count",count);
    }

function increaseQuantity(foodName){
    let item = orders.find(order => order.name === foodName);
    if (item){
        item.quantity++;
        count++;
        totalprice += item.price;
        updateCart();
        document.getElementById("orderCount").innerText= count;
    }
}

function decreaseQuantity(foodName){
    let item=orders.find(order => order.name === foodName);
    if (item){
        item.quantity--;
        count--;
        totalprice -= item.price;

         if(item.quantity=== 0){
            orders = orders.filter(order => order.name !== foodName);
        }
        updateCart();
        document.getElementById("orderCount").innerText= count;
    }
}

 function clearorders(){
    count=0;
    console.log(count);
    orders=[];
    totalprice=0;
    document.getElementById("orderCount").innerText = "0";
    console.log(document.getElementById("orderCount").innerText);
    document.getElementById("orderList").innerHTML = "";
    document.getElementById("totalprice").innerText= "0";
    
localStorage.removeItem("orders");
localStorage.removeItem("count");

    document.getElementById("cartbox").classList.remove("show");
    document.getElementById("emptyCart").style.display="block";

 }
function opencart() {
    document.getElementById("cartbox").classList.add("show");

}
function closecart(){
    document.getElementById("cartbox").classList.remove("show");

}
function checkout() {
    if (count=== 0){
        alert("Your cart is empty");
        return;
    }
    alert("Thank you for your order");
    clearorders();
}

function removeItem(foodName){
    let item = orders.find(order=> order.name === foodName);
    if (item){
        count -=item.quantity;
        totalprice -=item.price * item.quantity;
        orders= orders.filter(order => order.name !== foodName);
updateCart();
document.getElementById("orderCount").innerText = count;
if (count===0){
    document.getElementById("emptyCart").style.display = "block";
    closecart();
}
    }
}
window.onload= function(){
    let savedOrders= localStorage.getItem("orders");
    let savedCount=localStorage.getItem("count");
    if (savedOrders){
        orders= JSON.parse(savedOrders);
    }
    if (savedCount){
count= Number(savedCount);
document.getElementById("orderCount").innerText= count;

    }
    updateCart();
}
function searchfood(){
    let input = document.getElementById("searchInput").value .toLowerCase();
    let cards = document.querySelectorAll(".card");
    cards.forEach(function(card){
        let foodName= card.querySelector("h3").innerText.toLowerCase();
        
        if (foodName.includes(input)){
            card.style.display="block";

        }
        else {
            card .style.display="none";
        }
    })
}
