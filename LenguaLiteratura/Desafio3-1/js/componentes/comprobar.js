import { cargarPagina } from "./cargar.js";

// Ícono de retro
function insertarIco(img){
    let divImagen = document.createElement('div');
    divImagen.classList.add('imgRetro');

    let imgRetro = document.createElement('img');
    imgRetro.src = img;

    divImagen.append(imgRetro);

    return divImagen;
}


// Comprobación
async function comprobar(){
    let opcionSeleccionada = document.querySelector('.seleccionado');
    
    if(opcionSeleccionada) {
        
        document.querySelector('#comprobar').classList.add('oculto');
        
        if(Number(opcionSeleccionada.firstElementChild.value)) {
            document.querySelector('#indicaciones').classList.add('oculto');
            let contenidoActividad = document.querySelector('#contenidoActividad');
            let retro = await cargarPagina("./site/retro.html");
            contenidoActividad.innerHTML = retro;
            let cerrar = document.querySelector('#cerrar');
            cerrar.classList.remove('oculto');
            cerrar.addEventListener('click', window.close());

        } else {
            opcionSeleccionada.append(insertarIco("./img/incorrecto.png"));
            let reintentar = document.querySelector('#reintentar');
            reintentar.classList.remove('oculto');
            reintentar.addEventListener('click', ev => {
                window.location.reload();
            });
        }

    } else {
        document.querySelector('#advertencia').classList.remove('oculto');
    }
}

export { comprobar }
