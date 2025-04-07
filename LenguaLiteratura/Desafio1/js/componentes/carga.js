// Carga de los datos o plantillas

async function cargar(ruta, tipo) {
    let data = await fetch(ruta)
        .then(res => (tipo === "template"  ? res.text() : res.json()));

    return data;
}

export { cargar }