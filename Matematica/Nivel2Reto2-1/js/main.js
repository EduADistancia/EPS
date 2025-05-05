import { crearActividad } from "./componentes/actividad.js";
import { comprobar } from "./componentes/comprobar.js";

// Carga de actividad
window.addEventListener("DOMContentLoaded", async function () {
   let resultados = await crearActividad();

   // Comprobación y cierre
   let comprobacion = document.querySelector('#comprobar');
   comprobacion.addEventListener('click', () => {
      comprobar(resultados);
   });
});

