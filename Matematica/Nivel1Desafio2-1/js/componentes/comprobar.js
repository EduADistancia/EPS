import { mostrarModal } from "./modales.js";

function agregarCheck(correcto) {
    let imgSrc = correcto ? './img/correcto.png' : './img/incorrecto.png';
    let checkItem = document.createElement('img');
    checkItem.src = imgSrc;
    checkItem.classList.add('imgEstado');

    return checkItem;
}

async function comprobar(respuestas) {
    // Chequear que se han respondido todas las preguntas
    let basesRespondidas = document.querySelectorAll('input.base');
    let totalesRespondidas = document.querySelectorAll('input.total');

    // Resultado final
    let correcto = true;

    for (let i = 0; i < basesRespondidas.length; i++) {
        let completo = true;

        if (basesRespondidas[i].value === "" || totalesRespondidas[i].value === "") {
            completo = false;
        }

        if (!completo) {
            let modalAdvertencia = document.querySelector('#advertencia');
            modalAdvertencia.showModal();
            let cerrarAdvertencia = document.querySelector('#cerrarAdvertencia');
            cerrarAdvertencia.addEventListener('click', () => { modalAdvertencia.close(); });
            return;
        }

        // Cálculo de respuestas correctas e ícono en pregunta (correcto/incorrecto)
        if (Number(basesRespondidas[i].value) !== respuestas[0][basesRespondidas[i].id]) {
            correcto = false;
            basesRespondidas[i].parentNode.append(agregarCheck(false));
        } else {
            basesRespondidas[i].parentNode.append(agregarCheck(true));
        }
        
        if (Number(totalesRespondidas[i].value) !== respuestas[1][totalesRespondidas[i].id]) {
            correcto = false;
            totalesRespondidas[i].parentNode.append(agregarCheck(false));
        } else {
            totalesRespondidas[i].parentNode.append(agregarCheck(true));
        }
    }

    document.querySelectorAll('input').forEach(i => {i.disabled = true});
    document.querySelector('#comprobar').classList.add('oculto');

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