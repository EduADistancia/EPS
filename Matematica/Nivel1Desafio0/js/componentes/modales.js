import { cargar } from "./carga.js";

// Activación y cierre de modales (dialog)
async function mostrarModal(cierraModal, contenedor, contenidoHTML) {
    let aviso = await cargar(contenidoHTML, "template");
    let modalContenedor = document.querySelector(contenedor);
    modalContenedor.innerHTML = aviso;
    let modal = modalContenedor.querySelector('dialog');
    modal.showModal();
    modal.scrollTop = 0;
    let cerrar = document.querySelector(cierraModal);
    cerrar.addEventListener('click', ev => modal.close());
}

export { mostrarModal }