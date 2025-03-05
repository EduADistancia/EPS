// Carga de los datos externos
async function cargarDatos(ruta) {
    let data = await fetch(ruta)
                        .then(respuesta => respuesta.json());
    return data;
}

async function cargarPagina(ruta) {
    let data = await fetch(ruta)
                        .then(res => res.text());
    return data;
}

export { cargarDatos, cargarPagina }