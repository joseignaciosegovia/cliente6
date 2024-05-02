import { 
  nuevoPlatoValidacion, 
  eliminarPlatoValidacion, 
  asignarPlatoMenuValidacion,
  crearCategoriaValidacion,
  eliminarCategoriasValidacion,
  crearRestauranteValidacion,
  categoriaPlatoValidacion,
} from './validacion.js';

const EXCECUTE_HANDLER = Symbol('excecuteHandler');
class Vista {
  constructor() {
    this.main = document.getElementsByTagName('main')[0];
    this.menu = document.querySelector('.navbar-nav');
  }

  [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  mostrarCategorias(categorias) {
    this.main.replaceChildren();
    const container = document.createElement('div');
    container.setAttribute("id", "categoria-main");
    for (const categoria of categorias) {
      container.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6"><a data-categoria="${categoria.category.name}" href="#categories-list">
        <div class="cat-list-text">
          <h3>${categoria.category.name}</h3></a>
        </div>
    </div>`);
    }
	  this.main.append(container);
  }

  // Mostramos las categorías en el menú de categorías
  mostrarCategoriasMenu(categorias) {
    const categoriesListMenu = document.getElementById('categorias-list-menu');
    // Borro el menú de categorías para actualizarlo
    categoriesListMenu.replaceChildren();
    categoriesListMenu.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#categories-list" id="navbarDropdown" 
      role="button" data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`);
    const suboptions = document.createElement('ul');
    suboptions.classList.add('dropdown-menu');
    for (const categoria of categorias) {
      suboptions.insertAdjacentHTML('beforeend', `<li><a class="dropdown-item" href="#categories-list" 
      data-categoria="${categoria.category.name}">${categoria.category.name}</a></li>`);
    }
    categoriesListMenu.append(suboptions);
  }

  mostrarAlergenosMenu(alergenos) {
    const alergenosListMenu = document.getElementById('alergenos-list-menu');
    // Borro el menú de alérgenos para actualizarlo
    alergenosListMenu.replaceChildren();
    alergenosListMenu.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#alergenos-list" id="navbarDropdown2" 
      role="button" data-bs-toggle="dropdown" aria-expanded="false">Alérgenos</a>`);
    const suboptions = document.createElement('ul');
    suboptions.classList.add('dropdown-menu');
    for (const alergeno of alergenos) {
      suboptions.insertAdjacentHTML('beforeend', `<li><a class="dropdown-item" href="#alergenos-list" 
      data-alergeno="${alergeno.allergen.name}">${alergeno.allergen.name}</a></li>`);
    }
    alergenosListMenu.append(suboptions);
  }

  mostrarMenusMenu(menus) {
    const menusListMenu = document.getElementById('menus-list-menu');
    // Borro el menú de menús para actualizarlo
    menusListMenu.replaceChildren();
    menusListMenu.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#menus-list" id="navbarDropdown3" 
      role="button" data-bs-toggle="dropdown" aria-expanded="false">Menús</a>`);
    const suboptions = document.createElement('ul');
    suboptions.classList.add('dropdown-menu');
    for (const menu of menus) {
      suboptions.insertAdjacentHTML('beforeend', `<li><a class="dropdown-item" href="#menus-list" 
      data-menu="${menu.menu.name}">${menu.menu.name}</a></li>`);
    }
    menusListMenu.append(suboptions);
  }

