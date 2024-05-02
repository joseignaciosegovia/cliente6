import {
	Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
} from './ObjectsRestaurantsManager.js'

const MODEL = Symbol('ShoppingCartModel');
const VIEW = Symbol('ShoppingCartView');
const LOAD_MANAGER_OBJECTS = Symbol('Load Manager Objects');

class Controlador {
  constructor(modelo, vista) {
    this[MODEL] = modelo;
    this[VIEW] = vista;

    // Eventos iniciales del Controlador
    this.onLoad();
    this.onInit();

    // Enlazamos handlers con la vista
    this[VIEW].bindInit(this.handleInit);
  }

  [LOAD_MANAGER_OBJECTS]() {
    const categoria1 = this[MODEL].createCategory("Categoría1", "Descripción1");
    const categoria2 = this[MODEL].createCategory("Categoría2", "Descripción2");
    const categoria3 = this[MODEL].createCategory("Categoría3", "Descripción3");
    this[MODEL].addCategory(categoria1, categoria2, categoria3);
  
    const plato1 = this[MODEL].createDish("Plato1", "Descripción2", ["Ingrediente1", "Ingrediente2"], "ruta3");
    const plato2 = this[MODEL].createDish("Plato2", "Descripción1", ["Ingrediente3", "Ingrediente4"], "ruta1");
    const plato3 = this[MODEL].createDish("Plato3", "Descripción3", ["Ingrediente5", "Ingrediente6"], "ruta2");
    const plato4 = this[MODEL].createDish("Plato4", "Descripción4", ["Ingrediente7", "Ingrediente8"], "ruta4");
    const plato5 = this[MODEL].createDish("Plato5", "Descripción5", ["Ingrediente9", "Ingrediente10"], "ruta5");
    const plato6 = this[MODEL].createDish("Plato6", "Descripción6", ["Ingrediente11", "Ingrediente12"], "ruta6");
    const plato7 = this[MODEL].createDish("Plato7", "Descripción7");
    const plato8 = this[MODEL].createDish("Plato8", "Descripción8");
    const plato9 = this[MODEL].createDish("Plato9", "Descripción9");
    const plato10 = this[MODEL].createDish("Plato10", "Descripción10", ["Ingrediente5", "Ingrediente6"], "ruta10");
    const plato11 = this[MODEL].createDish("Plato11", "Descripción11", ["Ingrediente7", "Ingrediente8"], "ruta11");
    const plato12 = this[MODEL].createDish("Plato12", "Descripción12", ["Ingrediente9", "Ingrediente10"], "ruta12");
    this[MODEL].assignDishToCategory(categoria1, plato1, plato2, plato3, plato4);
    this[MODEL].assignDishToCategory(categoria2, plato5, plato6, plato7, plato8);
    this[MODEL].assignDishToCategory(categoria3, plato9, plato10, plato11, plato12);

    const menu1 = this[MODEL].createMenu("Menu1", "Descripción1");
    const menu2 = this[MODEL].createMenu("Menu2", "Descripción2");
    const menu3 = this[MODEL].createMenu("Menu3", "Descripción3");
    this[MODEL].addMenu(menu1, menu2, menu3);
    this[MODEL].assignDishToMenu(menu1, plato1, plato2, plato3);
    this[MODEL].assignDishToMenu(menu2, plato4, plato5, plato6);
    this[MODEL].assignDishToMenu(menu3, plato7, plato8, plato9);

    const alergeno1 = this[MODEL].createAllergen("Alérgeno1", "Descripción1");
    const alergeno2 = this[MODEL].createAllergen("Alérgeno2", "Descripción2");
    const alergeno3 = this[MODEL].createAllergen("Alérgeno3", "Descripción3");
    const alergeno4 = this[MODEL].createAllergen("Alérgeno4", "Descripción4");
    this[MODEL].addAllergen(alergeno1, alergeno2, alergeno3, alergeno4);
    this[MODEL].assignDishToAllergen(alergeno1, plato1, plato2, plato3);
    this[MODEL].assignDishToAllergen(alergeno2, plato4, plato5, plato6);
    this[MODEL].assignDishToAllergen(alergeno3, plato7, plato8, plato9);
    this[MODEL].assignDishToAllergen(alergeno4, plato10, plato11, plato12);

    const restaurante1 = this[MODEL].createRestaurant("Restaurante1", "Descripción1", new Coordinate("33° 55' 33'' S", "99° 07' 40''"));
    const restaurante2 = this[MODEL].createRestaurant("Restaurante2", "Descripción2", new Coordinate("60° 39' 22'' S", "13° 57' 37''"));
    const restaurante3 = this[MODEL].createRestaurant("Restaurante3", "Descripción3", new Coordinate("22° 46' 17'' S", "75° 37' 22''"));
    this[MODEL].addRestaurant(restaurante1, restaurante2, restaurante3);
  }

