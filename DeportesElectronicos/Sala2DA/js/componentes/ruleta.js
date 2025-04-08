async function crearRuleta(){
    const ruleta = document.getElementById("ruleta");
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let lastSize = null;

    function dibujarLetras() {
        const boxSize = ruleta.offsetWidth;

        // ⚠️ Solo redibujar si el tamaño cambió
        if (lastSize === boxSize) return;
        lastSize = boxSize;

        // Guardar qué letras estaban seleccionadas
        const letrasSeleccionadas = Array.from(ruleta.querySelectorAll('.letraSeleccionada'))
            .map(el => el.textContent);

        ruleta.innerHTML = ''; // Limpiar

        const centro = boxSize / 2;
        const radio = (boxSize / 2) - 30;

        letras.forEach((letra, i) => {
            const angulo = (2 * Math.PI / letras.length) * i - 45;
            const x = centro + radio * Math.cos(angulo);
            const y = centro + radio * Math.sin(angulo);
            const rotacion = angulo * (180 / Math.PI) + 90;

            const div = document.createElement('div');
            div.className = 'letra';
            div.textContent = letra;

            if (letrasSeleccionadas.includes(letra)) {
                div.classList.add('letraSeleccionada');
            }

            div.style.left = `${x}px`;
            div.style.top = `${y}px`;
            div.style.transform = `translate(-50%, -50%) rotate(${rotacion}deg)`;

            ruleta.appendChild(div);
        });
    }
    
    // Inicial y en resize
    window.addEventListener('load', dibujarLetras);
    window.addEventListener('resize', dibujarLetras);
}

export { crearRuleta }