const products = [
    {
        id: "1",
        name: "Dulce de leche latte",
        price: 1000,
        category: /* "bebidas calientes" */
            { id: "hot-drinks" },
        cardImg: "./assets/dulcedelechelatte.png",
    },
    {
        id: "2",
        name: "Vainilla latte",
        price: 1100,
        category:
            { id: "hot-drinks" },
        cardImg: "./assets/vainillalatte.png",
    },
    {
        id: "3",
        name: "Latte",
        price: 1200,
        category:
            { id: "hot-drinks" },
        cardImg: "./assets/latte.png",
    },
    {
        id: "4",
        name: "Capuccino helado",
        price: 1200,
        category:
            { id: "cold-drinks" },
        cardImg: "./assets/capuccinohelado.png",
    },
    {
        id: "5",
        name: "Mocha helado",
        price: 1200,
        category:
            { id: "cold-drinks" },
        cardImg: "./assets/mochahelado.png",
    },
    {
        id: "6",
        name: "Cheese avocado toast",
        price: 1500,
        category:
            { id: "foods" },
        cardImg: "./assets/CheeseAvocadoToast.png",
    },
    {
        id: "7",
        name: "Croissant relleno de avellana",
        price: 1300,
        category:
            { id: "foods" },
        cardImg: "./assets/CroissantRellenoAvellana.png",
    },
    {
        id: "8",
        name: "Shaken Lemonade Hibiscus",
        price: 1500,
        category:
            { id: "cold-drinks" },
        cardImg: "./assets/tehibiscus.png",
    },
    {
        id: "9",
        name: "Shaken Lemonade Green Tea",
        price: 1100,
        category:
            { id: "cold-drinks" },
        cardImg: "./assets/teverde.png",
    },
    {
        id: "10",
        name: "Porridge Avena Chocolate y Maní",
        price: 1400,
        category:
            { id: "foods" },
        cardImg: "./assets/Porridge.png",
    },
];

const cardsContainer = document.getElementById("products-container");
const pickCategory = document.querySelectorAll(".category-button");
const cartNumber = document.getElementById("cartQuantity");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let addToCart = document.querySelectorAll(".add-cart");
const messageElement = document.getElementById('message');
const menu = document.getElementById("nav-list");

function showProducts(chosenProducts) {

    cardsContainer.innerHTML = "";

    chosenProducts.forEach((product) => {

        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <div>
            <img class="product-image" src="${product.cardImg}">
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price}ARS</p>
                <button class="add-cart" data-id="${product.id}">Agregar</button>
            </div>
            </div>
            `;
        cardsContainer.append(div);
    });
    uploadAddToCart();
}


function uploadAddToCart() {
    addToCart = document.querySelectorAll(".add-cart");
    addToCart.forEach((button) => {
        button.addEventListener("click", addOneToCart);
    });

const removeButtons = document.querySelectorAll(".remove-item-button");
    removeButtons.forEach((button) => {
        button.addEventListener("click", removeProductFromCart);
    });
}

const productsInCart = [];

function showMessage(message) {
    messageElement.textContent = message;
    messageElement.style.display = 'block';

    // Oculta el mensaje después de unos segundos
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.style.display = 'none';
    }, 3000); // El mensaje se ocultará después de 3 segundos (ajusta el tiempo según tus preferencias)
}

function addOneToCart(e) {
    const idButton = e.currentTarget.getAttribute("data-id");
    const productAdded = products.find((product) => product.id === idButton);
    const existingProduct = productsInCart.find((item) => item.id === idButton);

    if (existingProduct) {
        existingProduct.cantidad++;
    } else {
        productAdded.cantidad = 1;
        productsInCart.push(productAdded);
    }
    updateCart();
    showMessage(`Añadido al carrito: ${productAdded.name}`);
}


function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    productsInCart.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("productCart");
        div.innerHTML = `
    <div>
            <img class="cart-image" src="${product.cardImg}">
            <div class="cart-details">
            <h3 class="cart-name">${product.name} x${product.cantidad}</h3>
                <p class="cart-price">$${product.price}ARS</p>
                <button class="quantity-button decrease-quantity" data-id="${product.id}">-</button>
                <span class="cart-quantity">${product.cantidad}</span>
                <button class="quantity-button increase-quantity" data-id="${product.id}">+</button>
                <button class="remove-item-button" data-id="${product.id}">Eliminar</button>

            </div>
    </div>
    `;
        cartItems.appendChild(div);
        const removeButton = div.querySelector(".remove-item-button");
        removeButton.addEventListener("click", removeProductFromCart);
        total += product.price * product.cantidad;
    });
    cartTotal.textContent = `${total} ARS`;
    cartNumber.textContent = productsInCart.reduce((acc, product) => acc + product.cantidad, 0);
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}

const decreaseButtons = document.querySelectorAll(".decrease-quantity");
const increaseButtons = document.querySelectorAll(".increase-quantity");

decreaseButtons.forEach((button) => {
    button.addEventListener("click", decreaseQuantity);
});

increaseButtons.forEach((button) => {
    button.addEventListener("click", increaseQuantity);
});

function decreaseQuantity(event) {
    const productId = event.target.getAttribute("data-id");
    const product = productsInCart.find((item) => item.id === productId);

    if (product && product.cantidad > 1) {
        product.cantidad--;
        updateCart();
    }
    console.log("Decrease Quantity clicked for product with ID:", productId);
}

/* function increaseQuantity(event) {
    const productId = event.target.getAttribute("data-id");
    const product = productsInCart.find((item) => item.id === productId);

    if (product) {
        product.cantidad++;
        updateCart();
    }
} */

function increaseQuantity(event) {
    const productId = event.target.getAttribute("data-id");
    const product = productsInCart.find((item) => item.id === productId);

    if (product) {
        product.cantidad++;
        updateCart();
    }
}

function decreaseQuantity(event) {
    const productId = event.target.getAttribute("data-id");
    const product = productsInCart.find((item) => item.id === productId);

    if (product && product.cantidad > 1) {
        product.cantidad--;
        updateCart();
    }
}

function initializeCart() {
    const storedCart = localStorage.getItem("productsInCart");
    if (storedCart) {
        productsInCart.push(...JSON.parse(storedCart));
        updateCart();
    }
}

showProducts(products);
initializeCart();

pickCategory.forEach((button) => {
    button.addEventListener("click", (e) => {
        pickCategory.forEach((button) =>
            button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "all") {
            const buttonProducts = products.filter((product) => product.category.id === e.currentTarget.id);
            showProducts(buttonProducts);
        } else {
            showProducts(products);
        }
    });
});

function updateCartNumber() {
    let uploadNumber = productsInCart.reduce((acc, product) => acc + product.cantidad, 0);
    cartNumber.innerText = uploadNumber;
}

/* const productsInCartLoaded = JSON.parse(localStorage.getItem('products-In-Cart')); */

function removeProductFromCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const productIndex = productsInCart.findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
        productsInCart.splice(productIndex, 1);
        updateCart();
    }
}
/* cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item-button')) {
        removeProductFromCart(event);
    }
}); */

cartItems.addEventListener("click", (event) => {
    if (event.target.classList.contains("decrease-quantity")) {
        decreaseQuantity(event);
    } else if (event.target.classList.contains("increase-quantity")) {
        increaseQuantity(event);
    }
});


function clearCart() {
    productsInCart.length = 0; // Vacía el array de productos en el carrito
    updateCart();
}
const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', clearCart);