  onLoad = () => {
    this[LOAD_MANAGER_OBJECTS]();

    this.onMostrarCategorias();
    this.onMostrarCategoriasMenu();
    this.onMostrarAlergenosMenu();
    this.onMostrarMenusMenu();
    this.onMostrarRestaurantesMenu();
    this.onMostrarFormulariosMenu();
    this[VIEW].bindFormMenu(
      this.handleNuevoPlatoForm,
      this.handleEliminarPlatoForm,
      this.handleAsignarPlatoForm,
      this.handleCrearCategoriaForm,
      this.handleEliminarCategoriaForm,
      this.handleCrearRestauranteForm,
      this.handleCategoriaPlatoForm,
    )
  };

  onInit = () => {
    this[VIEW].mostrarCategorias(this[MODEL].categories);
    this[VIEW].mostrarCategoriasMenu(this[MODEL].categories);
    this.onPlatosAleatorios();

    this[VIEW].bindCategoria(this.handleCategoria);
    this[VIEW].bindPlatoAleatorio(this.handlePlato);
    this[VIEW].bindAlergeno(this.handleAlergeno);
    this[VIEW].bindMenu(this.handleMenu);
    this[VIEW].bindRestaurante(this.handleRestaurante);
  };

  onMostrarCategorias = () => {
    this[VIEW].mostrarCategorias(this[MODEL].categories);
  };

  onMostrarCategoriasMenu = () => {
    this[VIEW].mostrarCategoriasMenu(this[MODEL].categories);
  };

  onMostrarAlergenosMenu = () => {
    this[VIEW].mostrarAlergenosMenu(this[MODEL].allergens);
  };

  onMostrarMenusMenu = () => {
    this[VIEW].mostrarMenusMenu(this[MODEL].menus);
  };

  onMostrarRestaurantesMenu = () => {
    this[VIEW].mostrarRestaurantesMenu(this[MODEL].restaurants);
  };

  onMostrarFormulariosMenu = () => {
    this[VIEW].mostrarFormulariosMenu();
  };

  onPlatosAleatorios() {
    const platos = [];
    for (let i = 0; i < 3; i++){
      platos[i] = this[MODEL].getDishes[Math.floor(Math.random() * this[MODEL].getDishes.length)];
    }
    this[VIEW].platosAleatorios(platos);
  }

  handleInit = () => {
    this.onInit();
  };

  handleCategoria = (categoria) => {
    if (categoria) {
      const categoriaSeleccionada = this[MODEL].createCategory(categoria, "");
      this[VIEW].listarPlatos(categoriaSeleccionada, categoriaSeleccionada.category.name);
      // Ahora que hemos pulsado en una categoría, tenemos que enlazar el método que se ejecutará al pinchar en sus platos
      this[VIEW].bindPlato(this.handlePlato);
    } else {
      throw new Error(`${categoria} no es un tipo de Category.`);
    }
  };

