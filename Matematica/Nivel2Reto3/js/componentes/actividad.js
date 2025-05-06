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
    let contenidoCuestionario = document.querySelector('#contenidoCuestionario');

    for (let d of datos) {
        let divPregunta = document.createElement('div');
        divPregunta.classList.add('pregunta', 'tarjeta');
        
        let divContenido = document.createElement('div');
        divContenido.classList.add('contPregunta');
        
        let txtPregunta = document.createElement('p');
        txtPregunta.innerHTML = d.pregunta;

        let ulRespuestas = document.createElement('ul');
        ulRespuestas.className = "txtRespuestas";

        for (let rta of d.respuestas) {
            let respuestaLi = document.createElement('li');

            let inputRta = document.createElement('input');
            inputRta.type = 'checkbox';
            inputRta.name = d.pregunta;
            inputRta.id = rta.txtRespuesta + d.respuestas.indexOf(rta);
            inputRta.value = rta.correcta;
            
            let labelRta = document.createElement('label');
            labelRta.setAttribute('for', rta.txtRespuesta + d.respuestas.indexOf(rta));
            labelRta.innerHTML = rta.txtRespuesta;

            respuestaLi.append(inputRta, labelRta);
            ulRespuestas.append(respuestaLi);
        }
        
        divContenido.append(txtPregunta, ulRespuestas);
        divPregunta.append(divContenido);
        contenidoCuestionario.append(divPregunta);
    }
}


export { crearActividad }