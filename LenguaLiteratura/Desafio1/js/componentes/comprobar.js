import { mostrarModal } from "./modales.js";

async function comprobar(){
    let nodeOrden = document.querySelectorAll('.orden');
    let nodeOrdenar = document.querySelectorAll('.ordenar');
    
    let correctas = 0;

    for (let i=0; i < nodeOrden.length; i++) {
        let img = document.createElement('img');
        img.classList.add('imgEstado');

        if (nodeOrden[i].getAttribute('name') === nodeOrdenar[i].getAttribute('name')) {
            img.src = './img/correcto.png';
            correctas++;
        } else {
            img.src = './img/incorrecto.png';
        }

        nodeOrden[i].firstChild.append(img);
        nodeOrdenar[i].setAttribute('draggable', 'false');
    }

    if (nodeOrden.length === correctas) {
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