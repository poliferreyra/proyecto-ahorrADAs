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
// vista balance - totales
const $totalIngresos = $("#total-ingresos");
const $totalGastos = $("#total-gastos");
const $saldoTotal = $("#saldo-total");
// filtros
const $ocultarFiltros = $(".ocultar-filtros");
const $contenedorFiltros = $("#contenedor-filtros");
const $ocultarFiltrosTxt = $("#ocultar-filtros-txt");

// array y objeto para nueva operacion
const listaOperaciones =
  JSON.parse(localStorage.getItem("operacionNueva")) || [];

const datosOperacion = {
  descripcion: "",
  monto: 0,
  tipo: "",
  categoria: "",
  fecha: "",
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
// vista nueva operacion
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
const agregarOperaciones = () => {
  let operacion = { ...datosOperacion };

  operacion.descripcion = $descripcion.value;
  operacion.monto = Number($monto.value);
  operacion.tipo = $tipoOperacion.value;
  operacion.categoria = $tipoCategoria.value;
  operacion.fecha = $fechaOperacion.value;

  listaOperaciones.push(operacion);
  localStorage.setItem("operacionNueva", JSON.stringify(listaOperaciones));
  // mostrarValores() ----  no estaría actualizando los valores de manera automática ❌
  vistaBalance();
};
// vista balance - totales
const montoIngresos = listaOperaciones
  .filter((ingresos) => ingresos.tipo === "ingresos")
  .map((valor) => valor.monto);
const totalIngresos = montoIngresos.reduce(
  (valorIn, valorAc) => valorIn + valorAc,
  0
);
const montoGastos = listaOperaciones
  .filter((ingresos) => ingresos.tipo === "gastos")
  .map((valor) => valor.monto);
const totalGastos = montoGastos.reduce(
  (valorIn, valorAc) => valorIn + valorAc,
  0
);
const totalGral = totalIngresos - totalGastos;

const mostrarValores = () => {
  $totalIngresos.innerText = totalIngresos;
  $totalGastos.innerText = totalGastos;
  $saldoTotal.innerText = totalGral;
};
mostrarValores();
// filtros
const ocultarFiltros = () => {
  if ($ocultarFiltrosTxt.innerText === "Ocultar Filtros") {
    $contenedorFiltros.classList.add("is-hidden");
    $ocultarFiltrosTxt.innerText = "Mostrar Filtros";
  } else {
    $contenedorFiltros.classList.remove("is-hidden");
    $ocultarFiltrosTxt.innerText = "Ocultar Filtros";
  }
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
$btnCancelarOperacion.addEventListener("click", cerrarBoxOperacion);
// agregar nueva operacion
$btnAgregarOperacion.addEventListener("click", agregarOperaciones);
// filtros
$ocultarFiltros.addEventListener("click", ocultarFiltros);
