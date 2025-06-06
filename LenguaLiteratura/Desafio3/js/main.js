import { dragndrop } from "./componentes/dragndrop.js";
import { comprobar } from "./componentes/comprobar.js";
import { cargarDatos } from "./componentes/cargar.js";
import { crearTablas } from "./componentes/tablas.js";
import { abrirModal } from "./componentes/modal.js";

// Ruta del cuestionario
const rutaCuestionario = './data/desafio3.json';

window.addEventListener("DOMContentLoaded", async function () {
    let datos = await cargarDatos(rutaCuestionario);
    crearTablas(datos);
    
    // Drag and drop
    dragndrop();

    // Modales
    await abrirModal();
});

let reintentar = document.querySelector('#reintentar');
reintentar.addEventListener('click', ev => {
    window.location.reload();
});

let comprobacion = document.querySelector('#comprobar');
comprobacion.addEventListener('click',() => {
    reintentar.classList.remove('oculto');
    comprobacion.classList.add('oculto');
    comprobar();
});
