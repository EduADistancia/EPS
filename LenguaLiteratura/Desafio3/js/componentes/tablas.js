// Modales
function crearModalExtras(idModal, texto) {
    let dialogExtra = document.createElement('dialog');
    dialogExtra.id = idModal;

    let pModal = document.createElement('p');
    pModal.textContent = texto;

    dialogExtra.append(
        crearBotonCerrarModal(idModal),
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

// Desordenar datos en array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
    return array;
}

// Tablas para ordenar
function crearTablas(datos) {
    let contenido = document.querySelector('#scrollH');

    let tablaOrden = document.createElement('table');
    tablaOrden.id = "orden";   
    let cabeceraOrden = document.createElement('th');
    cabeceraOrden.innerHTML = 'Orden';
    let tr1 = document.createElement('tr');
    tr1.appendChild(cabeceraOrden)
    tablaOrden.append(tr1);

    let tablaOrdenar1 = document.createElement('table');
    tablaOrdenar1.id = "momentos";
    let cabeceraOrdenar1 = document.createElement('th');
    cabeceraOrdenar1.innerHTML = 'Momentos';
    let tr2 = document.createElement('tr');
    tr2.appendChild(cabeceraOrdenar1)
    tablaOrdenar1.append(tr2);
    
    let tablaOrdenar2 = document.createElement('table');
    tablaOrdenar2.id = "espacios";
    let cabeceraOrdenar2 = document.createElement('th');
    cabeceraOrdenar2.innerHTML = 'Espacios';
    let tr3 = document.createElement('tr');
    tr3.appendChild(cabeceraOrdenar2)
    tablaOrdenar2.append(tr3);

    
    // Orden
    for (let i = 1; i <= datos.momentos.length; i++) {
        let trOrden = document.createElement('tr');
        let tdOrden = document.createElement('td');

        tdOrden.innerText = i;
        trOrden.classList.add('orden');
        trOrden.setAttribute('name', `m${i}`);
        trOrden.append(tdOrden);
        tablaOrden.append(trOrden);
    }
    
    // Momentos
    for (let m of shuffleArray(datos.momentos)) {
        let trOrden = document.createElement('tr');
        let tdOrden = document.createElement('td');
    
        tdOrden.innerText = m.momento;
        trOrden.classList.add('momentos');
        trOrden.draggable = true;
        trOrden.setAttribute('name', m.valor);
        trOrden.append(tdOrden);
        tablaOrdenar1.append(trOrden);
    }
    
    let modales = document.querySelector('#modales');

    // Espacios
    for (let e of shuffleArray(datos.espacios)) {
        let trOrden = document.createElement('tr');
        let tdOrden = document.createElement('td');
        
        let buttonImg = document.createElement('button');
        buttonImg.className = 'pistaEspacio';
        buttonImg.value = e.valor;

        let imgTd = document.createElement('img');
        imgTd.classList.add('imgCelda');
        imgTd.src = e.imagen;
        
        buttonImg.append(imgTd)
        tdOrden.append(buttonImg);
        trOrden.classList.add('espacios');
        trOrden.draggable = true;
        trOrden.setAttribute('name', e.valor);
        trOrden.append(tdOrden);
        tablaOrdenar2.append(trOrden);

        modales.append(crearModalExtras(e.valor, e.descripcion));
    }

    
    contenido.append(tablaOrden, tablaOrdenar1, tablaOrdenar2)
}

export { crearTablas }