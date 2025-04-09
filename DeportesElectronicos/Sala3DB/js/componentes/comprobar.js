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
    let totalPreguntas = document.querySelectorAll('.tarjeta').length;
    let respondidas = document.querySelectorAll('input:checked');

    if (totalPreguntas !== respondidas.length) {
        let modalAdvertencia = document.querySelector('#advertencia');
        modalAdvertencia.showModal();
        let cerrarAdvertencia = document.querySelector('#cerrarAdvertencia');
        cerrarAdvertencia.addEventListener('click', () => { modalAdvertencia.close(); });
        return;
    }

    document.querySelectorAll('input').forEach(i => {i.disabled = true});
    document.querySelector('#comprobar').classList.add('oculto');

    let correcto = true;
    let rtasCorrectas = 0;

    // Cálculo de respuestas correctas e ícono en pregunta (correcto/incorrecto)
    respondidas.forEach(r => {
        rtasCorrectas += Number(r.value);
        let divPregunta = document.querySelector(`div.pregunta${r.name}`);
        divPregunta.append(agregarCheck(Number(r.value)));
    })

    if (rtasCorrectas !== totalPreguntas) {
        correcto = false;
    }

    if (correcto) {
        mostrarModal("#cerrarModal", "#retroalimentacion", "./site/retroPos.html");
        // Cerrar
        let botonCerrar = document.querySelector('#cerrarApp');
        botonCerrar.classList.remove('oculto');
        botonCerrar.addEventListener('click', ()=>{
            window.close();
        });
        
    } else {
        mostrarModal("#cerrarModal", "#retroalimentacion", "./site/retroNoPos.html");
        // Reintentar
        let botonReitentar = document.querySelector('#reintentar');
        botonReitentar.classList.remove('oculto');
        botonReitentar.addEventListener('click', ()=>{
            window.location.reload();
        });
    }
}

export { comprobar }