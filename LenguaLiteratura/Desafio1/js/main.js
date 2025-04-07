import { dragndrop } from "./componentes/dragndrop.js";
import { comprobar } from "./componentes/comprobar.js";
import { cargar } from "./componentes/carga.js";
import { crearTablas } from "./componentes/tablas.js";

// Ruta del cuestionario
const rutaCuestionario = './data/desafio1.json';

window.addEventListener("DOMContentLoaded", async function () {
    let datos = await cargar(rutaCuestionario);
    crearTablas(datos);
    dragndrop();
});

let comprobacion = document.querySelector('#comprobar');
comprobacion.addEventListener('click',() => {
    comprobacion.classList.add('oculto');
    comprobar();
});
