// funcion maestra
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector); // pendiente optimizar vistas

// ELEMENTOS DEL DOM
// navBar
const $btnHambur = $(".navbar-burger");
const $navBarEnd = $(".navbar-menu");
// botones del nav
const $botonBalance = $("#boton-balance");
const $botonCategoria = $("#boton-categoria");
const $botonReportes = $("#boton-reportes");
// secciones principales
const $contenedorBalance = $("#contenedor-balance");
const $contenedorReportes = $("#contenedor-reportes");
const $contenedorCategoria = $("#contenedor-categoria");
// nueva operacion
const $botonNuevaOperacion = $("#boton-agregar-operacion");
const $boxNuevaOperacion = $("#box-nueva-operacion");
// box nueva operacion
const $descripcion = $("#descripcion");
const $monto = $("#monto");
const $tipoOperacion = $("#tipo-operacion");
const $tipoCategoria = $("#tipo-categoria");
const $fechaOperacion = $("#Fecha-operacion");
// botones nueva operacion
const $btnAgregarOperacion = $("#btnAgregarOperacion");
const $btnCancelarOperacion = $("#btnCancelarOperacion");

// array y objeto para nueva operacion
const listaOperaciones = JSON.parse(localStorage.getItem("operacionNueva")) || [];
console.log(listaOperaciones)

const datosOperacion = {
  descripcion:"",
  monto:0,
  tipo:"",
  categoria:"",
  fecha:""
};

// FUNCIONES
// menu hamburguesa
const toggleIsActive = () => {
  $navBarEnd.classList.toggle("is-active");
  $btnHambur.classList.toggle("is-active");
};
// secciones principales
const vistaBalance = () => {
  $contenedorCategoria.classList.add("is-hidden");
  $contenedorReportes.classList.add("is-hidden");
  $boxNuevaOperacion.classList.add("is-hidden");
  $contenedorBalance.classList.remove("is-hidden");
};
const vistaCategoria = () => {
  $contenedorBalance.classList.add("is-hidden");
  $contenedorReportes.classList.add("is-hidden");
  $boxNuevaOperacion.classList.add("is-hidden");
  $contenedorCategoria.classList.remove("is-hidden");
};
const vistaReportes = () => {
  $contenedorBalance.classList.add("is-hidden");
  $contenedorCategoria.classList.add("is-hidden");
  $boxNuevaOperacion.classList.add("is-hidden");
  $contenedorReportes.classList.remove("is-hidden");
};
// nueva operacion
const nuevaOperacion = () => {
  $contenedorBalance.classList.add("is-hidden");
  $contenedorCategoria.classList.add("is-hidden");
  $contenedorReportes.classList.add("is-hidden");
  $boxNuevaOperacion.classList.remove("is-hidden");
};
const cerrarBoxOperacion = () => {
  $boxNuevaOperacion.classList.toggle("is-hidden");
  $contenedorBalance.classList.toggle("is-hidden");
};
// agregar nueva operacion
const agregarOperaciones =()=>{
let operacion = {...datosOperacion}

operacion.descripcion = $descripcion.value
operacion.monto = Number($monto.value)
operacion.tipo = $tipoOperacion.value
operacion.categoria = $tipoCategoria.value
operacion.fecha = $fechaOperacion.value

listaOperaciones.push(operacion)
console.log(listaOperaciones)

localStorage.setItem("operacionNueva", JSON.stringify(listaOperaciones))
}

// EVENTOS
// menu hamburguesa
$btnHambur.addEventListener("click", toggleIsActive);
// vista balance
$botonBalance.addEventListener("click", vistaBalance);
// vista categoria
$botonCategoria.addEventListener("click", vistaCategoria);
// vista reporte
$botonReportes.addEventListener("click", vistaReportes);
// vista seccion nueva operacion
$botonNuevaOperacion.addEventListener("click", nuevaOperacion);
$btnCancelarOperacion.addEventListener("click", cerrarBoxOperacion);
// agregar nueva operacion
$btnAgregarOperacion.addEventListener("click", agregarOperaciones)
