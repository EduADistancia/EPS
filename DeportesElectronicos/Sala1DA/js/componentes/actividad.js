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
    let tarjetas = document.querySelector('#descripciones');
    
    for (let dato of datos.definiciones) {
        
        let divPersonaje = document.createElement('div');
        divPersonaje.classList.add('tarjeta', 'drop-area');
        divPersonaje.id = dato.valor
        
        let fecha = document.createElement('h4');
        let details = document.createElement('details');
        details.title = "Ver descripción";
        fecha.textContent = dato.lanzamiento;
        let nombre = document.createElement('summary');
        nombre.textContent = dato.nombre;
        let descripcion = document.createElement('p');
        descripcion.textContent = dato.descripcion;
        let agregar = document.createElement('p');
        agregar.textContent = 'Imagen'
        agregar.classList.add('agregarImg')

        // let imgPersonaje = document.createElement('img');
        // imgPersonaje.src = dato.imagen;
        // imgPersonaje.alt = "Personaje";
        // imgPersonaje.classList.add('imgPersonaje', 'contrasteCero');
        
        // let nombre = document.createElement('p');
        // nombre.classList.add('oculto', 'nombreTarjeta');
        // nombre.textContent = dato.nombre;
        
        // divPersonaje.append(imgPersonaje, nombre);
        details.append(nombre, descripcion)
        divPersonaje.append(fecha, details, agregar);
        divPersonaje.classList.add('contrasteCero');
        
        tarjetas.append(divPersonaje);
    }

    // Motivaciones (d'n'd)
    let draggables = document.querySelector('#videojuegos');

    for (let dato of shuffleArray(datos.imagenes)) {
        let imgPersonaje = document.createElement('img');
        imgPersonaje.src = dato.source;
        imgPersonaje.alt = "Consola";
        imgPersonaje.classList.add('imgPersonaje');
        imgPersonaje.setAttribute('name', dato.valor);
        imgPersonaje.classList.add('marco', 'word');
        imgPersonaje.draggable = true;
        
        // let frase = document.createElement('p');
        // frase.textContent = dato.texto;
        // frase.setAttribute('name', dato.valor);
        // frase.classList.add('marco', 'word');
        // frase.draggable = true;

        // draggables.append(frase);
        draggables.append(imgPersonaje);
    }
}


export { crearActividad }