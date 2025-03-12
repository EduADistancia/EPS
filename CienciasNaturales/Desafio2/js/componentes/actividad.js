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

    for (let dato of datos) {

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