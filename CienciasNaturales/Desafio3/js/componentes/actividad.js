// Creación de modales
function crearModalLista(idModal, titulo, subTitulo, items) {
    let dialogReino = document.createElement('dialog');
    dialogReino.id = idModal;
    
    let botoneraModal = document.createElement('div');
    botoneraModal.classList.add('cerrarModal');
    botoneraModal.append(crearBotonCerrarModal(idModal));
    
    let h3Modal = document.createElement('h3');
    h3Modal.textContent = titulo;
    
    let subH3 = document.createElement('p');
    subH3.textContent = subTitulo

    let ulDefiniciones = document.createElement('ul');
    
    for (let item of items) {
        let liItem = document.createElement('li');
        liItem.innerHTML = item;
        ulDefiniciones.append(liItem);
    }

    dialogReino.append(botoneraModal, h3Modal, subH3, ulDefiniciones);

    return dialogReino;
}

function crearModalExtras(idModal, titulo, texto) {
    let dialogExtra = document.createElement('dialog');
    dialogExtra.id = idModal;

    let h4Modal = document.createElement('h4');
    h4Modal.textContent = titulo;

    let pModal = document.createElement('p');
    pModal.textContent = texto;

    dialogExtra.append(
        crearBotonCerrarModal(idModal),
        h4Modal,
        pModal
    );

    return dialogExtra;
}

// Cierre de modal
function crearBotonCerrarModal(idModal) {
    let cerrarDialog = document.createElement('button');
    cerrarDialog.innerText = "x";
    cerrarDialog.title = "Cerrar";
    cerrarDialog.id = `cerrar${idModal}`;
    let divCerrar =  document.createElement('div');
    divCerrar.classList.add('cerrarModal');
    divCerrar.append(cerrarDialog);

    return divCerrar;
}

// Modificación del HTML - Indicaciones
async function crearIndicaciones(datos) {

    // Tarjetas circulares y su modal
    let tarjetas = document.querySelector('#reinosBiologicos');
    let contenedorModales = document.querySelector('#reinoModales');

    // Modales de deficiones extras
    let defExtras = document.querySelector('#definicionesExtras');

    let contadorReinos = 1;

    for (let dato of datos.reinos) {
        let botonReino = document.createElement('button');
        botonReino.classList.add('infoBotonImg', 'reino', 'drop-area');
        botonReino.title = "Ver descripción";
        botonReino.value = dato.reino;
        botonReino.id = dato.reino;

        // Imagen de fondo reino
        let style = document.createElement("style");
        style.innerHTML = `
        .reino:nth-child(${contadorReinos})::before {
            background: url("${dato.imgReino}") center/cover no-repeat;
        }`;
        document.head.appendChild(style);

        let divReino = document.createElement('div');

        let h3Reino = document.createElement('h3');
        h3Reino.innerText = `Reino ${dato.reino}`;

        let pSubReino = document.createElement('p');
        pSubReino.textContent = dato.subReino;

        divReino.append(h3Reino, pSubReino);
        botonReino.append(divReino);

        tarjetas.append(botonReino);
        contadorReinos ++;

        // Modal definicion reino
        contenedorModales.append(
            crearModalLista(dato.reino, `Reino ${dato.reino}`, dato.subReino ,dato.definicion)
        );
    }

    for (let dato of datos.definicionesExtras) {
        let modalExtraDef = crearModalExtras(
            dato.clave, dato.termino, dato.definicion);
        defExtras.append(modalExtraDef);
        document.querySelectorAll('button.defExtra').forEach(b => b.title = "Ver descripción");
    }

}

// Modificación del HTML - Actividad
async function crearActividad(datos) {
    let contenedorDraggables = document.querySelector("#elementosActividad");
    let contenedorModalesElementos = document.querySelector('#elementosEncontrados')

    for (let dato of datos) {
        let elementoDraggable = document.createElement('div');
        elementoDraggable.classList.add(`cont${dato.elemento.replace(" ", "")}`)
        
        let elemento = document.createElement('p');
        elemento.textContent = dato.elemento;
        elemento.classList.add('word');
        elemento.draggable = true;
        elemento.setAttribute('name', dato.reino);
        
        let botonDescripcion = document.createElement('button');
        botonDescripcion.textContent = "🛈";
        botonDescripcion.title = "Ver descripción"
        botonDescripcion.value = dato.elemento.replace(" ", "");
        botonDescripcion.classList.add('elementoDescripcion')

        let modalElemento = crearModalExtras(
            dato.elemento.replace(" ", ""),
            dato.elemento,
            dato.descripcion
        );

        modalElemento.classList.add('elementoModal');
        contenedorModalesElementos.append(modalElemento);

        elementoDraggable.append(elemento, botonDescripcion);

        contenedorDraggables.append(elementoDraggable);
    }
}


export { crearActividad, crearIndicaciones }