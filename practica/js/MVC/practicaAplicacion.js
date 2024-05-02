  import  {
    Dish, Category, Allergen, Menu, Restaurant, Coordinate,
  } from './ObjectsRestaurantsManager.js';
  import Modelo from './practicaModelo.js';
  import Controlador from './practicaControlador.js';
  import Vista from './practicaVista.js';
  
  const aplicacion = new Controlador(Modelo.getInstance(), new Vista());
  
  export default aplicacion;
  