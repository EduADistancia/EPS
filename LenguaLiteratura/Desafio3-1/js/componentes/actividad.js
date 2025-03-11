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
    let divActividad = document.createElement('div');
    divActividad.classList.add('marco');

    for (let dato of shuffleArray(datos)){
        let contenedorOpcion = document.createElement('div');
        contenedorOpcion.classList.add('contOpcion');

        let botonEstacion = document.createElement('button');
        botonEstacion.classList.add('opcion');
        botonEstacion.value = dato.valor;

        let imgEstacion = document.createElement('img');
        imgEstacion.classList.add('estacion');
        imgEstacion.src = dato.imagen;

        botonEstacion.append(imgEstacion);
        contenedorOpcion.append(botonEstacion);
        divActividad.append(contenedorOpcion);
    }

    contenidoActividad.append(divActividad);
}

export { crearActividad }