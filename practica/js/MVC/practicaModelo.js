"use strict"
import {
    NullOrIncorrectCategory,
    NullOrIncorrectDish,
    NullOrIncorrectMenu,
    NullOrIncorrectAllergen,
	NullOrIncorrectRestaurant,
    RepeatedCategory,
	RepeatedMenu,
	RepeatedDish,
	RepeatedAllergen,
	RepeatedRestaurant,
    NotFoundCategory,
    NotFoundMenu,
    NotFoundAllergen,
    NotFoundDish,
	NotFoundRestaurant,
    DishExistsInCategoryException,
	DishExistsInAllergenException,
	DishExistsInMenuException,
    DishNotExistInCategoryException,
    DishNotExistInMenuException,
    DishNotExistInAllergenException,
} from './Exceptions.js'

import {
	Dish,
    Category,
    Allergen,
    Menu,
    Restaurant,
    Coordinate,
} from './ObjectsRestaurantsManager.js'

const _name = Symbol('name');
const _categories = Symbol('categories');
const _allergens = Symbol('allergens');
const _dishes = Symbol('dishes');
const _menus = Symbol('menus');
const _restaurants = Symbol('restaurants');
const _order = Symbol('order');

let Modelo = (function () {
    let instantiated; // Objeto con la instancia única RestaurantsManager

	function init() { // Inicialización del Singleton
        class RestaurantsManager {
            
            constructor() {
                this[_name] = "Nombre del Sistema";
                this[_categories] = [];
                this[_allergens] = [];
                this[_dishes] = [];
                this[_menus] = [];
                this[_restaurants] = [];
                this[_order] = {
                    name: (dishA, dishB) => {return dishA.name < dishB.name? -1 : 1},
                    description: (dishA, dishB) => {return dishA.description < dishB.description? -1 : 1},
                    ingredients: (dishA, dishB) => {return dishA.ingredients < dishB.ingredients? -1 : 1},
                    image: (dishA, dishB) => {return dishA.image < dishB.image? -1 : 1},
                }
            }

            get name() {
                return this[_name];
            }

            get getCategories() {
                return this[_categories];
            }

            get getAllergens() {
                return this[_allergens];
            }

            get getDishes() {
                return this[_dishes];
            }

            get getMenus() {
                return this[_menus];
            }

            get getRestaurants() {
                return this[_restaurants];
            }

            #sortCategoriesFunc = (category1, category2) => (
                (category1.category.name.toLocaleLowerCase() < category2.category.name.toLocaleLowerCase())
                  ? -1 : 1
            );

            #sortAllergensFunc = (allergen1, allergen2) => (
                (allergen1.allergen.name.toLocaleLowerCase() < allergen2.allergen.name.toLocaleLowerCase())
                  ? -1 : 1
            );

            #sortDishesFunc = (dish1, dish2) => (
                (dish1.name.toLocaleLowerCase() < dish2.name.toLocaleLowerCase())
                  ? -1 : 1
            );

            #sortMenusFunc = (menu1, menu2) => (
                (menu1.menu.name.toLocaleLowerCase() < menu2.menu.name.toLocaleLowerCase())
                  ? -1 : 1
            );

            #sortRestaurantsFunc = (restaurant1, restaurant2) => (
                (restaurant1.name.toLocaleLowerCase() < restaurant2.name.toLocaleLowerCase())
                  ? -1 : 1
            );

            // Dado una categoría, devuelve la posición de esa categoría 
            // en el array de categorías o -1 si no lo encontramos
			#getCategoryPosition(category) {
				function compareElements(element) {
					return (element.category.name === category.name)
				}
				return this.getCategories.findIndex(compareElements);
			}

            #getMenuPosition(menu) {
				function compareElements(element) {
					return (element.menu.name === menu.name)
				}
				return this.getMenus.findIndex(compareElements);
			}

            #getAllergenPosition(allergen) {
				function compareElements(element) {
					return (element.allergen.name === allergen.name)
				}
				return this.getAllergens.findIndex(compareElements);
			}

            #getDishPosition(dish) {
				function compareElements(element) {
					return (element.name === dish.name)
				}
				return this.getDishes.findIndex(compareElements);
			}

            #getRestaurantPosition(restaurant) {
				function compareElements(element) {
					return (element.name === restaurant.name)
				}
				return this.getRestaurants.findIndex(compareElements);
			}

            #getDishPositionInCategory(dish, category) {
                return category.dishes.findIndex(x => x.name === dish.name);
            }

            #getDishPositionInMenu(dish, menu) {
                return menu.dishes.findIndex(x => x.name === dish.name);
            }

            #getDishPositionInAllergen(dish, allergen) {
                return allergen.dishes.findIndex(x => x.name === dish.name);
            }

            get categories() {
                return this.getCategories[Symbol.iterator]();
            }

            get menus() {
                return this.getMenus[Symbol.iterator]();
            }

            get allergens() {
                return this.getAllergens[Symbol.iterator]();
            }

            get restaurants() {
                return this.getRestaurants[Symbol.iterator]();
            }

            addCategory(...categorias) {
                // Para cada categoría introducida
                for (let categoria of categorias) {
                    if (categoria === null || !(categoria instanceof Category))
                        throw new NullOrIncorrectCategory();
                    
                    let position = this.#getCategoryPosition(categoria);
                    if (position === -1) {
                        // Añade objeto literal con una propiedad para la categoría 
                        // y un array para los platos que pertenecen a esa categoría
                        this.getCategories.push(
                            {
                                category: categoria,
                                dishes: []
                            }
                        );
                        this.getCategories.sort(this.#sortCategoriesFunc);
                    } else {
                        throw new RepeatedCategory();
                    }
                }

                return this;
            }

            removeCategory(...categorias) {
                // Para cada categoría introducida
                for (let categoria of categorias) {
                    let encontrado = false;
                    // Creamos un iterador para las categorías y lo guardamos
                    let categoryIterator = this.categories;
                    let item = categoryIterator.next();
                    while (!item.done) {
                        if (item.value.category.name === categoria.name) {
                            this.getCategories.splice(this.#getCategoryPosition(item.value.category), 1);
                            encontrado = true;
                            break;
                        }
                        item = categoryIterator.next();
                    }

                    if (!encontrado)
                        throw new NotFoundCategory();
                }

                return this;
            }

            addMenu(...menus) {
                // Para cada menú introducido
                for (let menu of menus) {
                    if (menu === null || !(menu instanceof Menu))
                        throw new NullOrIncorrectMenu();
                    
                    let position = this.#getMenuPosition(menu);
                    if (position === -1) {
                        // Añade objeto literal con una propiedad para el menú 
                        // y un array para los platos dentro de ese menú
                        this.getMenus.push(
                            {
                                menu: menu,
                                dishes: []
                            }
                        );
                        this.getMenus.sort(this.#sortMenusFunc);
                    } else {
                        throw new RepeatedMenu();
                    }
                }

                return this;
            }

            removeMenu(...menus) {
                // Para cada categoría introducida
                for (let menu of menus) {
                    let encontrado = false;
                    // Creamos un iterador para los menús y lo guardamos
                    let menuIterator = this.menus;
                    let item = menuIterator.next();
                    while (!item.done) {
                        if (item.value.menu.name === menu.name) {
                            this.getMenus.splice(this.#getMenuPosition(item.value.menu), 1);
                            encontrado = true;
                            break;
                        }
                        item = menuIterator.next();
                    }

                    if (!encontrado)
                        throw new NotFoundMenu();
                }
                
                return this;
            }

            addAllergen(...allergens) {
                // Para cada alérgeno introducido
                for (let allergen of allergens) {
                    if (allergen === null || !(allergen instanceof Allergen))
                        throw new NullOrIncorrectAllergen();
                    
                    let position = this.#getAllergenPosition(allergen);
                    if (position === -1) {
                        // Añade objeto literal con una propiedad para el alérgeno y un array para los platos dentro de ese alérgeno
                        this.getAllergens.push(
                            {
                                allergen: allergen,
                                dishes: []
                            }
                        );
                        this.getAllergens.sort(this.#sortAllergensFunc);
                    } else {
                        throw new RepeatedAllergen();
                    }
                }
                
                return this;
            }

            removeAllergen(...allergens) {
                // Para cada alérgeno introducido
                for (let allergen of allergens) {
                    let encontrado = false;
                    // Creamos un iterador para los alérgenos y lo guardamos
                    let allergenIterator = this.allergens;
                    let item = allergenIterator.next();
                    while (!item.done) {
                        if (item.value.allergen.name === allergen.name) {
                            this.getAllergens.splice(this.#getAllergenPosition(item.value.allergen), 1);
                            encontrado = true;
                            break;
                        }
                        item = allergenIterator.next();
                    }

                    if (!encontrado)
                        throw new NotFoundAllergen();
                }
                
                return this;
            }

            addDish(...dishes) {
                // Para cada plato introducido
                for (let dish of dishes) {
                    if (dish === null || !(dish instanceof Dish))
                        throw new NullOrIncorrectDish();
                    
                    let position = this.#getDishPosition(dish);
                    if (position === -1) {
                        // Añade objeto literal con una propiedad para la categoría 
                        // y un array para las imágenes dentro de la categoría
                        this.getDishes.push(dish);
                        this.getDishes.sort(this.#sortDishesFunc);
                    } else {
                        throw new RepeatedDish();
                    }
                }
                
                return this;
            }

            removeDish(...dishes) {
                // Para cada plato introducido
                for (let dish of dishes) {
                    let encontrado = false;
                    // Creamos un iterador para los platos y lo guardamos
                    let dishIterator = this.getDishes[Symbol.iterator]();
                    let item = dishIterator.next();
                    // Recorremos los platos
                    while (!item.done) {
                        // Encontramos el plato introducido en el array de platos
                        if (item.value.name === dish.name) {
                            // Eliminamos el plato del array de platos
                            this.getDishes.splice(this.#getDishPosition(item.value), 1);
                            let categoryIterator = this.categories;
                            // Para cada categoría, buscamos el plato asociado y lo eliminamos si existe
                            for (let value of categoryIterator) {
                                if(value.dishes !== undefined) {
                                    let positionDish = this.#getDishPositionInCategory(dish, value);
                                    // Si el plato existe en esta categoría, lo eliminamos
                                    if(positionDish !== -1) {
                                        value.dishes.splice(positionDish, 1);
                                    }
                                }
                            }

                            let allergenIterator = this.allergens;
                            // Para cada alérgeno, buscamos el plato asociado y lo eliminamos si existe
                            for (let value of allergenIterator) {
                                let positionDish = this.#getDishPositionInAllergen(dish, value);
                                // Si el plato existe en este alérgeno, lo eliminamos
                                if(positionDish !== -1) {
                                    value.dishes.splice(positionDish, 1);
                                }
                            }

                            let menuIterator = this.menus;
                            // Para cada menú, buscamos el plato asociado y lo eliminamos si existe
                            for (let value of menuIterator) {
                                let positionDish = this.#getDishPositionInMenu(dish, value);
                                // Si el plato existe en este menú, lo eliminamos
                                if(positionDish !== -1) {
                                    value.dishes.splice(positionDish, 1);
                                }
                            }

                            encontrado = true;
                            break;
                        }
                        item = dishIterator.next();
                    }

                    if (!encontrado)
                        throw new NotFoundDish();
                }
                
                return this;
            }

            addRestaurant(...restaurants) {
                // Para cada restaurante introducido
                for (let restaurant of restaurants) {
                    if (restaurant === null || !(restaurant instanceof Restaurant))
                        throw new NullOrIncorrectRestaurant();
                    
                    let position = this.#getRestaurantPosition(restaurant);
                    if (position === -1) {
                        // Añade objeto literal con una propiedad para la categoría 
                        // y un array para las imágenes dentro de la categoría
                        this.getRestaurants.push(restaurant);
                        this.getRestaurants.sort(this.#sortRestaurantsFunc);
                    } else {
                        throw new RepeatedRestaurant();
                    }
                }
                
                return this;
            }

            removeRestaurant(...restaurants) {
                // Para cada restaurante introducido
                for (let restaurant of restaurants) {
                    let encontrado = false;
                    // Creamos un iterador para los restaurantes y lo guardamos
                    let restaurantIterator = this.restaurants;
                    let item = restaurantIterator.next();
                    while (!item.done) {
                        if (item.value.name === restaurant.name) {
                            this.getRestaurants.splice(this.#getRestaurantPosition(item.value), 1);
                            encontrado = true;
                            break;
                        }
                        item = restaurantIterator.next();
                    }

                    if (!encontrado)
                        throw new NotFoundRestaurant();
                }
                
                return this;
            }

            assignDishToCategory(category, ...dishes) {
                if (category === null || !(category instanceof Category)) {
                    throw new NullOrIncorrectCategory();
                }
                let positionCategory = this.#getCategoryPosition(category);
                // Si no existe la categoría, la añadimos
                if (positionCategory === -1) {
                    this.addCategory(category);
                    positionCategory = this.#getCategoryPosition(category);
                }
                // Para cada plato introducido
                for (const dish of dishes) {
                    if (dish === null || !(dish instanceof Dish)) {
                        throw new NullOrIncorrectDish();
                    }
                    let positionDish = this.#getDishPosition(dish);
                    // Si el plato es nuevo, lo añadimos
                    if (positionDish === -1) {
                        this.addDish(dish);
                        positionDish = this.#getDishPosition(dish);
                    }
                    const position = this.#getDishPositionInCategory(dish, this.getCategories[positionCategory]);
                    // Si el plato no existe en la categoría, lo añadimos
                    if (position === -1) {
                        this.getCategories[positionCategory].dishes.push(this.getDishes[positionDish]);
                    // Si el plato existe, lanzamos una excepción 
                    // (no puede estar el mismo plato dos veces en la misma categoría)
                    } else {
                        throw new DishExistsInCategoryException();
                    }
                }
                
                return this;
            }

            deassignDishToCategory(category, ...dishes) {
                if (category === null || !(category instanceof Category)) {
                    throw new NullOrIncorrectCategory();
                }
                let positionCategory = this.#getCategoryPosition(category);
                // Si la categoría existe
                if (positionCategory !== -1) {
                    for (const dish of dishes) {
                        if (dish === null || !(dish instanceof Dish)) {
                            throw new NullOrIncorrectDish ();
                        }
                        let positionDish = this.#getDishPositionInCategory(dish, this.getCategories[positionCategory]);
                        // Si el plato existe en la categoría indicada, lo borramos
                        if (positionDish !== -1) {
                            this.getCategories[positionCategory].dishes.splice(positionDish, 1);
                        // Si no existe, lanzamos una excepción 
                        // (no podemos borrar un plato que no existe)
                        } else {
                            throw new DishNotExistInCategoryException();
                        }
                    }
                } else{
                    throw new NotFoundCategory();
                }

                return this;
            }

            assignDishToMenu(menu, ...dishes) {
                if (menu === null || !(menu instanceof Menu)) {
                    throw new NullOrIncorrectMenu();
                }
                let positionMenu = this.#getMenuPosition(menu);
                // Si no existe el menú, lo añadimos
                if (positionMenu === -1) {
                    this.addMenu(menu);
                    positionMenu = this.#getMenuPosition(menu);
                }
                // Para cada plato introducido
                for (const dish of dishes) {
                    if (dish === null || !(dish instanceof Dish)) {
                        throw new NullOrIncorrectDish();
                    }
                    let positionDish = this.#getDishPosition(dish);
                    // Si el plato es nuevo, lo añadimos
                    if (positionDish === -1) {
                        this.addDish(dish);
                        positionDish = this.#getDishPosition(dish);
                    }
                    const position = this.#getDishPositionInMenu(dish, this.getMenus[positionMenu]);
                    // Si el plato no existe en el menú, lo añadimos
                    if (position === -1) {
                        this.getMenus[positionMenu].dishes.push(this.getDishes[positionDish]);
                    // Si el plato existe, lanzamos una excepción 
                    // (no puede estar el mismo plato dos veces en el mismo menú)
                    } else {
                        throw new DishExistsInMenuException();
                    }
                }
                
                return this;
            }

            deassignDishToMenu(menu, ...dishes) {
                if (menu === null || !(menu instanceof Menu)) {
                    throw new NullOrIncorrectMenu();
                }
                let positionMenu = this.#getMenuPosition(menu);
                // Si el menú existe
                if (positionMenu !== -1) {
                    for (const dish of dishes) {
                        if (dish === null || !(dish instanceof Dish)) {
                            throw new NullOrIncorrectDish();
                        }
                        let positionDish = this.#getDishPositionInMenu(dish, this.getMenus[positionMenu]);
                        // Si el plato existe en el menú indicado, lo borramos
                        if (positionDish !== -1) {
                            this.getMenus[positionMenu].dishes.splice(positionDish, 1);
                        // Si no existe, lanzamos una excepción (no podemos borrar un plato que no existe)
                        } else {
                            throw new DishNotExistInMenuException();
                        }
                    }
                } else{
                    throw new NotFoundMenu();
                }

                return this;
            }

            assignDishToAllergen(allergen, ...dishes) {
                if (allergen === null || !(allergen instanceof Allergen)) {
                    throw new NullOrIncorrectAllergen();
                }
                let positionAllergen = this.#getAllergenPosition(allergen);
                // Si no existe el menú, lo añadimos
                if (positionAllergen === -1) {
                    this.addAllergen(allergen);
                    positionAllergen = this.#getAllergenPosition(allergen);
                }
                // Para cada plato introducido
                for (const dish of dishes) {
                    if (dish === null || !(dish instanceof Dish)) {
                        throw new NullOrIncorrectDish();
                    }
                    let positionDish = this.#getDishPosition(dish);
                    // Si el plato es nuevo, lo añadimos
                    if (positionDish === -1) {
                        this.addDish(dish);
                        positionDish = this.#getDishPosition(dish);
                    }
                    const position = this.#getDishPositionInAllergen(dish, this.getAllergens[positionAllergen]);
                    // Si el plato no existe en el alérgeno, lo añadimos
                    if (position === -1) {
                        this.getAllergens[positionAllergen].dishes.push(this.getDishes[positionDish]);
                        //this.#alergenos[positionCategory].dishes.sort(this.#sortDishesInAllergen);
                    // Si el plato existe, lanzamos una excepción (no puede estar el mismo plato dos veces en el mismo alérgeno)
                    } else {
                        throw new DishExistsInAllergenException();
                    }
                }
                    
                return this;
            }

            deassignDishToAllergen(allergen, ...dishes) {
                if (allergen === null || !(allergen instanceof Allergen)) {
                    throw new NullOrIncorrectAllergen();
                }
                let positionAllergen = this.#getAllergenPosition(allergen);
                // Si el menú existe
                if (positionAllergen !== -1) {
                    for (const dish of dishes) {
                        if (dish === null || !(dish instanceof Dish)) {
                            throw new NullOrIncorrectDish();
                        }
                        let positionDish = this.#getDishPositionInAllergen(dish, this.getAllergens[positionAllergen]);
                        // Si el plato existe en el menú indicado, lo borramos
                        if (positionDish !== -1) {
                            this.getAllergens[positionAllergen].dishes.splice(positionDish, 1);
                        // Si no existe, lanzamos una excepción (no podemos borrar un plato que no existe)
                        } else {
                            throw new DishNotExistInAllergenException();
                        }
                    }
                } else{
                    throw new NotFoundAllergen();
                }

                return this;
            }

            changeDishesPositionsInMenu(menu, ...platos) {
                if (menu === null || !(menu instanceof Menu)) 
                    throw new NullOrIncorrectMenu();
                let positionMenu = this.#getMenuPosition(menu);
                
                if (positionMenu !== -1) {
                    // Para cada par de platos
                    for(let i = 0; i < platos.length; i += 2) {
                        if ((platos[i] === null || !(platos[i] instanceof Dish)) || (platos[i+1] === null || !(platos[i+1] instanceof Dish))) 
                            throw new NullOrIncorrectDish();
                        else{
                            // Intercambiamos el plato de la posición impar por el de la posición par
                            let positionPlato1 = this.#getDishPositionInMenu(platos[i], this.getMenus[positionMenu]);
                            let positionPlato2 = this.#getDishPositionInMenu(platos[i+1], this.getMenus[positionMenu]);
                            if (positionPlato1 !== -1 || positionPlato2 !== -1) {
                                let auxPlato1 = this.getMenus[positionMenu].dishes[positionPlato1];
                                this.getMenus[positionMenu].dishes[positionPlato1] = this.getMenus[positionMenu].dishes[positionPlato2];
                                this.getMenus[positionMenu].dishes[positionPlato2] = auxPlato1;
                            } else {
                                throw new DishNotExistInMenuException();
                            }
                        }
                    }
                } else {
                    throw new NotFoundMenu();
                }
                
                return this;
            }

            * getDishesInCategory(category, ordenacion = "name") {
                if (category === null || !(category instanceof Category)) 
                    throw new NullOrIncorrectCategory();
                let positionCategory = this.#getCategoryPosition(category);
                // Si la categoría existe
                if (positionCategory !== -1) {
                    // Guardamos los platos (de la categoría) ordenados 
                    // según el criterio pasado como parámetro
                    let orderedDishes = this.getCategories[positionCategory].dishes.sort(this[_order][ordenacion]);
                    // Devolvemos el iterador creado a partir de los platos ordenados
                    //return orderedDishes[Symbol.iterator]();
                    for (const dish of orderedDishes)
                        yield dish;
                } else{
                    throw new NotFoundCategory();
                }
            }

            * getDishesWithAllergen(allergen, ordenacion = "name") {
                if (allergen === null || !(allergen instanceof Allergen)) 
                    throw new NullOrIncorrectAllergen();
                let positionAllergen = this.#getAllergenPosition(allergen);
                // Si el alérgeno existe
                if (positionAllergen !== -1) {
                    // Guardamos los platos (con el alérgeno) ordenados 
                    // según el criterio pasado como parámetro
                    let orderedDishes = this.getAllergens[positionAllergen].dishes.sort(this[_order][ordenacion]);
                    // Devolvemos el iterador creado a partir de los platos ordenados
                    for (const dish of orderedDishes)
                        yield dish;
                } else{
                    throw new NotFoundAllergen();
                }
            }

            * findDishes(ordenacion = "name") {
                let orderedDishes = this.getDishes.sort(this[_order][ordenacion]);
                for (const dish of orderedDishes)
                    yield dish;
            }

            createDish(name, description, ingredients, image) {
                let dishPosition = this.#getDishPosition(new Dish(name));
                let dish;
                // Si no existe el plato en la factoría, lo creamos
                if (dishPosition == -1)
                    dish = new Dish(name, description, ingredients, image);
                else
                // Si existe, lo devolvemos
                    dish = this.getDishes[dishPosition];
                return dish;
            }

            createMenu(name, description) {
                let menuPosition = this.#getMenuPosition(new Menu(name));
                let menu;
                // Si no existe el menú en la factoría, lo creamos
                if (menuPosition == -1)
                    menu = new Menu(name, description);
                else
                // Si existe, lo devolvemos
                    menu = this.getMenus[menuPosition];
                return menu;
            }

            createAllergen(name, description) {
                let allergenPosition = this.#getAllergenPosition(new Allergen(name));
                let allergen;
                // Si no existe el alérgeno en la factoría, lo creamos
                if (allergenPosition == -1)
                    allergen = new Allergen(name, description);
                else
                // Si existe, lo devolvemos
                    allergen = this.getAllergens[allergenPosition];
                return allergen;
            }

            createCategory(name, description) {
                let categoryPosition = this.#getCategoryPosition(new Category(name));
                let category;
                // Si no existe la categoría en la factoría, la creamos
                if (categoryPosition == -1)
                    category = new Category(name, description);
                else
                // Si existe, la devolvemos
                    category = this.getCategories[categoryPosition];
                return category;
            }

            createRestaurant(name, description, location) {
                let restaurantPosition = this.#getRestaurantPosition(new Restaurant(name));
                let restaurant;
                // Si no existe el restaurante en la factoría, lo creamos
                if (restaurantPosition == -1)
                    restaurant = new Restaurant(name, description, location);
                else
                // Si existe, lo devolvemos
                    restaurant = this.getRestaurants[restaurantPosition];
                return restaurant;
            }
        }
        // Devolvemos el objeto RestaurantsManager para que sea una instancia única
        let instance = new RestaurantsManager;
		Object.freeze(instance);
		return instance;
    }
    return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () {
            // Si la variable instantiated es undefined ejecuta init
			if (!instantiated) { 
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
        // AQUÍ DEBERÁ IR LO QUE PONE EN LA PÁGINA 31 DE IMPLEMENTACIÓN OBJETO MANAGER
	};
})();

export default Modelo;