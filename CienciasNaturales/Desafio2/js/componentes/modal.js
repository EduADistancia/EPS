// Manejo de modales (<dialog>)

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

export { abrirModal }