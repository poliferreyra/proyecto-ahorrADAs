const $ = (selector) => document.querySelector(selector);

// navBar
const $btnHambur = $(".navbar-burger");
const $navBarEnd = $(".navbar-menu");
// botones del nav
const $botonBalance = $("#boton-balance");
const $botonCategoria = $("#boton-categoria");
const $botonReporte = $("#boton-reporte");
// secciones principales
const $contenedorBalance = $("#contenedor-balance");
const $contenedorReportes = $("#contenedor-reportes");
const $contenedorCategoria = $("#contenedor-categoria");
// nueva operacion
const $botonNuevaOperacion = $("#boton-agregar-operacion");
const $boxNuevaOperacion = $("#box-nueva-operacion");

// FUNCIONES
// navBar
const toggleIsActive = () => {
  $navBarEnd.classList.toggle("is-active");
  $btnHambur.classList.toggle("is-active");
};

const nuevaOperacion = () => {}


// secciones principales
const vistaCategoria = () => {
  $contenedorBalance.classList.add("is-hidden");
  $contenedorReportes.classList.add("is-hidden");
};

// EVENTOS
// menu hamburguesa
$btnHambur.addEventListener("click", toggleIsActive);
// boton categoria - ocultar otras vistas
$botonCategoria.addEventListener("click", vistaCategoria);
// vista nueva operacion
$botonNuevaOperacion.addEventListener("click", nuevaOperacion);
