import { cargar } from "./carga.js";

// Agrega ícono según resultado
function agregarCheck(correcto) {
    let imgSrc = correcto ? './img/correcto.png' : './img/incorrecto.png';
    let checkItem = document.createElement('img');
    checkItem.src = imgSrc;
    checkItem.classList.add('imgEstado');

    return checkItem;
}

// Cambio de contenido según resultado
async function mostrarRetroalimentacion(resultado, items){
    let contenido = document.querySelector('#contenidoActividad');
    let template;
    
    if (resultado) {
        template = await cargar('./site/retroPositiva.html', 'template');
    } else {
        template = await cargar('./site/retroNoPositiva.html', 'template');
    }
    
    contenido.innerHTML = template;

    if (items){
        let retroalimentacion = document.querySelector('.textoRetro');

        for (const [clave, valor] of Object.entries(items)){
            let divRetroItem = document.createElement('div');
            let retroItem = document.createElement('p');
            retroItem.textContent = clave;
            divRetroItem.append(retroItem);
            valor.forEach(v => divRetroItem.append(v));
            retroalimentacion.append(divRetroItem);
        };
    }
}

// Comprobación
async function comprobar() {
    let itemsResultados = {}

    let botonComprobar = document.querySelector('#evaluar');
    botonComprobar.addEventListener('click', function(){
        // Cantidad de items a comprobar
        let itemsActividad = document.querySelectorAll('.tarjetaDinamica');
        let itemsTotales = itemsActividad.length;
        
        // Comprobación inputs
        let resultadoInputs = 0;
        itemsActividad.forEach(item => {
            let itemH2 = item.querySelector('h2').innerText;
            let input = item.querySelector('input:checked');
            if (input) {
                let valor = Number(input.value);
                resultadoInputs += valor;
                itemsResultados[itemH2] = [agregarCheck(valor === 1 ? true : false)];    
            } else {
                itemsResultados[itemH2] = [agregarCheck(false)];    
            }
        });

        // Comprobación D'n'D
        let faltantes = document.querySelectorAll('.drop-area');
        let resultadoDnD = 0;
        faltantes.forEach((f) => {
            let clave = f.id.replace('faltante', '');
            if (f.firstElementChild){
                if (f.firstElementChild.classList.contains('correcto')){
                    resultadoDnD ++;
                    itemsResultados[clave].push(agregarCheck(true));
                } else {
                    itemsResultados[clave].push(agregarCheck(false));
                }
            } else {
                itemsResultados[clave].push(agregarCheck(false));
            }
        });
        
        document.querySelector('#evaluar').classList.add('oculto');
        document.querySelector('#siguiente').classList.add('oculto');
        document.querySelector('#anterior').classList.add('oculto');
        document.querySelector('#indicaciones').classList.add('oculto');

        if(itemsTotales === resultadoInputs && itemsTotales === resultadoDnD) {
            mostrarRetroalimentacion(true);
            let volver = document.querySelector('#volver');
            volver.classList.remove('oculto');
            volver.addEventListener('click', ev => {
                window.close();
                ev.preventDefault();
            });
        } else {
            mostrarRetroalimentacion(false, itemsResultados);
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