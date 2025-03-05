// Manejo de modales (<dialog>)

async function abrirModal() {
    let botonesInfo = document.querySelectorAll('.infoBotonImg, .zoomBotonImg');
    botonesInfo.forEach(boton => boton.addEventListener('click', ()=> {
        let modal = document.querySelector(`#${boton.value}`);
        modal.show();
        let cerrar = document.querySelector(`button#cerrar${boton.value}`);
        cerrar.addEventListener('click', ()=> {
            modal.close()});
    }));
}

export { abrirModal }