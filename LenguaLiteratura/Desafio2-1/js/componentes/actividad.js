// Desordenar datos
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
    return array;
}

// Modificación del HTML 
async function crearActividad(datos) {
    
    // Personajes (img)
    let tarjetas = document.querySelector('#personajes');
    
    for (let dato of shuffleArray(datos.personajes)) {
        
        let divPersonaje = document.createElement('div');
        divPersonaje.classList.add('tarjeta', 'drop-area');
        divPersonaje.id = dato.valor
        
        let imgPersonaje = document.createElement('img');
        imgPersonaje.src = dato.imagen;
        imgPersonaje.alt = "Personaje";
        imgPersonaje.classList.add('imgPersonaje', 'contrasteCero');

        let nombre = document.createElement('p');
        nombre.classList.add('oculto', 'nombreTarjeta');
        nombre.textContent = dato.nombre;
        
        divPersonaje.append(imgPersonaje, nombre);
        
        tarjetas.append(divPersonaje);
    }

    // Motivaciones (d'n'd)
    let draggables = document.querySelector('#motivaciones');

    for (let dato of shuffleArray(datos.motivaciones)) {
        let frase = document.createElement('p');
        frase.textContent = dato.texto;
        frase.setAttribute('name', dato.valor);
        frase.classList.add('marco', 'word');
        frase.draggable = true;

        draggables.append(frase);
    }
}


export { crearActividad }