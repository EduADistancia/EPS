import { cargar } from "./carga.js";
import { mostrarModal } from "./modales.js";

function agregarCheck(correcto) {
    let imgSrc = correcto ? './img/correcto.png' : './img/incorrecto.png';
    let checkItem = document.createElement('img');
    checkItem.src = imgSrc;
    checkItem.classList.add('imgEstado');

    return checkItem;
}

async function comprobar(resultados) {
    let rtasCorrectas = await cargar("./data/resolucion.json");
    let correcto = true;
    let retroalimentacion = [];

    for (let item in resultados) {
        let idRta = item.replace('pregunta', "");

        for (let r of rtasCorrectas){
            let itemRetro = {};
            if (r.id == idRta) {
                itemRetro.pregunta = item;

                if (resultados[item].toLowerCase() !== 
                    r.txtRtaCorrecta.toLowerCase()) {
                    correcto = false;
                    itemRetro.respuesta = false;
                } else {
                    itemRetro.respuesta = true;
                }

                retroalimentacion.push(itemRetro);
            }
        }
    }

    for (let item of retroalimentacion) {
        let divResult = document.querySelector(`div.${item.pregunta}`);
        divResult.append(agregarCheck(item.respuesta));
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