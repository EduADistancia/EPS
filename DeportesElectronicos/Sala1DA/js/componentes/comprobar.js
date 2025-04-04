import { mostrarModal } from "./modales.js";

function agregarCheck(correcto) {
    let imgSrc = correcto ? './img/incorrecto.png' : './img/correcto.png';
    let checkItem = document.createElement('img');
    checkItem.src = imgSrc;
    checkItem.classList.add('imgEstado');

    return checkItem;
}

function comprobar() {
    document.querySelector('#comprobar').classList.add('oculto')
    let correcto = true;
    let tarjetas = document.querySelectorAll('.tarjeta');
    tarjetas.forEach(t => {
        let img = t.querySelector('img');
        if (t.id != img.getAttribute("name")) {
            correcto = false;
            t.append(agregarCheck(true));
        } else {
            t.append(agregarCheck(false));
        }

    })

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