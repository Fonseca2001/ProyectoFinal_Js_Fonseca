let Inventory = [
  {
    id: 01,
    nombre: "Volkswagen UP!",
    precio: 29990,
    descripcion:
      "5-speed manual box. Multifunction steering wheel.",
    imagen: "./img/up.jpeg",
  },
  {
    id: 02,
    nombre: "Volkswagen Gol",
    precio: 21990,
    descripcion:
      "It replaced the Volkswagen Brasilia as a low-cost car.",
    imagen: "./img/gol.jpg",
  },
  {
    id: 03,
    nombre: "Volkswagen Saveiro",
    precio: 23990,
    descripcion:
      "With a unique design it supports all the demands of work.",
    imagen: "./img/saveiro.jpg",
  },
  {
    id: 04,
    nombre: "Volkswagen Bora",
    precio: 34990,
    descripcion:
      "It has a 1984 cc gasoline engine with 4 cylinders located in line that reaches a maximum power of 116 CV at 5200 rpm",
    imagen: "./img/bora.jpg",
  },
];

let conteinerIventory = document.getElementById("conteinerInventory");

renderizarInventory(Inventory);
function renderizarInventory(arrayInventory) {
  conteinerInventory.innerHTML = "";
  arrayInventory.forEach((producto) => {
    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("producto");
    tarjetaProducto.id = `producto${producto.id}`;
    tarjetaProducto.innerHTML = `<h2>${producto.nombre}</h3>
    <img src=${producto.imagen}>
    <p>${producto.descripcion}</p>
    <h4>$${producto.precio}</h4>
    <div><button id=${producto.id}>Add to cart</button>
    `;
    conteinerInventory.append(tarjetaProducto);
    let boton = document.getElementById(producto.id);
    boton.onclick = agregarAlCart;
  });
}
function agregarAlCart(car) {
  Swal.fire({
    icon: "question",
    background: "rgba(24, 24, 24)",
    color: "white",
    title: "Do you want to add this product to the cart?",
    showDenyButton: true,
    confirmButtonText: "Add",
    denyButtonText: `No add`,
  }).then((result) => {
    if (result.isConfirmed) {
      Toastify({
        text: "Product add",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "green",
        },
      }).showToast();

      let id = car.target.id;
      let carSearch = Inventory.find((car) => car.id == id);
      let carEnCart = cart.find(
        (car) => car.id == carSearch.id
      );
      if (carEnCart) {
        let posicioncar = cart.findIndex(
          (car) => car == carEnCart
        );
        cart[posicioncar].unidades++;
        cart[posicioncar].subtotal =
          cart[posicioncar].precio * cart[posicioncar].unidades;
      } else {
        carSearch.unidades = 1;
        carSearch.subtotal = carSearch.precio;
        cart.push(carSearch);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderizarCart(cart);
    } else if (result.isDenied) {
      Toastify({
        text: "Product no add",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: " rgb(214, 18, 18)",
        },
      }).showToast();
    }
  });
}