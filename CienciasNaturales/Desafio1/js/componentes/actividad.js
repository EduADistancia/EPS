// Botonera imagen elemento
function crearBotoneraImagen(elemento) {
    let botonera = document.createElement('div');
    
    let info = document.createElement('button');
    info.textContent = '❓';
    info.classList.add('infoBotonImg');
    info.value = `${elemento}Info`;
    
    let zoom = document.createElement('button');
    zoom.textContent = '🔍';
    zoom.classList.add('zoomBotonImg');
    zoom.value = `${elemento}Zoom`;

    botonera.append(info, zoom);

    return botonera;
}


// Elementos del drag and drop
function crearDestinoDrag(elemento){
    let frase = document.createElement('p');
    let texto = 'Característica faltante: ';
    let spanD = document.createElement('span');
    spanD.textContent = '__________';
    spanD.classList.add('drop-area');
    spanD.id = `faltante${elemento}`;
    frase.append(texto, spanD);
    return frase;
}

function crearDraggables(elemento, correcto){
    let contenedorDraggables = document.createElement('div');
    contenedorDraggables.classList.add('contenedorDraggables');

    let palabras = [
        'irritabilidad',
        'reproducción',
        'organización celular',
        'homeostásis',
        'metabolismo',
        'adaptación',
        'no aplica'
    ]

    for (let palabra of palabras) {
        let p = document.createElement('span');
        p.textContent = palabra;
        p.classList.add('word');
        p.draggable = true;
        p.setAttribute('name', `faltante${elemento}`);

        if (palabra === correcto) {
            p.classList.add('correcto');
        }

        contenedorDraggables.append(p);
    }

    return contenedorDraggables;
}

// Form & input's
function crearOpciones(elemento, opciones) {
    let form = document.createElement('form');
    for(let opcion of opciones) {
        let divInput = document.createElement('div');
        let input = document.createElement('input');
        input.name = elemento.elemento
        input.type = 'radio';
        input.value = opcion === elemento.tipo ? 1 : 0;
        input.id = `${elemento.elemento}${opcion}`;
        let label = document.createElement('label');
        label.innerText = opcion;
        label.setAttribute('for', `${elemento.elemento}${opcion}`);

        divInput.append(input, label);
        form.append(divInput);
    }
    
    return form;
}

// Cierre de modal
function crearBotonCerrarModal(idModal) {
    let cerrarDialog = document.createElement('button');
    cerrarDialog.innerText = "🗙";
    cerrarDialog.title = "Cerrar";
    cerrarDialog.id = `cerrar${idModal}`;
    let divCerrar =  document.createElement('div');
    divCerrar.classList.add('cerrarModal');
    divCerrar.append(cerrarDialog);

    return divCerrar;
}

// Modificación del HTML
async function crearActividad(datos) {

    let tarjetas = document.querySelector('#contenidoActividad');

    for (let dato of datos) {

        let tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjetaDinamica');
        
        let tarjetaCabecera = document.createElement('div');
        tarjetaCabecera.classList.add('tarjetaCabecera')

        let elemento = document.createElement('h2');
        elemento.textContent = dato.elemento;

        let imgElemento = document.createElement('img');
        imgElemento.src = dato.img;
        
        // <dialog>
        let imgElementoZoom = document.createElement('dialog');
        imgElementoZoom.id = `${dato.elemento}Zoom`;
        let auxImg = document.createElement('img');
        auxImg.src = dato.img;
        imgElementoZoom.append(crearBotonCerrarModal(`${dato.elemento}Zoom`), auxImg);

        let infoElemento = document.createElement('dialog');
        infoElemento.id = `${dato.elemento}Info`;
        let info = document.createElement('p');
        info.innerHTML = dato.info;
        infoElemento.append(crearBotonCerrarModal(`${dato.elemento}Info`), info);
        
        let divModales = document.createElement('div');
        divModales.classList.add('modales');
        divModales.append(imgElementoZoom, infoElemento);

        let divImagenBotones = document.createElement('div');
        divImagenBotones.classList.add('imgContenedor');

        let instruccion2 = document.createElement('p');
        instruccion2.textContent = 'Seleccionen y arrastren la característica que corresponda a cada caso.';

        divImagenBotones.append(
            imgElemento, 
            crearBotoneraImagen(dato.elemento)
        );
        
        tarjetaCabecera.append(
            elemento,
            divModales,
            divImagenBotones,
            crearOpciones(dato, ['ser vivo', 'sin vida'])
        );
        
        tarjeta.append(
            tarjetaCabecera,
            crearDestinoDrag(dato.elemento),
            crearDraggables(dato.elemento, dato.faltante),
            instruccion2
        );
        
        if(datos.indexOf(dato) > 0) {
            tarjeta.classList.add('oculto');
        } else {
            tarjeta.classList.add('visible');
        }

        tarjetas.append(tarjeta);
    }

}


export { crearActividad }