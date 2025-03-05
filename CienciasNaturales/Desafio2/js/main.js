import { cargar } from "./componentes/carga.js";
import { crearActividad } from "./componentes/actividad.js";
import { abrirModal } from "./componentes/modal.js";
import { activarAreas } from "./componentes/dragdrop.js";
import { comprobar } from "./componentes/comprobar.js";

// Ruta del cuestionario
const rutaCuestionario = './data/desafio2.json';

// Carga de actividad
window.addEventListener("DOMContentLoaded", async function () {
    let datos = await cargar(rutaCuestionario);
    crearActividad(datos);

    // Modales
    await abrirModal();

    // Drag & Drop
    await activarAreas();

    // Comprobar actividad
    await comprobar();
});