  mostrarRestaurantesMenu(restaurantes) {
    const restaurantesListMenu = document.getElementById('restaurantes-list-menu');
    // Borro el menú de restaurantes para actualizarlo
    restaurantesListMenu.replaceChildren();
    restaurantesListMenu.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#restaurantes-list" id="navbarDropdown4" 
      role="button" data-bs-toggle="dropdown" aria-expanded="false">Restaurantes</a>`);
    const suboptions = document.createElement('ul');
    suboptions.classList.add('dropdown-menu');
    for (const restaurante of restaurantes) {
      suboptions.insertAdjacentHTML('beforeend', `<li><a class="dropdown-item" href="#restaurantes-list" 
      data-restaurante="${restaurante.name}">${restaurante.name}</a></li>`);
    }
    restaurantesListMenu.append(suboptions);
  }

  mostrarRestaurante(restaurante) {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();
    const container = document.createElement('div');
    container.setAttribute("id", "restaurante-main");
    container.insertAdjacentHTML('beforeend', `Información del restaurante seleccionado:
    <br/>Nombre: ${restaurante.name}
    <br/>Descripción: ${restaurante.description}
    <br/>Localización: ${restaurante.location}`);
	  this.main.append(container);
  }

  mostrarPlato(plato) {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();
    const container = document.createElement('div');
    container.setAttribute("id", "plato-main");
    container.insertAdjacentHTML('beforeend', `Información del plato seleccionado:
    <br/>Nombre: ${plato.name}
    <br/>Descripción: ${plato.description}
    <br/>Ingredientes:`);
    for (let i = 0; i < plato.ingredients.length; i++) {
      container.insertAdjacentHTML('beforeend', `<br/>${plato.ingredients[i]}`);
    }
    container.insertAdjacentHTML('beforeend', `<br/>Imagen: ${plato.image}`);
	  this.main.append(container);
  }

  mostrarFormulariosMenu() {
    const menuOption = document.getElementById('formularios-list-menu');
    // Borro el menú de formularios para actualizarlo
    menuOption.replaceChildren();
    menuOption.insertAdjacentHTML(
      'afterbegin',
      '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">Formularios</a>',
    );
    const suboptions = document.createElement('ul');
    suboptions.classList.add('dropdown-menu');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnuevoPlato" class="dropdown-item" href="#nuevo-plato">Crear plato</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="leliPlato" class="dropdown-item" href="#eli-plato">Eliminar plato</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lplatoMenu" class="dropdown-item" href="#plato-menu">Des/asignar platos a menús</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnuevoCategoria" class="dropdown-item" href="#nuevo-categoria">Crear categoría</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelCategoria" class="dropdown-item" href="#del-categoria">Eliminar categorías</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnuevoRestaurante" class="dropdown-item" href="#nuevo-restaurante">Crear restaurante</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lcategoriaPlato" class="dropdown-item" href="#categoria-plato">Modificar categorías de un plato</a></li>');
    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  mostrarCrearPlatoForm(categorias, alergenos) {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'nuevo-plato';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Nuevo Plato</h1>',
    );
    container.insertAdjacentHTML(
      'beforeend',
      `<form name="fNuevoPlato" role="form" class="row g-3" novalidate>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncNombre">Nombre *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="ncNombre" name="ncNombre"
						placeholder="Nombre del plato" value="" required>
					<div class="invalid-feedback">El nombre es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncDescripcion">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ncDescripcion" name="ncDescripcion"
						value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="ncIngredientes">Ingredientes</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ncIngredientes" name="ncIngredientes" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="col-md-12 mb-3">
				<label class="form-label" for="ncURL">URL</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="text" class="form-control" id="ncURL" name="ncURL" value="" placeholder="URL del plato">
					<div class="invalid-feedback">La URL no es válida</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncCategoria">Categoría del plato</label>
        <div class="input-group">
          <label class="input-group-text" for="ncCategoria"><i class="bi bi-card-checklist"></i></label>
          <select class="form-select" name="ncCategoria" id="ncCategoria" multiple requiered>
            <option selected>Selecciona...</option>
          </select>
          <div class="invalid-feedback">El plato debe pertenecer al menos a una categoría.</div>
					<div class="valid-feedback">Correcto.</div>
        </div>  
      </div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncAlergeno">Alérgenos del plato</label>
        <div class="input-group">
          <label class="input-group-text" for="ncAlergeno"><i class="bi bi-card-checklist"></i></label>
          <select class="form-select" name="ncAlergeno" id="ncAlergeno" multiple requiered>
            <option selected>Selecciona...</option>
          </select>
          <div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
        </div>  
      </div>
      <div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
      </div>
      </form>`,
    );
    const ncCategoria = container.querySelector('#ncCategoria');
    for (const categoria of categorias){
      ncCategoria.insertAdjacentHTML('beforeend', `	<option value="${categoria.category.name}">${categoria.category.name}</option>
        `);
    }

    const ncAlergeno = container.querySelector('#ncAlergeno');
    for (const alergeno of alergenos){
      ncAlergeno.insertAdjacentHTML('beforeend', `	<option value="${alergeno.allergen.name}">${alergeno.allergen.name}</option>
        `);
    }
    
    this.main.append(container);
  }

  mostrarNuevoPlatoModal(done, plato, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nuevo Plato';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${plato.name}</strong> ha sido creado correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${plato.name}</strong> ya está creado.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNuevoPlato.reset();
      }
      document.fNuevoPlato.ncNombre.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  mostrarEliminarPlatoForm(platos) {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'eli-plato';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Eliminar plato</h1>',
    );
    container.insertAdjacentHTML(
      'beforeend',
      `<form name="fBorrarPlato" role="form" class="row g-3" novalidate>
        <div class="col-md-12 mb-3">
          <label class="form-label" for="ncPlato">Platos a eliminar</label>
          <div class="input-group">
            <label class="input-group-text" for="ncPlato"><i class="bi bi-card-checklist"></i></label>
            <select class="form-select" name="ncPlato" id="ncPlato" multiple requiered>
              <option selected>Selecciona...</option>
            </select>
            <div class="invalid-feedback">Hay que elegir al menos un plato.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>  
        </div>
        <div class="mb-12">
          <button class="btn btn-primary" type="submit">Borrar</button>
          <button class="btn btn-primary" type="reset">Cancelar</button>
        </div>
      </form>`,
    );
    const ncPlato = container.querySelector('#ncPlato');
    for (const plato of platos){
      ncPlato.insertAdjacentHTML('beforeend', `	<option value="${plato.name}">${plato.name}</option>
        `);
    }
    
    this.main.append(container);
  }

  mostrarEliminarPlatoModal(done, nombresPlatos, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Eliminar Plato';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      for(const nombrePlato of nombresPlatos) {
        body.insertAdjacentHTML('afterbegin', 
        `<div class="p-3">El plato <strong>${nombrePlato}</strong> ha sido eliminado correctamente.</div>`);
      }
    } else {
      for(const nombrePlato of nombresPlatos) {
        body.insertAdjacentHTML('afterbegin',
          `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${nombrePlato}</strong> no existe.</div>`,
        );
      }
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fBorrarPlato.reset();
      }
      document.fBorrarPlato.ncPlato.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  mostrarAsignarPlatoForm(platos, menus) {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'plato-menu';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Nuevo plato</h1>',
    );
    container.insertAdjacentHTML(
      'beforeend',
      `<form name="fPlatoMenu" role="form" class="row g-3" novalidate>
			<div class="col-md-12 mb-3">
        <label class="form-label" for="ncMenu">Menús</label>
        <div class="input-group">
          <label class="input-group-text" for="ncMenu"><i class="bi bi-card-checklist"></i></label>
          <select class="form-select" name="ncMenu" id="ncMenu" requiered>
            <option selected>Selecciona...</option>
          </select>
          <div class="invalid-feedback">Hay que elegir un menú.</div>
					<div class="valid-feedback">Correcto.</div>
        </div>  
      </div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ecPlato">Platos a des/asignar del menú elegido</label>
        <div class="input-group">
          <label class="input-group-text" for="ecPlato"><i class="bi bi-card-checklist"></i></label>
          <select class="form-select" name="ecPlato" id="ecPlato" multiple requiered>
            <option selected>Selecciona...</option>
          </select>
          <div class="invalid-feedback">Hay que elegir al menos un plato</div>
					<div class="valid-feedback">Correcto.</div>
        </div>  
      </div>
      <div class="mb-12">
        <button class="btn btn-primary" type="submit">Asignar</button>
        <button class="btn btn-primary" nombre="desasignar" id="desasignar">Desasignar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
      </div>
      </form>`,
    );
    const ncMenu = container.querySelector('#ncMenu');
    for (const menu of menus){
      ncMenu.insertAdjacentHTML('beforeend', `	<option value="${menu.menu.name}">${menu.menu.name}</option>
        `);
    }

    const ecPlato = container.querySelector('#ecPlato');
    for (const plato of platos){
      ecPlato.insertAdjacentHTML('beforeend', `	<option value="${plato.name}">${plato.name}</option>
        `);
    }
    
    this.main.append(container);
  }

  mostrarAsignarPlatoModal(done, nombresPlatos, nombreMenu, error, modo) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    if(modo == "asignar") {
      title.innerHTML = 'Asignar Plato';
      const body = messageModalContainer.querySelector('.modal-body');
      body.replaceChildren();
      if (done) {
        for(const nombrePlato of nombresPlatos) 
          body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${nombrePlato}</strong> ha sido asignado correctamente del menu <strong>${nombreMenu}</strong>.</div>`);
      } else {
        for(const nombrePlato of nombresPlatos) 
          body.insertAdjacentHTML('afterbegin',
            `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${nombrePlato}</strong> ya está asignado en el menu <strong>${nombreMenu}</strong>.</div>`,
        );
      }
    } else {
      title.innerHTML = 'Desasignar Plato';
      const body = messageModalContainer.querySelector('.modal-body');
      body.replaceChildren();
      if (done) {
        for(const nombrePlato of nombresPlatos) 
          body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${nombrePlato}</strong> ha sido desasignado correctamente del menu <strong>${nombreMenu}</strong>.</div>`);
      } else {
        for(const nombrePlato of nombresPlatos) 
          body.insertAdjacentHTML('afterbegin',
            `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${nombrePlato}</strong> no está asignado en el menu <strong>${nombreMenu}</strong>.</div>`,
        );
      }
    }
    
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fPlatoMenu.reset();
      }
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  mostrarCrearCategoriaForm() {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'nuevo-categoria';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Nueva Categoría</h1>',
    );
    container.insertAdjacentHTML(
      'beforeend',
      `<form name="fNuevaCategoria" role="form" class="row g-3" novalidate>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncNombre">Nombre *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="ncNombre" name="ncNombre"
						placeholder="Nombre de la categoría" value="" required>
					<div class="invalid-feedback">El nombre es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncDescripcion">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ncDescripcion" name="ncDescripcion"
						value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
      </div>
      </form>`,
    );
    this.main.append(container);
  }

  mostrarCrearCategoriaModal(done, nombreCategoria, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Crear Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría <strong>${nombreCategoria}</strong> ha sido creada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${nombreCategoria}</strong> ya está creada.</div>`,
      );
    }
    
    messageModal.show();
    const listener = (event) => {
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  mostrarEliminarCategoriasForm(categorias) {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'del-categoria';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Eliminar Categorías</h1>',
    );
    container.insertAdjacentHTML(
      'beforeend',
      `<form name="fEliminarCategorias" role="form" class="row g-3" novalidate>
			<div class="col-md-12 mb-3">
        <label class="form-label" for="ncCategoria">Categorías a eliminar</label>
        <div class="input-group">
          <label class="input-group-text" for="ncCategoria"><i class="bi bi-card-checklist"></i></label>
          <select class="form-select" name="ncCategoria" id="ncCategoria" multiple requiered>
            <option selected>Selecciona...</option>
          </select>
          <div class="invalid-feedback">Hay que elegir al menos una categoría</div>
					<div class="valid-feedback">Correcto.</div>
        </div>  
      </div>
			<div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
      </div>
      </form>`,
    );

    const ncCategoria = container.querySelector('#ncCategoria');
    for (const categoria of categorias){
      ncCategoria.insertAdjacentHTML('beforeend', `	<option value="${categoria.category.name}">${categoria.category.name}</option>
        `);
    }

    this.main.append(container);
  }

  mostrarEliminarCategoriasModal(done, nombreCategorias, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Eliminar Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      for(const nombreCategoria of nombreCategorias) 
        body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría <strong>${nombreCategoria}</strong> ha sido eliminada correctamente.</div>`);
    } else {
      for(const nombreCategoria of nombreCategorias) 
        body.insertAdjacentHTML('afterbegin',
          `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${nombreCategoria}</strong> no existe.</div>`,
      );
    }
    
    messageModal.show();
    const listener = (event) => {
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  mostrarCrearRestauranteForm() {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'nuevo-restaurante';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Nuevo Restaurante</h1>',
    );
    container.insertAdjacentHTML(
      'beforeend',
      `<form name="fNuevoRestaurante" role="form" class="row g-3" novalidate>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncNombre">Nombre *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="ncNombre" name="ncNombre"
						placeholder="Nombre del restaurante" value="" required>
					<div class="invalid-feedback">El nombre es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncDescripcion">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ncDescripcion" name="ncDescripcion"
						value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="ncLocalizacion">Localización</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ncLocalizacion" name="ncLocalizacion" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
      </div>
      </form>`,
    );
    
    this.main.append(container);
  }

  mostrarCrearRestauranteModal(done, nombreRestaurante, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nuevo Restaurante';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">El restaurante <strong>${nombreRestaurante}</strong> ha sido creado correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El restaurante <strong>${nombreRestaurante}</strong> ya está creado.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNuevoRestaurante.reset();
      }
      document.fNuevoRestaurante.ncNombre.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  mostrarCategoriaPlatoForm(platos) {
  // Borramos todo el contenido del main excepto el primer hijo (las categorías)
  $("main").children().nextAll().remove();

  const container = document.createElement('div');
  container.classList.add('container');
  container.classList.add('my-3');
  container.id = 'categoria-plato';

  container.insertAdjacentHTML(
    'afterbegin',
    '<h1 class="display-5">Categoría plato</h1>',
  );
  container.insertAdjacentHTML(
    'beforeend',
    `<form name="fCategoriaPlato" role="form" class="row g-3" novalidate>
    <div class="col-md-12 mb-3">
      <label class="form-label" for="ecPlato">Platos</label>
      <div class="input-group">
        <label class="input-group-text" for="ecPlato"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="ecPlato" id="ecPlato" multiple requiered>
          <option selected>Selecciona...</option>
        </select>
        <div class="invalid-feedback">Hay que elegir al menos un plato</div>
        <div class="valid-feedback">Correcto.</div>
      </div>  
    </div>
    <div class="mb-12">
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>
    </form>`,
  );
  const ecPlato = container.querySelector('#ecPlato');
  for (const plato of platos){
    ecPlato.insertAdjacentHTML('beforeend', `	<option value="${plato.name}">${plato.name}</option>
      `);
  }

  this.main.append(container);
  }

  mostrarCategoriaPlatoForm2(nombrePlato, categorias) {
    const containerFormulario = document.forms.fCategoriaPlato;
    // Borramos todo lo del formulario excepto las opciones de los platos
    $('form[name="fCategoriaPlato"]').children().nextAll().remove();
  
    containerFormulario.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-12 mb-3">
        <label class="form-label" for="ecCategoria">Categorías del plato elegido (selecciona las que quieras que pertenezcan al plato)</label>
        <div class="input-group">
          <label class="input-group-text" for="ecCategoria"><i class="bi bi-card-checklist"></i></label>
          <select class="form-select" name="ecCategoria" id="ecCategoria" multiple requiered>
            <option selected>Selecciona...</option>
          </select>
          <div class="invalid-feedback">Hay que elegir al menos una categoría</div>
          <div class="valid-feedback">Correcto.</div>
        </div>  
      </div>
      <div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
      </div>`,
    );
    const ecCategoria = containerFormulario.querySelector('#ecCategoria');
    let booleanCategoria;
    // Recorremos todas las categorías
    for (const categoria of categorias){
      // Recorremos todos los platos de cada categoría
      booleanCategoria = false;
      for(const plato of categoria.dishes){
        // Si la categoría contiene el plato, mostramos su nombre resaltado, indicando que el plato se encuentra en esa categoría
        if(plato.name == nombrePlato) {
          booleanCategoria = true;
          ecCategoria.insertAdjacentHTML('beforeend', `	<option value="${categoria.category.name}">${categoria.category.name} (el plato se encuenta en esta categoría)</option>
          `);
          break;
        }
      }
      // Si el plato no se encuentra en la categoría, la mostramos normal
      if(!booleanCategoria) {
        ecCategoria.insertAdjacentHTML('beforeend', `	<option value="${categoria.category.name}">${categoria.category.name}</option>`);
      }
      
    }
  
    this.main.append(containerFormulario);
  }

  mostrarCategoriaPlatoModal(done, nombrePlato, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Asignar categorías a un plato';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">Las categorías del plato <strong>${nombrePlato}</strong> han sido modificadas correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> Ha habido un error al modificar las categorías del plato <strong>${nombrePlato}</strong>.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fCategoriaPlato.reset();
      }
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  platosAleatorios(platos) {
    this.main.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6" id="platos-list-aleatorios">`);
    const divPlatosAleatorios = document.getElementById("platos-list-aleatorios");
    for (let i = 0; i < platos.length; i++){
      divPlatosAleatorios.insertAdjacentHTML('beforeend', `<a data-plato="${platos[i].name}" href="#platos-list"><h3>${platos[i].name}</h3></a>`);
    }
    divPlatosAleatorios.insertAdjacentHTML('beforeend', `</div>`);
  }

  listarPlatos(padre, name) {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();

    this.main.insertAdjacentHTML('beforeend', `<div class="col-lg-8 d-lg-flex justify-content-around" id="platos">
      </div>`);
    const container = document.getElementById('platos');
    container.classList.add('container');
    container.classList.add('my-3');
    container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');

    const div = document.createElement('div');
    for (const plato of padre.dishes)
      div.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6">
      <div class="cat-list-text">
        <a data-plato="${plato.name}" href="#platos-list"><h3>${plato.name}</h3></a>
      </div>
    </div>`);
    container.children[0].append(div);
    container.insertAdjacentHTML('afterbegin', `<h1>${name}</h1>`);
    this.main.append(container);
  }

  bindInit(handler) {
    document.getElementById('init').addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
    });
  }

  bindCategoria(handler) {
    // Cuando pulsamos una categoría del menú
    const navCategorias = document.getElementById('categorias-list-menu');
    const links = navCategorias.querySelectorAll('a.dropdown-item');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { categoria } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [categoria],
          '#categories-list',
          { action: 'categoria' },
          '#categoria',
          event,
        );
      });
    }

    // Cuando pulsamos una categoría de la zona central
    const botonCats = document.getElementById('categoria-main');
    const botones = botonCats.querySelectorAll('a');
    for (const boton of botones) {
      boton.addEventListener('click', (event) => {
        const { categoria } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [categoria],
          '#categories-list',
          { action: 'categoria' },
          '#categoria',
          event,
        );
      });
    }
  }

  // Pulsamos en un alérgeno del menú
  bindAlergeno(handler) {
    const navAlergenos = document.getElementById('alergenos-list-menu');
    const links = navAlergenos.querySelectorAll('a.dropdown-item');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { alergeno } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [alergeno],
          '#alergenos-list',
          { action: 'alergeno' },
          '#alergeno',
          event,
        );
      });
    }
  }

  bindMenu(handler) {
    const navMenus = document.getElementById('menus-list-menu');
    const links = navMenus.querySelectorAll('a.dropdown-item');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { menu } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [menu],
          '#menus-list',
          { action: 'menu' },
          '#menu',
          event,
        );
      });
    }
  }

  bindRestaurante(handler) {
    const navRestaurantes = document.getElementById('restaurantes-list-menu');
    const links = navRestaurantes.querySelectorAll('a.dropdown-item');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { restaurante } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [restaurante],
          '#restaurantes-list',
          { action: 'restaurante' },
          '#restaurante',
          event,
        );
      });
    }
  }

  // Pinchamos en un plato aleatorio
  bindPlatoAleatorio(handler) {
    const platosMain = document.getElementById('platos-list-aleatorios');
    const platosAleatorios = platosMain.querySelectorAll('a');
    for (const platoAleatorio of platosAleatorios) {
      platoAleatorio.addEventListener('click', (event) => {
        const { plato } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [plato],
          '#platos-list',
          { action: 'plato' },
          '#plato',
          event,
        );
      });
    }
  }

  // Pinchamos en un plato dentro de una categoría o de un alérgeno
  bindPlato(handler){
    const platosCategoria = document.getElementById('platos');
    const platos = platosCategoria.querySelectorAll('a');
    for (const plato of platos) {
      plato.addEventListener('click', (event) => {
        const { plato } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [plato],
          '#platos-list',
          { action: 'platoCategoria' },
          '#platoCategoria',
          event,
        );
      });
    }
  }

  bindFormMenu(hCrearPlato, hEliminarPlato, hPlatoMenu, hCrearCategoria, hEliminarCategoria, hCrearRestaurante, hCategoriaPlato) {
    const crearPlatoLink = document.getElementById('lnuevoPlato');
    crearPlatoLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hCrearPlato, [], '#nuevo-plato', { action: 'nuevoplato' }, '#', event);
    });

    const eliminarPlatoLink = document.getElementById('leliPlato');
    eliminarPlatoLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hEliminarPlato, [], '#eli-plato', { action: 'eliminarplato' }, '#', event);
    });

    const platoMenuLink = document.getElementById('lplatoMenu');
    platoMenuLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hPlatoMenu, [], '#plato-menu', { action: 'platomenu' }, '#', event);
    });

    const crearCategoriaLink = document.getElementById('lnuevoCategoria');
    crearCategoriaLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hCrearCategoria, [], '#nuevo-categoria', { action: 'crearcategoria' }, '#', event);
    });

    const eliminarCategoriaLink = document.getElementById('ldelCategoria');
    eliminarCategoriaLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hEliminarCategoria, [], '#del-categoria', { action: 'eliminarcategoria' }, '#', event);
    });

    const crearRestauranteLink = document.getElementById('lnuevoRestaurante');
    crearRestauranteLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hCrearRestaurante, [], '#nuevo-restaurante', { action: 'nuevorestaurante' }, '#', event);
    });

    const categoriaPlatoLink = document.getElementById('lcategoriaPlato');
    categoriaPlatoLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hCategoriaPlato, [], '#categoria-plato', { action: 'categoriaplato' }, '#', event);
    });
  }

  bindNuevoPlatoForm(handler) {
    nuevoPlatoValidacion(handler);
  }

  bindEliminarPlatoForm(handler) {
    eliminarPlatoValidacion(handler);
  }

  bindPlatoMenuForm(handlerAsignar, handlerDesasignar) {
    asignarPlatoMenuValidacion(handlerAsignar, handlerDesasignar);
  }

  bindCrearCategoriaForm(handle) {
    crearCategoriaValidacion(handle);
  }

  bindEliminarCategoriaForm(handle) {
    eliminarCategoriasValidacion(handle);
  }

  bindCrearRestauranteForm(handle){
    crearRestauranteValidacion(handle);
  }

  bindPlatoCategoriaForm(handle1, handle2){
    categoriaPlatoValidacion(handle1, handle2);
  }
}

export default Vista;
