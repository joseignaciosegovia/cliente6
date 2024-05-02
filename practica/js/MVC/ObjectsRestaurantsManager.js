"use strict"

const _name = Symbol('name');
const _description = Symbol('description');
const _ingredients = Symbol('ingredients');
const _image = Symbol('image');
const _location = Symbol('location');
const _longitude = Symbol('longitude');
const _latitude = Symbol('latitude');

class Dish {
    constructor(name = "Plato", description = "", ingredients = [], image = "") {
        this[_name] = name;
        this[_description] = description;
        this[_ingredients] = ingredients;
        this[_image] = image;
    }
    
    get name() {
        return this[_name];
    }
    
    set name(name) {
        this[_name] = name;
    }

    get description() {
        return this[_description];
    }

    set description(description) {
        this[_description] = description;
    }

    get ingredients() {
        return this[_ingredients];
    }

    set ingredients(ingredients) {
        this[_ingredients] = ingredients;
    }

    get image() {
        return this[_image];
    }

    set image(image) {
        this[_image] = image;
    }

    toString() {
        let stringList = `Nombre: ${this[_name]}\nDescripción: ${this[_description]}\nIngredientes: `;
        // Se repite el bucle tantas veces como ingredientes haya en el plato
        for(let i = 0; i < this[_ingredients].length; i++) { 
            stringList += `${this[_ingredients][i]}, `;
        }
        stringList += `\nImagen: ${this[_image]}\n`;
        return stringList;
    }
}

class Category {
    constructor(name = "Categoría", description = "") {
        this[_name] = name;
        this[_description] = description;
    }
    
    get name() {
        return this[_name];
    }

    set name(name) {
        this[_name] = name;
    }

    get description() {
        return this[_description];
    }

    set description(description) {
        this[_description] = description;
    }

    toString() {
        let stringList = `Nombre: ${this[_name]}\nDescripción: ${this[_description]}\n`;
        return stringList;
    }
}

class Allergen {
    constructor(name = "Alérgeno", description = "") {
        this[_name] = name;
        this[_description] = description;
    }

    get name() {
        return this[_name];
    }

    set name(name) {
        this[_name] = name;
    }

    get description() {
        return this[_description];
    }

    set description(description) {
        this[_description] = description;
    }

    toString() {
        let stringList = `Nombre: ${this[_name]}\nDescripción: ${this[_description]}\n`;
        return stringList;
    }
}

class Menu {
    constructor(name = "Menú", description = "") {
        this[_name] = name;
        this[_description] = description;
    }

    get name() {
        return this[_name];
    }

    set name(name) {
        this[_name] = name;
    }

    get description() {
        return this[_description];
    }

    set description(description) {
        this[_description] = description;
    }

    toString() {
        let stringList = `Nombre: ${this[_name]}\nDescripción: ${this[_description]}\n`;
        return stringList;
    }
}

class Restaurant {
   constructor(name = "Restaurante", description = "", location = new Coordinate()) {
        this[_name] = name;
        this[_description] = description;
        this[_location] = location;
    }

    get name() {
        return this[_name];
    }

    set name(name) {
        this[_name] = name;
    }

    get description() {
        return this[_description];
    }

    set description(description) {
        this[_description] = description;
    }

    get location() {
        return this[_location];
    }

    set location(location) {
        this[_location] = location;
    }

    toString() {
        let stringList = `Nombre: ${this[_name]}\nDescripción: ${this[_description]}`
        stringList += `\nLocalización: (${this[_location][_latitude]}, ${this[_location][_longitude]})\n`;
        return stringList;
    }
}

class Coordinate {
    constructor(latitude = "0° 0' 0''", longitude = "0° 0' 0''") {
        this[_latitude] = latitude;
        this[_longitude] = longitude;
    }

    get latitude() {
        return this[_latitude];
    }

    set latitude(latitude) {
        this[_latitude] = latitude;
    }

    get longitude() {
        return this[_longitude];
    }

    set longitude(longitude) {
        this[_longitude] = longitude;
    }

    toString() {
        let stringList = `Latitude: ${this[_latitude]}\nLongitud: ${this[_longitude]}\n`;
        return stringList;
    }
}

export {
	Dish,
    Category,
    Allergen,
    Menu,
    Restaurant,
    Coordinate,
}