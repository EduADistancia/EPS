// Form & input's
function crearOpciones(elemento, opciones, correcta) {
    let form = document.createElement('form');
    let ul = document.createElement('ul')
    
    for(let opcion of opciones) {
        let liInput = document.createElement('li');
        let input = document.createElement('input');
        input.name = elemento
        input.type = 'radio';
        input.value = opcion.toLowerCase() === correcta ? 1 : 0;
        input.id = `${elemento}${opcion}`;
        let label = document.createElement('label');
        label.innerText = opcion;
        label.setAttribute('for', `${elemento}${opcion}`);

        liInput.append(input, label);
        ul.append(liInput);
    }

    form.append(ul);
    
    return form;
}

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

    let tarjetas = document.querySelector('#cuestionario');

    for (let dato of shuffleArray(datos)) {

        let divPregunta = document.createElement('div');
        divPregunta.classList.add('marco', 'pregunta');

        let personaje = document.createElement('details');
        let nombre = document.createElement('summary');
        nombre.textContent = dato.personaje;

        let descripcion = document.createElement('p');
        descripcion.textContent = dato.descripcion;

        personaje.append(nombre, descripcion);
        
        let opciones = crearOpciones(
            `Pregunta${datos.indexOf(dato)}`,
            ["Principal", "Secundario", "Otro"],
            dato.tipo
        );

        divPregunta.append(personaje, opciones);

        tarjetas.append(divPregunta);
    }

}


export { crearActividad }