  handleAlergeno = (alergeno) => {
    if (alergeno) {
      const alergenoSeleccionado = this[MODEL].createAllergen(alergeno, "");
      this[VIEW].listarPlatos(alergenoSeleccionado, alergenoSeleccionado.allergen.name);
      // Ahora que hemos pulsado en un alérgeno, tenemos que enlazar el método que se ejecutará al pinchar en sus platos
      this[VIEW].bindPlato(this.handlePlato);
    } else {
      throw new Error(`${alergeno} no es un tipo de Allergen.`);
    }
  };

  handleMenu = (menu) => {
    if (menu) {
      const menuSeleccionado = this[MODEL].createMenu(menu, "");
      this[VIEW].listarPlatos(menuSeleccionado, menuSeleccionado.menu.name);
      // Ahora que hemos pulsado en un menú, tenemos que enlazar el método que se ejecutará al pinchar en sus platos
      this[VIEW].bindPlato(this.handlePlato);
    } else {
      throw new Error(`${menu} no es un tipo de Menu.`);
    }
  };

  handleRestaurante = (restaurante) => {
    if (restaurante) {
      const restauranteSeleccionado = this[MODEL].createRestaurant(restaurante, "");
      this[VIEW].mostrarRestaurante(restauranteSeleccionado);
    } else {
      throw new Error(`${restaurante} no es un tipo de Restaurant.`);
    }
  };

  handlePlato = (plato) => {
    if (plato) {
      const platoSeleccionado = this[MODEL].createDish(plato, "", [], "");
      this[VIEW].mostrarPlato(platoSeleccionado);
    } else {
      throw new Error(`${plato} no es un tipo de Dish.`);
    }
    
    
  };

  handleNuevoPlatoForm = () => {
    this[VIEW].mostrarCrearPlatoForm(this[MODEL].categories, this[MODEL].allergens);
    this[VIEW].bindNuevoPlatoForm(this.handleCrearPlato);
  };

  handleCrearPlato = (nombre, descripcion, ingredientes, imagen, categorias, alergenos) => {
    const arrayIngredientes = ingredientes.split(",");
    const plato = this[MODEL].createDish(nombre, descripcion, arrayIngredientes, imagen);

    let done; let
      error;
    try {
      this[MODEL].addDish(plato);
      // Recorremos las categorías y añadimos el plato a cada una de ellas
      for (let i = 0; i < categorias.length; i++) {
        this[MODEL].assignDishToCategory(this[MODEL].createCategory(categorias[i], "").category, plato);
      }
      // Recorremos los alérgenos y añadimos el plato a cada uno de ellos
      for (let i = 0; i < alergenos.length; i++) {
        this[MODEL].assignDishToAllergen(this[MODEL].createAllergen(alergenos[i], "").allergen, plato);
      }
      done = true;

    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].mostrarNuevoPlatoModal(done, plato, error);
  };

  handleEliminarPlatoForm = () => {
    this[VIEW].mostrarEliminarPlatoForm(this[MODEL].getDishes);
    this[VIEW].bindEliminarPlatoForm(this.handleEliminarPlato);
  };

  handleEliminarPlato = (nombresPlatos) => {
    let done; let
      error;

    try {
      // Como el médoto removeDish se encarga de desasignar el plato no hay que hacer nada más
      for (let i = 0; i < nombresPlatos.length; i++) {
        this[MODEL].removeDish(this[MODEL].createDish(nombresPlatos[i], "", [], ""));
      }
      done = true;

    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].mostrarEliminarPlatoModal(done, nombresPlatos, error);
  };

  handleAsignarPlatoForm = () => {
    this[VIEW].mostrarAsignarPlatoForm(this[MODEL].getDishes, this[MODEL].menus);
    this[VIEW].bindPlatoMenuForm(this.handleAsignarPlato, this.handleDesasignnarPlato);
  };

