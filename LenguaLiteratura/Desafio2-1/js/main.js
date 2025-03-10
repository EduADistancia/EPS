import { cargar } from "./componentes/carga.js";
import { crearActividad } from "./componentes/actividad.js";
import { activarAreas } from "./componentes/dragdrop.js";

// Ruta del cuestionario
const rutaCuestionario = './data/desafio2-1.json';

// Carga de actividad
window.addEventListener("DOMContentLoaded", async function () {
    let datos = await cargar(rutaCuestionario);
    crearActividad(datos);

   // Drag & Drop
   await activarAreas();

   // Retroalimentación
   let continuar = document.querySelector('#continuar');
   continuar.addEventListener('click', async ()=>{
        let contenido = document.querySelector("#contenidoActividad");
        scrollTo({top: 0});
        let retro = await cargar("./site/retro.html", 'template');
        contenido.innerHTML = retro;
        document.querySelector('#indicaciones').innerHTML = "";
        continuar.remove();

        let botonCerrar = document.querySelector('#cerrar');
        botonCerrar.classList.remove('oculto');
        botonCerrar.addEventListener('click', ()=>{
            window.history.back();
        });
    });
});