const abrir = document.getElementById('abrir');
const cerrar = document.getElementById('cerrar');
const openCart = document.getElementById('openCart');
const closeCart = document.getElementById('closeCart');


abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});
cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});
openCart.addEventListener("click", () =>{
    cart.classList.add("visible");
});

closeCart.addEventListener("click", () =>{
    cart.classList.remove("visible");
});

