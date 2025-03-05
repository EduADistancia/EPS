// Modifica el estilo de las opciones seleccionadas
async function cambiarEstiloSeleccion() {
    let inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(i => {
        i.addEventListener('change', ev =>{
            let etiq = i.parentElement.parentElement;
            // Limpio otras selecciones
            etiq.childNodes.forEach(c => c.classList.remove('seleccionado'));
            i.parentElement.classList.add('seleccionado');
            ev.preventDefault();
        });
    });
}

export { cambiarEstiloSeleccion }