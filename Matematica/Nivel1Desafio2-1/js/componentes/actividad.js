// Auxiliar
function calcularTotal(base) {
    let aux = base;
    let total = 0;
    while (aux > 0) {
        total += aux;
        aux--;
    }

    return total;
}
// Modificación del HTML 
async function crearActividad() {
    let bases = document.querySelector('#bases');
    let totales = document.querySelector('#totales');

    const basesCompletas = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let basesCompletar = {};
    let totalesCompletar = {};
    let contadorRespuestas = 0;

    for (let b of basesCompletas) {
        let tdBase = document.createElement('td');
        let tdTotal = document.createElement('td');

        if (b < 7) {
            tdBase.textContent = b;
            
            if (b == 1) {
                tdTotal.textContent = b;
            } else {
                tdTotal.textContent = calcularTotal(b);
            }
        } else {
            let inputBase = document.createElement('input');
            inputBase.type = "text";
            inputBase.placeholder = "?";
            inputBase.maxLength = "3";
            inputBase.id = `b${contadorRespuestas}`;
            inputBase.className = "base";

            basesCompletar[`b${contadorRespuestas}`] = b;
            
            let inputTotal = document.createElement('input');
            inputTotal.type = "text";
            inputTotal.placeholder = "?";
            inputTotal.maxLength = "3";
            inputTotal.id = `t${contadorRespuestas}`;
            inputTotal.className = "total";

            totalesCompletar[`t${contadorRespuestas}`] = calcularTotal(b);

            tdBase.className = "tdCompletar";
            tdTotal.className = "tdCompletar";

            tdBase.append(inputBase);
            tdTotal.append(inputTotal);

            contadorRespuestas++;
        }

        bases.append(tdBase);
        totales.append(tdTotal);
    }

    return [basesCompletar, totalesCompletar];
}


export { crearActividad }