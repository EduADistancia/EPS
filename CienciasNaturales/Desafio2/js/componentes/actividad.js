// Desordenar datos
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
    return array;
}

// Botonera imagen elemento
function crearBotoneraModal(elemento) {
    let botonera = document.createElement('div');
    let info = document.createElement('button');
    info.textContent = '💡';
    info.classList.add('infoBotonImg');
    info.value = `${elemento}`;
    botonera.append(info);

    return botonera;
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

// Modificación del HTML
async function crearActividad(datos) {

    let tarjetas = document.querySelector('#fragmentos');
    let contenedorModales = document.querySelector('#contenedorModales');
    let contadorAux = 0;

    for (let dato of shuffleArray(datos)) {

        let tarjeta = document.createElement('div');
        tarjeta.classList.add(`Info${contadorAux}`);

        
        let frase = document.createElement('p');
        frase.classList.add('word');
        frase.textContent = dato.fragmento;
        frase.draggable = true;
        frase.setAttribute('name', dato.teoria);
        frase.setAttribute('value', `Info${contadorAux}`);

        
        tarjeta.append(
            frase,
            crearBotoneraModal(`Info${contadorAux}`)
        );
        tarjetas.append(tarjeta);
        
        let infoElemento = document.createElement('dialog');
        infoElemento.id = `Info${contadorAux}`;
        let info = document.createElement('p');
        info.innerHTML = dato.pista;
        infoElemento.append(crearBotonCerrarModal(`Info${contadorAux}`), info);
        
        let divModales = document.createElement('div');
        divModales.classList.add('modales');
        divModales.append(infoElemento);

        contenedorModales.append(divModales);
        contadorAux ++;
    }

}


export { crearActividad }