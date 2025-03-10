// Manejo de modales (<dialog>)

async function abrirModal() {
    let botonesInfo = document.querySelectorAll('.pistaEspacio');
    botonesInfo.forEach(boton => boton.addEventListener('click', ()=> {
        let modal = document.querySelector(`#${boton.value}`);
        modal.parentElement.childNodes.forEach(m => {
            if(m.open) m.close();
        });
        modal.show();
        let cerrar = document.querySelector(`button#cerrar${boton.value}`);
        cerrar.addEventListener('click', ()=> {
            modal.close()});
    }));
}

export { abrirModal }