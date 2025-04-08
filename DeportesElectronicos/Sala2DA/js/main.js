import { cargar } from "./componentes/carga.js";
import { crearActividad } from "./componentes/actividad.js";
import { crearRuleta } from "./componentes/ruleta.js";
import { jugar } from "./componentes/actividad.js";

// Carga de actividad
window.addEventListener("DOMContentLoaded", async function () {
   await crearRuleta();
   await crearActividad();
});