  handleAsignarPlato = (nombresPlatos, nombreMenu) => {
    const menu = this[MODEL].createMenu(nombreMenu, "").menu;

    let done; let
      error;

    try {
      for (let i = 0; i < nombresPlatos.length; i++) {
        this[MODEL].assignDishToMenu(menu, this[MODEL].createDish(nombresPlatos[i], ""));
      }
      done = true;

    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].mostrarAsignarPlatoModal(done, nombresPlatos, nombreMenu, error, "asignar");
  };

  handleDesasignnarPlato = (nombresPlatos, nombreMenu) => {
    const menu = this[MODEL].createMenu(nombreMenu, "").menu;

    let done; let
      error;

    try {
      for (let i = 0; i < nombresPlatos.length; i++) {
        this[MODEL].deassignDishToMenu(menu, this[MODEL].createDish(nombresPlatos[i], ""));
      }
      done = true;

    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].mostrarAsignarPlatoModal(done, nombresPlatos, nombreMenu, error, "desasignar");
  }

  handleCrearCategoriaForm = () => {
    this[VIEW].mostrarCrearCategoriaForm();
    this[VIEW].bindCrearCategoriaForm(this.handleCrearCategoria);
  };

  handleCrearCategoria = (nombreCategoria, descripcionCategoria) => {
    let done; let
      error;

    try {
      this[MODEL].addCategory(this[MODEL].createCategory(nombreCategoria, descripcionCategoria));
      // Actualizamos la lista de categorías en el menú y en la sección principal
      this.onMostrarCategorias();
      this.onMostrarCategoriasMenu();

      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }

    this[VIEW].mostrarCrearCategoriaModal(done, nombreCategoria, error);
  }

  handleEliminarCategoriaForm = () => {
    this[VIEW].mostrarEliminarCategoriasForm(this[MODEL].categories);
    this[VIEW].bindEliminarCategoriaForm(this.handleEliminarCategoria);
  };

  handleEliminarCategoria = (nombreCategorias) => {
    let done; let
      error;

    try {
      for(const nombreCategoria of nombreCategorias) 
        this[MODEL].removeCategory(this[MODEL].createCategory(nombreCategoria, "").category);
      // Actualizamos la lista de categorías en el menú y en la sección principal
      this.onMostrarCategorias();
      this.onMostrarCategoriasMenu();
    
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }

    this[VIEW].mostrarEliminarCategoriasModal(done, nombreCategorias, error);
  }

  handleCrearRestauranteForm = () => {
    this[VIEW].mostrarCrearRestauranteForm();
    this[VIEW].bindCrearRestauranteForm(this.handleCrearRestaurante);
  };

  handleCrearRestaurante = (nombreRestaurante, descripcionRestaurante, localizacionRestaurante) => {
    let done; let
      error;

    try {
      this[MODEL].addRestaurant(this[MODEL].createRestaurant(nombreRestaurante, descripcionRestaurante, localizacionRestaurante));
      // Actualizamos la lista de restaurantes en el menú
      this.onMostrarRestaurantesMenu();

      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].mostrarCrearRestauranteModal(done, nombreRestaurante, error);
  }

  handleCategoriaPlatoForm = () => {
    this[VIEW].mostrarCategoriaPlatoForm(this[MODEL].getDishes);
    this[VIEW].bindPlatoCategoriaForm(this.handleCategoriaPlato1, this.handleCategoriaPlato2);
  };

  handleCategoriaPlato1 = (nombreplato) => {
    this[VIEW].mostrarCategoriaPlatoForm2(nombreplato, this[MODEL].categories);
  }

  handleCategoriaPlato2 = (nombreplato, nombreCategorias) => {
    let done; let
      error;

    try {
      // Recorremos las categorías seleccionadas
      for(const nombreCategoria of nombreCategorias) 
        // Para cada categoría, añadimos el plato seleccinonado
        this[MODEL].assignDishToCategory(this[MODEL].createCategory(nombreCategoria, "").category, this[MODEL].createDish(nombreplato, "", [], ""));
    
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].mostrarCategoriaPlatoModal(done, nombreplato, error);
  }

}

export default Controlador;
