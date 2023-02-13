const conteinerMad = document.getElementsByClassName("mad-conteiner")[0];
const botonAbrir = document.getElementById("botonCart");
const botonCerrar = document.getElementById("cerrar-cart");
const madCart = document.getElementsByClassName("mad-cart")[0];
const buyCart = document.getElementById("buy-cart");
botonAbrir.addEventListener("click", () => {
  if (cart.length == 0) {
    Swal.fire({
      icon: "info",
      title: "Empty Cart",
      background: "rgba(24, 24, 24)",
      color: "white",
      timer: 1300,
      timerProgressBar: true,
      toast: true,
      position: "top-right",
      width: 300,
    }).showToast();
  } else {
    conteinerMad.classList.toggle("mad-active");
  }
});
botonCerrar.addEventListener("click", () => {
  conteinerMad.classList.toggle("mad-active");
});
conteinerMad.addEventListener("click", (event) => {
  conteinerMad.classList.toggle("mad-active");
});
madCart.addEventListener("click", (event) => {
  event.stopPropagation();
});
buyCart.addEventListener("click", () => {
  conteinerMad.classList.toggle("mad-active");
});
