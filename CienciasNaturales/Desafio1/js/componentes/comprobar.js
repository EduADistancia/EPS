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
    let botonComprobar = document.querySelector('#evaluar');
    botonComprobar.addEventListener('click', function(){
        // Cantidad de items a comprobar
        let itemsActividad = document.querySelectorAll('.tarjetaDinamica').length;
        
        // Comprobación inputs
        let inputsChecked = document.querySelectorAll('input:checked');
        let resultadoInputs = 0;
        inputsChecked.forEach(i => resultadoInputs += Number(i.value));

        // Comprobación D'n'D
        let faltantes = document.querySelectorAll('.drop-area');
        let resultadoDnD = 0;
        faltantes.forEach((f) => {
            if (f.firstElementChild){
                if (f.firstElementChild.classList.contains('correcto')){
                    resultadoDnD ++;
                }
            }
        });

        document.querySelector('#evaluar').classList.add('oculto');
        document.querySelector('#siguiente').classList.add('oculto');
        document.querySelector('#anterior').classList.add('oculto');
        document.querySelector('#indicaciones').classList.add('oculto');

        if(itemsActividad === resultadoInputs && itemsActividad === resultadoDnD) {
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