// Manejo de modales (<dialog>)
import { cargar } from "./carga.js";

// Activación automática y cierre manual (retroalimentación)
async function mostrarModal(cierraModal, contenedor, contenidoHTML) {
    let aviso = await cargar(contenidoHTML, "template");
    let modal = document.querySelector(contenedor);
    modal.innerHTML = aviso;
    modal.querySelector('dialog').showModal();
    let cerrar = document.querySelector(cierraModal);
    cerrar.addEventListener('click', ev => document.querySelector('dialog').close());
}

// Activación y cierre manual (pista actividad)
async function abrirModal() {
    let botonesInfo = document.querySelectorAll('.infoBotonImg');
    botonesInfo.forEach(boton => boton.addEventListener('click', ()=> {
        let modal = document.querySelector(`#${boton.value}`);
        modal.parentElement.parentElement.childNodes.forEach(m => {
            if(m.childNodes[0].open) m.childNodes[0].close();
        });
        modal.show();
        let cerrar = document.querySelector(`button#cerrar${boton.value}`);
        cerrar.addEventListener('click', ()=> {
            modal.close()});
    }));
}

export { abrirModal, mostrarModal }