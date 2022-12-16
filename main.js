const $ = (selector) => document.querySelector(selector);

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
const $btnAgregarOperacion = $("#btnAgregarOperacion");
const $btnCancelarOperacion = $("#btnCancelarOperacion");

// FUNCIONES
// navBar
const toggleIsActive = () => {
  $navBarEnd.classList.toggle("is-active");
  $btnHambur.classList.toggle("is-active");
};

// secciones principales
const vistaBalance = () => {
  $contenedorCategoria.classList.add("is-hidden");
  $contenedorReportes.classList.add("is-hidden");
  $boxNuevaOperacion.classList.add("is-hidden");
  $contenedorBalance.classList.toggle("is-hidden");
};
const vistaCategoria = () => {
  $contenedorBalance.classList.add("is-hidden");
  $contenedorReportes.classList.add("is-hidden");
  $boxNuevaOperacion.classList.add("is-hidden");
  $contenedorCategoria.classList.toggle("is-hidden");
};
const vistaReportes = () => {
  $contenedorBalance.classList.add("is-hidden");
  $contenedorCategoria.classList.add("is-hidden");
  $boxNuevaOperacion.classList.add("is-hidden");
  $contenedorReportes.classList.toggle("is-hidden");
};
// nueva operacion
const nuevaOperacion = () => {
  $contenedorBalance.classList.add("is-hidden");
  $contenedorCategoria.classList.add("is-hidden");
  $contenedorReportes.classList.add("is-hidden");
  $boxNuevaOperacion.classList.toggle("is-hidden");
};

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
