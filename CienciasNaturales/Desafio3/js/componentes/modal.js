// Manejo de modales (<dialog>)

async function abrirModal() {
    let botonesInfo = document.querySelectorAll('.infoBotonImg, .defExtra, .elementoDescripcion');
    botonesInfo.forEach(boton => boton.addEventListener('click', ()=> {
        let modal = document.querySelector(`#${boton.value}`);
        modal.parentElement.childNodes.forEach(m => {
            if(m.parentElement.id === "reinoModales") {
                let extras = document.querySelector("#definicionesExtras");
                extras.childNodes.forEach(e => {if(e.open) e.close()});
            }
            if(m.open) m.close();
        });
        modal.show();
        let cerrar = document.querySelector(`button#cerrar${boton.value}`);
        cerrar.addEventListener('click', ()=> {
            if(modal.parentElement.id === "reinoModales") {
                let extras = document.querySelector("#definicionesExtras");
                extras.childNodes.forEach(e => {if(e.open) e.close()});
            }
            modal.close()});
    }));
}

export { abrirModal }