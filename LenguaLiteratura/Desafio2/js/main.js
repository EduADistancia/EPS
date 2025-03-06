import { cargar } from "./componentes/carga.js";
import { crearActividad } from "./componentes/actividad.js";
import { cambiarEstiloSeleccion } from "./componentes/checkItems.js";
import { comprobar } from "./componentes/comprobar.js";

// Ruta del cuestionario
const rutaCuestionario = './data/desafio2.json';

// Carga de actividad
window.addEventListener("DOMContentLoaded", async function () {
    let datos = await cargar(rutaCuestionario);
    crearActividad(datos);

    // Estilos en inputs
    await cambiarEstiloSeleccion();

    // Comprobar actividad
    await comprobar();
});