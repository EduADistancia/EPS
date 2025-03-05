// Cambio de tarjeta
async function cambiarTarjeta(){
    
    // Calculo el total de tarjetas
    let tarjetas = document.querySelectorAll('.tarjetaDinamica');

    let actual = document.querySelector('div.tarjetaDinamica.visible');

    if(tarjetas[0] === actual) {
        document.querySelector('#anterior').classList.add('oculto');
    } 
    
    // Captura de botones
    let botonAnt = document.querySelector('#anterior');
    botonAnt.addEventListener('click', ev => {
        let actual = document.querySelector('div.tarjetaDinamica.visible');
        if (actual.previousElementSibling !== null) {
            actual.classList.remove('visible');
            actual.classList.add('oculto');
            actual.previousElementSibling.classList.remove('oculto');
            actual.previousElementSibling.classList.add('visible');
        }     
        if (tarjetas[0] === actual.previousElementSibling) {
            document.querySelector('#anterior').classList.add('oculto');
        } else {
            document.querySelector('#anterior').classList.remove('oculto');
            document.querySelector('#evaluar').classList.add('oculto');
            document.querySelector('#siguiente').classList.remove('oculto');
        }
        scrollTo({top: 0});        
    });
    
    let botonSig = document.querySelector('#siguiente');
    botonSig.addEventListener('click', ev => {
        let actual = document.querySelector('div.tarjetaDinamica.visible');

        if (actual.nextElementSibling !== null){
            actual.classList.remove('visible');
            actual.classList.add('oculto');
            actual.nextElementSibling.classList.remove('oculto');
            actual.nextElementSibling.classList.add('visible');
            if(tarjetas[tarjetas.length - 1] === actual.nextElementSibling) {
                document.querySelector('#siguiente').classList.add('oculto');
                document.querySelector('#evaluar').classList.remove('oculto');
            } else {
                document.querySelector('#anterior').classList.remove('oculto');
                document.querySelector('#evaluar').classList.add('oculto');
                document.querySelector('#siguiente').classList.remove('oculto');
            }
        }
        scrollTo({top: 0});
    });
}


export { cambiarTarjeta }