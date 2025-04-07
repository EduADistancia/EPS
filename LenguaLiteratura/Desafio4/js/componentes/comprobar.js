import { cargar } from "./carga.js";
import { mostrarModal } from "./modales.js";

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
    let totalPreguntas = document.querySelectorAll('.pregunta').length;
    let selecciones = document.querySelectorAll('.seleccionado');
    let rtasCorrectas = 0;
    
    // Limpiar posible devolución anterior
    let icoRetro = document.querySelectorAll('.imgRetro');
    if (icoRetro.length > 0) icoRetro.forEach(i => i.remove());

    if (selecciones.length === totalPreguntas){
        selecciones.forEach(s => rtasCorrectas += Number(s.firstChild.value));
        document.querySelector('#advertencia').classList.add('oculto');

        if (rtasCorrectas === totalPreguntas) {
            document.querySelector('#indicaciones').classList.add('oculto');
            document.querySelector('#comprobar').classList.add('oculto');
            mostrarModal("#cerrarModal", "#retroalimentacion", "./site/retroPos.html");
            // Cerrar
            let botonCerrar = document.querySelector('#cerrarApp');
            botonCerrar.classList.remove('oculto');
            botonCerrar.addEventListener('click', ()=>{
                window.close();
            });

        } else {
            selecciones.forEach(s => {
                if(Number(s.firstChild.value)){
                    s.append(insertarIco("./img/correcto.png"));
                } else {
                    s.append(insertarIco("./img/incorrecto.png"));
                }
            });
            document.querySelector('#comprobar').classList.add('oculto');
            document.querySelector('#reintentar').classList.remove('oculto');
            document.querySelector('#anterior').classList.remove('oculto');
            mostrarModal("#cerrarModal", "#retroalimentacion", "./site/retroNoPos.html");
            // Reintentar
            let botonReitentar = document.querySelector('#reintentar');
            botonReitentar.classList.remove('oculto');
            botonReitentar.addEventListener('click', ()=>{
                window.location.reload();
            });
        }

    } else {
        document.querySelector('#advertencia').classList.remove('oculto');
        document.querySelector('#comprobar').classList.remove('oculto');
    }
}

export { comprobar }
