function iniciarSesion() {
  let usuario = prompt("Send your username");
  localStorage.setItem("usuario", usuario); 
}
function obtenerNombreDeUsuario() {
  return localStorage.getItem("usuario"); 
}
let span = document.querySelector("h2 > span");
let usuario = obtenerNombreDeUsuario();
let button = document.querySelector("#cerrar");
button.onclick = cerrarSesion;
if (usuario == "null" || usuario == null) {
  iniciarSesion();
  usuario = obtenerNombreDeUsuario();
  span.innerText = usuario;
} else {
  span.innerText = usuario;
}
function cerrarSesion() {
  localStorage.removeItem("usuario"); 
  span.innerText = "";
}
function reiniciarLocalStorage() {
  localStorage.clear(); 
}
for (let i = 0; i < localStorage.length; i++) {
  let clave = localStorage.key(i);
  console.log("Clave:" + clave);
  console.log("Valor:" + localStorage.getItem(clave));
}
function agregarItemSS() {
  sessionStorage.setItem("nombre", "Nicolas");
}