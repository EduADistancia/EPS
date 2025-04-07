import { comprobar } from "./componentes/comprobar.js";
import { cargar } from "./componentes/carga.js";
import { crearActividad } from "./componentes/actividad.js";
import { cambiarEstiloSeleccion } from "./componentes/checkItems.js";

// Ruta del cuestionario
const rutaActividad = './data/desafio4.json';

// Templates
const templates = {
    inicio: "./site/inicio.html",
    actividad: "./site/actividad.html"
}

// 1 - Inicio
window.addEventListener("DOMContentLoaded", async function () {
    let contenidoSPA = document.querySelector('#contenidoSPA');
    let datos = await cargar(templates.inicio, "template");
    contenidoSPA.innerHTML = datos;
});

// 2 - Actividad
async function activarActividad() {
    let pagina = await cargar(templates.actividad, "template");
    contenidoSPA.innerHTML = pagina;
    siguiente.classList.add('oculto');
    scrollTo({top: 0});
    
    let datos = await cargar(rutaActividad);
    crearActividad(datos);
    
    // Estilos en botón seleccionado
    await cambiarEstiloSeleccion();
    
    // 3 - Comprobación y cierre
    let comprobacion = document.querySelector('#comprobar');
    comprobacion.classList.remove('oculto');
    comprobacion.addEventListener('click', () => {
        comprobacion.classList.add('oculto');
        comprobar();
    });
}

// Activadores
let activadores = document.querySelectorAll('#siguiente, #reintentar');
activadores.forEach(act => act.addEventListener('click', async () => {
    document.querySelector('#reintentar').classList.add('oculto');
    document.querySelector('#anterior').classList.add('oculto');
    
    await activarActividad();
}));