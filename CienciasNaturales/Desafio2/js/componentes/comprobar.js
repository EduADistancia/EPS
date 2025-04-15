import { mostrarModal } from "./modal.js";

// Agrega ícono según resultado
function agregarCheck(correcto) {
    let imgSrc = correcto ? './img/correcto.png' : './img/incorrecto.png';
    let checkItem = document.createElement('img');
    checkItem.src = imgSrc;
    checkItem.classList.add('imgEstado');

    return checkItem;
}

// Comprobación
async function comprobar() {
    let botonComprobar = document.querySelector('#comprobar');
    let resultado = true;

    botonComprobar.addEventListener('click', function(){
        // Cantidad de items a comprobar
        let completados = document.querySelectorAll('.drop-area');
        completados.forEach(c => {
            c.childNodes.forEach(frase => {
                let divImgRetro = document.createElement('div');
                if(frase.getAttribute('name').replace(" ", "") !== c.id) {
                    resultado = false;
                    divImgRetro.append(agregarCheck(false));
                } else {
                    divImgRetro.append(agregarCheck(true));
                }
                frase.append(divImgRetro);
                frase.draggable = false;
            });
        })
        
        document.querySelector('#comprobar').classList.add('oculto');
        document.querySelector('#indicaciones').classList.add('oculto');

        if (resultado) {
            mostrarModal("#cerrarModal", "#retroalimentacion", "./site/retroPositiva.html");
            let volver = document.querySelector('#volver');
            volver.classList.remove('oculto');
            volver.addEventListener('click', ()=> {
                window.close();
            });
        } else {
            mostrarModal("#cerrarModal", "#retroalimentacion", "./site/retroNoPositiva.html");
            let reintentar = document.querySelector('#reintentar');
            reintentar.classList.remove('oculto');
            reintentar.addEventListener('click', ()=> {
                window.location.reload();
            });
        }
    });

}

export { comprobar }