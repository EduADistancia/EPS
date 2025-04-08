import { cargar } from "./componentes/carga.js";
import { crearActividad, completar } from "./componentes/actividad.js";
import { comprobar } from "./componentes/comprobar.js";


// Datos actividad
const rutaActividad = "./data/actividad.json";

// Carga de actividad
window.addEventListener("DOMContentLoaded", async function () {
   let data = await cargar (rutaActividad);
   await crearActividad(data);

   let respuestas = await completar();

   // Comprobación y cierre
   let comprobacion = document.querySelector('#comprobar');
   comprobacion.addEventListener('click', () => {
      comprobacion.classList.add('oculto');
      comprobar(respuestas);
   });
});

