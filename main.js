// funcion maestra
const $ = (selector) => document.querySelector(selector);

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
// div central vista balance - imagen y texto
const $boxCtlVBalance = $("#operaciones");
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
let $detalleOperaciones = $("#detalle-operaciones");
const $titulosDetalle = $("#titulos-detalle");
// filtros
const $ocultarFiltros = $(".ocultar-filtros");
const $contenedorFiltros = $("#contenedor-filtros");
const $ocultarFiltrosTxt = $("#ocultar-filtros-txt");
const $filtroTipo = $("#filtro-tipo");
const $filtroCategoria = $("#filtro-categoria");
const $filtroFecha = $("#filtro-fecha");
const $filtroOrdenX = $("#filtro-ordenX");

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
// secciones principales - vistas
const cerrarVistas = () => {
  $contenedorCategoria.classList.add("is-hidden");
  $contenedorReportes.classList.add("is-hidden");
  $contenedorBalance.classList.add("is-hidden");
  $boxNuevaOperacion.classList.add("is-hidden");
};
const vistaBalance = () => {
  cerrarVistas();
  $contenedorBalance.classList.remove("is-hidden");
};
const vistaCategoria = () => {
  cerrarVistas();
  $contenedorCategoria.classList.remove("is-hidden");
};
const vistaReportes = () => {
  cerrarVistas();
  $contenedorReportes.classList.remove("is-hidden");
};
const nuevaOperacion = () => {
  cerrarVistas();
  $boxNuevaOperacion.classList.remove("is-hidden");
};
const cerrarBoxOperacion = () => {
  $boxNuevaOperacion.classList.toggle("is-hidden");
  $contenedorBalance.classList.toggle("is-hidden");
};
// vista balance - totales
const mostrarValores = () => {
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

  $totalIngresos.innerText = `$ ${totalIngresos}`;
  $totalGastos.innerText = `$ ${totalGastos}`;
  $saldoTotal.innerText = `$ ${totalGral}`;
};
// agregar nueva operacion
const agregarOperaciones = () => {
  let operacion = { ...datosOperacion };

  operacion.descripcion = $descripcion.value;
  operacion.monto = Number($monto.value);
  operacion.tipo = $tipoOperacion.value;
  operacion.categoria = $tipoCategoria.value;
  operacion.fecha = $fechaOperacion.value;
  operacion.id = self.crypto.randomUUID();

  listaOperaciones.push(operacion);
  localStorage.setItem("operacionNueva", JSON.stringify(listaOperaciones));
  vistaBalance();
  mostrarValores();
};
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
// filtrar y mostrar detalle de operaciones en vista balance
let detalle;
const filtros = () => {
  detalle = listaOperaciones;
  // primero filtra por tipo de operacion
  if ($filtroTipo.value !== "todos") {
    detalle = listaOperaciones.filter(
      (dato) => dato.tipo === $filtroTipo.value
    );
  }
  // del resultante ⬆ filtra por...
  if ($filtroCategoria.value !== "todos") {
    detalle = detalle.filter(
      (dato) => dato.categoria === $filtroCategoria.value
    );
  }
  // filta por fecha
  detalle = detalle.filter(
    (dato) => new Date(dato.fecha) >= new Date($filtroFecha.value)
  );
  // filtra por orden
  if ($filtroOrdenX.value === "menosReciente") {
    detalle = detalle.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }
  if ($filtroOrdenX.value === "masReciente") {
    detalle = detalle.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }
  if ($filtroOrdenX.value === "mayorMonto") {
    detalle = detalle.sort((a, b) => b.monto - a.monto);
  }
  if ($filtroOrdenX.value === "menorMonto") {
    detalle = detalle.sort((a, b) => a.monto - b.monto);
  }
  if ($filtroOrdenX.value === "ordenAZ") {
    detalle = detalle.sort((a, b) =>
      a.descripcion.localeCompare(b.descripcion)
    );
  }
  // localeCompere -- devuelve un número que indica si una cadena de referencia viene antes o después, o es la misma
  //independientemente de may - min o caracteres especiales
  if ($filtroOrdenX.value === "ordenZA") {
    detalle = detalle.sort((a, b) =>
      b.descripcion.localeCompare(a.descripcion)
    );
  }
  $boxCtlVBalance.classList.add("is-hidden");
  mostrarDetalle();
};
const mostrarDetalle = () => {
  // creo contenedor
  let divContainer = document.createElement("div");
  divContainer.classList.add("container");
  $titulosDetalle.classList.remove("is-hidden");
  for (const { descripcion, categoria, fecha, monto, id } of detalle) {
    divContainer.innerHTML += `
    <!-- Contenido tabla -->
    <div class="columns">
    <div class="column">${descripcion}</div>
    <div class="column">
    <span class="tag is-primary is-light">
    ${categoria}
    </span>
    </div>
    <div class="column">${fecha}</div>
    <div class="column">$ ${monto}</div>
    <div class="column is-size-7 is-flex">
    <button class="button is-ghost is-small editarItem ${id}">Editar</button>
    <button class="button is-ghost is-small eliminarItem ${id}">Eliminar</button>
    </div>
    </div>
    `;
    
    const btnEliminar = divContainer.querySelector(".eliminarItem");

    btnEliminar.onclick = function () {
      eliminarItem()
    };
    const btnEditar = divContainer.querySelector(".editarItem");
    console.log(editarItem);
  

    $detalleOperaciones.append(divContainer);
  }
};
// editar y eliminar
const eliminarItem = () => {
  alert("ESTA FUNCIONANDO ELIMINAR ONCLICK!!!");
};
const editarItem = () => {
  alert("ESTA FUNCIONANDO EDITAR ONCLICK!!!");
};
// inicio App
const inicioApp = () => {
  cerrarVistas();
  vistaBalance();
  mostrarValores();
};
inicioApp();

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
$filtroTipo.addEventListener("input", filtros);
$filtroCategoria.addEventListener("input", filtros);
$filtroFecha.addEventListener("input", filtros);
$filtroOrdenX.addEventListener("input", filtros);
