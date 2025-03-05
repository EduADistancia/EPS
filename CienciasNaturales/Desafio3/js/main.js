import { cargar } from "./componentes/carga.js";
import { crearActividad, crearIndicaciones } from "./componentes/actividad.js";
import { abrirModal } from "./componentes/modal.js";
import { activarAreas } from "./componentes/dragdrop.js";
import { comprobar } from "./componentes/comprobar.js";

// Ruta del cuestionario
const rutaIndicaciones = './data/desafio3indicaciones.json';
const rutaActividad = './data/desafio3actividad.json';

// Carga de actividad
window.addEventListener("DOMContentLoaded", async function () {
    // Indicaciones: reinos y definiciones
    let indicaciones = await cargar(rutaIndicaciones);
    crearIndicaciones(indicaciones);

    // Actividad: elementos d'n'd
    let actividad = await cargar(rutaActividad);
    crearActividad(actividad);

    // Modales
    await abrirModal();

    // Drag & Drop
    await activarAreas();

    // Comprobar actividad
    await comprobar();
});