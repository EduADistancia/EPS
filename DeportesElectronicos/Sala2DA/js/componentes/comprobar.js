import { mostrarModal } from "./modales.js";

function agregarCheck(correcto) {
    let imgSrc = correcto ? './img/correcto.png' : './img/incorrecto.png';
    let checkItem = document.createElement('img');
    checkItem.src = imgSrc;
    checkItem.classList.add('imgEstado');

    return checkItem;
}

async function comprobar(resultados) {
    document.querySelector('#finalizar').classList.add('oculto')
    let correcto = true;
    for (let item in resultados) {
        if(!resultados[item]) correcto = false;
    }

    if (correcto) {
        mostrarModal("#cerrarModal", "#retroalimentacion", "./site/result/retroPos.html");
        // Cerrar
        let botonCerrar = document.querySelector('#cerrarApp');
        botonCerrar.classList.remove('oculto');
        botonCerrar.addEventListener('click', ()=>{
            window.close();
        });
        
    } else {
        await mostrarModal("#cerrarModal", "#retroalimentacion", "./site/result/retroNoPos.html");
        let result = document.querySelector("#resultados");

        for (let item in resultados) {
            let divResult = document.createElement('div');
            
            let pResult = document.createElement('p');
            pResult.textContent = item;

            divResult.append(pResult, agregarCheck(resultados[item]));

            result.append(divResult);
        }
        // Reintentar
        let botonReitentar = document.querySelector('#reintentar');
        botonReitentar.classList.remove('oculto');
        botonReitentar.addEventListener('click', ()=>{
            window.location.reload();
        });

    }

}

export { comprobar }