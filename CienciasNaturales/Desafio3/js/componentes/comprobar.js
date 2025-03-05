import { cargar } from "./carga.js";

// Cambio de contenido según resultado
async function mostrarRetroalimentacion(resultado){
    let contenido = document.querySelector('#contenidoActividad');
    let template;
    
    if (resultado) {
        template = await cargar('./site/retroPositiva.html', 'template');
    } else {
        template = await cargar('./site/retroNoPositiva.html', 'template');
    }
    
    contenido.innerHTML = template;
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
                if (frase.classList.contains('dropped')) {
                    if(frase.getAttribute('name') !== c.id) {
                        resultado = false;
                    }
                }
            });
        })
        


        document.querySelector('#comprobar').classList.add('oculto');
        document.querySelector('#indicaciones').classList.add('oculto');

        if (resultado) {
            mostrarRetroalimentacion(true);
            let volver = document.querySelector('#volver');
            volver.classList.remove('oculto');
            volver.addEventListener('click', ev => {
                window.history.back();
                ev.preventDefault();
            });
        } else {
            mostrarRetroalimentacion(false);
            let reintentar = document.querySelector('#reintentar');
            reintentar.classList.remove('oculto');
            reintentar.addEventListener('click', ev => {
                window.location.reload();
                ev.preventDefault();
            });
        }
    });

}

export { comprobar }