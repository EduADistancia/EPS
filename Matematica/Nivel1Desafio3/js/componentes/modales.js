import { cargar } from "./carga.js";

// Activación y cierre de modales (dialog)
async function mostrarModal(cierraModal, contenedor, contenidoHTML) {
    let aviso = await cargar(contenidoHTML, "template");
    let modal = document.querySelector(contenedor);
    modal.innerHTML = aviso;
    modal.querySelector('dialog').showModal();
    let cerrar = document.querySelector(cierraModal);
    cerrar.addEventListener('click', ev => document.querySelector('dialog').close());
}

export { mostrarModal }