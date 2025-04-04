async function activarAreas() {
    let dropArea = document.querySelectorAll('.drop-area');
    dropArea.forEach(da => dragndrop(da));
}

function dragndrop(dropArea){
    const words = document.querySelectorAll("img.imgPersonaje");

    // Variable para almacenar el elemento que se está arrastrando
    let draggedElement = null;

    // Añadir los event listeners para arrastrar y soltar en desktop
    words.forEach(word => {
        word.addEventListener('dragstart', dragStart);
        word.addEventListener('dragend', dragEnd);
        word.addEventListener('touchstart', touchStart);
        word.addEventListener('touchmove', touchMove);
        word.addEventListener('touchend', touchEnd);
    });
    
    dropArea.addEventListener('dragover', dragOver);
    dropArea.addEventListener('dragleave', dragLeave);
    dropArea.addEventListener('drop', drop);

    function dragStart(event) {
        draggedElement = event.target;
        setTimeout(() => {
            event.target.style.opacity = '0.5';
        }, 0);
    }

    function dragEnd(event) {
        event.target.style.opacity = '1';
        draggedElement = null;
        dropArea.classList.remove('drop-highlight');
    }

    function dragOver(event) {
        event.preventDefault();
        dropArea.classList.add('drop-highlight');
    }

    function dragLeave(event) {
        dropArea.classList.remove('drop-highlight');
    }

    function drop(event) {
        event.preventDefault();
        if (draggedElement) {

            if (dropArea.querySelector('img')) return;

            draggedElement.draggable = false;
            draggedElement.classList.add('dropped');
            dropArea.appendChild(draggedElement);
            draggedElement.style.opacity = '1';
            dropArea.classList.remove('drop-highlight');
            dropArea.querySelector('.agregarImg').remove();
            dropArea.classList.remove('contrasteCero');
            dropArea.classList.remove('drop-area');
            
            if(document.querySelector('#videojuegos').innerHTML === "") {
                document.querySelector('#comprobar').classList.remove('oculto');
            }
        }
            
    }

    // Funciones para móviles
    function touchStart(event) {
        draggedElement = event.target;

        if (!draggedElement.draggable) return;
        event.target.style.opacity = '0.5';
        event.target.style.position = 'fixed';
        event.target.style.zIndex = '1000';
    }

    function touchMove(event) {
        event.preventDefault();
        const touch = event.touches[0];
        draggedElement.style.left = `${touch.clientX - draggedElement.offsetWidth / 2}px`;
        draggedElement.style.top = `${touch.clientY - draggedElement.offsetHeight / 2}px`;

        const dropAreaRect = dropArea.getBoundingClientRect();
        if (touch.clientX >= dropAreaRect.left &&
            touch.clientX <= dropAreaRect.right &&
            touch.clientY >= dropAreaRect.top &&
            touch.clientY <= dropAreaRect.bottom) {
            dropArea.classList.add('drop-highlight');
        } else {
            dropArea.classList.remove('drop-highlight');
        }
    }

    function touchEnd(event) {
        event.preventDefault();
        const touch = event.changedTouches[0];
        const dropAreaRect = dropArea.getBoundingClientRect();
        
        if (touch.clientX >= dropAreaRect.left &&
            touch.clientX <= dropAreaRect.right &&
            touch.clientY >= dropAreaRect.top &&
            touch.clientY <= dropAreaRect.bottom) {
            
            if (dropArea.querySelector('img')){
                return;
            }
            dropArea.appendChild(draggedElement);
            draggedElement.classList.add('dropped');
            draggedElement.draggable = false;
            dropArea.querySelector('.agregarImg').remove();
            dropArea.classList.remove('contrasteCero');
            dropArea.classList.remove('drop-area');

            if(document.querySelector('#videojuegos').innerHTML === "") {
                document.querySelector('#comprobar').classList.remove('oculto');
            }
        }
        draggedElement.style.opacity = '1';
        draggedElement.style.position = 'static';
        draggedElement.style.zIndex = 'initial';
        dropArea.classList.remove('drop-highlight');
        draggedElement = null;
    }
}


export { activarAreas }