// Auxiliares
function calcularBase(lado) {
    let base = 0;
    while (lado > 0) {
        base += lado;
        lado--;
    }

    return base;
}

function calcularPiramide(ladoBase) {
    let total = 0;
    while (ladoBase > 0) {
        total += calcularBase(ladoBase);
        ladoBase--;
    }

    return total;
}

// Modificación del HTML 
async function crearActividad() {
    let ladoBase = document.querySelector('#ladoBase');
    let totalBase = document.querySelector('#totalBase');
    let anterior = document.querySelector('#anterior');
    let total = document.querySelector('#total');

    const basesCompletas = [1, 2, 3, 4, 5];
    let ladoCompletar = {};
    let totalBaseCompletar = {};
    let anteriorCompletar = {};
    let totalCompletar = {};

    let contadorRespuestas = 0;
    let anteriorCalcular = 0;

    for (let b of basesCompletas) {
        let tdLadoBase = document.createElement('td');
        let tdTotalBase = document.createElement('td');
        let tdAnterior = document.createElement('td');
        let tdTotal = document.createElement('td');

        if (b < 4) {
            tdLadoBase.textContent = b;
            tdTotalBase.textContent = calcularBase(b);
            tdAnterior.textContent = anteriorCalcular;
            tdTotal.textContent = calcularPiramide(b);
        } else {
            let inputLadoBase = document.createElement('input');
            inputLadoBase.type = "text";
            inputLadoBase.placeholder = "?";
            inputLadoBase.maxLength = "2";
            inputLadoBase.id = `lb${contadorRespuestas}`;
            inputLadoBase.className = "ladoBase";

            ladoCompletar[`lb${contadorRespuestas}`] = b;
            
            let inputTotalBase = document.createElement('input');
            inputTotalBase.type = "text";
            inputTotalBase.placeholder = "?";
            inputTotalBase.maxLength = "3";
            inputTotalBase.id = `tb${contadorRespuestas}`;
            inputTotalBase.className = "totalBase";

            totalBaseCompletar[`tb${contadorRespuestas}`] = calcularBase(b);

            let inputAnterior = document.createElement('input');
            inputAnterior.type = 'text';
            inputAnterior.placeholder = '?';
            inputAnterior.maxLength = "2";
            inputAnterior.id = `ant${contadorRespuestas}`;
            inputAnterior.className = "anterior";

            anteriorCompletar[`ant${contadorRespuestas}`] = anteriorCalcular;

            let inputTotal = document.createElement('input');
            inputTotal.type = 'text';
            inputTotal.placeholder = '?';
            inputTotal.maxLength = "2";
            inputTotal.id = `t${contadorRespuestas}`;
            inputTotal.className = "total";

            totalCompletar[`t${contadorRespuestas}`] =  calcularPiramide(b);

            tdLadoBase.className = "tdCompletar";
            tdTotalBase.className = "tdCompletar";
            tdAnterior.className = "tdCompletar";
            tdTotal.className = "tdCompletar";

            tdLadoBase.append(inputLadoBase);
            tdTotalBase.append(inputTotalBase);
            tdAnterior.append(inputAnterior);
            tdTotal.append(inputTotal);

            contadorRespuestas++;
        }

        anteriorCalcular = calcularPiramide(b);

        ladoBase.append(tdLadoBase);
        totalBase.append(tdTotalBase);
        anterior.append(tdAnterior);
        total.append(tdTotal);
    }

    return [ladoCompletar, totalBaseCompletar, anteriorCompletar, totalCompletar];
}


export { crearActividad }