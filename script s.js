const snacks = [
    {id:1, name:"Almonds", cat:"Nuts", price:180, emoji:"🥜", mood:"savoury"},
    {id:2, name:"Trail Mix", cat:"Nuts", price:220, emoji:"🥣", mood:"sweet"},
    {id:3, name:"Dried Mango", cat:"Fruits", price:150, emoji:"🥭", mood:"sweet"},
    {id:4, name:"Apple Crisps", cat:"Crunchy", price:120, emoji:"🍎", mood:"crunchy"},
    {id:5, name:"Oat Bar", cat:"Bars", price:90, emoji:"🍫", mood:"sweet"},
    {id:6, name:"Roasted Seeds", cat:"Crunchy", price:130, emoji:"🌻", mood:"savoury"},
    {id:7, name:"Banana Chips", cat:"Fruits", price:100, emoji:"🍌", mood:"crunchy"},
    {id:8, name:"Peanut Bar", cat:"Bars", price:110, emoji:"🍯", mood:"savoury"}
];

let cart = [];
let category = "All";

function showProducts() {
    const search = document.getElementById("search").value.toLowerCase();

    const list = snacks.filter(s =>
        (category === "All" || s.cat === category) &&
        s.name.toLowerCase().includes(search)
    );

    document.getElementById("products").innerHTML = list.map(s => `
        <div class="card">
            <div class="emoji">${s.emoji}</div>
            <h3>${s.name}</h3>
            <p>${s.cat}</p>
            <p>₹${s.price}</p>
            <button onclick="addCart(${s.id})">Add to Cart</button>
        </div>
    `).join("") || "<p>No snacks found.</p>";
}

function filterSnacks(cat) {
    category = cat;
    showProducts();
}

document.getElementById("search").addEventListener("input", showProducts);

function addCart(id) {
    const item = cart.find(s => s.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({...snacks.find(s => s.id === id), qty:1});
    }

    showCart();
}

function showCart() {
    document.getElementById("count").textContent =
        cart.reduce((sum, s) => sum + s.qty, 0);

    document.getElementById("cart-items").innerHTML = cart.length
        ? cart.map(s => `
            <div class="cart-row">
                ${s.emoji} ${s.name} × ${s.qty}
                — ₹${s.price * s.qty}
                <button onclick="changeQty(${s.id},-1)">−</button>
                <button onclick="changeQty(${s.id},1)">+</button>
                <button onclick="removeCart(${s.id})">Remove</button>
            </div>
        `).join("")
        : "Your cart is empty.";

    document.getElementById("total").textContent =
        cart.reduce((sum, s) => sum + s.price * s.qty, 0);
}

function changeQty(id, amount) {
    const item = cart.find(s => s.id === id);
    if (!item) return;

    item.qty += amount;
    if (item.qty <= 0) removeCart(id);
    else showCart();
}

function removeCart(id) {
    cart = cart.filter(s => s.id !== id);
    showCart();
}

function findSnack() {
    const mood = document.getElementById("mood").value;
    const matches = snacks.filter(s => s.mood === mood);
    const snack = matches[Math.floor(Math.random() * matches.length)];

    document.getElementById("result").textContent =
        `Try ${snack.emoji} ${snack.name} for ₹${snack.price}!`;
}

function checkout() {
    document.getElementById("order-message").textContent = cart.length
        ? "Order review complete! This is a demo; no payment was made."
        : "Please add a snack to your cart first.";
}

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("response").textContent =
        "Thank you, " + document.getElementById("name").value.trim() +
        "! Your demo message has been recorded on this page.";
    this.reset();
});

showProducts();
showCart();