import { cargar } from "./componentes/carga.js";
import { crearActividad } from "./componentes/actividad.js";
import { activarAreas } from "./componentes/dragdrop.js";
import { comprobar } from "./componentes/comprobar.js";

// Ruta del cuestionario
const rutaCuestionario = './data/game/desafioA.json';

// Carga de actividad
window.addEventListener("DOMContentLoaded", async function () {
    let datos = await cargar(rutaCuestionario);
    crearActividad(datos);

   // Drag & Drop
   await activarAreas();

   // Retroalimentación
   let continuar = document.querySelector('#comprobar');
   continuar.addEventListener('click', ev => comprobar());

   // Reintentar y Cierre desde comprobación
});

