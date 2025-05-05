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
    let ladoRespondidas = document.querySelectorAll('input.ladoBase');
    let totalBaseRespondidas = document.querySelectorAll('input.totalBase');
    let anteriorRespondidas = document.querySelectorAll('input.anterior');
    let totalRespondidas = document.querySelectorAll('input.total');

    // Resultado final
    let correcto = true;

    for (let i = 0; i < ladoRespondidas.length; i++) {
        let completo = true;

        if (ladoRespondidas[i].value === "" || 
            totalBaseRespondidas[i].value === "" ||
            anteriorRespondidas[i].value === "" || 
            totalRespondidas[i].value === "") {
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
        if (Number(ladoRespondidas[i].value) !== respuestas[0][ladoRespondidas[i].id]) {
            correcto = false;
            ladoRespondidas[i].parentNode.append(agregarCheck(false));
        } else {
            ladoRespondidas[i].parentNode.append(agregarCheck(true));
        }
        
        if (Number(totalBaseRespondidas[i].value) !== respuestas[1][totalBaseRespondidas[i].id]) {
            correcto = false;
            totalBaseRespondidas[i].parentNode.append(agregarCheck(false));
        } else {
            totalBaseRespondidas[i].parentNode.append(agregarCheck(true));
        }
        
        if (Number(anteriorRespondidas[i].value) !== respuestas[2][anteriorRespondidas[i].id]) {
            correcto = false;
            anteriorRespondidas[i].parentNode.append(agregarCheck(false));
        } else {
            anteriorRespondidas[i].parentNode.append(agregarCheck(true));
        }
        
        if (Number(totalRespondidas[i].value) !== respuestas[3][totalRespondidas[i].id]) {
            correcto = false;
            totalRespondidas[i].parentNode.append(agregarCheck(false));
        } else {
            totalRespondidas[i].parentNode.append(agregarCheck(true));
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