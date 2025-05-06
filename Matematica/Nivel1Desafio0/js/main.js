import { cargar } from "./componentes/carga.js";
import { crearActividad } from "./componentes/actividad.js";
import { comprobar } from "./componentes/comprobar.js";
import { cambiarEstiloSeleccion } from "./componentes/checkItem.js";
import { mostrarModal } from "./componentes/modales.js";


// Datos actividad
const rutaActividad = "./data/actividad.json";

// Carga de actividad
window.addEventListener("DOMContentLoaded", async function () {
   let data = await cargar (rutaActividad);
   await crearActividad(data);

   // Estilo en respuesta seleccionada
   cambiarEstiloSeleccion();

   // Modales extras
   let botonNota = this.document.querySelector("#infoNota");
   botonNota.addEventListener('click', ()=> mostrarModal("#cerrarModal", "#infoAdicional", "./site/nota_AP.html"))
   
   let botonBio = this.document.querySelector("#infoBio");
   botonBio.addEventListener('click', ()=> mostrarModal("#cerrarModal", "#infoAdicional", "./site/bio_AP.html"))

   // Comprobación y cierre
   let comprobacion = document.querySelector('#comprobar');
   comprobacion.addEventListener('click', () => {
      comprobar();
   });
});

