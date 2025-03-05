// Tablas para ordenar
function crearTablas(datos) {
    let contenido = document.querySelector('#scrollH');

    let tablaOrden = document.createElement('table');
    tablaOrden.id = "orden";
    let tablaOrdenar = document.createElement('table');
    tablaOrdenar.id = "datos";

    let cabeceraOrden = document.createElement('th');
    cabeceraOrden.innerHTML = 'Orden';

    let cabeceraOrdenar = document.createElement('th');
    cabeceraOrdenar.innerHTML = 'Sucesos';

    let tr1 = document.createElement('tr');
    tr1.appendChild(cabeceraOrden)
    tablaOrden.append(tr1);
    let tr2 = document.createElement('tr');
    tr2.appendChild(cabeceraOrdenar)
    tablaOrdenar.append(tr2);

    for (let d of datos) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');

        td.innerHTML = d["Texto"]
        tr.setAttribute('name', d["Valor"])

        if (d["Tipo"] === "Concepto") {
            tr.classList.add('orden');
            tr.appendChild(td);
            tablaOrden.append(tr);
        } else if (d["Tipo"] === "Descripcion") {
            tr.classList.add('ordenar');
            tr.draggable = true;
            tr.appendChild(td);
            tablaOrdenar.append(tr);
        }

    }

    contenido.append(tablaOrden, tablaOrdenar)
}

export { crearTablas }