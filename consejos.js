// Array de consejos
const consejos = [
    "Hoy es un buen día para empezar algo nuevo.",
    "La perseverancia es la clave del éxito.",
    "No te preocupes por fallar, preocúpate por no intentarlo.",
    "Cada día es una nueva oportunidad para aprender.",
    "La actitud positiva puede cambiarlo todo."
];

// Función para obtener el consejo del día
function obtenerConsejoDelDia() {
    const consejoKey = "consejoDelDia"; // Clave para el localStorage
    const fechaKey = "fechaConsejo";    // Clave para la fecha

    const consejoGuardado = localStorage.getItem(consejoKey);
    const fechaGuardada = localStorage.getItem(fechaKey);
    const hoy = new Date().toDateString(); // Fecha actual en formato legible

    // Si no hay consejo guardado o la fecha es diferente, actualizamos el consejo
    if (!consejoGuardado || fechaGuardada !== hoy) {
        const nuevoConsejo = consejos[Math.floor(Math.random() * consejos.length)];
        localStorage.setItem(consejoKey, nuevoConsejo);
        localStorage.setItem(fechaKey, hoy);
        return nuevoConsejo;
    }

    // Si ya hay un consejo para hoy, lo devolvemos
    return consejoGuardado;
}

// Mostrar el consejo del día
function mostrarConsejo() {
    const consejo = obtenerConsejoDelDia();
    
    // Crear un cuadro para mostrar el consejo
    const cuadroConsejo = document.createElement("div");
    cuadroConsejo.id = "cuadroConsejo";
    cuadroConsejo.textContent = consejo;
    cuadroConsejo.style.position = "fixed";
    cuadroConsejo.style.bottom = "50%";
    cuadroConsejo.style.left = "50%";
    cuadroConsejo.style.transform = "translate(-50%, 50%)";
    cuadroConsejo.style.backgroundColor = "#007bff";
    cuadroConsejo.style.color = "white";
    cuadroConsejo.style.padding = "20px";
    cuadroConsejo.style.borderRadius = "10px";
    cuadroConsejo.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    cuadroConsejo.style.textAlign = "center";
    cuadroConsejo.style.fontSize = "1.2rem";
    cuadroConsejo.style.zIndex = "1000";
    cuadroConsejo.style.transition = "opacity 0.5s ease";

    // Agregar el cuadro al cuerpo del documento
    document.body.appendChild(cuadroConsejo);

    // Hacer que desaparezca después de unos segundos
    setTimeout(() => {
        cuadroConsejo.style.opacity = "0";
        setTimeout(() => cuadroConsejo.remove(), 500);
    }, 5000); // 5 segundos de visibilidad
}


document.getElementById("consejoBtn").addEventListener("click", () => {
    const button = document.getElementById("consejoBtn");
    button.classList.add("bounce");
    setTimeout(() => button.classList.remove("bounce"), 500); // Elimina la clase tras la animación
});

