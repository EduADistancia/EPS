// Botón de captura y descarga

async function descargar(){
    let descargar = document.getElementById('descarga');
    descargar.addEventListener('click', function() {
            document.querySelectorAll('.botonera').forEach(b => b.classList.add('oculto'));
            document.querySelector('#indicaciones').classList.add('oculto');
            html2canvas(document.getElementById('captura'))
            .then(function(canvas) {
                // Convert the canvas to a data URL
                const dataURL = canvas.toDataURL('image/png');
                
                // Fecha en nombre de archivo
                let hoy = new Date(Date.now());
                let fecha = `${hoy.getDate()}-${hoy.getMonth()+1}-${hoy.getFullYear()}`;
                
                // Create an anchor element
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = `desafio1-1-${fecha}.png`;
                
                // Trigger a click event on the anchor to start the download
                link.click();
                descargar.classList.remove('oculto');
                document.querySelector('#indicaciones').classList.remove('oculto');
                document.querySelectorAll('.botonera').forEach(b => b.classList.add('oculto'));
        });
    });
}

export { descargar }