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
    let contAdivinazas = document.querySelector('#contAdivinanzas');
    let cantidad = 1;

    for (let d of shuffleArray(datos)) {
        let divPregunta = document.createElement('div');
        divPregunta.classList.add('pregunta', 'tarjeta');
        
        let divEncabezado = document.createElement('div');
        let contador = document.createElement('h4');
        contador.textContent = `Adivinanza ${cantidad} de ${datos.length}`;
        
        divEncabezado.append(contador);

        let divContenido = document.createElement('div');
        divContenido.classList.add('contPregunta', `pregunta${d.id}`);
        
        let labelPregunta = document.createElement('label');
        labelPregunta.textContent = d.txtAdivinanza;
        labelPregunta.setAttribute('for', `pregunta${d.id}`);

        let inputPregunta = document.createElement('input');
        inputPregunta.type = 'text';
        inputPregunta.maxLength = "15";
        inputPregunta.placeholder = "_ _ _ _ _ _ _ _"
        inputPregunta.id = `pregunta${d.id}`;

        let enviar = document.createElement('button');
        enviar.classList.add('boton', 'enviarRta');
        enviar.value = `pregunta${d.id}`;
        enviar.textContent = 'Enviar';
        
        divContenido.append(labelPregunta, inputPregunta, enviar);

        divPregunta.append(divEncabezado, divContenido);
        contAdivinazas.append(divPregunta);
        cantidad++;
    }
}

// Interacción tarjetas
async function completar() {
    return new Promise((resolve) => {
        let resultados = {};
        let envios = document.querySelectorAll('.enviarRta');

        envios.forEach(e => {
            e.addEventListener("click", function handler() {
                let inputData = document.querySelector(`#${e.value}`);

                if (inputData.value === "") {
                    let modalAdvertencia = document.querySelector('#advertencia');
                    modalAdvertencia.showModal();
                    let cerrarAdvertencia = document.querySelector('#cerrarAdvertencia');
                    cerrarAdvertencia.addEventListener('click', () => { modalAdvertencia.close(); });
                } else {
                    resultados[inputData.id] = inputData.value;

                    let respuestaData = document.createElement('p');
                    respuestaData.className = 'rtaConfirmada';
                    respuestaData.textContent = `Tu respuesta: ${inputData.value}`;
                    inputData.parentNode.append(respuestaData);
                    inputData.remove();
                    e.remove();

                    // Recalculamos cuántos botones quedan
                    let botonesRestantes = document.querySelectorAll('.enviarRta');

                    if (botonesRestantes.length === 0) {
                        document.querySelector("#comprobar").classList.remove('oculto');
                        resolve(resultados); // ✅ Resolvé la promesa con los datos
                    }

                    // Evitamos múltiples clicks innecesarios
                    e.removeEventListener("click", handler);
                }
            });
        });
    });
}


export { crearActividad, completar }