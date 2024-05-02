import aplicacion from './MVC/practicaAplicacion.js';

const historyActions = {
  init: () => {
    aplicacion.handleInit();
  },
  plato: () => aplicacion.handlePlatoAleatorio(),
  categoria: () => aplicacion.handleCategoria(),
  alergeno: () => aplicacion.handleAlergeno(),
  menu: () => aplicacion.handleMenu(),
  restaurante: () => aplicacion.handleRestaurante(),
  nuevoplato: () => aplicacion.handleNuevoPlatoForm(),
  eliminarplato: () => aplicacion.handleEliminarPlatoForm(),
  platomenu: () => aplicacion.handlePlatoMenu(),
  desasignarplato: () => aplicacion.handleDesasignnarPlato(),
  crearcategoria: () => aplicacion.handleCrearCategoria(),
  eliminarcategoria: () => aplicacion.handleEliminarCategoria(),
  nuevorestaurante: () => aplicacion.handleCrearRestaurante(),
  categoriaplato: () => aplicacion.handleCategoriaPlato1(),
};

window.addEventListener('popstate', (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

history.replaceState({ action: 'init' }, null);
