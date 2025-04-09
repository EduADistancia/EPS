// Modifica el estilo de las opciones seleccionadas
function cambiarEstiloSeleccion() {
    let inputs = document.querySelectorAll('input');
    inputs.forEach(i => {
        i.addEventListener('change', ev =>{
            // Cargo las opciones
            let etiq = i.parentElement.parentElement;
            // Limpio otras selecciones
            etiq.childNodes.forEach(c => c.classList.remove('seleccionado'));
            i.parentElement.classList.add('seleccionado');

            let cajaPregunta = i.parentElement.parentElement.parentElement;
            if (cajaPregunta.classList.contains('incompleta')) {
                cajaPregunta.classList.remove('incompleta');
            }

            ev.preventDefault();
        });
    });
}

export { cambiarEstiloSeleccion }