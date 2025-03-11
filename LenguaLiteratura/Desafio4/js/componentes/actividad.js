// Desordenar datos en array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
    return array;
}

// Actividad
function crearActividad(datos){
    let contenidoActividad = document.querySelector('#contenidoActividad');

    for (let dato of datos){
        let divContenedor = document.createElement('div');
        divContenedor.classList.add('marco', 'pregunta');

        let pDescripcion = document.createElement('p');
        pDescripcion.textContent = dato.descripcion;
        pDescripcion.id = `fragmento${datos.indexOf(dato)}`;
        
        divContenedor.append(pDescripcion);

        for (let opcion of shuffleArray(dato.opciones)) {
            let contenedorOpcion = document.createElement('div');
            contenedorOpcion.classList.add('opcion');

            let inputOpcion = document.createElement('input');
            inputOpcion.type = 'radio';
            inputOpcion.value = opcion.correcto;
            inputOpcion.setAttribute('name', pDescripcion.id);
            inputOpcion.id = `fragmento${datos.indexOf(dato)}${dato.opciones.indexOf(opcion)}`;

            let labelOpcion = document.createElement('label');
            labelOpcion.textContent = opcion.opcion;
            labelOpcion.setAttribute('for', inputOpcion.id);
            
            contenedorOpcion.append(inputOpcion, labelOpcion);
            divContenedor.append(contenedorOpcion);
        }

        contenidoActividad.append(divContenedor);
    }
}

export { crearActividad }