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

    for (let d of shuffleArray(datos)) {
        let divPregunta = document.createElement('div');
        // divPregunta.classList.add('pregunta', 'tarjeta');
        divPregunta.classList.add(`pregunta${d.letra}`, 'tarjeta');
        
        const divTetromino = document.createElement("div");
        divTetromino.className = "tetrimino";

        d.matriz.forEach((row, y) => {
            row.forEach((cell, x) => {
              const cellDiv = document.createElement("div");
              cellDiv.className = "cell";
              if (cell) cellDiv.classList.add("filled");
              divTetromino.appendChild(cellDiv);
            });
        });

        let divContenido = document.createElement('div');
        divContenido.classList.add('contPregunta');
        
        let txtPregunta = document.createElement('p');
        txtPregunta.textContent = "¿Es tetrominó?";

        let ulRespuestas = document.createElement('ul');
        ulRespuestas.className = "txtRespuestas";

        for (let rta of ["Si", "No"]) {
            let respuestaLi = document.createElement('li');

            let inputRta = document.createElement('input');
            inputRta.type = 'radio';
            inputRta.name = d.letra;
            inputRta.id = rta + d.letra;
            inputRta.value = 0;
            
            if ((rta == "Si" && d.esTetromino == "1") || 
                (rta == "No" && d.esTetromino == "0")) {
                inputRta.value = 1;
            } 

            let labelRta = document.createElement('label');
            labelRta.setAttribute('for', rta + d.letra);
            labelRta.textContent = rta;

            respuestaLi.append(inputRta, labelRta);
            ulRespuestas.append(respuestaLi);
        }
        
        divContenido.append(txtPregunta, ulRespuestas);


        divPregunta.append(divTetromino, divContenido);
        contenidoCuestionario.append(divPregunta);
    }
}


export { crearActividad }