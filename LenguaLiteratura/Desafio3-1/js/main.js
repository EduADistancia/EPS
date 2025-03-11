import { comprobar } from "./componentes/comprobar.js";
import { cargarDatos } from "./componentes/cargar.js";
import { crearActividad } from "./componentes/actividad.js";
import { cambiarEstiloSeleccion } from "./componentes/checkItems.js";

// Ruta del cuestionario
const rutaCuestionario = './data/desafio3-1.json';

window.addEventListener("DOMContentLoaded", async function () {
    let datos = await cargarDatos(rutaCuestionario);
    crearActividad(datos);

    // Estilos en botón seleccionado
    await cambiarEstiloSeleccion();
});

let comprobacion = document.querySelector('#comprobar');
comprobacion.addEventListener('click',() => {
    comprobar();
});



