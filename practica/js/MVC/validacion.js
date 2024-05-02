function showFeedBack(input, valid, message) {
    const validClass = (valid) ? 'is-valid' : 'is-invalid';
    const messageDiv = (valid) ? input.parentElement.querySelector('div.valid-feedback') : input.parentElement.querySelector('div.invalid-feedback');
    for (const div of input.parentElement.getElementsByTagName('div')) {
      div.classList.remove('d-block');
    }
    messageDiv.classList.remove('d-none');
    messageDiv.classList.add('d-block');
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add(validClass);
    if (message) {
      messageDiv.innerHTML = message;
    }
  }
  
  function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
      showFeedBack(this, false);
    } else {
      showFeedBack(this, true);
    }
  }
  
  function nuevoPlatoValidacion(handler) {
    const form = document.forms.fNuevoPlato;
    form.setAttribute('novalidate', true);

    form.addEventListener('submit', function (event) {
      let isValid = true;
      let firstInvalidElement = null;
  
      this.ncURL.value = this.ncURL.value.trim();
      showFeedBack(this.ncURL, true);
  
      if (!this.ncIngredientes.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncIngredientes, false);
        firstInvalidElement = this.ncIngredientes;
      } else {
        showFeedBack(this.ncIngredientes, true);
      }
      if (!this.ncDescripcion.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncDescripcion, false);
        firstInvalidElement = this.ncDescripcion;
      } else {
        showFeedBack(this.ncDescripcion, true);
      }
  
      if (!this.ncNombre.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncNombre, false);
        firstInvalidElement = this.ncNombre;
      } else {
        showFeedBack(this.ncNombre, true);
      }

      if (!this.ncCategoria.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncCategoria, false);
        firstInvalidElement = this.ncCategoria;
      } else {
        showFeedBack(this.ncCategoria, true);
      }

      if (!this.ncAlergeno.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncAlergeno, false);
        firstInvalidElement = this.ncAlergeno;
      } else {
        showFeedBack(this.ncAlergeno, true);
      }
  
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        // Si la validación ha tenido éxito, invocamos el manejador, en el que crearemos la categoría
        // Guardamos las opciones elegidas de categorías y alérgenos en dos arrays
        const categorias = [...this.ncCategoria.selectedOptions].map((option) => option.value);
        const alergenos = [...this.ncAlergeno.selectedOptions].map((option) => option.value);
        handler(this.ncNombre.value, this.ncDescripcion.value, this.ncIngredientes.value, this.ncURL.value, categorias, alergenos);
      }
      // Su comportamiento por defecto es cancelado, aunque sea correcta,
      // ya que no debemos perder la página actual
      event.preventDefault();
      event.stopPropagation();
    });
  
    form.addEventListener('reset', (function (event) {
      for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
        div.classList.remove('d-block');
        div.classList.add('d-none');
      }
      for (const input of this.querySelectorAll('input')) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      }
      this.ncNombre.focus();
    }));
  
    // Validación línea a línea
    form.ncNombre.addEventListener('change', defaultCheckElement);
    form.ncURL.addEventListener('change', defaultCheckElement);
  }

  function eliminarPlatoValidacion(handler) {
    const form = document.forms.fBorrarPlato;
    form.setAttribute('novalidate', true);

    form.addEventListener('submit', function (event) {
      let isValid = true;
      let firstInvalidElement = null;
  
      if (!this.ncPlato.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncPlato, false);
        firstInvalidElement = this.ncPlato;
      } else {
        showFeedBack(this.ncPlato, true);
      }

      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        // Si la validación ha tenido éxito, invocamos el manejador, en el que crearemos la categoría
        const platos = [...this.ncPlato.selectedOptions].map((option) => option.value);
        handler(platos);
      }
      // Su comportamiento por defecto es cancelado, aunque sea correcta,
      // ya que no debemos perder la página actual
      event.preventDefault();
      event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
      for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
        div.classList.remove('d-block');
        div.classList.add('d-none');
      }
      for (const input of this.querySelectorAll('input')) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      }
      this.ncPlato.focus();
    }));
  }

  function asignarPlatoMenuValidacion(handlerAsignar, handlerDesasignar) {
    const form = document.forms.fPlatoMenu;
    form.setAttribute('novalidate', true);

    form.addEventListener('submit', function (event) {
      let isValid = true;
      let firstInvalidElement = null;
  
      this.ncMenu.value = this.ncMenu.value.trim();
      showFeedBack(this.ncMenu, true);
  
      if (!this.ecPlato.checkValidity()) {
        isValid = false;
        showFeedBack(this.ecPlato, false);
        firstInvalidElement = this.ecPlato;
      } else {
        showFeedBack(this.ecPlato, true);
      }
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        const platos = [...this.ecPlato.selectedOptions].map((option) => option.value);
        handlerAsignar(platos, this.ncMenu.value);
      }
      // Su comportamiento por defecto es cancelado, aunque sea correcta,
      // ya que no debemos perder la página actual
      event.preventDefault();
      event.stopPropagation();
    });

    form.desasignar.addEventListener('click', function (event) {
      let isValid = true;
      let firstInvalidElement = null;
  
      this.form.ncMenu.value = this.form.ncMenu.value.trim();
      showFeedBack(this.form.ncMenu, true);
  
      if (!this.form.ecPlato.checkValidity()) {
        isValid = false;
        showFeedBack(this.form.ecPlato, false);
        firstInvalidElement = this.form.ecPlato;
      } else {
        showFeedBack(this.form.ecPlato, true);
      }
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        const platos = [...this.form.ecPlato.selectedOptions].map((option) => option.value);
        handlerDesasignar(platos, this.form.ncMenu.value);
      }
      // Su comportamiento por defecto es cancelado, aunque sea correcta,
      // ya que no debemos perder la página actual
      event.preventDefault();
      event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
      for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
        div.classList.remove('d-block');
        div.classList.add('d-none');
      }
      for (const input of this.querySelectorAll('input')) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      }
    }));

    // Validación línea a línea
    form.ncMenu.addEventListener('change', defaultCheckElement);
  }

  function crearCategoriaValidacion(handler) {
    const form = document.forms.fNuevaCategoria;
    form.setAttribute('novalidate', true);

    form.addEventListener('submit', function (event) {
      let isValid = true;
      let firstInvalidElement = null;
  
      this.ncDescripcion.value = this.ncDescripcion.value.trim();
      showFeedBack(this.ncDescripcion, true);
  
      if (!this.ncNombre.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncNombre, false);
        firstInvalidElement = this.ncNombre;
      } else {
        showFeedBack(this.ncNombre, true);
      }
  
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        // Si la validación ha tenido éxito, invocamos el manejador, en el que crearemos la categoría
        handler(this.ncNombre.value, this.ncDescripcion.value);
      }
      // Su comportamiento por defecto es cancelado, aunque sea correcta,
      // ya que no debemos perder la página actual
      event.preventDefault();
      event.stopPropagation();
    });
  
    form.addEventListener('reset', (function (event) {
      for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
        div.classList.remove('d-block');
        div.classList.add('d-none');
      }
      for (const input of this.querySelectorAll('input')) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      }
      this.ncNombre.focus();
    }));
  
    // Validación línea a línea
    form.ncNombre.addEventListener('change', defaultCheckElement);
    form.ncDescripcion.addEventListener('change', defaultCheckElement);
  }

  function eliminarCategoriasValidacion(handler) {
    const form = document.forms.fEliminarCategorias;
    form.setAttribute('novalidate', true);

    form.addEventListener('submit', function (event) {
      let isValid = true;
      let firstInvalidElement = null;
  
      if (!this.ncCategoria.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncCategoria, false);
        firstInvalidElement = this.ncCategoria;
      } else {
        showFeedBack(this.ncCategoria, true);
      }
  
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        
        const categorias = [...this.ncCategoria.selectedOptions].map((option) => option.value);
        // Si la validación ha tenido éxito, invocamos el manejador, en el que eliminaremos las categorías
        handler(categorias);
      }
      // Su comportamiento por defecto es cancelado, aunque sea correcta,
      // ya que no debemos perder la página actual
      event.preventDefault();
      event.stopPropagation();
    });
  
    form.addEventListener('reset', (function (event) {
      for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
        div.classList.remove('d-block');
        div.classList.add('d-none');
      }
      for (const input of this.querySelectorAll('input')) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      }
    }));
  }

  function crearRestauranteValidacion(handler) {
    const form = document.forms.fNuevoRestaurante;
    form.setAttribute('novalidate', true);

    form.addEventListener('submit', function (event) {
      let isValid = true;
      let firstInvalidElement = null;

      this.ncLocalizacion.value = this.ncLocalizacion.value.trim();
      showFeedBack(this.ncLocalizacion, true);

      if (!this.ncDescripcion.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncDescripcion, false);
        firstInvalidElement = this.ncDescripcion;
      } else {
        showFeedBack(this.ncDescripcion, true);
      }
  
      if (!this.ncNombre.checkValidity()) {
        isValid = false;
        showFeedBack(this.ncNombre, false);
        firstInvalidElement = this.ncNombre;
      } else {
        showFeedBack(this.ncNombre, true);
      }
  
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        // Si la validación ha tenido éxito, invocamos el manejador, en el que crearemos la categoría
        handler(this.ncNombre.value, this.ncDescripcion.value, this.ncLocalizacion.value);
      }
      // Su comportamiento por defecto es cancelado, aunque sea correcta,
      // ya que no debemos perder la página actual
      event.preventDefault();
      event.stopPropagation();
    });
  
    form.addEventListener('reset', (function (event) {
      for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
        div.classList.remove('d-block');
        div.classList.add('d-none');
      }
      for (const input of this.querySelectorAll('input')) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      }
      this.ncNombre.focus();
    }));
  
    // Validación línea a línea
    form.ncNombre.addEventListener('change', defaultCheckElement);
    form.ncDescripcion.addEventListener('change', defaultCheckElement);
    form.ncLocalizacion.addEventListener('change', defaultCheckElement);
  }
  
  function categoriaPlatoValidacion(handler1, handler2) {
    const form = document.forms.fCategoriaPlato;
    form.setAttribute('novalidate', true);

    form.ecPlato.addEventListener('change', function (event) {
      let isValid = true;
      let firstInvalidElement = null;

     if (!this.form.ecPlato.checkValidity()) {
        isValid = false;
        showFeedBack(this.form.ecPlato, false);
        firstInvalidElement = this.form.ecPlato;
      } else {
        showFeedBack(this.form.ecPlato, true);
      }
  
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        // Si la validación ha tenido éxito, invocamos el manejador, en el que crearemos la categoría
        handler1(this.form.ecPlato.value);
      }
      // Su comportamiento por defecto es cancelado, aunque sea correcta,
      // ya que no debemos perder la página actual
      event.preventDefault();
      event.stopPropagation();
    });

    form.addEventListener('submit', function (event) {
      let isValid = true;
      let firstInvalidElement = null;

     if (!this.ecCategoria.checkValidity()) {
        isValid = false;
        showFeedBack(this.ecCategoria, false);
        firstInvalidElement = this.ecCategoria;
      } else {
        showFeedBack(this.ecCategoria, true);
      }
  
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        const categorias = [...this.ecCategoria.selectedOptions].map((option) => option.value);
        // Si la validación ha tenido éxito, invocamos el manejador, en el que añadiremos el plato a la categorías
        handler2(this.ecPlato.value, categorias);
      }
      // Su comportamiento por defecto es cancelado, aunque sea correcta,
      // ya que no debemos perder la página actual
      event.preventDefault();
      event.stopPropagation();
    });
  
    form.addEventListener('reset', (function (event) {
      for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
        div.classList.remove('d-block');
        div.classList.add('d-none');
      }
      for (const input of this.querySelectorAll('input')) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      }
    }));
  
    // Validación línea a línea
    form.ecPlato.addEventListener('change', defaultCheckElement);
  }
  
  export { 
    nuevoPlatoValidacion, 
    eliminarPlatoValidacion, 
    asignarPlatoMenuValidacion,
    crearCategoriaValidacion,
    eliminarCategoriasValidacion,
    crearRestauranteValidacion,
    categoriaPlatoValidacion,
  };
  