import { cargar } from "./carga.js";
import { comprobar } from "./comprobar.js";

// Desordenar datos
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
    return array;
}

// Modificación del HTML 
// Ubicación del form "Completar" y botón "Jugar"
async function crearActividad() {
    const actividad = document.querySelector('#completar');
    const formCompletar = await cargar("./site/game/juego.html", "template");

    function crearCompletar() {
        
        if (!document.querySelector('#formCompletar')) {
            actividad.innerHTML = formCompletar;
        }
    
        const formVisible = document.querySelector('#formCompletar') && 
                            !document.querySelector('#formCompletar').classList.contains('oculto');
    
        if (formVisible) {
            document.querySelector('#formCompletar').classList.remove('oculto');
            document.querySelector('#girarRuleta').classList.add('oculto');
        } else {
            const btnJugar = document.querySelector('#girarRuleta');
            if (!btnJugar.onclick) {
                btnJugar.addEventListener('click', jugar);
            }
        } 
    }
    
    if (document.readyState === "complete") {
        crearCompletar();
    } else {
        window.addEventListener('load', crearCompletar);
    }

    window.addEventListener('resize', crearCompletar);
}

async function jugar() {
    let datos = await cargar("./data/actividad.json");
    datos = shuffleArray(datos);
    document.querySelector('#girarRuleta').classList.add('oculto');
    
    // let templateOp = document.querySelector("#opciones");
    let templateOp = await cargar("./site/game/opciones.html", "template");
    let letras = document.querySelectorAll('.letra');
    let resultado = {};
    let indexData = 0; // Índice actual de letraBuscada
    let ruletaIndex = 0;
    let intervalo;
    let vueltas = 0;

    function empezarRuleta() {
        intervalo = setInterval(() => {
            letras.forEach(l => l.classList.remove("letraSeleccionada"));
            letras[ruletaIndex].classList.add("letraSeleccionada");

            const letraActual = letras[ruletaIndex];
            // Comparamos con la letra que estamos buscando
            if (vueltas > letras.length && letraActual.innerHTML === datos[indexData].letra) {
                clearInterval(intervalo); // Pausa temporal
                
                document.querySelector('#opciones').innerHTML = templateOp;
                document.querySelector('#txtPista').textContent = datos[indexData].pista;
                let ulDistractores = document.querySelector('#distractoresUl');
                
                datos[indexData].opciones.forEach(op => {
                    let liOpcion = document.createElement('li');
                    liOpcion.textContent = op;
                    ulDistractores.append(liOpcion);
                });
                
                // Input de completar palabra
                document.querySelector('#formCompletar').classList.remove('oculto');
                document.querySelector('#palabra').focus();
                
                let envio = document.querySelector('#enviarPalabra');
                // envio.addEventListener('click', () => {
                envio.onclick = () => {
                    let palabraIngresada = document.querySelector('#palabra');
                    let correcta = datos[indexData].opciones[Number(datos[indexData].check)];

                    if (palabraIngresada.value == "") {
                        let advertencia = document.querySelector('#advertencia');
                        advertencia.showModal();
                        let cerrarAdvertencia = document.querySelector('#cerrarAdvertencia');
                        cerrarAdvertencia.onclick = () => advertencia.close();
                    } else {

                        if (palabraIngresada.value.toLowerCase() === correcta.toLowerCase()) {
                            resultado[correcta] = true;
                        } else {
                            resultado[palabraIngresada.value] = false;
                        }
    
                        palabraIngresada.value = "";
    
                        indexData++;
                        document.querySelector('#formCompletar').classList.add('oculto');
                        document.querySelector("#opciones").innerHTML = "";
                        
                        if (indexData < datos.length) {
                            vueltas = 0;
                            empezarRuleta(); // Continuamos con la siguiente letra
                        } else {
                            let finJuego = document.querySelector('#finalizar');
                            finJuego.classList.remove('oculto');
                            finJuego.onclick = () => {comprobar(resultado)};
                        }
                    }

                };
            }
            
            // Avanza en el abecedario, reinicia si llega al final
            ruletaIndex = (ruletaIndex + 1) % letras.length;
            vueltas++;
        }, 50); // Velocidad de ruleta (ajustable)

    }

    empezarRuleta();
}
            


export { crearActividad, jugar }