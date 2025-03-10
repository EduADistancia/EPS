import { descargar } from "./captura.js";

// Sitio (SPA)
const sitio = {
    inicio: './site/inicio.html',
    actividad: './site/canvas.html'
}

// Cambia páginas
async function cambiarPagina(docuHTML) {
    let contSPA = document.querySelector('#contenidoDinamico');
    await fetch(docuHTML)
            .then(rta => rta.text())
            .then(datos => contSPA.innerHTML = datos);
    scroll(0, 0);
}

// 1- Inicio 
window.addEventListener("DOMContentLoaded", function () {
    cambiarPagina(sitio.inicio);
    // 2 - Actividad
    let continuar = document.querySelector('#continuar');
    continuar.addEventListener('click', function () {
        cambiarPagina(sitio.actividad);
        continuar.classList.add('oculto');
        let botonVolver = document.querySelector('#volver');
        botonVolver.classList.remove('oculto');
        volver(botonVolver);
        document.querySelector('#descarga').classList.remove('oculto');
        descargar();
        let cerrar = document.querySelector('#cerrar');
        cerrar.classList.remove('oculto');
        cerrar.addEventListener('click', window.close());
    });
    
});

// 3 - Volver al inicio
function volver(boton) {
    boton.addEventListener('click', function () {
        cambiarPagina(sitio.inicio);
        document.querySelector('#descarga').classList.add('oculto');
        document.querySelector('#cerrar').classList.add('oculto');
        document.querySelector('#continuar').classList.remove('oculto');
        boton.classList.add('oculto');
    }); 
}