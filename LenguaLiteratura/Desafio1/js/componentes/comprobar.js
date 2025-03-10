import { cargarPagina } from "./cargar.js";

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
        let reintentar = document.querySelector('#reintentar');
        reintentar.classList.add('oculto');

        let contenedorTabla = document.querySelector('#scrollH');
        let retro = await cargarPagina("./site/retro.html");
        contenedorTabla.innerHTML = retro;

        let botonCerrar = document.querySelector('#cerrar');
        botonCerrar.classList.remove('oculto');
        botonCerrar.addEventListener('click', ()=>{
            window.close();
        });
    }
}

export { comprobar }