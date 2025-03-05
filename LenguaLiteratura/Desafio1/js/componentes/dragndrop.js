// // Arrastrar las filas
function dragndrop() {
    /* Incluidos dispositivos móviles */
    const filas = document.querySelectorAll('#datos tr.ordenar');
    let filaArrastrada = null;
    let touchStartY = 0;
    let touchStartX = 0;
    let touchTarget = null;

    filas.forEach(fila => {
        // Eventos para dispositivos de escritorio
        fila.addEventListener('dragstart', function (e) {
            filaArrastrada = this;
            e.dataTransfer.effectAllowed = 'move';
            this.classList.add('dragging');
        });

        fila.addEventListener('dragend', function () {
            filaArrastrada = null;
            this.classList.remove('dragging');
        });

        fila.addEventListener('dragover', function (e) {
            e.preventDefault();
            const currentY = e.clientY;
            const elementBelow = document.elementFromPoint(e.clientX, currentY);
            
            if (elementBelow && elementBelow.tagName === 'TD') {
                const filaDebajo = elementBelow.parentNode;
                if (filaDebajo !== filaArrastrada) {
                    intercambiarFilas(filaDebajo);
                }
            }
        });

        fila.addEventListener('drop', function (e) {
            e.preventDefault();
            intercambiarFilas(this);
        });

        // Eventos para dispositivos táctiles
        fila.addEventListener('touchstart', function (e) {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            touchTarget = this;
            this.classList.add('dragging');
        });

        fila.addEventListener('touchmove', function (e) {
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;

            // Verifica si el movimiento es mayor en el eje Y que en el eje X
            if (Math.abs(currentY - touchStartY) > Math.abs(currentX - touchStartX)) {
                e.preventDefault(); // Prevenir el desplazamiento vertical de la página

                const elementBelow = document.elementFromPoint(currentX, currentY);

                if (elementBelow && elementBelow.tagName === 'TD') {
                    const filaDebajo = elementBelow.parentNode;
                    if (filaDebajo !== touchTarget  && filaDebajo.parentElement.id === "datos") {
                        intercambiarFilas(filaDebajo);
                    }
                }
            } else {
                // Si el movimiento es principalmente horizontal, no hacer nada
                return;
            }
        });

        fila.addEventListener('touchend', function () {
            touchTarget = null;
            this.classList.remove('dragging');
        });
    });

    function intercambiarFilas(filaObjetivo) {
        if (filaArrastrada && filaArrastrada !== filaObjetivo) {
            const tabla = filaObjetivo.parentNode;
            const filaSiguiente = (filaObjetivo === filaArrastrada.nextSibling) ? filaObjetivo.nextSibling : filaObjetivo;
            tabla.insertBefore(filaArrastrada, filaSiguiente);
        } else if (touchTarget && touchTarget !== filaObjetivo) {
            const tabla = filaObjetivo.parentNode;
            const filaSiguiente = (filaObjetivo === touchTarget.nextSibling) ? filaObjetivo.nextSibling : filaObjetivo;
            tabla.insertBefore(touchTarget, filaSiguiente);
        }
    }
}

export { dragndrop }