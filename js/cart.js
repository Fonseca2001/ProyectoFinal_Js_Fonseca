let conteinerCart = document.getElementById("cart-conteiner");
let conteinerPrecioTotal = document.getElementById("precioTotal");
let cart = [];
if (localStorage.getItem("cart")) {
  let cartJSON = localStorage.getItem("cart");
  cart = JSON.parse(cartJSON);
}
renderizarCart(cart);
function renderizarCart(carEnCart) {
  conteinerCart.innerText = "";
  carEnCart.forEach((car) => {
    let tarjetaCar = document.createElement("div");
    tarjetaCar.classList.add("itemCart");
    tarjetaCar.innerHTML += `<p>${car.nombre}</p> <p>Cantidad: ${car.unidades}</p><p>$${car.subtotal}</p> 
    <div class="botones-cart"><button onclick="sumarAlCart(${car.id})" class="boton-sumar"><img src="./img/plus.png" alt="delete"></button>
    <button onclick="restarAlCart(${car.id})" class="boton-restar"><img src="./img/less.png" alt="delete"></button>
    <button onclick="eliminarDelCart(${car.id})" class="boton-eliminar"><img src="./img/borrar.png" alt="delete"></button></div>`;
    conteinerCart.appendChild(tarjetaCar);
    totalCart(cart);
  });
}
function validarCi(ci) {
  let validacionCi = /^\d{8}(?:[-\s]\{4})?$/;
  return validacionCi.test(ci) ? true : false;
}
let botonBuy = document.getElementById("buy-cart");
botonBuy.addEventListener("click", () => {
  if (cart.length > 0) {
    let ci;
    Swal.fire({
      title: "Enter your identity card",
      input: "text",
      background: "rgba(24, 24, 24)",
      color: "white",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (ci) => {
        if (!ci) {
          return "Enter identity card";
        } else if (!validarCi(ci)) {
          return "Try again";
        } else {
          return undefined;
        }
      },
    }).then((resultado) => {
      if (resultado.value) {
        let total = calcularTotal(cart);
        localStorage.removeItem("cart");
        cart = [];
        totalCart(cart);
        renderizarCart(cart);
        ci = resultado.value;
        Swal.fire({
          title: `CI: ${ci} - Confirmed order: Total $${total}. Come pick up your new car at our location in 3 days! Thank you for trusting CarMax! We will wait for you!.`,
          background: "rgb(24, 24, 24)",
          color: "white",
          timerProgressBar: true,
        }).showToast();
      }
    });
  } else {
    Swal.fire({
      toast: "true",
      title: "Empty",
      background: "rgba(24, 24, 24)",
      color: "white",
    }).showToast();
  }
});
let eliminarDelCart = (idcar) => {
  let item = cart.find((car) => car.id === idcar);
  let indice = cart.indexOf(item);
  cart.splice(indice, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  totalCart(cart);
  renderizarCart(cart);
  Toastify({
    text: "Removed product",
    duration: 1300,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "rgb(214, 18, 18)",
    },
  }).showToast();
};
let sumarAlCart = (idcar) => {
  let car = cart.find((beb) => beb.id === idcar);
  car.unidades++;
  car.subtotal += car.precio;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderizarCart(cart);
};
let restarAlCart = (idcar) => {
  let car = cart.find((beb) => beb.id === idcar);
  if (car.unidades > 1) {
    car.unidades--;
    car.subtotal -= car.precio;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderizarCart(cart);
  }
};
function totalCart(cart) {
  let total = calcularTotal(cart);
  conteinerPrecioTotal.innerHTML = `Total: $${total}`;
}
function calcularTotal(cart) {
  let total = 0;
  cart.forEach((car) => {
    total += car.subtotal;
  });
  return total;
}