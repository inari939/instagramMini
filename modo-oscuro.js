// modo-oscuro.js

function ChangeDarkMode() {
    // Alternar la clase "dark-mode" en el body
    document.body.classList.toggle("dark-mode");

    const button = document.getElementById("darkModeSwitch");

    // Cambiar el texto del botón según el modo
    if (document.body.classList.contains("dark-mode")) {
        button.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled'); // Guardar preferencia
    } else {
        button.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled'); // Guardar preferencia
    }
}

// Comprobar el modo oscuro al cargar la página
window.onload = function () {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add("dark-mode");
        const button = document.getElementById("darkModeSwitch");
        if (button) button.textContent = 'Es de noche 🌙';
    }
};


//circulo de luz

let veladorActivo = false; // Estado del velador
        const veladorLuz = document.getElementById("velador-luz");

        // Función para activar/desactivar el velador
        function toggleVelador() {
            veladorActivo = !veladorActivo;

            if (veladorActivo) {
                veladorLuz.style.display = "block"; // Muestra la luz
                veladorLuz.style.top = localStorage.getItem("velador-top") || "50%";
                veladorLuz.style.left = localStorage.getItem("velador-left") || "50%";
                setTimeout(() => veladorLuz.classList.add("luz-activa"), 10);
            } else {
                veladorLuz.classList.remove("luz-activa");
                setTimeout(() => veladorLuz.style.display = "none", 500); // Espera la transición
            }
        }

        // Variables para manejar el arrastre
        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        // Eventos de mouse para arrastrar el círculo luminoso
        veladorLuz.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - veladorLuz.getBoundingClientRect().left;
            offsetY = e.clientY - veladorLuz.getBoundingClientRect().top;
            veladorLuz.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
                veladorLuz.style.left = `${x}px`;
                veladorLuz.style.top = `${y}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                veladorLuz.style.cursor = "grab";
                // Guardar posición
                localStorage.setItem("velador-top", veladorLuz.style.top);
                localStorage.setItem("velador-left", veladorLuz.style.left);
            }
        });




