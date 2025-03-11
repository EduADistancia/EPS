// Modifica el estilo de las opciones seleccionadas
async function cambiarEstiloSeleccion() {
    let inputs = document.querySelectorAll('button.opcion');
    inputs.forEach(i => {
        i.addEventListener('click', ev =>{
            let etiq = i.parentElement.parentElement;
            // Limpio otras selecciones
            etiq.childNodes.forEach(c => c.classList.remove('seleccionado'));
            i.parentElement.classList.add('seleccionado');
            ev.preventDefault();
        });
    });
}

export { cambiarEstiloSeleccion }