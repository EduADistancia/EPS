import { mostrarModal } from "./modales.js";

function agregarCheck(correcto) {
    let imgSrc = correcto ? './img/correcto.png' : './img/incorrecto.png';
    let checkItem = document.createElement('img');
    checkItem.src = imgSrc;
    checkItem.classList.add('imgEstado');

    return checkItem;
}

async function comprobar() {
    // Chequear que se han respondido todas las preguntas
    let totalRtasCorrectas = document.querySelectorAll('input[value="1"]').length;
    let totalPreguntas = document.querySelectorAll('.tarjeta');
    let respondidas = document.querySelectorAll('input:checked');

    for (let p of totalPreguntas) {
        let chbRespuesta = p.querySelectorAll('input');
        let preguntaRespondida = false;

        chbRespuesta.forEach(chb => {
            if (chb.checked) {
                preguntaRespondida = true;
            }
        });
        
        // if (totalPreguntas !== respondidas.length) {
        if (!preguntaRespondida) {
            let modalAdvertencia = document.querySelector('#advertencia');
            modalAdvertencia.showModal();
            let cerrarAdvertencia = document.querySelector('#cerrarAdvertencia');
            cerrarAdvertencia.addEventListener('click', () => { modalAdvertencia.close(); });
            return;
        }
    }

    document.querySelectorAll('input').forEach(i => {i.disabled = true});
    document.querySelector('#comprobar').classList.add('oculto');

    let correcto = true;
    let rtasCorrectas = 0;

    // Cálculo de respuestas correctas e ícono en pregunta (correcto/incorrecto)
    respondidas.forEach(r => {
        rtasCorrectas += Number(r.value);
        let divPregunta = r.parentNode;
        divPregunta.append(agregarCheck(Number(r.value)));
    })

    if (rtasCorrectas !== totalRtasCorrectas) {
        correcto = false;
    }

    if (correcto) {
        mostrarModal("#cerrarModalRetro", "#retroalimentacion", "./site/retroPos.html");
        // Cerrar
        let botonCerrar = document.querySelector('#cerrarApp');
        botonCerrar.classList.remove('oculto');
        botonCerrar.addEventListener('click', ()=>{
            window.close();
        });
        
    } else {
        mostrarModal("#cerrarModalRetro", "#retroalimentacion", "./site/retroNoPos.html");
        // Reintentar
        let botonReitentar = document.querySelector('#reintentar');
        botonReitentar.classList.remove('oculto');
        botonReitentar.addEventListener('click', ()=>{
            window.location.reload();
        });
    }
}

export { comprobar }