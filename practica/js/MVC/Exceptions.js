class BaseException extends Error {
    constructor (message = "", fileName, lineNumber){
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}

class NullOrIncorrectCategory extends BaseException {
	constructor(message = "Error: El elemento no es de tipo Category o es nulo.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "NullOrIncorrectCategory";
	}
}

class NullOrIncorrectDish extends BaseException {
	constructor(message = "Error: El elemento no es de tipo Dish o es nulo.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "NullOrIncorrectDish";
	}
}

class NullOrIncorrectMenu extends BaseException {
	constructor(message = "Error: El elemento no es de tipo Menu o es nulo.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "NullOrIncorrectMenu";
	}
}

class NullOrIncorrectAllergen extends BaseException {
	constructor(message = "Error: El elemento no es de tipo Allergen o es nulo.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "NullOrIncorrectAllergen";
	}
}

class NullOrIncorrectRestaurant extends BaseException {
	constructor(message = "Error: El elemento no es de tipo Restaurant o es nulo.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "NullOrIncorrectRestaurant";
	}
}

class RepeatedCategory extends BaseException {
	constructor(message = "Error: Category repetido.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "RepeatedCategory";
	}
}

class RepeatedMenu extends BaseException {
	constructor(message = "Error: Menu repetido.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "RepeatedMenu";
	}
}

class RepeatedDish extends BaseException {
	constructor(message = "Error: Dish repetido.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "RepeatedDish";
	}
}

class RepeatedRestaurant extends BaseException {
	constructor(message = "Error: Restaurant repetido.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "RepeatedRestaurant";
	}
}

class RepeatedAllergen extends BaseException {
	constructor(message = "Error: Allergen repetido.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "RepeatedAllergen";
	}
}

class NotFoundCategory extends BaseException {
	constructor(message = "Error: Category no encontrada.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "NotFoundCategory";
	}
}

class NotFoundMenu extends BaseException {
	constructor(message = "Error: Menu no encontrado.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "NotFoundMenu";
	}
}

class NotFoundAllergen extends BaseException {
	constructor(message = "Error: Allergen no encontrado.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "NotFoundAllergen";
	}
}

class NotFoundDish extends BaseException {
	constructor(message = "Error: Dish no encontrado.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "NotFoundDish";
	}
}

class NotFoundRestaurant extends BaseException {
	constructor(message = "Error: Restaurant no encontrado.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "NotFoundRestaurant";
	}
}

class DishExistsInCategoryException extends BaseException {
	constructor(message = "Error: Dish repetido en el array de Category.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "DishExistsInCategoryException";
	}
}

class DishExistsInAllergenException extends BaseException {
	constructor(message = "Error: Dish repetido en el array de Allergen.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "DishExistsInAllergeException";
	}
}

class DishExistsInMenuException extends BaseException {
	constructor(message = "Error: Dish repetido en el array de Menu.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "DishExistsInMenuException";
	}
}

class DishNotExistInCategoryException extends BaseException {
	constructor(message = "Error: Este Dish no existe en este Category.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "DishNotExistInCategoryException";
	}
}

class DishNotExistInMenuException extends BaseException {
	constructor(message = "Error: Este Dish no existe en este Menu.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "DishNotExistInMenuException";
	}
}

class DishNotExistInAllergenException extends BaseException {
	constructor(message = "Error: Este Dish no existe en este Allergen.", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "DishNotExistInAllergenException";
	}
}

export {
    BaseException,
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
}