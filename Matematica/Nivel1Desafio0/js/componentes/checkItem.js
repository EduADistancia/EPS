// Modifica el estilo de las opciones seleccionadas
function cambiarEstiloSeleccion() {
    let inputsRadio = document.querySelectorAll('input[type="radio"');
    inputsRadio.forEach(i => {
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

    let inputsCheckbox = document.querySelectorAll('input[type="checkbox"]');
    inputsCheckbox.forEach(i => {
        i.addEventListener('change', ev =>{
            if (i.parentElement.classList.contains('seleccionado')) {
                i.parentElement.classList.remove('seleccionado');
            } else {
                i.parentElement.classList.add('seleccionado');
            }
            ev.preventDefault();
        });
    }) 
}

export { cambiarEstiloSeleccion }