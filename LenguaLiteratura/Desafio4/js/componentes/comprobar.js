import { cargar } from "./cargar.js";

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
            let contenidoActividad = document.querySelector('#contenidoActividad');
            let retro = await cargar("./site/retro.html", "template");
            contenidoActividad.innerHTML = retro;

            
            document.querySelector('#indicaciones').classList.add('oculto');
            document.querySelector('#comprobar').classList.add('oculto');
            document.querySelector('#cerrar').classList.remove('oculto');

            scrollTo({top: 0});

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
        }

    } else {
        document.querySelector('#advertencia').classList.remove('oculto');
    }
}

export { comprobar }
