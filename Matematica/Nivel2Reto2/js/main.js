import { cargar } from "./componentes/carga.js";
import { crearActividad } from "./componentes/actividad.js";
import { comprobar } from "./componentes/comprobar.js";
import { cambiarEstiloSeleccion } from "./componentes/checkItem.js";


// Datos actividad
const rutaActividad = "./data/actividad.json";

// Carga de actividad
window.addEventListener("DOMContentLoaded", async function () {
   let data = await cargar (rutaActividad);
   await crearActividad(data);

   // Estilo en respuesta seleccionada
   cambiarEstiloSeleccion();

   // Comprobación y cierre
   let comprobacion = document.querySelector('#comprobar');
   comprobacion.addEventListener('click', () => {
      comprobar();
   });
});

